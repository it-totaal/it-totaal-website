/**
 * GitHub Pages serveert alleen bestanden die echt bestaan. Voor een app met
 * routing aan de clientkant betekent dat: /team bestaat niet als bestand, dus
 * een directe link geeft de 404-pagina van GitHub. De route werkt alleen als je
 * vanaf de voorpagina doorklikt.
 *
 * Dit script schrijft na de build voor elke route een echte index.html weg, met
 * de juiste titel, omschrijving en deelafbeelding erin. Daarmee geeft de server
 * een 200, ziet een zoekmachine meteen de goede gegevens, en tonen LinkedIn en
 * WhatsApp de juiste preview - die voeren geen JavaScript uit en zien dus alleen
 * wat er in de HTML staat.
 *
 * 404.html is een kopie van de voorpagina, zodat een onbekend pad alsnog in de
 * app terechtkomt en de NotFound-route te zien krijgt.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const hier = dirname(fileURLToPath(import.meta.url));
const dist = join(hier, '..', 'dist');
const routes = JSON.parse(readFileSync(join(hier, '..', 'src', 'seo-routes.json'), 'utf8'));

const basis = readFileSync(join(dist, 'index.html'), 'utf8');

const escape = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function vervang(html, { title, description, canonical, ogImage }) {
  let uit = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escape(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escape(description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escape(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escape(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${escape(canonical)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${escape(canonical)}$2`);

  if (ogImage) {
    uit = uit
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${escape(ogImage)}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${escape(ogImage)}$2`);
  }
  return uit;
}

let aantal = 0;
for (const [pad, meta] of Object.entries(routes)) {
  if (pad === '/') continue; // dat is index.html zelf al
  const map = join(dist, pad.replace(/^\//, ''));
  mkdirSync(map, { recursive: true });
  writeFileSync(join(map, 'index.html'), vervang(basis, meta));
  aantal++;
}

writeFileSync(join(dist, '404.html'), basis);

console.log(`prerender: ${aantal} routes weggeschreven + 404.html`);
