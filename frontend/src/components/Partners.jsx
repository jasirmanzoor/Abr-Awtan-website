import React from 'react';
import { PARTNERS } from '../data/mock';

function PartnerLogo({ p }) {
  return (
    <div className="shrink-0 w-[200px] h-[100px] mx-2 border border-[rgba(0,108,53,0.12)] bg-white rounded-xl flex items-center justify-center relative overflow-hidden group hover:border-[#006C35]/40 hover:shadow-md transition">
      <div className="font-display text-[22px] font-semibold text-[#0A1F14] tracking-wide group-hover:text-[#006C35] transition">{p.logo}</div>
    </div>
  );
}

export default function Partners() {
  const doubled = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section id="clients" className="relative bg-[#F0F7F4] py-24 border-y border-[rgba(0,108,53,0.08)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-12">
        <div className="section-tag mb-5">Trusted by industry leaders</div>
        <h2 className="font-display text-[34px] lg:text-[46px] leading-[1.08] font-medium tracking-[-0.025em] text-[#0A1F14] max-w-2xl">
          The backbone <span className="italic text-green-grad">for the Kingdom&rsquo;s biggest brands.</span>
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F0F7F4] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F0F7F4] to-transparent z-10" />
        <div className="flex marquee-track">
          {doubled.map((p, i) => <PartnerLogo key={i} p={p} />)}
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 mt-16">
        <div className="grid grid-cols-3 gap-6 border-t border-[rgba(0,108,53,0.1)] pt-10">
          {[
            { v: '8+', l: 'Enterprise Partners' },
            { v: '6M+', l: 'Annual Orders' },
            { v: '99.4%', l: 'SLA Achievement' }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-[40px] lg:text-[52px] font-medium text-[#006C35] leading-none">{s.v}</div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5A6B62] mt-3">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
