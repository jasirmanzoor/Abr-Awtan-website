import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Truck, Package, MapPin, CheckCircle2, ArrowRight, 
  Lock, FileCheck
} from 'lucide-react';
import { calculateROI } from '../lib/roiEngine';
import { startLivePolling } from '../lib/liveMetrics';
import KSAExpansionSection from '../components/cinematic/KSAExpansionSection';

/* ═══════════════════════════════════════════════════════════
   ABR AL AWTAN — EXECUTIVE DARK COMMAND CENTER
   KSA-focused · Dual-purpose Website + C-Suite Deck
   ═══════════════════════════════════════════════════════════ */

const HERO_METRICS = [
  { value: '100,000+', label: 'Monthly Parcels' },
  { value: '25', label: 'Live Cities' },
  { value: '9+', label: 'Years in KSA' },
  { value: '99%', label: 'First-Attempt Delivery' },
];

const PARTNERS = ['Aramex', 'iMile', 'Landmark Group', 'Tamkeen', 'JDL', 'Government Document Delivery'];

const SERVICES = [
  { id: '01', title: 'BORDER', ar: 'التخليص الجمركي', subtitle: 'Customs Clearance', desc: 'Fasah / ZATCA pre-clearance. Zero port dwell times. Full regulatory ownership.', icon: FileCheck, points: ['Fasah Integration', 'HS-Code Mastery', 'Bonded Clearance'] },
  { id: '02', title: 'CORRIDOR', ar: 'النقل بين المدن', subtitle: 'Linehaul & Trucking', desc: '100% company-owned heavy fleet across all KSA corridors — Central, Western, Eastern, Northern, Southern.', icon: Truck, points: ['Owned Fleet', 'KSA Corridors', 'Reefer Capable'] },
  { id: '03', title: 'NODE', ar: 'التخزين والتجهيز', subtitle: 'Warehousing & Fulfillment', desc: 'ZATCA-compliant bonded storage. <4hr pick-pack-ship cycles.', icon: Package, points: ['Bonded Storage', 'WMS Live', '<4hr Fulfillment'] },
  { id: '04', title: 'DOORSTEP', ar: 'التوصيل للباب', subtitle: 'Last-Mile Delivery', desc: 'OTP-verified handover. Daily COD settlement. Same-day in major cities.', icon: MapPin, points: ['OTP Handover', 'COD Daily', 'Same-Day'] },
  { id: '05', title: 'SECURE', ar: 'اللوجستيات السرية', subtitle: 'Government & Confidential', desc: 'Chain-of-custody tracking. Biometric/OTP clearance. Tamper-proof protocol.', icon: Lock, points: ['Chain of Custody', 'Biometric OTP', 'Tamper-Proof'] },
];

const NETWORK_HUBS = [
  { name: 'Riyadh', type: 'HQ', x: 62, y: 52 },
  { name: 'Jeddah', type: 'Hub', x: 28, y: 58 },
  { name: 'Dammam', type: 'Hub', x: 78, y: 42 },
  { name: 'Jazan', type: 'Frontier', x: 38, y: 88 },
  { name: 'Najran', type: 'Frontier', x: 52, y: 86 },
  { name: 'Tabuk', type: 'Frontier', x: 22, y: 22 },
  { name: 'Rafha', type: 'Frontier', x: 68, y: 18 },
  { name: 'Al Jouf', type: 'Frontier', x: 48, y: 14 },
  { name: 'Madinah', type: 'Hub', x: 34, y: 48 },
  { name: 'Abha', type: 'Hub', x: 44, y: 78 },
];

const LEADERS = [
  { name: 'Malik Al Otaibi', nameAr: 'مالك العتيبي', role: 'Founder & CEO', quote: 'Own the assets. Employ the people. Control the quality. Everything else is theatre.' },
  { name: 'Jasir Manzoor', nameAr: 'جاسر منظور', role: 'Country Operations Director', quote: "Excellence isn't promised. It's executed — every parcel, every lane, every hour." },
];

function SectionTag({ children }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-[#E5A93C]" />
      <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#E5A93C] font-semibold">{children}</span>
    </div>
  );
}

function GlassCard({ children, className = '' }) {
  return <div className={`bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl ${className}`}>{children}</div>;
}

function MetricPill({ value, label }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl lg:text-4xl font-semibold text-white tracking-tight">{value}</div>
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 mt-2">{label}</div>
    </div>
  );
}

export default function ExecutiveDeck() {
  const [activeService, setActiveService] = useState(0);
  const [parcelVolume, setParcelVolume] = useState(25000);
  const [form, setForm] = useState({ company: '', email: '', volume: '', phone: '' });
  const [live, setLive] = useState(null);

  useEffect(() => {
    const stop = startLivePolling((data) => setLive(data), 7000);
    return stop;
  }, []);

  const roi = calculateROI(parcelVolume);

  const awbDisplay = live?.awb
    ? `AWB: ${live.awb.awb} | ${live.awb.from} → ${live.awb.to} | ${live.awb.status}`
    : 'AWB: AA-7734-KSA | Riyadh DC → Jazan | Out for Delivery';

  return (
    <div className="min-h-screen bg-[#0D1117] text-white font-sans selection:bg-[#E5A93C]/30">
      {/* ═══ 1. HERO ═══ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `linear-gradient(#E5A93C 1px, transparent 1px), linear-gradient(90deg, #E5A93C 1px, transparent 1px)`, backgroundSize: '64px 64px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E5A93C]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#38BDF8]/5 rounded-full blur-[100px]" />

        <header className="relative z-20 flex items-center justify-between px-6 lg:px-12 py-5 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-[#E5A93C]/40 flex items-center justify-center rounded-lg">
              <span className="font-display text-lg font-bold text-[#E5A93C]">A</span>
            </div>
            <div>
              <div className="font-display text-lg font-semibold tracking-tight">ABR AL AWTAN</div>
              <div className="font-mono text-[9px] tracking-[0.25em] text-white/40 uppercase">عبر الأوطان</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.18em] uppercase text-white/50">
            <a href="#services" className="hover:text-[#E5A93C] transition">Services</a>
            <a href="#network" className="hover:text-[#E5A93C] transition">Network</a>
            <a href="#expansion" className="hover:text-[#E5A93C] transition">Expansion</a>
            <a href="#roi" className="hover:text-[#E5A93C] transition">ROI</a>
            <a href="#contact" className="hover:text-[#E5A93C] transition">Contact</a>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#E5A93C]/30 bg-[#E5A93C]/10 rounded-full">
            <Shield size={12} className="text-[#E5A93C]" />
            <span className="font-mono text-[10px] tracking-[0.15em] text-[#E5A93C] font-semibold">TGA LICENSED · 100% SAUDI OWNED</span>
          </div>
        </header>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-12 py-16 max-w-[1440px] mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <SectionTag>Command Center</SectionTag>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.05] tracking-tight max-w-4xl">
              Nationwide Last-Mile Delivery & <span className="text-[#E5A93C]">Government-Grade</span> Logistics Infrastructure.
            </h1>
            <p className="mt-6 text-lg text-white/60 max-w-2xl leading-relaxed">
              Zero CapEx. Zero regulatory exposure. Plug into our 100% owned fleet, licensed infrastructure, and secure distribution corridors across the Kingdom.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 px-5 py-3 bg-white/[0.04] border border-white/10 rounded-xl backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
              <span className="font-mono text-sm text-white/80 tracking-wide">{awbDisplay}</span>
            </div>

            {live?.kpis && (
              <div className="mt-6 flex flex-wrap gap-4 font-mono text-[11px] text-white/50">
                <span>Today: <strong className="text-white">{live.kpis.parcelsToday.toLocaleString()}</strong></span>
                <span>OFD Now: <strong className="text-[#38BDF8]">{live.kpis.ofdNow.toLocaleString()}</strong></span>
                <span>1st Attempt: <strong className="text-[#E5A93C]">{live.kpis.firstAttemptRate.toFixed(1)}%</strong></span>
                <span>Active Riders: <strong className="text-white">{live.kpis.activeRiders}</strong></span>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#E5A93C] text-[#0D1117] font-semibold text-sm rounded-lg hover:bg-[#F0C05A] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#E5A93C]/20">
                Request Proposal <ArrowRight size={16} />
              </a>
              <a href="#expansion" className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/80 font-medium text-sm rounded-lg hover:border-[#E5A93C]/40 hover:text-[#E5A93C] transition">
                KSA Expansion Roadmap
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 pt-10 border-t border-white/8">
            {HERO_METRICS.map((m) => <MetricPill key={m.label} value={m.value} label={m.label} />)}
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. TRUST ═══ */}
      <section className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div>
              <SectionTag>Security & Trust</SectionTag>
              <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight max-w-xl">Government & Enterprise <span className="text-[#E5A93C]">Trusted.</span></h2>
            </div>
            <p className="text-white/50 max-w-md leading-relaxed">Partnered with government-affiliated entities for confidential document delivery, sensitive material handling, and high-security last-mile logistics.</p>
          </div>
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-3 px-5 py-3 bg-[#E5A93C]/10 border border-[#E5A93C]/25 rounded-xl">
              <Shield size={20} className="text-[#E5A93C]" />
              <span className="font-mono text-sm tracking-[0.15em] text-[#E5A93C] font-semibold uppercase">Government & Enterprise Trusted</span>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0D1117] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0D1117] to-transparent z-10" />
            <div className="flex gap-6 animate-[marquee_30s_linear_infinite]">
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div key={i} className="shrink-0 px-8 py-5 border border-white/10 bg-white/[0.02] rounded-xl flex items-center justify-center min-w-[180px]">
                  <span className="font-display text-lg font-medium text-white/70 tracking-wide">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. SERVICES ═══ */}
      <section id="services" className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionTag>Service Matrix</SectionTag>
          <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-14 max-w-2xl">Five layers of <span className="text-[#E5A93C]">owned infrastructure.</span></h2>
          <div className="flex flex-wrap gap-2 mb-10">
            {SERVICES.map((s, i) => (
              <button key={s.id} onClick={() => setActiveService(i)} className={`px-5 py-2.5 rounded-lg font-mono text-[11px] tracking-[0.15em] uppercase transition-all ${
                activeService === i ? 'bg-[#E5A93C] text-[#0D1117] font-semibold' : 'bg-white/[0.04] border border-white/10 text-white/50 hover:text-white hover:border-white/20'
              }`}>{s.id} {s.title}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeService} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              <GlassCard className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 border border-[#E5A93C]/30 bg-[#E5A93C]/10 rounded-xl flex items-center justify-center">
                        {React.createElement(SERVICES[activeService].icon, { size: 24, className: 'text-[#E5A93C]' })}
                      </div>
                      <div>
                        <div className="font-mono text-[11px] tracking-[0.2em] text-[#E5A93C] uppercase">{SERVICES[activeService].id}</div>
                        <div className="font-display text-2xl font-medium">{SERVICES[activeService].title}</div>
                      </div>
                    </div>
                    <div className="font-arabic text-xl text-white/40 mb-2">{SERVICES[activeService].ar}</div>
                    <div className="text-lg text-white/70 mb-4">{SERVICES[activeService].subtitle}</div>
                    <p className="text-white/50 leading-relaxed max-w-lg">{SERVICES[activeService].desc}</p>
                  </div>
                  <div className="lg:col-span-5 flex flex-col justify-center gap-3">
                    {SERVICES[activeService].points.map((pt) => (
                      <div key={pt} className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/8 rounded-xl">
                        <CheckCircle2 size={16} className="text-[#E5A93C] shrink-0" />
                        <span className="text-sm text-white/70">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ 4. NETWORK ═══ */}
      <section id="network" className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionTag>Network Advantage</SectionTag>
              <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-6">Frontier coverage <span className="text-[#E5A93C]">others avoid.</span></h2>
              <p className="text-white/50 leading-relaxed mb-10">From Riyadh HQ to the hardest remote lanes — Rafha, Najran, Tabuk, Al Jouf — we own the last mile where competitors decline.</p>
              <div className="grid grid-cols-3 gap-4">
                {[{ v: '5', l: 'Border Regions' }, { v: '2,182', l: 'Peak Remote Dispatch' }, { v: 'SAR 0', l: 'Remote Surcharge' }].map((m) => (
                  <GlassCard key={m.l} className="p-4 text-center">
                    <div className="font-display text-2xl font-semibold text-[#E5A93C]">{m.v}</div>
                    <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/40 mt-1">{m.l}</div>
                  </GlassCard>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <GlassCard className="aspect-[4/3] relative overflow-hidden">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M20,25 L35,12 L55,10 L75,18 L88,30 L90,50 L85,70 L70,88 L50,92 L30,85 L18,65 L15,45 Z" fill="rgba(229,169,60,0.06)" stroke="rgba(229,169,60,0.25)" strokeWidth="0.4" />
                  {NETWORK_HUBS.map((h) => (
                    <g key={h.name}>
                      <circle cx={h.x} cy={h.y} r={h.type === 'HQ' ? 2.2 : 1.4} fill={h.type === 'HQ' ? '#E5A93C' : h.type === 'Frontier' ? '#38BDF8' : '#fff'} opacity={0.9} />
                      <circle cx={h.x} cy={h.y} r={h.type === 'HQ' ? 4 : 2.8} fill="none" stroke={h.type === 'HQ' ? '#E5A93C' : h.type === 'Frontier' ? '#38BDF8' : '#fff'} strokeWidth="0.3" opacity={0.4}>
                        <animate attributeName="r" from={h.type === 'HQ' ? 2.5 : 1.8} to={h.type === 'HQ' ? 6 : 4.5} dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                      <text x={h.x} y={h.y - 3.5} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="2.2" fontFamily="monospace">{h.name}</text>
                    </g>
                  ))}
                </svg>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. KSA EXPANSION + REGULATORY LANDSCAPE ═══ */}
      <KSAExpansionSection />

      {/* ═══ 6. PEAK ═══ */}
      <section className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionTag>Peak Performance</SectionTag>
          <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">Ramadan Peak-Season <span className="text-[#E5A93C]">Proof.</span></h2>
          <p className="text-white/50 mb-12 max-w-xl">Real operational data. Density optimization absorbed +17% volume growth with only +14 riders.</p>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[{ v: '7,025', l: 'Peak-Day OFD', sub: 'Parcels' }, { v: '19,122', l: '3-Day Sampled Volume', sub: 'Parcels' }, { v: '+17%', l: 'Volume Growth Absorbed', sub: 'with +14 riders only' }].map((m) => (
              <GlassCard key={m.l} className="p-6">
                <div className="font-display text-4xl font-semibold text-[#E5A93C]">{m.v}</div>
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/60 mt-2">{m.l}</div>
                <div className="text-xs text-white/30 mt-1">{m.sub}</div>
              </GlassCard>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {(live?.stations || [{ name: 'Hafr Al Batin', ofd: 1240 }, { name: 'Rafha', ofd: 890 }, { name: 'Tabuk', ofd: 1120 }, { name: 'Sabya / Jazan', ofd: 980 }, { name: 'Madinah', ofd: 1450 }, { name: 'Mahd Ad Dahab', ofd: 620 }, { name: 'Al Henakiyah', ofd: 725 }]).map((s) => (
              <GlassCard key={s.name} className="p-4 flex items-center justify-between">
                <span className="text-sm text-white/70">{s.name}</span>
                <span className="font-mono text-sm text-[#38BDF8] font-semibold">{s.ofd.toLocaleString()}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. ROI ═══ */}
      <section id="roi" className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionTag>ROI Simulator</SectionTag>
          <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">In-House vs. <span className="text-[#E5A93C]">Abr Al Awtan.</span></h2>
          <p className="text-white/50 mb-12 max-w-xl">Multi-factor model: fleet, drivers, warehouse, COD, failed attempts, and volume-tiered rates.</p>
          <GlassCard className="p-8 lg:p-12">
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/50">Monthly Parcel Volume</span>
                <span className="font-display text-2xl font-semibold text-[#E5A93C]">{parcelVolume.toLocaleString()}</span>
              </div>
              <input type="range" min={5000} max={100000} step={1000} value={parcelVolume} onChange={(e) => setParcelVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#E5A93C] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#E5A93C]/40" />
              <div className="flex justify-between mt-2 font-mono text-[10px] text-white/30"><span>5,000</span><span>100,000</span></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <div className="p-5 bg-[#E5A93C]/8 border border-[#E5A93C]/20 rounded-xl">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#E5A93C]/70 mb-1">CapEx Avoided</div>
                <div className="font-display text-2xl font-semibold text-[#E5A93C]">SAR {(roi.totalCapex / 1000).toFixed(0)}k</div>
              </div>
              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">Monthly OpEx Avoided</div>
                <div className="font-display text-2xl font-semibold text-white">SAR {roi.monthlySavings.toLocaleString()}</div>
              </div>
              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">Annual Savings</div>
                <div className="font-display text-2xl font-semibold text-[#38BDF8]">SAR {(roi.annualSavings / 1000).toFixed(0)}k</div>
              </div>
              <div className="p-5 bg-white/[0.03] border border-white/10 rounded-xl">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-1">Payback Period</div>
                <div className="font-display text-2xl font-semibold text-white">{roi.paybackMonths} mo</div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-white/50">
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-2">In-House Resources</div>
                <div>{roi.vansNeeded} vans · {roi.driversNeeded} drivers · {roi.helpersNeeded} helpers</div>
                <div className="mt-1">{roi.warehouseSqm} m² warehouse</div>
              </div>
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-2">Abr Blended Rate</div>
                <div className="text-[#E5A93C] font-semibold">SAR {roi.abrRatePerParcel} / parcel</div>
                <div className="mt-1">Volume-tiered pricing</div>
              </div>
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-2">Launch Advantage</div>
                <div><span className="text-[#38BDF8] font-semibold">6 days</span> vs {roi.timeToLaunchInHouse} months</div>
                <div className="mt-1">+{roi.firstAttemptDelta}% first-attempt lift</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ═══ 8. LEADERSHIP + CONTACT ═══ */}
      <section id="contact" className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionTag>Leadership</SectionTag>
          <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-14">The minds behind <span className="text-[#E5A93C]">the mission.</span></h2>
          <div className="grid lg:grid-cols-2 gap-6 mb-20">
            {LEADERS.map((l) => (
              <GlassCard key={l.name} className="p-8">
                <div className="font-display text-2xl font-medium">{l.name}</div>
                <div className="font-arabic text-lg text-white/40 mt-1">{l.nameAr}</div>
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#E5A93C] mt-3">{l.role}</div>
                <blockquote className="mt-6 border-l-2 border-[#E5A93C]/40 pl-4 text-white/60 italic leading-relaxed">"{l.quote}"</blockquote>
              </GlassCard>
            ))}
          </div>
          <GlassCard className="p-8 lg:p-12 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-medium mb-2">Request a Tailored Proposal</h3>
            <p className="text-white/40 text-sm mb-8">Enterprise & government inquiries only. Response within 24 hours.</p>
            <div className="space-y-4">
              <input type="text" placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#E5A93C]/50 transition" />
              <input type="email" placeholder="Work Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#E5A93C]/50 transition" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Monthly Volume" value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#E5A93C]/50 transition" />
                <input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#E5A93C]/50 transition" />
              </div>
              <button className="w-full mt-4 py-4 bg-[#E5A93C] text-[#0D1117] font-semibold text-sm rounded-xl hover:bg-[#F0C05A] transition-all hover:-translate-y-0.5 shadow-lg shadow-[#E5A93C]/20 flex items-center justify-center gap-2">
                Request Tailored Proposal <ArrowRight size={16} />
              </button>
            </div>
          </GlassCard>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#E5A93C]/40 flex items-center justify-center rounded-md"><span className="font-display text-sm font-bold text-[#E5A93C]">A</span></div>
            <div>
              <div className="font-display text-sm font-semibold">ABR AL AWTAN</div>
              <div className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">عبر الأوطان · KSA Logistics Infrastructure</div>
            </div>
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/30">© 2026 Abr Al Awtan · TGA Licensed · 100% Saudi Owned</div>
        </div>
      </footer>

      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
