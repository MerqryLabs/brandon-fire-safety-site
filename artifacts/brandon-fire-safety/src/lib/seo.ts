export interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogUrl: string;
}

const OG_IMAGE = "https://brandonfiresafety.com/opengraph.jpg";

export const seoByPath: Record<string, PageSeo> = {
  "/": {
    title: "Brandon Fire & Safety Equipment Co Inc | Tampa, FL",
    description:
      "Brandon Fire & Safety Equipment Co Inc provides fire extinguisher inspections, maintenance, tagging, and safety equipment services in Tampa, FL.",
    canonical: "https://brandonfiresafety.com/",
    ogImage: OG_IMAGE,
    ogUrl: "https://brandonfiresafety.com/",
  },
  "/about": {
    title: "About Us | Brandon Fire & Safety Equipment Co Inc",
    description:
      "Learn about Brandon Fire & Safety Equipment Co Inc — a trusted fire extinguisher inspection, recharging, hydrostatic testing, and emergency lighting company serving Tampa, FL.",
    canonical: "https://brandonfiresafety.com/about",
    ogImage: OG_IMAGE,
    ogUrl: "https://brandonfiresafety.com/about",
  },
  "/services": {
    title: "Our Services | Brandon Fire & Safety Equipment Co Inc",
    description:
      "Comprehensive fire safety services in Tampa, FL — extinguisher inspections, recharging, hydrostatic testing, emergency lighting, cabinet installation, and more.",
    canonical: "https://brandonfiresafety.com/services",
    ogImage: OG_IMAGE,
    ogUrl: "https://brandonfiresafety.com/services",
  },
  "/reviews": {
    title: "Customer Reviews | Brandon Fire & Safety Equipment Co Inc",
    description:
      "Read what customers say about Brandon Fire & Safety Equipment Co Inc. Trusted fire safety inspections and services in Tampa, FL with 5-star reviews from local businesses.",
    canonical: "https://brandonfiresafety.com/reviews",
    ogImage: OG_IMAGE,
    ogUrl: "https://brandonfiresafety.com/reviews",
  },
  "/contact": {
    title: "Contact Us | Brandon Fire & Safety Equipment Co Inc",
    description:
      "Contact Brandon Fire & Safety Equipment Co Inc at (813) 651-9191. Located at 4107 Cragmont Drive, Tampa, FL 33610. Open Monday–Friday 9AM–5PM. Schedule an inspection or request emergency service.",
    canonical: "https://brandonfiresafety.com/contact",
    ogImage: OG_IMAGE,
    ogUrl: "https://brandonfiresafety.com/contact",
  },
};

export const prerenderRoutes = Object.keys(seoByPath);
