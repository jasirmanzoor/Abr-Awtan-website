import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CTA_WHATSAPP } from '../data/mock';
import {
  ShoppingBag, Store, Rocket, Sparkles, ArrowRight,
  Package, Warehouse, Truck, MapPin, CheckCircle2,
  ShieldCheck, MessageCircle, Zap
} from 'lucide-react';

// Rotating rhetorical questions — targets multiple seller archetypes
const QUESTIONS = [
  { text: 'Want to sell?',                      icon: ShoppingBag },
  { text: 'Want to launch an online store?',    icon: Store },
  { text: 'Want to scale your Shopify shop?',   icon: Rocket },
  { text: 'Want to become an eCom brand?',      icon: Sparkles }
];

const JOURNEY = [
  { id: 'listed',    label: 'You list a product',       sub: 'Shopify · Salla · Instagram · WhatsApp', icon: Store,       color: '#f5b840' },
  { id: 'pickup',    label: 'We pick up',               sub: 'From your home, store or supplier',      icon: Package,     color: '#f5b840' },
  { id: 'store',     label: 'We store & pack',          sub: 'Our warehouses across KSA',              icon: Warehouse,   color: '#f5b840' },
  { id: 'deliver',   label: 'We deliver — cash in hand',sub: '23+ cities · COD collected · Payout weekly', icon: Truck,   color: '#22c55e' }
];

function TypewriterCycle() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % QUESTIONS.length), 2800);
    return () => clearInterval(t);
  }, []);
  const current = QUESTIONS[idx];
  const Icon = current.icon;
  return (
    <div className="flex items-center justify-center gap-3 lg:gap-4 min-h-[64px] lg:min-h-[92px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.text}
          initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="flex items-center gap-3 lg:gap-4"
        >
          <div className="hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 items-center justify-center border border-[#f5b840]/50 bg-[#f5b840]/10 text-[#f5b840]">
            <Icon size={18} />
          </div>
          <div className="font-display text-[30px] sm:text-[42px] lg:text-[54px] font-medium text-[#f5efe1] leading-[1.05] tracking-[-0.02em]">
            {current.text}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ParcelPath({ progress }) {
  // Animated SVG path with a parcel dot traveling along it
  return (
    <svg viewBox="0 0 800 60" className="w-full h-12 lg:h-14 overflow-visible">
      <defs>
        <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f5b840" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#f5b840" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.85" />
        </linearGradient>
        <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Dashed base track */}
      <line x1="20" y1="30" x2="780" y2="30" stroke="rgba(245,239,225,0.12)" strokeWidth="1" strokeDasharray="3 5" />
      {/* Progress fill */}
      <motion.line
        x1="20" y1="30" x2="780" y2="30"
        stroke="url(#pathGrad)" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ pathLength: progress, strokeDasharray: '760 760', strokeDashoffset: 760 - progress * 760 }}
      />

      {/* Waypoint dots */}
      {[20, 273, 527, 780].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="30" r="6" fill="#050810" stroke={progress * 3 >= i ? '#f5b840' : 'rgba(245,239,225,0.2)'} strokeWidth="2" />
          {progress * 3 >= i && (
            <circle cx={x} cy="30" r="3" fill="#f5b840" filter="url(#dotGlow)">
              <animate attributeName="r" values="3;5;3" dur="1.6s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}

      {/* Traveling parcel dot */}
      <motion.circle
        cy="30" r="4" fill="#22c55e" filter="url(#dotGlow)"
        animate={{ cx: 20 + progress * 760 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export default function FulfillmentSpotlight() {
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);

  // Auto-cycle journey stages
  useEffect(() => {
    const t = setInterval(() => setActiveStage((s) => (s + 1) % JOURNEY.length), 2400);
    return () => clearInterval(t);
  }, []);

  const whatsappPitch = `${CTA_WHATSAPP}?text=${encodeURIComponent(
    '*Fulfilled by Abr Al Awtan — I want in.*\n\nHello, I\u2019m interested in the "Fulfilled by Abr Al Awtan" program. I want to focus on selling while you handle pickup, storage, packing and delivery across KSA.\n\nA quick note about what I sell:\n\u2022 Products:\n\u2022 Where I sell (Shopify / Salla / Instagram / WhatsApp):\n\u2022 Expected monthly orders:'
  )}`;

  return (
    <section
      ref={containerRef}
      id="fulfilled-by-aaw"
      className="relative bg-[#050810] py-24 lg:py-36 overflow-hidden"
    >
      {/* Ambient orbs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full opacity-[0.12]" style={{ background: 'radial-gradient(circle, #f5b840, transparent 60%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[420px] h-[420px] rounded-full opacity-[0.10]" style={{ background: 'radial-gradient(circle, #22c55e, transparent 60%)' }} />
      </motion.div>

      {/* Fine grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(245,239,225,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,239,225,0.4) 1px, transparent 1px)', backgroundSize: '80px 80px', maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }} />

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="inline-flex items-center gap-2 border border-[#f5b840]/40 bg-[#050810]/60 backdrop-blur px-3 py-1.5 font-mono text-[10px] tracking-[0.32em] uppercase text-[#f5b840]">
            <span className="w-1.5 h-1.5 bg-[#f5b840] rounded-full pulse-dot" /> The Seller Program
          </div>
        </motion.div>

        {/* ============ FLOATING WINDOW ============ */}
        <motion.div
          style={{ rotate: cardRotate }}
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="relative mx-auto max-w-[1080px]"
        >
          {/* Outer amber glow */}
          <div className="absolute -inset-6 rounded-[24px] pointer-events-none opacity-40 blur-2xl" style={{ background: 'linear-gradient(135deg, rgba(245,184,64,0.35), rgba(34,197,94,0.25), transparent)' }} />

          {/* The "Window" */}
          <div className="relative border border-white/12 bg-gradient-to-br from-[#0a0f1a] via-[#050810] to-[#0a0f1a] backdrop-blur-xl rounded-[16px] overflow-hidden shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
            {/* macOS-style titlebar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8 bg-[#050810]/80">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">abralawtan.command · fulfillment.exe</div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-[#22c55e]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] pulse-dot" /> LIVE
              </div>
            </div>

            {/* Body */}
            <div className="p-8 lg:p-14">
              {/* Rotating question */}
              <TypewriterCycle />

              {/* Answer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-center mt-6"
              >
                <p className="text-[14.5px] lg:text-[17px] text-[#c9c1ab] max-w-2xl mx-auto leading-relaxed">
                  You focus on selling. We do the rest — from pickup at your doorstep to cash-on-delivery in the buyer&rsquo;s hand.
                </p>
              </motion.div>

              {/* SEAL — Fulfilled by Abr Al Awtan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.5, duration: 0.9, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="flex justify-center mt-10 lg:mt-14"
              >
                <div className="relative">
                  {/* Rotating outer ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-6 rounded-full border border-dashed border-[#f5b840]/30"
                  />
                  {/* Second ring */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-12 rounded-full border border-[#f5b840]/12"
                  />
                  {/* Pulse glow */}
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{ background: 'radial-gradient(circle, rgba(245,184,64,0.6), transparent 70%)' }}
                  />
                  {/* The seal */}
                  <div className="relative border-2 border-[#f5b840] bg-gradient-to-br from-[#0a0f1a] to-[#050810] px-8 lg:px-12 py-6 lg:py-7 text-center shadow-[0_0_60px_-10px_rgba(245,184,64,0.6)]">
                    <div className="flex items-center justify-center gap-2 font-mono text-[9px] lg:text-[10px] tracking-[0.38em] uppercase text-[#f5b840] mb-2">
                      <ShieldCheck size={11} /> Certified Kingdom-Wide
                    </div>
                    <div className="font-display text-[22px] sm:text-[30px] lg:text-[40px] font-medium text-[#f5efe1] leading-none tracking-[-0.02em]">
                      Fulfilled by <span className="italic text-amber-grad">Abr Al Awtan</span>
                    </div>
                    <div className="text-[11px] lg:text-[13px] text-[#c9c1ab] mt-2 italic">We fulfil · We ship · We deliver</div>
                  </div>
                </div>
              </motion.div>

              {/* Journey path */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="mt-14"
              >
                <div className="font-mono text-[9.5px] tracking-[0.32em] uppercase text-[#7d8391] text-center mb-6">The Journey</div>
                <ParcelPath progress={activeStage / (JOURNEY.length - 1)} />

                {/* Journey stage cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                  {JOURNEY.map((j, i) => {
                    const active = i === activeStage;
                    const passed = i < activeStage;
                    const Icon = j.icon;
                    return (
                      <motion.div
                        key={j.id}
                        onMouseEnter={() => setActiveStage(i)}
                        animate={{
                          borderColor: active ? j.color : passed ? 'rgba(245,184,64,0.25)' : 'rgba(255,255,255,0.08)',
                          backgroundColor: active ? 'rgba(245,184,64,0.06)' : 'rgba(5,8,16,0.6)'
                        }}
                        transition={{ duration: 0.5 }}
                        className="relative border p-4 cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`w-7 h-7 border flex items-center justify-center transition-colors ${
                              active ? 'border-[#f5b840] bg-[#f5b840]/15 text-[#f5b840]' :
                              passed ? 'border-[#f5b840]/40 text-[#f5b840]/70' : 'border-white/15 text-[#7d8391]'
                            }`}
                          >
                            <Icon size={13} />
                          </div>
                          <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: active ? '#f5b840' : '#7d8391' }}>
                            0{i + 1}
                          </div>
                          {(active || passed) && (
                            <CheckCircle2 size={12} className="ml-auto text-[#22c55e]" />
                          )}
                        </div>
                        <div className={`text-[12.5px] lg:text-[13.5px] font-medium leading-tight ${active ? 'text-[#f5efe1]' : 'text-[#c9c1ab]'}`}>
                          {j.label}
                        </div>
                        <div className="text-[10px] lg:text-[11px] text-[#7d8391] mt-1 leading-snug">{j.sub}</div>

                        {active && (
                          <motion.div
                            layoutId="stage-underline"
                            className="absolute bottom-0 left-0 right-0 h-[2px]"
                            style={{ background: 'linear-gradient(90deg, transparent, #f5b840, transparent)' }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Bottom stats + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="mt-12 pt-8 border-t border-white/8 flex flex-col lg:flex-row items-center justify-between gap-6"
              >
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3">
                  <div className="flex items-center gap-2 text-[12px] text-[#c9c1ab]"><Zap size={13} className="text-[#f5b840]" /> Zero warehouse cost to start</div>
                  <div className="flex items-center gap-2 text-[12px] text-[#c9c1ab]"><MapPin size={13} className="text-[#f5b840]" /> 23+ cities live</div>
                  <div className="flex items-center gap-2 text-[12px] text-[#c9c1ab]"><ShieldCheck size={13} className="text-[#f5b840]" /> COD collected & remitted</div>
                </div>

                <a
                  href={whatsappPitch}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="fulfilled-cta"
                  className="btn-primary group whitespace-nowrap"
                >
                  <MessageCircle size={14} /> Start Selling — We Handle the Rest
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-14"
        >
          <div className="font-mono text-[10.5px] lg:text-[11.5px] tracking-[0.32em] uppercase text-[#7d8391]">
            Trusted by dropshippers · Shopify sellers · Salla stores · Instagram brands · WhatsApp resellers
          </div>
        </motion.div>
      </div>
    </section>
  );
}
