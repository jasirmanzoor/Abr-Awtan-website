import React from 'react';
import { NETWORK_TOTALS, MAP_LOCATIONS, ROUTES } from '../data/mock';
import { ExternalLink } from 'lucide-react';

const typeColor = { Warehouse: '#006C35', Station: '#0D8A45', Store: '#B8860B' };

export default function Coverage() {
  const loc = (name) => MAP_LOCATIONS.find(l => l.name === name);

  return (
    <section id="coverage" className="relative bg-[#F7FAF8] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-6">
            <div className="section-tag mb-5">05 · Infrastructure</div>
            <h2 className="font-display text-[38px] lg:text-[56px] leading-[1.05] font-medium tracking-[-0.025em] text-[#0A1F14]">
              Our network. <br />
              <span className="italic text-green-grad">Not a spreadsheet of vendors.</span>
            </h2>
            <p className="text-[15px] text-[#5A6B62] mt-6 max-w-xl leading-relaxed">
              Every dot on this map is a physical warehouse, station, or store owned and operated by us — with our people, our vehicles, and our accountability.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 lg:grid-cols-4 gap-3 self-end">
            {NETWORK_TOTALS.map((t) => (
              <div key={t.label} className={`border rounded-xl px-5 py-6 ${t.accent ? 'border-[#006C35]/40 bg-[#E8F5EE]' : 'border-[rgba(0,108,53,0.12)] bg-white'}`}>
                <div className={`font-display text-[32px] font-medium leading-none ${t.accent ? 'text-[#006C35]' : 'text-[#0A1F14]'}`}>{t.value}</div>
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#006C35] mt-3">{t.label}</div>
                <div className="font-arabic text-[12px] text-[#5A6B62] mt-0.5">{t.labelAr}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative border border-[rgba(0,108,53,0.12)] bg-white overflow-hidden rounded-2xl shadow-lg shadow-[#006C35]/5">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-4 py-3 rounded-lg border border-[rgba(0,108,53,0.1)]">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#0A1F14] font-semibold">Network Visualization · Live</div>
            <div className="flex items-center gap-2 mt-1"><span className="w-1.5 h-1.5 bg-[#0D8A45] rounded-full pulse-dot" /><span className="font-mono text-[10px] text-[#0D8A45]">SYNCED</span></div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            {['Warehouse', 'Station', 'Store'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-[rgba(0,108,53,0.1)]">
                <span className="w-2 h-2 rounded-full" style={{ background: typeColor[t] }} />
                <span className="font-mono text-[10px] tracking-wide uppercase text-[#5A6B62]">{t}</span>
              </div>
            ))}
          </div>

          <div className="relative aspect-[16/10] w-full">
            <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="landC" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#E8F5EE" />
                  <stop offset="100%" stopColor="#D1EBE0" />
                </linearGradient>
              </defs>
              <path d="M18,16 L26,8 L38,6 L52,8 L64,10 L74,14 L84,20 L88,28 L86,36 L82,44 L74,52 L60,58 L48,58 L38,54 L28,50 L20,44 L16,36 L14,26 Z" fill="url(#landC)" stroke="rgba(0,108,53,0.25)" strokeWidth="0.18" />

              {ROUTES.map((r, i) => {
                const a = loc(r.from), b = loc(r.to);
                if (!a || !b) return null;
                const midx = (a.x + b.x) / 2;
                const midy = (a.y + b.y) / 2 * 0.62 - 3;
                return (
                  <path key={i} d={`M${a.x},${a.y * 0.62} Q${midx},${midy} ${b.x},${b.y * 0.62}`} fill="none" stroke="rgba(0,108,53,0.15)" strokeWidth="0.09" />
                );
              })}

              {MAP_LOCATIONS.map((l, i) => (
                <g key={i}>
                  <circle cx={l.x} cy={l.y * 0.62} r="2.4" fill="none" stroke={typeColor[l.type]} strokeOpacity="0.3" strokeWidth="0.12" />
                  <circle cx={l.x} cy={l.y * 0.62} r={l.type === 'Warehouse' ? 0.7 : 0.5} fill={typeColor[l.type]} />
                </g>
              ))}

              {MAP_LOCATIONS.map((l, i) => (
                <text key={i + '-t'} x={l.x + 1.2} y={l.y * 0.62 + 0.4} fontSize="1.1" fill="#5A6B62" opacity="0.85" style={{ fontFamily: 'JetBrains Mono' }}>{l.name}</text>
              ))}

              <text x="50" y="5" textAnchor="middle" fontSize="1.6" letterSpacing="0.5" fill="rgba(0,108,53,0.25)" style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>KINGDOM OF SAUDI ARABIA</text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(0,108,53,0.1)] px-6 py-4">
            <div className="font-mono text-[11px] text-[#5A6B62]">Sourced from ABR AL AWTAN KSA network</div>
            <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#006C35] hover:text-[#0D8A45]">
              Open Full Map <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
