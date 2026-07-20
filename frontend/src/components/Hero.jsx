import React from 'react';
import { HERO_IMAGE } from '../data/mock';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden flex items-end pb-24 pt-32">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="warehouse" className="w-full h-full object-cover kenburns" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1420]/70 via-[#0d1420]/60 to-[#0d1420]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1420]/95 via-[#0d1420]/30 to-transparent" />
      </div>

      {/* Amber top strip */}
      <div className="absolute top-[74px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#e6a446]/70 via-[#e6a446]/20 to-transparent" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl fade-up">
          <div className="inline-flex items-center gap-3 border border-[#e6a446]/40 bg-[#0d1420]/50 backdrop-blur px-4 py-2 mb-10">
            <span className="w-1.5 h-1.5 bg-[#e6a446] rounded-full pulse-dot" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#e6a446] font-semibold">6 Million+ Orders Delivered &amp; Picked Across Saudi Arabia</span>
          </div>

          <h1 className="font-display text-[52px] sm:text-[64px] lg:text-[86px] leading-[0.98] font-medium text-[#f4ecdc] tracking-[-0.02em]">
            <span className="block">Conquering</span>
            <span className="block">the <span className="italic">Kingdom&rsquo;s</span></span>
            <span className="block">Harshest <span className="text-[#e6a446] italic">Terrains.</span></span>
          </h1>

          <p className="font-arabic text-[18px] text-[#c9c1ab] mt-8 leading-relaxed max-w-2xl">
            من الرياض إلى أقصى حدود المملكة — نمتلك البنية التحتية، ونملك الأسطول، ونوظف الكوادر. نحن أبر الأوطان.
          </p>

          <p className="text-[17px] text-[#d9d2bf]/85 mt-6 leading-relaxed max-w-2xl">
            A nationwide-scale infrastructure powerhouse. From our own warehouse network spanning major cities to remote regions, to skilled manpower and a dedicated delivery fleet — we reach where others cannot.
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#contact" className="btn-green group">
              Partner With Us
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#services" className="btn-outline">Explore Our Services</a>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 lg:left-10 flex items-center gap-3 text-[#9a9585]">
          <ChevronDown size={14} className="animate-bounce" />
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
