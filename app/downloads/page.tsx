import type { Metadata } from "next";
import { SiteHeader } from "@/components/landing/site-header";
import { Footer } from "@/components/landing/footer";
import { DesktopComingSoon } from "@/components/downloads/desktop-coming-soon";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Apply Desktop / Interview Copilot — Coming Soon",
  description:
    "Apply Desktop for practice mock interviews on Windows and macOS — syncs with your Apply resume. Coming soon. Notify me when it launches.",
  alternates: {
    canonical: absoluteUrl("/downloads")
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "Apply Desktop / Interview Copilot — Coming Soon",
    description:
      "Practice mock interviews on desktop. Windows + macOS later. Web tools available today.",
    url: absoluteUrl("/downloads"),
    siteName: seoConfig.name,
    type: "website"
  }
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] dark:bg-[#131318]">
      <SiteHeader />
      <main className="px-5 py-16 lg:px-8 lg:py-20">
        <DesktopComingSoon />
      </main>
      <Footer />
    </div>
  );
}
