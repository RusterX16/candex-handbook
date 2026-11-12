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
const { PDFDocument } = await import('pdf-lib');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'dist');
const OUT_DIST = path.join(ROOT, 'pdf');
const OUT_PUBLIC = path.join(__dirname, '..', 'public', 'pdf');
const PORT = 8099;

// Handbook routes to export. Add one line per handbook/locale.
const ROUTES = ['/en/getting-started/', '/fr/getting-started/', '/en/getting-started-dev/', '/fr/getting-started-dev/', '/en/local-installation/', '/fr/local-installation/', '/en/architecture/', '/fr/architecture/', '/en/database/', '/fr/database/', '/en/back-end/', '/fr/back-end/', '/en/front-end/', '/fr/front-end/', '/en/api-contracts/', '/fr/api-contracts/', '/en/deployment/', '/fr/deployment/', '/en/backups/', '/fr/backups/', '/en/testing/', '/fr/testing/', '/en/software-quality/', '/fr/software-quality/', '/en/security/', '/fr/security/', '/en/ui-ux/', '/fr/ui-ux/', '/en/releasing/', '/fr/releasing/', '/en/glossary/', '/fr/glossary/', '/en/product/', '/fr/product/'];

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
const ORDER = ['product','getting-started','getting-started-dev','local-installation','architecture','database','back-end','front-end','api-contracts','ui-ux','security','deployment','backups','testing','software-quality','releasing','glossary'];
const headerTpl = (title) => `<div style="font-size:7px;color:#b3b8bd;width:100%;padding:3px 12mm 0;text-align:right;font-family:Arial,sans-serif;">${title}</div>`;
const footerTpl = () => `<div style="font-size:7.5px;color:#9aa0a6;width:100%;padding:0 12mm 3px;display:flex;justify-content:space-between;font-family:Arial,sans-serif;"><span>Candex Handbook \u00b7 ${AUTHOR}</span><span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`;

// Version printed on the covers: the top CHANGELOG entry, i.e. the version being released.
const VERSION = ((await readFile(path.join(__dirname, '..', 'CHANGELOG.md'), 'utf8')).match(/^## \[(\d+\.\d+\.\d+)\]/m) || [])[1] || '';
const COVER_LABELS = {
  en: { kicker: 'Candex Handbook', by: 'Written by', version: 'Version', locale: 'en-GB' },
  fr: { kicker: 'Candex Handbook', by: 'Rédigé par', version: 'Version', locale: 'fr-FR' },
};

// Cover assets inlined as data URIs: a page built with setContent has no origin
// to load the logo and fonts from.
const PUBLIC = path.join(__dirname, '..', 'public');
const dataUri = async (file, mime) => `data:${mime};base64,${(await readFile(path.join(PUBLIC, file))).toString('base64')}`;
const COVER_ASSETS = {
  logo: await dataUri('logos/candex.svg', 'image/svg+xml'),
  regular: await dataUri('fonts/Rubik-Regular.ttf', 'font/ttf'),
  medium: await dataUri('fonts/Rubik-Medium.ttf', 'font/ttf'),
  bold: await dataUri('fonts/Rubik-Bold.ttf', 'font/ttf'),
};

/**
 * Builds the HTML of a full-bleed A4 cover page.
 *
 * @param {{ title: string, description: string, lang: 'en' | 'fr' }} cover - What the cover announces.
 * @returns {string} A self-contained HTML document (logo and fonts inlined).
 */
const coverHtml = ({ title, description, lang }) => {
  const l = COVER_LABELS[lang];
  const a = COVER_ASSETS;
  const date = new Date().toLocaleDateString(l.locale, { month: 'long', year: 'numeric' });
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
    @font-face { font-family: Rubik; font-weight: 400; src: url('${a.regular}'); }
    @font-face { font-family: Rubik; font-weight: 500; src: url('${a.medium}'); }
    @font-face { font-family: Rubik; font-weight: 700; src: url('${a.bold}'); }
    @page { size: A4; margin: 0; }
    * { margin: 0; box-sizing: border-box; }
    body { width: 210mm; height: 297mm; font-family: Rubik, Arial, sans-serif; color: #033C44; background: #fff;
           display: flex; flex-direction: column; padding: 34mm 24mm 22mm; position: relative; overflow: hidden; }
    .band { position: absolute; left: 0; top: 0; bottom: 0; width: 9mm; background: linear-gradient(#00B1FF, #033C44); }
    .logo { width: 46mm; margin: 0 0 30mm -2mm; }
    .kicker { font-weight: 500; font-size: 11pt; letter-spacing: .28em; text-transform: uppercase; color: #00B1FF; }
    h1 { font-weight: 700; font-size: 36pt; line-height: 1.1; margin: 5mm 0 7mm; }
    .rule { width: 28mm; height: 1.4mm; background: #00B1FF; border-radius: 1mm; margin-bottom: 8mm; }
    p { font-size: 12.5pt; line-height: 1.55; color: #3d5a60; max-width: 140mm; }
    footer { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end;
             border-top: .3mm solid #d5e3e6; padding-top: 6mm; font-size: 10pt; color: #5f7a80; }
    footer strong { display: block; font-weight: 500; font-size: 14pt; color: #033C44; margin-top: 1.5mm; }
    footer .meta { text-align: right; line-height: 1.6; }
  </style></head><body>
    <div class="band"></div>
    <img class="logo" src="${a.logo}" alt="Candex">
    <div class="kicker">${l.kicker}</div>
    <h1>${esc(title)}</h1>
    <div class="rule"></div>
    <p>${esc(description)}</p>
    <footer>
      <div>${l.by}<strong>${AUTHOR}</strong></div>
      <div class="meta">${VERSION ? `${l.version} ${VERSION}<br>` : ''}${date}<br>candex.app</div>
    </footer>
  </body></html>`;
};

/**
 * Renders a cover page to PDF bytes.
 *
 * @param {import('playwright').Browser} browser - The running Chromium instance.
 * @param {{ title: string, description: string, lang: 'en' | 'fr' }} cover - What the cover announces.
 * @returns {Promise<Buffer>} A one-page A4 PDF.
 */
const renderCover = async (browser, cover) => {
  const page = await browser.newPage();
  await page.setContent(coverHtml(cover), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const bytes = await page.pdf({ format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.close();
  return bytes;
};

/**
 * Concatenates PDFs in order.
 *
 * @param {Array<Uint8Array>} parts - The PDF files to join.
 * @returns {Promise<Uint8Array>} The merged PDF.
 */
const mergePdfs = async (parts) => {
  const merged = await PDFDocument.create();
  for (const bytes of parts) {
    const doc = await PDFDocument.load(bytes);
    (await merged.copyPages(doc, doc.getPageIndices())).forEach((pg) => merged.addPage(pg));
  }
  return merged.save();
};

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
  const { h1, description } = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.innerText.trim() ?? '',
    description: document.querySelector('meta[name="description"]')?.content ?? '',
  }));
  const headerTitle = h1 ? `${h1} \u2014 Candex Handbook` : 'Candex Handbook';
  const dest = path.join(OUT_DIST, name);
  const content = await page.pdf({ format: 'A4', printBackground: true, displayHeaderFooter: true, headerTemplate: headerTpl(headerTitle), footerTemplate: footerTpl(), margin: { top: '17mm', bottom: '16mm', left: '12mm', right: '12mm' } });
  const cover = await renderCover(browser, { title: h1 || 'Candex Handbook', description, lang: route.split('/')[1] });
  await writeFile(dest, await mergePdfs([cover, content]));
  await copyFile(dest, path.join(OUT_PUBLIC, name));
  console.log('exported', name);
  await page.close();
}
// Combined PDF per language: a global cover, then every handbook (each keeps its
// own cover, which doubles as a section divider) in reading order.
const COMBINED = {
  en: { title: 'The complete handbook', description: 'Every Candex handbook in one document — the product, the domain, the architecture, and how the app, the API, and the dashboard are built, tested, and shipped.' },
  fr: { title: 'Le handbook complet', description: 'Tous les handbooks Candex en un seul document — le produit, le domaine, l’architecture, et comment l’app, l’API et le dashboard sont construits, testés et livrés.' },
};
for (const lang of ['en', 'fr']) {
  const parts = [await renderCover(browser, { ...COMBINED[lang], lang })];
  for (const slug of ORDER) {
    const src = path.join(OUT_DIST, `${slug}-${lang}.pdf`);
    if (existsSync(src)) parts.push(await readFile(src));
  }
  const bytes = await mergePdfs(parts);
  const outName = `candex-handbook-${lang}.pdf`;
  await writeFile(path.join(OUT_DIST, outName), bytes);
  await writeFile(path.join(OUT_PUBLIC, outName), bytes);
  console.log('merged', outName);
}
await browser.close();
await new Promise((r) => server.close(r));

console.log('PDF export complete');
