import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joey Fisher | Full Stack Developer",
  description: "Full Stack Developer based in Calgary, Alberta. Specializing in TypeScript, React, and cloud infrastructure.",
  keywords: ["developer", "full stack", "react", "typescript", "calgary"],
  authors: [{ name: "Joey Fisher" }],
  openGraph: {
    title: "Joey Fisher | Full Stack Developer",
    description: "Full Stack Developer based in Calgary, Alberta",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
