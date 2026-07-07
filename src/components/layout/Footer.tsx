import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import type { WebsiteSettings } from "@/types";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Restaurant", href: "#restaurant" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Footer({ settings }: { settings: WebsiteSettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-luxury-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />
      <div className="absolute inset-0 texture-overlay" />

      <div className="container-luxury relative py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-serif text-champagne mb-1">{settings.hotelName}</h3>
            <p className="text-xs tracking-widest uppercase text-warm-beige/40 mb-5">Jaipur, Rajasthan</p>
            <p className="text-warm-beige/65 text-sm leading-relaxed mb-6">
              {settings.tagline}. Experience the finest in Indian hospitality
              with world-class amenities and personalized service.
            </p>
            <div className="flex gap-3">
              {[
                { href: settings.socialFacebook, icon: Facebook, label: "Facebook" },
                { href: settings.socialInstagram, icon: Instagram, label: "Instagram" },
                { href: settings.socialTwitter, icon: Twitter, label: "Twitter" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 sm:w-9 sm:h-9 border border-warm-beige/15 flex items-center justify-center text-warm-beige/50 hover:text-champagne hover:border-champagne/40 transition-colors touch-manipulation"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-champagne mb-6">Explore</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-warm-beige/60 text-sm hover:text-champagne transition-colors inline-flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-px bg-champagne transition-all duration-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-champagne mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-champagne mt-0.5 shrink-0" />
                <span className="text-warm-beige/65 text-sm leading-relaxed">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-champagne shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="text-warm-beige/65 text-sm hover:text-champagne transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-champagne shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-warm-beige/65 text-sm hover:text-champagne transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-champagne shrink-0" />
                <span className="text-warm-beige/65 text-sm">{settings.workingHours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.25em] uppercase text-champagne mb-6">Newsletter</h4>
            <p className="text-warm-beige/60 text-sm mb-4 leading-relaxed">
              Subscribe for exclusive offers, seasonal packages, and event invitations.
            </p>
            <form className="flex flex-col gap-2" action="#">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email for newsletter"
                className="bg-charcoal-light border border-warm-beige/15 px-4 py-3.5 text-base text-luxury-white placeholder:text-warm-beige/30 focus:outline-none focus:border-champagne/50 transition-colors min-h-[48px]"
              />
              <button
                type="submit"
                className="bg-champagne text-charcoal py-3.5 min-h-[48px] text-xs tracking-[0.2em] uppercase hover:bg-soft-gold transition-colors font-medium touch-manipulation"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-warm-beige/10 mt-10 sm:mt-14 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-warm-beige/40 text-xs">
            &copy; {currentYear} {settings.hotelName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-warm-beige/40">
            <a href="#" className="hover:text-champagne transition-colors">Privacy</a>
            <a href="#" className="hover:text-champagne transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
