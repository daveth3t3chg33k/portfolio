import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dave Kamirah — Full-stack Engineer (MERN · ML · Web3 · Systems)",
    template: "%s — Dave Kamirah",
  },
  description:
    "Dave Kamirah builds full-stack products with a signal: MERN apps, machine-learning tooling, Web3 contracts, and the low-level systems underneath. Founder of LoyalMini — loyalty that pays with M-PESA.",
  keywords: [
    "Dave Kamirah",
    "CodeSavant",
    "Full-stack developer",
    "MERN",
    "React",
    "Next.js",
    "Machine Learning",
    "Web3",
    "C",
    "Rust",
    "WebAssembly",
    "Systems programming",
    "Nairobi developer",
    "LoyalMini",
  ],
  creator: "Dave Kamirah",
  openGraph: {
    title: "Dave Kamirah — Software With a Signal",
    description:
      "Full-stack engineer. MERN, ML, Web3 and the systems underneath. Founder of LoyalMini (loyalmini.com), frontend at Drift Consult.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${fraunces.variable} ${jetbrains.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
