const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://apply.neexmeet.com";

export const seoConfig = {
  name: "Apply",
  domain: "apply.neexmeet.com",
  url: appUrl,
  title: "Apply - AI Resume Builder and ATS Resume Improver",
  description:
    "Build a student resume from guided questions or improve an uploaded resume with ATS-focused AI, live previews, and PDF downloads.",
  keywords: [
    "AI resume builder",
    "ATS resume builder",
    "student resume builder",
    "resume improver",
    "job application resume",
    "cover letter generator",
    "interview preparation",
    "resume PDF editor"
  ],
  routes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/dashboard",
    "/dashboard/build",
    "/dashboard/generate",
    "/dashboard/resumes",
    "/dashboard/interview",
    "/dashboard/tools",
    "/dashboard/analytics"
  ]
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, seoConfig.url).toString();
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: seoConfig.name,
  url: seoConfig.url,
  logo: absoluteUrl("/logo.png")
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: seoConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: seoConfig.url,
  description: seoConfig.description,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  }
};
