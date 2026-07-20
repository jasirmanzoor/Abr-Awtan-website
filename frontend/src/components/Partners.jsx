import React from 'react';
import { PARTNERS } from '../data/mock';

function PartnerLogo({ p }) {
  return (
    <div className="shrink-0 w-[220px] h-[110px] mx-2 border border-white/8 bg-[#0a0f1a] flex items-center justify-center relative overflow-hidden group hover:border-[#f5b840]/30 transition">
      <div className="font-display text-[26px] font-semibold text-[#f5efe1] tracking-wide group-hover:text-[#f5b840] transition">{p.logo}</div>
    </div>
  );
}

export default function Partners() {
  const doubled = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section id="clients" className="relative bg-[#050810] py-24 border-y border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-12">
        <div className="section-tag mb-5">Trusted by industry leaders</div>
        <h2 className="font-display text-[36px] lg:text-[48px] leading-[1.05] font-medium tracking-[-0.025em] text-[#f5efe1] max-w-2xl">
          The backbone <span className="italic text-amber-grad">for the Kingdom&rsquo;s biggest brands.</span>
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050810] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050810] to-transparent z-10" />
        <div className="flex marquee-track">
          {doubled.map((p, i) => <PartnerLogo key={i} p={p} />)}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 mt-16">
        <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-10">
          {[
            { v: '8+', l: 'Enterprise Partners' },
            { v: '6M+', l: 'Annual Orders' },
            { v: '99.4%', l: 'SLA Achievement' }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-[42px] lg:text-[54px] font-medium text-[#f5b840] leading-none">{s.v}</div>
              <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5efe1] mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
