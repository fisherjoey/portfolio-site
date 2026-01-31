const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark',
    extraHTTPHeaders: {
      'Authorization': 'Bearer v6ydk443zvekt6tiiejfqehg3efjhe5hhdwaba33'
    }
  });

  await context.addCookies([{
    name: 'cc_cookie',
    value: '%7B%22categories%22%3A%5B%22necessary%22%5D%7D',
    domain: 'cpsc405.joeyfishertech.com',
    path: '/'
  }]);

  const page = await context.newPage();
  await page.emulateMedia({ colorScheme: 'dark' });

  const outputDir = path.join(__dirname, '../public/projects/quest-canada');

  // CSS to force dark mode appearance
  const darkModeCSS = `
    html, body {
      background-color: #0f172a !important;
      color: #e2e8f0 !important;
    }

    * {
      border-color: #334155 !important;
    }

    /* Invert light backgrounds to dark */
    .bg-white, [class*="bg-white"], [class*="bg-gray-50"], [class*="bg-gray-100"] {
      background-color: #1e293b !important;
    }

    .bg-gray-200, [class*="bg-gray-200"], [class*="bg-gray-300"] {
      background-color: #334155 !important;
    }

    /* Keep brand colors but adjust text */
    .text-gray-900, .text-gray-800, .text-gray-700, .text-black,
    [class*="text-gray-9"], [class*="text-gray-8"], [class*="text-gray-7"] {
      color: #e2e8f0 !important;
    }

    .text-gray-600, .text-gray-500, .text-gray-400,
    [class*="text-gray-6"], [class*="text-gray-5"], [class*="text-gray-4"] {
      color: #94a3b8 !important;
    }

    /* Cards and panels */
    [class*="shadow"], [class*="rounded"] {
      background-color: #1e293b !important;
    }

    /* Tables */
    table, th, td, thead, tbody, tr {
      background-color: #1e293b !important;
      color: #e2e8f0 !important;
      border-color: #334155 !important;
    }

    thead, th {
      background-color: #0f172a !important;
    }

    /* Inputs */
    input, select, textarea {
      background-color: #1e293b !important;
      color: #e2e8f0 !important;
      border-color: #475569 !important;
    }

    /* Nav */
    nav, header {
      background-color: #0f172a !important;
    }

    /* Preserve colorful elements */
    [class*="bg-blue"], [class*="bg-green"], [class*="bg-red"],
    [class*="bg-yellow"], [class*="bg-purple"], [class*="bg-indigo"],
    [class*="bg-teal"], [class*="bg-cyan"], [class*="bg-orange"] {
      /* Keep these as-is for visual interest */
    }
  `;

  const pages = [
    { url: 'https://cpsc405.joeyfishertech.com', name: '01-landing-dark', wait: 2000 },
    { url: 'https://cpsc405.joeyfishertech.com/assessments', name: '02-assessments-dark', wait: 3000 },
    { url: 'https://cpsc405.joeyfishertech.com/projects/seed-proj-002', name: '03-project-dark', wait: 3000 },
    { url: 'https://cpsc405.joeyfishertech.com/dashboards', name: '04-dashboards-dark', wait: 3000 },
    { url: 'https://cpsc405.joeyfishertech.com/analytics', name: '05-analytics-dark', wait: 3000 },
  ];

  console.log('Capturing Quest Canada with injected dark mode...');
  for (const p of pages) {
    console.log(`  ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });

      // Inject dark mode CSS
      await page.addStyleTag({ content: darkModeCSS });
      await page.waitForTimeout(p.wait);

      // Verify dark background
      const bgColor = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
      });
      console.log(`    Background: ${bgColor}`);

      await page.screenshot({ path: path.join(outputDir, `${p.name}.png`) });
      console.log('    Saved');
    } catch (err) {
      console.log(`    Failed: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

captureScreenshots().catch(console.error);
