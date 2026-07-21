import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MAP_LOCATIONS, ROUTES, HERO_TICKERS, COMPANY_PROFILE_PDF } from '../../data/mock';
import { ArrowRight, Download, ShieldCheck, Zap, Radio, ChevronDown } from 'lucide-react';

function FullMap() {
  const loc = (n) => MAP_LOCATIONS.find(l => l.name === n);
  const [pulse, setPulse] = useState(0);
  useEffect(() => { const t = setInterval(() => setPulse(v => (v + 1) % ROUTES.length), 1200); return () => clearInterval(t); }, []);
  const ar = ROUTES[pulse], a = loc(ar.from), b = loc(ar.to);

  return (
    <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="land2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1524" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#050810" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="glow2"><stop offset="0%" stopColor="#f5b840" stopOpacity="0.8" /><stop offset="100%" stopColor="#f5b840" stopOpacity="0" /></radialGradient>
      </defs>
      <path d="M18,16 L26,8 L38,6 L52,8 L64,10 L74,14 L84,20 L88,28 L86,36 L82,44 L74,52 L60,58 L48,58 L38,54 L28,50 L20,44 L16,36 L14,26 Z" fill="url(#land2)" stroke="rgba(245,184,64,0.35)" strokeWidth="0.15" />

      {ROUTES.map((r, i) => {
        const pa = loc(r.from), pb = loc(r.to); if (!pa || !pb) return null;
        const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2 * 0.62 - 3;
        return <path key={i} d={`M${pa.x},${pa.y * 0.62} Q${mx},${my} ${pb.x},${pb.y * 0.62}`} fill="none" stroke="rgba(245,184,64,0.15)" strokeWidth="0.08" />;
      })}

      {a && b && (() => {
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 * 0.62 - 3;
        const d = `M${a.x},${a.y * 0.62} Q${mx},${my} ${b.x},${b.y * 0.62}`;
        return (
          <g>
            <path d={d} fill="none" stroke="#f5b840" strokeWidth="0.3" strokeDasharray="1 1">
              <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1.2s" repeatCount="indefinite" />
            </path>
            <circle r="0.6" fill="#f5b840"><animateMotion dur="1.8s" repeatCount="indefinite" path={d} /></circle>
            <circle r="1.4" fill="none" stroke="#f5b840" strokeWidth="0.1" opacity="0.7">
              <animateMotion dur="1.8s" repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </g>
        );
      })()}

      {MAP_LOCATIONS.map((l, i) => (
        <g key={i}>
          <circle cx={l.x} cy={l.y * 0.62} r="2.5" fill="url(#glow2)" opacity={l.type === 'Warehouse' ? 0.9 : 0.5} />
          <circle cx={l.x} cy={l.y * 0.62} r={l.type === 'Warehouse' ? 0.65 : 0.4} fill={l.type === 'Warehouse' ? '#f5b840' : '#ede6d4'} />
          {l.type === 'Warehouse' && (
            <circle cx={l.x} cy={l.y * 0.62} r="1.5" fill="none" stroke="#f5b840" strokeWidth="0.06">
              <animate attributeName="r" from="1" to="3.5" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.7" to="0" dur="2.5s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

function KineticText({ text, delay = 0 }) {
  return (
    <span className="inline-block">
      {text.split('').map((c, i) => (
        <motion.span key={i} className="inline-block"
          initial={{ y: 60, opacity: 0, rotateX: -80 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ delay: delay + i * 0.03, duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}>
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
}

function LiveMetric() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % HERO_TICKERS.length), 2500); return () => clearInterval(t); }, []);
  const m = HERO_TICKERS[i];
  return (
    <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-mono text-[11px] flex items-center gap-3">
      <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
      <span className="text-[#7d8391] uppercase tracking-[0.22em]">{m.label}</span>
      <span className="text-[#f5b840] font-semibold">{m.value.toLocaleString()}{m.suffix || ''}</span>
    </motion.div>
  );
}

export default function CinematicHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const smx = useSpring(mx, { damping: 25, stiffness: 100 });
  const smy = useSpring(my, { damping: 25, stiffness: 100 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 40);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 40);
  };

  return (
    <section ref={ref} onMouseMove={onMove} className="relative h-screen w-full overflow-hidden bg-[#050810]">
      {/* Full-viewport map */}
      <motion.div style={{ scale, x: smx, y: smy }} className="absolute inset-0">
        <FullMap />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/50 via-[#050810]/70 to-[#050810]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/90 via-[#050810]/40 to-[#050810]/60" />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="absolute w-1 h-1 bg-[#f5b840]/40 rounded-full"
            style={{ left: `${(i * 47) % 100}%`, top: `${(i * 31) % 100}%`, animation: `floatY ${3 + (i % 5)}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 h-full flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 w-full pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="inline-flex items-center gap-2 border border-[#f5b840]/40 bg-[#050810]/60 backdrop-blur px-3 py-1.5 font-mono text-[10px] tracking-[0.28em] uppercase text-[#f5b840] mb-8">
            <span className="w-1.5 h-1.5 bg-[#f5b840] rounded-full pulse-dot" /> The Kingdom's Own Operator
          </motion.div>

          <h1 className="font-display text-[52px] sm:text-[76px] lg:text-[112px] leading-[0.92] font-medium text-[#f5efe1] tracking-[-0.035em] max-w-5xl">
            <div className="overflow-hidden"><KineticText text="Ship anywhere" delay={0.2} /></div>
            <div className="overflow-hidden"><KineticText text="in Saudi." delay={0.7} /></div>
            <div className="overflow-hidden">
              <motion.span initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }} className="inline-block italic text-amber-grad">
                Effortlessly.
              </motion.span>
            </div>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }}
            className="text-[17px] lg:text-[19px] text-[#c9c1ab] mt-8 leading-[1.6] max-w-xl">
            End-to-end logistics on infrastructure we <span className="text-[#f5b840]">own and operate</span> — clearance, linehaul, warehousing, fulfillment and last-mile. One partner. Zero brokerage. Full-Kingdom coverage.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9, duration: 0.8 }} className="flex flex-wrap gap-3 mt-10">
            <Link to="/ship-now" className="btn-primary group">Ship a Parcel Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            <Link to="/rate-calculator" className="btn-ghost">Get Instant Rate</Link>
            <a href={COMPANY_PROFILE_PDF} target="_blank" rel="noreferrer" className="btn-ghost text-[12px]"><Download size={14} /> Company Profile</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="absolute bottom-10 left-6 lg:left-10 right-6 lg:right-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]"><ShieldCheck size={13} className="text-[#22c55e]" /> ZATCA · FASAH</div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]"><Zap size={13} className="text-[#f5b840]" /> 6-Day Onboarding</div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-[#7d8391]"><Radio size={13} className="text-[#22c55e]" /> 24/7 Command Center</div>
            </div>
            <LiveMetric />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 2.5 }} className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <ChevronDown size={14} className="text-[#f5b840] animate-bounce" />
            <span className="font-mono text-[9px] tracking-[0.32em] uppercase text-[#7d8391]">Scroll to Explore</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
