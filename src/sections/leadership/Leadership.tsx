import React from 'react';
import Image from 'next/image';

const team = [
  {
    name: 'Eleanor Vance',
    role: 'Principal Architect',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    quote: '"Architecture is the thoughtful making of space."'
  },
  {
    name: 'Julian Black',
    role: 'Head of Interiors',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop',
    quote: '"Details are not the details, they make the design."'
  },
  {
    name: 'Sarah Chen',
    role: 'Master Planner',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop',
    quote: '"We build the cities of tomorrow, today."'
  }
];

export default function Leadership() {
  return (
    <section className="py-12 md:py-16 px-8 md:px-16 bg-background relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16 text-center md:text-left">
          <h2 className="text-[10px] uppercase tracking-[0.3em] mb-6 opacity-70 font-sans">
            The Minds
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl leading-tight">
            Driven by visionaries.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {team.map((person, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col">
              <div className="w-full aspect-[3/4] relative overflow-hidden mb-6 rounded-sm">
                <Image 
                  src={person.image} 
                  alt={person.name} 
                  fill 
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Quote Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8 text-center">
                  <p className="font-serif text-xl md:text-2xl italic text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {person.quote}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors">
                <h4 className="font-serif text-2xl mb-1">{person.name}</h4>
                <span className="font-sans text-xs uppercase tracking-widest opacity-50">{person.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
