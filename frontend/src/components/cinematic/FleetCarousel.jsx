import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Truck, Snowflake, Package, Bike, ChevronLeft, ChevronRight } from 'lucide-react';

const FLEET = [
  { code: '01', name: 'Rider Bikes', short: 'Express', count: 42, capacity: '25 kg', use: '2-6 hour intra-city express delivery', icon: Bike, img: 'https://images.pexels.com/photos/14053428/pexels-photo-14053428.jpeg' },
  { code: '02', name: '2-Ton Cargo Vans', short: 'Light Fleet', count: 62, capacity: '1,500 kg', use: 'Last-mile B2C, express parcels, distribution', icon: Package, img: 'https://images.unsplash.com/photo-1601912552080-0fb89fd08042' },
  { code: '03', name: '3-Ton Box Trucks', short: 'Medium Fleet', count: 44, capacity: '3,000 kg', use: 'Urban B2B branch distribution, mid-volume', icon: Truck, img: 'https://images.pexels.com/photos/5410923/pexels-photo-5410923.jpeg' },
  { code: '04', name: '10-Ton Curtain Sider', short: 'Heavy Fleet', count: 21, capacity: '10,000 kg', use: 'Regional linehaul & cross-city bulk cargo', icon: Truck, img: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242' },
  { code: '05', name: '40ft Reefer Trailer', short: 'Cold Chain', count: 12, capacity: '24,000 kg', use: 'Temperature-controlled pharma & FMCG', icon: Snowflake, img: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e' }
];

export default function FleetCarousel() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const next = () => setActive((active + 1) % FLEET.length);
  const prev = () => setActive((active - 1 + FLEET.length) % FLEET.length);

  const v = FLEET[active];

  return (
    <section ref={ref} className="relative bg-[#050810] py-32 lg:py-40 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#f5b840]/8 rounded-full blur-3xl" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="section-tag mb-4">The Fleet · 190+ Owned Vehicles</div>
            <h2 className="font-display text-[42px] lg:text-[64px] font-medium text-[#f5efe1] tracking-[-0.03em] leading-[1.02]">
              Right vehicle. <br /><span className="italic text-amber-grad">Every payload.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev} className="w-12 h-12 border border-white/10 hover:border-[#f5b840] hover:text-[#f5b840] text-[#c9c1ab] flex items-center justify-center transition"><ChevronLeft size={18} /></button>
            <button onClick={next} className="w-12 h-12 border border-white/10 hover:border-[#f5b840] hover:text-[#f5b840] text-[#c9c1ab] flex items-center justify-center transition"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div key={active} initial={{ opacity: 0, scale: 0.95, rotateY: -20 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }} className="relative aspect-[16/10] overflow-hidden border border-white/10 group" style={{ perspective: 1000 }}>
              <img src={v.img} alt={v.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[#050810]/40 to-transparent" />
              <div className="absolute inset-0 bg-grid opacity-20 mix-blend-overlay" />
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#f5b840]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#f5b840]" />
              <div className="absolute top-6 left-6 font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840] bg-[#050810]/70 border border-[#f5b840]/30 px-3 py-1.5">{v.short}</div>
              <div className="absolute bottom-6 left-6">
                <div className="font-display text-[76px] lg:text-[120px] font-medium text-[#f5b840]/80 leading-none">{v.count}</div>
                <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#c9c1ab] -mt-1">vehicles in fleet</div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div key={active + 'text'} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="flex items-center gap-3">
                <div className="font-display text-[48px] text-[#f5b840]/40 leading-none">/{v.code}</div>
                <v.icon size={28} className="text-[#f5b840]" />
              </div>
              <h3 className="font-display text-[38px] lg:text-[46px] font-medium text-[#f5efe1] leading-tight tracking-tight mt-4">{v.name}</h3>
              <div className="grid grid-cols-2 gap-3 mt-8">
                <div className="border border-white/8 bg-[#0a0f1a] p-4"><div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Capacity</div><div className="font-display text-[22px] text-[#f5efe1] mt-1">{v.capacity}</div></div>
                <div className="border border-[#f5b840]/40 bg-[#f5b840]/5 p-4"><div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840]">Live Units</div><div className="font-display text-[22px] text-[#f5b840] mt-1">{v.count}</div></div>
              </div>
              <p className="text-[14.5px] text-[#c9c1ab] mt-6 leading-relaxed">{v.use}</p>
            </motion.div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-3 mt-12">
          {FLEET.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-[3px] transition-all ${i === active ? 'w-16 bg-[#f5b840]' : 'w-8 bg-white/10 hover:bg-white/25'}`} />
          ))}
          <div className="ml-auto font-mono text-[11px] tracking-[0.24em] uppercase text-[#7d8391]">{active + 1} / {FLEET.length}</div>
        </div>
      </div>
    </section>
  );
}
