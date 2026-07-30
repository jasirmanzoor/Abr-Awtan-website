import React from 'react';
import { ADVANTAGES } from '../data/mock';
import { Flag, Building2, Zap, ShieldCheck, Briefcase, Radio, Award } from 'lucide-react';

const ICONS = { Flag, Building2, Zap, ShieldCheck, Briefcase, Radio, Award };

export default function Advantage() {
  return (
    <section className="relative bg-[#F0F7F4] border-y border-[rgba(0,108,53,0.08)] py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag mb-5 justify-center inline-flex">The Operator&rsquo;s Edge</div>
          <h2 className="font-display text-[38px] lg:text-[52px] leading-[1.08] font-medium tracking-[-0.025em] text-[#0A1F14]">
            Why the Kingdom&rsquo;s <br /> <span className="italic text-green-grad">largest brands route through us.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((a) => {
            const Icon = ICONS[a.icon];
            return (
              <div key={a.title} className="group relative border border-[rgba(0,108,53,0.12)] bg-white p-7 rounded-2xl hover:border-[#006C35]/35 hover:shadow-lg hover:shadow-[#006C35]/8 transition-all duration-400">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#006C35]/8 to-transparent opacity-0 group-hover:opacity-100 transition rounded-2xl" />
                <div className="w-12 h-12 border border-[#006C35]/25 bg-[#E8F5EE] flex items-center justify-center rounded-xl">
                  <Icon size={20} className="text-[#006C35]" />
                </div>
                <h4 className="font-display text-[20px] font-medium mt-6 text-[#0A1F14] leading-tight">{a.title}</h4>
                <p className="text-[13.5px] text-[#5A6B62] mt-3 leading-relaxed">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
