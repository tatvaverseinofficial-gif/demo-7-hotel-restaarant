import type {
  Room,
  RestaurantItem,
  Amenity,
  Experience,
  GalleryImage,
  Testimonial,
  HomepageSettings,
  SEOSettings,
  WebsiteSettings,
} from "@/types";

type DbRow = Record<string, unknown>;

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function num(v: unknown, fallback = 0): number {
  return typeof v === "number" ? v : fallback;
}

function bool(v: unknown, fallback = false): boolean {
  return typeof v === "boolean" ? v : fallback;
}

function arr(v: unknown): string[] {
  return Array.isArray(v) ? v.map(String) : [];
}

export function mapRoomFromDb(row: DbRow): Room {
  return {
    id: str(row.id),
    name: str(row.name),
    description: str(row.description),
    category: str(row.category) as Room["category"],
    price: num(row.price),
    capacity: num(row.capacity, 2),
    size: str(row.size),
    bedType: str(row.bed_type ?? row.bedType),
    amenities: arr(row.amenities),
    images: arr(row.images),
    featured: bool(row.featured),
    availability: str(row.availability, "available") as Room["availability"],
    visible: bool(row.visible, true),
    createdAt: str(row.created_at ?? row.createdAt),
    updatedAt: str(row.updated_at ?? row.updatedAt),
  };
}

export function mapRoomToDb(room: Partial<Room>): DbRow {
  const row: DbRow = {};
  if (room.name !== undefined) row.name = room.name;
  if (room.description !== undefined) row.description = room.description;
  if (room.category !== undefined) row.category = room.category;
  if (room.price !== undefined) row.price = room.price;
  if (room.capacity !== undefined) row.capacity = room.capacity;
  if (room.size !== undefined) row.size = room.size;
  if (room.bedType !== undefined) row.bed_type = room.bedType;
  if (room.amenities !== undefined) row.amenities = room.amenities;
  if (room.images !== undefined) row.images = room.images;
  if (room.featured !== undefined) row.featured = room.featured;
  if (room.availability !== undefined) row.availability = room.availability;
  if (room.visible !== undefined) row.visible = room.visible;
  if (room.updatedAt !== undefined) row.updated_at = room.updatedAt;
  return row;
}

export function mapRestaurantFromDb(row: DbRow): RestaurantItem {
  return {
    id: str(row.id),
    name: str(row.name),
    description: str(row.description),
    category: str(row.category),
    cuisine: str(row.cuisine),
    price: num(row.price),
    image: str(row.image),
    isSignature: bool(row.is_signature ?? row.isSignature),
    isChefSpecial: bool(row.is_chef_special ?? row.isChefSpecial),
    visible: bool(row.visible, true),
    createdAt: str(row.created_at ?? row.createdAt),
    updatedAt: str(row.updated_at ?? row.updatedAt),
  };
}

export function mapRestaurantToDb(item: Partial<RestaurantItem>): DbRow {
  const row: DbRow = {};
  if (item.name !== undefined) row.name = item.name;
  if (item.description !== undefined) row.description = item.description;
  if (item.category !== undefined) row.category = item.category;
  if (item.cuisine !== undefined) row.cuisine = item.cuisine;
  if (item.price !== undefined) row.price = item.price;
  if (item.image !== undefined) row.image = item.image;
  if (item.isSignature !== undefined) row.is_signature = item.isSignature;
  if (item.isChefSpecial !== undefined) row.is_chef_special = item.isChefSpecial;
  if (item.visible !== undefined) row.visible = item.visible;
  if (item.updatedAt !== undefined) row.updated_at = item.updatedAt;
  return row;
}

export function mapAmenityFromDb(row: DbRow): Amenity {
  return {
    id: str(row.id),
    name: str(row.name),
    description: str(row.description),
    icon: str(row.icon),
    image: str(row.image),
    visible: bool(row.visible, true),
    order: num(row.order),
  };
}

export function mapAmenityToDb(item: Partial<Amenity>): DbRow {
  const row: DbRow = {};
  if (item.name !== undefined) row.name = item.name;
  if (item.description !== undefined) row.description = item.description;
  if (item.icon !== undefined) row.icon = item.icon;
  if (item.image !== undefined) row.image = item.image;
  if (item.visible !== undefined) row.visible = item.visible;
  if (item.order !== undefined) row.order = item.order;
  return row;
}

export function mapExperienceFromDb(row: DbRow): Experience {
  return {
    id: str(row.id),
    name: str(row.name),
    description: str(row.description),
    image: str(row.image),
    icon: str(row.icon),
    visible: bool(row.visible, true),
    order: num(row.order),
  };
}

export function mapExperienceToDb(item: Partial<Experience>): DbRow {
  const row: DbRow = {};
  if (item.name !== undefined) row.name = item.name;
  if (item.description !== undefined) row.description = item.description;
  if (item.image !== undefined) row.image = item.image;
  if (item.icon !== undefined) row.icon = item.icon;
  if (item.visible !== undefined) row.visible = item.visible;
  if (item.order !== undefined) row.order = item.order;
  return row;
}

export function mapGalleryFromDb(row: DbRow): GalleryImage {
  return {
    id: str(row.id),
    src: str(row.src),
    alt: str(row.alt),
    category: str(row.category),
    featured: bool(row.featured),
    order: num(row.order),
  };
}

export function mapGalleryToDb(item: Partial<GalleryImage>): DbRow {
  const row: DbRow = {};
  if (item.src !== undefined) row.src = item.src;
  if (item.alt !== undefined) row.alt = item.alt;
  if (item.category !== undefined) row.category = item.category;
  if (item.featured !== undefined) row.featured = item.featured;
  if (item.order !== undefined) row.order = item.order;
  return row;
}

export function mapTestimonialFromDb(row: DbRow): Testimonial {
  return {
    id: str(row.id),
    guestName: str(row.guest_name ?? row.guestName),
    guestPhoto: str(row.guest_photo ?? row.guestPhoto),
    rating: num(row.rating, 5),
    review: str(row.review),
    country: str(row.country),
    city: str(row.city),
    roomStayed: str(row.room_stayed ?? row.roomStayed),
    verified: bool(row.verified),
    visible: bool(row.visible, true),
    createdAt: str(row.created_at ?? row.createdAt),
  };
}

export function mapTestimonialToDb(item: Partial<Testimonial>): DbRow {
  const row: DbRow = {};
  if (item.guestName !== undefined) row.guest_name = item.guestName;
  if (item.guestPhoto !== undefined) row.guest_photo = item.guestPhoto;
  if (item.rating !== undefined) row.rating = item.rating;
  if (item.review !== undefined) row.review = item.review;
  if (item.country !== undefined) row.country = item.country;
  if (item.city !== undefined) row.city = item.city;
  if (item.roomStayed !== undefined) row.room_stayed = item.roomStayed;
  if (item.verified !== undefined) row.verified = item.verified;
  if (item.visible !== undefined) row.visible = item.visible;
  return row;
}

export function mapHomepageFromDb(row: DbRow): HomepageSettings {
  return {
    heroTitle: str(row.hero_title ?? row.heroTitle),
    heroSubtitle: str(row.hero_subtitle ?? row.heroSubtitle),
    heroImage: str(row.hero_image ?? row.heroImage),
    welcomeTitle: str(row.welcome_title ?? row.welcomeTitle),
    welcomeText: str(row.welcome_text ?? row.welcomeText),
    aboutTitle: str(row.about_title ?? row.aboutTitle),
    aboutText: str(row.about_text ?? row.aboutText),
    heritageText: str(row.heritage_text ?? row.heritageText),
    missionText: str(row.mission_text ?? row.missionText),
  };
}

export function mapHomepageToDb(s: Partial<HomepageSettings>): DbRow {
  const row: DbRow = {};
  if (s.heroTitle !== undefined) row.hero_title = s.heroTitle;
  if (s.heroSubtitle !== undefined) row.hero_subtitle = s.heroSubtitle;
  if (s.heroImage !== undefined) row.hero_image = s.heroImage;
  if (s.welcomeTitle !== undefined) row.welcome_title = s.welcomeTitle;
  if (s.welcomeText !== undefined) row.welcome_text = s.welcomeText;
  if (s.aboutTitle !== undefined) row.about_title = s.aboutTitle;
  if (s.aboutText !== undefined) row.about_text = s.aboutText;
  if (s.heritageText !== undefined) row.heritage_text = s.heritageText;
  if (s.missionText !== undefined) row.mission_text = s.missionText;
  return row;
}

export function mapSEOFromDb(row: DbRow): SEOSettings {
  return {
    title: str(row.title),
    description: str(row.description),
    keywords: str(row.keywords),
    ogImage: str(row.og_image ?? row.ogImage),
    twitterHandle: str(row.twitter_handle ?? row.twitterHandle),
  };
}

export function mapSEOToDb(s: Partial<SEOSettings>): DbRow {
  const row: DbRow = {};
  if (s.title !== undefined) row.title = s.title;
  if (s.description !== undefined) row.description = s.description;
  if (s.keywords !== undefined) row.keywords = s.keywords;
  if (s.ogImage !== undefined) row.og_image = s.ogImage;
  if (s.twitterHandle !== undefined) row.twitter_handle = s.twitterHandle;
  return row;
}

export function mapWebsiteFromDb(row: DbRow): WebsiteSettings {
  return {
    hotelName: str(row.hotel_name ?? row.hotelName),
    tagline: str(row.tagline),
    phone: str(row.phone),
    email: str(row.email),
    address: str(row.address),
    workingHours: str(row.working_hours ?? row.workingHours),
    mapLat: num(row.map_lat ?? row.mapLat),
    mapLng: num(row.map_lng ?? row.mapLng),
    socialFacebook: str(row.social_facebook ?? row.socialFacebook),
    socialInstagram: str(row.social_instagram ?? row.socialInstagram),
    socialTwitter: str(row.social_twitter ?? row.socialTwitter),
    logo: str(row.logo),
  };
}

export function mapWebsiteToDb(s: Partial<WebsiteSettings>): DbRow {
  const row: DbRow = {};
  if (s.hotelName !== undefined) row.hotel_name = s.hotelName;
  if (s.tagline !== undefined) row.tagline = s.tagline;
  if (s.phone !== undefined) row.phone = s.phone;
  if (s.email !== undefined) row.email = s.email;
  if (s.address !== undefined) row.address = s.address;
  if (s.workingHours !== undefined) row.working_hours = s.workingHours;
  if (s.mapLat !== undefined) row.map_lat = s.mapLat;
  if (s.mapLng !== undefined) row.map_lng = s.mapLng;
  if (s.socialFacebook !== undefined) row.social_facebook = s.socialFacebook;
  if (s.socialInstagram !== undefined) row.social_instagram = s.socialInstagram;
  if (s.socialTwitter !== undefined) row.social_twitter = s.socialTwitter;
  if (s.logo !== undefined) row.logo = s.logo;
  return row;
}
