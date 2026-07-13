import { BlogPreviewSection } from "@/components/landing/blog-preview-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { EngineShowcase } from "@/components/landing/engine-showcase";
import { FaqSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { FreelancingSection } from "@/components/landing/freelancing-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import {
  ComingSoonSection,
  ProductFeaturesSection
} from "@/components/landing/product-features-section";
import { StudentGatewaySection } from "@/components/landing/student-gateway-section";
import { InterviewPrepSection } from "@/components/landing/interview-prep-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteHeader } from "@/components/landing/site-header";
import { Testimonials } from "@/components/landing/testimonials";
import {
  faqJsonLd,
  organizationJsonLd,
  softwareJsonLd,
  websiteJsonLd,
  seoConfig,
  absoluteUrl
} from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: seoConfig.title,
  description: seoConfig.description,
  alternates: {
    canonical: absoluteUrl("/")
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    url: absoluteUrl("/"),
    siteName: seoConfig.name,
    type: "website"
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            organizationJsonLd,
            websiteJsonLd,
            softwareJsonLd,
            faqJsonLd
          ])
        }}
      />
      <SiteHeader />
      <main>
        <HeroSection />
        <StudentGatewaySection />
        <ProductFeaturesSection />
        <HowItWorks />
        <ComparisonSection />
        <EngineShowcase />
        <InterviewPrepSection />
        <FreelancingSection />
        <ComingSoonSection />
        <Testimonials />
        <FaqSection />
        <BlogPreviewSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
