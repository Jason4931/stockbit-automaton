import { test, expect } from '@playwright/test';
import { BeliSoreTRIAL, BELIPAGITRIAL, GABUNGANPAGISORE, BELIPAGIVOLBREAKOUT, HighVolumeBreakout } from '../count.json';
import { sendNotification } from '../notification';
import { execSync } from 'child_process';
import 'dotenv/config';
import fs from 'fs';
const rawData = fs.readFileSync("./count.json", 'utf-8');
const data = JSON.parse(rawData);

test('Beli Sore TRIAL', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  })
  const page = await context.newPage();
  const ctxt = page.context();
  ctxt.storageState();
  await page.goto('https://stockbit.com/screener', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const logoutBtn = page.locator('button span:text("Kembali ke Halaman Utama")');
  if (await logoutBtn.isVisible({ timeout: 5000 })) {
    execSync('npx playwright codegen --save-storage=auth.json https://stockbit.com/login', { stdio: 'inherit' });
    return;
  }
  const filterLabel = page.locator('label:has-text("Beli Sore TRIAL")');
  await filterLabel.waitFor({ state: 'visible', timeout: 10000 });
  await filterLabel.click();
  if (BeliSoreTRIAL == 0) {
    const locator = page.locator('div.sc-6f84e760-5.eJuMrn p');
    await locator.waitFor({ state: "visible", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      await expect(locator).toHaveText('No Result for this rule');
    } else {
      const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
      await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
      const actualText = await resultLocator.textContent();
      const match = actualText?.match(/of (\d+) Equities/);
      data.BeliSoreTRIAL = match ? parseInt(match[1], 10) : 0;
      sendNotification("Stockbit Screener", `Found ${data.BeliSoreTRIAL} Equities for Beli Sore TRIAL`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  } else {
    const locator = page.locator('div.sc-c356b6c4-1.ckriEa');
    await locator.waitFor({ state: "attached", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      try {
        await expect(locator).toHaveText(
          new RegExp(`Results .* of ${BeliSoreTRIAL} Equities`)
        );
      } catch (err) {
        const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
        await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
        const actualText = await resultLocator.textContent();
        const match = actualText?.match(/of (\d+) Equities/);
        data.BeliSoreTRIAL = match ? parseInt(match[1], 10) : 0;
        sendNotification("Stockbit Screener", `Found ${data.BeliSoreTRIAL} Equities for Beli Sore TRIAL`);
        fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
        throw err;
      }
    } else {
      data.BeliSoreTRIAL = 0;
      sendNotification("Stockbit Screener", `Found ${data.BeliSoreTRIAL} Equities for Beli Sore TRIAL`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  }
});

test('BELI PAGI TRIAL', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  })
  const page = await context.newPage();
  const ctxt = page.context();
  ctxt.storageState();
  await page.goto('https://stockbit.com/screener', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const logoutBtn = page.locator('button span:text("Kembali ke Halaman Utama")');
  if (await logoutBtn.isVisible({ timeout: 5000 })) {
    execSync('npx playwright codegen --save-storage=auth.json https://stockbit.com/login', { stdio: 'inherit' });
    return;
  }
  const filterLabel = page.locator('label:has-text("BELI PAGI TRIAL")');
  await filterLabel.waitFor({ state: 'visible', timeout: 10000 });
  await filterLabel.click();
  if (BELIPAGITRIAL == 0) {
    const locator = page.locator('div.sc-6f84e760-5.eJuMrn p');
    await locator.waitFor({ state: "visible", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      await expect(locator).toHaveText('No Result for this rule');
    } else {
      const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
      await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
      const actualText = await resultLocator.textContent();
      const match = actualText?.match(/of (\d+) Equities/);
      data.BELIPAGITRIAL = match ? parseInt(match[1], 10) : 0;
      sendNotification("Stockbit Screener", `Found ${data.BELIPAGITRIAL} Equities for BELI PAGI TRIAL`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  } else {
    const locator = page.locator('div.sc-c356b6c4-1.ckriEa');
    await locator.waitFor({ state: "attached", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      try {
        await expect(locator).toHaveText(
          new RegExp(`Results .* of ${BELIPAGITRIAL} Equities`)
        );
      } catch (err) {
        const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
        await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
        const actualText = await resultLocator.textContent();
        const match = actualText?.match(/of (\d+) Equities/);
        data.BELIPAGITRIAL = match ? parseInt(match[1], 10) : 0;
        sendNotification("Stockbit Screener", `Found ${data.BELIPAGITRIAL} Equities for BELI PAGI TRIAL`);
        fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
        throw err;
      }
    } else {
      data.BELIPAGITRIAL = 0;
      sendNotification("Stockbit Screener", `Found ${data.BELIPAGITRIAL} Equities for BELI PAGI TRIAL`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  }
});

test('GABUNGAN PAGI SORE', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  })
  const page = await context.newPage();
  const ctxt = page.context();
  ctxt.storageState();
  await page.goto('https://stockbit.com/screener', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const logoutBtn = page.locator('button span:text("Kembali ke Halaman Utama")');
  if (await logoutBtn.isVisible({ timeout: 5000 })) {
    execSync('npx playwright codegen --save-storage=auth.json https://stockbit.com/login', { stdio: 'inherit' });
    return;
  }
  const filterLabel = page.locator('label:has-text("GABUNGAN PAGI SORE")');
  await filterLabel.waitFor({ state: 'visible', timeout: 10000 });
  await filterLabel.click();
  if (GABUNGANPAGISORE == 0) {
    const locator = page.locator('div.sc-6f84e760-5.eJuMrn p');
    await locator.waitFor({ state: "visible", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      await expect(locator).toHaveText('No Result for this rule');
    } else {
      const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
      await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
      const actualText = await resultLocator.textContent();
      const match = actualText?.match(/of (\d+) Equities/);
      data.GABUNGANPAGISORE = match ? parseInt(match[1], 10) : 0;
      sendNotification("Stockbit Screener", `Found ${data.GABUNGANPAGISORE} Equities for GABUNGAN PAGI SORE`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  } else {
    const locator = page.locator('div.sc-c356b6c4-1.ckriEa');
    await locator.waitFor({ state: "attached", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      try {
        await expect(locator).toHaveText(
          new RegExp(`Results .* of ${GABUNGANPAGISORE} Equities`)
        );
      } catch (err) {
        const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
        await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
        const actualText = await resultLocator.textContent();
        const match = actualText?.match(/of (\d+) Equities/);
        data.GABUNGANPAGISORE = match ? parseInt(match[1], 10) : 0;
        sendNotification("Stockbit Screener", `Found ${data.GABUNGANPAGISORE} Equities for GABUNGAN PAGI SORE`);
        fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
        throw err;
      }
    } else {
      data.GABUNGANPAGISORE = 0;
      sendNotification("Stockbit Screener", `Found ${data.GABUNGANPAGISORE} Equities for GABUNGAN PAGI SORE`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  }
});

test('BELI PAGI VOL BREAKOUT', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  })
  const page = await context.newPage();
  const ctxt = page.context();
  ctxt.storageState();
  await page.goto('https://stockbit.com/screener', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const logoutBtn = page.locator('button span:text("Kembali ke Halaman Utama")');
  if (await logoutBtn.isVisible({ timeout: 5000 })) {
    execSync('npx playwright codegen --save-storage=auth.json https://stockbit.com/login', { stdio: 'inherit' });
    return;
  }
  const filterLabel = page.locator('label:has-text("BELI PAGI + VOL BREAKOUT")');
  await filterLabel.waitFor({ state: 'visible', timeout: 10000 });
  await filterLabel.click();
  if (BELIPAGIVOLBREAKOUT == 0) {
    const locator = page.locator('div.sc-6f84e760-5.eJuMrn p');
    // await locator.waitFor({ state: "visible", timeout: 10000 }); EXPLAIN?????
    const count = await locator.count();
    if (count > 0) {
      await expect(locator).toHaveText('No Result for this rule');
    } else {
      const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
      await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
      const actualText = await resultLocator.textContent();
      const match = actualText?.match(/of (\d+) Equities/);
      data.BELIPAGIVOLBREAKOUT = match ? parseInt(match[1], 10) : 0;
      sendNotification("Stockbit Screener", `Found ${data.BELIPAGIVOLBREAKOUT} Equities for BELI PAGI + VOL BREAKOUT`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  } else {
    const locator = page.locator('div.sc-c356b6c4-1.ckriEa');
    await locator.waitFor({ state: "attached", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      try {
        await expect(locator).toHaveText(
          new RegExp(`Results .* of ${BELIPAGIVOLBREAKOUT} Equities`)
        );
      } catch (err) {
        const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
        await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
        const actualText = await resultLocator.textContent();
        const match = actualText?.match(/of (\d+) Equities/);
        data.BELIPAGIVOLBREAKOUT = match ? parseInt(match[1], 10) : 0;
        sendNotification("Stockbit Screener", `Found ${data.BELIPAGIVOLBREAKOUT} Equities for BELI PAGI + VOL BREAKOUT`);
        fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
        throw err;
      }
    } else {
      data.BELIPAGIVOLBREAKOUT = 0;
      sendNotification("Stockbit Screener", `Found ${data.BELIPAGIVOLBREAKOUT} Equities for BELI PAGI + VOL BREAKOUT`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  }
});

test('High Volume Breakout', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "./auth.json"
  })
  const page = await context.newPage();
  const ctxt = page.context();
  ctxt.storageState();
  await page.goto('https://stockbit.com/screener', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const logoutBtn = page.locator('button span:text("Kembali ke Halaman Utama")');
  if (await logoutBtn.isVisible({ timeout: 5000 })) {
    execSync('npx playwright codegen --save-storage=auth.json https://stockbit.com/login', { stdio: 'inherit' });
    return;
  }
  const filterLabel = page.locator('label:has-text("High Volume Breakout")');
  await filterLabel.waitFor({ state: 'visible', timeout: 10000 });
  await filterLabel.click();
  if (HighVolumeBreakout == 0) {
    const locator = page.locator('div.sc-6f84e760-5.eJuMrn p');
    await locator.waitFor({ state: "visible", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      await expect(locator).toHaveText('No Result for this rule');
    } else {
      const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
      await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
      const actualText = await resultLocator.textContent();
      const match = actualText?.match(/of (\d+) Equities/);
      data.HighVolumeBreakout = match ? parseInt(match[1], 10) : 0;
      sendNotification("Stockbit Screener", `Found ${data.HighVolumeBreakout} Equities for High Volume Breakout`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  } else {
    const locator = page.locator('div.sc-c356b6c4-1.ckriEa');
    await locator.waitFor({ state: "attached", timeout: 10000 });
    const count = await locator.count();
    if (count > 0) {
      try {
        await expect(locator).toHaveText(
          new RegExp(`Results .* of ${HighVolumeBreakout} Equities`)
        );
      } catch (err) {
        const resultLocator = page.locator('div.sc-c356b6c4-1.ckriEa');
        await resultLocator.waitFor({ state: 'attached', timeout: 10000 });
        const actualText = await resultLocator.textContent();
        const match = actualText?.match(/of (\d+) Equities/);
        data.HighVolumeBreakout = match ? parseInt(match[1], 10) : 0;
        sendNotification("Stockbit Screener", `Found ${data.HighVolumeBreakout} Equities for High Volume Breakout`);
        fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
        throw err;
      }
    } else {
      data.HighVolumeBreakout = 0;
      sendNotification("Stockbit Screener", `Found ${data.HighVolumeBreakout} Equities for High Volume Breakout`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
    }
  }
});

//npx playwright test > NUL 2>&1
//npx playwright codegen --save-storage=auth.json https://stockbit.com/login