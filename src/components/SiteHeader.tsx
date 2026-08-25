import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, Headphones } from 'lucide-react';

interface SiteHeaderProps {
  /**
   * 'home' als de menu-items naar secties op dezelfde pagina wijzen,
   * 'sub' op een losse pagina — dan gaan ze eerst terug naar de voorpagina.
   */
  variant?: 'home' | 'sub';
}

const SECTIES = [
  { hash: 'transport', label: 'Transport' },
  { hash: 'diensten', label: 'Diensten' },
  { hash: 'security', label: 'Security' },
];

export default function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Op een subpagina bestaan de secties hier niet, dus verwijzen we naar de
  // voorpagina. Een gewone <a> in plaats van <Link>: de browser springt dan
  // zelf naar het anker, wat react-router niet uit zichzelf doet.
  const anker = (hash: string) => (variant === 'home' ? `#${hash}` : `/#${hash}`);

  return (
    <header
      role="banner"
      className={`fixed z-50 transition-all duration-300 ${
        isScrolled
          ? 'top-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8'
          : 'top-0 left-0 right-0'
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl shadow-xl shadow-slate-200/60 rounded-2xl border border-white/60'
            : 'bg-white shadow-md'
        }`}
        style={isScrolled ? { backgroundColor: 'rgba(255, 255, 255, 0.75)' } : {}}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? 'h-14 py-2.5' : 'h-16 py-3'
            }`}
          >
            <div className="flex-shrink-0">
              {variant === 'home' ? (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer"
                >
                  <img
                    src="/logos/logo-ittotaal-green-path.svg"
                    alt="IT Totaal"
                    style={{ aspectRatio: '1919/317' }}
                    className={`transition-all duration-300 ${isScrolled ? 'h-6' : 'h-8'}`}
                  />
                </a>
              ) : (
                <Link to="/" className="cursor-pointer">
                  <img
                    src="/logos/logo-ittotaal-green-path.svg"
                    alt="IT Totaal"
                    style={{ aspectRatio: '1919/317' }}
                    className={`transition-all duration-300 ${isScrolled ? 'h-6' : 'h-8'}`}
                  />
                </Link>
              )}
            </div>

            <nav aria-label="Hoofdnavigatie" className="hidden lg:flex space-x-8">
              {SECTIES.map(({ hash, label }) => (
                <a
                  key={hash}
                  href={anker(hash)}
                  className="font-medium transition-colors text-slate-600 hover:text-blue-600"
                >
                  {label}
                </a>
              ))}
              <Link
                to="/team"
                className="font-medium transition-colors text-slate-600 hover:text-blue-600"
              >
                Team
              </Link>
              <a
                href={anker('contact')}
                className="font-medium transition-colors text-slate-600 hover:text-blue-600"
              >
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href="tel:0793238540"
                className="hidden md:flex items-center gap-2 text-sm mr-2 text-slate-500 hover:text-brand-green transition-colors group"
              >
                <Phone className="text-brand-green transition-transform group-hover:rotate-12" size={16} />
                <span className="font-medium">079 323 8540</span>
              </a>
              <a
                href="https://it-totaal.rmmservice.eu/connect/#/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-slate-900 bg-brand-green hover:bg-[#3dd493] transition-all shadow-md hover:shadow-lg hover-scale"
              >
                Support
              </a>
            </div>

            <button
              className="lg:hidden transition-colors text-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Menu sluiten' : 'Menu openen'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pb-6 px-6">
              <div className="flex flex-col space-y-3">
                {SECTIES.map(({ hash, label }) => (
                  <a
                    key={hash}
                    href={anker(hash)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="transition-colors text-slate-700 hover:text-blue-600"
                  >
                    {label}
                  </a>
                ))}
                <Link
                  to="/team"
                  onClick={() => setMobileMenuOpen(false)}
                  className="transition-colors text-slate-700 hover:text-blue-600"
                >
                  Team
                </Link>
                <a
                  href={anker('contact')}
                  onClick={() => setMobileMenuOpen(false)}
                  className="transition-colors text-slate-700 hover:text-blue-600"
                >
                  Contact
                </a>
                <a
                  href="https://it-totaal.rmmservice.eu/connect/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-green text-slate-900 px-6 py-2 rounded-lg hover:bg-[#3dd493] transition-colors text-center flex items-center justify-center gap-2"
                >
                  <Headphones size={20} />
                  Support
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
