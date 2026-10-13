import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/site";

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

        {/* Ambient background glow */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute top-[40%] -right-40 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[120px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
