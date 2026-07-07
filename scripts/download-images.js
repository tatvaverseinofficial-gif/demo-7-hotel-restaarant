/**
 * Downloads unique hospitality images from Unsplash (verified IDs only)
 * Run: node scripts/download-images.js
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// Verified working Unsplash photo IDs (tested on this environment)
const PHOTOS = {
  hotelExterior: "1566073771259-6a8506099945",
  hotelRoom: "1551882547-ff40c63fe5fa",
  hotelLobby: "1618773928121-c32242e63f39",
  pool: "1571902943202-507ec2618e8f",
  spa: "1544161515-4ab6ce6db874",
  restaurant: "1414235077428-338989a2e8c0",
  restaurantBar: "1517248135467-4c7edcad34c4",
  dining: "1559339352-11d035aa65de",
  resort: "1520250497591-112f2f40a3f4",
  roomModern: "1631049307264-da0ec9d70304",
  roomExecutive: "1590490360182-c33d57733427",
  roomPremium: "1582719478250-c89cae4dc85b",
  roomSuite: "1578683010236-d716f9a3f461",
  indianFood: "1585937421612-70a008356fbe",
  steak: "1544025162-d76694265947",
  dosa: "1630383249896-424e482df921",
  dessert: "1551024506-0bccd828d307",
  guest1: "1494790108377-be9c29b29330",
  guest2: "1507003211169-0a1dd7228f2d",
  guest3: "1438761681033-6461ffad8d80",
  guest4: "1472099645785-5658abf4ff4e",
  gym: "1534438327276-14e5300c3a48",
  conference: "1497366216548-37526070297c",
  laptop: "1558618666-fcd25c85cd64",
  wedding: "1519741497674-611481863552",
  meeting: "1552664730-d307ca884978",
  honeymoon: "1571896349842-33c89424de2d",
};

function url(photoId, w = 1200, h = 800, crop = "entropy") {
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&fit=crop&crop=${crop}&q=85&auto=format`;
}

// Each file: unique photo + crop combo — no duplicate URLs
const images = {
  "hero.jpg": url(PHOTOS.hotelExterior, 1920, 1080, "entropy"),
  "welcome.jpg": url(PHOTOS.hotelRoom, 1200, 1500, "center"),
  "about.jpg": url(PHOTOS.resort, 1200, 900, "top"),
  "lobby.jpg": url(PHOTOS.hotelLobby, 1200, 800, "entropy"),
  "pool.jpg": url(PHOTOS.pool, 1400, 900, "center"),
  "spa.jpg": url(PHOTOS.spa, 1200, 800, "entropy"),
  "restaurant.jpg": url(PHOTOS.restaurant, 1400, 900, "center"),
  "restaurant-interior.jpg": url(PHOTOS.restaurantBar, 1400, 800, "entropy"),
  "dining.jpg": url(PHOTOS.dining, 1200, 800, "top"),
  "night-view.jpg": url(PHOTOS.hotelExterior, 1400, 900, "bottom"),
  "placeholder.jpg": url(PHOTOS.resort, 800, 600, "center"),

  "rooms/deluxe.jpg": url(PHOTOS.roomModern, 1200, 900, "center"),
  "rooms/executive.jpg": url(PHOTOS.roomExecutive, 1200, 900, "entropy"),
  "rooms/premium.jpg": url(PHOTOS.roomPremium, 1200, 900, "top"),
  "rooms/suite.jpg": url(PHOTOS.roomSuite, 1400, 900, "entropy"),
  "rooms/family.jpg": url(PHOTOS.roomModern, 1200, 900, "top"),
  "rooms/presidential.jpg": url(PHOTOS.roomSuite, 1400, 1000, "center"),

  "gallery/hotel-1.jpg": url(PHOTOS.hotelExterior, 1200, 1600, "top"),
  "gallery/room-1.jpg": url(PHOTOS.roomPremium, 1000, 1400, "center"),
  "gallery/restaurant-1.jpg": url(PHOTOS.restaurant, 1200, 800, "entropy"),
  "gallery/event-1.jpg": url(PHOTOS.wedding, 1400, 900, "center"),
  "gallery/pool-1.jpg": url(PHOTOS.pool, 1200, 1600, "top"),
  "gallery/spa-1.jpg": url(PHOTOS.spa, 1000, 1400, "center"),
  "gallery/lobby-1.jpg": url(PHOTOS.hotelLobby, 1200, 1600, "entropy"),
  "gallery/night-1.jpg": url(PHOTOS.resort, 1400, 900, "bottom"),
  "gallery/room-2.jpg": url(PHOTOS.roomExecutive, 1200, 900, "top"),
  "gallery/restaurant-2.jpg": url(PHOTOS.dining, 1400, 900, "entropy"),
  "gallery/spa-2.jpg": url(PHOTOS.spa, 1200, 800, "top"),
  "gallery/night-2.jpg": url(PHOTOS.honeymoon, 1400, 900, "center"),

  "food/indian.jpg": url(PHOTOS.indianFood, 900, 700, "center"),
  "food/biryani.jpg": url(PHOTOS.indianFood, 900, 700, "top"),
  "food/chinese.jpg": url(PHOTOS.dining, 900, 700, "entropy"),
  "food/italian.jpg": url(PHOTOS.restaurant, 900, 700, "top"),
  "food/continental.jpg": url(PHOTOS.steak, 900, 700, "center"),
  "food/south-indian.jpg": url(PHOTOS.dosa, 900, 700, "center"),
  "food/dessert.jpg": url(PHOTOS.dessert, 900, 700, "entropy"),
  "food/fondant.jpg": url(PHOTOS.dessert, 900, 700, "top"),

  "guests/guest-1.jpg": url(PHOTOS.guest1, 400, 400, "faces"),
  "guests/guest-2.jpg": url(PHOTOS.guest2, 400, 400, "faces"),
  "guests/guest-3.jpg": url(PHOTOS.guest3, 400, 400, "faces"),
  "guests/guest-4.jpg": url(PHOTOS.guest4, 400, 400, "faces"),

  "amenities/pool.jpg": url(PHOTOS.pool, 900, 700, "entropy"),
  "amenities/spa.jpg": url(PHOTOS.spa, 900, 700, "top"),
  "amenities/gym.jpg": url(PHOTOS.gym, 900, 700, "center"),
  "amenities/conference.jpg": url(PHOTOS.conference, 900, 700, "entropy"),
  "amenities/wifi.jpg": url(PHOTOS.laptop, 900, 700, "center"),
  "amenities/car.jpg": url(PHOTOS.hotelExterior, 900, 700, "center"),
  "amenities/parking.jpg": url(PHOTOS.resort, 900, 700, "entropy"),
  "amenities/room-service.jpg": url(PHOTOS.dining, 900, 700, "top"),
  "amenities/laundry.jpg": url(PHOTOS.hotelRoom, 900, 700, "entropy"),
  "amenities/kids.jpg": url(PHOTOS.pool, 900, 700, "top"),

  "experiences/wedding.jpg": url(PHOTOS.wedding, 1400, 900, "entropy"),
  "experiences/corporate.jpg": url(PHOTOS.meeting, 1400, 900, "center"),
  "experiences/birthday.jpg": url(PHOTOS.dining, 1400, 900, "center"),
  "experiences/staycation.jpg": url(PHOTOS.honeymoon, 1400, 900, "top"),
  "experiences/family.jpg": url(PHOTOS.roomModern, 1400, 900, "entropy"),
  "experiences/honeymoon.jpg": url(PHOTOS.honeymoon, 1400, 900, "entropy"),
};

const baseDir = path.join(__dirname, "..", "public", "images");

function download(targetUrl, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const fetch = (fetchUrl) => {
      https
        .get(fetchUrl, (response) => {
          if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
            fetch(response.headers.location);
            return;
          }
          if (response.statusCode !== 200) {
            reject(new Error(`HTTP ${response.statusCode}`));
            return;
          }
          const file = fs.createWriteStream(dest);
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
          file.on("error", reject);
        })
        .on("error", reject);
    };
    fetch(targetUrl);
  });
}

async function main() {
  console.log(`Downloading ${Object.keys(images).length} unique images...\n`);
  let success = 0;
  let failed = 0;

  for (const [filename, imageUrl] of Object.entries(images)) {
    const dest = path.join(baseDir, filename);
    try {
      process.stdout.write(`  ${filename}... `);
      await download(imageUrl, dest);
      const size = fs.statSync(dest).size;
      if (size < 1000) throw new Error("file too small");
      console.log(`OK (${Math.round(size / 1024)}KB)`);
      success++;
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      failed++;
    }
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

main();
