import React from 'react';
import { NETWORK_TOTALS, MAP_LOCATIONS } from '../data/mock';
import { ExternalLink, Warehouse, Radio, Store as StoreIcon } from 'lucide-react';

const typeColor = {
  Warehouse: '#e6a446',
  Station: '#ffffff',
  Store: '#8a8577'
};

export default function Coverage() {
  return (
    <section id="coverage" className="relative bg-[#0d1420] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-6">
            <div className="section-tag mb-6">
              Physical Infrastructure
              <span className="font-arabic text-[13px] tracking-normal text-[#9a9585] normal-case">البنية التحتية الفيزيائية</span>
            </div>
            <h2 className="font-display text-[42px] lg:text-[60px] leading-[1.02] font-medium tracking-[-0.02em]">
              Our Own Network <br />
              <span className="italic">Across the Kingdom.</span>
            </h2>
            <p className="font-arabic text-[16px] text-[#9a9585] mt-3">شبكتنا الخاصة عبر المملكة</p>
            <p className="text-[15px] text-[#c9c1ab] mt-6 max-w-xl leading-relaxed">
              We do not outsource. We own stations, stores, and warehouses in every city we operate — giving us unmatched control over quality, speed, and reliability. Here is our real network mapped across Saudi Arabia.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 lg:grid-cols-4 gap-4 self-end">
            {NETWORK_TOTALS.map((t) => (
              <div key={t.label} className={`border ${t.accent ? 'border-[#e6a446]/40 bg-[#e6a446]/5' : 'border-white/10 bg-[#111a29]'} px-5 py-6`}>
                <div className={`font-display text-[38px] font-medium ${t.accent ? 'text-[#e6a446]' : 'text-[#f4ecdc]'} leading-none`}>{t.value}</div>
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#e6a446] mt-3">{t.label}</div>
                <div className="font-arabic text-[12px] text-[#9a9585] mt-0.5">{t.labelAr}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Map area */}
        <div className="relative border border-white/5 bg-[#0a1220] overflow-hidden">
          <div className="absolute top-4 left-4 z-10 border border-white/10 bg-[#0d1420]/80 backdrop-blur px-4 py-3">
            <div className="text-[10px] tracking-[0.24em] uppercase text-[#f4ecdc] font-semibold">Network Visualization</div>
            <div className="font-arabic text-[12px] text-[#9a9585]">تصوير الشبكة</div>
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-3">
            {['Warehouse', 'Station', 'Store'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 border border-white/10 bg-[#0d1420]/80 backdrop-blur px-3 py-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: typeColor[t] }} />
                <span className="text-[10px] tracking-wide uppercase text-[#c9c1ab]">{t}</span>
              </div>
            ))}
          </div>

          {/* SVG KSA Map */}
          <div className="relative aspect-[16/10] w-full">
            <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#182238" />
                  <stop offset="100%" stopColor="#0d1420" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="0.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Stylized KSA outline */}
              <path
                d="M20,18 L26,10 L38,8 L52,10 L64,12 L74,16 L82,22 L86,28 L84,36 L82,44 L74,52 L60,58 L48,58 L38,54 L28,50 L22,44 L18,36 L16,28 Z"
                fill="url(#landGrad)"
                stroke="rgba(230,164,70,0.25)"
                strokeWidth="0.15"
              />

              {/* Connection lines */}
              {MAP_LOCATIONS.slice(0, -1).map((l, i) => {
                const next = MAP_LOCATIONS[i + 1];
                return (
                  <line key={i} x1={l.x} y1={l.y * 0.62} x2={next.x} y2={next.y * 0.62} stroke="rgba(230,164,70,0.12)" strokeWidth="0.08" />
                );
              })}

              {/* Dots */}
              {MAP_LOCATIONS.map((l, i) => (
                <g key={l.name + i} filter="url(#glow)">
                  <circle cx={l.x} cy={l.y * 0.62} r={l.type === 'Warehouse' ? 0.7 : 0.5} fill={typeColor[l.type]} />
                  <circle cx={l.x} cy={l.y * 0.62} r="1.6" fill="none" stroke={typeColor[l.type]} strokeOpacity="0.25" strokeWidth="0.1" />
                </g>
              ))}

              {/* Labels */}
              {MAP_LOCATIONS.map((l, i) => (
                <text key={l.name + '-t' + i} x={l.x + 1.2} y={l.y * 0.62 + 0.5} fontSize="1.1" fill="#c9c1ab" opacity="0.75" style={{ fontFamily: 'Inter' }}>{l.name}</text>
              ))}

              <text x="50" y="6" textAnchor="middle" fontSize="2" letterSpacing="0.4" fill="rgba(236,229,211,0.15)" style={{ fontFamily: 'Fraunces', fontWeight: 600 }}>
                KINGDOM OF SAUDI ARABIA
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 px-6 py-4">
            <div className="text-[11px] text-[#9a9585]">Data sourced from ABRAT AWTAN — KSA NETWORK</div>
            <a href="https://www.google.com/maps/d/u/0/viewer?mid=1kcDrwLLgLvIdJour9JkFthQIVV-7c2g" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[#e6a446] hover:text-[#f2b95d]">
              Open Full Map <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
