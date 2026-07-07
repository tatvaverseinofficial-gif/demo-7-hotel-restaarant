-- Supabase Schema for Grand Imperial Palace
-- Run this in your Supabase SQL editor when ready for production

-- Rooms
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  capacity INTEGER DEFAULT 2,
  size TEXT,
  bed_type TEXT,
  amenities TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  availability TEXT DEFAULT 'available',
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Restaurant Items
CREATE TABLE IF NOT EXISTS restaurant_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  cuisine TEXT,
  price INTEGER NOT NULL,
  image TEXT,
  is_signature BOOLEAN DEFAULT false,
  is_chef_special BOOLEAN DEFAULT false,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Amenities
CREATE TABLE IF NOT EXISTS amenities (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  image TEXT,
  visible BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0
);

-- Experiences
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  icon TEXT,
  visible BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0
);

-- Gallery
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  src TEXT NOT NULL,
  alt TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  guest_name TEXT NOT NULL,
  guest_photo TEXT,
  rating INTEGER DEFAULT 5,
  review TEXT,
  country TEXT,
  city TEXT,
  room_stayed TEXT,
  verified BOOLEAN DEFAULT false,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  check_in DATE,
  check_out DATE,
  guests INTEGER,
  room_type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homepage Settings (singleton)
CREATE TABLE IF NOT EXISTS homepage_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image TEXT,
  welcome_title TEXT,
  welcome_text TEXT,
  about_title TEXT,
  about_text TEXT,
  heritage_text TEXT,
  mission_text TEXT
);

-- SEO Settings (singleton)
CREATE TABLE IF NOT EXISTS seo_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title TEXT,
  description TEXT,
  keywords TEXT,
  og_image TEXT,
  twitter_handle TEXT
);

-- Website Settings (singleton)
CREATE TABLE IF NOT EXISTS website_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  hotel_name TEXT,
  tagline TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  working_hours TEXT,
  map_lat DOUBLE PRECISION,
  map_lng DOUBLE PRECISION,
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  logo TEXT
);

-- Enable Row Level Security
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read rooms" ON rooms FOR SELECT USING (visible = true);
CREATE POLICY "Public read restaurant" ON restaurant_items FOR SELECT USING (visible = true);
CREATE POLICY "Public read amenities" ON amenities FOR SELECT USING (visible = true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (visible = true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (visible = true);

-- Contact form insert policy
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Storage bucket for media uploads (run in Supabase SQL editor)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
-- CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
-- CREATE POLICY "Service role upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
-- CREATE POLICY "Service role update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media');
-- CREATE POLICY "Service role delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media');
