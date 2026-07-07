import type { WebsiteSettings, FAQ } from "@/types";

export function generateHotelSchema(settings: WebsiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: settings.hotelName,
    description: settings.tagline,
    image: settings.logo,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302001",
      addressCountry: "IN",
    },
    telephone: settings.phone,
    email: settings.email,
    priceRange: "₹₹₹₹",
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.mapLat,
      longitude: settings.mapLng,
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Swimming Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Spa", value: true },
      { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
    ],
  };
}

export function generateRestaurantSchema(settings: WebsiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `${settings.hotelName} - The Imperial Dining Room`,
    image: settings.logo,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    telephone: settings.phone,
    servesCuisine: ["Indian", "Chinese", "Italian", "Continental", "South Indian"],
    priceRange: "₹₹₹",
    openingHours: "Mo-Su 07:00-23:00",
  };
}

export function generateLocalBusinessSchema(settings: WebsiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.hotelName,
    image: settings.logo,
    "@id": process.env.NEXT_PUBLIC_SITE_URL,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: settings.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: settings.mapLat,
      longitude: settings.mapLng,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };
}

export function generateFAQSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function StructuredData({
  settings,
  faqs,
}: {
  settings: WebsiteSettings;
  faqs: FAQ[];
}) {
  const schemas = [
    generateHotelSchema(settings),
    generateRestaurantSchema(settings),
    generateLocalBusinessSchema(settings),
    generateFAQSchema(faqs),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
