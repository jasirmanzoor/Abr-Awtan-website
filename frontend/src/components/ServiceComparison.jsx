import React from 'react';
import { COMPARISON } from '../data/mock';
import { Check, X } from 'lucide-react';

export default function ServiceComparison() {
  return (
    <section className="relative bg-[#050810] py-28 overflow-hidden">
      <div className="absolute inset-0 diagonal-lines opacity-30" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag mb-5 justify-center inline-flex">03 · The Difference</div>
          <h2 className="font-display text-[42px] lg:text-[56px] leading-[1.05] font-medium tracking-[-0.025em] text-[#f5efe1]">
            Operator vs <span className="italic text-amber-grad">Aggregator.</span>
          </h2>
          <p className="text-[15px] text-[#c9c1ab] mt-5">Most vendors resell someone else&rsquo;s network. We are the network.</p>
        </div>

        <div className="glass corner-brackets overflow-hidden">
          <div className="grid grid-cols-12 border-b border-white/8">
            <div className="col-span-6 p-5 font-mono text-[11px] tracking-[0.24em] uppercase text-[#7d8391]">Capability</div>
            <div className="col-span-3 p-5 text-center border-l border-white/8 relative bg-[#f5b840]/8">
              <div className="font-display text-[18px] font-semibold text-[#f5b840]">Abr Al Awtan</div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-[#f5b840]/70 uppercase mt-1">Operator</div>
            </div>
            <div className="col-span-3 lg:col-span-3 p-5 text-center border-l border-white/8">
              <div className="font-display text-[18px] font-semibold text-[#c9c1ab]">Aggregators</div>
              <div className="font-mono text-[10px] tracking-[0.22em] text-[#7d8391] uppercase mt-1">Broker</div>
            </div>
          </div>

          {COMPARISON.map((row, i) => (
            <div key={i} className={`grid grid-cols-12 items-center transition hover:bg-white/[0.02] ${i < COMPARISON.length - 1 ? 'border-b border-white/5' : ''}`}>
              <div className="col-span-6 p-5 text-[14px] text-[#f5efe1]">{row.feature}</div>
              <div className="col-span-3 lg:col-span-3 p-5 text-center border-l border-white/8 bg-[#f5b840]/5">
                {row.us === true ? (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-[#22c55e] text-white"><Check size={16} strokeWidth={3} /></div>
                ) : (
                  <span className="font-mono text-[12px] text-[#f5b840]">{row.us}</span>
                )}
              </div>
              <div className="col-span-3 lg:col-span-3 p-5 text-center border-l border-white/8">
                {row.others === false ? (
                  <div className="inline-flex items-center justify-center w-8 h-8 border border-white/15 text-[#7d8391]"><X size={16} /></div>
                ) : (
                  <span className="font-mono text-[12px] text-[#7d8391]">{row.others}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
