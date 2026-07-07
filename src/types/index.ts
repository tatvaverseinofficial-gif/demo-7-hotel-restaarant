export type RoomCategory =
  | "deluxe"
  | "executive"
  | "premium"
  | "suite"
  | "family"
  | "presidential";

export type AvailabilityStatus = "available" | "limited" | "sold_out";

export interface Room {
  id: string;
  name: string;
  description: string;
  category: RoomCategory;
  price: number;
  capacity: number;
  size: string;
  bedType: string;
  amenities: string[];
  images: string[];
  featured: boolean;
  availability: AvailabilityStatus;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantItem {
  id: string;
  name: string;
  description: string;
  category: string;
  cuisine: string;
  price: number;
  image: string;
  isSignature: boolean;
  isChefSpecial: boolean;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  visible: boolean;
  order: number;
}

export interface Experience {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  visible: boolean;
  order: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  featured: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  guestName: string;
  guestPhoto: string;
  rating: number;
  review: string;
  country: string;
  city: string;
  roomStayed: string;
  verified: boolean;
  visible: boolean;
  createdAt: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  distance: string;
  type: string;
  icon: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface HomepageSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  welcomeTitle: string;
  welcomeText: string;
  aboutTitle: string;
  aboutText: string;
  heritageText: string;
  missionText: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  twitterHandle: string;
}

export interface WebsiteSettings {
  hotelName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  mapLat: number;
  mapLng: number;
  socialFacebook: string;
  socialInstagram: string;
  socialTwitter: string;
  logo: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  message: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor";
}
