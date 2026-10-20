import { inject } from '@vercel/analytics';
import './styles/index.css';
import './styles/kitchen.css';
import './styles/business-entry.css';

// Production pages are complete HTML. Links and <details> need no hydration.
// Keep the Vite development experience without shipping React or article text.
if (import.meta.env.DEV) {
  await import('./styles/services.css');
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
  const service = target.closest<HTMLElement>('[data-service-open]');
  if(service && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey){
    const panel=document.getElementById(service.dataset.serviceOpen!);
    if(panel instanceof HTMLDialogElement){
      event.preventDefault();
      const previous=document.querySelector<HTMLDialogElement>('.service-dialog[open]');
      const returnTo=previous?dialogOpeners.get(previous)||service:service;
      if(previous&&previous!==panel)previous.close();
      openDialog(panel,returnTo);
    }
    return;
  }
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
  const controls = [...dialog.querySelectorAll<HTMLElement>('button, a[href], input, textarea, select, summary, [tabindex]')].filter(el=>el.tabIndex>=0&&!el.hasAttribute('disabled')&&el.checkVisibility());
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus()}
  else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus()}
});

// The chef retreats after a 2.5-second hello; reading or using the card keeps it open.
let chefRetreat: ReturnType<typeof setTimeout> | undefined;
let chefWelcomed = false;
function keepChefWelcome() {clearTimeout(chefRetreat)}
for (const type of ['pointermove', 'focusin', 'pointerdown']) document.addEventListener(type, event => {
  if ((event.target as Element).closest?.('#chef-welcome')) keepChefWelcome();
});
// Date uses the visitor's device time zone; no location or account data is needed.
document.addEventListener('beforetoggle', event => {
  const panel=event.target as HTMLElement;
  if(panel.id!=='chef-welcome')return;
  keepChefWelcome();
  const opening=(event as ToggleEvent).newState==='open';
  panel.closest('.chef-guide')?.classList.toggle('chef-emerged',opening);
  if (!opening) return;
  chefWelcomed = true;
  chefRetreat=setTimeout(()=>{
    if (panel.contains(document.activeElement)) return;
    panel.hidePopover();
  },2500);
  const hour=new Date().getHours();
  const greeting=hour>=5&&hour<12?'Good morning!':hour>=12&&hour<17?'Good afternoon!':hour>=17&&hour<22?'Good evening!':'Hello, night owl!';
  panel.querySelector('[data-chef-greeting]')!.textContent=greeting;
},true);

// Greet on home arrivals/reloads, keeping internal browsing and product pages quiet.
function scheduleChefWelcome(){
  if (location.pathname.replace(/\/+$/, '') !== '') return;
  setTimeout(()=>{
    const navigation=performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const reloading=navigation?.type === 'reload';
    if (navigation?.type === 'back_forward') return;
    if (!reloading && document.referrer && new URL(document.referrer).origin === location.origin) return;
    if (chefWelcomed) return;
    const panel=document.querySelector<HTMLElement>('#chef-welcome');
    if(!panel || typeof panel.showPopover!=='function' || document.querySelector('dialog[open], .mobile-menu[open], [popover]:popover-open'))return;
    panel.showPopover();
  },1400);
}
if(document.readyState!=='loading')scheduleChefWelcome();
else document.addEventListener('DOMContentLoaded',scheduleChefWelcome,{once:true});


// Build an email draft locally; no enquiry details are posted or added to analytics.
document.addEventListener('click', async event => {
  const target=event.target as Element;
  const copy=target.closest('[data-enquiry-copy]');
  if(!copy)return;
  const form=copy.closest('form')!;
  const draft=form.querySelector<HTMLTextAreaElement>('[data-enquiry-text]')!;
  const status=form.querySelector<HTMLElement>('.enquiry-status')!;
  try{await navigator.clipboard.writeText(draft.value);status.textContent='Enquiry copied. Paste it into an email to support@ocix.in.'}
  catch{draft.focus();draft.select();status.textContent='Select and copy the enquiry above, then email support@ocix.in.'}
});
document.addEventListener('input', event => {
  const draft=(event.target as Element).closest('[data-website-enquiry]')?.querySelector<HTMLElement>('.enquiry-draft');
  if(draft)draft.hidden=true;
});
document.addEventListener('submit', event => {
  const form=event.target as HTMLFormElement;
  if(!form.matches('[data-website-enquiry]'))return;
  event.preventDefault();
  const data=new FormData(form);
  const value=(name:string)=>String(data.get(name)||'').trim();
  const kind=value('project')==='refresh'?'Refresh my website':'Build a new website';
  const subject=`Website enquiry: ${value('business')}`;
  const body=`Hello OCIX,\n\nI’d like to discuss a website for my business.\n\nBusiness: ${value('business')}\nProject: ${kind}\nReply email: ${value('email')}\nCurrent website: ${value('website')||'None provided'}\n\nWhat I have in mind:\n${value('details')}`;
  const draft=form.querySelector<HTMLElement>('.enquiry-draft')!;
  draft.querySelector<HTMLAnchorElement>('[data-enquiry-email]')!.href=`mailto:support@ocix.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  draft.querySelector<HTMLTextAreaElement>('[data-enquiry-text]')!.value=`To: support@ocix.in\nSubject: ${subject}\n\n${body}`;
  draft.hidden=false;
  draft.querySelector<HTMLElement>('.enquiry-status')!.textContent='';
  draft.querySelector<HTMLElement>('h3')!.focus();
});

// Keep shared links to the former process/enquiry sections useful.
function openServiceHash(){
  if(location.pathname.replace(/\/+$/,'')==='/services/websites' && location.hash){
    const id=location.hash==='#how-it-works'?'why-ocix':location.hash.slice(1);
    const panel=document.getElementById(id);
    if(panel?.matches('.service-dialog'))document.querySelector<HTMLElement>(`[data-service-open="${id}"]`)?.click();
  }
}
window.addEventListener('hashchange',openServiceHash);
openServiceHash();
