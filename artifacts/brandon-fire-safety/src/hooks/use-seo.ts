import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export function useSEO({ title, description, ogTitle, ogDescription, ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [attr, val] = selector.replace(/[\[\]"]/g, " ").trim().split(/\s+/);
        el.setAttribute(attr, val);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', ogTitle ?? title);
    setMeta('meta[property="og:description"]', ogDescription ?? description);
    if (ogImage) setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[name="twitter:title"]', ogTitle ?? title);
    setMeta('meta[name="twitter:description"]', ogDescription ?? description);
    if (ogImage) setMeta('meta[name="twitter:image"]', ogImage);
  }, [title, description, ogTitle, ogDescription, ogImage]);
}
