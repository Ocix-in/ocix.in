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
