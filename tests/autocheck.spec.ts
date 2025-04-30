const { chromium } = require('playwright');
const path = require('path');
import { test, expect } from '@playwright/test';
import { BeliSoreTRIAL, BELIPAGITRIAL, GABUNGANPAGISORE, BELIPAGIVOLBREAKOUT, HighVolumeBreakout } from '../count.json';
import { sendNotification } from '../notification';
import fs from 'fs';
import { isContext } from 'vm';
const rawData = fs.readFileSync("./count.json", 'utf-8');
const data = JSON.parse(rawData);
let context;

test.use({ baseURL: 'https://stockbit.com' });
test.beforeEach(async () => {
  const extensionPath = 
    'C:/Users/Jason/AppData/Local/Google/Chrome/User Data/Profile 4/' +
    'Extensions/hlifkpholllijblknnmbfagnkjneagid/0.3.6_0';
  const manifestFile = path.join(extensionPath, 'manifest.json');
  if (!fs.existsSync(manifestFile)) {
    throw new Error(`🛑 Cannot find manifest at ${manifestFile}`);
  }
  context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`,
      // '--window-size=1,1',
      // '--start-maximized',
      // '--disable-infobars',
      // '--no-sandbox',
      // '--disable-dev-shm-usage',
      // '--disable-gpu',
      // '--mute-audio',
      // '--hide-scrollbars',
      // '--disable-blink-features=AutomationControlled',
      // '--window-position=-32000,-32000',
    ],
    // viewport: { width: 1, height: 1 },
    ignoreDefaultArgs: ["--enable-automation"],
  });
});

test('Beli Sore TRIAL', async ({ browser }) => {
  const page = await context.newPage();
  await page.goto('chrome-extension://hlifkpholllijblknnmbfagnkjneagid/popup/popup.html');
  await page.waitForTimeout(1000);
  await page.goto('https://stockbit.com/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.locator('#username').fill("soegi");
  await page.locator('#password').fill("Marvel2009");
  await page.waitForTimeout(2000);
  await page.locator('#email-login-button').click();
  const continueBtn = page.locator('#email-login-button');
  while (true) {
    const isEnabled = await continueBtn.isEnabled();
    if (isEnabled) {
      await continueBtn.click();
      await page.waitForTimeout(1000);
      console.log('click')
      const isVisible = await continueBtn.isVisible();
      if (!isVisible) {
        console.log('break')
        break;
      }
    } else {
      await page.waitForTimeout(1000);
    }
  }
  await page.waitForTimeout(1000);
  try {
    await page.locator('#modalnewavatar-button-skip').click();
  } catch (e) {
  }
  await page.locator('#stockbit-header-web > div:nth-child(1) > div:nth-child(2) > div > div.sc-b2b86138-1.iTWDdJ > div:nth-child(8) > a').click();

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
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/BeliSoreTRIAL-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
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
        const element = await page.$('div.sc-6f84e760-3.gXCJki');
        await element!.screenshot({ path: `imagedata/BeliSoreTRIAL-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
        throw err;
      }
    } else {
      data.BeliSoreTRIAL = 0;
      sendNotification("Stockbit Screener", `Found ${data.BeliSoreTRIAL} Equities for Beli Sore TRIAL`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/BeliSoreTRIAL-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
    }
  }
});

test('BELI PAGI TRIAL', async ({ browser }) => {
  const page = await context.newPage();
  await page.goto('chrome-extension://hlifkpholllijblknnmbfagnkjneagid/popup/popup.html');
  await page.waitForTimeout(1000);
  await page.goto('https://stockbit.com/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.locator('#username').fill("soegi");
  await page.locator('#password').fill("Marvel2009");
  await page.waitForTimeout(2000);
  await page.locator('#email-login-button').click();
  const continueBtn = page.locator('#email-login-button');
  while (true) {
    const isEnabled = await continueBtn.isEnabled();
    if (isEnabled) {
      await continueBtn.click();
      await page.waitForTimeout(1000);
      console.log('click')
      const isVisible = await continueBtn.isVisible();
      if (!isVisible) {
        console.log('break')
        break;
      }
    } else {
      await page.waitForTimeout(1000);
    }
  }
  await page.waitForTimeout(1000);
  try {
    await page.locator('#modalnewavatar-button-skip').click();
  } catch (e) {
  }
  await page.locator('#stockbit-header-web > div:nth-child(1) > div:nth-child(2) > div > div.sc-b2b86138-1.iTWDdJ > div:nth-child(8) > a').click();

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
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/BELIPAGITRIAL-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
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
        const element = await page.$('div.sc-6f84e760-3.gXCJki');
        await element!.screenshot({ path: `imagedata/BELIPAGITRIAL-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
        throw err;
      }
    } else {
      data.BELIPAGITRIAL = 0;
      sendNotification("Stockbit Screener", `Found ${data.BELIPAGITRIAL} Equities for BELI PAGI TRIAL`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/BELIPAGITRIAL-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
    }
  }
});

test('GABUNGAN PAGI SORE', async ({ browser }) => {
  const page = await context.newPage();
  await page.goto('chrome-extension://hlifkpholllijblknnmbfagnkjneagid/popup/popup.html');
  await page.waitForTimeout(1000);
  await page.goto('https://stockbit.com/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.locator('#username').fill("soegi");
  await page.locator('#password').fill("Marvel2009");
  await page.waitForTimeout(2000);
  await page.locator('#email-login-button').click();
  const continueBtn = page.locator('#email-login-button');
  while (true) {
    const isEnabled = await continueBtn.isEnabled();
    if (isEnabled) {
      await continueBtn.click();
      await page.waitForTimeout(1000);
      console.log('click')
      const isVisible = await continueBtn.isVisible();
      if (!isVisible) {
        console.log('break')
        break;
      }
    } else {
      await page.waitForTimeout(1000);
    }
  }
  await page.waitForTimeout(1000);
  try {
    await page.locator('#modalnewavatar-button-skip').click();
  } catch (e) {
  }
  await page.locator('#stockbit-header-web > div:nth-child(1) > div:nth-child(2) > div > div.sc-b2b86138-1.iTWDdJ > div:nth-child(8) > a').click();

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
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/GABUNGANPAGISORE-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
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
        const element = await page.$('div.sc-6f84e760-3.gXCJki');
        await element!.screenshot({ path: `imagedata/GABUNGANPAGISORE-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
        throw err;
      }
    } else {
      data.GABUNGANPAGISORE = 0;
      sendNotification("Stockbit Screener", `Found ${data.GABUNGANPAGISORE} Equities for GABUNGAN PAGI SORE`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/GABUNGANPAGISORE-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
    }
  }
});

test('BELI PAGI VOL BREAKOUT', async ({ browser }) => {
  const page = await context.newPage();
  await page.goto('chrome-extension://hlifkpholllijblknnmbfagnkjneagid/popup/popup.html');
  await page.waitForTimeout(1000);
  await page.goto('https://stockbit.com/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.locator('#username').fill("soegi");
  await page.locator('#password').fill("Marvel2009");
  await page.waitForTimeout(2000);
  await page.locator('#email-login-button').click();
  const continueBtn = page.locator('#email-login-button');
  while (true) {
    const isEnabled = await continueBtn.isEnabled();
    if (isEnabled) {
      await continueBtn.click();
      await page.waitForTimeout(1000);
      console.log('click')
      const isVisible = await continueBtn.isVisible();
      if (!isVisible) {
        console.log('break')
        break;
      }
    } else {
      await page.waitForTimeout(1000);
    }
  }
  await page.waitForTimeout(1000);
  try {
    await page.locator('#modalnewavatar-button-skip').click();
  } catch (e) {
  }
  await page.locator('#stockbit-header-web > div:nth-child(1) > div:nth-child(2) > div > div.sc-b2b86138-1.iTWDdJ > div:nth-child(8) > a').click();

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
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/BELIPAGIVOLBREAKOUT-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
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
        const element = await page.$('div.sc-6f84e760-3.gXCJki');
        await element!.screenshot({ path: `imagedata/BELIPAGIVOLBREAKOUT-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
        throw err;
      }
    } else {
      data.BELIPAGIVOLBREAKOUT = 0;
      sendNotification("Stockbit Screener", `Found ${data.BELIPAGIVOLBREAKOUT} Equities for BELI PAGI + VOL BREAKOUT`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/BELIPAGIVOLBREAKOUT-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
    }
  }
});

test('High Volume Breakout', async ({ browser }) => {
  const page = await context.newPage();
  await page.goto('chrome-extension://hlifkpholllijblknnmbfagnkjneagid/popup/popup.html');
  await page.waitForTimeout(1000);
  await page.goto('https://stockbit.com/login', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.locator('#username').fill("soegi");
  await page.locator('#password').fill("Marvel2009");
  await page.waitForTimeout(2000);
  await page.locator('#email-login-button').click();
  const continueBtn = page.locator('#email-login-button');
  while (true) {
    const isEnabled = await continueBtn.isEnabled();
    if (isEnabled) {
      await continueBtn.click();
      await page.waitForTimeout(1000);
      console.log('click')
      const isVisible = await continueBtn.isVisible();
      if (!isVisible) {
        console.log('break')
        break;
      }
    } else {
      await page.waitForTimeout(1000);
    }
  }
  await page.waitForTimeout(1000);
  try {
    await page.locator('#modalnewavatar-button-skip').click();
  } catch (e) {
  }
  await page.locator('#stockbit-header-web > div:nth-child(1) > div:nth-child(2) > div > div.sc-b2b86138-1.iTWDdJ > div:nth-child(8) > a').click();
  
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
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/HighVolumeBreakout-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
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
        const element = await page.$('div.sc-6f84e760-3.gXCJki');
        await element!.screenshot({ path: `imagedata/HighVolumeBreakout-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
        throw err;
      }
    } else {
      data.HighVolumeBreakout = 0;
      sendNotification("Stockbit Screener", `Found ${data.HighVolumeBreakout} Equities for High Volume Breakout`);
      fs.writeFileSync("./count.json", JSON.stringify(data, null, 2));
      const element = await page.$('div.sc-6f84e760-3.gXCJki');
      await element!.screenshot({ path: `imagedata/HighVolumeBreakout-${new Date().toISOString().replace(/[:.]/g, '-')}.png` });
    }
  }
});

//npx playwright test > NUL 2>&1
//npx playwright codegen --save-storage=auth.json https://stockbit.com/login