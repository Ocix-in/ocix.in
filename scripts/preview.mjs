import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

// Serve generated files, including clean URLs and real 404 responses. No SPA fallback.
const root = path.resolve('dist');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.xml':'application/xml', '.txt':'text/plain', '.png':'image/png', '.webp':'image/webp', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff2':'font/woff2' };
http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const route = decodeURIComponent(url.pathname);
    if (route !== '/' && route.endsWith('/')) { res.writeHead(308, { Location: route.replace(/\/+$/, '') + url.search }); res.end(); return; }
    const file = route === '/' ? 'index.html' : path.extname(route) ? route.slice(1) : `${route.slice(1)}.html`;
    const target = path.resolve(root, file);
    if (!target.startsWith(root + path.sep)) { res.writeHead(400); res.end(); return; }
    const data = await readFile(target);
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); res.end(data);
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'EISDIR') { res.writeHead(400); res.end('Bad request'); return; }
    res.writeHead(404, { 'Content-Type':'text/html; charset=utf-8' });
    res.end(await readFile(path.join(root, '404.html')));
  }
}).listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log('OCIX production preview: http://127.0.0.1:' + (process.env.PORT || 4173)));
