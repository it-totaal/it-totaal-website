# IT Totaal — website

Marketingsite van IT Totaal Diensten BV. Live op **[it-totaal.nl](https://it-totaal.nl)**.

Oorspronkelijk gegenereerd in bolt.new, daarna verhuisd naar GitHub Pages voor versiebeheer en een eigen domein.

> **Lees ook [NOTES.md](NOTES.md).** Daar staan de valkuilen, de genomen beslissingen en de dingen die anders bleken dan verwacht. Deze README beschrijft hoe het werkt; NOTES.md waarom het zo werkt en waar je op je gezicht gaat.

## Aan de slag

```bash
npm install
npm run dev          # draait op http://localhost:5173
```

| Commando | Wat het doet |
|---|---|
| `npm run dev` | ontwikkelserver met hot reload |
| `npm run build` | productiebuild **plus** de prerender-stap |
| `npm run typecheck` | TypeScript controleren zonder te bouwen |
| `npm run lint` | ESLint |
| `npm run preview` | de gebouwde site lokaal bekijken |

## Stack

React 18 met TypeScript, gebouwd door Vite 5, opgemaakt met Tailwind 3. Routing via react-router 7, iconen van lucide-react, de klantenkaart met Leaflet.

Geen backend en geen database: het is een statische site. Alle gegevens zitten in de broncode of in `src/data/`.

## Structuur

```
index.html              bevat het keuzescript voor de hero-foto (draait vóór React)
src/
  App.tsx               de volledige voorpagina
  main.tsx              routes
  seo-routes.json       titel, omschrijving en canonical per route
  components/
    SiteHeader.tsx      zwevende menubalk, gedeeld door alle pagina's
    SiteFooter.tsx      voettekst, gedeeld door alle pagina's
    SEO.tsx             zet de metatags bij het laden van een pagina
    StructuredData.tsx  schema.org-gegevens voor zoekmachines
    InfiniteLogoScroll  doorlopende band met klantlogo's
    CustomerMap         klantenkaart (Leaflet, lazy geladen)
    StaticMap           statische variant daarvan
  pages/                Team, Hulpmiddelen en de drie juridische pagina's
  data/                 klantlocaties voor de kaart
scripts/
  prerender-routes.mjs  schrijft na de build per route een echte index.html
public/                 afbeeldingen, logo's, PDF's, CNAME, robots.txt, sitemap.xml
```

## Live zetten

Twee stappen, in deze volgorde:

```bash
npm run build
npx gh-pages -d dist
```

De broncode staat op `main`, de gebouwde site op de branch `gh-pages`. **Alleen naar `main` pushen verandert niets aan de live site.** Reken op 35 tot 60 seconden voordat GitHub Pages de nieuwe versie serveert.

Draai nooit los `vite build` voor een deploy — zie NOTES.md, dan breken alle subpagina's.

## Waar pas je wat aan

| Ik wil… | Bestand |
|---|---|
| een hero-foto toevoegen of weghalen | de lijst `fotos` in `index.html` |
| een teamlid wijzigen | `TEAM` in `src/pages/Team.tsx` |
| een vacature plaatsen of sluiten | `VACATURES` in `src/pages/Team.tsx` — is de lijst leeg, dan verdwijnt de hele sectie |
| paginatitel of omschrijving aanpassen | `src/seo-routes.json` (wordt door zowel de pagina's als de prerender gelezen) |
| een klantlogo toevoegen | de lijst `logos` in `src/App.tsx` |
| een klant op de kaart zetten | `src/data/customer-locations.json` |

Nieuwe foto's moeten door de verwerkingsstappen uit NOTES.md — niet zomaar een JPEG in `public/` gooien.

## Vormgeving

**Kleuren.** `#46f0a4` groen (in Tailwind als `brand-green`), `#0c1959` donkerblauw voor voettekst en donkere vlakken, `#2563eb` als blauw accent voor knoppen en links, `#0f172a` en `#475569` voor tekst. De perskit-pagina op `/hulpmiddelen` is de bron van waarheid.

**Typografie.** Inter, met per tekstgrootte een eigen regelhoogte en letterspatiëring in `tailwind.config.js`. Grotere koppen staan strakker op elkaar, kleine tekst juist ruimer.

**Hover.** Er is een vaste set in `src/index.css`: `hover-lift`, `hover-scale` en `hover-glow`. Kaarten komen omhoog met `hover:-translate-y-1` en krijgen een grotere schaduw; iconen kleuren blauw en schalen op. Verzin geen nieuw gedrag — kijk wat een vergelijkbaar element op de voorpagina doet.

**Animatie.** Alleen bij het laden, met twee klassen: `animate-slide-in-up` voor tekst en `animate-scale-in` voor beeld. Geen scroll-effecten.

**Achtergronden.** Getinte secties (`from-slate-50 via-blue-50/30 to-slate-50`) wisselen af met witte. Elke witte sectie heeft decoratie: een golf in `#eff6ff` of organische vormen op 15% dekking in `#dbeafe` en `#a7f3d0`.

**Hero-foto's** zijn vierkant, portretten op de teampagina 3:4, allebei in twee resoluties via `srcset`.

De uitwerking en de valkuilen staan in NOTES.md onder *Opmaak*.

## Domein en hosting

GitHub Pages, custom domein via `public/CNAME`. Het canonieke adres is de **apex** `it-totaal.nl`; GitHub leidt `www` daarheen om. DNS loopt via Cloudflare met het wolkje **grijs** — proxy aanzetten botst met het SSL-certificaat van GitHub Pages.
