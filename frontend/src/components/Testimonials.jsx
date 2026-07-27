import React from 'react';
import { TESTIMONIALS } from '../data/mock';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative bg-[#F7FAF8] py-24 border-y border-[rgba(0,108,53,0.08)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-12">
        <div className="section-tag mb-5">Voices from operations</div>
        <h2 className="font-display text-[34px] lg:text-[46px] leading-[1.08] font-medium tracking-[-0.025em] text-[#0A1F14] max-w-2xl">
          The people who route <span className="italic text-green-grad">the Kingdom&rsquo;s hardest lanes.</span>
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F7FAF8] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F7FAF8] to-transparent z-10" />
        <div className="flex gap-4 marquee-track">
          {doubled.map((t, i) => (
            <article key={i} className="shrink-0 w-[360px] md:w-[420px] bg-white border border-[rgba(0,108,53,0.1)] p-7 rounded-2xl relative shadow-sm">
              <Quote size={20} className="text-[#006C35]/50" />
              <p className="text-[15px] text-[#0A1F14] mt-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-1 mt-5">
                {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={13} className="fill-[#B8860B] text-[#B8860B]" />)}
              </div>
              <div className="mt-5 pt-5 border-t border-[rgba(0,108,53,0.08)]">
                <div className="font-display text-[15px] font-medium text-[#0A1F14]">{t.name}</div>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#5A6B62] mt-1">{t.role}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
