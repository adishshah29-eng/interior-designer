"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import MagneticButton from '../../components/ui/MagneticButton';

export default function FeaturedStories() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="stories" className="w-full min-h-screen bg-background text-foreground relative z-10 flex flex-col md:flex-row pt-12 md:pt-16">
      
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between">
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md mx-auto md:mx-0 flex flex-col items-center text-center md:items-start md:text-left"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs uppercase tracking-widest font-sans opacity-70">Featured Stories</span>
            <div className="w-12 h-[1px] bg-border-subtle"></div>
          </div>
          
          <h2 className="font-serif text-4xl md:text-7xl leading-[1.1] mb-8">
            Virtual<br />Renovation of<br />a Classic<br />Apartment
          </h2>

          <p className="font-sans text-sm md:text-base leading-relaxed opacity-70 mb-12">
            Experience the transformation of a historical space into a modern sanctuary, preserving its classical heritage while infusing contemporary design elements.
          </p>

          {/* Button */}
          <MagneticButton>
            <button aria-label="Browse all featured stories" className="flex items-center justify-center gap-6 group hover:opacity-70 transition-opacity">
              <div className="w-14 h-14 rounded-full border border-border-subtle flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <span className="text-sm font-sans tracking-wide uppercase">Browse all stories</span>
            </button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Right Column (Image) */}
      <motion.div 
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative p-8 md:p-16"
      >
        <div className="w-full h-full relative overflow-hidden rounded-sm">
          <Image 
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop" 
            alt="Virtual Renovation Interior" 
            fill
            className="object-cover object-center grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.div>

    </section>
  );
}
