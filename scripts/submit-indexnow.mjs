// Tells IndexNow (Bing, Yandex, Seznam, Naver) that pages are new or changed, so they
// are considered without waiting for the next crawl. Run it after a guide merges and
// the deploy is live.
//
//   node scripts/submit-indexnow.mjs --since <git-ref>   # guides added since that ref, and their tool pages
//   node scripts/submit-indexnow.mjs https://tools.nyxiontech.com/guides/some-page
//   npm run indexnow -- --since 2b2d918 --dry-run
//
// Pass single pages as whole addresses. Git Bash on Windows rewrites an argument that
// starts with a slash into a Windows path, so "/guides/x" arrives as "C:/Program
// Files/Git/guides/x" and would otherwise be dropped without a word.
//
// Every URL is fetched first and the submission is refused unless all of them answer
// 200. Submitting an address that 404s is worse than not submitting at all, and the
// addresses come from the source tree, which is always a step ahead of the deploy.
//
// The key is the file in public/ whose name is 32 hex characters; IndexNow takes the
// file at the site root as proof that whoever submits controls the domain, so the name
// and the contents have to match.
import { readdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const SITE = 'https://tools.nyxiontech.com';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const PUBLIC = 'public';
// A plain client name: never anything identifying the person running this.
const AGENT = 'Mozilla/5.0 (compatible; nyxiontech-indexnow)';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const sinceAt = args.indexOf('--since');
const since = sinceAt === -1 ? null : args[sinceAt + 1];
// Without --since there is no value to skip, and skipping index 0 would eat a page.
const sinceValueAt = sinceAt === -1 ? -1 : sinceAt + 1;

function fail(message) {
  console.error(message);
  process.exit(1);
}

/** One page, given as a whole address or as a path, to the path this site uses. */
function toPath(arg) {
  if (arg.startsWith(`${SITE}/`)) return new URL(arg).pathname;
  if (arg.startsWith('/')) return arg;
  // Git Bash turned a leading slash into a Windows path before we ever saw it.
  const mangled = /^[A-Za-z]:[\\/].*[\\/](guides|pl)[\\/]/.exec(arg);
  if (mangled) fail(`"${arg}" reached this script as a Windows path. Pass the whole address instead, starting ${SITE}/.`);
  return fail(`"${arg}" is neither an address on ${SITE} nor a path starting with "/".`);
}

const explicit = args.filter((a, i) => i !== sinceValueAt && !a.startsWith('--')).map(toPath);

/** The key file at the site root, which has to be named after the key it contains. */
function readKey() {
  const file = readdirSync(PUBLIC).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!file) fail(`No IndexNow key file in ${PUBLIC}/ (a file named <32 hex characters>.txt).`);
  const key = readFileSync(join(PUBLIC, file), 'utf8').trim();
  if (`${key}.txt` !== file) fail(`${PUBLIC}/${file} does not contain its own name, so IndexNow will reject it.`);
  return key;
}

/**
 * The guides added since a git ref, and the tool page each one is about, because that
 * page gained a link to it. Paths come from the source rather than the sitemap so this
 * can run before a deploy; the check below is what stops anything unpublished going out.
 */
function addedSince(ref) {
  const diff = execFileSync('git', ['diff', `${ref}..HEAD`, '--', 'src/seo/guides.ts'], { encoding: 'utf8' });
  const added = new Set([...diff.matchAll(/^\+ *path: '([^']+)'/gm)].map((m) => m[1]));
  if (!added.size) fail(`No guides were added between ${ref} and HEAD.`);

  const routes = readFileSync(join('src', 'utilities', 'routes.ts'), 'utf8');
  const slugs = {};
  for (const m of routes.matchAll(/'?([a-z-]+)'?:\s*\{\s*en:\s*'([^']+)',\s*pl:\s*'([^']+)'/g)) slugs[m[1]] = { en: m[2], pl: m[3] };

  const guides = readFileSync(join('src', 'seo', 'guides.ts'), 'utf8');
  const tools = new Set();
  let found = 0;
  for (const [, path, lang, tool] of guides.matchAll(/path: '([^']+)',\s*lang: '([^']+)',\s*tool: '([^']+)'/g)) {
    if (!added.has(path)) continue;
    found++;
    if (!slugs[tool]) fail(`Guide ${path} names tool "${tool}", which is not in routes.ts.`);
    tools.add(`/${lang === 'pl' ? 'pl/' : ''}${slugs[tool][lang]}`);
  }
  if (found !== added.size) fail(`Found ${found} of ${added.size} added guides in guides.ts; the file may have been reformatted.`);
  return [...added, ...tools].sort();
}

const paths = since ? addedSince(since) : explicit;
if (!paths.length) fail('Nothing to submit. Pass paths starting with "/", or --since <git-ref>.');

const urls = paths.map((p) => SITE + p);
console.log(`${urls.length} URL(s) to submit:`);
for (const u of urls) console.log(`  ${u}`);

// Check them all before sending any, and name every failure rather than the first.
console.log('\nChecking each one is live.');
const bad = [];
for (const url of urls) {
  let status = 'no response';
  try {
    status = (await fetch(url, { headers: { 'user-agent': AGENT }, redirect: 'manual' })).status;
  } catch (e) {
    status = e.message;
  }
  if (status !== 200) bad.push(`${url} answered ${status}`);
}
if (bad.length) fail(`Not submitting. These are not live:\n  ${bad.join('\n  ')}\nWait for the deploy, then run this again.`);
console.log(`All ${urls.length} answered 200.`);

const key = readKey();
const body = { host: new URL(SITE).host, key, keyLocation: `${SITE}/${key}.txt`, urlList: urls };

if (dryRun) {
  console.log(`\nDry run, nothing sent. Would POST to ${ENDPOINT} with keyLocation ${body.keyLocation}.`);
  process.exit(0);
}

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8', 'user-agent': AGENT },
  body: JSON.stringify(body),
});
const text = (await res.text()).trim();
if (res.status !== 200 && res.status !== 202) fail(`IndexNow answered ${res.status}. ${text}`);

console.log(`\nIndexNow accepted the batch (HTTP ${res.status}).${text ? ` ${text}` : ''}`);
console.log('Accepted means queued for consideration, not indexed: the engines still decide.');
console.log('Record what was sent and when in marketing/README.md.');
