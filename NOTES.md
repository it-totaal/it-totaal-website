# NOTES

Lessen en valkuilen van dit project. Lees dit aan het begin van elke sessie.

## Open punten

- **GitHub-token roteren** — staat in platte tekst in de remote-URL in `.git/config` (niet in de repo, wel wereldleesbaar op deze Mac en meegereisd in elke kopie van de map). Patrick roteert hem op 26-08-2026. Daarna de remote omzetten naar een schone URL met credential helper of SSH.
- **LinkedIn van Leon Hoogduin** ontbreekt — in `src/pages/Team.tsx`, in de `TEAM`-lijst het lege veld `linkedin: ''` bij zijn blok. De knop verschijnt vanzelf zodra er een URL staat.
- **Link vanaf de voorpagina naar `/team`** — nu alleen bereikbaar via menu en voettekst. De sectie `#waarom` is de natuurlijke plek; interne links tellen mee voor vindbaarheid.
- **Privacyverklaring klopt niet** — in `src/pages/PrivacyStatement.tsx` staat dat gegevens worden verzameld "via formulieren of bij het aanmaken van een account" (zoek op *formulieren*). Er is geen formulier en er zijn geen accounts.

## Deploy

- Live zetten is **twee stappen**: `npm run build` en daarna `npx gh-pages -d dist`. Alleen naar `main` pushen verandert niets aan de live site — de broncode staat op `main`, de gebouwde site op `gh-pages`.
- **Nooit los `vite build` draaien voor een deploy.** Het build-script bevat een prerender-stap (`scripts/prerender-routes.mjs`) die per route een echte `index.html` wegschrijft. Sla je die over, dan geven alle subpagina's weer de 404-pagina van GitHub.
- GitHub Pages serveert alleen bestanden die echt bestaan. Een app met routing aan de clientkant heeft dus per route een bestand nodig; anders werkt `/team` alleen als je vanaf de voorpagina doorklikt en niet via een directe link, een bookmark of de sitemap.
- `public/_redirects` is Netlify-syntax en deed hier niets. Verwijderd, niet terugzetten.
- Propagatie na een deploy duurt 35 tot 60 seconden. Controleer op de bestandsnaam van de nieuwe bundel, niet op het oog — je eigen browser houdt de oude versie vast.

## Adres en vindbaarheid

- Canoniek adres is de **apex** `it-totaal.nl`, niet `www`. Dat wordt bepaald door `public/CNAME`; GitHub Pages leidt `www` op basis daarvan om met een 301. Wijzig je dat, dan moeten canonicals, sitemap en robots.txt mee.
- Routetabel staat in `src/seo-routes.json` en wordt gelezen door zowel de pagina's als het prerender-script. Titels en omschrijvingen dus op één plek aanpassen.
- `og:image` moet **JPEG of PNG** zijn, geen WebP — niet elk platform toont WebP in een deelpreview.
- Twitter-tags gebruiken `name=`, niet `property=`. Stond fout in `src/utils/seo.ts`: er ontstond een tweede set tags en elke subpagina deelde de gegevens van de voorpagina.
- DNS loopt via Cloudflare met het **wolkje grijs**. Proxy aanzetten botst met het SSL-certificaat van GitHub Pages.

## Foto's

- Originelen staan in `/Users/patrickluisman/Documents/fotos website/` (Laura de Kwant, ~10 MB per stuk).
- **Werkfoto's** horen in de hero-rotatie, **poserende portretten** op `/team`. Niet door elkaar gebruiken.
- Uitsnede **altijd handmatig kiezen**, nooit automatisch centreren — bij een 3:2-foto in een vierkant kader valt een derde van de breedte weg en sneuvelen er mensen.
- Verwerking: `ffmpeg` voor crop en schaling met `flags=lanczos`, dan `unsharp=3:3:0.9` (kleine maat) of `0.8` (grote), dan `cwebp -q 82 -m 6 -sharp_yuv`.
- **Altijd twee maten met `srcset`.** Eén groot bestand dat de browser zelf terugschaalt oogt zichtbaar zachter: het verkleinen gebeurt met een snel filter en elke verkleining kost acutantie. Gemeten met de variantie van de Laplaciaan ging de scherpte van 334 naar 681 op een gewoon scherm.
- `cwebp` start niet zonder `libtiff` — `brew install webp` alleen is niet genoeg.
- Hero-keuze valt in een script in de `<head>` van `index.html`, vóór React, zodat de preload de juiste variant met voorrang haalt. Nieuwe foto toevoegen = alleen die lijst aanvullen.
- **Een foto kan op meer dan één plek zitten.** Naast de hero-rotatie bestaan de deelafbeeldingen `og-ittotaal.jpg` (voorpagina) en `og-team.jpg` (teampagina) — losse bestanden, gemaakt uit dezelfde originelen. Haal je een foto uit de rotatie, controleer dan of hij niet ook de deelafbeelding is. Gebeurd op 02-09-2026: `hero-kantoor` werd geschrapt, maar wie de site deelde in WhatsApp kreeg diezelfde opname nog te zien.
- Nagaan of een origineel nergens meer gebruikt wordt: zoek op de bestandsnaam in `index.html` en `src/`, en vergelijk daarnaast de deelafbeeldingen visueel — die dragen de naam van hun bron niet.
- Deelafbeeldingen worden lang gecachet door WhatsApp, LinkedIn en Facebook. Na een wijziging kan de oude nog wekenlang opduiken; bij LinkedIn te forceren met de Post Inspector.

## Opmaak

- Er is een vaste hover-taal in `src/index.css`: `hover-lift`, `hover-scale`, `hover-glow`. Kaarten gebruiken `hover:shadow-md` + `hover:-translate-y-1`.
- **`hover-glow` doet niets op kaarten.** Tailwind zet zijn utilities ná de eigen klassen in de stylesheet, dus `hover:shadow-md` wint van de gloed. Geldt ook op de voorpagina; niet proberen te repareren op één pagina.
- De site animeert **alleen bij het laden**, met precies twee klassen: `animate-slide-in-up` (tekst) en `animate-scale-in` (beeld). Geen `IntersectionObserver`, geen scroll-effecten. Niet toevoegen — dan valt een pagina juist uit de toon.
- Achtergronden wisselen af: getinte secties (`from-slate-50 via-blue-50/30 to-slate-50`) tussen witte, en elke witte sectie heeft decoratie — golven in `#eff6ff` of blobs op 15% dekking in `#dbeafe` en `#a7f3d0`.
- `index.css` zet `p { max-width: 65ch }` op **alle** alinea's. Een gecentreerde alinea heeft daardoor `mx-auto` nodig, anders staat de tekst wel in het midden van zijn eigen doos maar staat die doos links.
- Menubalk en voettekst zitten in `SiteHeader` en `SiteFooter` met een `variant`: op de voorpagina wijzen de menu-items naar secties op dezelfde pagina, op een subpagina eerst terug naar de voorpagina. Bewust een gewone `<a>` en geen `<Link>`, want de browser springt dan zelf naar het anker.

## Opruimen

- Zoeken naar ongebruikte bestanden met een simpele grep op de bestandsnaam gaat **twee kanten op mis**. Vals alarm: `hero-kantoor-600.webp` staat nergens letterlijk, want die naam wordt opgebouwd (`'/' + naam + '-600.webp'`). Gemist: `logo.svg` lijkt gebruikt omdat die tekst ook in `duo-logo.svg` zit. Match daarom op een padgrens (`/` of een quote) en behandel de samengestelde families apart.
- Een browsercontrole op "niet geladen afbeeldingen" meldt van alles wat gewoon `loading="lazy"` is en nog niet in beeld kwam. Scroll eerst de hele pagina door, en vergelijk daarna met de live site voordat je concludeert dat je iets gesloopt hebt. Er blijven er 13 over — de logoscroller houdt de originelen verborgen en toont kopieen. Dat is normaal.

## Beslissingen

- **Geen contactformulier.** Op statische hosting moet dat naar een extern endpoint dat open op internet staat: spam, en bij slechte inrichting misbruik van je domein om mail te versturen. Een captcha lost dat op maar haalt een tracker binnen die je in je privacyverklaring moet verantwoorden. De mailadressen staan toch al leesbaar op de site, dus een formulier neemt geen blootstelling weg.
- **Geen oud-collega's op de teampagina.** Die pagina staat er om te tonen wie een klant aan de lijn krijgt.
- Vacatures staan bewust zonder dienstverband, uren of voorwaarden — dat werkt als open sollicitatie en houdt de drempel laag. Daardoor is `JobPosting`-data voor Google Jobs niet zinvol; die vraagt juist om wat we weglaten.
- Vacaturekaarten zien er anders uit dan teamkaarten (gestippelde rand, icoon in plaats van foto). Zagen ze er hetzelfde uit, dan telt een bezoeker vijf teamleden.
- De vacaturesectie verdwijnt vanzelf zodra `VACATURES` leeg is — geen lege kop die blijft hangen.

## Supabase

Verwijderd op 25-08-2026: het bestand, de migratie, de manualChunks-regel en de dependency. De klantenkaart leest uit `src/data/customer-locations.json`, niet uit een database. In `.env` staan lokaal nog `VITE_SUPABASE_URL` en `VITE_SUPABASE_ANON_KEY`; die worden nergens meer gelezen.
