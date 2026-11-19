import { chromium } from 'playwright'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const jobs = [
  { html: 'concept-1-surreal.html', out: 'concept-1-surreal.png' },
  { html: 'concept-2-industrial.html', out: 'concept-2-industrial.png' },
  { html: 'concept-3-human-machine.html', out: 'concept-3-human-machine.png' },
  { html: 'concept-4-editorial.html', out: 'concept-4-editorial.png' },
  { html: 'refined.html', out: 'linkedin-banner-final.png' },
]

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1584, height: 396 },
  deviceScaleFactor: 1,
})

for (const job of jobs) {
  const fileUrl = 'file:///' + path.join(__dirname, job.html).replace(/\\/g, '/')
  await page.goto(fileUrl, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready
  })
  await page.waitForTimeout(400)
  const outPath = path.join(__dirname, job.out)
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width: 1584, height: 396 },
    type: 'png',
  })
  console.log('wrote', outPath)
}

await browser.close()
