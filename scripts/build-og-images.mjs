// Draws the social card every page shows when its address is pasted into a chat,
// a post or a search result preview: one 1200x630 PNG per page in public/og/.
//
// The cards are generated from the built pages themselves (dist/**/*.html), so a
// card can never say something the page does not: the headline is the page's own
// <h1>, the line under it its meta description, and the file name comes from the
// og:image tag that src/seo/pages.ts wrote. Fonts are loaded from node_modules
// rather than the system, so the same page gives the same pixels on any machine.
//
//   npm run build && npm run og:build
//
// Nothing is allowed to fall off the card: after each render the script measures
// the headline, the description and the block that holds them, and fails naming
// any page whose text did not fit, rather than shipping a card with a cut word.
//
// The results are committed. The normal build only copies them, so it needs
// neither Playwright nor a browser. tests/e2e/routing.spec.ts fails if a page
// points at a card that is not there.
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { chromium } from '@playwright/test';

const DIST = 'dist';
const OUT = join('public', 'og');
const WIDTH = 1200;
const HEIGHT = 630;

// Brand, from src/styles.css and public/favicon.svg.
const DARK = '#14171c';
const ACCENT = '#7b93ff';
const MUTED = '#aeb4bf';

const FONT_DIR = join('node_modules', '@expo-google-fonts', 'open-sans');
const FONTS = {
  regular: join(FONT_DIR, '400Regular', 'OpenSans_400Regular.ttf'),
  semibold: join(FONT_DIR, '600SemiBold', 'OpenSans_600SemiBold.ttf'),
  bold: join(FONT_DIR, '700Bold', 'OpenSans_700Bold.ttf'),
};

// A home page needs no label above its own name, so it has none here.
const COPY = {
  en: { tagline: 'Open source, no account, no uploads', guide: 'Guide', tool: 'Tool' },
  pl: { tagline: 'Otwarty kod, bez konta, bez wysyłania plików', guide: 'Poradnik', tool: 'Narzędzie' },
};

/** Every .html file under dist, deepest last; order only affects progress output. */
function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) out.push(...htmlFiles(path));
    else if (entry.endsWith('.html')) out.push(path);
  }
  return out;
}

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const one = (html, pattern) => decode(pattern.exec(html)?.[1] ?? '');

/**
 * A card shows one whole sentence rather than a 155-character meta description
 * cut off mid-word. A full stop only ends a sentence here when a capital follows
 * it, so "art. 32" and "np. w przeglądarce" stay in one piece.
 */
function firstSentence(description) {
  const first = /^.*?[.!?](?=\s+[A-ZĄĆĘŁŃÓŚŹŻ]|$)/.exec(description)?.[0];
  return first && first.length >= 40 ? first : description;
}

/** What a page says about itself: the card never invents anything. */
function readPage(file) {
  const html = readFileSync(file, 'utf8');
  const image = one(html, /<meta property="og:image" content="([^"]*)"/);
  // Only pages that asked for their own card; the English home keeps the hand-made one.
  const name = /\/og\/([^/"]+)\.png$/.exec(image)?.[1];
  if (!name) return null;
  const rel = relative(DIST, file).replace(/\\/g, '/');
  return {
    name,
    file: rel,
    lang: one(html, /<html lang="([^"]*)"/) === 'pl' ? 'pl' : 'en',
    headline: one(html, /<h1>([^<]*)<\/h1>/),
    description: firstSentence(one(html, /<meta name="description" content="([^"]*)"/)),
    kind: /(^|\/)(guides|poradnik)\//.test(rel) ? 'guide' : /(^|\/)index\.html$/.test(rel) ? 'home' : 'tool',
  };
}

/**
 * Long headlines step down in size and spread wider rather than overflow or
 * shrink to nothing. Three lines at the largest of these still leaves room for
 * the description and the tagline; the fit check after each render proves it.
 */
function headlineStyle(text) {
  if (text.length <= 38) return { size: 72, width: 680 };
  if (text.length <= 64) return { size: 58, width: 860 };
  if (text.length <= 96) return { size: 48, width: 920 };
  return { size: 40, width: 960 };
}

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function card(page, fontCss) {
  const c = COPY[page.lang];
  const eyebrow = page.kind === 'home' ? '' : page.kind === 'guide' ? c.guide : c.tool;
  const h = headlineStyle(page.headline);
  return `<!doctype html>
<html lang="${page.lang}">
  <head>
    <meta charset="utf-8" />
    <style>
      ${fontCss}
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden;
        background: ${DARK}; color: #fff;
        font-family: 'OG Sans', sans-serif; font-synthesis: none;
        -webkit-font-smoothing: antialiased;
      }
      .card {
        position: relative; width: 100%; height: 100%;
        padding: 56px 72px; display: flex; flex-direction: column;
        border-left: 10px solid ${ACCENT};
      }
      /* A soft accent behind the lower right corner, so the card is not a flat rectangle. */
      .glow {
        position: absolute; right: -180px; bottom: -220px; width: 760px; height: 760px;
        background: radial-gradient(circle, rgba(123, 147, 255, 0.22) 0%, rgba(123, 147, 255, 0) 68%);
      }
      .top { display: flex; align-items: center; gap: 20px; }
      .mark { width: 72px; height: 72px; flex: none; }
      .wordmark { font-size: 36px; font-weight: 700; letter-spacing: 0.5px; line-height: 1.1; }
      .wordmark i { color: ${ACCENT}; font-style: normal; }
      .wordmark span { display: block; font-size: 18px; font-weight: 400; color: ${MUTED}; letter-spacing: 0.2px; }
      /* min-height keeps the tagline on the card even if the text above ever grows. */
      .body {
        flex: 1; min-height: 0; overflow: hidden;
        display: flex; flex-direction: column; justify-content: center; padding: 20px 0;
      }
      .eyebrow {
        font-size: 19px; font-weight: 700; letter-spacing: 2.4px; text-transform: uppercase;
        color: ${ACCENT}; margin-bottom: 16px;
      }
      h1 {
        font-size: ${h.size}px; font-weight: 700; line-height: 1.12;
        letter-spacing: -0.5px; max-width: ${h.width}px; text-wrap: balance;
        display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
      }
      p {
        margin-top: 20px; font-size: 23px; line-height: 1.4; color: ${MUTED}; max-width: 880px;
        display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
      }
      .foot { display: flex; align-items: baseline; gap: 16px; font-size: 22px; }
      .foot b { font-weight: 600; color: ${ACCENT}; }
      .foot span { color: ${MUTED}; font-size: 20px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="glow"></div>
      <div class="top">
        <svg class="mark" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 23V9l12 14V9" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="25.5" cy="22.5" r="2.5" fill="${ACCENT}" />
        </svg>
        <div class="wordmark">NYXION<i>TECH</i><span>tools.nyxiontech.com</span></div>
      </div>
      <div class="body">
        ${eyebrow ? `<div class="eyebrow">${escapeHtml(eyebrow)}</div>` : ''}
        <h1>${escapeHtml(page.headline)}</h1>
        <p>${escapeHtml(page.description)}</p>
      </div>
      <div class="foot"><b>${escapeHtml(c.tagline)}</b></div>
    </div>
  </body>
</html>`;
}

function fontFace(file, weight) {
  const data = readFileSync(file).toString('base64');
  return `@font-face { font-family: 'OG Sans'; font-weight: ${weight}; font-style: normal; src: url(data:font/ttf;base64,${data}) format('truetype'); }`;
}

const pages = htmlFiles(DIST)
  .map(readPage)
  .filter(Boolean)
  .sort((a, b) => a.name.localeCompare(b.name));

if (!pages.length) {
  console.error(`No pages with an /og/ card found in ${DIST}. Run "npm run build" first.`);
  process.exit(1);
}

const missing = pages.filter((p) => !p.headline || !p.description);
if (missing.length) {
  console.error(`These pages have no <h1> or no description, so their card would be empty: ${missing.map((p) => p.file).join(', ')}`);
  process.exit(1);
}

const fontCss = [fontFace(FONTS.regular, 400), fontFace(FONTS.semibold, 600), fontFace(FONTS.bold, 700)].join('\n      ');

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
const clipped = [];
for (const meta of pages) {
  await page.setContent(card(meta, fontCss), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  writeFileSync(join(OUT, `${meta.name}.png`), await page.screenshot({ type: 'png' }));
  // Did every word survive the layout? Lifting the line clamp shows how tall the
  // text wanted to be, which catches a headline or a sentence losing its tail.
  // A line-height tighter than the font's own would make scrollHeight lie here.
  const cut = await page.evaluate(() => {
    const hidden = (sel) => {
      const el = document.querySelector(sel);
      const clamped = el.getBoundingClientRect().height;
      el.style.webkitLineClamp = 'unset';
      const full = el.getBoundingClientRect().height;
      el.style.webkitLineClamp = '';
      return full - clamped > 1;
    };
    const body = document.querySelector('.body');
    return ['h1', 'p']
      .filter(hidden)
      .concat(body.scrollHeight - body.clientHeight > 2 ? ['the block that holds them'] : [])
      .join(' and ');
  });
  if (cut) clipped.push(`${meta.name} (${cut})`);
}
await browser.close();

if (clipped.length) {
  console.error(`These cards cut their own text off, so the headline or sentence would read wrong:\n  ${clipped.join('\n  ')}`);
  process.exit(1);
}

console.log(`Wrote ${pages.length} social cards to ${OUT}/.`);
