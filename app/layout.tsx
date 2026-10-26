import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: "%s | Hanz Pillerva",
  },
  description: SITE.description,
  keywords: [
    "Hanz Pillerva",
    "Full-Stack Developer",
    "System Developer",
    "Next.js developer",
    "React developer",
    "Laravel developer",
    "CakePHP developer",
    "Tarlac developer",
    "Philippines web developer",
    "AI/ML developer",
  ],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// Structured data that tells search engines who this site is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE_URL,
  email: `mailto:${SITE.email}`,
  jobTitle: "Full-Stack Developer and System Developer",
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tarlac",
    addressCountry: "PH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tarlac State University",
  },
  sameAs: [SITE.linkedin, SITE.github],
  knowsAbout: ["Next.js", "React", "Laravel", "CakePHP", "PHP", "TypeScript", "Python", "Machine Learning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        {children}
        <Analytics />
      </body>
    </html>
  );
}
