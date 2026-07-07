import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { getSEOSettings, getWebsiteSettings, getFAQs } from "@/lib/data/service";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEOSettings();
  const settings = await getWebsiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: settings.hotelName }],
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: siteUrl,
      siteName: settings.hotelName,
      images: [{ url: seo.ogImage, width: 1200, height: 630, alt: settings.hotelName }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
      creator: seo.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    alternates: { canonical: siteUrl },
    icons: { icon: "/favicon.svg", apple: "/images/logo.svg" },
    manifest: "/manifest.json",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getWebsiteSettings();
  const faqs = await getFAQs();

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <StructuredData settings={settings} faqs={faqs} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
