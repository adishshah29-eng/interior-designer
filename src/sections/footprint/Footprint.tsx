import React from 'react';
import InteractiveMap from '../../components/InteractiveMap';

export default function Footprint() {
  return (
    <section className="py-12 md:py-16 px-8 md:px-16 bg-background relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] uppercase tracking-[0.3em] mb-6 opacity-70 font-sans">
              Global Presence
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              Designing without <br className="hidden md:block"/>
              <span className="italic opacity-80">borders.</span>
            </h3>
          </div>
          
          <p className="max-w-sm text-sm font-sans opacity-70 leading-relaxed pb-2">
            Our architectural footprint spans across continents. From luxury high-rises in New York to bespoke villas in Dubai, we bring our distinct vision to the world's most dynamic cities.
          </p>
        </div>

        <InteractiveMap />
      </div>
    </section>
  );
}
