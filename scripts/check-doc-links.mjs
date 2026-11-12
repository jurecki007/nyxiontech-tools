// Checks that every link inside the repository's own Markdown files still points at
// something: a file that exists, and a heading that exists. A broken "#code-signing-policy"
// or a renamed PRIVACY.md is invisible until a reader clicks it, and the README is the page
// most visitors see before they decide anything, so it is the worst place to leave one.
//
//   npm run docs:check
//
// Repository-relative only, on purpose. Every path is resolved on disk and no request is
// made, so this runs in the build (prebuild) without a network and can never fail because
// somebody else's site was down. External links are left to a human.
//
// GitHub's own anchor rules are reproduced below: lower case, punctuation dropped, spaces
// to hyphens, and a repeated heading gets "-1", "-2" and so on.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, normalize, relative, resolve } from 'node:path';

const ROOT = process.cwd();

/** The Markdown files the project maintains: the repository root and .github. */
function docs() {
  const out = readdirSync(ROOT).filter((f) => f.endsWith('.md'));
  const gh = join(ROOT, '.github');
  if (existsSync(gh)) for (const f of readdirSync(gh)) if (f.endsWith('.md')) out.push(join('.github', f));
  return out.sort();
}

/** Text with fenced and inline code removed, so a link inside an example is not checked. */
const withoutCode = (md) => md.replace(/^```[\s\S]*?^```/gm, '').replace(/`[^`\n]*`/g, '');

/**
 * GitHub's heading anchor: lower case, drop everything that is not a letter, a number,
 * a space or a hyphen, then spaces to hyphens. Repeats get a numeric suffix.
 */
function anchors(md) {
  const seen = new Map();
  const out = new Set();
  for (const [, text] of withoutCode(md).matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)) {
    const base = text
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N} -]/gu, '')
      .replace(/ /g, '-');
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.add(n === 0 ? base : `${base}-${n}`);
  }
  // <a name="…"> and <a id="…"> are anchors too, and footnotes define their own.
  for (const [, id] of md.matchAll(/<a\s+(?:name|id)="([^"]+)"/g)) out.add(id);
  for (const [, id] of md.matchAll(/^\[\^([^\]]+)\]:/gm)) out.add(`user-content-fn-${id}`);
  return out;
}

const problems = [];
const files = docs();

for (const file of files) {
  const md = readFileSync(join(ROOT, file), 'utf8');
  const own = anchors(md);
  const text = withoutCode(md);
  // [label](target) where the target is not an external URL, a mail address or a footnote.
  for (const [, label, raw] of text.matchAll(/\[([^\]^][^\]]*)\]\(\s*(<[^>]*>|[^()\s]+)\s*(?:"[^"]*")?\)/g)) {
    const target = raw.replace(/^<|>$/g, '');
    if (/^(https?:|mailto:|tel:)/i.test(target)) continue;
    const [path, hash] = target.split('#');
    const where = `${file}: [${label}](${target})`;

    if (!path) {
      if (!own.has(decodeURIComponent(hash))) problems.push(`${where} -> no heading "#${hash}" in this file`);
      continue;
    }
    const abs = resolve(ROOT, dirname(file), decodeURIComponent(path));
    if (!abs.startsWith(ROOT)) {
      problems.push(`${where} -> leaves the repository`);
      continue;
    }
    if (!existsSync(abs)) {
      problems.push(`${where} -> ${normalize(relative(ROOT, abs))} does not exist`);
      continue;
    }
    if (hash && statSync(abs).isFile() && abs.endsWith('.md')) {
      const theirs = anchors(readFileSync(abs, 'utf8'));
      if (!theirs.has(decodeURIComponent(hash))) problems.push(`${where} -> no heading "#${hash}" in ${normalize(relative(ROOT, abs))}`);
    }
  }
}

if (problems.length) {
  console.error(`Broken links in the project's Markdown (${problems.length}):\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error('\nFix the link, or the heading it names.');
  process.exit(1);
}
console.log(`Links check: ${files.length} Markdown files, every repository link and heading resolves.`);
