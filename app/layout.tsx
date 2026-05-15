import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

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
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply - AI resumes for every job",
    description:
      "Upload once. Paste a job description. Download a tailored resume instantly."
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
  return (
    <html lang="en">
      <body className={`${geist.variable} ${instrumentSerif.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
