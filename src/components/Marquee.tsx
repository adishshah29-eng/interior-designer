import React from 'react';
import Image from 'next/image';

export default function Marquee() {
  const textItems = [
    { text: "Adish Architecture", isTitle: true },
    { text: "Preserving the unique charm of faded properties", isTitle: false }
  ];

  // We duplicate the items enough times so that it naturally fills the screen twice
  // This allows the infinite scrolling animation to loop seamlessly.
  const allItems = [...textItems, ...textItems, ...textItems, ...textItems];

  return (
    <div className="w-full bg-background border-b border-border-subtle py-6 overflow-hidden flex relative z-10 select-none">
      <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused]">
        
        {/* We duplicate the entire list twice so that when the first block ends, the second is identical and seamless */}
        {[1, 2].map((listIdx) => (
          <div key={listIdx} className="flex shrink-0 items-center">
            {allItems.map((item, idx) => (
              <React.Fragment key={`${listIdx}-${idx}`}>
                <div 
                  className={`mx-8 whitespace-nowrap uppercase tracking-widest ${
                    item.isTitle ? "font-serif text-3xl italic" : "font-sans text-sm text-muted"
                  }`}
                >
                  {item.text}
                </div>
                
                <div className="mx-4 shrink-0 opacity-50 relative w-6 h-6">
                  <Image 
                    src="https://cdn.prod.website-files.com/632c01f3f2cd4fbaf994743b/678a179ed7dfe8140e08af8d_icon-decor-flower.svg"
                    alt="Flower Icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}

      </div>
    </div>
  );
}
