"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="w-full text-foreground relative z-10 border-t border-border-subtle flex flex-col md:flex-row mt-16 bg-background">
      
      {/* Left Half */}
      <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-border-subtle relative min-h-[60vh] flex flex-col justify-between p-8 md:p-16 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-widest font-sans text-muted">Up Next</span>
        </motion.div>
        
        <motion.div 
          className="relative z-20"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: shouldReduceMotion ? 0 : 0.2 }}
        >
          <h2 className="font-serif text-5xl md:text-8xl leading-none">
            Portfolio
          </h2>
        </motion.div>

        {/* Slanted Image Overlay */}
        <motion.div 
          className="absolute right-0 top-0 w-1/2 h-full opacity-80 z-10"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%, 15% 50%)' }}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.1, x: shouldReduceMotion ? 0 : 50 }}
          whileInView={{ opacity: 0.8, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
            alt="Portfolio Next" 
            fill
            className="object-cover grayscale-[20%]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </motion.div>
      </div>

      {/* Right Half */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between min-h-[60vh]">
        
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <a href="mailto:info@adishdigital.com" className="font-serif text-3xl md:text-4xl hover:opacity-70 transition-opacity">
              info@adishdigital.com
            </a>
            <span className="text-xs uppercase tracking-widest font-sans text-muted">
              Based in Vienna & Bratislava
            </span>
          </div>

          <div className="flex flex-col items-end gap-3 text-sm font-sans tracking-wide">
            {['Explore', 'Portfolio', 'Stories', 'Services', 'About', 'Contact', 'Privacy', 'Terms', 'Cookies'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:opacity-70 transition-opacity py-2 min-h-[44px] flex items-center">
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Middle Section (Socials) */}
        <div className="flex gap-4 mt-16 mb-8">
          <a href="#" aria-label="Instagram" className="w-12 h-12 flex items-center justify-center border border-border-subtle rounded hover:bg-hover transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="w-12 h-12 flex items-center justify-center border border-border-subtle rounded hover:bg-hover transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-border-subtle mb-8"></div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-serif text-3xl italic font-light tracking-widest pr-4">Adish</span>
            <span className="text-xs text-muted font-sans tracking-widest hidden sm:inline-block">
              © 2026 Zoltán Imre / Adish Digital
            </span>
          </div>

          {/* Chat Button */}
          <button aria-label="Open chat" className="w-16 h-16 rounded-full border border-border-subtle flex items-center justify-center cursor-pointer hover:bg-hover transition-colors bg-background">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Copyright */}
        <div className="mt-4 sm:hidden">
          <span className="text-xs text-muted font-sans tracking-widest">
            © 2026 Zoltán Imre / Adish Digital
          </span>
        </div>

      </div>
    </footer>
  );
}
