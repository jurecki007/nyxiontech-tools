import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Why this file exists: an axe run on 13 Nov 2026 found exactly one failing rule across the
// site, color-contrast, on the two muted greys. Both were a tenth of a point under the
// threshold, which is the kind of thing that comes back the next time somebody nudges a
// colour. The tokens now sit at values that clear AA, and this keeps them there.
//
// The assertion is the whole of WCAG 2.1 A and AA rather than the contrast rule alone,
// because at the time of writing these pages pass all of it, and a narrower test would let
// a different rule break without anyone noticing.

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const PAGES = [
  { name: 'the dashboard', path: '/' },
  { name: 'a tool page', path: '/merge-pdf' },
  { name: 'the Polish dashboard', path: '/pl/' },
  { name: 'the guides index', path: '/guides' },
];

test.describe('accessibility', () => {
  for (const { name, path } of PAGES) {
    test(`${name} has no WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(path);
      // The dashboard paints its tool grid after the first frame; without this the scan can
      // run against an empty main area and pass for the wrong reason.
      await page.locator('body').waitFor();
      await page.waitForLoadState('networkidle');

      const { violations } = await new AxeBuilder({ page }).withTags(WCAG).analyze();

      // Name the rule and a sample target in the failure message, so a red CI run says what
      // broke without anyone having to download the report.
      const summary = violations.map(
        (v) => `${v.id} (${v.impact}, ${v.nodes.length}x) e.g. ${v.nodes[0]?.target.join(' ')}`
      );
      expect(summary, `axe violations on ${path}`).toEqual([]);
    });
  }

  // The two values this guards are deliberately close to the 4.5:1 line, so they are asserted
  // directly as well. If someone changes a token in styles.css, this says which one and why
  // rather than leaving them to work it out from an axe dump.
  test('the muted greys keep their contrast against the backgrounds they sit on', async ({
    page,
  }) => {
    await page.goto('/');
    const tokens = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement);
      return {
        muted: s.getPropertyValue('--muted').trim(),
        mutedOnDark: s.getPropertyValue('--muted-on-dark').trim(),
        bg: s.getPropertyValue('--bg').trim(),
        dark: s.getPropertyValue('--dark').trim(),
      };
    });

    const luminance = (hex: string) => {
      const n = parseInt(hex.replace('#', ''), 16);
      const channel = (c: number) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      return (
        0.2126 * channel((n >> 16) & 255) +
        0.7152 * channel((n >> 8) & 255) +
        0.0722 * channel(n & 255)
      );
    };
    const ratio = (a: string, b: string) => {
      const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
      return (x + 0.05) / (y + 0.05);
    };

    expect(ratio(tokens.muted, tokens.bg)).toBeGreaterThanOrEqual(4.5);
    expect(ratio(tokens.mutedOnDark, tokens.dark)).toBeGreaterThanOrEqual(4.5);
  });
});
