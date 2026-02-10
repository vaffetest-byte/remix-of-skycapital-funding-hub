import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  jsonLd?: object | object[];
}

export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogImage = 'https://skycapnow.com/og-image.jpg',
  ogType = 'website',
  article,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    setMetaTag('description', description);
    setMetaTag('title', title);

    // Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:image', ogImage, true);
    if (canonicalUrl) {
      setMetaTag('og:url', canonicalUrl, true);
    }

    // Twitter tags
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);
    setMetaTag('twitter:card', 'summary_large_image');

    // Article specific tags
    if (article && ogType === 'article') {
      if (article.publishedTime) {
        setMetaTag('article:published_time', article.publishedTime, true);
      }
      if (article.modifiedTime) {
        setMetaTag('article:modified_time', article.modifiedTime, true);
      }
      if (article.author) {
        setMetaTag('article:author', article.author, true);
      }
      if (article.section) {
        setMetaTag('article:section', article.section, true);
      }
    }

    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalUrl) {
      if (!canonicalElement) {
        canonicalElement = document.createElement('link');
        canonicalElement.rel = 'canonical';
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.href = canonicalUrl;
    }

    // JSON-LD structured data
    const existingJsonLd = document.querySelectorAll('script[data-seo-jsonld]');
    existingJsonLd.forEach(el => el.remove());

    if (jsonLd) {
      const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      jsonLdArray.forEach((data, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo-jsonld', `${index}`);
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

    // Cleanup on unmount
    return () => {
      const jsonLdScripts = document.querySelectorAll('script[data-seo-jsonld]');
      jsonLdScripts.forEach(el => el.remove());
    };
  }, [title, description, canonicalUrl, ogImage, ogType, article, jsonLd]);

  return null;
}
