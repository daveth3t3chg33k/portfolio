import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
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
  title: "Dave Kamirah — Full-stack Engineer (MERN · ML · Web3)",
  description:
    "Dave Kamirah builds full-stack products with a signal: MERN apps, machine-learning tooling, and Web3 contracts. Currently shipping Rack, a cloud POS for retail.",
  keywords: [
    "Dave Kamirah",
    "CodeSavant",
    "Full-stack developer",
    "MERN",
    "React",
    "Next.js",
    "Machine Learning",
    "Web3",
    "Nairobi developer",
  ],
  creator: "Dave Kamirah",
  openGraph: {
    title: "Dave Kamirah — Software With a Signal",
    description:
      "Full-stack engineer. MERN, ML & Web3. Currently shipping Rack, a cloud POS for retail.",
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
        className={`${geistSans.variable} ${fraunces.variable} ${jetbrains.variable} antialiased grain`}
      >
        {children}
      </body>
    </html>
  );
}
