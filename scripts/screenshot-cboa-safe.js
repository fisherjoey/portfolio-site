const { chromium } = require('playwright');
const path = require('path');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    colorScheme: 'dark'
  });

  // Add auth cookies
  await context.addCookies([
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
  const outputDir = path.join(__dirname, '../public/projects/cboa');

  // Helper to blur/hide sensitive content
  async function hideSensitiveData() {
    await page.addStyleTag({
      content: `
        /* Hide email addresses and phone numbers */
        [href^="mailto:"], [href^="tel:"] { filter: blur(8px) !important; }

        /* Blur member cards content but keep structure */
        .member-card, [class*="member"] { }
        .member-card p, .member-card span:not(:first-child) { filter: blur(6px) !important; }

        /* Hide specific user info */
        [class*="email"], [class*="phone"] { filter: blur(8px) !important; }
      `
    });
  }

  // Pages to capture (skip members page entirely)
  const pages = [
    { url: 'https://cboa.ca', name: '01-home', wait: 3000, blur: false },
    { url: 'https://cboa.ca/portal', name: '02-dashboard', wait: 5000, blur: false },
    { url: 'https://cboa.ca/portal/calendar', name: '03-calendar', wait: 5000, blur: false },
    { url: 'https://cboa.ca/portal/resources', name: '04-resources', wait: 5000, blur: false },
    { url: 'https://cboa.ca/portal/evaluations', name: '05-evaluations', wait: 5000, blur: true },
    { url: 'https://cboa.ca/portal/news', name: '06-news', wait: 5000, blur: false },
  ];

  console.log('Capturing CBOA (safe mode)...');
  for (const p of pages) {
    console.log(`  ${p.name}...`);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(p.wait);

      if (p.blur) {
        await hideSensitiveData();
        await page.waitForTimeout(500);
      }

      await page.screenshot({ path: path.join(outputDir, `${p.name}.png`) });
      console.log(`    Saved`);
    } catch (err) {
      console.log(`    Failed: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done!');
}

captureScreenshots().catch(console.error);
