import { useEffect } from 'react';
import { updateSEO, SEOData } from '../utils/seo';

interface SEOProps extends SEOData {}

export const SEO = (props: SEOProps) => {
  useEffect(() => {
    updateSEO(props);
  }, [props]);

  return null;
};
