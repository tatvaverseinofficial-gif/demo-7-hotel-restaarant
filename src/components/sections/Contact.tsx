"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/Animations";
import type { WebsiteSettings, ContactFormData } from "@/types";

export function ContactSection({ settings }: { settings: WebsiteSettings }) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    roomType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      setSubmitStatus(result);
      if (result.success) {
        setFormData({
          name: "", email: "", phone: "", checkIn: "", checkOut: "",
          guests: 2, roomType: "", message: "",
        });
      }
    } catch {
      setSubmitStatus({ success: false, message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mapUrl = `https://maps.google.com/maps?q=${settings.mapLat},${settings.mapLng}&z=15&output=embed`;

  return (
    <section id="contact" className="section-padding bg-charcoal text-luxury-white relative">
      <div className="absolute inset-0 texture-overlay" />
      <div className="container-luxury relative">
        <SectionHeading
          subtitle="Get In Touch"
          title="Make a Reservation"
          description="Allow us to craft your perfect stay. Fill out the form below and our concierge team will respond within 24 hours."
          light
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <FadeIn direction="left">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-warm-beige/70 mb-2">Full Name *</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-charcoal-light border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-warm-beige/70 mb-2">Email *</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-charcoal-light border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm text-warm-beige/70 mb-2">Phone *</label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-charcoal-light border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm text-warm-beige/70 mb-2">Guests</label>
                  <select
                    id="guests"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                    className="w-full bg-charcoal-light border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="checkIn" className="block text-sm text-warm-beige/70 mb-2">Check-in Date</label>
                  <input
                    id="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                    className="w-full bg-charcoal-light border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
                  />
                </div>
                <div>
                  <label htmlFor="checkOut" className="block text-sm text-warm-beige/70 mb-2">Check-out Date</label>
                  <input
                    id="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                    className="w-full bg-charcoal-light border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="roomType" className="block text-sm text-warm-beige/70 mb-2">Room Preference</label>
                <select
                  id="roomType"
                  value={formData.roomType}
                  onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                  className="w-full bg-charcoal-light border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne min-h-[48px]"
                >
                  <option value="">Select Room Type</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="executive">Executive</option>
                  <option value="premium">Premium</option>
                  <option value="suite">Suite</option>
                  <option value="family">Family Room</option>
                  <option value="presidential">Presidential Suite</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-warm-beige/70 mb-2">Special Requests</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-charcoal-light border border-warm-beige/20 px-4 py-3.5 text-base text-luxury-white focus:outline-none focus:border-champagne resize-none min-h-[120px]"
                />
              </div>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 p-4 ${submitStatus.success ? "bg-forest/20 text-forest-light" : "bg-red-900/20 text-red-300"}`}
                >
                  {submitStatus.success && <CheckCircle size={18} />}
                  {submitStatus.message}
                </motion.div>
              )}

              <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Submitting..." : (
                  <>Submit Enquiry <Send size={16} className="ml-2" /></>
                )}
              </Button>
            </form>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-8">
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  src={mapUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel location"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { icon: Phone, label: "Phone", value: settings.phone, href: `tel:${settings.phone}` },
                  { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
                  { icon: MapPin, label: "Address", value: settings.address },
                  { icon: Clock, label: "Hours", value: settings.workingHours },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <item.icon size={20} className="text-champagne mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-warm-beige/60">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm sm:text-base text-luxury-white hover:text-champagne transition-colors break-words">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base text-luxury-white break-words">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
