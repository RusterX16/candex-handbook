/*
  Candex Handbook — PDF export.
  Builds (run `npm run build` first), serves dist/, and prints each handbook to
  an A4 PDF with an intentional print style and the light theme forced.
  Output goes to dist/pdf (served by build/preview/prod) and public/pdf (served
  by `npm run dev`). File names match the Download button: <slug>-<locale>.pdf.
  Requires Playwright: `npm i -D playwright && npx playwright install chromium`.
  Usage: npm run build && npm run pdf
*/
import { createRequire } from 'node:module';
import http from 'node:http';
import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'dist');
const OUT_DIST = path.join(ROOT, 'pdf');
const OUT_PUBLIC = path.join(__dirname, '..', 'public', 'pdf');
const PORT = 8099;

// Handbook routes to export. Add one line per handbook/locale.
const ROUTES = ['/en/getting-started/', '/fr/getting-started/', '/en/getting-started-dev/', '/fr/getting-started-dev/', '/en/local-installation/', '/fr/local-installation/', '/en/architecture/', '/fr/architecture/', '/en/database/', '/fr/database/', '/en/back-end/', '/fr/back-end/', '/en/front-end/', '/fr/front-end/', '/en/api-contracts/', '/fr/api-contracts/', '/en/deployment/', '/fr/deployment/', '/en/backups/', '/fr/backups/', '/en/testing/', '/fr/testing/', '/en/software-quality/', '/fr/software-quality/', '/en/security/', '/fr/security/', '/en/ui-ux/', '/fr/ui-ux/', '/en/glossary/', '/fr/glossary/', '/en/product/', '/fr/product/'];

const fileFor = (route) => {
  const parts = route.split('/').filter(Boolean); // ['en','getting-started']
  const locale = parts[0];
  const slug = parts[parts.length - 1];
  return `${slug}-${locale}.pdf`;
};

const TYPES = { '.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.png':'image/png','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain','.wasm':'application/wasm' };

if (!existsSync(ROOT)) { console.error('dist/ not found — run `npm run build` first.'); process.exit(1); }
await mkdir(OUT_DIST, { recursive: true });
await mkdir(OUT_PUBLIC, { recursive: true });

const server = http.createServer(async (req, res) => {
  try {
    let fp = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if (existsSync(fp) && statSync(fp).isDirectory()) fp = path.join(fp, 'index.html');
    if (!existsSync(fp)) { res.statusCode = 404; res.end('not found'); return; }
    res.setHeader('Content-Type', TYPES[path.extname(fp)] || 'application/octet-stream');
    res.end(await readFile(fp));
  } catch (e) { res.statusCode = 500; res.end(String(e)); }
});
await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch();
for (const route of ROUTES) {
  const name = fileFor(route);
  const page = await browser.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('starlight-theme', 'light'); } catch (e) {} });
  await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'load' });
  await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
  try { await page.waitForSelector('pre.mermaid svg', { timeout: 20000 }); } catch (e) { /* no diagram */ }
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  const dest = path.join(OUT_DIST, name);
  await page.pdf({ path: dest, format: 'A4', printBackground: true, margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' } });
  await copyFile(dest, path.join(OUT_PUBLIC, name));
  console.log('exported', name);
  await page.close();
}
await browser.close();
await new Promise((r) => server.close(r));
console.log('PDF export complete');
