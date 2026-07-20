import React from 'react';
import { REMOTE_REGIONS } from '../data/mock';
import { Mountain, MapPin, CloudLightning, Route, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export default function ScaleReach() {
  return (
    <section className="relative bg-[#0d1420] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <div className="section-tag mb-6">Scale &amp; Reach <span className="font-arabic text-[13px] tracking-normal text-[#9a9585] normal-case">الإمداد والمدى</span></div>
            <h2 className="font-display text-[42px] lg:text-[58px] leading-[1.02] font-medium tracking-[-0.02em]">
              We Deliver Where <br />
              <span className="italic">Others Hesitate.</span>
            </h2>
            <p className="font-arabic text-[16px] text-[#9a9585] mt-4">نوصل حيث لا يجرئ الآخرون</p>
            <p className="text-[15px] text-[#c9c1ab] mt-6 leading-relaxed">
              The Kingdom is vast, and many operators stay within major hubs. We specialize in hard-to-reach locations with dedicated infrastructure that ensures your operations never stop.
            </p>

            <div className="mt-8 border-l-2 border-[#e6a446] pl-5">
              <div className="text-[11px] tracking-[0.24em] uppercase text-[#e6a446] font-semibold mb-4">Active Remote Regions:</div>
              <div className="flex flex-wrap gap-2">
                {REMOTE_REGIONS.map((r) => (
                  <span key={r} className="text-[12px] text-[#d9d2bf] border border-white/10 bg-[#111a29] px-3 py-1.5 hover:border-[#e6a446]/40 transition">{r}</span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <div className="inline-flex items-center gap-2 border border-[#e6a446]/30 bg-[#e6a446]/5 px-4 py-2">
                <Clock size={14} className="text-[#e6a446]" />
                <span className="text-[12px] tracking-wider text-[#f4ecdc]">24-72h Remote Delivery</span>
              </div>
              <div className="inline-flex items-center gap-2 border border-white/10 bg-[#111a29] px-4 py-2">
                <ShieldCheck size={14} className="text-[#e6a446]" />
                <span className="text-[12px] tracking-wider text-[#f4ecdc]">Fully Insured</span>
              </div>
            </div>

            <a href="#contact" className="btn-green mt-8 text-[13px]">Discuss Remote Logistics <ArrowRight size={14} /></a>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              { icon: Mountain, title: 'Extreme Terrain Coverage', desc: 'Specialized fleet navigating the most challenging terrains — from mountains to deep desert.' },
              { icon: MapPin, title: 'Remote City Warehouses', desc: 'Strategic warehouses in remote cities ensure rapid deployment and reduced transit times.' },
              { icon: CloudLightning, title: 'All-Weather Operations', desc: 'Uninterrupted operations during sandstorms, extreme heat, or severe conditions.' },
              { icon: Route, title: 'Last-Mile Completion', desc: 'Bridging the gap where others stop, completing deliveries to isolated sites.' }
            ].map((c, i) => (
              <div key={i} className="group border border-white/5 bg-[#111a29] p-7 hover:border-[#e6a446]/30 transition relative overflow-hidden">
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#e6a446] group-hover:w-full transition-all duration-500" />
                <c.icon size={26} className="text-[#e6a446]" />
                <h4 className="font-display text-[22px] font-medium mt-5 text-[#f4ecdc] leading-tight">{c.title}</h4>
                <p className="text-[13px] text-[#c9c1ab] mt-3 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
