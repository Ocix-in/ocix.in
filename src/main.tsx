import { inject } from '@vercel/analytics';
import './styles/index.css';
import './styles/kitchen.css';

// Production pages are complete HTML. Links and <details> need no hydration.
// Keep the Vite development experience without shipping React or article text.
if (import.meta.env.DEV) {
  const [{ createElement }, { createRoot }, { default: App }] = await Promise.all([
    import('react'), import('react-dom/client'), import('./app/App'),
  ]);
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  createRoot(document.getElementById('root')!).render(createElement(App, { path }));
}

function loadAnalytics() {
  inject({ mode: import.meta.env.PROD ? 'production' : 'development' });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-532BX86T';
  document.head.append(script);
}

function scheduleAnalytics() {
  if ('requestIdleCallback' in window) window.requestIdleCallback(loadAnalytics, { timeout: 2000 });
  else setTimeout(loadAnalytics, 0);
}
if (document.readyState === 'complete') scheduleAnalytics();
else window.addEventListener('load', scheduleAnalytics, { once: true });

// Native dialogs keep the reading experience focused without hydrating the site.
const dialogOpeners = new WeakMap<HTMLDialogElement, HTMLElement>();
let articleRequest: AbortController | undefined;
function openDialog(dialog: HTMLDialogElement, opener: HTMLElement) {
  dialogOpeners.set(dialog, opener.closest('.mobile-menu')?.querySelector<HTMLElement>('summary') || opener);
  opener.closest('.mobile-menu')?.removeAttribute('open');
  if (!dialog.open) dialog.showModal();
  document.documentElement.classList.add('menu-is-open');
}
document.addEventListener('close', event => {
  const dialog = event.target as HTMLDialogElement;
  if (!(dialog instanceof HTMLDialogElement)) return;
  if (!document.querySelector('dialog[open]')) document.documentElement.classList.remove('menu-is-open');
  dialogOpeners.get(dialog)?.focus();
  if (dialog.id === 'recipe-reader') articleRequest?.abort();
}, true);

document.addEventListener('click', async event => {
  const target = event.target as HTMLElement;
  const opener = target.closest<HTMLElement>('[data-menu-open]');
  if (opener) {
    const menu = document.querySelector<HTMLDialogElement>('#ocix-menu');
    if (menu) {event.preventDefault();openDialog(menu,opener)}
    return;
  }
  const close = target.closest('[data-menu-close], [data-dialog-close]');
  const dialog = close?.closest('dialog') || (target instanceof HTMLDialogElement ? target : null);
  if (dialog) {dialog.close();return}
  const link = target.closest<HTMLAnchorElement>('a[data-article-open]');
  const reader = document.querySelector<HTMLDialogElement>('#recipe-reader');
  if (!link || !reader || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const content = reader.querySelector<HTMLElement>('.reader-content')!;
  articleRequest?.abort();
  const request = articleRequest = new AbortController();
  content.replaceChildren();
  const title = document.createElement('h2');title.id='reader-title';title.textContent=link.textContent;
  const loading = document.createElement('p');loading.setAttribute('role','status');loading.textContent='Opening the recipe…';
  content.append(title,loading);content.setAttribute('aria-busy','true');
  openDialog(reader,link);content.scrollTop=0;
  try {
    let html: string;
    if (import.meta.env.DEV) {
      // Vite serves an empty app shell; render only the requested article in development.
      const [{articles},{ArticleBody},{createElement},{renderToStaticMarkup}] = await Promise.all([
        import('./app/content'),import('./app/components/ArticleBody'),import('react'),import('react-dom/server'),
      ]);
      const article=articles.find(item=>new URL(link.href).pathname===`/blog/${item.slug}`);
      if (!article) throw new Error('Recipe unavailable');
      html=renderToStaticMarkup(createElement('article',{className:'document'},
        createElement('p',{className:'eyebrow'},`${article.author} · ${article.publishedAt}`),
        createElement('h1',null,article.title),createElement('p',{className:'document-lead'},article.description),
        createElement(ArticleBody,{body:article.body})));
    } else {
      const response = await fetch(link.href,{signal:request.signal});
      if (!response.ok) throw new Error('Recipe unavailable');
      html=await response.text();
    }
    const page = new DOMParser().parseFromString(html,'text/html');
    const article = page.querySelector<HTMLElement>('article.document');
    if (!article) throw new Error('Recipe unavailable');
    if (request.signal.aborted) return;
    article.querySelector('a[href="/blog"]')?.remove();
    const heading=article.querySelector('h1')!;
    const readerHeading=document.createElement('h2');readerHeading.id='reader-title';readerHeading.textContent=heading.textContent;
    heading.replaceWith(readerHeading);
    article.className='reader-article';
    content.replaceChildren(article);content.scrollTop=0;
  } catch {
    if (request.signal.aborted) return;
    const fallback=document.createElement('a');fallback.href=link.href;fallback.textContent='Open the full article ↗';
    loading.textContent='The preview could not load. You can still open the article directly.';
    content.replaceChildren(title,loading,fallback);
  } finally {if (!request.signal.aborted) content.removeAttribute('aria-busy')}
});

if (location.hash === '#ocix-menu') requestAnimationFrame(() => {
  document.querySelector<HTMLElement>('.menu-open')?.click();
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const dialog = document.querySelector<HTMLDialogElement>('dialog[open]');
  if (!dialog) return;
  const controls = [...dialog.querySelectorAll<HTMLElement>('button, a[href]')].filter(el=>el.getClientRects().length);
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus()}
  else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus()}
});
