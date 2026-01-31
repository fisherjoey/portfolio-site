const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    extraHTTPHeaders: {
      'Authorization': 'Bearer v6ydk443zvekt6tiiejfqehg3efjhe5hhdwaba33'
    }
  });

  // Add cookies
  await context.addCookies([{
    name: 'cc_cookie',
    value: '%7B%22categories%22%3A%5B%22necessary%22%5D%2C%22revision%22%3A0%2C%22data%22%3Anull%2C%22consentTimestamp%22%3A%222025-11-29T05%3A36%3A33.784Z%22%2C%22consentId%22%3A%222a2b40db-b805-478a-8a40-55691e77e46f%22%2C%22services%22%3A%7B%22necessary%22%3A%5B%5D%2C%22analytics%22%3A%5B%5D%7D%2C%22languageCode%22%3A%22en%22%2C%22lastConsentTimestamp%22%3A%222025-11-29T05%3A36%3A33.784Z%22%2C%22expirationTime%22%3A1795930593784%7D',
    domain: 'cpsc405.joeyfishertech.com',
    path: '/'
  }]);

  const page = await context.newPage();
  const outputDir = path.join(__dirname, '../public/projects/quest-canada');

  const pages = [
    { url: 'https://cpsc405.joeyfishertech.com', name: '01-landing' },
    { url: 'https://cpsc405.joeyfishertech.com/assessments', name: '02-assessments' },
    { url: 'https://cpsc405.joeyfishertech.com/projects/seed-proj-002', name: '03-project' },
    { url: 'https://cpsc405.joeyfishertech.com/dashboards', name: '04-dashboards' },
    { url: 'https://cpsc405.joeyfishertech.com/analytics', name: '05-analytics' },
  ];

  for (const p of pages) {
    console.log(`Capturing: ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
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
