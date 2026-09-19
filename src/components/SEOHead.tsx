import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  schemaData?: Record<string, any> | Record<string, any>[];
}

const BASE_URL = 'https://europalletliquidation.eu';
const DEFAULT_TITLE = 'EuroPalletLiquidation.eu - Online Liquidation & Outlet Shop';
const DEFAULT_DESC = "Europe's premier online liquidation & clearance outlet shop. Shop brand overstock, electronics, home goods, and tools at up to 80% off retail with fast EU delivery.";
const DEFAULT_IMAGE = `${BASE_URL}/favicon.svg`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage,
  schemaData
}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | EuroPalletLiquidation.eu` : DEFAULT_TITLE;
    const desc = description || DEFAULT_DESC;
    const cleanPath = canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : '';
    const canonicalUrl = `${BASE_URL}${cleanPath}`;
    const image = ogImage || DEFAULT_IMAGE;

    // 1. Update Title
    document.title = fullTitle;

    // 2. Update or create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = desc;

    // 3. Update or create Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // 4. Update OpenGraph Tags
    const updateMeta = (prop: string, val: string, isProperty = true) => {
      const selector = isProperty ? `meta[property="${prop}"]` : `meta[name="${prop}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', prop);
        else el.setAttribute('name', prop);
        document.head.appendChild(el);
      }
      el.content = val;
    };

    updateMeta('og:title', fullTitle);
    updateMeta('og:description', desc);
    updateMeta('og:url', canonicalUrl);
    updateMeta('og:type', ogType);
    updateMeta('og:image', image);

    updateMeta('twitter:title', fullTitle, false);
    updateMeta('twitter:description', desc, false);
    updateMeta('twitter:image', image, false);

    // 5. Dynamic JSON-LD injection
    const scriptId = 'dynamic-jsonld-schema';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      const structuredObject = Array.isArray(schemaData)
        ? { '@context': 'https://schema.org', '@graph': schemaData }
        : { '@context': 'https://schema.org', ...schemaData };
      scriptTag.text = JSON.stringify(structuredObject);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup on component unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [title, description, canonicalPath, ogType, ogImage, schemaData]);

  return null;
};
