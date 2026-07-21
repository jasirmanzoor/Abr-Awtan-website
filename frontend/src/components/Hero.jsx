import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HERO_TICKERS, MAP_LOCATIONS, ROUTES, COMPANY_PROFILE_PDF } from '../data/mock';
import { ArrowRight, Zap, ShieldCheck, Radio, Sparkles, Download, Play, ChevronDown } from 'lucide-react';

function LiveTicker() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % HERO_TICKERS.length), 2600); return () => clearInterval(t); }, []);
  const t = HERO_TICKERS[i];
  return (
    <div className="font-mono text-[11px] flex items-center gap-3">
      <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
      <span className="text-[#7d8391] uppercase tracking-[0.22em]">{t.label}</span>
      <span key={i} className="text-[#f5b840] font-semibold fade-up" style={{ animationDuration: '0.5s' }}>{t.value.toLocaleString()}{t.suffix || ''}</span>
    </div>
  );
}

function KSAMap() {
  const loc = (name) => MAP_LOCATIONS.find(l => l.name === name);
  const [pulseIdx, setPulseIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setPulseIdx(v => (v + 1) % ROUTES.length), 1400); return () => clearInterval(t); }, []);

  const activeRoute = ROUTES[pulseIdx];
  const a = loc(activeRoute.from), b = loc(activeRoute.to);

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="landG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f1524" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#050810" stopOpacity="0.98" />
          </linearGradient>
          <radialGradient id="amberGlow">
            <stop offset="0%" stopColor="#f5b840" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f5b840" stopOpacity="0" />
          </radialGradient>
          <filter id="g1"><feGaussianBlur stdDeviation="0.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <path
          d="M18,16 L26,8 L38,6 L52,8 L64,10 L74,14 L84,20 L88,28 L86,36 L82,44 L74,52 L60,58 L48,58 L38,54 L28,50 L20,44 L16,36 L14,26 Z"
          fill="url(#landG)" stroke="rgba(245,184,64,0.5)" strokeWidth="0.15"
        />

        {/* Grid overlay */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={'h' + i} x1="0" y1={i * 6.2} x2="100" y2={i * 6.2} stroke="rgba(245,184,64,0.04)" strokeWidth="0.05" />
        ))}

        {/* All routes as dim lines */}
        {ROUTES.map((r, i) => {
          const pa = loc(r.from), pb = loc(r.to);
          if (!pa || !pb) return null;
          const midx = (pa.x + pb.x) / 2;
          const midy = (pa.y + pb.y) / 2 * 0.62 - 3;
          return (
            <path key={i} d={`M${pa.x},${pa.y * 0.62} Q${midx},${midy} ${pb.x},${pb.y * 0.62}`} fill="none" stroke="rgba(245,184,64,0.14)" strokeWidth="0.08" />
          );
        })}

        {/* Active route — drawn dashed */}
        {a && b && (() => {
          const midx = (a.x + b.x) / 2;
          const midy = (a.y + b.y) / 2 * 0.62 - 3;
          const d = `M${a.x},${a.y * 0.62} Q${midx},${midy} ${b.x},${b.y * 0.62}`;
          return (
            <g>
              <path d={d} fill="none" stroke="#f5b840" strokeWidth="0.3" strokeDasharray="1 1" opacity="0.9">
                <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1.2s" repeatCount="indefinite" />
              </path>
              {/* moving dot */}
              <circle r="0.5" fill="#f5b840">
                <animateMotion dur="2s" repeatCount="indefinite" path={d} />
              </circle>
            </g>
          );
        })()}

        {/* Locations */}
        {MAP_LOCATIONS.map((l, i) => (
          <g key={i} filter="url(#g1)">
            <circle cx={l.x} cy={l.y * 0.62} r="2.6" fill="url(#amberGlow)" opacity={l.type === 'Warehouse' ? 0.9 : 0.5} />
            <circle cx={l.x} cy={l.y * 0.62} r={l.type === 'Warehouse' ? 0.65 : 0.4} fill={l.type === 'Warehouse' ? '#f5b840' : '#ede6d4'} />
            {l.type === 'Warehouse' && (
              <circle cx={l.x} cy={l.y * 0.62} r="1.8" fill="none" stroke="#f5b840" strokeWidth="0.06" opacity="0.4">
                <animate attributeName="r" from="1" to="3" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.6" to="0" dur="2.5s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}

        {/* Major city labels */}
        {['Riyadh','Jeddah','Dammam','Tabuk','Abha','Madinah'].map(n => {
          const l = loc(n); if(!l) return null;
          return <text key={n} x={l.x + 1.3} y={l.y * 0.62 + 0.4} fontSize="1.2" fill="#ede6d4" opacity="0.75" style={{ fontFamily: 'JetBrains Mono' }}>{n}</text>;
        })}

        <text x="50" y="4.5" textAnchor="middle" fontSize="1.6" letterSpacing="0.5" fill="rgba(245,184,64,0.3)" style={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}>
          KSA LIVE NETWORK · 6M+ ORDERS / YEAR
        </text>
      </svg>

      {/* HUD corners */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-[#f5b840]/50" />
      <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-[#f5b840]/50" />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-[#f5b840]/50" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-[#f5b840]/50" />

      {/* Active route indicator */}
      <div className="absolute top-4 left-4 glass px-3 py-2 font-mono text-[10px]">
        <div className="text-[#7d8391] tracking-[0.22em] uppercase">Active Route</div>
        <div key={pulseIdx} className="text-[#f5b840] mt-1 fade-up" style={{ animationDuration: '0.4s' }}>
          {activeRoute.from} → {activeRoute.to}
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass px-3 py-2 flex gap-3 font-mono text-[10px]">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f5b840]"/> Warehouse</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/70"/> Station / Store</div>
      </div>
    </div>
  );
}

function WordReveal({ words, className = '' }) {
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block fade-up" style={{ animationDelay: `${0.15 + i * 0.08}s`, animationFillMode: 'both' }}>
          {w} 
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const heroRef = useRef(null);
  const onMove = (e) => {
    if (!heroRef.current) return;
    const r = heroRef.current.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <section id="top" ref={heroRef} onMouseMove={onMove} className="relative min-h-screen overflow-hidden bg-[#050810] pt-[130px] pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-[0.4]" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#f5b840]/10 rounded-full blur-3xl" style={{ transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)` }} />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#16a34a]/10 rounded-full blur-3xl" style={{ transform: `translate(${-mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)` }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-[#f5b840]/30 rounded-full"
            style={{
              left: `${(i * 47) % 100}%`,
              top: `${(i * 31) % 100}%`,
              animation: `floatY ${3 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }} />
        ))}
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 border border-[#f5b840]/40 bg-[#f5b840]/5 px-3 py-1.5 font-mono text-[10px] tracking-[0.28em] uppercase text-[#f5b840] mb-8 fade-up">
              <Sparkles size={12} /> The Kingdom&rsquo;s Own Operator
            </div>

            <h1 className="font-display text-[46px] sm:text-[62px] lg:text-[82px] leading-[0.98] font-medium text-[#f5efe1] tracking-[-0.03em]">
              <WordReveal words={['Ship', 'anywhere']} className="block" />
              <WordReveal words={['in', 'Saudi.']} className="block" />
              <span className="block italic text-amber-grad fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>Effortlessly.</span>
            </h1>

            <p className="text-[17px] lg:text-[18px] text-[#c9c1ab] mt-8 leading-[1.6] max-w-xl fade-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
              End-to-end logistics on infrastructure we <span className="text-[#f5b840]">own and operate</span> — custom clearance, linehaul, warehousing, fulfillment and last-mile. One partner. Zero brokerage. Full-Kingdom coverage.
            </p>

            <div className="flex flex-wrap gap-3 mt-10 fade-up" style={{ animationDelay: '1s', animationFillMode: 'both' }}>
              <Link to="/ship-now" className="btn-primary group">
                Ship a Parcel Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/rate-calculator" className="btn-ghost">Get Instant Rate</Link>
              <a href={COMPANY_PROFILE_PDF} target="_blank" rel="noreferrer" className="btn-ghost text-[12px]"><Download size={14} /> Company Profile</a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 pt-8 border-t border-white/10 fade-up" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]"><ShieldCheck size={14} className="text-[#22c55e]" /> ZATCA &amp; FASAH Ready</div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]"><Zap size={14} className="text-[#f5b840]" /> 6-Day Onboarding</div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]"><Radio size={14} className="text-[#22c55e]" /> 24/7 Command Center</div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5"><LiveTicker /></div>
          </div>

          {/* Right: Map */}
          <div className="lg:col-span-6 relative fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="relative aspect-[5/4] glass rounded-none corner-brackets">
              <KSAMap />
            </div>

            <div className="absolute -bottom-6 -left-6 glass-strong p-4 pr-6 shadow-2xl float-y hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#22c55e]/40 bg-[#22c55e]/10 flex items-center justify-center"><Zap size={16} className="text-[#22c55e]" /></div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391]">SLA / month</div>
                  <div className="font-display text-[24px] font-semibold text-[#f5efe1] leading-none">99.4<span className="text-[#22c55e]">%</span></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 glass-strong p-4 pr-6 shadow-2xl float-y hidden md:block" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-[#f5b840]/40 bg-[#f5b840]/10 flex items-center justify-center"><Radio size={16} className="text-[#f5b840]" /></div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391]">Active Vehicles</div>
                  <div className="font-display text-[24px] font-semibold text-[#f5efe1] leading-none">138 <span className="text-[10px] text-[#22c55e] font-mono">▲ live</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <ChevronDown size={14} className="text-[#f5b840] animate-bounce" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#7d8391]">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
