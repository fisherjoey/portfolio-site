import { chromium } from '/home/joey/dev/tint-base/node_modules/playwright/index.mjs'
import fs from 'node:fs'
import path from 'node:path'

const PUBLIC = '/home/joey/dev/Portfolio/portfolio-site/public/projects'

const targets = [
  { slug: 'sportsmanager', url: 'https://syncedsport.com' },
  { slug: 'cboa',          url: 'https://cboa.ca' },
  { slug: 'oktint',        url: 'https://okotokstinting.com' },
  { slug: 'quest-canada',  url: 'https://cpsc405.joeyfishertech.com' },
  { slug: 'chordapp',      url: 'https://chords.joeyfishertech.com' },
]

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})

for (const { slug, url } of targets) {
  const dir = path.join(PUBLIC, slug)
  fs.mkdirSync(dir, { recursive: true })
  const page = await ctx.newPage()
  try {
    console.log('→', url)
    await page.goto(url, { waitUntil: 'load', timeout: 30000 })
    await page.waitForTimeout(3000)
    const out = path.join(dir, '01-home.png')
    await page.screenshot({ path: out, fullPage: false })
    console.log('  ✓', out)
  } catch (e) {
    console.error('  ✗', slug, e.message)
  } finally {
    await page.close()
  }
}

await browser.close()
console.log('done')
