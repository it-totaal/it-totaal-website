import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowRight, Linkedin } from 'lucide-react';
import { SEO } from '../components/SEO';
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
    linkedin: '',
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
  '@id': 'https://www.it-totaal.nl/#organisatie',
  name: 'IT Totaal Diensten BV',
  url: 'https://www.it-totaal.nl',
  employee: TEAM.map((lid) => ({
    '@type': 'Person',
    name: lid.naam,
    jobTitle: lid.functie,
    email: lid.email,
    image: `https://www.it-totaal.nl/${lid.bestand}-960.webp`,
    ...(lid.linkedin ? { sameAs: [lid.linkedin] } : {}),
    worksFor: { '@id': 'https://www.it-totaal.nl/#organisatie' },
  })),
};

export default function Team() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Ons team - IT Totaal"
        description="Maak kennis met het team van IT Totaal. Korte lijnen, vaste gezichten en sinds 2001 uw partner voor complete IT-dienstverlening in Zoetermeer en omgeving."
        canonical="https://www.it-totaal.nl/team"
      />

      <StructuredData data={teamSchema} />

      <SiteHeader variant="sub" />

      <main role="main" className="pt-16">
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
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
            <div className="flex items-center gap-3 mb-6 text-sm">
              <Link to="/" className="text-slate-500 hover:text-blue-600 transition-colors">Home</Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">Team</span>
            </div>

            <div className="max-w-3xl">
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
          </div>
        </section>

        <section className="pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/team-samen-1200.webp"
                srcSet="/team-samen-1200.webp 1200w, /team-samen-1920.webp 1920w"
                sizes="(min-width: 1280px) 1216px, 100vw"
                alt="Het team van IT Totaal op kantoor in Zoetermeer"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="pb-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-blue-600 font-semibold uppercase tracking-wider text-sm mb-3">Wie u spreekt</p>
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

        <section className="pb-20 lg:pb-28">
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
                <a
                  href="/#contact"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-white bg-white/5 hover:bg-white/10 border border-slate-500 hover:border-brand-green transition-all hover-lift"
                >
                  Contactformulier
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
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
