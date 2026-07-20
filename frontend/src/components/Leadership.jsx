import React from 'react';
import { LEADERS } from '../data/mock';
import { Linkedin, MapPin, Quote } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="relative bg-[#0d1420] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <div className="section-tag mb-6">Leadership <span className="font-arabic text-[13px] tracking-normal text-[#9a9585] normal-case">القيادة</span></div>
          <h2 className="font-display text-[42px] lg:text-[58px] leading-[1.02] font-medium tracking-[-0.02em]">
            The Minds Behind <br />
            <span className="italic">The Mission.</span>
          </h2>
          <p className="font-arabic text-[16px] text-[#9a9585] mt-3">العقول التي تقود هذه المهمة</p>
          <p className="text-[15px] text-[#c9c1ab] mt-6 leading-relaxed">
            A Saudi-rooted founder with a vision for true logistics ownership, partnered with a seasoned operations director who turns strategy into daily execution across the Kingdom.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {LEADERS.map((l) => (
            <article key={l.name} className="group relative border border-white/5 bg-[#111a29] overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden bg-[#0d1420]">
                <img src={l.image} alt={l.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-[30px] font-medium text-[#f4ecdc] leading-tight">{l.name}</h3>
                    <div className="font-arabic text-[16px] text-[#9a9585] mt-1">{l.nameAr}</div>
                  </div>
                  {l.linkedin && (
                    <a href={l.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#e6a446] hover:text-[#e6a446] transition">
                      <Linkedin size={14} />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div className="text-[11px] tracking-[0.24em] uppercase text-[#e6a446] font-semibold">{l.role}</div>
                </div>
                <div className="font-arabic text-[13px] text-[#9a9585]">{l.roleAr}</div>

                <div className="flex items-center gap-2 mt-2 text-[12px] text-[#c9c1ab]">
                  <MapPin size={12} className="text-[#e6a446]" /> {l.location}
                </div>

                <div className="mt-6 border-l-2 border-[#e6a446] pl-5 py-1">
                  <Quote size={16} className="text-[#e6a446] mb-2" />
                  <p className="text-[14px] text-[#d9d2bf] leading-relaxed italic">&ldquo;{l.quote}&rdquo;</p>
                  <p className="font-arabic text-[13px] text-[#9a9585] mt-3 leading-relaxed">&laquo;{l.quoteAr}&raquo;</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 border-t border-white/5 pt-6">
                  {l.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-[12px] text-[#c9c1ab]">
                      <span className="mt-1.5 w-1 h-1 bg-[#e6a446] rounded-full shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-14">
          <div className="text-[11px] tracking-[0.28em] uppercase text-[#e6a446] font-semibold">Abr Al Awtan Leadership</div>
          <div className="font-arabic text-[13px] text-[#9a9585] mt-1">قيادة أبر الأوطان</div>
        </div>
      </div>
    </section>
  );
}
