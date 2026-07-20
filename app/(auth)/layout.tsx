import type { Metadata } from "next";

/** Auth pages should not compete in search — GSC shows /sign-up impressions with 0 clicks. */
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false
    }
  }
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
