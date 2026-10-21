/*
  Candex Handbook — PDF export.
  Builds (run `npm run build` first), serves dist/, and prints each handbook
  to an A4 PDF with an intentional print style and the light theme forced.
  Requires Playwright: `npm i -D playwright && npx playwright install chromium`.
  Usage: npm run build && npm run pdf
*/
import { createRequire } from 'node:module';
import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'dist');
const OUT = path.join(__dirname, '..', 'pdf');
const PORT = 8099;

// One entry per handbook route to export, per locale.
const EXPORTS = [
  { route: '/en/getting-started/', file: 'Candex_Getting_Started_EN.pdf' },
  { route: '/fr/getting-started/', file: 'Candex_Getting_Started_FR.pdf' },
];

const TYPES = { '.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.png':'image/png','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain','.wasm':'application/wasm' };

if (!existsSync(ROOT)) { console.error('dist/ not found — run `npm run build` first.'); process.exit(1); }
await mkdir(OUT, { recursive: true });

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
for (const ex of EXPORTS) {
  const page = await browser.newPage();
  await page.addInitScript(() => { try { localStorage.setItem('starlight-theme', 'light'); } catch (e) {} });
  await page.goto(`http://localhost:${PORT}${ex.route}`, { waitUntil: 'load' });
  await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
  try { await page.waitForSelector('pre.mermaid svg', { timeout: 20000 }); } catch (e) { /* page may have no diagram */ }
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.pdf({ path: path.join(OUT, ex.file), format: 'A4', printBackground: true, margin: { top: '16mm', bottom: '16mm', left: '14mm', right: '14mm' } });
  console.log('exported', ex.file);
  await page.close();
}
await browser.close();
await new Promise((r) => server.close(r));
console.log('PDF export complete →', OUT);
