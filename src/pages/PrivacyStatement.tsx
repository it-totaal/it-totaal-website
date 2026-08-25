import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import seoRoutes from '../seo-routes.json';

export default function PrivacyStatement() {
  return (
    <div className="min-h-screen bg-white">
      <SEO {...seoRoutes['/privacy-verklaring']} />
      <header className="bg-[#0c1959] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
            <span className="text-slate-500">/</span>
            <span>Privacy Verklaring</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Verklaring</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Hoe IT Totaal Diensten BV omgaat met uw persoonsgegevens en privacy.
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <section className="bg-white border border-slate-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Shield className="text-blue-600" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Bedrijfsgegevens</h2>
              </div>
              <div className="text-slate-700">
                <p className="font-semibold text-slate-900 mb-2">IT Totaal Diensten BV</p>
                <p>Rokkeveenseweg 32</p>
                <p>2712 XZ Zoetermeer</p>
                <p className="mt-4">Telefoon: <a href="tel:0793238540" className="text-blue-600 hover:text-blue-700">079-3238540</a></p>
                <p>E-mail: <a href="mailto:info@it-totaal.nl" className="text-blue-600 hover:text-blue-700">info@it-totaal.nl</a></p>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Gegevensverzameling en -gebruik</h2>
              <p className="text-slate-600 mb-4">
                IT Totaal Diensten BV verzamelt persoonsgegevens alleen wanneer deze direct door u worden verstrekt via formulieren of bij het aanmaken van een account. Wij verwerken:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Contactgegevens (naam, adres, telefoonnummer)</li>
                <li>Bedrijfsgegevens</li>
                <li>E-mailadressen</li>
                <li>IP-adressen en browserinformatie</li>
                <li>Cookie-identificaties en surfgedrag</li>
              </ul>
              <p className="text-slate-700 mt-4">
                <strong>Doel:</strong> Relatiebeheer, waaronder het opnemen van contact met u indien u hierom verzoekt, verbetering van de website en ontwikkeling van diensten.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Bewaartermijn</h2>
              <p className="text-slate-600">
                Informatie wordt alleen bewaard zolang dit noodzakelijk is voor de genoemde doeleinden.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Gegevensbeveiliging</h2>
              <p className="text-slate-600">
                Het bedrijf hanteert zorgvuldige veiligheidsprocedures, waaronder TLS-encryptie en beperkte toegang tot persoonsgegevens.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Delen met derden</h2>
              <p className="text-slate-600">
                Gegevens worden niet gedeeld met derden voor direct marketing, tenzij u hiervoor toestemming geeft of de wet dit vereist.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies</h2>
              <p className="text-slate-600 mb-4">
                Onze website maakt gebruik van verschillende soorten cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li><strong>Essentiële/Technische cookies:</strong> Bewaren gebruikersvoorkeuren en instellingen</li>
                <li><strong>Analytische cookies:</strong> Volgen websitegebruiksstatistieken via Google Analytics</li>
                <li><strong>Functionele cookies:</strong> Maken live chat-functies mogelijk</li>
              </ul>
              <p className="text-slate-600 mt-4">
                U kunt cookies uitschakelen via uw browserinstellingen.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Uw rechten</h2>
              <p className="text-slate-600 mb-4">
                U heeft het recht om:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Informatie op te vragen over uw gegevens</li>
                <li>Toegang te krijgen tot uw gegevens</li>
                <li>Correcties aan te vragen bij onjuistheden</li>
                <li>Verwijdering van uw gegevens te verzoeken</li>
                <li>Toestemming in te trekken</li>
                <li>Bezwaar te maken tegen gebruik</li>
                <li>Uw gegevens over te dragen (dataportabiliteit)</li>
              </ul>
              <p className="text-slate-600 mt-4">
                Voor vragen kunt u contact met ons opnemen via de bovenstaande contactgegevens.
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Externe diensten</h2>
              <p className="text-slate-600">
                Onze website maakt gebruik van Google Webfonts, Google Maps, Google reCAPTCHA en video-embeds, die mogelijk IP-adressen verzamelen.
              </p>
            </section>
          </div>
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
