export type Article = { slug: string; title: string; description: string; publishedAt: string; author: string; body: string };
const sources = import.meta.glob(['../content/blog/*.md', '!../content/blog/*.draft.md'], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
export const articles: Article[] = Object.entries(sources).map(([file, source]) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
  if (!match) throw new Error(`Missing JSON front matter: ${file}`);
  const meta = JSON.parse(match[1]);
  if (meta.status !== "published") throw new Error(`Only founder-reviewed, published articles belong here: ${file}`);
  const slug = file.split('/').pop()!.replace(/\.md$/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid article slug: ${file}`);
  for (const key of ['title', 'description', 'publishedAt', 'author']) {
    if (typeof meta[key] !== 'string' || !meta[key].trim()) throw new Error(`Missing ${key}: ${file}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.publishedAt) || !Number.isFinite(Date.parse(meta.publishedAt)) || new Date(meta.publishedAt).toISOString().slice(0, 10) !== meta.publishedAt) throw new Error(`Invalid date: ${file}`);
  return { slug, title: meta.title, description: meta.description, publishedAt: meta.publishedAt, author: meta.author, body: match[2].trim() };
}).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
