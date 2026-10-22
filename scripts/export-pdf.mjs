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
import { readFile, mkdir, copyFile, writeFile } from 'node:fs/promises';
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

const AUTHOR = 'Eliott Barbet';
const ORDER = ['product','getting-started','getting-started-dev','local-installation','architecture','database','back-end','front-end','api-contracts','ui-ux','security','deployment','backups','testing','software-quality','glossary'];
const headerTpl = (title) => `<div style="font-size:7px;color:#b3b8bd;width:100%;padding:3px 12mm 0;text-align:right;font-family:Arial,sans-serif;">${title}</div>`;
const footerTpl = () => `<div style="font-size:7.5px;color:#9aa0a6;width:100%;padding:0 12mm 3px;display:flex;justify-content:space-between;font-family:Arial,sans-serif;"><span>Candex Handbook \u00b7 ${AUTHOR}</span><span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;

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
  const h1 = await page.evaluate(() => { const h = document.querySelector('h1'); return h ? h.innerText.trim() : ''; });
  const headerTitle = h1 ? `${h1} \u2014 Candex Handbook` : 'Candex Handbook';
  const dest = path.join(OUT_DIST, name);
  await page.pdf({ path: dest, format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: headerTpl(headerTitle), footerTemplate: footerTpl(), margin: { top: '17mm', bottom: '16mm', left: '12mm', right: '12mm' } });
  await copyFile(dest, path.join(OUT_PUBLIC, name));
  console.log('exported', name);
  await page.close();
}
await browser.close();
await new Promise((r) => server.close(r));

// Merge per-handbook PDFs into one combined PDF per language (reading order).
try {
  const { PDFDocument } = await import('pdf-lib');
  for (const lang of ['en', 'fr']) {
    const merged = await PDFDocument.create();
    for (const slug of ORDER) {
      const src = path.join(OUT_DIST, `${slug}-${lang}.pdf`);
      if (!existsSync(src)) continue;
      const doc = await PDFDocument.load(await readFile(src));
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach((pg) => merged.addPage(pg));
    }
    const bytes = await merged.save();
    const outName = `candex-handbook-${lang}.pdf`;
    await writeFile(path.join(OUT_DIST, outName), bytes);
    await writeFile(path.join(OUT_PUBLIC, outName), bytes);
    console.log('merged', outName);
  }
} catch (e) {
  console.warn('combined PDF skipped (install pdf-lib: npm i -D pdf-lib):', e.message);
}

console.log('PDF export complete');
