import React from 'react';
import { ADVANTAGES } from '../data/mock';
import { Flag, Building2, Zap, ShieldCheck, Briefcase, Radio } from 'lucide-react';

const ICONS = { Flag, Building2, Zap, ShieldCheck, Briefcase, Radio };

export default function Advantage() {
  return (
    <section className="relative bg-[#111a29] border-y border-white/5 py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag mb-6 justify-center inline-flex">Advantage <span className="font-arabic text-[13px] tracking-normal text-[#9a9585] normal-case">التميز التنافسي</span></div>
          <h2 className="font-display text-[42px] lg:text-[56px] leading-[1.02] font-medium tracking-[-0.02em]">
            The <span className="italic text-[#e6a446]">Operator&rsquo;s</span> Edge
          </h2>
          <p className="font-arabic text-[15px] text-[#9a9585] mt-3">أفضلية المشغّل التشغيلي</p>
          <p className="text-[15px] text-[#c9c1ab] mt-5">We deliver the reliability that only true asset ownership can provide.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADVANTAGES.map((a) => {
            const Icon = ICONS[a.icon];
            return (
              <div key={a.title} className="group relative border border-white/5 bg-[#0d1420] p-8 hover:border-[#e6a446]/30 transition">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e6a446]/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="w-12 h-12 border border-[#e6a446]/30 bg-[#e6a446]/5 flex items-center justify-center">
                  <Icon size={20} className="text-[#e6a446]" />
                </div>
                <h4 className="font-display text-[24px] font-medium mt-6 text-[#f4ecdc] leading-tight">{a.title}</h4>
                <p className="font-arabic text-[13px] text-[#9a9585] mt-1">{a.titleAr}</p>
                <p className="text-[13px] text-[#c9c1ab] mt-4 leading-relaxed">{a.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
