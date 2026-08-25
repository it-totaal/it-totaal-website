import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, UserPlus, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import seoRoutes from '../seo-routes.json';
import { StructuredData } from '../components/StructuredData';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

interface Teamlid {
  naam: string;
  functie: string;
  omschrijving: string;
  /** Rolgebaseerd adres: blijft kloppen als iemand de rol overneemt. */
  email: string;
  /** Volledige profiel-URL. Leeg laten = geen LinkedIn-knop op die kaart. */
  linkedin?: string;
  bestand: string;
  alt: string;
}

const TEAM: Teamlid[] = [
  {
    naam: 'Patrick Luisman',
    functie: 'Eigenaar & Directeur',
    omschrijving:
      'Eindverantwoordelijk voor IT Totaal en aanspreekpunt voor onze klanten. Denkt mee over de koers van uw IT-omgeving.',
    email: 'directie@it-totaal.nl',
    linkedin: 'https://www.linkedin.com/in/pluisman/',
    bestand: 'team-patrick',
    alt: 'Patrick Luisman, eigenaar en directeur van IT Totaal',
  },
  {
    naam: 'Kimberly de la Parra',
    functie: 'Executive Assistant',
    omschrijving:
      'Verzorgt de administratie en zorgt dat alles achter de schermen soepel loopt. Vaak de eerste stem die u hoort.',
    email: 'administratie@it-totaal.nl',
    linkedin: 'https://www.linkedin.com/in/kimberly-de-la-parra-33b461102/',
    bestand: 'team-kimberly',
    alt: 'Kimberly de la Parra, Executive Assistant bij IT Totaal',
  },
  {
    naam: 'Leon Hoogduin',
    functie: 'Systeembeheerder',
    omschrijving:
      'Beheert de systemen, servers en netwerken van onze klanten. Lost storingen op voordat u ze merkt.',
    email: 'helpdesk@it-totaal.nl',
    linkedin: '',
    bestand: 'team-leon',
    alt: 'Leon Hoogduin, systeembeheerder bij IT Totaal',
  },
];

// Afgeleid uit TEAM, zodat naam, functie, adres en LinkedIn maar op één plek
// staan. Hiermee herkent een zoekmachine ze als personen bij het bedrijf.
const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://it-totaal.nl/#organisatie',
  name: 'IT Totaal Diensten BV',
  url: 'https://it-totaal.nl',
  employee: TEAM.map((lid) => ({
    '@type': 'Person',
    name: lid.naam,
    jobTitle: lid.functie,
    email: lid.email,
    image: `https://it-totaal.nl/${lid.bestand}-960.webp`,
    ...(lid.linkedin ? { sameAs: [lid.linkedin] } : {}),
    worksFor: { '@id': 'https://it-totaal.nl/#organisatie' },
  })),
};

interface Vacature {
  functie: string;
  omschrijving: string;
}

// Leeg laten (of de sectie weghalen) zodra er niets meer openstaat.
const VACATURES: Vacature[] = [
  {
    functie: 'Senior systeembeheerder',
    omschrijving:
      'Je draait zelfstandig complexe trajecten bij onze klanten: migraties, inrichting van servers en netwerken, en het bewaken van de omgevingen die we beheren. Je bent het aanspreekpunt als het echt ingewikkeld wordt.',
  },
  {
    functie: 'Systeembeheerder',
    omschrijving:
      'Je houdt de omgevingen van onze klanten draaiend: werkplekken, Microsoft 365, back-ups en de dagelijkse meldingen. Je leert het vak bij een klein team waar je alles voorbij ziet komen.',
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-white">
      <SEO {...seoRoutes['/team']} />

      <StructuredData data={teamSchema} />

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
              <linearGradient id="teamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#teamGradient)"
              d="M44.7,-76.4C58.8,-69.3,71.6,-59.1,79.8,-45.8C88,-32.6,91.5,-16.3,91.3,-0.1C91.1,16.1,87.2,32.2,78.5,45.4C69.8,58.6,56.3,68.9,41.8,75.8C27.3,82.7,11.8,86.2,-4.3,92.8C-20.4,99.4,-40.8,109.1,-56.7,103.4C-72.6,97.7,-84,76.6,-89.7,56.8C-95.4,37,-95.4,18.5,-93.1,1.3C-90.8,-15.9,-86.2,-31.8,-77.7,-45.2C-69.2,-58.6,-56.8,-69.5,-42.8,-76.7C-28.8,-83.9,-14.4,-87.4,0.5,-88.3C15.4,-89.2,30.7,-87.5,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8 text-sm">
              <Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">Team</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="animate-slide-in-up">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                  Sinds 2001
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  De mensen achter <span className="text-blue-600">IT Totaal.</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Geen callcenter en geen wisselende gezichten. U krijgt een vast team dat uw omgeving kent,
                  uw naam weet en de telefoon zelf opneemt. Dat is precies waarom IT bij ons gewoon werkt.
                </p>
              </div>

              <div className="relative animate-scale-in">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-100 to-white rounded-full opacity-40 blur-2xl -z-10 animate-pulse"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/team-samen-1200.webp"
                    srcSet="/team-samen-1200.webp 1200w, /team-samen-1920.webp 1920w"
                    sizes="(min-width: 1024px) 576px, 92vw"
                    alt="Het team van IT Totaal op kantoor in Zoetermeer"
                    className="w-full h-auto"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24 bg-white relative overflow-hidden">
          <svg className="absolute top-24 left-0 w-[350px] h-[350px] opacity-15 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#dbeafe" d="M47.3,-78.7C61.5,-71.8,73.3,-58.4,80.5,-43C87.7,-27.6,90.3,-10.2,88.5,6.4C86.7,23,80.5,38.8,71.2,51.8C61.9,64.8,49.5,75,35.4,80.8C21.3,86.6,5.5,88,-10.1,86.3C-25.7,84.6,-41.1,79.8,-54.3,72.1C-67.5,64.4,-78.5,53.8,-84.8,40.5C-91.1,27.2,-92.7,11.2,-90.1,-3.9C-87.5,-19,-80.7,-33.2,-71.3,-45.3C-61.9,-57.4,-49.9,-67.4,-36.2,-74.6C-22.5,-81.8,-7.1,-86.2,7.8,-84.9C22.7,-83.6,33.1,-85.6,47.3,-78.7Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-10 right-0 w-[400px] h-[400px] opacity-15 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill="#a7f3d0" d="M41.7,-72.3C54.8,-66.5,66.7,-56.4,74.8,-43.6C82.9,-30.8,87.2,-15.4,87.1,-0.1C87,15.2,82.5,30.4,74.6,43.2C66.7,56,55.4,66.4,42.5,73.3C29.6,80.2,15.1,83.6,-0.3,84.2C-15.7,84.8,-31.4,82.6,-44.8,76.1C-58.2,69.6,-69.3,58.8,-76.8,45.6C-84.3,32.4,-88.2,16.8,-87.8,1.4C-87.4,-14,-82.7,-29.2,-74.5,-42.3C-66.3,-55.4,-54.6,-66.4,-41.2,-72C-27.8,-77.6,-13.9,-77.8,0.5,-78.7C14.9,-79.6,28.6,-78.1,41.7,-72.3Z" transform="translate(100 100)" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-14">
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3 mx-auto">Wie u spreekt</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Ons team</h2>
              <div className="w-16 h-1 bg-brand-green rounded-full mx-auto mt-5"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {TEAM.map((lid) => (
                <article
                  key={lid.bestand}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover-glow cursor-default"
                >
                  <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: '3 / 4' }}>
                    <img
                      src={`/${lid.bestand}-480.webp`}
                      srcSet={`/${lid.bestand}-480.webp 480w, /${lid.bestand}-960.webp 960w`}
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 45vw, 92vw"
                      alt={lid.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">{lid.naam}</h3>
                    <p className="text-blue-600 font-medium mt-1 mb-3">{lid.functie}</p>
                    <p className="text-slate-600 leading-relaxed">{lid.omschrijving}</p>
                    <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                      <a
                        href={`mailto:${lid.email}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors break-all"
                      >
                        <Mail size={16} className="text-blue-600 flex-shrink-0" />
                        {lid.email}
                      </a>
                      {lid.linkedin && (
                        <a
                          href={lid.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`LinkedIn-profiel van ${lid.naam}`}
                          className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-all hover:bg-blue-600 hover:text-white hover:scale-110"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {VACATURES.length > 0 && (
          <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
            <svg className="absolute top-0 left-0 w-full h-32 -mt-1" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill="#eff6ff" d="M0,48 C480,96 720,0 960,48 C1200,96 1320,48 1440,64 L1440,0 L0,0 Z" opacity="0.4"/>
            </svg>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-14">
                <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3 mx-auto">Werken bij IT Totaal</p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">We zoeken versterking</h2>
                <div className="w-16 h-1 bg-brand-green rounded-full mx-auto mt-5"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                {VACATURES.map((vacature) => (
                  <article
                    key={vacature.functie}
                    className="group flex flex-col bg-blue-50/40 rounded-2xl border-2 border-dashed border-blue-200 p-8 transition-all duration-300 hover:border-blue-400 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                      <UserPlus size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{vacature.functie}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6 flex-grow">{vacature.omschrijving}</p>
                    <a
                      href={`mailto:directie@it-totaal.nl?subject=${encodeURIComponent('Sollicitatie ' + vacature.functie)}`}
                      className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-full font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover-lift"
                    >
                      Solliciteer
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl px-8 py-12 lg:px-14 lg:py-16 text-center" style={{ backgroundColor: '#0c1959' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Even kennismaken?</h2>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
                Bel gerust, of stuur een bericht. U krijgt geen keuzemenu maar direct iemand van dit team aan de lijn.
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
                  href="mailto:info@it-totaal.nl"
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
