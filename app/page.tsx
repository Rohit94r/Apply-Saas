import { BlogPreviewSection } from "@/components/landing/blog-preview-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { EngineShowcase } from "@/components/landing/engine-showcase";
import { FaqSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { InterviewPrepSection } from "@/components/landing/interview-prep-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteHeader } from "@/components/landing/site-header";
import { Testimonials } from "@/components/landing/testimonials";
import {
  faqJsonLd,
  organizationJsonLd,
  softwareJsonLd,
  websiteJsonLd
} from "@/lib/seo";

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
        <HowItWorks />
        <ComparisonSection />
        <EngineShowcase />
        <InterviewPrepSection />
        <Testimonials />
        <FaqSection />
        <BlogPreviewSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
