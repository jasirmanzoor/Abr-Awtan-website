import React from 'react';
import { LEADERS } from '../data/mock';
import { Linkedin, MapPin, Quote } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="relative bg-[#F7FAF8] py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#006C35]/5 rounded-full blur-3xl" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-3xl mb-14">
          <div className="section-tag mb-5">Leadership</div>
          <h2 className="font-display text-[38px] lg:text-[52px] leading-[1.08] font-medium tracking-[-0.025em] text-[#0A1F14]">
            The minds behind <span className="italic text-green-grad">the mission.</span>
          </h2>
          <p className="text-[15px] text-[#5A6B62] mt-5 leading-relaxed max-w-xl">
            A Saudi-rooted founder with a vision for true logistics ownership, partnered with a seasoned operations director who turns strategy into daily execution across the Kingdom.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {LEADERS.map((l, idx) => (
            <article key={l.name} className="group relative border border-[rgba(0,108,53,0.12)] bg-white overflow-hidden rounded-2xl hover:border-[#006C35]/40 hover:shadow-xl hover:shadow-[#006C35]/8 transition-all duration-500">
              <div className="grid grid-cols-5 min-h-[400px]">
                <div className="col-span-2 relative overflow-hidden bg-[#E8F5EE]">
                  <img src={l.photo} alt={l.name} style={{ objectPosition: l.photoPosition || 'top' }} className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F14]/70 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#006C35]" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#006C35]" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="font-arabic text-[15px] text-white/90">{l.nameAr}</div>
                  </div>
                </div>

                <div className="col-span-3 p-6 lg:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-[22px] lg:text-[26px] font-medium text-[#0A1F14] leading-tight tracking-tight">{l.name}</h3>
                        <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#006C35] mt-2 font-semibold">{l.role}</div>
                        <div className="flex items-center gap-1.5 mt-2 text-[12px] text-[#5A6B62]"><MapPin size={11} className="text-[#006C35]" /> {l.location}</div>
                      </div>
                      {idx === 1 && (
                        <a href="https://www.linkedin.com/in/jasir-kuloo-7539301b7" target="_blank" rel="noreferrer" className="w-9 h-9 border border-[rgba(0,108,53,0.15)] flex items-center justify-center hover:border-[#006C35] hover:text-[#006C35] hover:bg-[#E8F5EE] transition rounded-lg">
                          <Linkedin size={13} />
                        </a>
                      )}
                    </div>

                    <div className="mt-5 border-l-2 border-[#006C35]/40 pl-4">
                      <Quote size={14} className="text-[#006C35] mb-2" />
                      <p className="text-[14px] text-[#0A1F14] leading-relaxed italic">&ldquo;{l.quote}&rdquo;</p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[rgba(0,108,53,0.08)]">
                    <p className="text-[12.5px] text-[#5A6B62] leading-relaxed">{l.bio}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
