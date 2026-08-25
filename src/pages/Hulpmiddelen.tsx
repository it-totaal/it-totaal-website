import { Download, Palette, FileText, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import seoRoutes from '../seo-routes.json';

export default function Hulpmiddelen() {
  const brandColors = [
    { name: 'IT Totaal Groen', hex: '#46f0a4', rgb: '70, 240, 164', usage: 'Primaire merkkleur, CTAs, accenten' },
    { name: 'IT Totaal Blauw', hex: '#0c1959', rgb: '12, 25, 89', usage: 'Achtergronden, headers, professionele elementen' },
    { name: 'Blauw Accent', hex: '#2563eb', rgb: '37, 99, 235', usage: 'Primaire knoppen, links, CTA elementen, iconen' },
    { name: 'Wit', hex: '#FFFFFF', rgb: '255, 255, 255', usage: 'Achtergronden, tekst op donkere achtergronden' },
    { name: 'Slate 900', hex: '#0f172a', rgb: '15, 23, 42', usage: 'Primaire tekstkleur' },
    { name: 'Slate 600', hex: '#475569', rgb: '71, 85, 105', usage: 'Secundaire tekst, beschrijvingen' },
  ];

  const logos = [
    { name: 'Logo IT Totaal Wit (SVG)', file: '/logos/logo-ittotaal-white.svg', type: 'SVG Vector', bgColor: '#0c1959' },
    { name: 'Logo IT Totaal Groen Path (SVG)', file: '/logos/logo-ittotaal-green-path.svg', type: 'SVG Vector', bgColor: '#f8fafc' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO {...seoRoutes['/hulpmiddelen']} />
      <header className="bg-[#0c1959] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
            <span className="text-slate-500">/</span>
            <span>Hulpmiddelen</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Perskit & Hulpmiddelen</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Alles wat u nodig heeft om het IT Totaal merk correct te gebruiken. Van logo's en kleuren tot richtlijnen en essentiële bedrijfsinformatie.
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <ImageIcon className="text-blue-600" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Logo's</h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Download onze officiële logo's in verschillende formaten. Gebruik altijd het volledige logo en respecteer de witruimte eromheen.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logos.map((logo, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div
                    className="rounded-lg p-8 mb-4 flex items-center justify-center min-h-[120px]"
                    style={{ backgroundColor: logo.bgColor }}
                  >
                    <img src={logo.file} alt={logo.name} className="max-h-16 w-auto" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{logo.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{logo.type}</p>
                  <a
                    href={logo.file}
                    download
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Download size={16} />
                    Download
                  </a>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Palette className="text-blue-600" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Kleurgebruik</h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Onze merkidentiteit wordt gedefinieerd door een zorgvuldig geselecteerd kleurenpalet. Gebruik deze kleuren consistent in alle communicatiemiddelen.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandColors.map((color, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{ backgroundColor: color.hex }}
                  >
                    {(color.hex === '#FFFFFF' || color.hex.includes('slate')) && (
                      <span className="text-4xl font-bold text-slate-400">{color.hex}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-3">{color.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-slate-500">HEX:</span>
                        <code className="ml-2 bg-slate-100 px-2 py-1 rounded text-slate-900">{color.hex}</code>
                      </div>
                      <div>
                        <span className="text-slate-500">RGB:</span>
                        <code className="ml-2 bg-slate-100 px-2 py-1 rounded text-slate-900">{color.rgb}</code>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-slate-500 text-xs">Gebruik:</span>
                        <p className="text-slate-700 text-xs mt-1">{color.usage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="text-blue-600" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Merkrichtlijnen</h2>
            </div>
            <p className="text-slate-600 mb-8 max-w-3xl">
              Volg deze richtlijnen om een consistente merkidentiteit te waarborgen in al uw communicatie.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-slate-50 border border-slate-200 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="text-brand-green" size={20} />
                    Wel doen
                  </h3>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-green mt-1">•</span>
                      <span>Gebruik het volledige logo zonder wijzigingen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-green mt-1">•</span>
                      <span>Respecteer minimale witruimte rondom het logo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-green mt-1">•</span>
                      <span>Gebruik het groene logo op lichte achtergronden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-green mt-1">•</span>
                      <span>Gebruik het witte logo op donkere achtergronden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-green mt-1">•</span>
                      <span>Houd voldoende contrast tussen logo en achtergrond</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-red-500">✕</span>
                    Niet doen
                  </h3>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Wijzig de kleuren van het logo niet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Verander de verhoudingen niet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Voeg geen effecten toe zoals schaduwen of stralen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Plaats het logo niet op drukke achtergronden</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>Roteer of kantel het logo niet</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="text-blue-600" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Essentiële Informatie</h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 text-lg">Bedrijfsgegevens</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-slate-500 mb-1">Officiële naam</dt>
                      <dd className="text-slate-900">IT Totaal Diensten BV</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 mb-1">KvK nummer</dt>
                      <dd className="text-slate-900">73533807</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 mb-1">BTW nummer</dt>
                      <dd className="text-slate-900">NL859563625B01</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 mb-1">Opgericht</dt>
                      <dd className="text-slate-900">2001</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-4 text-lg">Contactgegevens</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-slate-500 mb-1">Adres</dt>
                      <dd className="text-slate-900">
                        Rokkeveenseweg 32<br />
                        2712XZ Zoetermeer
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 mb-1">Telefoon</dt>
                      <dd className="text-slate-900">079 323 8540</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 mb-1">E-mail</dt>
                      <dd className="text-slate-900">info@it-totaal.nl</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 mb-1">Website</dt>
                      <dd className="text-slate-900">it-totaal.nl</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-3">Vragen over het gebruik van onze merkmiddelen?</h3>
              <p className="text-blue-100 mb-6">
                Neem contact op met ons team voor vragen over merkgebruik, licenties of aanvullende materialen.
              </p>
              <a
                href="mailto:info@it-totaal.nl"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-green text-slate-900 font-semibold rounded-lg hover:bg-[#3dd493] transition-colors"
              >
                Contact opnemen
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Terug naar home
          </Link>
        </div>
      </footer>
    </div>
  );
}
