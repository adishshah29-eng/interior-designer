"use client";

import React from 'react';
import Image from 'next/image';
import { InkReveal } from '../../components/ui/ink-reveal';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-background">
      {/* Bottom layer: Background image and text (Revealed by ink wipe) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/bg-image.png"
          alt="Revealed background"
          fill
          priority
          className="object-cover"
        />
        
        {/* Hero Text Overlaid on the background image (so it's hidden by the cover layer initially) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground font-serif tracking-widest pointer-events-none z-10">
          <h1 className="text-7xl md:text-[10vw] leading-none text-center mix-blend-overlay">
            Adish<br/>
            <span className="text-2xl md:text-[3vw] block mt-2">Architecture</span>
          </h1>
        </div>

        {/* Contrast overlay for Navbar text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80 pointer-events-none z-10" aria-hidden="true" />
      </div>

      {/* Top layer: InkReveal component containing the "wiped away" cover image */}
      <div className="absolute inset-0 z-20 w-full h-full">
        <InkReveal
          coverImageSrc="/assets/cover-image.png"
          stampRadius={120}
          lifetime={2000}
        />
      </div>
    </section>
  );
}
