import React, { useRef } from 'react';
import { SERVICES } from '../data/mock';
import { FileCheck2, Truck, PackageOpen, Bike, Building2, Zap, Warehouse, Users, Bus, ArrowUpRight } from 'lucide-react';

const ICONS = { FileCheck2, Truck, PackageOpen, Bike, Building2, Zap, Warehouse, Users, Bus };

function ServiceTile({ s }) {
  const ref = useRef(null);
  const Icon = ICONS[s.icon];

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    ref.current.style.setProperty('--mx', mx + '%');
    ref.current.style.setProperty('--my', my + '%');
  };

  return (
    <a href="#quote" ref={ref} onMouseMove={onMove} className="svc-tile group block p-7 relative min-h-[280px]">
      <div className="flex items-start justify-between relative z-10">
        <div className="w-12 h-12 border border-[#f5b840]/30 bg-[#f5b840]/5 flex items-center justify-center transition group-hover:bg-[#f5b840]/10">
          <Icon size={20} className="text-[#f5b840]" />
        </div>
        <div className="font-mono text-[10px] tracking-[0.28em] text-[#7d8391]">/{s.code}</div>
      </div>

      <div className="relative z-10 mt-8">
        <h3 className="font-display text-[24px] lg:text-[26px] font-medium text-[#f5efe1] leading-tight tracking-tight">{s.title}</h3>
        <p className="font-arabic text-[13px] text-[#7d8391] mt-1">{s.ar}</p>
        <p className="text-[13.5px] text-[#c9c1ab] mt-3 leading-relaxed">{s.desc}</p>
      </div>

      <div className="absolute bottom-6 left-7 right-7 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {s.tags.map((t) => (
            <span key={t} className="font-mono text-[10px] tracking-wider text-[#f5b840]/80 border border-[#f5b840]/25 px-2 py-0.5">{t}</span>
          ))}
        </div>
        <ArrowUpRight size={16} className="text-[#7d8391] group-hover:text-[#f5b840] group-hover:-translate-y-1 group-hover:translate-x-1 transition" />
      </div>
    </a>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-[#050810] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-7">
            <div className="section-tag mb-6">01 · Capability Matrix</div>
            <h2 className="font-display text-[44px] lg:text-[64px] leading-[1.02] font-medium tracking-[-0.025em] text-[#f5efe1]">
              Every logistics <br />
              function, <span className="italic text-amber-grad">one operator.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <div className="border-l-2 border-[#f5b840] pl-6">
              <p className="text-[16px] text-[#c9c1ab] leading-relaxed">
                Nine core services delivered on infrastructure we own end-to-end. From the port of entry to your customer&rsquo;s doorstep — no brokers, no handoffs, no excuses.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s) => <ServiceTile key={s.id} s={s} />)}
        </div>
      </div>
    </section>
  );
}
