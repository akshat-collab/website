/**
 * SEO Head - Sets document title and meta tags per page
 */

import { useEffect } from 'react';

const SITE_URL = 'https://techmasterai.org';

interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  /** Comma-separated keywords for meta keywords */
  keywords?: string;
  /** Full URL for og:image (defaults to site logo) */
  ogImage?: string;
  /** og:type - default "website" */
  ogType?: 'website' | 'article';
}

export function SeoHead({
  title,
  description,
  path = '',
  noIndex,
  keywords,
  ogImage = `${SITE_URL}/tmai-logo.png`,
  ogType = 'website',
}: SeoHeadProps) {
  const fullTitle = title.includes('TechMasterAI') ? title : `${title} | TechMasterAI`;
  const canonicalUrl = `${SITE_URL}${path || '/'}`.replace(/\/$/, '') || SITE_URL;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  useEffect(() => {
    document.title = fullTitle;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

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
    setMeta('og:type', ogType, true);
    setMeta('og:image', imageUrl, true);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:image', imageUrl);

    if (keywords) {
      setMeta('keywords', keywords);
    }

    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
    }
  }, [fullTitle, description, canonicalUrl, noIndex, keywords, imageUrl, ogType]);

  return null;
}
