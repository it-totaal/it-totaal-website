export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

export const updateSEO = (data: SEOData) => {
  if (data.title) {
    document.title = data.title;
    updateMetaTag('og:title', data.title);
    updateMetaTag('twitter:title', data.title);
  }

  if (data.description) {
    updateMetaTag('description', data.description, 'name');
    updateMetaTag('og:description', data.description);
    updateMetaTag('twitter:description', data.description);
  }

  if (data.canonical) {
    updateCanonicalLink(data.canonical);
    updateMetaTag('og:url', data.canonical);
  }

  if (data.keywords) {
    updateMetaTag('keywords', data.keywords, 'name');
  }

  if (data.ogImage) {
    updateMetaTag('og:image', data.ogImage);
    updateMetaTag('twitter:image', data.ogImage);
  }

  if (data.ogType) {
    updateMetaTag('og:type', data.ogType);
  }
};

const updateMetaTag = (property: string, content: string, attribute: 'property' | 'name' = 'property') => {
  let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    document.head.appendChild(element);
  }

  element.content = content;
};

const updateCanonicalLink = (href: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = href;
};
