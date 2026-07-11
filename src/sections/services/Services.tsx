"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const services = [
  {
    title: "Master Planning & Urban Design",
    description: "Designing comprehensive, scalable blueprints for large-scale developments. We prioritize community flow, environmental integration, and sustainable urban growth.",
    number: "01"
  },
  {
    title: "Commercial Architecture",
    description: "Creating iconic corporate and retail spaces that balance striking aesthetics with robust structural functionality and brand identity.",
    number: "02"
  },
  {
    title: "Residential & Bespoke Homes",
    description: "Crafting intimate, highly-personalized living spaces. We merge modern architectural forms with the unique lifestyle needs of our private clientele.",
    number: "03"
  },
  {
    title: "Interior Architecture",
    description: "Engineering the spatial experience inside the walls. From bespoke millwork to intelligent lighting design, we ensure the interior matches the ambition of the exterior.",
    number: "04"
  }
];

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="w-full bg-foreground text-background px-8 md:px-16 py-12 md:py-16 relative z-10">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left Side: Title */}
        <div className="w-full md:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="sticky top-32"
          >
            <span className="text-xs uppercase tracking-widest font-sans opacity-50 mb-8 block">Our Expertise</span>
            <h2 className="font-serif text-5xl md:text-7xl leading-none">
              Services &<br/>Disciplines
            </h2>
          </motion.div>
        </div>

        {/* Right Side: Accordion */}
        <div className="w-full md:w-2/3 flex flex-col">
          {services.map((service, index) => {
            const isExpanded = expandedIndex === index;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="border-b border-background/20"
              >
                {/* Accordion Header */}
                <button 
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full py-8 md:py-12 flex items-center justify-between group text-left outline-none focus-visible:ring-2 focus-visible:ring-background/50"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-8 md:gap-16">
                    <span className="font-sans text-xs opacity-50 pt-2">{service.number}</span>
                    <h3 className="font-serif text-3xl md:text-5xl group-hover:opacity-70 transition-opacity">
                      {service.title}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-background/20 flex items-center justify-center shrink-0 transition-transform duration-500" style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 md:pb-16 pl-16 md:pl-28 pr-4">
                        <p className="font-sans text-base md:text-lg opacity-80 leading-relaxed max-w-xl">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            )
          })}
        </div>

      </div>

    </section>
  );
}
