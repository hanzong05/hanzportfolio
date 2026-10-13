import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hanz Pillerva | Full-Stack Developer",
  description:
    "Full-Stack Developer and System Developer building modern web systems, e-commerce platforms, and AI/ML solutions with React, Laravel, Node.js, and Python.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
