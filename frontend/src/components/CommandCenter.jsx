import React, { useEffect, useRef, useState } from 'react';
import { Activity, Truck, Package, Clock, TrendingUp, MapPin } from 'lucide-react';

function useCounter(target, active, decimals = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now(); const dur = 2200;
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return decimals ? v.toFixed(decimals) : Math.floor(v);
}

function Metric({ icon: Icon, label, value, unit, active, decimals = 0, format = 'plain', trend }) {
  const val = useCounter(value, active, decimals);
  const display = format === 'comma' ? Number(val).toLocaleString() : val;
  return (
    <div className="relative border border-white/8 bg-[#0a0f1a] p-6 group hover:border-[#f5b840]/30 transition">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#f5b840]/40 to-transparent" />
      <div className="flex items-start justify-between">
        <div className="w-9 h-9 border border-[#f5b840]/30 bg-[#f5b840]/5 flex items-center justify-center">
          <Icon size={16} className="text-[#f5b840]" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#22c55e]">
            <TrendingUp size={11} /> {trend}
          </div>
        )}
      </div>
      <div className="font-display text-[36px] lg:text-[42px] font-medium text-[#f5efe1] mt-5 leading-none tracking-[-0.02em]">
        {display}{unit && <span className="text-[#f5b840] text-[24px]">{unit}</span>}
      </div>
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391] mt-3">{label}</div>
    </div>
  );
}

export default function CommandCenter() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.2 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#050810] py-24 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 diagonal-lines opacity-40" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="section-tag mb-4">Command Center · Live</div>
            <h2 className="font-display text-[36px] lg:text-[52px] leading-[1.05] font-medium tracking-[-0.025em] text-[#f5efe1]">
              The Kingdom in <span className="italic text-amber-grad">real-time.</span>
            </h2>
          </div>
          <div className="font-mono text-[11px] text-[#7d8391] flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
            LAST SYNC · {new Date().toLocaleTimeString()}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Metric active={active} icon={Package} value={6042518} label="Orders / year" format="comma" trend="+18%" />
          <Metric active={active} icon={Truck} value={150} label="Owned vehicles" unit="+" />
          <Metric active={active} icon={MapPin} value={25} label="Cities covered" unit="+" />
          <Metric active={active} icon={Activity} value={99.4} decimals={1} label="SLA rolling 30d" unit="%" />
          <Metric active={active} icon={Clock} value={42} label="Avg dispatch time" unit="m" />
          <Metric active={active} icon={TrendingUp} value={500} label="Direct employees" unit="+" />
        </div>
      </div>
    </section>
  );
}
