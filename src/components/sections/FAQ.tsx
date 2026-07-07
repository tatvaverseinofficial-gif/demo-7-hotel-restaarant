"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/ui/Animations";
import type { FAQ } from "@/types";

export function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  return (
    <section id="faq" className="section-padding bg-luxury-white">
      <div className="container-luxury max-w-3xl">
        <SectionHeading
          subtitle="Questions & Answers"
          title="Frequently Asked Questions"
          description="Find answers to common questions about your stay at Grand Imperial Palace."
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={faq.id} delay={index * 0.05}>
              <div className="border border-warm-beige">
                <button
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-warm-beige/20 transition-colors min-h-[56px] touch-manipulation"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  aria-expanded={openId === faq.id}
                >
                  <span className="font-serif text-base sm:text-lg text-charcoal pr-4 min-w-0 break-words text-left">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-champagne shrink-0" size={20} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-charcoal/70 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
