const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark'
  });

  const page = await context.newPage();
  const outputDir = path.join(__dirname, '../public/projects/cboa');

  const pages = [
    { url: 'https://cboa.ca', name: '01-home', wait: 3000 },
    { url: 'https://cboa.ca/portal', name: '02-portal', wait: 5000 },
  ];

  // First pass - warm up the cache
  console.log('Warming up cache...');
  for (const p of pages) {
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
    } catch (err) {
      console.log(`  Warmup failed for ${p.name}: ${err.message}`);
    }
  }

  // Second pass - capture screenshots
  console.log('Capturing CBOA (dark mode)...');
  for (const p of pages) {
    console.log(`  ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(p.wait);
      await page.screenshot({ path: path.join(outputDir, `${p.name}.png`) });
      console.log(`    Saved: ${p.name}.png`);
    } catch (err) {
      console.log(`    Failed: ${err.message}`);
    }
  }

  // Try to find more portal pages by looking at nav links
  console.log('Looking for more portal pages...');
  try {
    await page.goto('https://cboa.ca/portal', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(5000);

    // Get all nav links
    const links = await page.$$eval('nav a, aside a, [role="navigation"] a', els =>
      els.map(el => ({ href: el.href, text: el.textContent?.trim() }))
        .filter(l => l.href && l.href.includes('cboa.ca'))
    );
    console.log(`  Found ${links.length} portal links`);

    // Capture unique portal pages (limit to 5 more)
    const captured = new Set(['https://cboa.ca/portal']);
    let count = 3;
    for (const link of links) {
      if (count > 7) break;
      if (captured.has(link.href)) continue;
      if (!link.href.includes('/portal')) continue;

      captured.add(link.href);
      const name = `0${count}-${link.text?.toLowerCase().replace(/\s+/g, '-') || 'page'}`;
      console.log(`  ${name} (${link.href})...`);
      try {
        await page.goto(link.href, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(4000);
        await page.screenshot({ path: path.join(outputDir, `${name}.png`) });
        count++;
      } catch (err) {
        console.log(`    Failed: ${err.message}`);
      }
    }
  } catch (err) {
    console.log(`  Portal exploration failed: ${err.message}`);
  }

  await browser.close();
  console.log('Done!');
}

captureScreenshots().catch(console.error);
