"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const awards = [
    { year: "2025", title: "Awwwards Site of the Day", category: "Digital" },
    { year: "2024", title: "Dezeen Awards", category: "Interior Design" },
    { year: "2023", title: "ArchDaily Building of the Year", category: "Architecture" },
  ];

  return (
    <section id="about" className="w-full bg-background text-foreground px-8 md:px-16 py-12 md:py-16 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
        
        {/* Left: Section Title & Awards */}
        <div className="w-full md:w-1/3 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest font-sans text-muted mb-8 block">Our Philosophy</span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-12">
              Beyond<br/>the visual<br/>aesthetic.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex flex-col gap-6"
          >
            <span className="text-xs uppercase tracking-widest font-sans text-muted mb-2">Recognition</span>
            {awards.map((award, i) => (
              <div key={i} className="flex justify-between items-center border-b border-border-subtle pb-4">
                <span className="font-sans text-sm">{award.title}</span>
                <span className="font-sans text-xs text-muted">{award.year}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Body Text */}
        <div className="w-full md:w-2/3 flex flex-col gap-8 md:gap-12 md:pt-16">
          <motion.p 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl md:text-4xl leading-relaxed md:leading-normal"
          >
            We believe that every physical space holds a profound narrative waiting to be built. At Adish Architecture, our mission is to shape the future of the built environment through forward-thinking design, sustainable practices, and meticulous master planning.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans text-base md:text-lg opacity-70 leading-relaxed max-w-2xl"
          >
            By bridging the gap between innovative architectural forms and human-centric design principles, we provide our clients with spaces that inspire and endure. From initial conceptual blueprints to the final structural execution, our approach is defined by precision, respect for context, and an unwavering commitment to spatial beauty.
          </motion.p>
        </div>

      </div>
    </section>
  );
}
