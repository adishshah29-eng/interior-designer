"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import MagneticButton from "./ui/MagneticButton";
import ContactDrawer from "./ContactDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > window.innerHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 100 && !isDrawerOpen && !isMobileMenuOpen) {
        if (currentScrollY > lastScrollY.current) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDrawerOpen, isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Stories', href: '#stories' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-40 px-8 md:px-16 transition-all duration-500 flex items-center justify-between text-foreground ${
          isScrolled 
            ? "bg-background py-4 border-b border-border-subtle shadow-lg pointer-events-auto" 
            : "bg-transparent py-5 mix-blend-difference pointer-events-none"
        } ${
          isHidden && !isMobileMenuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        
        {/* Left: Logo & Title */}
        <div className={`flex items-center gap-6 ${(!isScrolled || isMobileMenuOpen) && "pointer-events-auto"} relative z-50`}>
          <div className="font-serif italic text-2xl md:text-3xl pr-4">
            Adish
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="w-[1px] h-6 bg-border-subtle"></div>
            <div className="flex flex-col text-[9px] tracking-widest font-sans uppercase">
              <span>Architecture &</span>
              <span>Master Planning</span>
            </div>
          </div>
        </div>

        {/* Right: Links & Let's Talk Button */}
        <div className={`flex items-center gap-4 md:gap-8 ${(!isScrolled || isMobileMenuOpen) && "pointer-events-auto"} relative z-50`}>
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 font-sans text-xs tracking-wide mr-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:opacity-70 transition-opacity min-h-[48px] flex items-center">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <MagneticButton>
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="px-6 py-3 min-h-[48px] rounded-full border border-border-subtle font-sans text-xs uppercase tracking-widest hover:bg-hover transition-colors bg-black/20 backdrop-blur-sm pointer-events-auto"
              >
                Let's Talk
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 pointer-events-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-[1px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-6 h-[1px] bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-[1px] bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-background flex flex-col justify-center items-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-8 text-center w-full px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl w-full py-4 active:opacity-70 transition-opacity min-h-[64px] flex items-center justify-center"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      <ContactDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
