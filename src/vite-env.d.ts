/// <reference types="vite/client" />

interface Window {
  /** Hero-foto die in index.html willekeurig gekozen is, vóór React start. */
  __heroPhoto?: { src: string; srcset: string; sizes: string; alt: string };
}
