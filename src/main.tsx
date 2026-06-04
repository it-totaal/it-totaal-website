import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';

const PrivacyStatement = lazy(() => import('./pages/PrivacyStatement.tsx'));
const AlgemeneVoorwaarden = lazy(() => import('./pages/AlgemeneVoorwaarden.tsx'));
const Verwerkersovereenkomst = lazy(() => import('./pages/Verwerkersovereenkomst.tsx'));
const Hulpmiddelen = lazy(() => import('./pages/Hulpmiddelen.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-slate-600">Laden...</p>
    </div>
  </div>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/privacy-verklaring" element={<PrivacyStatement />} />
          <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
          <Route path="/verwerkersovereenkomst" element={<Verwerkersovereenkomst />} />
          <Route path="/hulpmiddelen" element={<Hulpmiddelen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
