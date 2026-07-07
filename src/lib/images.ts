// Unique hospitality images — stored locally in /public/images
// Run: node scripts/download-images.js

const local = (path: string) => `/images/${path}`;

export const IMAGES = {
  hero: local("hero.jpg"),
  welcome: local("welcome.jpg"),
  about: local("about.jpg"),
  lobby: local("lobby.jpg"),
  pool: local("pool.jpg"),
  spa: local("spa.jpg"),
  restaurant: local("restaurant.jpg"),
  restaurantInterior: local("restaurant-interior.jpg"),
  dining: local("dining.jpg"),
  nightView: local("night-view.jpg"),
  placeholder: local("placeholder.jpg"),
  logo: "/images/logo.svg",

  rooms: {
    deluxe: local("rooms/deluxe.jpg"),
    executive: local("rooms/executive.jpg"),
    premium: local("rooms/premium.jpg"),
    suite: local("rooms/suite.jpg"),
    family: local("rooms/family.jpg"),
    presidential: local("rooms/presidential.jpg"),
  },

  gallery: {
    hotel: local("gallery/hotel-1.jpg"),
    room: local("gallery/room-1.jpg"),
    restaurant: local("gallery/restaurant-1.jpg"),
    event: local("gallery/event-1.jpg"),
    pool: local("gallery/pool-1.jpg"),
    spa: local("gallery/spa-1.jpg"),
    lobby: local("gallery/lobby-1.jpg"),
    night: local("gallery/night-1.jpg"),
    room2: local("gallery/room-2.jpg"),
    restaurant2: local("gallery/restaurant-2.jpg"),
    spa2: local("gallery/spa-2.jpg"),
    night2: local("gallery/night-2.jpg"),
  },

  food: {
    indian: local("food/indian.jpg"),
    biryani: local("food/biryani.jpg"),
    chinese: local("food/chinese.jpg"),
    italian: local("food/italian.jpg"),
    continental: local("food/continental.jpg"),
    southIndian: local("food/south-indian.jpg"),
    dessert: local("food/dessert.jpg"),
    fondant: local("food/fondant.jpg"),
  },

  guests: {
    guest1: local("guests/guest-1.jpg"),
    guest2: local("guests/guest-2.jpg"),
    guest3: local("guests/guest-3.jpg"),
    guest4: local("guests/guest-4.jpg"),
  },

  amenities: {
    pool: local("amenities/pool.jpg"),
    spa: local("amenities/spa.jpg"),
    gym: local("amenities/gym.jpg"),
    conference: local("amenities/conference.jpg"),
    wifi: local("amenities/wifi.jpg"),
    car: local("amenities/car.jpg"),
    parking: local("amenities/parking.jpg"),
    roomService: local("amenities/room-service.jpg"),
    laundry: local("amenities/laundry.jpg"),
    kids: local("amenities/kids.jpg"),
  },

  experiences: {
    wedding: local("experiences/wedding.jpg"),
    corporate: local("experiences/corporate.jpg"),
    birthday: local("experiences/birthday.jpg"),
    staycation: local("experiences/staycation.jpg"),
    family: local("experiences/family.jpg"),
    honeymoon: local("experiences/honeymoon.jpg"),
  },
} as const;
