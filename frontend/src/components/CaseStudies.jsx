import React from 'react';
import { CASES } from '../data/mock';
import { ArrowUpRight } from 'lucide-react';

export default function CaseStudies() {
  return (
    <section id="cases" className="relative bg-[#050810] py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="section-tag mb-5">04 · Case Studies</div>
            <h2 className="font-display text-[42px] lg:text-[56px] leading-[1.05] font-medium tracking-[-0.025em] text-[#f5efe1]">
              Results, not <span className="italic text-amber-grad">promises.</span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] text-[#c9c1ab] leading-relaxed">
            Selected deployments across e-commerce, government, and enterprise retail — measured, delivered, verifiable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {CASES.map((c, i) => (
            <article key={i} className="group relative overflow-hidden border border-white/8 bg-[#0a0f1a] hover:border-[#f5b840]/30 transition">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/30 to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840] bg-[#050810]/70 backdrop-blur border border-[#f5b840]/30 px-2.5 py-1">
                  {c.tag}
                </div>
                <div className="absolute bottom-4 right-4 glass px-3 py-2">
                  <div className="font-display text-[22px] font-semibold text-[#f5b840] leading-none">{c.metric}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[22px] font-medium text-[#f5efe1] leading-tight">{c.title}</h3>
                <p className="text-[13.5px] text-[#c9c1ab] mt-3 leading-relaxed">{c.body}</p>
                <div className="flex items-center gap-2 mt-5 font-mono text-[11px] tracking-[0.22em] uppercase text-[#f5b840] group-hover:gap-3 transition-all">
                  Read full study <ArrowUpRight size={14} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
