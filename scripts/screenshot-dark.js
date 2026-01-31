const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark',
    extraHTTPHeaders: {
      'Authorization': 'Bearer v6ydk443zvekt6tiiejfqehg3efjhe5hhdwaba33'
    }
  });

  await context.addCookies([{
    name: 'cc_cookie',
    value: '%7B%22categories%22%3A%5B%22necessary%22%5D%2C%22revision%22%3A0%2C%22data%22%3Anull%2C%22consentTimestamp%22%3A%222025-11-29T05%3A36%3A33.784Z%22%2C%22consentId%22%3A%222a2b40db-b805-478a-8a40-55691e77e46f%22%2C%22services%22%3A%7B%22necessary%22%3A%5B%5D%2C%22analytics%22%3A%5B%5D%7D%2C%22languageCode%22%3A%22en%22%2C%22lastConsentTimestamp%22%3A%222025-11-29T05%3A36%3A33.784Z%22%2C%22expirationTime%22%3A1795930593784%7D',
    domain: 'cpsc405.joeyfishertech.com',
    path: '/'
  }]);

  const page = await context.newPage();

  // SportsManager pages
  const sportsmanagerDir = path.join(__dirname, '../public/projects/sportsmanager');
  const sportsmanagerPages = [
    { url: 'https://syncedsport.com', name: '01-home' },
    { url: 'https://syncedsport.com/features', name: '02-features' },
    { url: 'https://syncedsport.com/features/scheduling', name: '03-scheduling' },
    { url: 'https://syncedsport.com/solutions/assignors', name: '04-assignors' },
    { url: 'https://syncedsport.com/solutions/officials', name: '05-officials' },
    { url: 'https://syncedsport.com/pricing', name: '06-pricing' },
    { url: 'https://syncedsport.com/features/analytics', name: '07-analytics' },
  ];

  console.log('Capturing SportsManager (dark mode)...');
  for (const p of sportsmanagerPages) {
    console.log(`  ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(sportsmanagerDir, `${p.name}.png`) });
    } catch (err) {
      console.log(`    Failed: ${err.message}`);
    }
  }

  // Quest Canada pages
  const questDir = path.join(__dirname, '../public/projects/quest-canada');
  const questPages = [
    { url: 'https://cpsc405.joeyfishertech.com', name: '01-landing' },
    { url: 'https://cpsc405.joeyfishertech.com/assessments', name: '02-assessments' },
    { url: 'https://cpsc405.joeyfishertech.com/projects/seed-proj-002', name: '03-project' },
    { url: 'https://cpsc405.joeyfishertech.com/dashboards', name: '04-dashboards' },
    { url: 'https://cpsc405.joeyfishertech.com/analytics', name: '05-analytics' },
  ];

  console.log('Capturing Quest Canada (dark mode)...');
  for (const p of questPages) {
    console.log(`  ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(3000);
      await page.screenshot({ path: path.join(questDir, `${p.name}.png`) });
    } catch (err) {
      console.log(`    Failed: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

captureScreenshots().catch(console.error);
