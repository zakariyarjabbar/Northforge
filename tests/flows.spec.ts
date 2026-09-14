import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { projects, expertise } from '../lib/content';

test('every static destination, asset and metadata is complete', async ({ page, request }) => {
  const paths = ['/', '/projects/', '/expertise/', '/global/', '/group/', '/contact/', '/careers/', '/saved/', '/website-information/', '/about-this-demo/', '/privacy/', ...projects.map(p=>`/projects/${p.id}/`), ...expertise.map(e=>`/expertise/${e.id}/`)];
  for (const path of paths) {
    await page.goto(path); await expect(page.locator('main h1')).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/mock data|view.only|about this demo|create demo|sample role|coming soon/i);
    expect(await page.locator('link[rel=canonical]').getAttribute('href')).toMatch(/^https:\/\/northforge-group\./);
    const images = await page.locator('main img').evaluateAll(els => els.map(e=>(e as HTMLImageElement).src));
    for (const url of [...new Set(images)]) expect((await request.get(url)).status(),url).toBe(200);
    const og = await page.locator('meta[property="og:image"]').first().getAttribute('content');
    expect(og).toBeTruthy();
    const ogPath = new URL(og!).pathname; expect((await request.get(ogPath)).status()).toBe(200);
    const horizontal = await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1); expect(horizontal,path).toBe(false);
  }
  const missing = await request.get('/unknown-route/'); expect(missing.status()).toBe(404); expect(await missing.text()).toContain('This route ends here.');
});

test('URL filters, search, reset, browser back and case-study return', async ({ page }) => {
  await page.goto('/projects/');
  await page.getByLabel('Expertise',{exact:true}).selectOption('transport');
  await expect(page).toHaveURL(/expertise=transport/); await expect(page.locator('.project-card')).toHaveCount(2);
  await page.getByLabel('Region',{exact:true}).selectOption('northern-europe'); await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('link',{name:'Explore North Channel Crossing',exact:true}).click();
  await page.getByRole('link',{name:'Back to projects',exact:true}).click();
  await expect(page).toHaveURL(/expertise=transport&region=northern-europe/); await expect(page.locator('.project-card')).toHaveCount(1);
  await page.getByRole('button',{name:'Reset filters'}).click(); await expect(page.locator('.project-card')).toHaveCount(8);
  await page.getByRole('searchbox',{name:'Search projects',exact:true}).fill('no-such-project'); await page.getByRole('button',{name:'Search projects',exact:true}).click();
  await expect(page.getByRole('heading',{name:'No projects match those filters.'})).toBeVisible();
  await page.goBack(); await expect(page.locator('.project-card')).toHaveCount(8);
});

test('atlas selection and bridge stages respond to keyboard controls', async ({ page }) => {
  await page.goto('/global/');
  await page.getByRole('button',{name:'Select Kestrel Container Terminal, Malaysia',exact:true}).focus(); await page.keyboard.press('Enter');
  await expect(page.locator('.atlas-selection h3')).toHaveText('Kestrel Container Terminal');
  await page.getByRole('button',{name:/Oman Wadi Water Programme/}).click(); await expect(page.locator('.atlas-selection h3')).toHaveText('Wadi Water Programme');
  await page.goto('/projects/north-channel-crossing/'); await page.getByRole('button',{name:'1 Foundations',exact:true}).click();
  await expect(page.locator('.stage-explanation')).toContainText('Marine foundations');
  await page.getByRole('button',{name:'2 Pylons & cables',exact:true}).click(); await expect(page.locator('.stage-explanation')).toContainText('share the work');
});

test('saved projects persist after reload and synchronize across tabs', async ({ page, context }) => {
  await page.goto('/projects/'); await page.getByRole('button',{name:'Save project',exact:true}).first().click();
  await page.reload(); await expect(page.getByRole('button',{name:'Remove from saved projects',exact:true})).toHaveCount(1);
  const other = await context.newPage(); await other.goto('/saved/'); await expect(other.locator('.project-card')).toHaveCount(1);
  await page.getByRole('button',{name:'Remove from saved projects',exact:true}).click();
  await expect(other.getByRole('heading',{name:/Your next connection/})).toBeVisible();
});

test('inquiry validates, saves drafts, reviews, edits, avoids duplicates, exports and removes', async ({ page }) => {
  await page.goto('/contact/?expertise=marine&region=southeast-asia');
  await expect(page.getByLabel('Expertise *',{exact:true})).toHaveValue('marine');
  await page.getByRole('button',{name:'Continue',exact:true}).click(); await expect(page.locator('#description-error')).toBeVisible();
  await page.getByLabel('Your project *',{exact:true}).fill('A phased harbour expansion with quay reinforcement and working access.');
  await page.getByLabel('Schedule or project stage').fill('Feasibility, 2027');
  await page.reload(); await expect(page.getByLabel('Your project *',{exact:true})).toHaveValue(/phased harbour/);
  await page.getByRole('button',{name:'Continue',exact:true}).click();
  await page.getByLabel('Your name *',{exact:true}).fill('Test Engineer'); await page.getByLabel('Email address *',{exact:true}).fill('test@example.com');
  await page.getByRole('button',{name:'Review inquiry',exact:true}).click(); await expect(page.locator('.inquiry-details')).toContainText('Test Engineer');
  await page.getByRole('button',{name:'Back',exact:true}).click(); await expect(page.getByLabel('Your name *',{exact:true})).toHaveValue('Test Engineer');
  await page.getByRole('button',{name:'Review inquiry',exact:true}).click(); await page.getByRole('button',{name:'Save inquiry',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Your project brief is ready.'})).toBeVisible();
  const ref = await page.locator('.reference-number').innerText();
  const download = page.waitForEvent('download'); await page.getByRole('button',{name:'Download summary',exact:true}).click(); expect((await download).suggestedFilename()).toBe(`${ref}.txt`);
  await page.getByRole('button',{name:'Edit inquiry',exact:true}).click(); await page.getByLabel('Your project *',{exact:true}).fill('An updated harbour expansion with quay reinforcement and working access.');
  await page.getByRole('button',{name:'Continue',exact:true}).click(); await page.getByRole('button',{name:'Review inquiry',exact:true}).click(); await page.getByRole('button',{name:'Save changes',exact:true}).click();
  await expect(page.locator('.reference-number')).toHaveText(ref);
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('northforge:v1:workspace')!).inquiries.length)).toBe(1);
  const privateUrl = page.url(); expect(privateUrl).not.toContain('test@'); expect(privateUrl).not.toContain('Engineer');
  await page.getByRole('button',{name:'Remove inquiry',exact:true}).click(); await page.locator('.inline-confirm').getByRole('button',{name:'Remove inquiry',exact:true}).click();
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('northforge:v1:workspace')!).inquiries.length)).toBe(0);
});

test('career draft survives reload, completes, downloads and restores focus', async ({ page }) => {
  await page.goto('/careers/'); const trigger = page.getByRole('button',{name:'View opportunity'}).first(); await trigger.click();
  await page.getByLabel('Name *',{exact:true}).fill('Test Candidate'); await page.getByLabel('Email *',{exact:true}).fill('candidate@example.com');
  await page.keyboard.press('Escape'); await expect(trigger).toBeFocused();
  await page.reload(); await trigger.click(); await expect(page.getByLabel('Name *',{exact:true})).toHaveValue('Test Candidate');
  await page.getByRole('button',{name:'Save career profile',exact:true}).click(); await expect(page.getByRole('heading',{name:'Your career profile is ready.'})).toBeVisible();
  const download = page.waitForEvent('download'); await page.getByRole('button',{name:'Download profile',exact:true}).click(); expect((await download).suggestedFilename()).toContain('senior-structural-engineer');
});

test('malformed data, unavailable storage and scoped reset are safe', async ({ browser }) => {
  const context = await browser.newContext(); const page = await context.newPage();
  await page.goto('/'); await page.evaluate(()=>{ localStorage.setItem('northforge:v1:workspace','{broken json'); localStorage.setItem('unrelated-data','keep'); });
  await page.goto('/saved/'); await expect(page.getByRole('heading',{name:/Your next connection/})).toBeVisible();
  await page.goto('/projects/'); await page.getByRole('button',{name:'Save project',exact:true}).first().click();
  await page.goto('/website-information/'); await page.getByRole('button',{name:'Reset NORTHFORGE data'}).click(); await page.getByRole('button',{name:'Reset saved data',exact:true}).click();
  expect(await page.evaluate(()=>localStorage.getItem('unrelated-data'))).toBe('keep');
  expect(await page.evaluate(()=>localStorage.getItem('northforge:v1:workspace'))).toBeNull();
  await context.close();
  const blocked = await browser.newContext(); await blocked.addInitScript(()=>{ Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError');}}); });
  const fallback = await blocked.newPage(); await fallback.goto('/projects/');
  await expect(fallback.locator('.toast')).toContainText(/Browser storage is unavailable/);
  await fallback.getByRole('button',{name:'Save project',exact:true}).first().click(); await expect(fallback.getByRole('button',{name:'Remove from saved projects',exact:true})).toHaveCount(1);
  await blocked.close();
});

test('mobile navigation, focused dialog and responsive content', async ({ browser }) => {
  const context = await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true}); const page = await context.newPage();
  for (const route of ['/', '/projects/', '/global/', '/contact/', '/careers/', '/projects/north-channel-crossing/', '/expertise/marine/', '/website-information/']) {
    await page.goto(route); expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),route).toBe(false);
  }
  await page.goto('/'); const menu = page.getByRole('button',{name:'Open navigation'}); await menu.click(); await expect(page.getByRole('dialog',{name:'Navigation',exact:true})).toBeVisible();
  await page.keyboard.press('Escape'); await expect(menu).toBeFocused(); await menu.click(); await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Projects',exact:true}).click();
  await expect(page).toHaveURL(/\/projects\/$/); await expect(page.getByRole('dialog',{name:'Navigation',exact:true})).not.toBeVisible(); await context.close();
});

test('core pages meet automated accessibility checks', async ({ page }) => {
  for (const route of ['/', '/projects/', '/global/', '/contact/', '/careers/', '/projects/north-channel-crossing/', '/website-information/']) {
    await page.goto(route); const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    expect(result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),route).toEqual([]);
  }
});
