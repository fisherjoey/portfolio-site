const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'light',
    extraHTTPHeaders: {
      'Authorization': 'Bearer v6ydk443zvekt6tiiejfqehg3efjhe5hhdwaba33'
    }
  });

  // Add cookies
  await context.addCookies([
    {
      name: 'cc_cookie',
      value: '%7B%22categories%22%3A%5B%22necessary%22%5D%7D',
      domain: 'cpsc405.joeyfishertech.com',
      path: '/'
    },
    {
      name: 'cf_clearance',
      value: 'rrQC1BzKuZw4GEmfGTHx2S0kztWuMK.0vNNqgtuGTiY-1769840622-1.2.1.1-0vFreYJyQvx.mVIg8tIyD8BEF_CFMResLpCQILnKvqJPPq6LrJy5nadbR6cGHbzL7JPr0o1ADyMP2VcDLe2WAkhCGTBnnp.0OYn3unirhOeT36FzI6Qn0sdGqmzJmXhQE0EWlgNkko0SKw9HusFpjNMw5Ow.WqwjKmo0YYUOaBpYO6.VZyRC0rExQ2VaH_n2TPF2p9471XYoNYwzaNmYHqwzxbn5BhllQ9SauGeTklM',
      domain: 'cboa.ca',
      path: '/'
    },
    {
      name: 'sb-qrfbkxqhwvftuzotecit-auth-token',
      value: 'base64-eyJhY2Nlc3NfdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0ltdHBaQ0k2SW1oVFpIUmtVbFIwZUVZMFYxazJiM0VpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBjM01pT2lKb2RIUndjem92TDNGeVptSnJlSEZvZDNabWRIVjZiM1JsWTJsMExuTjFjR0ZpWVhObExtTnZMMkYxZEdndmRqRWlMQ0p6ZFdJaU9pSTFNbVl3TlRJd01pMDNNbUU0TFRSa05qZ3RZVGt6WXkweU1XTXpaVE01WWpBME5qY2lMQ0poZFdRaU9pSmhkWFJvWlc1MGFXTmhkR1ZrSWl3aVpYaHdJam94TnpZNU9EUTBNakl6TENKcFlYUWlPakUzTmprNE5EQTJNak1zSW1WdFlXbHNJam9pZDJWaWJXRnpkR1Z5UUdOaWIyRXVZMkVpTENKd2FHOXVaU0k2SWlJc0ltRndjRjl0WlhSaFpHRjBZU0k2ZXlKd2NtOTJhV1JsY2lJNkltVnRZV2xzSWl3aWNISnZkbWxrWlhKeklqcGJJbVZ0WVdsc0lsMHNJbkp2YkdVaU9pSmhaRzFwYmlJc0luSnZiR1Z6SWpwYkltRmtiV2x1SWwxOUxDSjFjMlZ5WDIxbGRHRmtZWFJoSWpwN0ltVnRZV2xzWDNabGNtbG1hV1ZrSWpwMGNuVmxmU3dpY205c1pTSTZJbUYxZEdobGJuUnBZMkYwWldRaUxDSmhZV3dpT2lKaFlXd3hJaXdpWVcxeUlqcGJleUp0WlhSb2IyUWlPaUp3WVhOemQyOXlaQ0lzSW5ScGJXVnpkR0Z0Y0NJNk1UYzJPVFE1TWpjeU1IMWRMQ0p6WlhOemFXOXVYMmxrSWpvaU5HTXpaREZpWWpBdE1qWmhaUzAwWXprMkxUZzJZVGN0WVRWaFpXSXpaRFU1TkROa0lpd2lhWE5mWVc1dmJubHRiM1Z6SWpwbVlXeHpaWDAuQy14R2RsX2t0QW9vN1ZnUDhtZkFoOVNjWVc3dU10bWRUbzNLREkzQWdyVSIsInRva2VuX3R5cGUiOiJiZWFyZXIiLCJleHBpcmVzX2luIjozNjAwLCJleHBpcmVzX2F0IjoxNzY5ODQ0MjIzLCJyZWZyZXNoX3Rva2VuIjoieHk1ZnV3dmlhbjNtIiwidXNlciI6eyJpZCI6IjUyZjA1MjAyLTcyYTgtNGQ2OC1hOTNjLTIxYzNlMzliMDQ2NyIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImVtYWlsIjoid2VibWFzdGVyQGNib2EuY2EiLCJlbWFpbF9jb25maXJtZWRfYXQiOiIyMDI1LTExLTMwVDA5OjI1OjExLjU4NDU2OVoiLCJwaG9uZSI6IiIsImNvbmZpcm1lZF9hdCI6IjIwMjUtMTEtMzBUMDk6MjU6MTEuNTg0NTY5WiIsImxhc3Rfc2lnbl9pbl9hdCI6IjIwMjYtMDEtMjhUMTg6MDI6MjMuNDU0MzIxWiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl0sInJvbGUiOiJhZG1pbiIsInJvbGVzIjpbImFkbWluIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsX3ZlcmlmaWVkIjp0cnVlfSwiaWRlbnRpdGllcyI6W3siaWRlbnRpdHlfaWQiOiJlNjcxZGRhNS05YjJlLTQ0OTEtYjZhYy0xZDczMmViYzc5NmIiLCJpZCI6IjUyZjA1MjAyLTcyYTgtNGQ2OC1hOTNjLTIxYzNlMzliMDQ2NyIsInVzZXJfaWQiOiI1MmYwNTIwMi03MmE4LTRkNjgtYTkzYy0yMWMzZTM5YjA0NjciLCJpZGVudGl0eV9kYXRhIjp7ImVtYWlsIjoid2VibWFzdGVyQGNib2EuY2EiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwic3ViIjoiNTJmMDUyMDItNzJhOC00ZDY4LWE5M2MtMjFjM2UzOWIwNDY3In0sInByb3ZpZGVyIjoiZW1haWwiLCJsYXN0X3NpZ25faW5fYXQiOiIyMDI1LTExLTMwVDA5OjI1OjExLjU4MjQ4OVoiLCJjcmVhdGVkX2F0IjoiMjAyNS0xMS0zMFQwOToyNToxMS41ODI1NDRaIiwidXBkYXRlZF9hdCI6IjIwMjUtMTEtMzBUMDk6MjU6MTEuNTgyNTQ0WiIsImVtYWlsIjoid2VibWFzdGVyQGNib2EuY2EifV0sImNyZWF0ZWRfYXQiOiIyMDI1LTExLTMwVDA5OjI1OjExLjU4MDc4NFoiLCJ1cGRhdGVkX2F0IjoiMjAyNi0wMS0zMVQwNjoyMzo0My43ODA0ODNaIiwiaXNfYW5vbnltb3VzIjpmYWxzZX19',
      domain: 'cboa.ca',
      path: '/'
    }
  ]);

  const page = await context.newPage();

  // Rename existing dark mode screenshots
  const projects = ['sportsmanager', 'cboa', 'quest-canada'];
  for (const proj of projects) {
    const dir = path.join(__dirname, `../public/projects/${proj}`);
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.png') && !file.includes('-dark') && !file.includes('-light')) {
        const newName = file.replace('.png', '-dark.png');
        fs.renameSync(path.join(dir, file), path.join(dir, newName));
        console.log(`Renamed ${file} -> ${newName}`);
      }
    }
  }

  // SportsManager (light mode)
  console.log('\nCapturing SportsManager (light)...');
  const smDir = path.join(__dirname, '../public/projects/sportsmanager');
  const smPages = [
    { url: 'https://syncedsport.com', name: '01-home-light' },
    { url: 'https://syncedsport.com/features', name: '02-features-light' },
    { url: 'https://syncedsport.com/features/scheduling', name: '03-scheduling-light' },
    { url: 'https://syncedsport.com/solutions/assignors', name: '04-assignors-light' },
    { url: 'https://syncedsport.com/solutions/officials', name: '05-officials-light' },
    { url: 'https://syncedsport.com/pricing', name: '06-pricing-light' },
    { url: 'https://syncedsport.com/features/analytics', name: '07-analytics-light' },
  ];
  for (const p of smPages) {
    console.log(`  ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(smDir, `${p.name}.png`) });
    } catch (err) {
      console.log(`    Failed: ${err.message}`);
    }
  }

  // Quest Canada (light mode)
  console.log('\nCapturing Quest Canada (light)...');
  const qcDir = path.join(__dirname, '../public/projects/quest-canada');
  const qcPages = [
    { url: 'https://cpsc405.joeyfishertech.com', name: '01-landing-light', wait: 3000 },
    { url: 'https://cpsc405.joeyfishertech.com/assessments', name: '02-assessments-light', wait: 3000 },
    { url: 'https://cpsc405.joeyfishertech.com/projects/seed-proj-002', name: '03-project-light', wait: 3000 },
    { url: 'https://cpsc405.joeyfishertech.com/dashboards', name: '04-dashboards-light', wait: 3000 },
    { url: 'https://cpsc405.joeyfishertech.com/analytics', name: '05-analytics-light', wait: 3000 },
  ];
  for (const p of qcPages) {
    console.log(`  ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(p.wait);
      await page.screenshot({ path: path.join(qcDir, `${p.name}.png`) });
    } catch (err) {
      console.log(`    Failed: ${err.message}`);
    }
  }

  // CBOA (light mode)
  console.log('\nCapturing CBOA (light)...');
  const cboaDir = path.join(__dirname, '../public/projects/cboa');
  const cboaPages = [
    { url: 'https://cboa.ca', name: '01-home-light', wait: 3000 },
    { url: 'https://cboa.ca/portal', name: '02-dashboard-light', wait: 5000 },
    { url: 'https://cboa.ca/portal/calendar', name: '03-calendar-light', wait: 5000 },
    { url: 'https://cboa.ca/portal/resources', name: '04-resources-light', wait: 5000 },
    { url: 'https://cboa.ca/portal/evaluations', name: '05-evaluations-light', wait: 5000 },
    { url: 'https://cboa.ca/portal/news', name: '06-news-light', wait: 5000 },
  ];
  for (const p of cboaPages) {
    console.log(`  ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(p.wait);
      await page.screenshot({ path: path.join(cboaDir, `${p.name}.png`) });
    } catch (err) {
      console.log(`    Failed: ${err.message}`);
    }
  }

  await browser.close();
  console.log('\nDone!');
}

captureScreenshots().catch(console.error);
