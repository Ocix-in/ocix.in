import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { assertNoPlaceholders } from '../src/app/content-check.mjs';

test('publication rejects editorial markers but permits real code examples', () => {
  for (const marker of ['[FOUNDER: add a story]', '[CHECK]', '[SHOT: actual result]', '[ASK: confirm]', '[TODO]', 'TBD: price', '<!-- editorial instructions -->', '{{INSERT_NAME}}']) {
    assert.throws(() => assertNoPlaceholders(marker, 'fixture.md'), /Unresolved placeholder/);
  }
  assert.doesNotThrow(() => assertNoPlaceholders('Leave a `TODO(next):` comment.\n```js\n// TODO: implement later\n```', 'code.md'));
});

test('Organization, founder and article schema references resolve in static HTML', () => {
  const files = ['index.html', 'about.html', ...readdirSync('dist/blog').filter(f => f.endsWith('.html')).map(f => `blog/${f}`)];
  for (const file of files) {
    const html = readFileSync(`dist/${file}`, 'utf8');
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const org = data['@graph'].find(node => node['@type'] === 'Organization');
    const founder = data['@graph'].find(node => node['@type'] === 'Person');
    const page = data['@graph'].at(-1);
    assert.equal(org.name, 'OCIX');
    assert.equal(org.founder['@id'], founder['@id']);
    assert.equal(founder.name, 'Vishal Pandey');
    assert.equal(founder.jobTitle, 'Founder');
    assert.equal(founder.worksFor['@id'], org['@id']);
    assert.equal(page.publisher['@id'], org['@id']);
    if (page['@type'] === 'Article') {
      assert.equal(page.author['@id'], founder['@id']);
      assert.match(page.datePublished, /^\d{4}-\d{2}-\d{2}$/);
    }
    if (file === 'about.html') assert.equal(page.mainEntity['@id'], founder['@id']);
  }
});

test('static pages stay within script and logo budgets without shipping article bodies', () => {
  const assets = readdirSync('dist/assets');
  const scripts = assets.filter(file => file.endsWith('.js'));
  assert.ok(scripts.length > 0);
  assert.ok(scripts.reduce((bytes, file) => bytes + statSync(`dist/assets/${file}`).size, 0) < 10_000);
  for (const file of scripts) assert.doesNotMatch(readFileSync(`dist/assets/${file}`, 'utf8'), /Most daily goals are written|hydrateRoot|react\.production/);
  assert.ok(statSync('dist/assets/ocix-logo.webp').size < 12_000);
  const css = assets.filter(file => file.endsWith('.css')).map(file => readFileSync(`dist/assets/${file}`, 'utf8')).join('');
  assert.match(css, /font-display:optional/);
  assert.doesNotMatch(css, /fonts\.googleapis\.com/);
  for (const file of ['index.html', 'blog/daily-commit-target.html']) {
    const html = readFileSync(`dist/${file}`, 'utf8');
    assert.doesNotMatch(html, /ocix-logo-transparent\.png|fonts\.googleapis\.com|\[(?:FOUNDER|CHECK|SHOT|ASK)/);
    assert.match(html, /rel="preload"[^>]+as="font"/);
  }
});
