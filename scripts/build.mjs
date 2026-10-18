import { build } from 'vite';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

// React renders complete static pages at build time; the browser only loads analytics.
await build();
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.ssg', emptyOutDir: true }, ssr: { noExternal: ['lucide-react'] } });
const { pages, articles, render } = await import(pathToFileURL(path.resolve('.ssg/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<!--page-head-->') || !template.includes('<div id="root"></div>')) throw new Error('Missing prerender slots');
const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const routes = [...pages, { path: '/404', title: 'Page not found | OCIX', description: 'That page is not available. Explore OCIX products, tools and contact options.' }];
const organization = {
  '@type': 'Organization', '@id': 'https://ocix.in/#organization', name: 'OCIX',
  url: 'https://ocix.in/', description: 'An independent software studio run by Vishal Pandey in India.',
  email: 'support@ocix.in', founder: { '@id': 'https://ocix.in/#founder' },
  sameAs: ['https://x.com/Ocixdotin', 'https://www.instagram.com/ocix.in', 'https://www.reddit.com/user/ocix_dot_in/'],
  logo: { '@type': 'ImageObject', url: 'https://ocix.in/assets/ocix-logo.webp', width: 188, height: 96 },
};
const founder = {
  '@type': 'Person', '@id': 'https://ocix.in/#founder', name: 'Vishal Pandey',
  url: 'https://ocix.in/about', jobTitle: 'Founder', worksFor: { '@id': organization['@id'] },
};
for (const page of routes) {
  const url = `https://ocix.in${page.path === '/' ? '/' : page.path}`;
  const article = articles.find(item => page.path === `/blog/${item.slug}`);
  const entity = article ? {
    '@type': 'Article', '@id': `${url}#article`, headline: article.title,
    description: article.description, datePublished: article.publishedAt, dateModified: article.publishedAt,
    author: article.author === founder.name ? { '@id': founder['@id'] } : { '@type': 'Person', name: article.author },
    publisher: { '@id': organization['@id'] }, mainEntityOfPage: url, image: 'https://ocix.in/assets/ocix-og.png',
  } : {
    '@type': page.path === '/about' ? 'ProfilePage' : 'WebPage', '@id': `${url}#webpage`,
    name: page.title, description: page.description, url, publisher: { '@id': organization['@id'] },
    ...(page.path === '/about' ? { mainEntity: { '@id': founder['@id'] } } : {}),
  };
  const graph = { '@context': 'https://schema.org', '@graph': [organization, founder, entity] };
  const heroPreload = page.path === '/' ? `<link rel="preload" as="image" type="image/avif" href="/assets/kitchen/kitchen-mobile.avif" media="(max-width: 700px)" fetchpriority="high"/>
    <link rel="preload" as="image" type="image/avif" imagesrcset="/assets/kitchen/kitchen-base.avif 1x, /assets/kitchen/kitchen-base@2x.avif 2x" media="(min-width: 701px)" fetchpriority="high"/>` : '';
  const head = `${heroPreload}<title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}"/>
    <meta name="author" content="Vishal Pandey"/>
    <meta name="robots" content="${page.path === '/404' ? 'noindex, follow' : 'index, follow, max-image-preview:large'}"/>
    <link rel="canonical" href="${url}"/>
    <meta property="og:site_name" content="OCIX"/>
    <meta property="og:type" content="${article ? 'article' : 'website'}"/>
    <meta property="og:title" content="${escape(page.title)}"/>
    <meta property="og:description" content="${escape(page.description)}"/>
    <meta property="og:url" content="${url}"/>
    <meta property="og:image" content="https://ocix.in/assets/ocix-og.png"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="${escape(page.title)}"/>
    <meta name="twitter:description" content="${escape(page.description)}"/>
    <meta name="twitter:image" content="https://ocix.in/assets/ocix-og.png"/>
    <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`;
  const html = template.replace('<!--page-head-->', head).replace('<div id="root"></div>', () => `<div id="root">${render(page.path)}</div>${page.path === '/' ? '<script>const s=document.querySelector(".scene-scroll");if(s&&innerWidth<=1000)s.scrollLeft=Math.max(0,s.querySelector(".hotspot-pot").offsetLeft-s.clientWidth/2)</script>' : ''}`);
  const output = page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`;
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>https://ocix.in${page.path}</loc></url>`).join('')}</urlset>
`);
await rm('.ssg', { recursive: true, force: true });
console.log(`Prerendered ${pages.length} pages plus 404; ${articles.length} OCIX articles.`);
