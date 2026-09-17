// Capturas del prototipo para la landing: entrada, Semana y Personaje, tamaño iPhone a 2x.
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = 'D:/Escritorio/Proyectos/5.WeekGame';
const proto = fs.readFileSync(path.join(RAIZ, 'app/weekgame.html'), 'utf8');
const tmp = path.join(RAIZ, 'landing/prototipo/proto-index.html'); // junto a img/ para que carguen los retratos
fs.writeFileSync(tmp, `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${proto}</body></html>`);
const salida = path.join(RAIZ, 'landing/capturas'); // uso: npm i puppeteer-core && node capturas.mjs

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto('file:///' + tmp.split(path.sep).join('/'), { waitUntil: 'networkidle0' });
await page.evaluate(async () => { localStorage.clear(); await document.fonts.ready; });
await page.reload({ waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 500));

await page.screenshot({ path: path.join(salida, 'entrada.png') });
await page.evaluate(() => { cerrarEntrada(); ir('semana'); });
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: path.join(salida, 'semana.png') });
await page.evaluate(() => ir('personaje'));
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: path.join(salida, 'personaje.png') });
await page.evaluate(() => ir('logros'));
await new Promise((r) => setTimeout(r, 300));
await page.screenshot({ path: path.join(salida, 'logros.png') });
await browser.close(); fs.unlinkSync(tmp);
console.log('ok', fs.readdirSync(salida));
