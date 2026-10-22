import { build } from 'vite';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

// React renders complete static pages at build time; the browser loads a small menu controller and analytics.
await build();
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.ssg', emptyOutDir: true }, ssr: { noExternal: ['lucide-react'] } });
const { pages, articles, render } = await import(pathToFileURL(path.resolve('.ssg/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
// The business service stylesheet is needed only on its own landing page.
const serviceStyles = await readFile('src/styles/services.css', 'utf8');
const serviceStylePath = `/assets/services-${createHash('sha256').update(serviceStyles).digest('hex').slice(0,10)}.css`;
await writeFile(`dist${serviceStylePath}`, serviceStyles);
if (!template.includes('<!--page-head-->') || !template.includes('<div id="root"></div>')) throw new Error('Missing prerender slots');
const escape = text => String(text).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const routes = [...pages, { path: '/404', title: 'Page not found | OCIX', description: 'That page is not available. Explore OCIX products, tools and contact options.' }];
// "OCIX" is shared with internet exchanges and a medicine, so the entity spells out who this OCIX is.
const about = 'OCIX (ocix.in) is an independent software studio from India, founded by Vishal Pandey. It makes games, playful tools and made-to-order websites, including Vigilante, a game that turns verified GitHub commits into a settlement you rebuild.';
const organization = {
  '@type': 'Organization', '@id': 'https://ocix.in/#organization', name: 'OCIX',
  alternateName: ['OCIX Studio', 'ocix.in'], url: 'https://ocix.in/', description: about,
  disambiguatingDescription: 'Independent software studio at ocix.in. Not affiliated with internet exchanges, data centres or medicines named OCIX.',
  slogan: 'A small kitchen for software', email: 'support@ocix.in', founder: { '@id': 'https://ocix.in/#founder' },
  foundingLocation: { '@type': 'Country', name: 'India' }, address: { '@type': 'PostalAddress', addressCountry: 'IN' },
  areaServed: 'Worldwide', knowsAbout: ['Game development', 'Developer tools', 'GitHub accountability', 'Web design for local businesses'],
  sameAs: ['https://x.com/Ocixdotin', 'https://www.instagram.com/ocix.in', 'https://www.reddit.com/user/ocix_dot_in/'],
  logo: { '@type': 'ImageObject', url: 'https://ocix.in/assets/ocix-logo.webp', width: 188, height: 96 },
};
const founder = {
  '@type': 'Person', '@id': 'https://ocix.in/#founder', name: 'Vishal Pandey',
  url: 'https://ocix.in/about', jobTitle: 'Founder', worksFor: { '@id': organization['@id'] }, nationality: { '@type': 'Country', name: 'India' },
};
const website = {
  '@type': 'WebSite', '@id': 'https://ocix.in/#website', name: 'OCIX', alternateName: ['OCIX Studio', 'ocix.in'],
  url: 'https://ocix.in/', inLanguage: 'en', publisher: { '@id': organization['@id'] },
};
const vigilante = {
  '@type': 'VideoGame', '@id': 'https://ocix.in/products/vigilante#software', name: 'Vigilante',
  description: 'A browser game by OCIX that turns GitHub-verified daily commit targets into progress in a post-apocalyptic settlement.',
  url: 'https://vigilante.ocix.in/', sameAs: 'https://ocix.in/products/vigilante', applicationCategory: 'GameApplication', operatingSystem: 'Web browser',
  gamePlatform: 'Web browser', author: { '@id': organization['@id'] }, publisher: { '@id': organization['@id'] },
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'The core game is free; optional Pro upgrades are available.' },
};
const websitesService = {
  '@type': 'Service', '@id': 'https://ocix.in/services/websites#service', name: 'Made-to-order websites for local businesses',
  serviceType: 'Website design and development', provider: { '@id': organization['@id'] }, areaServed: 'Worldwide', url: 'https://ocix.in/services/websites',
};
const crumbName = { services: 'Services', products: 'Products', blog: 'Recipes' };
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
  const parts = page.path.split('/').filter(Boolean);
  const breadcrumbs = parts.length && page.path !== '/404' ? [{
    '@type': 'BreadcrumbList', itemListElement: [{ name: 'OCIX', path: '/' }, ...parts.map((part, i) => {
      const crumbPath = `/${parts.slice(0, i + 1).join('/')}`;
      const known = routes.find(route => route.path === crumbPath);
      return { name: i === parts.length - 1 ? (article?.title ?? page.title.split(' | ')[0]) : known ? known.title.split(' | ')[0] : crumbName[part] ?? part, path: known || i === parts.length - 1 ? crumbPath : null };
    })].filter(crumb => crumb.path).map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, name: crumb.name, item: `https://ocix.in${crumb.path}` })),
  }] : [];
  const extras = page.path === '/products/vigilante' ? [vigilante] : page.path === '/services/websites' ? [websitesService] : [];
  // The page entity stays last: tests and consumers read it as the page's main node.
  const graph = { '@context': 'https://schema.org', '@graph': [organization, founder, website, ...extras, ...breadcrumbs, { ...entity, isPartOf: { '@id': website['@id'] }, ...(page.path === '/' ? { about: { '@id': organization['@id'] } } : {}) }] };
  const heroPreload = page.path === '/' ? `<link rel="preload" as="image" type="image/avif" href="/assets/kitchen/kitchen-mobile.avif" media="(max-width: 700px)" fetchpriority="high"/>
    <link rel="preload" as="image" type="image/avif" imagesrcset="/assets/kitchen/kitchen-base.avif 1x, /assets/kitchen/kitchen-base@2x.avif 2x" media="(min-width: 701px)" fetchpriority="high"/>` : '';
  const pageStyles = page.path === '/services/websites' ? `<link rel="stylesheet" href="${serviceStylePath}"/>` : '';
  const head = `${heroPreload}${pageStyles}<title>${escape(page.title)}</title>
    <meta name="description" content="${escape(page.description)}"/>
    <meta name="author" content="${article ? escape(article.author) : 'OCIX'}"/>
    <meta name="robots" content="${page.path === '/404' ? 'noindex, follow' : 'index, follow, max-image-preview:large'}"/>
    <link rel="canonical" href="${url}"/>
    <meta property="og:site_name" content="OCIX"/>
    <meta property="og:locale" content="en_IN"/>
    <meta property="og:type" content="${article ? 'article' : 'website'}"/>
    <meta property="og:title" content="${escape(page.title)}"/>
    <meta property="og:description" content="${escape(page.description)}"/>
    <meta property="og:url" content="${url}"/>
    <meta property="og:image" content="https://ocix.in/assets/ocix-og.png"/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
    <meta property="og:image:alt" content="OCIX, an independent software studio from India"/>
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:site" content="@Ocixdotin"/>
    <meta name="twitter:title" content="${escape(page.title)}"/>
    <meta name="twitter:description" content="${escape(page.description)}"/>
    <meta name="twitter:image" content="https://ocix.in/assets/ocix-og.png"/>
    <script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`;
  const html = template.replace('<!--page-head-->', head).replace('<div id="root"></div>', () => `<div id="root">${render(page.path)}</div>${page.path === '/' ? '<script>const s=document.querySelector(".scene-scroll");if(s&&innerWidth<=1000)s.scrollLeft=Math.max(0,s.querySelector(".object-fridge").offsetLeft-12)</script>' : ''}`);
  const output = page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`;
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(page => {
  const article = articles.find(item => page.path === `/blog/${item.slug}`);
  const lastmod = article?.publishedAt ?? (page.path === '/blog' ? articles[0]?.publishedAt : undefined);
  return `<url><loc>https://ocix.in${page.path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`;
}).join('')}</urlset>
`);
// llms.txt gives AI assistants a plain-text summary of who OCIX is and where each page lives.
const link = page => `- [${page.title.split(' | ')[0]}](https://ocix.in${page.path}): ${page.description}`;
const section = (heading, filter) => `## ${heading}\n\n${pages.filter(filter).map(link).join('\n')}\n`;
await writeFile('dist/llms.txt', `# OCIX

> ${about}

OCIX is run by founder Vishal Pandey in India. It is not related to the internet exchanges, data centres or the antibiotic that share the name. The website is https://ocix.in and support is at support@ocix.in.

- Served (available now): Vigilante, a free browser game where verified GitHub pushes against a daily commit target rebuild a post-apocalyptic settlement. Website: https://vigilante.ocix.in
- Still cooking (in development, not available yet): DraftShield (X draft review concept), GymX (fitness accountability prototype) and Do It! (a game where intrusive thoughts win).
- Free tools: GitHub Profile Roast and GitHub Consistency Audit, no sign-up needed.
- Services: made-to-order websites for local businesses.
- Social: https://x.com/Ocixdotin, https://www.instagram.com/ocix.in, https://www.reddit.com/user/ocix_dot_in/

${section('Products', page => page.path.startsWith('/products/'))}
${section('Studio and services', page => ['/', '/about', '/services/websites', '/tools', '/contact'].includes(page.path))}
${section('Articles', page => page.path.startsWith('/blog'))}
## Optional

${pages.filter(page => ['/privacy', '/terms'].includes(page.path)).map(link).join('\n')}
`);
await rm('.ssg', { recursive: true, force: true });
console.log(`Prerendered ${pages.length} pages plus 404; ${articles.length} OCIX articles.`);
