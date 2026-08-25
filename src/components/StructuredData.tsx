import { useEffect } from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export const StructuredData = ({ data }: StructuredDataProps) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "IT Totaal Diensten BV",
  "url": "https://www.it-totaal.nl",
  "logo": "https://www.it-totaal.nl/logos/logo-ittotaal.svg",
  "description": "Complete IT-dienstverlening voor MKB bedrijven. Van cloud oplossingen en IT-beheer tot cybersecurity en 24/7 support.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rokkeveenseweg 32",
    "postalCode": "2712XZ",
    "addressLocality": "Zoetermeer",
    "addressCountry": "NL"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+31-79-323-8540",
    "contactType": "customer service",
    "email": "info@it-totaal.nl",
    "availableLanguage": "Dutch"
  },
  "sameAs": [
    "https://linkedin.com/company/it-totaal"
  ],
  "foundingDate": "2001",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "52.0576",
      "longitude": "4.4935"
    },
    "geoRadius": "50000"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "IT Totaal",
  "image": "https://www.it-totaal.nl/hero-image.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rokkeveenseweg 32",
    "postalCode": "2712XZ",
    "addressLocality": "Zoetermeer",
    "addressCountry": "NL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 52.0576,
    "longitude": 4.4935
  },
  "url": "https://www.it-totaal.nl",
  "telephone": "+31793238540",
  "email": "info@it-totaal.nl",
  "priceRange": "€€",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ]
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "IT Services",
  "provider": {
    "@type": "Organization",
    "name": "IT Totaal Diensten BV"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Netherlands"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "IT Diensten",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IT Beheer",
          "description": "Volledig IT-beheer op maat voor uw organisatie"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cloud Oplossingen",
          "description": "Cloud-gebaseerde oplossingen voor moderne bedrijven"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cybersecurity",
          "description": "Geavanceerde beveiliging voor uw bedrijfsdata"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IT Support",
          "description": "24/7 monitoring en support"
        }
      }
    ]
  }
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.it-totaal.nl"
    }
  ]
};

// Koppelt de teamleden aan het bedrijf, zodat een zoekmachine ze als personen
// herkent en niet als losse tekst. Rolgebaseerde adressen, geen persoonlijke.
export const teamSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.it-totaal.nl/#organisatie",
  "name": "IT Totaal Diensten BV",
  "url": "https://www.it-totaal.nl",
  "employee": [
    {
      "@type": "Person",
      "name": "Patrick Luisman",
      "jobTitle": "Eigenaar & Directeur",
      "email": "directie@it-totaal.nl",
      "image": "https://www.it-totaal.nl/team-patrick-960.webp",
      "worksFor": { "@id": "https://www.it-totaal.nl/#organisatie" }
    },
    {
      "@type": "Person",
      "name": "Kimberly de la Parra",
      "jobTitle": "Executive Assistant",
      "email": "administratie@it-totaal.nl",
      "image": "https://www.it-totaal.nl/team-kimberly-960.webp",
      "worksFor": { "@id": "https://www.it-totaal.nl/#organisatie" }
    },
    {
      "@type": "Person",
      "name": "Leon Hoogduin",
      "jobTitle": "Systeembeheerder",
      "email": "helpdesk@it-totaal.nl",
      "image": "https://www.it-totaal.nl/team-leon-960.webp",
      "worksFor": { "@id": "https://www.it-totaal.nl/#organisatie" }
    }
  ]
};
