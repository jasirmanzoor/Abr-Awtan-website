import React from 'react';
import { PARTNERS } from '../data/mock';

function PartnerLogo({ p }) {
  return (
    <div className="shrink-0 w-[240px] h-[140px] mx-3 border border-white/5 bg-[#111a29] flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#e6a446]/30 transition">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#e6a446]/5 opacity-0 group-hover:opacity-100 transition" />
      <div className="font-display text-[28px] font-semibold text-[#f4ecdc] tracking-wide">{p.logo}</div>
      <div className="text-[10px] tracking-[0.24em] uppercase text-[#9a9585] mt-2">{p.category}</div>
    </div>
  );
}

export default function Partners() {
  const doubled = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
  return (
    <section id="clients" className="relative bg-[#0d1420] py-28 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-14">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <div className="section-tag mb-6">Trust <span className="font-arabic text-[13px] tracking-normal text-[#9a9585] normal-case">الثقة</span></div>
            <h2 className="font-display text-[42px] lg:text-[58px] leading-[1.02] font-medium tracking-[-0.02em]">
              The Backbone For <br />
              <span className="italic">Industry Leaders</span>
            </h2>
            <p className="font-arabic text-[16px] text-[#9a9585] mt-3">الدعامة المتينة لقادة الصناعة</p>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-[#c9c1ab] leading-relaxed">
              When global logistics leaders need reliable resources across Saudi Arabia, they partner with us. Real infrastructure. Real results. Real brands that trust our network.
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d1420] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d1420] to-transparent z-10" />
        <div className="flex marquee-track">
          {doubled.map((p, i) => <PartnerLogo key={i} p={p} />)}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mt-16">
        <div className="grid grid-cols-3 gap-6 border-t border-white/5 pt-10">
          {[
            { v: '4', l: 'Global Partners', lAr: 'شركاء عالميون' },
            { v: '6M+', l: 'Annual Orders', lAr: 'طلبات سنوية' },
            { v: '100%', l: 'SLA Met', lAr: 'تحقيق الالتزام' }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-[46px] lg:text-[58px] font-medium text-[#e6a446] leading-none">{s.v}</div>
              <div className="text-[11px] tracking-[0.24em] uppercase text-[#f4ecdc] mt-3">{s.l}</div>
              <div className="font-arabic text-[13px] text-[#9a9585] mt-1">{s.lAr}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
