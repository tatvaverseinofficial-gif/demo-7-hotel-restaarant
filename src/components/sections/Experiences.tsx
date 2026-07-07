"use client";

import { motion } from "framer-motion";
import { Heart, Briefcase, Cake, Palmtree, Users, Gem } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/Animations";
import type { Experience } from "@/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  heart: Heart,
  briefcase: Briefcase,
  cake: Cake,
  palmtree: Palmtree,
  users: Users,
  gem: Gem,
};

export function ExperiencesSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experiences" className="section-padding bg-warm-beige/25">
      <div className="container-luxury">
        <SectionHeading
          subtitle="Celebrate With Us"
          title="Signature Experiences"
          description="From intimate celebrations to grand events, we create unforgettable moments tailored to your vision."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {experiences.map((exp, index) => {
            const Icon = iconMap[exp.icon] || Heart;
            return (
              <FadeIn key={exp.id} delay={index * 0.1}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="bg-luxury-white shadow-luxury overflow-hidden group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SafeImage
                      src={exp.image}
                      alt={exp.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-champagne/90 flex items-center justify-center">
                        <Icon size={18} className="text-charcoal" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-serif text-charcoal mb-2">{exp.name}</h3>
                    <p className="text-charcoal/60 text-sm mb-4 line-clamp-3">{exp.description}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full sm:w-auto"
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Enquire Now
                    </Button>
                  </div>
                </motion.article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
