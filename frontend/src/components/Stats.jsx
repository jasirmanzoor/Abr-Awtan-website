import React, { useEffect, useRef, useState } from 'react';
import { STATS } from '../data/mock';

function useCounter(target, active) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const start = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.floor(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return v;
}

function StatCard({ stat, active }) {
  const isMillion = stat.value >= 1000000;
  const target = isMillion ? 6 : stat.value;
  const display = useCounter(target, active);
  const val = isMillion ? `${display}M+` : `${display}${stat.suffix || ''}`;
  return (
    <div className="relative border-l border-white/10 pl-6 py-4">
      <div className="font-display text-[54px] lg:text-[64px] font-medium text-[#f4ecdc] leading-none tracking-[-0.02em]">
        {val}
      </div>
      <div className="text-[11px] tracking-[0.24em] uppercase text-[#e6a446] font-semibold mt-3">{stat.label}</div>
      <div className="font-arabic text-[13px] text-[#9a9585] mt-1">{stat.labelAr}</div>
      <div className="text-[12px] text-[#c9c1ab]/70 mt-2">{stat.note}</div>
    </div>
  );
}

export default function Stats() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="relative bg-[#111a29] border-y border-white/5 py-20">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
          {STATS.map((s, i) => (
            <StatCard key={i} stat={s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
