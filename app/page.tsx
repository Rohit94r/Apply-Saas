import { ComparisonSection } from "@/components/landing/comparison-section";
import { EngineShowcase } from "@/components/landing/engine-showcase";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { InterviewPrepSection } from "@/components/landing/interview-prep-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteHeader } from "@/components/landing/site-header";
import { Testimonials } from "@/components/landing/testimonials";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <HowItWorks />
        <ComparisonSection />
        <EngineShowcase />
        <InterviewPrepSection />
        <Testimonials />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
