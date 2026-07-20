import React from 'react';
import { LEADERS } from '../data/mock';
import { Linkedin, MapPin, Quote } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="relative bg-[#050810] py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-14">
          <div className="section-tag mb-5">Leadership</div>
          <h2 className="font-display text-[42px] lg:text-[56px] leading-[1.05] font-medium tracking-[-0.025em] text-[#f5efe1]">
            The minds behind <span className="italic text-amber-grad">the mission.</span>
          </h2>
          <p className="text-[15px] text-[#c9c1ab] mt-5 leading-relaxed max-w-xl">
            A Saudi-rooted founder with a vision for true logistics ownership, partnered with a seasoned operations director who turns strategy into daily execution across the Kingdom.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {LEADERS.map((l, idx) => (
            <article key={l.name} className="group relative border border-white/8 bg-[#0a0f1a] overflow-hidden hover:border-[#f5b840]/25 transition">
              <div className="p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 border border-[#f5b840]/40 bg-[#f5b840]/8 flex items-center justify-center font-display text-[22px] font-semibold text-[#f5b840]">
                      {l.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-display text-[24px] font-medium text-[#f5efe1] leading-tight">{l.name}</h3>
                      <div className="font-arabic text-[14px] text-[#7d8391] mt-0.5">{l.nameAr}</div>
                    </div>
                  </div>
                  {idx === 1 && (
                    <a href="https://www.linkedin.com/in/jasir-kuloo-7539301b7" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#f5b840] hover:text-[#f5b840] transition">
                      <Linkedin size={13} />
                    </a>
                  )}
                </div>

                <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#f5b840] mt-5 font-semibold">{l.role}</div>
                <div className="flex items-center gap-2 mt-2 text-[12px] text-[#c9c1ab]">
                  <MapPin size={12} className="text-[#f5b840]" /> {l.location}
                </div>

                <div className="mt-8 border-l-2 border-[#f5b840]/60 pl-5">
                  <Quote size={16} className="text-[#f5b840] mb-2" />
                  <p className="text-[15px] text-[#f5efe1] leading-relaxed italic">&ldquo;{l.quote}&rdquo;</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
