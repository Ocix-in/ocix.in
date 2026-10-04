import { build } from 'vite';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

// The browser and build renderer share the same components and route content.
await build();
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.ssg', emptyOutDir: true }, ssr: { noExternal: ['lucide-react'] } });
const { pages, articles, render } = await import(pathToFileURL(path.resolve('.ssg/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<!--page-head-->') || !template.includes('<div id="root"></div>')) throw new Error('Missing prerender slots');
const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const routes = [...pages, { path: '/404', title: 'Page not found | OCIX', description: 'That page is not available. Explore OCIX products, tools and contact options.' }];
for (const page of routes) {
  const url = `https://ocix.in${page.path === '/' ? '/' : page.path}`;
  const article = articles.find(item => page.path === `/blog/${item.slug}`);
  const graph = article ? { '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.description, datePublished: article.publishedAt, dateModified: article.publishedAt, author: { '@type': 'Person', name: article.author }, publisher: { '@type': 'Organization', name: 'OCIX', url: 'https://ocix.in' }, mainEntityOfPage: url, image: 'https://ocix.in/assets/ocix-og.png' } : { '@context': 'https://schema.org', '@type': 'WebPage', name: page.title, description: page.description, url, publisher: { '@type': 'Person', name: 'Vishal Pandey', url: 'https://ocix.in/about' } };
  const head = `<title>${escape(page.title)}</title>
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
  const html = template.replace('<!--page-head-->', head).replace('<div id="root"></div>', () => `<div id="root">${render(page.path)}</div>`);
  const output = page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`;
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => `<url><loc>https://ocix.in${page.path}</loc></url>`).join('')}</urlset>
`);
await rm('.ssg', { recursive: true, force: true });
console.log(`Prerendered ${pages.length} pages plus 404; ${articles.length} OCIX articles.`);
