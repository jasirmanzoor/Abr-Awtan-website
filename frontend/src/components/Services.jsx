import React from 'react';
import { SERVICES } from '../data/mock';
import { Warehouse, Users, Truck, Bus, ArrowRight } from 'lucide-react';

const ICONS = { Warehouse, Users, Truck, Bus };

export default function Services() {
  return (
    <section id="services" className="relative bg-[#0d1420] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7">
            <div className="section-tag mb-6">
              What We Operate
              <span className="font-arabic text-[13px] tracking-normal text-[#9a9585] normal-case">الخدمات التي نمتلكها ونقدمها</span>
            </div>
            <h2 className="font-display text-[42px] lg:text-[64px] leading-[1.02] font-medium tracking-[-0.02em]">
              Services We <br />
              <span className="italic">Own &amp; Deliver.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <div className="border-l-2 border-[#e6a446] pl-6">
              <p className="text-[16px] text-[#c9c1ab] leading-relaxed">
                Every service is powered by our own physical infrastructure — not outsourced, not brokered. We build, own, and operate the assets that move your business.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <article key={s.id} className="svc-card group relative overflow-hidden bg-[#111a29] border border-white/5 h-[460px]">
                <div className="absolute inset-0">
                  <img src={s.image} alt={s.title} className="svc-img w-full h-full object-cover opacity-55" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1420] via-[#0d1420]/70 to-[#0d1420]/30" />
                </div>

                <div className="relative h-full flex flex-col justify-between p-8">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 bg-[#0d1420]/70 border border-[#e6a446]/30 px-3 py-1.5">
                      <span className="w-1 h-1 bg-[#e6a446] rounded-full" />
                      <span className="text-[10px] tracking-[0.24em] uppercase text-[#e6a446] font-semibold">{s.tagline}</span>
                    </div>
                  </div>

                  <div>
                    <div className="w-11 h-11 bg-[#e6a446]/15 border border-[#e6a446]/30 flex items-center justify-center mb-5">
                      <Icon size={20} className="text-[#e6a446]" />
                    </div>
                    <h3 className="font-display text-[30px] font-medium leading-tight text-[#f4ecdc]">{s.title}</h3>
                    <p className="font-arabic text-[14px] text-[#9a9585] mt-1">{s.titleAr}</p>
                    <p className="text-[14px] text-[#c9c1ab] mt-3 leading-relaxed max-w-md">{s.description}</p>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
                      {s.bullets.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-[12px] text-[#d9d2bf]/80">
                          <span className="w-1 h-1 bg-[#e6a446] rounded-full" />
                          {b}
                        </div>
                      ))}
                    </div>

                    <a href="#contact" className="inline-flex items-center gap-2 mt-6 text-[12px] tracking-[0.22em] uppercase text-[#f4ecdc] border-b border-[#e6a446]/50 pb-1 hover:border-[#e6a446] transition">
                      Partner With Us <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
