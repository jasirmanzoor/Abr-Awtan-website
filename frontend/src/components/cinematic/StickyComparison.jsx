import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { COMPARISON } from '../../data/mock';
import { Check, X } from 'lucide-react';

export default function StickyComparison() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative bg-[#F0F7F4] py-28 overflow-hidden">
      <div className="absolute inset-0 diagonal-lines opacity-40" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag mb-5 justify-center inline-flex">The Difference</div>
          <h2 className="font-display text-[38px] lg:text-[56px] leading-[1.08] font-medium tracking-[-0.03em] text-[#0A1F14]">
            Operator vs <span className="italic text-green-grad">Aggregator.</span>
          </h2>
          <p className="text-[15px] text-[#5A6B62] mt-5">Most vendors resell someone else's network. We are the network.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }} 
          className="bg-white border border-[rgba(0,108,53,0.12)] rounded-2xl overflow-hidden shadow-lg shadow-[#006C35]/5">
          <div className="grid grid-cols-12 border-b border-[rgba(0,108,53,0.1)]">
            <div className="col-span-6 p-5 font-mono text-[11px] tracking-[0.2em] uppercase text-[#5A6B62]">Capability</div>
            <div className="col-span-3 p-5 text-center border-l border-[rgba(0,108,53,0.1)] bg-[#E8F5EE]">
              <div className="font-display text-[17px] font-semibold text-[#006C35]">Abr Al Awtan</div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-[#006C35]/70 uppercase mt-1">Operator</div>
            </div>
            <div className="col-span-3 p-5 text-center border-l border-[rgba(0,108,53,0.1)]">
              <div className="font-display text-[17px] font-semibold text-[#5A6B62]">Aggregators</div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-[#5A6B62] uppercase mt-1">Broker</div>
            </div>
          </div>

          {COMPARISON.map((row, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className={`grid grid-cols-12 items-center transition hover:bg-[#F7FAF8] ${i < COMPARISON.length - 1 ? 'border-b border-[rgba(0,108,53,0.06)]' : ''}`}>
              <div className="col-span-6 p-5 text-[14px] text-[#0A1F14] font-medium">{row.feature}</div>
              <div className="col-span-3 p-5 text-center border-l border-[rgba(0,108,53,0.08)] bg-[#E8F5EE]/50">
                {row.us === true ? (
                  <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.5 + i * 0.07, type: 'spring', stiffness: 200 }} 
                    className="inline-flex items-center justify-center w-8 h-8 bg-[#006C35] text-white rounded-md">
                    <Check size={16} strokeWidth={3} />
                  </motion.div>
                ) : <span className="font-mono text-[12px] text-[#006C35]">{row.us}</span>}
              </div>
              <div className="col-span-3 p-5 text-center border-l border-[rgba(0,108,53,0.08)]">
                {row.others === false ? (
                  <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.55 + i * 0.07, type: 'spring', stiffness: 200 }} 
                    className="inline-flex items-center justify-center w-8 h-8 border border-[rgba(0,108,53,0.15)] text-[#5A6B62] rounded-md">
                    <X size={16} />
                  </motion.div>
                ) : <span className="font-mono text-[12px] text-[#5A6B62]">{row.others}</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
