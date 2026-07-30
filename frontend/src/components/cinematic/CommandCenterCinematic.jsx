import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Truck, MapPin, Activity, Clock, TrendingUp } from 'lucide-react';

function Roll({ target, decimals = 0, active }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 2400, start = performance.now(); let raf;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString();
}

function Metric({ icon: Icon, value, unit, label, decimals = 0, trend, active, big }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={active ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      className="relative bg-white border border-[rgba(0,108,53,0.1)] p-6 rounded-xl group hover:border-[#006C35]/40 hover:shadow-lg hover:shadow-[#006C35]/8 transition-all duration-500">
      <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#006C35] group-hover:w-full transition-all duration-700 rounded-t-xl" />
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 border border-[#006C35]/25 bg-[#E8F5EE] flex items-center justify-center rounded-lg">
          <Icon size={18} className="text-[#006C35]" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#0D8A45] bg-[#E8F5EE] px-2 py-0.5 rounded-full">
            <TrendingUp size={11} /> {trend}
          </div>
        )}
      </div>
      <div className={`font-display font-medium text-[#0A1F14] mt-5 leading-none tracking-[-0.02em] ${big ? 'text-[40px] lg:text-[48px]' : 'text-[32px] lg:text-[40px]'}`}>
        <Roll target={value} decimals={decimals} active={active} />
        {unit && <span className="text-[#006C35] text-[22px] ml-0.5">{unit}</span>}
      </div>
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#5A6B62] mt-3">{label}</div>
    </motion.div>
  );
}

export default function CommandCenterCinematic() {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative bg-[#F0F7F4] py-24 border-y border-[rgba(0,108,53,0.08)] overflow-hidden">
      <div className="absolute inset-0 diagonal-lines opacity-50" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={active ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.7 }} 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="section-tag mb-4">Command Center · Live</div>
            <h2 className="font-display text-[34px] lg:text-[52px] leading-[1.05] font-medium tracking-[-0.03em] text-[#0A1F14]">
              The Kingdom in <span className="italic text-green-grad">real-time.</span>
            </h2>
          </div>
          <div className="font-mono text-[12px] text-[#5A6B62] flex items-center gap-3 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-[rgba(0,108,53,0.1)]">
            <span className="w-2 h-2 bg-[#0D8A45] rounded-full pulse-dot" />
            LAST SYNC · {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Metric active={active} icon={Package} value={6042518} label="Orders / year" trend="+18%" big />
          <Metric active={active} icon={Truck} value={190} label="Owned vehicles" unit="+" />
          <Metric active={active} icon={MapPin} value={25} label="Cities covered" unit="+" />
          <Metric active={active} icon={Activity} value={99.4} decimals={1} label="SLA rolling 30d" unit="%" />
          <Metric active={active} icon={Clock} value={42} label="Avg dispatch" unit="m" />
          <Metric active={active} icon={TrendingUp} value={500} label="Direct employees" unit="+" />
        </div>
      </div>
    </section>
  );
}
