import React from 'react';
import { TESTIMONIALS } from '../data/mock';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative bg-[#0a0f1a] py-24 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-12">
        <div className="section-tag mb-5">Voices from operations</div>
        <h2 className="font-display text-[36px] lg:text-[48px] leading-[1.05] font-medium tracking-[-0.025em] text-[#f5efe1] max-w-2xl">
          The people who route <span className="italic text-amber-grad">the Kingdom&rsquo;s hardest lanes.</span>
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0f1a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0f1a] to-transparent z-10" />
        <div className="flex gap-4 marquee-track">
          {doubled.map((t, i) => (
            <article key={i} className="shrink-0 w-[380px] md:w-[440px] glass p-8 relative">
              <Quote size={22} className="text-[#f5b840]/60" />
              <p className="text-[15px] text-[#f5efe1] mt-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-1 mt-5">
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={13} className="fill-[#f5b840] text-[#f5b840]" />)}
              </div>
              <div className="mt-5 pt-5 border-t border-white/8">
                <div className="font-display text-[15px] font-medium text-[#f5efe1]">{t.name}</div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391] mt-1">{t.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
