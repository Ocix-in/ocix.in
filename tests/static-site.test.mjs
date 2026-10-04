import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const sitemap = readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/ocix\.in([^<]*)<\/loc>/g)].map(match => match[1]);
const required = ['/', '/about', '/products/vigilante', '/products/draftshield', '/products/gymx', '/tools', '/contact', '/privacy', '/terms', '/blog'];
const htmlFor = route => readFileSync(path.join(root, route === '/' ? 'index.html' : `${route.slice(1)}.html`), 'utf8');

test('all required routes have substantive HTML, unique metadata and a shared navigation', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const route of required) assert.ok(routes.includes(route), `Missing sitemap route ${route}`);
  assert.equal(new Set(routes).size, routes.length);
  for (const route of routes) {
    const html = htmlFor(route);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(title && description, route);
    assert.ok(!titles.has(title), `Duplicate title ${route}`); titles.add(title);
    assert.ok(!descriptions.has(description), `Duplicate description ${route}`); descriptions.add(description);
    assert.ok(html.includes(`<link rel="canonical" href="https://ocix.in${route}"`), route);
    assert.ok(html.includes(`<meta property="og:url" content="https://ocix.in${route}"`), route);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1, route);
    const main = html.match(/<main id="main">([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main && main.replace(/<[^>]*>/g, '').split(/\s+/).length > 100, `Thin or missing HTML ${route}`);
    assert.ok(html.includes('aria-label="Primary navigation"') && html.includes('aria-label="Footer navigation"'), route);
    for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
      const target = match[1];
      assert.ok(existsSync(path.join(root, target === '/' ? 'index.html' : path.extname(target) ? target.slice(1) : `${target.slice(1)}.html`)), `Broken internal link ${route} -> ${target}`);
    }
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) assert.doesNotThrow(() => JSON.parse(match[1]));
    assert.ok(!/lorem ipsum|testimonial|adsbygoogle/i.test(html), route);
  }
});

test('development products remain unavailable, and support and policies are explicit', () => {
  for (const name of ['draftshield', 'gymx']) assert.ok(htmlFor(`/products/${name}`).includes('In development, not yet available'));
  assert.ok(htmlFor('/about').includes('Vishal Pandey') && htmlFor('/about').includes('India'));
  assert.ok(htmlFor('/privacy').includes('Google Tag Manager') && htmlFor('/privacy').includes('Google Analytics') && htmlFor('/privacy').includes('Google AdSense'));
  assert.ok(htmlFor('/terms').includes('https://myvigilante.ocix.in/refunds'));
  assert.ok(htmlFor('/contact').includes('mailto:support@ocix.in'));
  assert.equal(existsSync('src/app/components/Testimonials.tsx'), false);
});

test('404 is rendered but excluded from the sitemap, and crawl files survive the build', () => {
  assert.ok(htmlFor('/404').includes('noindex, follow') && htmlFor('/404').includes('Page not found'));
  assert.ok(!routes.includes('/404'));
  assert.ok(readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('Sitemap: https://ocix.in/sitemap.xml'));
  const publisherLine = readFileSync('public/ads.txt', 'utf8');
  assert.match(publisherLine, /^google\.com, pub-\d+, DIRECT, [a-f0-9]+\s*$/);
  assert.equal(readFileSync(path.join(root, 'ads.txt'), 'utf8'), publisherLine);
});

test('every approved markdown article is generated and listed, without publishing drafts', () => {
  for (const file of readdirSync('src/content/blog').filter(name => name.endsWith('.md') && !name.endsWith('.draft.md'))) {
    const route = `/blog/${file.slice(0, -3)}`;
    assert.ok(routes.includes(route), route);
    assert.ok(htmlFor(route).includes('"@type":"Article"'), route);
  }
  assert.ok(routes.every(route => !route.endsWith('.draft')));
});
