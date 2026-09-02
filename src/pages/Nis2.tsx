import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardCheck, ShieldCheck, Bell, FileSearch, Phone, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';
import seoRoutes from '../seo-routes.json';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const PLICHTEN = [
  {
    icoon: ClipboardCheck,
    titel: 'Registratieplicht',
    tekst: 'Organisaties die onder de wet vallen moeten zich inschrijven in het entiteitenregister. Dat gebeurt niet vanzelf; u meldt zichzelf aan.',
  },
  {
    icoon: ShieldCheck,
    titel: 'Zorgplicht',
    tekst: 'Een risicoanalyse maken en op basis daarvan passende maatregelen nemen om uw netwerk- en informatiesystemen te beveiligen.',
  },
  {
    icoon: Bell,
    titel: 'Meldplicht',
    tekst: 'Een incident melden bij het CSIRT en de toezichthouder, en dat binnen 24 uur na constatering.',
  },
];

const SCAN = [
  'Welke diensten u vandaag bij ons afneemt, en wat die al voor u afdekken.',
  'Wat er nog ontbreekt om de zorgplicht aantoonbaar in te vullen.',
  'Wat u zelf al geregeld heeft — beleid, back-ups, afspraken met personeel.',
  'Wat het platform van Samen Digitaal Veilig voor u kan betekenen.',
];

export default function Nis2() {
  return (
    <div className="min-h-screen bg-white">
      <SEO {...seoRoutes['/nis2']} />

      <SiteHeader variant="sub" />

      <main role="main" className="pt-16">
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
          <svg
            className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] opacity-30 z-0 pointer-events-none"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="nis2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#nis2Gradient)"
              d="M44.7,-76.4C58.8,-69.3,71.6,-59.1,79.8,-45.8C88,-32.6,91.5,-16.3,91.3,-0.1C91.1,16.1,87.2,32.2,78.5,45.4C69.8,58.6,56.3,68.9,41.8,75.8C27.3,82.7,11.8,86.2,-4.3,92.8C-20.4,99.4,-40.8,109.1,-56.7,103.4C-72.6,97.7,-84,76.6,-89.7,56.8C-95.4,37,-95.4,18.5,-93.1,1.3C-90.8,-15.9,-86.2,-31.8,-77.7,-45.2C-69.2,-58.6,-56.8,-69.5,-42.8,-76.7C-28.8,-83.9,-14.4,-87.4,0.5,-88.3C15.4,-89.2,30.7,-87.5,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 text-sm">
              <Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">NIS2</span>
            </div>

            <div className="max-w-3xl animate-slide-in-up">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Van kracht sinds 15 augustus 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                NIS2. Eerst weten of het <span className="text-blue-600">over u gaat.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Sinds 15 augustus 2026 geldt de Cyberbeveiligingswet, de Nederlandse invulling van de Europese
                NIS2-richtlijn. Veel ondernemers krijgen te horen dat die ook voor hen geldt. Vaak klopt dat niet.
                Wat er wél op u afkomt, is een vraag van uw opdrachtgever.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-12">
              <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">De eerste vraag</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Valt u er rechtstreeks onder?</h2>
              <p className="mt-4 text-slate-600 text-lg">
                De wet wijst sectoren aan, maar binnen die sectoren alleen bepaalde soorten organisaties. Daar gaat het
                in de praktijk mis: transport staat op de lijst, maar niet elk transportbedrijf staat erop.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Meestal niet</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Binnen transport zijn onder meer luchtvaartmaatschappijen, luchthavens, spoorwegondernemingen,
                  zee- en binnenvaart, havenbeheerders en wegbeheerders aangewezen.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Klassiek beroepsgoederenvervoer over de weg, opslagbedrijven en expediteurs horen daar volgens
                  Transport en Logistiek Nederland niet bij — ook niet boven de drempel van 50 medewerkers of
                  10 miljoen euro omzet.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Maar soms wel</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Er zijn ingangen die makkelijk over het hoofd gezien worden. U kunt alsnog onder de wet vallen als u:
                </p>
                <ul className="space-y-2 text-slate-600">
                  <li>• afvalstoffen vervoert of verwerkt</li>
                  <li>• post- of koeriersdiensten levert</li>
                  <li>• levensmiddelen of chemische stoffen distribueert</li>
                  <li>• onderdeel bent van een groep waarin een aangewezen onderneming zit</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-32 -mt-1" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#eff6ff" d="M0,48 C480,96 720,0 960,48 C1200,96 1320,48 1440,64 L1440,0 L0,0 Z" opacity="0.4"/>
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-12">
              <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">Wat er wél op u afkomt</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Uw opdrachtgever valt er wel onder</h2>
              <p className="mt-4 text-slate-600 text-lg">
                Verladers, producenten en retailers die onder de wet vallen moeten de risico's in hun keten beoordelen.
                Die verplichting geven zij door aan hun leveranciers — niet via de wet, maar via het contract.
              </p>
            </div>

            <blockquote className="bg-white rounded-2xl border-l-4 border-brand-green shadow-sm p-8 max-w-3xl">
              <p className="text-xl text-slate-800 leading-relaxed italic">
                "Jouw klant zal dus willen weten of jouw veiligheid op orde is. Dat zal je dan moeten kunnen aantonen."
              </p>
              <footer className="mt-4 text-sm text-slate-500">Transport en Logistiek Nederland</footer>
            </blockquote>

            <p className="mt-8 text-slate-600 text-lg max-w-3xl">
              In de praktijk komt dat binnen als een vragenlijst, een clausule in een nieuw contract of een audit.
              De vraag is niet óf u iets moet kunnen laten zien, maar of u het klaar heeft liggen als ernaar gevraagd wordt.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
          <svg className="absolute top-40 left-0 w-[350px] h-[350px] opacity-15 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#dbeafe" d="M47.3,-78.7C61.5,-71.8,73.3,-58.4,80.5,-43C87.7,-27.6,90.3,-10.2,88.5,6.4C86.7,23,80.5,38.8,71.2,51.8C61.9,64.8,49.5,75,35.4,80.8C21.3,86.6,5.5,88,-10.1,86.3C-25.7,84.6,-41.1,79.8,-54.3,72.1C-67.5,64.4,-78.5,53.8,-84.8,40.5C-91.1,27.2,-92.7,11.2,-90.1,-3.9C-87.5,-19,-80.7,-33.2,-71.3,-45.3C-61.9,-57.4,-49.9,-67.4,-36.2,-74.6C-22.5,-81.8,-7.1,-86.2,7.8,-84.9C22.7,-83.6,33.1,-85.6,47.3,-78.7Z" transform="translate(100 100)" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-14">
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3 mx-auto">Voor wie er wel onder valt</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Drie verplichtingen</h2>
              <div className="w-16 h-1 bg-brand-green rounded-full mx-auto mt-5"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {PLICHTEN.map(({ icoon: Icoon, titel, tekst }) => (
                <div
                  key={titel}
                  className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                    <Icoon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{titel}</h3>
                  <p className="text-slate-600 leading-relaxed">{tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">Gratis en vrijblijvend</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">
                  De NIS2-quickscan
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  We lopen samen door uw situatie heen en zetten op een rij waar u staat. Geen rapport van honderd
                  pagina's, maar een overzicht waar u iets mee kunt.
                </p>
                <a
                  href="mailto:directie@it-totaal.nl?subject=NIS2-quickscan"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover-glow"
                >
                  Vraag de quickscan aan
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <FileSearch size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Wat we in kaart brengen</h3>
                </div>
                <ul className="space-y-4">
                  {SCAN.map((punt) => (
                    <li key={punt} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0"></span>
                      {punt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl px-8 py-12 lg:px-14 lg:py-16" style={{ backgroundColor: '#0c1959' }}>
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Van scan naar certificering</h2>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    De quickscan laat zien waar u staat. Wilt u het aantoonbaar maken richting uw opdrachtgevers, dan
                    loopt die route via het platform van Samen Digitaal Veilig — het landelijke initiatief dat MKB-ondernemers
                    helpt zich te wapenen tegen cybercriminaliteit, en waar wij als partner bij aangesloten zijn.
                    Dat platform brengt u stap voor stap naar de audit en certificering.
                  </p>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <a
                    href="https://www.samendigitaalveilig.nl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-brand-green rounded-2xl p-6 transition-all"
                  >
                    <img
                      src="/logos/samen-digitaal-veilig.svg"
                      alt="Samen Digitaal Veilig"
                      className="h-12 w-auto flex-shrink-0"
                      loading="lazy"
                    />
                    <span className="text-sm text-blue-100 group-hover:text-white transition-colors">
                      Aangesloten als partner
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Liever even bellen?</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Twijfelt u of dit voor u speelt, of krijgt u nu al vragen van een opdrachtgever? Bel gerust. U krijgt
                  geen keuzemenu maar direct iemand die uw omgeving kent.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:0793238540"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-slate-900 bg-brand-green hover:bg-[#3dd493] transition-all shadow-lg hover-lift hover-glow"
                  >
                    <Phone size={18} />
                    079 323 8540
                  </a>
                  <a
                    href="mailto:directie@it-totaal.nl?subject=NIS2"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover-lift"
                  >
                    <Mail size={18} />
                    directie@it-totaal.nl
                  </a>
                </div>
              </div>

              <aside className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Goed om te weten</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Deze pagina is bedoeld om u op weg te helpen en is geen juridisch advies. Of uw organisatie onder de
                  Cyberbeveiligingswet valt, bepaalt u zelf aan de hand van de wet en zo nodig in overleg met de
                  toezichthouder. Voor transport is dat de ILT, voor de meeste andere sectoren de RDI.
                </p>
                <a
                  href="https://www.ncsc.nl/cyberbeveiligingswet-nis2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Officiële informatie bij het NCSC
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="sub" />
    </div>
  );
}
