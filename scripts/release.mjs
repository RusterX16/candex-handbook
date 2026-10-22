#!/usr/bin/env node
/*
 * Release script for the Candex Handbook.
 *
 * Runs the full historisation ritual for one version:
 *   1. check that CHANGELOG.md has an entry for the version (fails fast if not)
 *   2. build the site            (npm run build)
 *   3. export the PDFs + combined (npm run pdf)
 *   4. snapshot public/pdf/*.pdf into releases/v<version>/
 *   5. git add + commit + tag v<version>   (never pushes)
 *
 * Usage:
 *   npm run release -- 0.19.0          # or: node scripts/release.mjs 0.19.0
 *   npm run release -- 0.19.0 --no-git     skip the git commit/tag
 *   npm run release -- 0.19.0 --skip-build reuse the current build/PDFs
 *
 * Pushing (commits + tags) is left to you:  git push && git push --tags
 */
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, readdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const raw = args.find((a) => !a.startsWith('--'));

function die(msg) { console.error(`\n✗ ${msg}\n`); process.exit(1); }
function run(cmd) { console.log(`› ${cmd}`); execSync(cmd, { cwd: ROOT, stdio: 'inherit' }); }

if (!raw) die('No version given. Usage: npm run release -- <version>  (e.g. 0.19.0)');
const version = raw.replace(/^v/, '');
if (!/^\d+\.\d+\.\d+$/.test(version)) die(`Invalid version "${raw}". Expected x.y.z (e.g. 0.19.0).`);
const tag = `v${version}`;

// 0) tag must not already exist
try {
  const tags = execSync('git tag', { cwd: ROOT }).toString().split('\n');
  if (tags.includes(tag)) die(`Tag ${tag} already exists.`);
} catch { /* not a git repo yet — git step will surface it later */ }

// 1) CHANGELOG entry must exist (fail fast, before the slow build)
const changelogPath = path.join(ROOT, 'CHANGELOG.md');
const changelog = existsSync(changelogPath) ? readFileSync(changelogPath, 'utf8') : '';
if (!changelog.includes(`## [${version}]`)) {
  const today = new Date().toISOString().slice(0, 10);
  const stub = `## [${version}] — ${today}\n\n### Added\n- \n\n`;
  const at = changelog.search(/^## \[/m);
  const next = at === -1 ? changelog + '\n' + stub : changelog.slice(0, at) + stub + changelog.slice(at);
  writeFileSync(changelogPath, next);
  die(`No CHANGELOG entry for ${version}. A stub was added at the top of CHANGELOG.md — fill in the notes, then re-run.`);
}

console.log(`\nReleasing ${tag}\n`);

// 2) build + 3) export PDFs (unless skipped)
if (!flags.has('--skip-build')) {
  run('npm run build');
  run('npm run pdf');
} else {
  console.log('‣ --skip-build: reusing the current build and PDFs');
}

// 4) snapshot the PDFs
const pdfDir = path.join(ROOT, 'public', 'pdf');
const relDir = path.join(ROOT, 'releases', tag);
if (!existsSync(pdfDir)) die(`${pdfDir} not found — did the PDF export run?`);
mkdirSync(relDir, { recursive: true });
const pdfs = readdirSync(pdfDir).filter((f) => f.endsWith('.pdf'));
if (pdfs.length === 0) die('No PDFs found to snapshot.');
for (const f of pdfs) copyFileSync(path.join(pdfDir, f), path.join(relDir, f));
console.log(`✓ snapshot: releases/${tag}/ (${pdfs.length} PDFs)`);

// 5) git commit + tag (never push)
if (!flags.has('--no-git')) {
  run('git add -A');
  run(`git commit -m "docs: release ${tag}"`);
  run(`git tag ${tag}`);
  console.log(`\n✓ committed and tagged ${tag}.`);
  console.log('→ To publish:  git push && git push --tags');
} else {
  console.log('‣ --no-git: skipped commit/tag. Changes are staged in your working tree.');
}
console.log(`\n✓ Release ${tag} done.\n`);
