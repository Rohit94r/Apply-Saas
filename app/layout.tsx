import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Providers } from "@/components/providers";
import { clerkIsConfigured, clerkPublishableKey } from "@/lib/clerk-config";

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
  metadataBase: new URL("https://apply.neexmeet.com"),
  title: {
    default: "Apply - AI resumes for every job",
    template: "%s | Apply"
  },
  description:
    "Upload your resume once. Generate ATS-optimized resumes, cover letters, and interview prep for every job application.",
  applicationName: "Apply",
  icons: {
    icon: "/symbol.png",
    shortcut: "/symbol.png",
    apple: "/symbol.png"
  },
  keywords: [
    "AI resume builder",
    "ATS resume",
    "student resume",
    "job applications",
    "cover letter generator",
    "interview preparation"
  ],
  openGraph: {
    title: "Apply - Stop rewriting resumes",
    description:
      "Generate tailored, ATS-optimized resumes for every role from one master profile.",
    url: "https://apply.neexmeet.com",
    siteName: "Apply",
    images: [{ url: "/logo.png", width: 1536, height: 1024, alt: "Apply" }],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply - AI resumes for every job",
    description:
      "Upload once. Paste a job description. Download a tailored resume instantly.",
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
  const document = (
    <html lang="en">
      <body className={`${geist.variable} ${instrumentSerif.variable}`}>
        <Providers>{children}</Providers>
        {umamiSrc && umamiWebsiteId ? (
          <Script
            defer
            src={umamiSrc}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );

  if (!clerkIsConfigured) {
    return document;
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {document}
    </ClerkProvider>
  );
}
