import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export default function AlgemeneVoorwaarden() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Algemene Voorwaarden - IT Totaal"
        description="De algemene voorwaarden van IT Totaal Diensten BV voor zakelijke IT-dienstverlening. Download het volledige PDF document."
        canonical="https://www.it-totaal.nl/algemene-voorwaarden"
      />
      <header className="bg-[#0c1959] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
            <span className="text-slate-500">/</span>
            <span>Algemene Voorwaarden</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Algemene Voorwaarden</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            De algemene voorwaarden van IT Totaal Diensten BV voor zakelijke dienstverlening.
          </p>
        </div>
      </header>

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="text-blue-600" size={20} />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Download Document</h2>
            </div>

            <p className="text-slate-600 mb-8 max-w-3xl">
              De volledige algemene voorwaarden van IT Totaal Diensten BV zijn beschikbaar als PDF-document.
            </p>

            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-lg transition-shadow max-w-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-2">Algemene Voorwaarden IT Totaal Diensten BV</h3>
                  <p className="text-sm text-slate-600 mb-4">PDF Document</p>
                  <a
                    href="/Algemene-Voorwaarden-2019.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Download PDF
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact</h2>
              <p className="text-slate-600 mb-6">
                Voor vragen over onze algemene voorwaarden kunt u contact met ons opnemen:
              </p>
              <div className="text-slate-700">
                <p className="font-semibold text-slate-900 mb-2">IT Totaal Diensten BV</p>
                <p>Rokkeveenseweg 32</p>
                <p>2712 XZ Zoetermeer</p>
                <p className="mt-4">Telefoon: <a href="tel:0793238540" className="text-blue-600 hover:text-blue-700">079-3238540</a></p>
                <p>E-mail: <a href="mailto:info@it-totaal.nl" className="text-blue-600 hover:text-blue-700">info@it-totaal.nl</a></p>
              </div>
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
