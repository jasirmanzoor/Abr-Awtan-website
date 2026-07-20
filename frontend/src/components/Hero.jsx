import React, { useEffect, useState, useRef } from 'react';
import { HERO_TICKERS, MAP_LOCATIONS, ROUTES } from '../data/mock';
import { ArrowRight, Zap, ShieldCheck, Radio, Sparkles } from 'lucide-react';

function LiveTicker() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % HERO_TICKERS.length), 2400); return () => clearInterval(t); }, []);
  const t = HERO_TICKERS[i];
  return (
    <div className="font-mono text-[11px] flex items-center gap-3">
      <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
      <span className="text-[#7d8391] uppercase tracking-[0.22em]">{t.label}</span>
      <span className="text-[#f5b840] font-semibold">{t.value.toLocaleString()}{t.suffix || ''}</span>
    </div>
  );
}

function KSAMap() {
  const loc = (name) => MAP_LOCATIONS.find(l => l.name === name);
  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setPulseIdx(v => (v + 1) % ROUTES.length), 1500); return () => clearInterval(t); }, []);

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="landG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f1524" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050810" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="amberGlow">
            <stop offset="0%" stopColor="#f5b840" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f5b840" stopOpacity="0" />
          </radialGradient>
          <filter id="g1"><feGaussianBlur stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <path
          d="M18,16 L26,8 L38,6 L52,8 L64,10 L74,14 L84,20 L88,28 L86,36 L82,44 L74,52 L60,58 L48,58 L38,54 L28,50 L20,44 L16,36 L14,26 Z"
          fill="url(#landG)" stroke="rgba(245,184,64,0.4)" strokeWidth="0.15"
        />
        <path
          d="M18,16 L26,8 L38,6 L52,8 L64,10 L74,14 L84,20 L88,28 L86,36 L82,44 L74,52 L60,58 L48,58 L38,54 L28,50 L20,44 L16,36 L14,26 Z"
          fill="none" stroke="rgba(245,184,64,0.15)" strokeWidth="0.08" strokeDasharray="0.5 0.5"
        />

        {/* Routes */}
        {ROUTES.map((r, i) => {
          const a = loc(r.from), b = loc(r.to);
          if (!a || !b) return null;
          const midx = (a.x + b.x) / 2;
          const midy = (a.y + b.y) / 2 * 0.62 - 3;
          const active = i === pulseIdx;
          return (
            <g key={i}>
              <path
                d={`M${a.x},${a.y * 0.62} Q${midx},${midy} ${b.x},${b.y * 0.62}`}
                fill="none" stroke={active ? '#f5b840' : 'rgba(245,184,64,0.2)'}
                strokeWidth={active ? 0.25 : 0.12}
                strokeDasharray={active ? '1 1' : ''}
              >
                {active && <animate attributeName="stroke-dashoffset" from="0" to="-4" dur="1s" repeatCount="indefinite" />}
              </path>
            </g>
          );
        })}

        {/* Locations */}
        {MAP_LOCATIONS.map((l, i) => (
          <g key={i} filter="url(#g1)">
            <circle cx={l.x} cy={l.y * 0.62} r="2.5" fill="url(#amberGlow)" opacity={l.type === 'Warehouse' ? 0.9 : 0.5} />
            <circle cx={l.x} cy={l.y * 0.62} r={l.type === 'Warehouse' ? 0.6 : 0.4} fill={l.type === 'Warehouse' ? '#f5b840' : '#ede6d4'} />
          </g>
        ))}

        {/* Location labels for major */}
        {['Riyadh','Jeddah','Dammam','Tabuk','Abha','Madinah'].map(n => {
          const l = loc(n); if(!l) return null;
          return <text key={n} x={l.x + 1.3} y={l.y * 0.62 + 0.4} fontSize="1.2" fill="#ede6d4" opacity="0.75" style={{ fontFamily: 'JetBrains Mono' }}>{n}</text>;
        })}

        <text x="50" y="4.5" textAnchor="middle" fontSize="1.6" letterSpacing="0.5" fill="rgba(245,184,64,0.25)" style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>
          KSA LIVE NETWORK · LIVE
        </text>
      </svg>

      {/* Overlay HUD corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-[#f5b840]/40" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-[#f5b840]/40" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-[#f5b840]/40" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-[#f5b840]/40" />

      {/* Live route indicator */}
      <div className="absolute top-4 left-4 glass px-3 py-2 font-mono text-[10px]">
        <div className="text-[#7d8391] tracking-[0.22em] uppercase">Active Route</div>
        <div className="text-[#f5b840] mt-1">{ROUTES[pulseIdx].from} → {ROUTES[pulseIdx].to}</div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass px-3 py-2 flex gap-3 font-mono text-[10px]">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f5b840]"/> Warehouse</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/70"/> Station / Store</div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#050810] pt-[130px] pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-[0.4]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#f5b840]/8 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#16a34a]/8 rounded-full blur-3xl" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6 fade-up">
            <div className="inline-flex items-center gap-2 border border-[#f5b840]/40 bg-[#f5b840]/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.28em] uppercase text-[#f5b840] mb-8">
              <Sparkles size={12} /> The Kingdom&rsquo;s Own Operator
            </div>

            <h1 className="font-display text-[46px] sm:text-[60px] lg:text-[78px] leading-[0.98] font-medium text-[#f5efe1] tracking-[-0.03em]">
              Ship anywhere <br />
              in Saudi. <br />
              <span className="italic text-amber-grad">Effortlessly.</span>
            </h1>

            <p className="text-[17px] lg:text-[18px] text-[#c9c1ab] mt-8 leading-[1.6] max-w-xl">
              End-to-end logistics on infrastructure we <span className="text-[#f5b840]">own and operate</span> — custom clearance, linehaul, warehousing, fulfillment and last-mile. One partner. Zero brokerage. Full-Kingdom coverage.
            </p>

            <div className="flex flex-wrap gap-3 mt-10">
              <a href="#quote" className="btn-primary group">
                Get Instant Quote in 60 Seconds
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#track" className="btn-ghost"><Radio size={14} /> Track Shipment</a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 pt-8 border-t border-white/10">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]">
                <ShieldCheck size={14} className="text-[#22c55e]" /> ZATCA & FASAH Ready
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]">
                <Zap size={14} className="text-[#f5b840]" /> 6-Day Onboarding
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]">
                <Radio size={14} className="text-[#22c55e]" /> 24/7 Command Center
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <LiveTicker />
            </div>
          </div>

          {/* Right: Live Map */}
          <div className="lg:col-span-6 relative fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-[5/4] glass rounded-none corner-brackets">
              <KSAMap />
            </div>
            {/* Floating stats cards */}
            <div className="absolute -bottom-6 -left-6 glass-strong p-4 pr-6 shadow-2xl float-y hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#22c55e]/40 bg-[#22c55e]/10 flex items-center justify-center">
                  <Zap size={16} className="text-[#22c55e]" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391]">SLA / month</div>
                  <div className="font-display text-[24px] font-semibold text-[#f5efe1] leading-none">99.4<span className="text-[#22c55e]">%</span></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 glass-strong p-4 pr-6 shadow-2xl float-y hidden md:block" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#f5b840]/40 bg-[#f5b840]/10 flex items-center justify-center">
                  <Radio size={16} className="text-[#f5b840]" />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391]">Active Vehicles</div>
                  <div className="font-display text-[24px] font-semibold text-[#f5efe1] leading-none">138 <span className="text-[10px] text-[#22c55e] font-mono">▲ live</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
