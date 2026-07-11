"use client";

import React, { useState, useEffect, useRef } from 'react';

import MagneticButton from "./ui/MagneticButton";
import ContactDrawer from "./ContactDrawer";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > window.innerHeight - 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 100 && !isDrawerOpen) {
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
  }, [isDrawerOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-40 px-8 md:px-16 transition-all duration-500 flex items-center justify-between text-foreground ${
          isScrolled 
            ? "bg-background py-4 border-b border-border-subtle shadow-lg pointer-events-auto" 
            : "bg-transparent py-5 mix-blend-difference pointer-events-none"
        } ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        
        {/* Left: Logo & Title */}
        <div className={`flex items-center gap-6 ${!isScrolled && "pointer-events-auto"}`}>
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
        <div className={`flex items-center gap-8 ${!isScrolled && "pointer-events-auto"}`}>
          {/* Links */}
          <div className="hidden lg:flex items-center gap-6 font-sans text-xs tracking-wide mr-4">
            <a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a>
            <a href="#stories" className="hover:opacity-70 transition-opacity">Stories</a>
            <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
            <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
          </div>

          <MagneticButton>
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="px-6 py-3 rounded-full border border-border-subtle font-sans text-xs uppercase tracking-widest hover:bg-hover transition-colors bg-black/20 backdrop-blur-sm pointer-events-auto"
            >
              Let's Talk
            </button>
          </MagneticButton>
        </div>
        
      </nav>

      <ContactDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
