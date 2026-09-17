# WeekGame, landing de la lista de espera

Una sola página estática (`index.html`), bilingüe (español / inglés con selector y `?lang=es` / `?lang=en`),
con formulario de email en Formspree y capturas del prototipo. Se publica en Cloudflare (Workers & Pages) desde este repositorio: https://weekgame.jose98vk.workers.dev/

## Qué hay

- `index.html`: la página entera (estilos, textos en los dos idiomas y envío del formulario).
- `capturas/`: capturas del prototipo (Semana, Personaje, Logros y la pantalla de entrada), 390×844 a 2x.
  Se regeneran con `capturas.mjs` (Chrome controlado por puppeteer-core) si cambia el prototipo.
- `icono.png`: el mismo icono que el prototipo.

## Puesta en marcha (una vez)

1. **Formspree**: cuenta gratis en formspree.io → New form → copiar el ID (`https://formspree.io/f/xxxxxxxx`).
   En `index.html`, sustituir `FORMSPREE_ID` (aparece dos veces) por ese ID.
2. **GitHub**: crear el repositorio público `weekgame-landing` vacío y subir esta carpeta.
3. **Cloudflare Pages**: dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git →
   elegir el repositorio. Framework preset: *None*; build command vacío; output directory `/`.
   Cloudflare lo crea como Worker con ficheros estáticos: `https://weekgame.jose98vk.workers.dev/`. Cada `git push` republica sola.
4. **Analítica**: Cloudflare Web Analytics, con el snippet del final de `index.html` (Analytics & Logs → Web Analytics → Add a site).

## Cambios después

Editar `index.html`, `git commit`, `git push`. Cloudflare tarda un minuto en republicar.

## Enlaces por canal

El parámetro `?de=` marca de dónde viene cada apuntado y llega con el correo de Formspree (campo `de`).
Usar uno por canal: `?de=ig`, `?de=tiktok`, `?de=reddit`, `?de=amigos`. Se combina con el idioma: `?lang=en&de=reddit`.


- Español: `https://weekgame.jose98vk.workers.dev/?lang=es`
- Inglés: `https://weekgame.jose98vk.workers.dev/?lang=en`
