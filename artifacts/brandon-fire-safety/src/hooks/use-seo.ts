import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
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

export function useSEO({ title, description, ogTitle, ogDescription, ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title;

    ensureMeta("name", "description").setAttribute("content", description);
    ensureMeta("property", "og:title").setAttribute("content", ogTitle ?? title);
    ensureMeta("property", "og:description").setAttribute("content", ogDescription ?? description);
    ensureMeta("name", "twitter:title").setAttribute("content", ogTitle ?? title);
    ensureMeta("name", "twitter:description").setAttribute("content", ogDescription ?? description);
    if (ogImage) ensureMeta("property", "og:image").setAttribute("content", ogImage);
    if (ogImage) ensureMeta("name", "twitter:image").setAttribute("content", ogImage);
  }, [title, description, ogTitle, ogDescription, ogImage]);
}
