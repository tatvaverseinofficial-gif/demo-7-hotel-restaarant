import {

  getHomepageSettings,

  getWebsiteSettings,

  getRooms,

  getRestaurantItems,

  getAmenities,

  getExperiences,

  getGalleryImages,

  getTestimonials,

  getAttractions,

  getFAQs,

} from "@/lib/data/service";

import { Header } from "@/components/layout/Header";

import { Footer } from "@/components/layout/Footer";

import { ScrollToTop, MobileStickyCTA } from "@/components/layout/FloatingActions";

import { HeroSection } from "@/components/sections/Hero";

import { TrustBar } from "@/components/sections/TrustBar";

import { WelcomeSection } from "@/components/sections/Welcome";

import { RoomsSection } from "@/components/sections/Rooms";

import { RestaurantSection } from "@/components/sections/Restaurant";

import { AmenitiesSection } from "@/components/sections/Amenities";

import { ExperiencesSection } from "@/components/sections/Experiences";

import { GallerySection } from "@/components/sections/Gallery";

import { TestimonialsSection } from "@/components/sections/Testimonials";

import { AttractionsSection } from "@/components/sections/Attractions";

import { FAQSection } from "@/components/sections/FAQ";

import { CTABanner } from "@/components/sections/CTABanner";

import { ContactSection } from "@/components/sections/Contact";



export default async function HomePage() {

  const [

    homepageSettings,

    websiteSettings,

    rooms,

    restaurantItems,

    amenities,

    experiences,

    gallery,

    testimonials,

    attractions,

    faqs,

  ] = await Promise.all([

    getHomepageSettings(),

    getWebsiteSettings(),

    getRooms(),

    getRestaurantItems(),

    getAmenities(),

    getExperiences(),

    getGalleryImages(),

    getTestimonials(),

    getAttractions(),

    getFAQs(),

  ]);



  return (

    <>

      <Header hotelName={websiteSettings.hotelName} phone={websiteSettings.phone} />

      <main id="main-content" className="pb-mobile-nav">

        <HeroSection settings={homepageSettings} hotelName={websiteSettings.hotelName} />

        <TrustBar />

        <WelcomeSection settings={homepageSettings} />

        <RoomsSection rooms={rooms} />

        <RestaurantSection items={restaurantItems} />

        <AmenitiesSection amenities={amenities} />

        <ExperiencesSection experiences={experiences} />

        <GallerySection images={gallery} />

        <TestimonialsSection testimonials={testimonials} />

        <AttractionsSection attractions={attractions} settings={websiteSettings} />

        <FAQSection faqs={faqs} />

        <CTABanner phone={websiteSettings.phone} />

        <ContactSection settings={websiteSettings} />

      </main>

      <Footer settings={websiteSettings} />

      <ScrollToTop />

      <MobileStickyCTA phone={websiteSettings.phone} />

    </>

  );

}


