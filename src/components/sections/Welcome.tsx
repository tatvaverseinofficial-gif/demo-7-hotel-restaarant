"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn, AnimatedCounter } from "@/components/ui/Animations";
import { IMAGES } from "@/lib/images";
import type { HomepageSettings } from "@/types";

const stats = [
  { value: 100, suffix: "+", label: "Luxury Rooms" },
  { value: 5, suffix: "", label: "Star Rating" },
  { value: 98, suffix: "+", label: "Years Legacy" },
];

export function WelcomeSection({ settings }: { settings: HomepageSettings }) {
  return (
    <section id="about" className="section-padding bg-luxury-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-warm-beige/20 -skew-x-12 translate-x-1/4 pointer-events-none hidden md:block" />

      <div className="container-luxury relative">
        <SectionHeading
          subtitle="Welcome"
          title={settings.welcomeTitle}
          description={settings.welcomeText}
        />

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center mt-4">
          <FadeIn direction="up" className="w-full">
            <div className="relative w-full">
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] min-h-[320px] sm:min-h-[400px] overflow-hidden shadow-luxury-lg bg-warm-beige/40">
                <SafeImage
                  src={IMAGES.about}
                  alt="Elegant hotel interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 w-full h-full border border-champagne/40 -z-10 hidden sm:block pointer-events-none" />
              <div className="absolute top-3 left-3 sm:-top-4 sm:-left-4 bg-champagne text-charcoal px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm tracking-widest uppercase shadow-luxury z-10">
                Est. 1925
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15}>
            <div className="space-y-6 sm:space-y-8">
              {[
                { title: settings.aboutTitle, text: settings.aboutText },
                { title: "Our Heritage", text: settings.heritageText },
                { title: "Our Mission", text: settings.missionText },
              ].map((block) => (
                <div key={block.title} className="group">
                  <h3 className="text-lg sm:text-xl font-serif text-charcoal mb-2 sm:mb-3 flex items-center gap-3">
                    <span className="w-6 h-px bg-champagne group-hover:w-10 transition-all duration-500 shrink-0" />
                    {block.title}
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/65 leading-relaxed pl-0 sm:pl-9">{block.text}</p>
                </div>
              ))}

              <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-warm-beige">
                {stats.map((stat, i) => (
                  <FadeIn key={stat.label} delay={0.2 + i * 0.1}>
                    <div className="text-center px-2">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-serif text-champagne block">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </span>
                      <p className="text-xs sm:text-sm text-charcoal/55 mt-1 tracking-wide leading-snug">{stat.label}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
