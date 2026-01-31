const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();
  const outputDir = path.join(__dirname, '../public/projects/sportsmanager');

  const pages = [
    { url: 'https://syncedsport.com', name: '01-home' },
    { url: 'https://syncedsport.com/features', name: '02-features' },
    { url: 'https://syncedsport.com/features/scheduling', name: '03-scheduling' },
    { url: 'https://syncedsport.com/solutions/assignors', name: '04-assignors' },
    { url: 'https://syncedsport.com/solutions/officials', name: '05-officials' },
    { url: 'https://syncedsport.com/pricing', name: '06-pricing' },
    { url: 'https://syncedsport.com/features/analytics', name: '07-analytics' },
  ];

  for (const p of pages) {
    console.log(`Capturing: ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(outputDir, `${p.name}.png`) });
      console.log(`  Saved: ${p.name}.png`);
    } catch (err) {
      console.log(`  Failed: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

captureScreenshots().catch(console.error);
