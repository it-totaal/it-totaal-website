import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Clock, ShieldCheck, Phone, Mail } from 'lucide-react';
import { SEO } from '../components/SEO';
import seoRoutes from '../seo-routes.json';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

// Geverifieerde pakketten. Nieuwe erbij? Alleen deze lijst aanvullen.
const TMS = [
  { naam: 'EasyTrip', omschrijving: 'Planbord, ritregistratie, ADR en facturatie.' },
  { naam: 'ERN Software', omschrijving: 'ERN-SPED voor expeditie, ERN-LDS voor douaneloodsen, ERN-CTP voor containertrucking.' },
  { naam: 'Erniesoft e-Lips', omschrijving: 'Container, tank, bulk en exceptioneel transport, met koppelingen naar terminals.' },
  { naam: 'Modality', omschrijving: 'Containerlogistiek, van orderinvoer tot facturatie.' },
];

const WAAROM = [
  {
    icoon: Clock,
    titel: 'Uw dag begint eerder dan die van uw IT-leverancier',
    tekst: 'Om zes uur staat de planning al te draaien. Een storing die pas om negen uur wordt opgepakt heeft dan al drie uur schade aangericht. Daarom monitoren wij dag en nacht en bellen we u vaak vóórdat u ons belt.',
  },
  {
    icoon: Cloud,
    titel: 'Uw TMS is uw bedrijf',
    tekst: 'Staat het planbord stil, dan staan de chauffeurs stil. Wij draaien uw TMS in onze cloud, met back-ups en monitoring, zodat het niet uitmaakt of er op kantoor iets stukgaat.',
  },
  {
    icoon: ShieldCheck,
    titel: 'Uw opdrachtgever stelt eisen',
    tekst: 'Verladers die onder de Cyberbeveiligingswet vallen moeten hun keten beoordelen. Die vraag komt bij u terecht als vragenlijst of contractclausule. Wij zorgen dat u er antwoord op heeft.',
  },
];

const KLANTEN = [
  { naam: 'MJ de Groot Transport', url: 'https://www.mjdegroottransport.nl', logo: '/logos/mjdegroot.svg' },
  { naam: 'JNH Logistics', url: 'https://jnhlogistics.com/nl/', logo: '/logos/jnh.png' },
  { naam: 'Van der Windt Transport', url: 'https://www.vanderwindttransport.nl/', logo: '/logos/windt.png' },
  { naam: 'VVW Transport', url: 'https://vvwtransport.nl/', logo: '/logos/vvw-transport.png' },
  { naam: 'Korevaar Logistics', url: 'https://www.korevaarlogistics.nl/', logo: '/logos/korevaar-logo.png' },
  { naam: 'KOV Transport', url: 'https://www.kovtransport.nl/', logo: '/logos/kov.png' },
];

export default function Transport() {
  return (
    <div className="min-h-screen bg-white">
      <SEO {...seoRoutes['/transport']} />

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
              <linearGradient id="transportGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#transportGradient)"
              d="M44.7,-76.4C58.8,-69.3,71.6,-59.1,79.8,-45.8C88,-32.6,91.5,-16.3,91.3,-0.1C91.1,16.1,87.2,32.2,78.5,45.4C69.8,58.6,56.3,68.9,41.8,75.8C27.3,82.7,11.8,86.2,-4.3,92.8C-20.4,99.4,-40.8,109.1,-56.7,103.4C-72.6,97.7,-84,76.6,-89.7,56.8C-95.4,37,-95.4,18.5,-93.1,1.3C-90.8,-15.9,-86.2,-31.8,-77.7,-45.2C-69.2,-58.6,-56.8,-69.5,-42.8,-76.7C-28.8,-83.9,-14.4,-87.4,0.5,-88.3C15.4,-89.2,30.7,-87.5,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 text-sm">
              <Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">Transport</span>
            </div>

            <div className="max-w-3xl animate-slide-in-up">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Onze thuisbasis
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                IT voor transport <span className="text-blue-600">en logistiek.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Wij weten wat een TMS is, waarom uw planning om zes uur al draait en wat het betekent als een
                chauffeur bij de terminal staat zonder papieren. Dat scheelt uitleggen.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
          <svg className="absolute top-24 right-0 w-[400px] h-[400px] opacity-15 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#dbeafe" d="M47.3,-78.7C61.5,-71.8,73.3,-58.4,80.5,-43C87.7,-27.6,90.3,-10.2,88.5,6.4C86.7,23,80.5,38.8,71.2,51.8C61.9,64.8,49.5,75,35.4,80.8C21.3,86.6,5.5,88,-10.1,86.3C-25.7,84.6,-41.1,79.8,-54.3,72.1C-67.5,64.4,-78.5,53.8,-84.8,40.5C-91.1,27.2,-92.7,11.2,-90.1,-3.9C-87.5,-19,-80.7,-33.2,-71.3,-45.3C-61.9,-57.4,-49.9,-67.4,-36.2,-74.6C-22.5,-81.8,-7.1,-86.2,7.8,-84.9C22.7,-83.6,33.1,-85.6,47.3,-78.7Z" transform="translate(100 100)" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-12">
              <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">Wij kennen uw pakket</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">De TMS'en die wij draaien</h2>
              <p className="mt-4 text-slate-600 text-lg">
                Geen kennismakingsronde langs uw softwareleverancier. Deze pakketten beheren wij dagelijks,
                dus we weten waar ze op letten bij een migratie en waar ze het lastig krijgen.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {TMS.map(({ naam, omschrijving }) => (
                <div
                  key={naam}
                  className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{naam}</h3>
                  <p className="text-slate-600 leading-relaxed">{omschrijving}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-slate-600">
              Draait u iets anders? Bel gerust — de kans is groot dat we het kennen of snel doorgronden.
            </p>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-32 -mt-1" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#eff6ff" d="M0,48 C480,96 720,0 960,48 C1200,96 1320,48 1440,64 L1440,0 L0,0 Z" opacity="0.4"/>
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-14">
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3 mx-auto">Waarom transport anders is</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Uw bedrijf staat niet stil</h2>
              <div className="w-16 h-1 bg-brand-green rounded-full mx-auto mt-5"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {WAAROM.map(({ icoon: Icoon, titel, tekst }) => (
                <div
                  key={titel}
                  className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                    <Icoon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{titel}</h3>
                  <p className="text-slate-600 leading-relaxed">{tekst}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/nis2"
                className="group inline-flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Meer over NIS2 en wat het voor uw bedrijf betekent
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3 mx-auto">Zij gingen u voor</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Transporteurs die wij beheren</h2>
              <div className="w-16 h-1 bg-brand-green rounded-full mx-auto mt-5"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {KLANTEN.map(({ naam, url, logo }) => (
                <a
                  key={naam}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-6 h-24 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <img src={logo} alt={naam} className="max-h-10 w-auto object-contain" loading="lazy" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl px-8 py-12 lg:px-14 lg:py-16 text-center" style={{ backgroundColor: '#0c1959' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Uw TMS naar de cloud?</h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                In minder dan een week draait uw pakket veilig en stabiel in onze cloud. We beginnen met een gesprek
                over wat u nu draait en wat er beter moet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:0793238540"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-slate-900 bg-brand-green hover:bg-[#3dd493] transition-all shadow-lg hover-lift hover-glow"
                >
                  <Phone size={18} />
                  079 323 8540
                </a>
                <a
                  href="mailto:info@it-totaal.nl?subject=TMS%20naar%20de%20cloud"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-white bg-white/5 hover:bg-white/10 border border-slate-500 hover:border-brand-green transition-all hover-lift"
                >
                  <Mail size={18} />
                  info@it-totaal.nl
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="sub" />
    </div>
  );
}
