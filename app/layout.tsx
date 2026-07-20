import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/providers";
import { absoluteUrl, seoConfig, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.url),
  title: {
    default: seoConfig.title,
    template: "%s | Apply"
  },
  description: seoConfig.description,
  applicationName: seoConfig.name,
  creator: "Apply",
  publisher: "Apply",
  category: "AI resume builder",
  alternates: {
    canonical: absoluteUrl("/")
  },
  icons: {
    icon: "/symbol.png",
    shortcut: "/symbol.png",
    apple: "/symbol.png"
  },
  keywords: [...seoConfig.keywords],
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
  verification: {
    google: "aMaC-d-l0Bvd80mzAuNQdWqHZXgzfxpwTl0kcLpdC6I"
  },
  openGraph: {
    title: seoConfig.title,
    description: seoConfig.description,
    url: seoConfig.url,
    siteName: seoConfig.name,
    locale: "en_US",
    images: [{ url: "/logo.png", width: 1536, height: 1024, alt: "Apply" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.title,
    description: seoConfig.description,
    images: ["/logo.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f1e9"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href={`${seoConfig.url}/sitemap.xml`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className={`${geist.variable} ${instrumentSerif.variable}`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd])
          }}
        />
        <Providers>{children}</Providers>
        {umamiSrc && umamiWebsiteId ? (
          <Script
            defer
            src={umamiSrc}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
        <Script
          src={
            process.env.NEXT_PUBLIC_CHATBOT_SRC ?? "https://apnaai.online/chatBot.js"
          }
          data-owner-id={
            process.env.NEXT_PUBLIC_CHATBOT_OWNER_ID ?? "usr_129633093731483650"
          }
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
