import React from 'react';
import { ADVANTAGES } from '../data/mock';
import { Flag, Building2, Zap, ShieldCheck, Briefcase, Radio, Award } from 'lucide-react';

const ICONS = { Flag, Building2, Zap, ShieldCheck, Briefcase, Radio, Award };

export default function Advantage() {
  return (
    <section className="relative bg-[#0a0f1a] border-y border-white/5 py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag mb-5 justify-center inline-flex">The Operator&rsquo;s Edge</div>
          <h2 className="font-display text-[42px] lg:text-[56px] leading-[1.05] font-medium tracking-[-0.025em] text-[#f5efe1]">
            Why the Kingdom&rsquo;s <br /> <span className="italic text-amber-grad">largest brands route through us.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADVANTAGES.map((a) => {
            const Icon = ICONS[a.icon];
            return (
              <div key={a.title} className="group relative border border-white/8 bg-[#050810] p-8 hover:border-[#f5b840]/30 transition">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#f5b840]/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="w-12 h-12 border border-[#f5b840]/30 bg-[#f5b840]/5 flex items-center justify-center">
                  <Icon size={20} className="text-[#f5b840]" />
                </div>
                <h4 className="font-display text-[22px] font-medium mt-6 text-[#f5efe1] leading-tight">{a.title}</h4>
                <p className="text-[13.5px] text-[#c9c1ab] mt-3 leading-relaxed">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
