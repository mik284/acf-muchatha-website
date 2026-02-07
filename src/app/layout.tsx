import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ContentWrapper } from "@/components/layout/ContentWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ambassadors For Christ Fellowship - Muchatha",
  description: "Welcome to Ambassadors For Christ Fellowship Church in Muchatha, Nairobi. Join us for worship, fellowship, and spiritual growth.",
  keywords: [
    "church",
    "Nairobi",
    "Muchatha",
    "Christian",
    "fellowship",
    "worship",
    "sermons",
    "ministries",
  ],
  authors: [{ name: "Ambassadors For Christ Fellowship" }],
  creator: "Ambassadors For Christ Fellowship",
  themeColor: "#2563eb",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        <Header />
        <main className="flex-grow">
          <ContentWrapper>
            {children}
          </ContentWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
