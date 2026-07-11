import React from 'react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';

export default function Transformation() {
  return (
    <section id="transformation" className="py-16 px-8 md:px-16 bg-background relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] uppercase tracking-[0.3em] mb-6 opacity-70 font-sans">
              The Process
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              From raw potential to <br className="hidden md:block"/>
              <span className="italic opacity-80">realized vision.</span>
            </h3>
          </div>
          
          <p className="max-w-sm text-sm font-sans opacity-70 leading-relaxed pb-2">
            Every masterpiece begins with constraint. We specialize in seeing the structural possibilities where others see limitations, turning dilapidated spaces into modern architectural landmarks.
          </p>
        </div>

        {/* Before / After Slider */}
        <div className="w-full max-w-5xl mx-auto mt-12" data-cursor="hover">
          <BeforeAfterSlider 
            beforeImage="/assets/bg-image.png" 
            afterImage="/assets/cover-image.png" 
            beforeLabel="Concept"
            afterLabel="Realization"
          />
        </div>
      </div>
    </section>
  );
}
