import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { projects, expertise } from '../lib/content';
import { translator, localePath, type Locale } from '../lib/i18n';
import ar from '../lib/locales/ar.json';
import ckb from '../lib/locales/ckb.json';

const routes = ['/', '/projects/', '/expertise/', '/group/', '/global/', '/careers/', '/contact/', '/saved/', '/privacy/', '/website-information/', '/about-this-demo/', ...projects.map(p => `/projects/${p.id}/`), ...expertise.map(e => `/expertise/${e.id}/`)];
const allowedLatin = /NORTHFORGE|OpenAI|ImageGen|Natural Earth|Manrope|Noto Sans Arabic|SIL Open Font|\bIP\b|JSON/;

test('Arabic and Sorani have complete static pages, metadata and translated content', async ({ page, request }) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const locale of ['ar', 'ckb'] as const) for (const route of routes) {
    const path = localePath(route, locale);
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html).toMatch(new RegExp(`<html[^>]*lang="${locale}"[^>]*dir="rtl"`));
    expect(html.toLowerCase()).toContain(`hreflang="${locale}"`);
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('main h1')).toBeVisible();
    expect(await page.locator('main h1').innerText()).toMatch(/[\u0600-\u06ff]/);
    const canonical = await page.locator('link[rel=canonical]').getAttribute('href');
    expect(canonical).toContain(`/${locale}/${route === '/about-this-demo/' ? 'website-information/' : route.slice(1)}`);
    expect(await page.locator('meta[name=description]').getAttribute('content')).toMatch(/[\u0600-\u06ff]/);
    const fragments = await page.locator('main').evaluate(element => {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const text: string[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.parentElement?.closest('script,style') || !node.parentElement?.getClientRects().length) continue;
        if (/[A-Za-z]{3}/.test(node.textContent ?? '')) text.push(node.textContent!.trim());
      }
      return text;
    });
    expect(fragments.filter(text => !allowedLatin.test(text)), path).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), path).toBe(false);
  }
  expect(errors).toEqual([]);
});

test('language selector is keyboard accessible and preserves page, filters and bookmarks', async ({ page }) => {
  await page.goto('/projects/?expertise=transport&region=northern-europe#main');
  await page.locator('.save-button').click();
  const trigger = page.locator('.language-trigger');
  await trigger.focus(); await page.keyboard.press('ArrowDown');
  await expect(page.locator('[data-language=en]')).toBeFocused();
  await page.keyboard.press('ArrowDown'); await expect(page.locator('[data-language=ar]')).toBeFocused();
  await page.keyboard.press('Escape'); await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.click();
  await expect(page.locator('[data-language=ckb]')).toHaveAttribute('href', '/ckb/projects/?expertise=transport&region=northern-europe#main');
  await page.locator('[data-language=ar]').click();
  await expect(page).toHaveURL(/\/ar\/projects\/\?expertise=transport&region=northern-europe#main/);
  await expect(page.locator('.save-button')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('.project-title-link').click();
  await page.locator('.language-trigger').click(); await page.locator('[data-language=ckb]').click();
  await expect(page).toHaveURL(/\/ckb\/projects\/north-channel-crossing\/$/);
  await page.locator('.project-back').click();
  await expect(page).toHaveURL(/\/ckb\/projects\/\?expertise=transport&region=northern-europe/);
  await page.reload(); await expect(page.locator('html')).toHaveAttribute('lang', 'ckb');
  await page.locator('.language-trigger').click(); await page.locator('[data-language=en]').click();
  await expect(page).toHaveURL(/\/projects\/\?expertise=transport&region=northern-europe/);
  expect(await page.evaluate(() => localStorage.getItem('northforge:v1:language'))).toBe('en');
});

for (const locale of ['ar', 'ckb'] as const) {
  test(`${locale} search, inquiry, export and career profile use translated copy`, async ({ page }) => {
    const t = translator(locale);
    await page.goto(`/${locale}/projects/`);
    await page.locator('#project-search').fill(t('Norway'));
    await page.locator('.search-form button').click();
    await expect(page.locator('.project-card')).toHaveCount(1);
    await page.goto(`/${locale}/contact/?expertise=marine&region=southeast-asia`);
    await page.getByRole('button', { name: t('Continue'), exact: true }).click();
    await expect(page.locator('#description-error')).toHaveText(t('Add a little more detail (at least 20 characters).'));
    const description = locale === 'ar' ? 'توسعة الميناء مع تدعيم الرصيف والحفاظ على مسارات الوصول.' : 'فراوانکردنی بەندەر لەگەڵ بەهێزکردنی ڕەسیف و پاراستنی ڕێگاکانی دەستگەیشتن.';
    await page.locator('#description').fill(description);
    await page.getByRole('button', { name: t('Continue'), exact: true }).click();
    await page.locator('#name').fill('ئەندازیار أحمد');
    await page.locator('#email').fill('engineer@example.com');
    await page.getByRole('button', { name: t('Review inquiry'), exact: true }).click();
    await page.getByRole('button', { name: t('Save inquiry'), exact: true }).click();
    await expect(page.locator('.inquiry-completion h2')).toHaveText(t('Your project brief is ready.'));
    const reference = await page.locator('.reference-number').innerText();
    const downloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: t('Download summary'), exact: true }).click();
    const download = await downloadEvent;
    const text = await readFile((await download.path())!, 'utf8');
    expect(text).toContain(t('PROJECT INQUIRY'));
    expect(text).toContain(t('Ports & marine works'));
    expect(text).toContain(description);
    await page.getByRole('button', { name: t('Edit inquiry'), exact: true }).click();
    await page.getByRole('button', { name: t('Continue'), exact: true }).click();
    await page.getByRole('button', { name: t('Review inquiry'), exact: true }).click();
    await page.getByRole('button', { name: t('Save changes'), exact: true }).click();
    await expect(page.locator('.reference-number')).toHaveText(reference);
    await page.goto(`/${locale}/careers/`);
    await page.getByRole('button', { name: t('View opportunity') }).first().click();
    await expect(page.locator('#role-title')).toHaveText(t('Senior Structural Engineer'));
    await page.locator('#career-name').fill('دانا أحمد');
    await page.locator('#career-email').fill('candidate@example.com');
    await page.getByRole('button', { name: t('Save career profile'), exact: true }).click();
    const careerDownloadEvent = page.waitForEvent('download');
    await page.getByRole('button', { name: t('Download profile'), exact: true }).click();
    expect(await readFile((await (await careerDownloadEvent).path())!, 'utf8')).toContain(t('CAREER PROFILE'));
  });
}

test('inquiry drafts survive changing language and blocked storage still allows switching', async ({ page, browser }) => {
  await page.goto('/contact/?expertise=transport&region=northern-europe');
  await page.locator('#description').fill('Preserve this bridge project brief across languages.');
  await page.locator('.language-trigger').click(); await page.locator('[data-language=ar]').click();
  await expect(page.locator('#description')).toHaveValue('Preserve this bridge project brief across languages.');
  await expect(page.locator('#expertise')).toHaveValue('transport');
  await expect(page.locator('#region')).toHaveValue('northern-europe');
  const blocked = await browser.newContext();
  await blocked.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } }); });
  const other = await blocked.newPage(); await other.goto('/ckb/');
  await expect(other.locator('.toast')).toContainText(translator('ckb')('Browser storage is unavailable. Changes will last for this visit.'));
  await other.locator('.language-trigger').click(); await other.locator('[data-language=ar]').click();
  await expect(other.locator('html')).toHaveAttribute('lang', 'ar');
  await blocked.close();
});

test('language layouts and selector fit mobile and pass automated accessibility', async ({ browser }) => {
  test.setTimeout(90000);
  for (const width of [360, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    for (const locale of ['en', 'ar', 'ckb'] as Locale[]) {
      for (const route of ['/', '/projects/', '/global/', '/contact/', '/careers/', '/projects/north-channel-crossing/']) {
        await page.goto(localePath(route, locale));
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), `${width} ${locale} ${route}`).toBe(false);
      }
      await page.goto(localePath('/', locale)); await page.locator('.language-trigger').click();
      const box = await page.locator('.language-panel').boundingBox(); expect(box!.x).toBeGreaterThanOrEqual(0); expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      if (width === 390 || width === 1440) {
        const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
        expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), `${width} ${locale}`).toEqual([]);
      }
    }
    await context.close();
  }
});

test('translation catalogs cover identical keys and preserve variable placeholders', () => {
  expect(Object.keys(ar).sort()).toEqual(Object.keys(ckb).sort());
  for (const dictionary of [ar, ckb]) for (const [key, value] of Object.entries(dictionary)) {
    expect(value.trim(), key).not.toBe('');
    expect(value.match(/\{\w+\}/g)?.sort() ?? [], key).toEqual(key.match(/\{\w+\}/g)?.sort() ?? []);
  }
});
