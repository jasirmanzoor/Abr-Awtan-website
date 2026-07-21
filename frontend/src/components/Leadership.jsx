import React from 'react';
import { LEADERS } from '../data/mock';
import { Linkedin, MapPin, Quote } from 'lucide-react';

export default function Leadership() {
  return (
    <section id="leadership" className="relative bg-[#050810] py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-25" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#f5b840]/6 rounded-full blur-3xl" />
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
            <article key={l.name} className="group relative border border-white/8 bg-gradient-to-br from-[#0a0f1a] to-[#050810] overflow-hidden hover:border-[#f5b840]/40 transition-all duration-500">
              <div className="grid grid-cols-5 min-h-[420px]">
                {/* Photo */}
                <div className="col-span-2 relative overflow-hidden bg-[#050810]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f5b840]/10 to-transparent" />
                  <img src={l.photo} alt={l.name} style={{ objectPosition: l.photoPosition || 'top' }} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent" />

                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#f5b840]" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#f5b840]" />

                  {/* Name plate */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="font-arabic text-[15px] text-[#f5b840]/80">{l.nameAr}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="col-span-3 p-7 lg:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-[26px] lg:text-[28px] font-medium text-[#f5efe1] leading-tight tracking-tight">{l.name}</h3>
                        <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#f5b840] mt-3 font-semibold">{l.role}</div>
                        <div className="flex items-center gap-1.5 mt-2 text-[12px] text-[#c9c1ab]"><MapPin size={11} className="text-[#f5b840]" /> {l.location}</div>
                      </div>
                      {idx === 1 && (
                        <a href="https://www.linkedin.com/in/jasir-kuloo-7539301b7" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#f5b840] hover:text-[#f5b840] hover:bg-[#f5b840]/10 transition">
                          <Linkedin size={13} />
                        </a>
                      )}
                    </div>

                    <div className="mt-6 border-l-2 border-[#f5b840]/50 pl-4">
                      <Quote size={14} className="text-[#f5b840] mb-2" />
                      <p className="text-[14.5px] text-[#f5efe1] leading-relaxed italic">&ldquo;{l.quote}&rdquo;</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/8">
                    <p className="text-[12.5px] text-[#c9c1ab] leading-relaxed">{l.bio}</p>
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
