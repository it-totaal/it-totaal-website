import { useState, useEffect, lazy, Suspense, useMemo, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Server, Cloud, Headphones, CheckCircle, Phone, Mail, MapPin, Clock, Shield, ShieldCheck, Lock, Award, ArrowRight, Package, Settings, Rocket } from 'lucide-react';
import { StructuredData, organizationSchema, localBusinessSchema, serviceSchema } from './components/StructuredData';
import { SEO } from './components/SEO';
import StaticMap from './components/StaticMap';
import InfiniteLogoScroll from './components/InfiniteLogoScroll';

const CustomerMap = lazy(() => import('./components/CustomerMap').then(module => ({ default: module.CustomerMap })));

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroImageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const location = useLocation();

  // De willekeurige keuze valt al in de <head> van index.html, zodat de preload
  // klopt. Hier alleen oppakken; de fallback vangt het geval af dat het script
  // niet gedraaid heeft.
  const heroPhoto = useMemo(
    () => window.__heroPhoto ?? {
      src: '/hero-monitoring.webp',
      alt: 'Medewerker van IT Totaal bewaakt systemen op een monitoringdashboard',
    },
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const logos = useMemo(() => [
    { url: 'https://valicare.nl', src: '/logos/valicare.png', alt: 'Valicare', size: 'h-12' },
    { url: 'https://bouwhof.nl', src: '/logos/bouwhof.svg', alt: 'Bouwhof', size: 'h-12' },
    { url: 'https://dutchwyse.nl', src: '/logos/dutchwyse.svg', alt: 'Dutchwyse', size: 'h-12' },
    { url: 'https://www.svde.nl', src: '/logos/svde.png', alt: 'SVDE', size: 'h-12' },
    { url: 'https://demooij-zoetermeer.nl', src: '/logos/demooij.svg', alt: 'De Mooij', size: 'h-12' },
    { url: 'https://www.mjdegroottransport.nl', src: '/logos/mjdegroot.svg', alt: 'MJ de Groot Transport', size: 'h-12' },
    { url: 'https://jnhlogistics.com/nl/', src: '/logos/jnh.png', alt: 'JNH Logistics', size: 'h-8' },
    { url: 'https://www.vanderwindttransport.nl/', src: '/logos/windt.png', alt: 'Van der Windt Transport', size: 'h-12' },
    { url: 'https://vvwtransport.nl/', src: '/logos/vvw-transport.png', alt: 'VVW Transport', size: 'h-12' },
    { url: 'https://mtcbv.nl/', src: '/logos/mtc.svg', alt: 'MTC BV', size: 'h-12' },
    { url: 'https://www.korevaarlogistics.nl/', src: '/logos/korevaar-logo.png', alt: 'Korevaar Logistics', size: 'h-12' },
    { url: 'https://www.easytrip.nl/', src: '/logos/easytrip.png', alt: 'EasyTrip', size: 'h-12' },
    { url: 'https://www.kovtransport.nl/', src: '/logos/kov.png', alt: 'KOV Transport', size: 'h-12' },
  ], []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 50;
          setIsScrolled(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = heroImageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * -12, y: dx * 12 });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  const services = [
    {
      icon: Server,
      title: 'IT Beheer',
      description: 'Volledig IT-beheer op maat voor uw organisatie',
      features: [
        'Werkplek inrichting',
        'Server configuratie',
        'Onsite & remote support',
        'Antivirus & beveiliging',
        'Mobile Device Management',
        'Periodieke checkups'
      ]
    },
    {
      icon: Cloud,
      title: 'IT Online',
      description: 'Cloud-gebaseerde oplossingen voor moderne bedrijven',
      features: [
        'Microsoft 365',
        'VoIP telefonie',
        'Cloud backup',
        'Webhosting',
        'Domeinregistratie',
        'E-mail beheer'
      ]
    },
    {
      icon: Headphones,
      title: 'IT Support',
      description: 'Deskundige ondersteuning wanneer u dat nodig heeft',
      features: [
        'Dedicated servicedesk',
        'Snelle reactietijden',
        'Remote assistentie',
        'Ticket systeem',
        'Proactieve monitoring',
        'Preventief onderhoud'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="IT Totaal - Complete IT Dienstverlening | Cloud, Beheer en Support"
        description="IT Totaal levert betrouwbare IT-beheer, clouddiensten en support voor transportbedrijven in Nederland. Specialist in de transportsector met 99.9% uptime."
        canonical="https://www.it-totaal.nl"
      />
      <StructuredData data={organizationSchema} />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={serviceSchema} />

      <header role="banner" className={`fixed z-50 transition-all duration-300 ${
        isScrolled
          ? 'top-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8'
          : 'top-0 left-0 right-0'
      }`}>
        <div className={`transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-xl shadow-xl shadow-slate-200/60 rounded-2xl border border-white/60'
            : 'bg-white shadow-md'
        }`} style={isScrolled ? { backgroundColor: 'rgba(255, 255, 255, 0.75)' } : {}}>
          <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
            <div className={`flex justify-between items-center transition-all duration-300 ${
              isScrolled ? 'h-14 py-2.5' : 'h-16 py-3'
            }`}>
            <div className="flex-shrink-0">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer">
                <img
                  src="/logos/logo-ittotaal-green-path.svg"
                  alt="IT Totaal"
                  style={{ aspectRatio: '1919/317' }}
                  className={`transition-all duration-300 ${
                    isScrolled ? 'h-6' : 'h-8'
                  }`}
                />
              </a>
            </div>

            <nav aria-label="Hoofdnavigatie" className="hidden lg:flex space-x-8">
              <a href="#transport" className="font-medium transition-colors text-slate-600 hover:text-blue-600">Transport</a>
              <a href="#diensten" className="font-medium transition-colors text-slate-600 hover:text-blue-600">Diensten</a>
              <a href="#security" className="font-medium transition-colors text-slate-600 hover:text-blue-600">Security</a>
              <a href="#contact" className="font-medium transition-colors text-slate-600 hover:text-blue-600">Contact</a>
            </nav>

            <div className="flex items-center gap-4">
              <a href="tel:0793238540" className="hidden md:flex items-center gap-2 text-sm mr-2 text-slate-500 hover:text-brand-green transition-colors group">
                <Phone className="text-brand-green transition-transform group-hover:rotate-12" size={16} />
                <span className="font-medium">079 323 8540</span>
              </a>
              <a href="https://it-totaal.rmmservice.eu/connect/#/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-slate-900 bg-brand-green hover:bg-[#3dd493] transition-all shadow-md hover:shadow-lg hover-scale">
                Support
              </a>
            </div>

            <button
              className="md:hidden transition-colors text-slate-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Menu sluiten" : "Menu openen"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

            {mobileMenuOpen && (
              <div className="md:hidden pb-6 px-6">
                <div className="flex flex-col space-y-3">
                  <a href="#transport" className="transition-colors text-slate-700 hover:text-blue-600">Transport</a>
                  <a href="#diensten" className="transition-colors text-slate-700 hover:text-blue-600">Diensten</a>
                  <a href="#security" className="transition-colors text-slate-700 hover:text-blue-600">Security</a>
                  <a href="#contact" className="transition-colors text-slate-700 hover:text-blue-600">Contact</a>
                  <a href="https://it-totaal.rmmservice.eu/connect/#/" target="_blank" rel="noopener noreferrer" className="bg-brand-green text-slate-900 px-6 py-2 rounded-lg hover:bg-[#3dd493] transition-colors text-center flex items-center justify-center gap-2">
                    <Headphones size={20} />
                    Support
                  </a>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main role="main" className="pt-16">
        <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-white">
          <svg className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] opacity-30 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <path fill="url(#cloudGradient1)" d="M44.7,-76.4C58.8,-69.3,71.6,-59.1,79.8,-45.8C88,-32.6,91.5,-16.3,91.3,-0.1C91.1,16.1,87.2,32.2,78.5,45.4C69.8,58.6,56.3,68.9,41.8,75.8C27.3,82.7,11.8,86.2,-4.3,92.8C-20.4,99.4,-40.8,109.1,-56.7,103.4C-72.6,97.7,-84,76.6,-89.7,56.8C-95.4,37,-95.4,18.5,-93.1,1.3C-90.8,-15.9,-86.2,-31.8,-77.7,-45.2C-69.2,-58.6,-56.8,-69.5,-42.8,-76.7C-28.8,-83.9,-14.4,-87.4,0.5,-88.3C15.4,-89.2,30.7,-87.5,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] opacity-25 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cloudGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: '#34d399', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            <path fill="url(#cloudGradient2)" d="M37.1,-63.3C48.9,-56.5,59.7,-47.3,67.3,-35.4C74.9,-23.5,79.3,-8.9,78.5,5.3C77.7,19.5,71.7,33.3,62.4,44.6C53.1,55.9,40.5,64.7,26.8,70.1C13.1,75.5,-1.7,77.5,-16.2,74.8C-30.7,72.1,-44.9,64.7,-56.8,54.1C-68.7,43.5,-78.3,29.7,-82.4,14.2C-86.5,-1.3,-85.1,-18.5,-77.9,-32.9C-70.7,-47.3,-57.7,-58.9,-43.2,-64.9C-28.7,-70.9,-12.6,-71.3,1.3,-73.3C15.2,-75.3,25.3,-70.1,37.1,-63.3Z" transform="translate(100 100)" />
          </svg>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left space-y-8 animate-slide-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold mb-2 shadow-lg hover-scale">
                  <Award size={16} className="animate-pulse" />
                  25 Jaar Jubileum
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1]">
                  IT die gewoon werkt. <br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400" role="text">Zonder gedoe.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
                  Sinds 2001 regelt IT Totaal uw complete IT-omgeving. Van werkplekken en cloud tot security en support. Betrouwbaar, schaalbaar en altijd bereikbaar.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <a href="#contact" className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 hover-glow">
                    Plan een adviesgesprek
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  <a href="#diensten" className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-base font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover-lift">
                    Bekijk onze diensten
                  </a>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand-green" size={16} />
                    <span>24/7 Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand-green" size={16} />
                    <span>Gecertificeerde experts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-brand-green" size={16} />
                    <span>150+ klanten</span>
                  </div>
                </div>
              </div>

              <div className="relative lg:h-[600px] w-full flex items-center justify-center">
                <div
                  ref={heroImageRef}
                  className="relative w-full aspect-square max-w-lg lg:max-w-none animate-scale-in"
                  style={{ perspective: '1000px' }}
                  onMouseMove={(e) => handleMouseMove(e.nativeEvent)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-50 to-slate-50 rounded-full opacity-60 blur-2xl -z-10 animate-pulse"></div>

                  <div
                    className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white h-full"
                    style={{
                      transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x !== 0 || tilt.y !== 0 ? 1.03 : 1})`,
                      transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s ease' : 'transform 0.08s linear',
                      willChange: 'transform',
                    }}
                  >
                    <img className="w-full h-full object-cover" src={heroPhoto.src} alt={heroPhoto.alt} loading="eager" />
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(255,255,255,0.12) 0%, transparent 70%)`,
                        transition: tilt.x === 0 && tilt.y === 0 ? 'background 0.6s ease' : 'background 0.08s linear',
                      }}
                    />
                  </div>

                  <div
                    className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 z-20 animate-float hover-lift cursor-default"
                    style={{
                      transform: `translateX(${tilt.y * -3}px) translateY(${tilt.x * 3}px)`,
                      transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.6s ease' : 'transform 0.08s linear',
                    }}
                  >
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-brand-green">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-semibold">Security Status</p>
                      <p className="text-sm font-bold text-slate-900">Beveiligd</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="waarom" className="py-20 bg-white relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-32 -mt-1" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#eff6ff" d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,0 L0,0 Z" opacity="0.5"/>
            <path fill="#dbeafe" d="M0,80 C360,48 600,96 960,64 C1200,48 1320,80 1440,64 L1440,0 L0,0 Z" opacity="0.3"/>
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">Waarom kiezen voor ons</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Uw IT-partner voor vandaag én morgen</h2>
              <div className="w-20 h-1.5 bg-brand-green mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-glow cursor-default">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all group-hover:scale-110">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Complete ontzorging</h3>
                <p className="text-slate-600">
                  Van hardware tot cloud en beveiliging. Eén aanspreekpunt voor alles, zodat u zich kunt focussen op uw core business.
                </p>
              </div>

              <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-glow cursor-default">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all group-hover:scale-110">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Proactieve support</h3>
                <p className="text-slate-600">
                  Wij wachten niet tot er iets stuk gaat. Wij monitoren continu en lossen potentiële problemen op voordat u er last van heeft.
                </p>
              </div>

              <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover-glow cursor-default">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all group-hover:scale-110">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Veilig en toekomstgericht</h3>
                <p className="text-slate-600">
                  Security-first aanpak met moderne technologieën die meegroeien met uw ambities en bedrijfsdoelstellingen.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white overflow-hidden relative z-0">
          <svg className="absolute top-20 right-0 w-[400px] h-[400px] opacity-20 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#dbeafe" d="M41.3,-71.3C54.4,-64.8,66.3,-54.5,73.8,-41.4C81.3,-28.3,84.4,-12.4,83.8,3.3C83.2,19,78.9,34.5,70.2,47.1C61.5,59.7,48.4,69.4,34.2,75.3C20,81.2,4.7,83.3,-11.3,81.8C-27.3,80.3,-44.1,75.2,-57.8,66.1C-71.5,57,-82.1,44,-86.5,29.1C-90.9,14.2,-89.1,-2.6,-82.9,-17.2C-76.7,-31.8,-66.1,-44.2,-53.2,-50.9C-40.3,-57.6,-25.1,-58.6,-11.3,-57.9C2.5,-57.2,28.2,-77.8,41.3,-71.3Z" transform="translate(100 100)" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative h-[300px] md:h-[400px] z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-50 to-slate-50 rounded-full opacity-40 blur-2xl -z-10"></div>
                <div className="hidden lg:block w-full h-full">
                  <Suspense fallback={
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-2xl">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
                        <p className="text-slate-600">Kaart laden...</p>
                      </div>
                    </div>
                  }>
                    <CustomerMap />
                  </Suspense>
                </div>
                <div className="lg:hidden w-full h-full shadow-xl">
                  <StaticMap />
                </div>
              </div>

              <div>
                <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">Doelgroep</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">IT-oplossingen voor groeiende organisaties</h2>

                <p className="text-lg text-slate-600 mb-8">
                  Onze focus ligt op MKB-bedrijven in de logistieke sector die willen groeien zonder zich zorgen te maken over hun IT. Of u nu 5 of 150 werkplekken heeft, wij zorgen dat uw IT meebeweegt met uw ambities.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <CheckCircle className="text-brand-green" size={16} />
                    </div>
                    <p className="ml-4 text-base text-slate-600">Schaalbare oplossingen die met u meegroeien</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <CheckCircle className="text-brand-green" size={16} />
                    </div>
                    <p className="ml-4 text-base text-slate-600">Persoonlijk contact en korte lijnen</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <CheckCircle className="text-brand-green" size={16} />
                    </div>
                    <p className="ml-4 text-base text-slate-600">Ruime ervaring met diverse TMS oplossingen</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <CheckCircle className="text-brand-green" size={16} />
                    </div>
                    <p className="ml-4 text-base text-slate-600">Geen ingewikkelde contracten</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="transport" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-32 -mt-1" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M0,64 C360,32 720,96 1080,64 C1260,48 1380,80 1440,64 L1440,0 L0,0 Z" />
          </svg>
          <svg className="absolute top-10 left-10 w-72 h-72 opacity-30 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#93c5fd" d="M39.5,-66.8C51.4,-60.2,61.5,-50.3,68.8,-38.2C76.1,-26.1,80.6,-11.8,80.4,2.4C80.2,16.6,75.3,30.8,67.3,43.1C59.3,55.4,48.2,65.8,35.3,72.5C22.4,79.2,7.7,82.2,-7.3,82.3C-22.3,82.4,-37.6,79.6,-50.8,72.5C-64,65.4,-75.1,54,-81.6,40.2C-88.1,26.4,-90,10.2,-87.7,-4.8C-85.4,-19.8,-78.9,-33.6,-69.5,-44.9C-60.1,-56.2,-47.8,-65,-34.8,-71.3C-21.8,-77.6,-8.1,-81.4,4.1,-78.9C16.3,-76.4,27.6,-73.4,39.5,-66.8Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-10 right-10 w-96 h-96 opacity-25 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#6ee7b7" d="M43.2,-73.8C56.5,-67.3,68.3,-56.2,75.8,-42.4C83.3,-28.6,86.5,-12.1,85.3,4.1C84.1,20.3,78.5,36.2,69.4,49.3C60.3,62.4,47.7,72.7,33.6,78.5C19.5,84.3,3.9,85.6,-11.8,84.2C-27.5,82.8,-43.3,78.7,-56.8,71.1C-70.3,63.5,-81.5,52.4,-87.3,38.7C-93.1,25,-93.5,8.7,-89.8,-5.9C-86.1,-20.5,-78.3,-33.4,-68.4,-44.5C-58.5,-55.6,-46.5,-65,-33.4,-71C-20.3,-77,-9.1,-79.6,3.5,-77.9C16.1,-76.2,29.9,-80.3,43.2,-73.8Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-0 left-0 w-full h-32 -mb-1" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M0,64 C240,32 480,96 720,64 C960,32 1200,96 1440,64 L1440,120 L0,120 Z" />
          </svg>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">Transport</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                Uw TMS naar de cloud
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Een naadloze overgang van uw Transport Management Systeem naar onze veilige cloud omgeving. Wij regelen alles van A tot Z.
              </p>
              <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-brand-green to-blue-600 transform -translate-x-1/2 rounded-full shadow-lg"></div>

              <div className="space-y-12 md:space-y-16">
                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3 hover:rotate-0 transition-transform z-10 border-4 border-white">
                    <Package size={28} strokeWidth={2.5} />
                  </div>
                  <div className="md:w-1/2 md:pr-12 ml-20 md:ml-0 md:text-right">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2">Stap 1</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Inventarisatie</h3>
                    <p className="text-slate-600">
                      We analyseren uw huidige TMS opstelling, hardware behoeften en specifieke wensen. Een schets op de achterkant van een bierviltje is genoeg om te beginnen.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-brand-green rounded-2xl flex items-center justify-center text-white shadow-xl -rotate-3 hover:rotate-0 transition-transform z-10 border-4 border-white">
                    <Settings size={28} strokeWidth={2.5} className="animate-spin-slow" />
                  </div>
                  <div className="md:w-1/2 md:pl-12 ml-20 md:ml-0">
                    <div className="inline-block px-3 py-1 bg-green-100 text-[#2c9f72] text-xs font-bold rounded-full mb-2">Stap 2</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Voorbereiding</h3>
                    <p className="text-slate-600">
                      We zetten de cloud infrastructuur klaar, configureren de netwerken en maken alles ready voor een soepele migratie. U merkt er niks van.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3 hover:rotate-0 transition-transform z-10 border-4 border-white">
                    <Cloud size={28} strokeWidth={2.5} />
                  </div>
                  <div className="md:w-1/2 md:pr-12 ml-20 md:ml-0 md:text-right">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2">Stap 3</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Migratie</h3>
                    <p className="text-slate-600">
                      Uw TMS wordt in één weekend naar de cloud verhuisd. Wij zorgen dat alles werkt, testen grondig en zijn er tot het operationeel is.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center gap-6">
                  <div className="flex-shrink-0 w-16 h-16 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 bg-brand-green rounded-2xl flex items-center justify-center text-white shadow-xl -rotate-3 hover:rotate-0 transition-transform z-10 border-4 border-white">
                    <Rocket size={28} strokeWidth={2.5} />
                  </div>
                  <div className="md:w-1/2 md:pl-12 ml-20 md:ml-0">
                    <div className="inline-block px-3 py-1 bg-green-100 text-[#2c9f72] text-xs font-bold rounded-full mb-2">Stap 4</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Live & Support</h3>
                    <p className="text-slate-600">
                      Vanaf dag één draait alles in de cloud. 24/7 monitoring, automatische back-ups en onze support staat klaar wanneer u ons nodig heeft.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mt-16">
                <div className="absolute left-8 md:left-1/2 top-0 h-20 w-1 bg-gradient-to-b from-blue-600 to-transparent transform -translate-x-1/2 rounded-full"></div>

                <div className="relative mt-12 bg-white rounded-2xl p-8 shadow-lg border border-slate-100 text-center hover-lift">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Klaar voor de cloud?</h3>
                  <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                    In minder dan een week draait uw TMS veilig en stabiel in onze cloud. Geen gedoe, gewoon werken.
                  </p>
                  <a href="#contact" className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover-glow">
                    Plan een gesprek
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white relative overflow-hidden">
          <svg className="absolute bottom-0 left-0 w-full h-32 -mb-1" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#f8fafc" d="M0,64 C360,96 720,32 1080,64 C1260,80 1380,48 1440,64 L1440,120 L0,120 Z" opacity="0.5"/>
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl p-8 md:p-16 overflow-hidden relative" style={{ backgroundColor: '#0c1959' }}>
              <svg className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-30 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#1a2b6d" d="M39.8,-67.3C52.4,-60.5,63.8,-51.2,71.5,-39.2C79.2,-27.2,83.2,-12.6,83.1,2C83,16.6,78.8,31.2,71.1,43.8C63.4,56.4,52.2,67,39.3,73.8C26.4,80.6,11.8,83.6,-3.2,82.5C-18.2,81.4,-33.8,76.2,-47.1,68.5C-60.4,60.8,-71.4,50.6,-78.3,38C-85.2,25.4,-88,10.4,-86.7,-4.1C-85.4,-18.6,-80,-32.6,-71.4,-44.4C-62.8,-56.2,-50.9,-65.8,-38.1,-72.5C-25.3,-79.2,-11.6,-83,1.8,-81.9C15.2,-80.8,27.2,-74.1,39.8,-67.3Z" transform="translate(100 100)" />
              </svg>

              <div className="relative z-10 w-full">
                <InfiniteLogoScroll logos={logos} />
              </div>
            </div>
          </div>
        </section>

        <section id="diensten" className="py-20 bg-white relative overflow-hidden">
          <svg className="absolute top-40 left-0 w-[350px] h-[350px] opacity-15 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#dbeafe" d="M47.3,-78.7C61.5,-71.8,73.3,-58.4,80.5,-43C87.7,-27.6,90.3,-10.2,88.5,6.4C86.7,23,80.5,38.8,71.2,51.8C61.9,64.8,49.5,75,35.4,80.8C21.3,86.6,5.5,88,-10.1,86.3C-25.7,84.6,-41.1,79.8,-54.3,72.1C-67.5,64.4,-78.5,53.8,-84.8,40.5C-91.1,27.2,-92.7,11.2,-90.1,-3.9C-87.5,-19,-80.7,-33.2,-71.3,-45.3C-61.9,-57.4,-49.9,-67.4,-36.2,-74.6C-22.5,-81.8,-7.1,-86.2,7.8,-84.9C22.7,-83.6,33.1,-85.6,47.3,-78.7Z" transform="translate(100 100)" />
          </svg>
          <svg className="absolute bottom-20 right-0 w-[400px] h-[400px] opacity-15 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#a7f3d0" d="M41.7,-72.3C54.8,-66.5,66.7,-56.4,74.8,-43.6C82.9,-30.8,87.2,-15.4,87.1,-0.1C87,15.2,82.5,30.4,74.6,43.2C66.7,56,55.4,66.4,42.5,73.3C29.6,80.2,15.1,83.6,-0.3,84.2C-15.7,84.8,-31.4,82.6,-44.8,76.1C-58.2,69.6,-69.3,58.8,-76.8,45.6C-84.3,32.4,-88.2,16.8,-87.8,1.4C-87.4,-14,-82.7,-29.2,-74.5,-42.3C-66.3,-55.4,-54.6,-66.4,-41.2,-72C-27.8,-77.6,-13.9,-77.8,0.5,-78.7C14.9,-79.6,28.6,-78.1,41.7,-72.3Z" transform="translate(100 100)" />
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">Onze Expertise</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Wat wij voor u regelen</h2>
              <p className="mt-4 text-slate-600 text-lg">Alles wat u nodig heeft voor een stabiele en veilige IT-omgeving onder één dak.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Werkplekbeheer</h3>
                <p className="text-slate-600 text-sm">
                  Volledig ingerichte werkplekken, inclusief hardware, software en updates. Zorgeloos werken voor al uw medewerkers.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <Cloud size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cloud oplossingen</h3>
                <p className="text-slate-600 text-sm">
                  Flexibel werken in een veilige cloudomgeving. Altijd toegang tot uw bestanden, waar u ook bent en op elk device.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Microsoft 365</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Optimaal samenwerken met Teams, SharePoint en Office apps. Wij regelen de licenties, inrichting en beveiliging.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Netwerkbeheer</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Een snel, stabiel en veilig bedrijfsnetwerk. Van wifi tot firewall, wij zorgen dat uw verbinding altijd optimaal is.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <Shield size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cybersecurity</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Bescherm uw bedrijfsdata tegen hackers en malware. Geavanceerde beveiliging voor email, endpoints en netwerk.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">IT Support & Monitoring</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Onze helpdesk staat altijd voor u klaar. Met 24/7 monitoring signaleren en verhelpen we storingen direct.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">VoIP Telefonie</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Moderne telefoniediensten via internet. Flexibel bellen vanaf elke locatie met professionele functies.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Webhosting</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Snelle en betrouwbare webhosting voor uw website. Inclusief domeinbeheer en e-mail diensten.
                </p>
              </div>

              <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1 hover-glow cursor-default">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-4 w-fit transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Cloud Backup</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Automatische back-ups van al uw bedrijfsdata naar de cloud. Veilige opslag en snel herstel bij calamiteiten.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="py-20 bg-white relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-32 -mt-1" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#eff6ff" d="M0,48 C480,96 720,0 960,48 C1200,96 1320,48 1440,64 L1440,0 L0,0 Z" opacity="0.4"/>
          </svg>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-600 rounded-3xl p-8 md:p-16 overflow-hidden relative">
              <svg className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-40 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#1e40af" d="M44.3,-76.4C58.1,-69.5,70.5,-58.3,78.4,-44.4C86.3,-30.5,89.7,-14,88.8,2.1C87.9,18.2,82.7,33.9,74.2,47.3C65.7,60.7,53.9,71.8,40.2,78.3C26.5,84.8,11,86.7,-4.7,85.9C-20.4,85.1,-36.8,81.6,-50.5,74.5C-64.2,67.4,-75.2,56.7,-81.8,43.5C-88.4,30.3,-90.6,14.6,-88.9,-0.5C-87.2,-15.6,-81.6,-30.2,-73.4,-42.8C-65.2,-55.4,-54.4,-66,-41.8,-73.2C-29.2,-80.4,-14.6,-84.2,0.5,-85.3C15.6,-86.4,30.5,-83.3,44.3,-76.4Z" transform="translate(100 100)" />
              </svg>

              <div className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green text-slate-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                      <Lock size={14} /> Security First
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Cybersecurity is geen optie. <br />Het is noodzaak.
                    </h2>
                    <p className="text-lg text-blue-50 mb-8 leading-relaxed">
                      Cyberdreigingen nemen dagelijks toe. IT Totaal beschermt uw organisatie met geavanceerde beveiliging, 24/7 monitoring en betrouwbare back-up oplossingen. Veiligheid staat bij ons altijd voorop.
                    </p>

                    <ul className="space-y-3 mb-8">
                      <li className="flex items-center text-white">
                        <CheckCircle className="text-brand-green mr-3" size={20} /> Ransomware bescherming
                      </li>
                      <li className="flex items-center text-white">
                        <CheckCircle className="text-brand-green mr-3" size={20} /> Multifactor authenticatie (MFA)
                      </li>
                      <li className="flex items-center text-white">
                        <CheckCircle className="text-brand-green mr-3" size={20} /> Automatische security updates
                      </li>
                    </ul>

                    <a href="#contact" className="group inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-slate-900 bg-brand-green hover:bg-[#3dd493] transition-all shadow-lg hover-lift hover-glow">
                      Plan een security check
                      <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                  <div className="relative h-full min-h-[300px] lg:min-h-[400px]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-blue-200 to-white rounded-full opacity-30 blur-2xl -z-10"></div>

                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                      <img src="/cybersecurity.jpg" alt="Cybersecurity bescherming en beveiliging" className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur p-4 rounded-lg shadow-lg border border-red-100 flex items-center gap-3 animate-pulse">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-brand-green">
                          <ShieldCheck size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase">Systeem Status</p>
                          <p className="text-sm font-bold text-slate-900">Bedreigingen Geblokkeerd</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="text-center mb-8">
                <span className="text-blue-600 font-semibold uppercase text-sm tracking-widest">Partner oplossingen</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Onze technologie partners</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
                <div className="flex items-center justify-center p-2 h-16">
                  <img src="/logos/duo-logo.svg" alt="Duo Security" className="max-h-10 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center p-2 h-16">
                  <img src="/logos/huntress-logo.png" alt="Huntress" className="h-10 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center p-2 h-16">
                  <img src="/logos/ninjaOne-logo-blue.svg" alt="NinjaOne" className="max-h-10 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center p-2 h-16">
                  <img src="/logos/avepoint-logo.svg" alt="AvePoint" className="max-h-10 w-auto object-contain" />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                <div className="flex items-center justify-center p-2 h-16">
                  <img src="/logos/Microsoft_logo_(2012).svg.png" alt="Microsoft" className="max-h-10 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center p-2 h-16">
                  <img src="/logos/vmware-logo-grey.svg" alt="VMware" className="max-h-10 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center p-2 h-16">
                  <img src="/logos/Veeam_logo.svg" alt="Veeam" className="max-h-10 w-auto object-contain" />
                </div>
                <div className="flex items-center justify-center p-2 h-16">
                  <img src="/logos/HPE-logo-full-clr-pos-rgb_(3).png" alt="HPE" className="max-h-10 w-auto object-contain" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-24 bg-white relative overflow-hidden">
          <svg className="absolute top-0 left-0 w-full h-24 -mt-1" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#eff6ff" d="M0,32 C320,64 640,0 960,32 C1280,64 1360,32 1440,48 L1440,0 L0,0 Z" opacity="0.3"/>
          </svg>
          <svg className="absolute top-20 right-10 w-[300px] h-[300px] opacity-10 z-0 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#3b82f6" d="M42.7,-73.5C55.9,-67.2,67.7,-56.3,75.3,-42.9C82.9,-29.5,86.3,-13.6,85.4,2.1C84.5,17.8,79.3,33.3,70.8,46.4C62.3,59.5,50.5,70.2,37.1,76.8C23.7,83.4,8.7,85.9,-6.5,85.2C-21.7,84.5,-37.4,80.6,-50.8,73.5C-64.2,66.4,-75.3,56.1,-81.9,43.2C-88.5,30.3,-90.6,14.7,-88.9,0.1C-87.2,-14.5,-81.7,-28.2,-73.5,-40.2C-65.3,-52.2,-54.4,-62.5,-41.8,-69.1C-29.2,-75.7,-14.6,-78.6,0.3,-79.2C15.2,-79.8,29.5,-79.8,42.7,-73.5Z" transform="translate(100 100)" />
          </svg>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">Klaar voor stabiele IT zonder zorgen?</h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Neem vandaag nog contact op voor een vrijblijvend gesprek. Wij vertellen u graag wat we voor uw organisatie kunnen betekenen.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:info@it-totaal.nl" className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover-glow">
                Neem contact op
                <Mail className="ml-2 transition-transform group-hover:scale-110" size={20} />
              </a>
              <a href="tel:0793238540" className="group inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-lg font-medium rounded-xl text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover-lift">
                <Phone className="mr-2 text-blue-600 transition-transform group-hover:rotate-12" size={20} />
                Bel direct: 079 323 8540
              </a>
            </div>
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        </section>
      </main>

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
                <li><a href="#diensten" className="text-slate-300 hover:text-blue-400 transition-colors">Werkplekbeheer</a></li>
                <li><a href="#diensten" className="text-slate-300 hover:text-blue-400 transition-colors">Cloud oplossingen</a></li>
                <li><a href="#diensten" className="text-slate-300 hover:text-blue-400 transition-colors">Microsoft 365</a></li>
                <li><a href="#diensten" className="text-slate-300 hover:text-blue-400 transition-colors">Cybersecurity</a></li>
                <li><a href="#diensten" className="text-slate-300 hover:text-blue-400 transition-colors">IT Support</a></li>
                <li><a href="#diensten" className="text-slate-300 hover:text-blue-400 transition-colors">VoIP Telefonie</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-5 text-lg">Bedrijf</h4>
              <ul className="space-y-3">
                <li><a href="#waarom" className="text-slate-300 hover:text-blue-400 transition-colors">Waarom IT Totaal</a></li>
                <li><a href="#security" className="text-slate-300 hover:text-blue-400 transition-colors">Security</a></li>
                <li><a href="#contact" className="text-slate-300 hover:text-blue-400 transition-colors">Contact</a></li>
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

              <a
                href="https://www.ictwaarborg.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
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
    </div>
  );
}

export default App;
