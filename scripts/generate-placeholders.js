/**
 * Generates local placeholder JPEG images without network
 * Run: node scripts/generate-placeholders.js
 */

const fs = require("fs");
const path = require("path");

// Minimal valid 1x1 JPEG (warm beige tone via repeated pattern - use larger canvas via sharp alternative)
// Since we can't use sharp without npm, create SVG placeholders that work in img tags

const images = [
  "hero.jpg", "welcome.jpg", "about.jpg", "lobby.jpg", "pool.jpg", "spa.jpg",
  "restaurant.jpg", "restaurant-interior.jpg", "dining.jpg", "night-view.jpg", "placeholder.jpg",
  "rooms/deluxe.jpg", "rooms/executive.jpg", "rooms/premium.jpg", "rooms/suite.jpg",
  "rooms/family.jpg", "rooms/presidential.jpg",
  "gallery/hotel-1.jpg", "gallery/room-1.jpg", "gallery/restaurant-1.jpg",
  "gallery/event-1.jpg", "gallery/pool-1.jpg", "gallery/spa-1.jpg",
  "gallery/lobby-1.jpg", "gallery/night-1.jpg",
  "food/indian.jpg", "food/chinese.jpg", "food/italian.jpg",
  "food/continental.jpg", "food/south-indian.jpg", "food/dessert.jpg",
  "guests/guest-1.jpg", "guests/guest-2.jpg", "guests/guest-3.jpg", "guests/guest-4.jpg",
  "amenities/pool.jpg", "amenities/spa.jpg", "amenities/gym.jpg", "amenities/conference.jpg",
  "experiences/wedding.jpg", "experiences/corporate.jpg", "experiences/honeymoon.jpg",
];

const labels = {
  "hero.jpg": "Luxury Hotel",
  "welcome.jpg": "Welcome",
  "about.jpg": "Our Story",
  "lobby.jpg": "Grand Lobby",
  "pool.jpg": "Swimming Pool",
  "spa.jpg": "Luxury Spa",
  "restaurant.jpg": "Fine Dining",
  "restaurant-interior.jpg": "Dining Room",
  "dining.jpg": "Culinary Experience",
  "night-view.jpg": "Night View",
  "placeholder.jpg": "Grand Imperial Palace",
};

function createSvgPlaceholder(label, width = 1200, height = 800) {
  const displayLabel = label || "Grand Imperial Palace";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a"/>
      <stop offset="50%" style="stop-color:#2d2d2d"/>
      <stop offset="100%" style="stop-color:#1a1a1a"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#c9a96e"/>
      <stop offset="50%" style="stop-color:#d4b896"/>
      <stop offset="100%" style="stop-color:#c9a96e"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="40" y="40" width="${width - 80}" height="${height - 80}" fill="none" stroke="url(#gold)" stroke-width="1" opacity="0.3"/>
  <text x="50%" y="45%" text-anchor="middle" font-family="Georgia, serif" font-size="48" fill="url(#gold)">${displayLabel}</text>
  <text x="50%" y="55%" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#e8e0d5" opacity="0.7">Grand Imperial Palace</text>
  <line x1="35%" y1="60%" x2="65%" y2="60%" stroke="#c9a96e" stroke-width="1" opacity="0.5"/>
</svg>`;
}

const baseDir = path.join(__dirname, "..", "public", "images");

for (const img of images) {
  const dest = path.join(baseDir, img);
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filename = path.basename(img, ".jpg");
  const label = labels[img] || filename.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const isGuest = img.includes("guests/");
  const svg = createSvgPlaceholder(label, isGuest ? 200 : 1200, isGuest ? 200 : 800);

  // Save as .svg but also reference path stays .jpg - update to save as actual path
  // Next.js Image supports SVG. Save with correct extension as SVG for reliability without network
  const svgPath = dest.replace(".jpg", ".svg");
  fs.writeFileSync(svgPath, svg);

  // Also write a minimal redirect - we'll update image paths to use .svg OR copy svg content
  // For simplicity, copy svg to jpg path won't work. Let's write SVG and update references.
  fs.writeFileSync(dest.replace(".jpg", ".svg"), svg);
}

// Create symlinks map file for reference
const mapping = images.map((img) => ({
  original: `/images/${img}`,
  placeholder: `/images/${img.replace(".jpg", ".svg")}`,
}));

fs.writeFileSync(
  path.join(baseDir, "placeholders.json"),
  JSON.stringify(mapping, null, 2)
);

console.log(`Generated ${images.length} SVG placeholder images in public/images/`);
