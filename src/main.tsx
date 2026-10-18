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

// Native modal keeps focus inside the menu and restores it to the opener.
let menuOpener: HTMLElement | null = null;
document.addEventListener('click', event => {
  const target = event.target as HTMLElement;
  const opener = target.closest<HTMLElement>('[data-menu-open]');
  const menu = document.querySelector<HTMLDialogElement>('#ocix-menu');
  if (!menu) return;
  if (opener) {
    event.preventDefault();
    target.closest('.mobile-menu')?.removeAttribute('open');
    menuOpener = opener.closest('.mobile-menu')?.querySelector<HTMLElement>('summary') || opener;
    menu.showModal();
    document.documentElement.classList.add('menu-is-open');
    menu.addEventListener('close', () => {
      document.documentElement.classList.remove('menu-is-open');
      menuOpener?.focus();
    }, { once: true });
  } else if (target.closest('[data-menu-close]') || target === menu) menu.close();
});

if (location.hash === '#ocix-menu') requestAnimationFrame(() => {
  document.querySelector<HTMLElement>('.menu-open')?.click();
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const menu = document.querySelector<HTMLDialogElement>('#ocix-menu[open]');
  if (!menu) return;
  const controls = menu.querySelectorAll<HTMLElement>('button, a[href]');
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first.focus();
  }
});
