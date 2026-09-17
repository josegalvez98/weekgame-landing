// Piezas gráficas para las cuentas y los posts, compuestas con el estilo de la landing y capturadas con Chrome.
// Uso: node social.mjs   → landing/social/*.png
// avatar 1024², cabecera X 1500x500, cabecera YouTube 2560x1440, imagen de post 1200x675 (también og:image),
// carrusel de Instagram 1080x1350 (6 retratos + cierre).
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = 'D:/Escritorio/Proyectos/5.WeekGame';
const OUT = path.join(RAIZ, 'landing/social'); fs.mkdirSync(OUT, { recursive: true });
const img = (f) => 'file:///' + path.join(RAIZ, f).split(path.sep).join('/');
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bangers&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0}
body{background:#120A1E;color:#F4F4FA;font-family:'Zen Kaku Gothic New',sans-serif;overflow:hidden}
.bg{position:absolute;inset:0;background:#120A1E repeating-linear-gradient(115deg,transparent 0 46px,rgba(122,59,255,.09) 46px 48px)}
.disp{font-family:Bangers,Impact,sans-serif;font-weight:400;letter-spacing:2px;color:#fff;text-shadow:6px 6px 0 #0A0512}
.disp b{font-weight:400;color:#AB8BFF}
.kick{display:inline-block;font-weight:700;color:#15161C;background:#AB8BFF;padding:8px 14px;transform:skewX(-6deg)}
.btn{display:inline-block;font-family:Bangers;letter-spacing:2px;background:#7A3BFF;color:#fff;border:3px solid #fff;box-shadow:8px 8px 0 #fff;padding:18px 30px;transform:skewX(-6deg)}
.panel{background:#F6F4EE;color:#15161C;border:3px solid #15161C;box-shadow:10px 10px 0 #7A3BFF;padding:30px}
`;
const tiers = [['Grado 4', 'niveles 0 a 9', 'Sin talento'], ['Grado 3', 'niveles 10 a 19', 'Grado 3 novato'], ['Grado 2', 'niveles 20 a 29', 'Semigrado 2'], ['Grado 1', 'niveles 30 a 39', 'Grado 1'], ['Grado especial', 'niveles 40 a 49', 'Grado especial'], ['El más fuerte', 'niveles 50 a 59', 'El más fuerte']];

const piezas = {
  'avatar': [1024, 1024, `
    <div class="bg"></div>
    <div style="position:absolute;inset:60px;border-radius:50%;background:radial-gradient(circle at 50% 45%,#3A1E7A,#120A1E 70%);border:14px solid #AB8BFF;overflow:hidden">
      <img src="${img('app/img/an-2.png')}" style="position:absolute;left:50%;top:6%;width:1000px;transform:translateX(-50%);filter:drop-shadow(0 20px 30px rgba(0,0,0,.8))">
    </div>
    <div class="disp" style="position:absolute;left:0;right:0;bottom:60px;text-align:center;font-size:150px;line-height:1">Week<b>Game</b></div>`],
  'cabecera-x': [1500, 500, `
    <div class="bg"></div>
    <img src="${img('app/img/originales/hero-pullup.png')}" style="position:absolute;left:0;top:0;height:500px;width:500px;object-fit:cover;-webkit-mask-image:linear-gradient(90deg,#000 65%,transparent)">
    <div style="position:absolute;left:520px;top:80px;right:60px">
      <div class="disp" style="font-size:150px;line-height:1">Week<b>Game</b></div>
      <div style="font-size:40px;color:#C9CBE0;margin-top:14px;font-weight:500">Tu entrenamiento es un juego. Sube de nivel cada semana.</div>
      <div style="margin-top:34px"><span class="kick" style="font-size:28px"><span style="display:inline-block;transform:skewX(6deg)">Beta cerrada · lista de espera en weekgame.jose98vk.workers.dev</span></span></div>
    </div>`],
  'cabecera-youtube': [2560, 1440, `
    <div class="bg"></div>
    <img src="${img('app/img/originales/hero-pullup.png')}" style="position:absolute;left:420px;top:280px;height:880px;width:880px;object-fit:cover;-webkit-mask-image:linear-gradient(90deg,#000 70%,transparent)">
    <div style="position:absolute;left:1260px;top:440px;width:900px">
      <div class="disp" style="font-size:190px;line-height:1">Week<b>Game</b></div>
      <div style="font-size:52px;color:#C9CBE0;margin-top:16px;font-weight:500">Tu entrenamiento es un juego.<br>Sube de nivel cada semana.</div>
      <div style="margin-top:40px"><span class="btn" style="font-size:44px"><span style="display:inline-block;transform:skewX(6deg)">Prototipo gratis, enlace abajo</span></span></div>
    </div>`],
  'post-1200x675': [1200, 675, `
    <div class="bg"></div>
    <img src="${img('app/img/originales/hero-pullup.png')}" style="position:absolute;left:0;top:0;height:675px;width:675px;object-fit:cover;-webkit-mask-image:linear-gradient(90deg,#000 70%,transparent)">
    <div style="position:absolute;left:600px;top:90px;right:50px">
      <span class="kick" style="font-size:22px"><span style="display:inline-block;transform:skewX(6deg)">Beta cerrada. Lista de espera abierta.</span></span>
      <div class="disp" style="font-size:100px;line-height:.95;margin-top:22px">Tu entrenamiento es un <b>juego</b></div>
      <div style="font-size:30px;color:#C9CBE0;margin-top:22px;font-weight:500">Objetivos por semana. Sin rachas. Un personaje que sube de nivel contigo.</div>
      <div style="margin-top:34px"><span class="btn" style="font-size:30px"><span style="display:inline-block;transform:skewX(6deg)">Probar el prototipo</span></span></div>
    </div>`],
  'carrusel-0': [1080, 1350, `
    <div class="bg"></div>
    <div style="position:absolute;left:80px;right:80px;top:120px">
      <span class="kick" style="font-size:30px"><span style="display:inline-block;transform:skewX(6deg)">Desliza →</span></span>
      <div class="disp" style="font-size:150px;line-height:.95;margin-top:30px">Tu personaje sube de <b>grado</b> contigo</div>
      <div style="font-size:44px;color:#C9CBE0;margin-top:30px;font-weight:500">Cada diez niveles cambia de aspecto. Cada nivel son semanas de entreno cumplidas.</div>
    </div>
    <img src="${img('app/img/an-0.png')}" style="position:absolute;left:50%;bottom:-40px;width:640px;transform:translateX(-50%);filter:drop-shadow(0 20px 30px rgba(0,0,0,.8))">`],
  ...Object.fromEntries(tiers.map((t, i) => [`carrusel-${i + 1}`, [1080, 1350, `
    <div class="bg"></div>
    <div style="position:absolute;left:0;right:0;top:110px;text-align:center">
      <div class="disp" style="font-size:190px;line-height:.9">${t[0]}</div>
      <div style="font-size:44px;color:#AB8BFF;font-weight:700;margin-top:12px">${t[1]}</div>
    </div>
    <img src="${img(`app/img/an-${i}.png`)}" style="position:absolute;left:50%;top:400px;width:820px;transform:translateX(-50%);filter:drop-shadow(0 20px 30px rgba(0,0,0,.8))">
    <div style="position:absolute;left:0;right:0;bottom:90px;text-align:center;font-size:40px;color:#C9CBE0">Título de nivel ${i * 10}: <b style="color:#fff">${t[2]}</b></div>`]])),
  'carrusel-7': [1080, 1350, `
    <div class="bg"></div>
    <div style="position:absolute;left:80px;right:80px;top:200px;text-align:center">
      <div class="disp" style="font-size:200px;line-height:1">Week<b>Game</b></div>
      <div style="font-size:50px;color:#C9CBE0;margin-top:20px;font-weight:500">Tu entrenamiento es un juego.<br>Sube de nivel cada semana.</div>
      <div style="margin-top:80px"><span class="btn" style="font-size:52px"><span style="display:inline-block;transform:skewX(6deg)">Prototipo gratis en el perfil</span></span></div>
      <div style="font-size:38px;color:#8E92B8;margin-top:70px">Sin rachas · tus objetivos o una plantilla · 4 temas</div>
    </div>`],
};

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--allow-file-access-from-files'] });
const page = await browser.newPage();
for (const [nombre, [w, h, html]] of Object.entries(piezas)) {
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  const tmp = path.join(OUT, '_tmp.html'); // fichero real: desde about:blank Chrome no deja cargar imágenes file://
  fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body style="width:${w}px;height:${h}px;position:relative">${html}</body></html>`);
  await page.goto('file:///' + tmp.split(path.sep).join('/'), { waitUntil: 'load', timeout: 60000 });
  await page.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))]));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(OUT, nombre + '.png') });
  console.log(nombre);
}
await browser.close(); fs.unlinkSync(path.join(OUT, '_tmp.html'));
