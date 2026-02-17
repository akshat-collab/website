/**
 * SEO Head - Sets document title and meta tags per page
 */

import { useEffect } from 'react';

const SITE_URL = 'https://techmasterai.in';

interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}

export function SeoHead({ title, description, path = '', noIndex }: SeoHeadProps) {
  const fullTitle = title.includes('TechMasterAI') ? title : `${title} | TechMasterAI`;
  const canonicalUrl = `${SITE_URL}${path || '/'}`.replace(/\/$/, '') || SITE_URL;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);

    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    }
  }, [fullTitle, description, canonicalUrl, noIndex]);

  return null;
}
