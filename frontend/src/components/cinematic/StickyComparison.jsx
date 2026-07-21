import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { COMPARISON } from '../../data/mock';
import { Check, X } from 'lucide-react';

export default function StickyComparison() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative bg-[#050810] py-28 overflow-hidden">
      <div className="absolute inset-0 diagonal-lines opacity-30" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag mb-5 justify-center inline-flex">The Difference</div>
          <h2 className="font-display text-[42px] lg:text-[60px] leading-[1.05] font-medium tracking-[-0.03em] text-[#f5efe1]">
            Operator vs <span className="italic text-amber-grad">Aggregator.</span>
          </h2>
          <p className="text-[15px] text-[#c9c1ab] mt-5">Most vendors resell someone else's network. We are the network.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="glass corner-brackets overflow-hidden">
          <div className="grid grid-cols-12 border-b border-white/8">
            <div className="col-span-6 p-5 font-mono text-[11px] tracking-[0.24em] uppercase text-[#7d8391]">Capability</div>
            <div className="col-span-3 p-5 text-center border-l border-white/8 bg-[#f5b840]/8">
              <div className="font-display text-[18px] font-semibold text-[#f5b840]">Abr Al Awtan</div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-[#f5b840]/70 uppercase mt-1">Operator</div>
            </div>
            <div className="col-span-3 p-5 text-center border-l border-white/8">
              <div className="font-display text-[18px] font-semibold text-[#c9c1ab]">Aggregators</div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-[#7d8391] uppercase mt-1">Broker</div>
            </div>
          </div>

          {COMPARISON.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className={`grid grid-cols-12 items-center transition hover:bg-white/[0.02] ${i < COMPARISON.length - 1 ? 'border-b border-white/5' : ''}`}>
              <div className="col-span-6 p-5 text-[14px] text-[#f5efe1]">{row.feature}</div>
              <div className="col-span-3 p-5 text-center border-l border-white/8 bg-[#f5b840]/5">
                {row.us === true ? (
                  <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 200 }} className="inline-flex items-center justify-center w-8 h-8 bg-[#22c55e] text-white"><Check size={16} strokeWidth={3} /></motion.div>
                ) : <span className="font-mono text-[12px] text-[#f5b840]">{row.us}</span>}
              </div>
              <div className="col-span-3 p-5 text-center border-l border-white/8">
                {row.others === false ? (
                  <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.55 + i * 0.08, type: 'spring', stiffness: 200 }} className="inline-flex items-center justify-center w-8 h-8 border border-white/15 text-[#7d8391]"><X size={16} /></motion.div>
                ) : <span className="font-mono text-[12px] text-[#7d8391]">{row.others}</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
