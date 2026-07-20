import React from 'react';
import { PackageCheck, Zap, ArrowRight } from 'lucide-react';

export default function Specialized() {
  return (
    <section className="relative bg-[#0d1420] pb-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 items-end mb-10">
          <div className="lg:col-span-8">
            <h3 className="font-display text-[34px] lg:text-[42px] font-medium tracking-tight">
              Specialized <span className="italic text-[#e6a446]">Operations</span>
            </h3>
            <p className="font-arabic text-[15px] text-[#9a9585] mt-2">عمليات متخصصة</p>
            <p className="text-[15px] text-[#c9c1ab] mt-4 max-w-xl">Rapid response solutions for enterprise-grade requirements.</p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a href="#contact" className="btn-outline text-[13px]">Request All Services <ArrowRight size={14} /></a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { icon: PackageCheck, title: 'Pickup Services', desc: 'Scheduled and on-demand pickup from any location — including remote sites.', tags: ['Scheduled pickups', 'On-demand', 'Remote coverage'] },
            { icon: Zap, title: 'Express Services', desc: 'Time-critical deliveries with same-day and next-day options for urgent operations.', tags: ['Same-day delivery', 'Priority handling', 'Time-guaranteed'] }
          ].map((c) => (
            <div key={c.title} className="group relative bg-[#111a29] border border-white/5 p-8 overflow-hidden transition hover:border-[#e6a446]/40">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#e6a446]/5 blur-2xl group-hover:bg-[#e6a446]/10 transition" />
              <c.icon size={28} className="text-[#e6a446]" />
              <h4 className="font-display text-[24px] font-medium mt-5 text-[#f4ecdc]">{c.title}</h4>
              <p className="text-[14px] text-[#c9c1ab] mt-3 max-w-md leading-relaxed">{c.desc}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {c.tags.map((t) => (
                  <span key={t} className="text-[11px] tracking-wide uppercase text-[#e6a446] border border-[#e6a446]/30 px-3 py-1">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
