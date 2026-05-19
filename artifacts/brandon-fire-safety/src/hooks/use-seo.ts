import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

function ensureMeta(attrName: string, attrValue: string): HTMLMetaElement {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  return el;
}

function ensureCanonical(href: string): void {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    ensureMeta("name", "description").setAttribute("content", description);
    ensureMeta("property", "og:title").setAttribute("content", ogTitle ?? title);
    ensureMeta("property", "og:description").setAttribute("content", ogDescription ?? description);
    ensureMeta("name", "twitter:title").setAttribute("content", ogTitle ?? title);
    ensureMeta("name", "twitter:description").setAttribute("content", ogDescription ?? description);

    if (ogImage) {
      ensureMeta("property", "og:image").setAttribute("content", ogImage);
      ensureMeta("name", "twitter:image").setAttribute("content", ogImage);
    }

    if (ogUrl) {
      ensureMeta("property", "og:url").setAttribute("content", ogUrl);
    }

    if (canonical) {
      ensureCanonical(canonical);
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogUrl]);
}
