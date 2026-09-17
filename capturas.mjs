// Capturas del prototipo para la landing, tamaño iPhone a 2x. Uso: npm i puppeteer-core && node capturas.mjs
// Anime (tema por defecto): entrada, semana, cierre de semana, subida de nivel.
// Miniaturas de tema: semana en Ceniza y Gimnasio (8 bits se queda fuera hasta cambiar el sprite).
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = 'D:/Escritorio/Proyectos/5.WeekGame';
const proto = fs.readFileSync(path.join(RAIZ, 'app/weekgame.html'), 'utf8');
const tmp = path.join(RAIZ, 'landing/prototipo/proto-index.html'); // junto a img/ para que carguen los retratos
fs.writeFileSync(tmp, `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${proto}</body></html>`);
const salida = path.join(RAIZ, 'landing/capturas');

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const foto = async (nombre) => { await espera(400); await page.screenshot({ path: path.join(salida, nombre + '.png') }); };

await page.goto('file:///' + tmp.split(path.sep).join('/'), { waitUntil: 'networkidle0' });
await page.evaluate(async () => { localStorage.clear(); await document.fonts.ready; });
await page.reload({ waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await espera(800);

// Anime, pantalla por pantalla
await foto('entrada');
await page.evaluate(() => { cerrarEntrada(); ir('semana'); });
await foto('semana');
await page.evaluate(() => hojaCierre());
await foto('cierre');
await page.evaluate(() => { cerrar(); ventanaNivel(8, true); });
await espera(1200); // la animación del emblema
await foto('nivel');
await page.evaluate(() => cerrar());

// Miniaturas de tema: la Semana en cada uno
for (const t of ['ceniza', 'gym']) {
  await page.evaluate((t) => { aplicarTema(t); ir('semana'); renderSemana(); window.scrollTo(0, 0); }, t);
  await page.evaluate(() => document.fonts.ready);
  await espera(1200);
  await foto('tema-' + t);
}

await browser.close();
fs.unlinkSync(tmp);
console.log('ok', fs.readdirSync(salida));
