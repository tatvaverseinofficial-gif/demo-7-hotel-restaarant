import type {
  Room,
  RestaurantItem,
  Amenity,
  Experience,
  GalleryImage,
  Testimonial,
  Attraction,
  FAQ,
  HomepageSettings,
  SEOSettings,
  WebsiteSettings,
  ContactFormData,
} from "@/types";
import { getSupabaseClient, getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  mapRoomFromDb, mapRoomToDb,
  mapRestaurantFromDb, mapRestaurantToDb,
  mapAmenityFromDb, mapAmenityToDb,
  mapExperienceFromDb, mapExperienceToDb,
  mapGalleryFromDb, mapGalleryToDb,
  mapTestimonialFromDb, mapTestimonialToDb,
  mapHomepageFromDb, mapHomepageToDb,
  mapSEOFromDb, mapSEOToDb,
  mapWebsiteFromDb, mapWebsiteToDb,
} from "@/lib/supabase/mappers";
import {
  mockRooms,
  mockRestaurantItems,
  mockAmenities,
  mockExperiences,
  mockGallery,
  mockTestimonials,
  mockAttractions,
  mockFAQs,
  mockHomepageSettings,
  mockSEOSettings,
  mockWebsiteSettings,
} from "./mock-data";

function getWriteClient() {
  return getSupabaseAdminClient() ?? getSupabaseClient();
}

// In-memory store for admin CRUD (mock mode)
let roomsStore = [...mockRooms];
let restaurantStore = [...mockRestaurantItems];
let amenitiesStore = [...mockAmenities];
let experiencesStore = [...mockExperiences];
let galleryStore = [...mockGallery];
let testimonialsStore = [...mockTestimonials];
let homepageSettingsStore = { ...mockHomepageSettings };
let seoSettingsStore = { ...mockSEOSettings };
let websiteSettingsStore = { ...mockWebsiteSettings };

// Rooms
export async function getRooms(visibleOnly = true): Promise<Room[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const query = supabase.from("rooms").select("*").order("price");
    if (visibleOnly) query.eq("visible", true);
    const { data } = await query;
    return (data || []).map(mapRoomFromDb);
  }
  return visibleOnly ? roomsStore.filter((r) => r.visible) : [...roomsStore];
}

export async function getRoomById(id: string): Promise<Room | null> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const { data } = await supabase.from("rooms").select("*").eq("id", id).single();
    return data ? mapRoomFromDb(data) : null;
  }
  return roomsStore.find((r) => r.id === id) || null;
}

export async function getFeaturedRooms(): Promise<Room[]> {
  const rooms = await getRooms();
  return rooms.filter((r) => r.featured);
}

export async function createRoom(room: Omit<Room, "id" | "createdAt" | "updatedAt">): Promise<Room> {
  const now = new Date().toISOString();
  const newRoom: Room = { ...room, id: `room-${Date.now()}`, createdAt: now, updatedAt: now };
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("rooms").insert(mapRoomToDb(newRoom)).select().single();
    return mapRoomFromDb(data);
  }
  roomsStore.push(newRoom);
  return newRoom;
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<Room | null> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("rooms").update(mapRoomToDb({ ...updates, updatedAt: new Date().toISOString() })).eq("id", id).select().single();
    return data ? mapRoomFromDb(data) : null;
  }
  const index = roomsStore.findIndex((r) => r.id === id);
  if (index === -1) return null;
  roomsStore[index] = { ...roomsStore[index], ...updates, updatedAt: new Date().toISOString() };
  return roomsStore[index];
}

export async function deleteRoom(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { error } = await supabase.from("rooms").delete().eq("id", id);
    return !error;
  }
  roomsStore = roomsStore.filter((r) => r.id !== id);
  return true;
}

// Restaurant
export async function getRestaurantItems(visibleOnly = true): Promise<RestaurantItem[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const query = supabase.from("restaurant_items").select("*");
    if (visibleOnly) query.eq("visible", true);
    const { data } = await query;
    return (data || []).map(mapRestaurantFromDb);
  }
  return visibleOnly ? restaurantStore.filter((r) => r.visible) : [...restaurantStore];
}

export async function createRestaurantItem(item: Omit<RestaurantItem, "id" | "createdAt" | "updatedAt">): Promise<RestaurantItem> {
  const now = new Date().toISOString();
  const newItem: RestaurantItem = { ...item, id: `dish-${Date.now()}`, createdAt: now, updatedAt: now };
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("restaurant_items").insert(mapRestaurantToDb(newItem)).select().single();
    return mapRestaurantFromDb(data);
  }
  restaurantStore.push(newItem);
  return newItem;
}

export async function updateRestaurantItem(id: string, updates: Partial<RestaurantItem>): Promise<RestaurantItem | null> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("restaurant_items").update(mapRestaurantToDb({ ...updates, updatedAt: new Date().toISOString() })).eq("id", id).select().single();
    return data ? mapRestaurantFromDb(data) : null;
  }
  const index = restaurantStore.findIndex((r) => r.id === id);
  if (index === -1) return null;
  restaurantStore[index] = { ...restaurantStore[index], ...updates, updatedAt: new Date().toISOString() };
  return restaurantStore[index];
}

export async function deleteRestaurantItem(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { error } = await supabase.from("restaurant_items").delete().eq("id", id);
    return !error;
  }
  restaurantStore = restaurantStore.filter((r) => r.id !== id);
  return true;
}

// Amenities
export async function getAmenities(visibleOnly = true): Promise<Amenity[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const query = supabase.from("amenities").select("*").order("order");
    if (visibleOnly) query.eq("visible", true);
    const { data } = await query;
    return (data || []).map(mapAmenityFromDb).sort((a, b) => a.order - b.order);
  }
  const items = visibleOnly ? amenitiesStore.filter((a) => a.visible) : [...amenitiesStore];
  return items.sort((a, b) => a.order - b.order);
}

export async function createAmenity(amenity: Omit<Amenity, "id">): Promise<Amenity> {
  const newAmenity: Amenity = { ...amenity, id: `amen-${Date.now()}` };
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("amenities").insert(mapAmenityToDb(newAmenity)).select().single();
    return mapAmenityFromDb(data);
  }
  amenitiesStore.push(newAmenity);
  return newAmenity;
}

export async function updateAmenity(id: string, updates: Partial<Amenity>): Promise<Amenity | null> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("amenities").update(mapAmenityToDb(updates)).eq("id", id).select().single();
    return data ? mapAmenityFromDb(data) : null;
  }
  const index = amenitiesStore.findIndex((a) => a.id === id);
  if (index === -1) return null;
  amenitiesStore[index] = { ...amenitiesStore[index], ...updates };
  return amenitiesStore[index];
}

export async function deleteAmenity(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { error } = await supabase.from("amenities").delete().eq("id", id);
    return !error;
  }
  amenitiesStore = amenitiesStore.filter((a) => a.id !== id);
  return true;
}

// Experiences
export async function getExperiences(visibleOnly = true): Promise<Experience[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const query = supabase.from("experiences").select("*").order("order");
    if (visibleOnly) query.eq("visible", true);
    const { data } = await query;
    return (data || []).map(mapExperienceFromDb).sort((a, b) => a.order - b.order);
  }
  const items = visibleOnly ? experiencesStore.filter((e) => e.visible) : [...experiencesStore];
  return items.sort((a, b) => a.order - b.order);
}

export async function createExperience(exp: Omit<Experience, "id">): Promise<Experience> {
  const newExp: Experience = { ...exp, id: `exp-${Date.now()}` };
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("experiences").insert(mapExperienceToDb(newExp)).select().single();
    return mapExperienceFromDb(data);
  }
  experiencesStore.push(newExp);
  return newExp;
}

export async function updateExperience(id: string, updates: Partial<Experience>): Promise<Experience | null> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("experiences").update(mapExperienceToDb(updates)).eq("id", id).select().single();
    return data ? mapExperienceFromDb(data) : null;
  }
  const index = experiencesStore.findIndex((e) => e.id === id);
  if (index === -1) return null;
  experiencesStore[index] = { ...experiencesStore[index], ...updates };
  return experiencesStore[index];
}

export async function deleteExperience(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    return !error;
  }
  experiencesStore = experiencesStore.filter((e) => e.id !== id);
  return true;
}

// Gallery
export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const query = supabase.from("gallery").select("*").order("order");
    const { data } = await query;
    return (data || []).map(mapGalleryFromDb).sort((a, b) => a.order - b.order);
  }
  return [...galleryStore].sort((a, b) => a.order - b.order);
}

export async function createGalleryImage(image: Omit<GalleryImage, "id">): Promise<GalleryImage> {
  const newImage: GalleryImage = { ...image, id: `gal-${Date.now()}` };
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("gallery").insert(mapGalleryToDb(newImage)).select().single();
    return mapGalleryFromDb(data);
  }
  galleryStore.push(newImage);
  return newImage;
}

export async function updateGalleryImage(id: string, updates: Partial<GalleryImage>): Promise<GalleryImage | null> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("gallery").update(mapGalleryToDb(updates)).eq("id", id).select().single();
    return data ? mapGalleryFromDb(data) : null;
  }
  const index = galleryStore.findIndex((g) => g.id === id);
  if (index === -1) return null;
  galleryStore[index] = { ...galleryStore[index], ...updates };
  return galleryStore[index];
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    return !error;
  }
  galleryStore = galleryStore.filter((g) => g.id !== id);
  return true;
}

// Testimonials
export async function getTestimonials(visibleOnly = true): Promise<Testimonial[]> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const query = supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    if (visibleOnly) query.eq("visible", true);
    const { data } = await query;
    return (data || []).map(mapTestimonialFromDb);
  }
  return visibleOnly ? testimonialsStore.filter((t) => t.visible) : [...testimonialsStore];
}

export async function createTestimonial(testimonial: Omit<Testimonial, "id" | "createdAt">): Promise<Testimonial> {
  const newTestimonial: Testimonial = { ...testimonial, id: `test-${Date.now()}`, createdAt: new Date().toISOString() };
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("testimonials").insert(mapTestimonialToDb(newTestimonial)).select().single();
    return mapTestimonialFromDb(data);
  }
  testimonialsStore.push(newTestimonial);
  return newTestimonial;
}

export async function updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial | null> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("testimonials").update(mapTestimonialToDb(updates)).eq("id", id).select().single();
    return data ? mapTestimonialFromDb(data) : null;
  }
  const index = testimonialsStore.findIndex((t) => t.id === id);
  if (index === -1) return null;
  testimonialsStore[index] = { ...testimonialsStore[index], ...updates };
  return testimonialsStore[index];
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    return !error;
  }
  testimonialsStore = testimonialsStore.filter((t) => t.id !== id);
  return true;
}

// Static data
export async function getAttractions(): Promise<Attraction[]> {
  return mockAttractions;
}

export async function getFAQs(): Promise<FAQ[]> {
  return mockFAQs.sort((a, b) => a.order - b.order);
}

// Settings
export async function getHomepageSettings(): Promise<HomepageSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const { data } = await supabase.from("homepage_settings").select("*").single();
    return data ? mapHomepageFromDb(data) : homepageSettingsStore;
  }
  return homepageSettingsStore;
}

export async function updateHomepageSettings(updates: Partial<HomepageSettings>): Promise<HomepageSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("homepage_settings").update(mapHomepageToDb(updates)).eq("id", 1).select().single();
    return data ? mapHomepageFromDb(data) : homepageSettingsStore;
  }
  homepageSettingsStore = { ...homepageSettingsStore, ...updates };
  return homepageSettingsStore;
}

export async function getSEOSettings(): Promise<SEOSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const { data } = await supabase.from("seo_settings").select("*").single();
    return data ? mapSEOFromDb(data) : seoSettingsStore;
  }
  return seoSettingsStore;
}

export async function updateSEOSettings(updates: Partial<SEOSettings>): Promise<SEOSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("seo_settings").update(mapSEOToDb(updates)).eq("id", 1).select().single();
    return data ? mapSEOFromDb(data) : seoSettingsStore;
  }
  seoSettingsStore = { ...seoSettingsStore, ...updates };
  return seoSettingsStore;
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const { data } = await supabase.from("website_settings").select("*").single();
    return data ? mapWebsiteFromDb(data) : websiteSettingsStore;
  }
  return websiteSettingsStore;
}

export async function updateWebsiteSettings(updates: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
  if (isSupabaseConfigured()) {
    const supabase = getWriteClient()!;
    const { data } = await supabase.from("website_settings").update(mapWebsiteToDb(updates)).eq("id", 1).select().single();
    return data ? mapWebsiteFromDb(data) : websiteSettingsStore;
  }
  websiteSettingsStore = { ...websiteSettingsStore, ...updates };
  return websiteSettingsStore;
}

// Contact form submission
export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseClient()!;
    const { error } = await supabase.from("contact_submissions").insert(data);
    if (error) return { success: false, message: "Failed to submit. Please try again." };
    return { success: true, message: "Thank you! We will contact you shortly." };
  }
  console.log("Contact form submission:", data);
  return { success: true, message: "Thank you! We will contact you shortly." };
}

// Dashboard stats
export async function getDashboardStats() {
  const [rooms, restaurant, gallery, testimonials] = await Promise.all([
    getRooms(false),
    getRestaurantItems(false),
    getGalleryImages(),
    getTestimonials(false),
  ]);
  return {
    totalRooms: rooms.length,
    featuredRooms: rooms.filter((r) => r.featured).length,
    totalDishes: restaurant.length,
    signatureDishes: restaurant.filter((r) => r.isSignature).length,
    galleryImages: gallery.length,
    testimonials: testimonials.length,
    visibleTestimonials: testimonials.filter((t) => t.visible).length,
  };
}
