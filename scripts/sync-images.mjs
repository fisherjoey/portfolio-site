import fs from 'node:fs/promises'
import path from 'node:path'

const BASE = 'https://joeyfishertech.com/projects'
const OUT = '/home/joey/dev/Portfolio/portfolio-site/public/projects'

const paths = [
  'cboa/01-home-dark.png',
  'cboa/02-dashboard-dark.png',
  'cboa/03-calendar-dark.png',
  'cboa/04-resources-dark.png',
  'cboa/06-news-dark.png',
  'chordapp/01-home-dark.png',
  'chordapp/02-search-dark.png',
  'chordapp/03-viewer-dark.png',
  'chordapp/04-setlist-dark.png',
  'quest-canada/01-landing-dark.png',
  'quest-canada/02-dashboards-dark.png',
  'quest-canada/03-milestones-dark.png',
  'quest-canada/04-project-dark.png',
  'sportsmanager/01-home-dark.png',
  'sportsmanager/02-features-dark.png',
  'sportsmanager/03-scheduling-dark.png',
  'sportsmanager/04-assignors-dark.png',
  'sportsmanager/05-officials-dark.png',
  'sportsmanager/06-pricing-dark.png',
  'sportsmanager/07-analytics-dark.png',
]

const results = await Promise.all(
  paths.map(async (p) => {
    const url = `${BASE}/${p}`
    const out = path.join(OUT, p)
    try {
      await fs.mkdir(path.dirname(out), { recursive: true })
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      await fs.writeFile(out, buf)
      return { p, ok: true, size: buf.length }
    } catch (e) {
      return { p, ok: false, err: e.message }
    }
  }),
)

let ok = 0, fail = 0
for (const r of results) {
  if (r.ok) {
    console.log(`  ✓ ${r.p}  (${(r.size / 1024).toFixed(0)} KB)`)
    ok++
  } else {
    console.log(`  ✗ ${r.p}  ${r.err}`)
    fail++
  }
}
console.log(`\n${ok} ok, ${fail} failed`)
