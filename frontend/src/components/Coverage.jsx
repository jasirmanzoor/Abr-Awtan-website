import React from 'react';
import { NETWORK_TOTALS, MAP_LOCATIONS, ROUTES } from '../data/mock';
import { ExternalLink } from 'lucide-react';

const typeColor = { Warehouse: '#f5b840', Station: '#ffffff', Store: '#c9c1ab' };

export default function Coverage() {
  const loc = (name) => MAP_LOCATIONS.find(l => l.name === name);

  return (
    <section id="coverage" className="relative bg-[#050810] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-6">
            <div className="section-tag mb-5">05 · Infrastructure</div>
            <h2 className="font-display text-[42px] lg:text-[60px] leading-[1.02] font-medium tracking-[-0.025em] text-[#f5efe1]">
              Our network. <br />
              <span className="italic text-amber-grad">Not a spreadsheet of vendors.</span>
            </h2>
            <p className="text-[15px] text-[#c9c1ab] mt-6 max-w-xl leading-relaxed">
              Every dot on this map is a physical warehouse, station, or store owned and operated by us — with our people, our vehicles, and our accountability.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 lg:grid-cols-4 gap-3 self-end">
            {NETWORK_TOTALS.map((t) => (
              <div key={t.label} className={`border ${t.accent ? 'border-[#f5b840]/40 bg-[#f5b840]/8' : 'border-white/10 bg-[#0a0f1a]'} px-5 py-6`}>
                <div className={`font-display text-[36px] font-medium ${t.accent ? 'text-[#f5b840]' : 'text-[#f5efe1]'} leading-none`}>{t.value}</div>
                <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#f5b840] mt-3">{t.label}</div>
                <div className="font-arabic text-[12px] text-[#7d8391] mt-0.5">{t.labelAr}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative border border-white/8 bg-[#0a0f1a] overflow-hidden corner-brackets">
          <div className="absolute top-4 left-4 z-10 glass px-4 py-3">
            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5efe1] font-semibold">Network Visualization · Live</div>
            <div className="flex items-center gap-2 mt-1"><span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" /><span className="font-mono text-[10px] text-[#22c55e]">SYNCED</span></div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {['Warehouse', 'Station', 'Store'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 glass px-3 py-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: typeColor[t] }} />
                <span className="font-mono text-[10px] tracking-wide uppercase text-[#c9c1ab]">{t}</span>
              </div>
            ))}
          </div>

          <div className="relative aspect-[16/10] w-full">
            <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="landC" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0f1524" />
                  <stop offset="100%" stopColor="#050810" />
                </linearGradient>
              </defs>
              <path d="M18,16 L26,8 L38,6 L52,8 L64,10 L74,14 L84,20 L88,28 L86,36 L82,44 L74,52 L60,58 L48,58 L38,54 L28,50 L20,44 L16,36 L14,26 Z" fill="url(#landC)" stroke="rgba(245,184,64,0.3)" strokeWidth="0.15" />

              {ROUTES.map((r, i) => {
                const a = loc(r.from), b = loc(r.to);
                if (!a || !b) return null;
                const midx = (a.x + b.x) / 2;
                const midy = (a.y + b.y) / 2 * 0.62 - 3;
                return (
                  <path key={i} d={`M${a.x},${a.y * 0.62} Q${midx},${midy} ${b.x},${b.y * 0.62}`} fill="none" stroke="rgba(245,184,64,0.18)" strokeWidth="0.08" />
                );
              })}

              {MAP_LOCATIONS.map((l, i) => (
                <g key={i}>
                  <circle cx={l.x} cy={l.y * 0.62} r="2.4" fill="none" stroke={typeColor[l.type]} strokeOpacity="0.25" strokeWidth="0.1" />
                  <circle cx={l.x} cy={l.y * 0.62} r={l.type === 'Warehouse' ? 0.7 : 0.5} fill={typeColor[l.type]} />
                </g>
              ))}

              {MAP_LOCATIONS.map((l, i) => (
                <text key={i + '-t'} x={l.x + 1.2} y={l.y * 0.62 + 0.4} fontSize="1.1" fill="#c9c1ab" opacity="0.7" style={{ fontFamily: 'JetBrains Mono' }}>{l.name}</text>
              ))}

              <text x="50" y="5" textAnchor="middle" fontSize="1.6" letterSpacing="0.5" fill="rgba(245,184,64,0.2)" style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>KINGDOM OF SAUDI ARABIA</text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 px-6 py-4">
            <div className="font-mono text-[11px] text-[#7d8391]">Sourced from ABR AL AWTAN KSA network</div>
            <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-[#f5b840] hover:text-[#ffd27a]">
              Open Full Map <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
