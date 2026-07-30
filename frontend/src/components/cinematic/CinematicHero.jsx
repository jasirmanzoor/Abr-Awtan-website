import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { MAP_LOCATIONS, ROUTES, HERO_TICKERS, COMPANY_PROFILE_PDF } from '../../data/mock';
import { ArrowRight, Download, ShieldCheck, Zap, Radio, ChevronDown, MapPin } from 'lucide-react';
import { useLang } from '../../context/LangContext';

function FullMap() {
  const loc = (n) => MAP_LOCATIONS.find(l => l.name === n);
  const [pulse, setPulse] = useState(0);
  useEffect(() => { const t = setInterval(() => setPulse(v => (v + 1) % ROUTES.length), 1400); return () => clearInterval(t); }, []);
  const ar = ROUTES[pulse], a = loc(ar.from), b = loc(ar.to);

  return (
    <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full hero-light-map" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="landLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8F5EE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#D1EBE0" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="glowGreen"><stop offset="0%" stopColor="#006C35" stopOpacity="0.55" /><stop offset="100%" stopColor="#006C35" stopOpacity="0" /></radialGradient>
        <radialGradient id="glowGold"><stop offset="0%" stopColor="#B8860B" stopOpacity="0.5" /><stop offset="100%" stopColor="#B8860B" stopOpacity="0" /></radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Soft land mass */}
      <path d="M18,16 L26,8 L38,6 L52,8 L64,10 L74,14 L84,20 L88,28 L86,36 L82,44 L74,52 L60,58 L48,58 L38,54 L28,50 L20,44 L16,36 L14,26 Z" 
            fill="url(#landLight)" stroke="rgba(0,108,53,0.25)" strokeWidth="0.18" />

      {/* Subtle route network */}
      {ROUTES.map((r, i) => {
        const pa = loc(r.from), pb = loc(r.to); if (!pa || !pb) return null;
        const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2 * 0.62 - 3;
        return <path key={i} d={`M${pa.x},${pa.y * 0.62} Q${mx},${my} ${pb.x},${pb.y * 0.62}`} fill="none" stroke="rgba(0,108,53,0.12)" strokeWidth="0.09" />;
      })}

      {/* Active animated route */}
      {a && b && (() => {
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 * 0.62 - 3;
        const d = `M${a.x},${a.y * 0.62} Q${mx},${my} ${b.x},${b.y * 0.62}`;
        return (
          <g filter="url(#softGlow)">
            <path d={d} fill="none" stroke="#006C35" strokeWidth="0.35" strokeDasharray="1.2 0.8">
              <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="1.4s" repeatCount="indefinite" />
            </path>
            <circle r="0.7" fill="#006C35">
              <animateMotion dur="2s" repeatCount="indefinite" path={d} />
            </circle>
            <circle r="1.6" fill="none" stroke="#006C35" strokeWidth="0.12" opacity="0.6">
              <animateMotion dur="2s" repeatCount="indefinite" path={d} />
              <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        );
      })()}

      {/* Location markers */}
      {MAP_LOCATIONS.map((l, i) => (
        <g key={i}>
          <circle cx={l.x} cy={l.y * 0.62} r="2.8" fill={l.type === 'Warehouse' ? 'url(#glowGreen)' : 'url(#glowGold)'} opacity={l.type === 'Warehouse' ? 0.85 : 0.55} />
          <circle cx={l.x} cy={l.y * 0.62} r={l.type === 'Warehouse' ? 0.7 : 0.42} fill={l.type === 'Warehouse' ? '#006C35' : '#B8860B'} />
          {l.type === 'Warehouse' && (
            <circle cx={l.x} cy={l.y * 0.62} r="1.6" fill="none" stroke="#006C35" strokeWidth="0.07">
              <animate attributeName="r" from="1.1" to="3.8" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.65" to="0" dur="2.8s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

function KineticText({ text, delay = 0, splitByChar = true }) {
  if (!splitByChar) {
    return (
      <span className="inline-block">
        {text.split(' ').map((w, i) => (
          <motion.span key={i} className="inline-block me-2"
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delay + i * 0.09, duration: 0.95, ease: [0.2, 0.65, 0.3, 0.9] }}>
            {w}
          </motion.span>
        ))}
      </span>
    );
  }
  return (
    <span className="inline-block">
      {text.split('').map((c, i) => (
        <motion.span key={i} className="inline-block"
          initial={{ y: 70, opacity: 0, rotateX: -70 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ delay: delay + i * 0.028, duration: 0.95, ease: [0.2, 0.65, 0.3, 0.9] }}>
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </span>
  );
}

function LiveMetric() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % HERO_TICKERS.length), 2800); return () => clearInterval(t); }, []);
  const m = HERO_TICKERS[i];
  return (
    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
      className="font-mono text-[12px] flex items-center gap-3 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-[rgba(0,108,53,0.12)] shadow-sm">
      <span className="w-2 h-2 bg-[#006C35] rounded-full pulse-dot" />
      <span className="text-[#5A6B62] uppercase tracking-[0.18em]">{m.label}</span>
      <span className="text-[#006C35] font-semibold tracking-tight">{m.value.toLocaleString()}{m.suffix || ''}</span>
    </motion.div>
  );
}

export default function CinematicHero() {
  const ref = useRef(null);
  const { t, lang } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const mx = useMotionValue(0), my = useMotionValue(0);
  const smx = useSpring(mx, { damping: 28, stiffness: 90 });
  const smy = useSpring(my, { damping: 28, stiffness: 90 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect(); if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 36);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 36);
  };

  return (
    <section ref={ref} onMouseMove={onMove} className="relative h-screen w-full overflow-hidden bg-[#F7FAF8]">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0F7F4] via-[#F7FAF8] to-[#E8F5EE]" />

      {/* Full-viewport interactive map */}
      <motion.div style={{ scale, x: smx, y: smy }} className="absolute inset-0 opacity-90">
        <FullMap />
      </motion.div>

      {/* Soft overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7FAF8]/40 via-transparent to-[#F7FAF8]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F7FAF8]/75 via-transparent to-[#F7FAF8]/50" />

      {/* Floating particles — green tinted */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="absolute w-1.5 h-1.5 bg-[#006C35]/25 rounded-full"
            style={{ 
              left: `${(i * 41) % 100}%`, 
              top: `${(i * 29) % 100}%`, 
              animation: `floatY ${3.5 + (i % 4)}s ease-in-out infinite`, 
              animationDelay: `${i * 0.18}s` 
            }} />
        ))}
      </div>

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 h-full flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full pt-20">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="inline-flex items-center gap-2.5 border border-[#006C35]/25 bg-white/70 backdrop-blur-md px-4 py-2 font-mono text-[11px] tracking-[0.22em] uppercase text-[#006C35] mb-8 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-[#006C35] rounded-full pulse-dot" />
            {t('hero.badge') || 'Kingdom-Wide Operator · Since 2016'}
          </motion.div>

          {/* Kinetic Headline */}
          <h1 className={`${lang === 'ar' ? 'font-arabic text-right' : 'font-display'} text-[48px] sm:text-[68px] lg:text-[96px] leading-[0.94] font-medium text-[#0A1F14] tracking-[-0.03em] max-w-5xl`}>
            <div className="overflow-hidden"><KineticText text={t('hero.title1') || 'Own the Network.'} delay={0.25} splitByChar={lang !== 'ar'} /></div>
            <div className="overflow-hidden"><KineticText text={t('hero.title2') || 'Control the'} delay={0.65} splitByChar={lang !== 'ar'} /></div>
            <div className="overflow-hidden">
              <motion.span initial={{ y: 90, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.15, duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }} className="inline-block text-green-grad">
                {t('hero.title3') || 'Outcome.'}
              </motion.span>
            </div>
          </h1>

          {/* Sub */}
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.55, duration: 0.8 }}
            className={`${lang === 'ar' ? 'text-right font-arabic' : ''} text-[16px] lg:text-[18px] text-[#5A6B62] mt-7 leading-[1.65] max-w-xl`}>
            {t('hero.sub') || 'Saudi-owned. Fully controlled. 150+ salaried drivers, 50+ vans, 9 warehouses, 100k+ parcels every month across 23+ cities — including the hardest remote lanes.'}
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.85, duration: 0.8 }} className="flex flex-wrap gap-3.5 mt-10">
            <Link to="/ship-now" data-testid="hero-cta-ship" className="btn-primary group">
              {t('hero.ctaShip') || 'Ship Now'} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/rate-calculator" data-testid="hero-cta-rate" className="btn-ghost">
              {t('hero.ctaRate') || 'Rate Calculator'}
            </Link>
            <a href={COMPANY_PROFILE_PDF} target="_blank" rel="noreferrer" data-testid="hero-cta-profile" className="btn-ghost text-[13px]">
              <Download size={15} /> {t('hero.ctaProfile') || 'Company Profile'}
            </a>
          </motion.div>

          {/* Bottom bar */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.15, duration: 1 }} 
            className="absolute bottom-10 left-6 lg:left-12 right-6 lg:right-12 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#5A6B62] bg-white/60 backdrop-blur px-3 py-1.5 rounded-full border border-[rgba(0,108,53,0.1)]">
                <ShieldCheck size={13} className="text-[#006C35]" /> ZATCA · FASAH
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#5A6B62] bg-white/60 backdrop-blur px-3 py-1.5 rounded-full border border-[rgba(0,108,53,0.1)]">
                <Zap size={13} className="text-[#B8860B]" /> 6-Day Onboarding
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-[#5A6B62] bg-white/60 backdrop-blur px-3 py-1.5 rounded-full border border-[rgba(0,108,53,0.1)]">
                <Radio size={13} className="text-[#006C35]" /> 24/7 Command Center
              </div>
            </div>
            <LiveMetric />
          </motion.div>

          {/* Scroll cue */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 2.5 }} 
            className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <ChevronDown size={16} className="text-[#006C35] animate-bounce" />
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#5A6B62]">{t('hero.scroll') || 'Scroll to Explore'}</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
