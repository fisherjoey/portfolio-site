const { chromium } = require('playwright');
const path = require('path');

const EMAIL = 'fisherjoey@ymail.com';
const PASSWORD = 'Th3C0mp123!';

async function login(page) {
  console.log('Logging in...');

  // Fill email
  await page.fill('input[type="email"], input[placeholder*="email"], input[name="email"]', EMAIL);

  // Fill password
  await page.fill('input[type="password"]', PASSWORD);

  // Click sign in button
  await page.click('button:has-text("Sign In")');

  // Wait for navigation/auth to complete
  await page.waitForTimeout(3000);

  // Check if we're past the login screen
  const stillOnLogin = await page.locator('text=Private access only').isVisible().catch(() => false);
  if (stillOnLogin) {
    throw new Error('Login failed - still on login page');
  }

  console.log('  ✓ Logged in successfully');
}

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const outputDir = path.join(__dirname, '../public/projects/chordapp');

  const baseUrl = 'https://chords.joeyfishertech.com';

  // Capture for both themes
  for (const theme of ['dark', 'light']) {
    console.log(`\n=== Capturing ${theme.toUpperCase()} theme ===\n`);

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      colorScheme: theme,
    });

    const page = await context.newPage();

    // Set theme preference before loading
    await context.addInitScript((t) => {
      localStorage.setItem('theme', t);
    }, theme);

    // Navigate and login
    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000);

    // Check if we need to login
    const needsLogin = await page.locator('text=Private access only').isVisible().catch(() => false);
    if (needsLogin) {
      await login(page);
    }

    // 01 - Home/Library view
    console.log(`Capturing: 01-home-${theme}...`);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outputDir, `01-home-${theme}.png`) });
    console.log(`  ✓ Saved: 01-home-${theme}.png`);

    // 02 - Search view
    console.log(`Capturing: 02-search-${theme}...`);
    try {
      // Look for add/plus button to open search
      const addButton = page.locator('button:has(svg), [aria-label*="add"], [aria-label*="Add"]').first();
      await addButton.click();
      await page.waitForTimeout(1500);

      // Search for a song
      const searchInput = page.locator('input[type="text"], input[type="search"]').first();
      if (await searchInput.isVisible()) {
        await searchInput.fill('Wonderwall Oasis');
        await page.waitForTimeout(500);
        await searchInput.press('Enter');
        await page.waitForTimeout(3000);
      }
      await page.screenshot({ path: path.join(outputDir, `02-search-${theme}.png`) });
      console.log(`  ✓ Saved: 02-search-${theme}.png`);

      // Close the search modal/panel if possible
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    } catch (err) {
      console.log(`  ✗ Search failed: ${err.message}`);
    }

    // 03 - Song viewer
    console.log(`Capturing: 03-viewer-${theme}...`);
    try {
      // Click on the first song in the library
      const songItems = page.locator('li, [role="listitem"], [data-song], .song-item');
      const count = await songItems.count();
      if (count > 0) {
        await songItems.first().click();
        await page.waitForTimeout(2000);
      }
      await page.screenshot({ path: path.join(outputDir, `03-viewer-${theme}.png`) });
      console.log(`  ✓ Saved: 03-viewer-${theme}.png`);
    } catch (err) {
      console.log(`  ✗ Viewer failed: ${err.message}`);
    }

    // 04 - Setlist view
    console.log(`Capturing: 04-setlist-${theme}...`);
    try {
      // Look for setlist tab/button in navigation
      const setlistBtn = page.locator('button:has-text("Setlists"), button:has-text("Setlist"), [aria-label*="etlist"]').first();
      if (await setlistBtn.isVisible()) {
        await setlistBtn.click();
        await page.waitForTimeout(2000);
      }
      await page.screenshot({ path: path.join(outputDir, `04-setlist-${theme}.png`) });
      console.log(`  ✓ Saved: 04-setlist-${theme}.png`);
    } catch (err) {
      console.log(`  ✗ Setlist failed: ${err.message}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\n=== Done! ===');
}

captureScreenshots().catch(console.error);
