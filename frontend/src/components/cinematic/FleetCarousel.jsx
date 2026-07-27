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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const next = () => setActive((active + 1) % FLEET.length);
  const prev = () => setActive((active - 1 + FLEET.length) % FLEET.length);

  const v = FLEET[active];

  return (
    <section ref={ref} className="relative bg-[#F7FAF8] py-28 lg:py-36 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-[#006C35]/6 rounded-full blur-3xl" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="section-tag mb-4">The Fleet · 190+ Owned Vehicles</div>
            <h2 className="font-display text-[38px] lg:text-[58px] font-medium text-[#0A1F14] tracking-[-0.03em] leading-[1.05]">
              Right vehicle. <br /><span className="italic text-green-grad">Every payload.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={prev} className="w-12 h-12 border border-[rgba(0,108,53,0.2)] hover:border-[#006C35] hover:bg-[#E8F5EE] hover:text-[#006C35] text-[#5A6B62] flex items-center justify-center transition rounded-lg"><ChevronLeft size={18} /></button>
            <button onClick={next} className="w-12 h-12 border border-[rgba(0,108,53,0.2)] hover:border-[#006C35] hover:bg-[#E8F5EE] hover:text-[#006C35] text-[#5A6B62] flex items-center justify-center transition rounded-lg"><ChevronRight size={18} /></button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div 
              key={active} 
              initial={{ opacity: 0, scale: 0.96, rotateY: -12 }} 
              animate={{ opacity: 1, scale: 1, rotateY: 0 }} 
              transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }} 
              className="relative aspect-[16/10] overflow-hidden border border-[rgba(0,108,53,0.12)] rounded-2xl group shadow-lg shadow-[#006C35]/5" 
              style={{ perspective: 1000 }}>
              <img src={v.img} alt={v.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F14]/90 via-[#0A1F14]/30 to-transparent" />
              <div className="absolute top-0 left-0 w-14 h-14 border-l-2 border-t-2 border-[#006C35]" />
              <div className="absolute bottom-0 right-0 w-14 h-14 border-r-2 border-b-2 border-[#006C35]" />
              <div className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.2em] uppercase text-white bg-[#006C35] px-3 py-1.5 rounded-md">{v.short}</div>
              <div className="absolute bottom-6 left-6">
                <div className="font-display text-[68px] lg:text-[100px] font-medium text-white/90 leading-none">{v.count}</div>
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/70 -mt-1">vehicles in fleet</div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div key={active + 'text'} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, delay: 0.1 }}>
              <div className="flex items-center gap-3">
                <div className="font-display text-[42px] text-[#006C35]/30 leading-none">/{v.code}</div>
                <v.icon size={26} className="text-[#006C35]" />
              </div>
              <h3 className="font-display text-[34px] lg:text-[42px] font-medium text-[#0A1F14] leading-tight tracking-tight mt-4">{v.name}</h3>
              <div className="grid grid-cols-2 gap-3 mt-8">
                <div className="border border-[rgba(0,108,53,0.12)] bg-white p-4 rounded-xl">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5A6B62]">Capacity</div>
                  <div className="font-display text-[20px] text-[#0A1F14] mt-1">{v.capacity}</div>
                </div>
                <div className="border border-[#006C35]/30 bg-[#E8F5EE] p-4 rounded-xl">
                  <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#006C35]">Live Units</div>
                  <div className="font-display text-[20px] text-[#006C35] mt-1">{v.count}</div>
                </div>
              </div>
              <p className="text-[15px] text-[#5A6B62] mt-6 leading-relaxed">{v.use}</p>
            </motion.div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-3 mt-12">
          {FLEET.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`h-[3px] transition-all rounded-full ${i === active ? 'w-14 bg-[#006C35]' : 'w-7 bg-[rgba(0,108,53,0.2)] hover:bg-[rgba(0,108,53,0.4)]'}`} />
          ))}
          <div className="ml-auto font-mono text-[11px] tracking-[0.2em] uppercase text-[#5A6B62]">{active + 1} / {FLEET.length}</div>
        </div>
      </div>
    </section>
  );
}
