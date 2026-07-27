import React from 'react';
import { CASES } from '../data/mock';
import { ArrowUpRight } from 'lucide-react';

export default function CaseStudies() {
  return (
    <section id="cases" className="relative bg-[#F7FAF8] py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="section-tag mb-5">04 · Case Studies</div>
            <h2 className="font-display text-[38px] lg:text-[52px] leading-[1.08] font-medium tracking-[-0.025em] text-[#0A1F14]">
              Results, not <span className="italic text-green-grad">promises.</span>
            </h2>
          </div>
          <p className="max-w-md text-[15px] text-[#5A6B62] leading-relaxed">
            Selected deployments across e-commerce, government, and enterprise retail — measured, delivered, verifiable.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {CASES.map((c, i) => (
            <article key={i} className="group relative overflow-hidden border border-[rgba(0,108,53,0.12)] bg-white rounded-2xl hover:border-[#006C35]/35 hover:shadow-xl hover:shadow-[#006C35]/8 transition-all duration-500">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F14]/80 via-[#0A1F14]/20 to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-white bg-[#006C35] px-2.5 py-1 rounded-md">
                  {c.tag}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg">
                  <div className="font-display text-[20px] font-semibold text-[#006C35] leading-none">{c.metric}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[20px] font-medium text-[#0A1F14] leading-tight">{c.title}</h3>
                <p className="text-[13.5px] text-[#5A6B62] mt-3 leading-relaxed">{c.body}</p>
                <div className="flex items-center gap-2 mt-5 font-mono text-[11px] tracking-[0.18em] uppercase text-[#006C35] group-hover:gap-3 transition-all">
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
