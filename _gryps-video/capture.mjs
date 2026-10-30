import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = __dirname
const FRAMES = path.join(ROOT, 'frames')
const OUT = path.join(ROOT, '..', 'public', 'gryps-resilience-signature.mp4')
const STILL = path.join(ROOT, '..', 'public', 'gryps-resilience-signature.png')
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const envPath = process.env.Path || process.env.PATH || ''
const FFMPEG = envPath.split(';').flatMap((p) => {
  try {
    const cand = path.join(p, 'ffmpeg.exe')
    return fs.existsSync(cand) ? [cand] : []
  } catch { return [] }
})[0] || 'C:\\Users\\h-mor\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0-full_build\\bin\\ffmpeg.exe'

fs.rmSync(FRAMES, { recursive: true, force: true })
fs.mkdirSync(FRAMES, { recursive: true })
fs.mkdirSync(path.dirname(OUT), { recursive: true })

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
}

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent((req.url || '/').split('?')[0]).replace(/^\//, '') || 'storyboard.html'
  const file = path.normalize(path.join(ROOT, rel))
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) {
    res.writeHead(404); res.end('missing'); return
  }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})

await new Promise((r) => server.listen(0, '127.0.0.1', r))
const port = server.address().port
const url = `http://127.0.0.1:${port}/storyboard.html`
console.log('Serving', url)

const userData = path.join(ROOT, 'chrome-profile')
fs.rmSync(userData, { recursive: true, force: true })
fs.mkdirSync(userData, { recursive: true })

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--user-data-dir=${userData}`,
  '--remote-debugging-port=9334',
  '--window-size=1280,720',
  'about:blank',
], { stdio: 'ignore' })

for (let i = 0; i < 40; i++) {
  try {
    await fetch('http://127.0.0.1:9334/json/version')
    break
  } catch {
    await new Promise((r) => setTimeout(r, 250))
  }
}

const created = await (await fetch('http://127.0.0.1:9334/json/new?' + encodeURIComponent(url), { method: 'PUT' })).json()
const ws = new WebSocket(created.webSocketDebuggerUrl)
await new Promise((r, j) => { ws.addEventListener('open', r); ws.addEventListener('error', j) })

let id = 0
const pending = new Map()
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg)
    pending.delete(msg.id)
  }
})
function psend(method, params = {}) {
  return new Promise((resolve, reject) => {
    const thisId = ++id
    const timer = setTimeout(() => reject(new Error('timeout ' + method)), 60000)
    pending.set(thisId, (msg) => {
      clearTimeout(timer)
      if (msg.error) reject(new Error(JSON.stringify(msg.error)))
      else resolve(msg)
    })
    ws.send(JSON.stringify({ id: thisId, method, params }))
  })
}

await psend('Page.enable')
await psend('Emulation.setDeviceMetricsOverride', {
  width: 1280, height: 720, deviceScaleFactor: 1, mobile: false,
})
await new Promise((r) => setTimeout(r, 2500))

// Hard reload so animation timeline starts after fonts settle
await psend('Page.reload', { ignoreCache: true })
await new Promise((r) => setTimeout(r, 800))

const FPS = 10
const DURATION = 60
const TOTAL = FPS * DURATION
console.log(`Capturing ${TOTAL} frames at ${FPS}fps (~${DURATION}s)...`)

for (let i = 0; i < TOTAL; i++) {
  const shot = await psend('Page.captureScreenshot', { format: 'png', fromSurface: true })
  const buf = Buffer.from(shot.result.data, 'base64')
  fs.writeFileSync(path.join(FRAMES, `frame_${String(i).padStart(4, '0')}.png`), buf)
  if (i === 340) fs.writeFileSync(STILL, buf)
  if (i % 50 === 0) console.log(`  frame ${i}/${TOTAL}`)
  await new Promise((r) => setTimeout(r, Math.max(0, 1000 / FPS - 15)))
}

ws.close()
chrome.kill()
server.close()

console.log('Encoding with', FFMPEG)
await new Promise((resolve, reject) => {
  const ff = spawn(FFMPEG, [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(FRAMES, 'frame_%04d.png'),
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-crf', '20',
    '-movflags', '+faststart',
    '-t', String(DURATION),
    OUT,
  ], { stdio: 'inherit' })
  ff.on('exit', (code) => code === 0 ? resolve() : reject(new Error('ffmpeg exit ' + code)))
})

if (!fs.existsSync(STILL)) {
  fs.copyFileSync(path.join(FRAMES, 'frame_0340.png'), STILL)
}

console.log('Wrote', OUT, fs.statSync(OUT).size)
console.log('Wrote', STILL, fs.statSync(STILL).size)
fs.rmSync(FRAMES, { recursive: true, force: true })
fs.rmSync(userData, { recursive: true, force: true })
process.exit(0)
