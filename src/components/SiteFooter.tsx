import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

interface SiteFooterProps {
  /**
   * 'home' als de links naar secties op dezelfde pagina wijzen,
   * 'sub' op een losse pagina — dan gaan ze eerst terug naar de voorpagina.
   */
  variant?: 'home' | 'sub';
}

export default function SiteFooter({ variant = 'home' }: SiteFooterProps) {
  const anker = (hash: string) => (variant === 'home' ? `#${hash}` : `/#${hash}`);

  const diensten = [
    'Werkplekbeheer',
    'Cloud oplossingen',
    'Microsoft 365',
    'Cybersecurity',
    'IT Support',
    'VoIP Telefonie',
  ];

  return (
    <footer className="border-t-2 border-slate-700 py-12" style={{ backgroundColor: '#0c1959' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <img
              src="/logos/logo-ittotaal-white.svg"
              alt="IT Totaal"
              style={{ aspectRatio: '1919/317' }}
              className="h-8 mb-5"
            />
            <p className="text-slate-300 leading-relaxed mb-4">
              Sinds 2001 uw betrouwbare partner voor complete IT-dienstverlening in de regio Rotterdam en omgeving.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin size={16} className="text-brand-green flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div>Rokkeveenseweg 32</div>
                  <div>2712XZ Zoetermeer</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone size={16} className="text-brand-green flex-shrink-0" />
                <a href="tel:0793238540" className="text-sm hover:text-brand-green transition-colors">079 323 8540</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail size={16} className="text-brand-green flex-shrink-0" />
                <a href="mailto:info@it-totaal.nl" className="text-sm hover:text-brand-green transition-colors">info@it-totaal.nl</a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-5 text-lg">Diensten</h4>
            <ul className="space-y-3">
              {diensten.map((dienst) => (
                <li key={dienst}>
                  <a href={anker('diensten')} className="text-slate-300 hover:text-blue-400 transition-colors">
                    {dienst}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-5 text-lg">Bedrijf</h4>
            <ul className="space-y-3">
              <li><a href={anker('waarom')} className="text-slate-300 hover:text-blue-400 transition-colors">Waarom IT Totaal</a></li>
              <li><a href={anker('security')} className="text-slate-300 hover:text-blue-400 transition-colors">Security</a></li>
              <li><Link to="/nis2" className="text-slate-300 hover:text-blue-400 transition-colors">NIS2 &amp; Cyberbeveiligingswet</Link></li>
              <li><Link to="/team" className="text-slate-300 hover:text-blue-400 transition-colors">Team</Link></li>
              <li><a href={anker('contact')} className="text-slate-300 hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="https://it-totaal.rmmservice.eu/connect/#/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-400 transition-colors">Support Portal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-5 text-lg">Juridisch</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-verklaring" className="text-slate-300 hover:text-blue-400 transition-colors">Privacy verklaring</Link></li>
              <li><Link to="/algemene-voorwaarden" className="text-slate-300 hover:text-blue-400 transition-colors">Algemene voorwaarden</Link></li>
              <li><Link to="/verwerkersovereenkomst" className="text-slate-300 hover:text-blue-400 transition-colors">Verwerkersovereenkomst</Link></li>
              <li><Link to="/hulpmiddelen" className="text-slate-300 hover:text-blue-400 transition-colors">Hulpmiddelen</Link></li>
            </ul>
            <div className="mt-6 pt-6 border-t border-slate-600">
              <p className="text-xs text-slate-400 leading-relaxed">
                KvK: 73533807<br />
                BTW: NL859563625B01
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 -mb-12" style={{ backgroundColor: '#070f3d' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <a
              href="https://linkedin.com/company/it-totaal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Volg ons op LinkedIn
            </a>

            <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} IT Totaal Diensten BV. Alle rechten voorbehouden.</p>

            <a href="https://www.ictwaarborg.nl" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-all border border-slate-600 hover:border-blue-400">
                <img
                  src="/ict-waarborg-logo.png"
                  alt="ICT Waarborg lid"
                  className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="text-left border-l border-slate-600 pl-3">
                  <p className="text-xs text-slate-400 uppercase font-semibold">Aangesloten bij</p>
                  <p className="text-sm text-white font-bold">ICT Waarborg</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
