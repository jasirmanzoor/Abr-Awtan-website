import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CTA_WHATSAPP } from '../data/mock';
import {
  PackageOpen, Warehouse, Boxes, Truck, HandCoins, Route, FileCheck2, Undo2,
  Handshake, Landmark, Users2, Layers3, Network,
  ArrowUpRight, MessageCircle, Sparkles, Plus, Check
} from 'lucide-react';

// Modular services the client can pick from — matches revenue stream 1
const SERVICE_STACK = [
  { id: 'pickup',      label: 'Pickup',              tagline: 'On-demand collection from your store or fulfillment hub.',      icon: PackageOpen },
  { id: 'warehouse',   label: 'Warehousing',         tagline: 'Own bonded storage across major KSA regions.',                   icon: Warehouse },
  { id: 'fulfillment', label: 'Fulfillment',         tagline: 'WMS + pick, pack & ship — plug into our ops.',                   icon: Boxes },
  { id: 'lastmile',    label: 'Last-Mile Delivery',  tagline: 'B2C doorstep across 23+ cities. Own drivers.',                    icon: Truck },
  { id: 'linehaul',    label: 'Linehaul',            tagline: 'Region-to-region freight for industrial & manufacturing.',       icon: Route },
  { id: 'cod',         label: 'COD Remittance',      tagline: 'Weekly cash-on-delivery reconciliation & payout.',               icon: HandCoins },
  { id: 'clearance',   label: 'Customs Clearance',   tagline: 'FASAH / ZATCA compliant import support.',                         icon: FileCheck2 },
  { id: 'returns',     label: 'Reverse Logistics',   tagline: 'Returns collection, quality-check, restock.',                     icon: Undo2 }
];

// Partnership paths — revenue stream 2 (contribution model)
const PARTNERSHIP_PATHS = [
  { id: 'capital',   n: '01', label: 'Capital',        icon: Landmark, blurb: 'Traditional equity or strategic investment into the country\u2019s most-owned logistics network.' },
  { id: 'leads',     n: '02', label: 'Leads',          icon: Users2,   blurb: 'Bring us clients or enterprise pipelines. We share the revenue you help generate.' },
  { id: 'platforms', n: '03', label: 'Platforms',      icon: Layers3,  blurb: 'Plug your tech, marketplace or SaaS into our fleet. Mutual growth, one contract.' },
  { id: 'cross',     n: '04', label: 'Cross-Utility',  icon: Network,  blurb: 'Complementary networks, synergies, joint ventures — let\u2019s design the shape together.' }
];

function ServiceChip({ svc, selected, onToggle }) {
  const Icon = svc.icon;
  return (
    <motion.button
      layout
      data-testid={`svc-chip-${svc.id}`}
      onClick={() => onToggle(svc.id)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative overflow-hidden border text-left p-4 transition-all duration-300 ${
        selected
          ? 'border-[#f5b840] bg-[#f5b840]/8 shadow-[0_0_0_1px_rgba(245,184,64,0.4),0_10px_40px_-10px_rgba(245,184,64,0.35)]'
          : 'border-white/10 bg-[#050810]/60 hover:border-[#f5b840]/40'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`shrink-0 w-9 h-9 flex items-center justify-center border ${selected ? 'border-[#f5b840] bg-[#f5b840]/15 text-[#f5b840]' : 'border-white/10 text-[#c9c1ab]'}`}>
          <Icon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className={`text-[13.5px] font-medium ${selected ? 'text-[#f5b840]' : 'text-[#f5efe1]'}`}>{svc.label}</div>
            <div className={`w-4 h-4 rounded-full flex items-center justify-center transition ${selected ? 'bg-[#f5b840] text-[#050810]' : 'bg-white/5 text-transparent'}`}>
              {selected ? <Check size={10} strokeWidth={3} /> : <Plus size={9} />}
            </div>
          </div>
          <div className="text-[11.5px] text-[#7d8391] mt-1 leading-snug line-clamp-2">{svc.tagline}</div>
        </div>
      </div>
      {selected && (
        <motion.div layoutId={`glow-${svc.id}`} className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#f5b840]/0 via-[#f5b840]/5 to-transparent" />
      )}
    </motion.button>
  );
}

export default function GrowWithUs() {
  const [selected, setSelected] = useState(new Set(['lastmile', 'warehouse']));
  const [volume, setVolume] = useState(5000);
  const [openPartner, setOpenPartner] = useState('capital');

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectedList = useMemo(() => SERVICE_STACK.filter((s) => selected.has(s.id)), [selected]);

  const readiness = useMemo(() => {
    if (selected.size === 0) return { label: 'Pick services to build your stack', pct: 0 };
    if (selected.size >= 5) return { label: 'End-to-end solution · dedicated ops team', pct: 100 };
    if (selected.size >= 3) return { label: 'Multi-service stack · single point of contact', pct: 75 };
    return { label: 'Modular add-ons · rapid onboarding', pct: 45 };
  }, [selected]);

  const whatsappQuote = useMemo(() => {
    if (selectedList.length === 0) return `${CTA_WHATSAPP}?text=${encodeURIComponent('Hello, I\u2019d like to build a custom logistics stack with Abr Al Awtan.')}`;
    const svcTxt = selectedList.map((s) => `\u2022 ${s.label}`).join('\n');
    const msg = [
      '*Custom Logistics Stack Request*',
      '',
      '*Services required:*',
      svcTxt,
      '',
      `*Expected monthly volume:* ~${volume.toLocaleString()} parcels`,
      '',
      'Please share a tailored proposal. Thank you.'
    ].join('\n');
    return `${CTA_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }, [selectedList, volume]);

  const partnerWhatsapp = (path) => {
    const item = PARTNERSHIP_PATHS.find((p) => p.id === path);
    const msg = [
      `*Partnership Interest \u2014 ${item.label} path*`,
      '',
      `Hello, I\u2019m interested in exploring the *${item.label}* partnership route with Abr Al Awtan.`,
      '',
      'Please share the next steps for a discovery conversation.'
    ].join('\n');
    return `${CTA_WHATSAPP}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="grow" className="relative bg-[#050810] py-28 lg:py-36 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(245,184,64,0.6), transparent 40%), radial-gradient(circle at 85% 60%, rgba(34,197,94,0.4), transparent 45%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(245,239,225,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(245,239,225,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 border border-[#f5b840]/40 bg-[#050810]/60 backdrop-blur px-3 py-1.5 font-mono text-[10px] tracking-[0.28em] uppercase text-[#f5b840] mb-6">
            <Sparkles size={11} /> Two Ways to Grow With Us
          </div>
          <h2 className="font-display text-[42px] sm:text-[56px] lg:text-[72px] font-medium text-[#f5efe1] tracking-[-0.03em] leading-[0.95]">
            Ship with us. <br /><span className="italic text-amber-grad">Or build with us.</span>
          </h2>
          <p className="text-[15.5px] lg:text-[17px] text-[#c9c1ab] mt-6 leading-relaxed">
            The Kingdom&rsquo;s most-owned logistics network is now open on two fronts. Pick the exact services you need — nothing more. Or bring what you have (capital, leads, platforms, cross-utility) and let&rsquo;s architect a partnership that hasn&rsquo;t existed in KSA logistics before.
          </p>
        </motion.div>

        {/* Split panels */}
        <div className="grid lg:grid-cols-2 gap-6 mt-14">
          {/* ============ PATH A: SHIP WITH US ============ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            data-testid="path-ship"
            className="relative border border-white/10 bg-gradient-to-br from-[#0a0f1a] to-[#050810] p-7 lg:p-9 overflow-hidden"
          >
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-[#f5b840]/50" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[#f5b840]/50" />

            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.32em] uppercase text-[#f5b840]"><span>PATH 01</span></div>
                <h3 className="font-display text-[30px] lg:text-[36px] font-medium text-[#f5efe1] mt-2 leading-tight">Ship with us</h3>
                <div className="text-[12px] text-[#7d8391] mt-1">For sellers, brands, dropshippers & manufacturers</div>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Selected</div>
                <div className="font-display text-[36px] font-medium text-[#f5b840] leading-none mt-1 tabular-nums">{String(selected.size).padStart(2, '0')}</div>
              </div>
            </div>

            <p className="text-[13.5px] text-[#c9c1ab] leading-relaxed mb-6">
              Modular logistics. Whether you sell on Shopify, Salla, Instagram, WhatsApp — or run a manufacturing line — pick only the pieces you need. Full-stack fulfillment to a single linehaul lane. You pay for what moves your business.
            </p>

            {/* Service picker */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {SERVICE_STACK.map((svc) => (
                <ServiceChip key={svc.id} svc={svc} selected={selected.has(svc.id)} onToggle={toggle} />
              ))}
            </div>

            {/* Volume slider */}
            <div className="border border-white/8 bg-[#050810]/70 p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#7d8391]">Monthly Volume</div>
                <div className="font-mono text-[13px] text-[#f5b840] tabular-nums">{volume.toLocaleString()} <span className="text-[10px] text-[#7d8391]">parcels/mo</span></div>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                data-testid="volume-slider"
                className="w-full accent-[#f5b840] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono tracking-wider text-[#7d8391] mt-1">
                <span>500</span><span>10k</span><span>25k</span><span>50k+</span>
              </div>
            </div>

            {/* Live summary bar */}
            <div className="relative border border-[#f5b840]/25 bg-gradient-to-r from-[#f5b840]/8 via-[#f5b840]/4 to-transparent p-4 mb-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#f5b840] mb-1">Your Stack</div>
                  <div className="text-[13px] text-[#f5efe1] font-medium leading-snug">{readiness.label}</div>
                </div>
                <div className="hidden sm:block shrink-0">
                  <div className="w-14 h-14 relative">
                    <svg viewBox="0 0 40 40" className="w-14 h-14 -rotate-90">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(245,184,64,0.15)" strokeWidth="3" />
                      <motion.circle
                        cx="20" cy="20" r="16" fill="none" stroke="#f5b840" strokeWidth="3" strokeLinecap="round"
                        strokeDasharray="100.53"
                        animate={{ strokeDashoffset: 100.53 - (readiness.pct / 100) * 100.53 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-[#f5b840] tabular-nums">{readiness.pct}%</div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {selectedList.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[#f5b840]/15">
                    {selectedList.map((s) => (
                      <span key={s.id} className="inline-flex items-center gap-1 border border-[#f5b840]/30 bg-[#f5b840]/10 text-[10px] font-mono tracking-wider uppercase text-[#f5b840] px-2 py-0.5">
                        {s.label}
                      </span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2.5">
              <a
                href={whatsappQuote}
                target="_blank"
                rel="noreferrer"
                data-testid="ship-whatsapp-cta"
                className="btn-primary flex-1 justify-center min-w-[200px]"
              >
                <MessageCircle size={14} /> Get My Custom Quote
              </a>
              <button
                onClick={() => setSelected(new Set())}
                data-testid="ship-clear"
                className="btn-ghost text-[11px] px-4"
                aria-label="Clear selection"
              >
                Reset
              </button>
            </div>
            <div className="text-[10.5px] font-mono tracking-wider text-[#7d8391] mt-3">Auto-fills your WhatsApp with the exact stack + volume · Reply usually within a few hours</div>
          </motion.div>

          {/* ============ PATH B: PARTNER WITH US ============ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            data-testid="path-partner"
            className="relative border border-[#f5b840]/25 bg-gradient-to-br from-[#0a0f1a] via-[#050810] to-[#0a0f1a] p-7 lg:p-9 overflow-hidden"
          >
            {/* Amber ambient glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(245,184,64,0.35), transparent 70%)' }} />
            <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-[#f5b840]" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[#f5b840]" />

            <div className="flex items-start justify-between gap-4 mb-6 relative">
              <div>
                <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.32em] uppercase text-[#f5b840]"><span>PATH 02 · FIRST-MOVERS</span></div>
                <h3 className="font-display text-[30px] lg:text-[36px] font-medium text-[#f5efe1] mt-2 leading-tight">Partner with us</h3>
                <div className="text-[12px] text-[#7d8391] mt-1">Not just investors. Anyone who moves us forward.</div>
              </div>
              <div className="hidden sm:flex shrink-0 w-11 h-11 items-center justify-center border border-[#f5b840]/50 bg-[#f5b840]/10">
                <Handshake size={20} className="text-[#f5b840]" />
              </div>
            </div>

            <p className="text-[13.5px] text-[#c9c1ab] leading-relaxed mb-6 relative">
              Our infrastructure is proven — <span className="text-[#f5efe1] font-medium">250+ staff, 150+ own drivers, 50+ own vans, 23 cities, 100k+ parcels every month.</span> You don&rsquo;t need to bring cash. Bring what you have and we&rsquo;ll design the shape together — a KSA-first, open partnership model.
            </p>

            {/* Partnership paths accordion-style */}
            <div className="space-y-2 mb-6 relative">
              {PARTNERSHIP_PATHS.map((p) => {
                const Icon = p.icon;
                const open = openPartner === p.id;
                return (
                  <motion.div
                    key={p.id}
                    layout
                    data-testid={`partner-${p.id}`}
                    className={`border cursor-pointer transition-colors ${open ? 'border-[#f5b840]/60 bg-[#f5b840]/6' : 'border-white/10 bg-[#050810]/60 hover:border-[#f5b840]/30'}`}
                    onClick={() => setOpenPartner(p.id)}
                  >
                    <motion.div layout className="flex items-center gap-3 p-3.5">
                      <div className="font-mono text-[10px] tracking-widest text-[#f5b840] tabular-nums w-6">{p.n}</div>
                      <div className={`w-8 h-8 flex items-center justify-center border shrink-0 ${open ? 'border-[#f5b840] bg-[#f5b840]/15 text-[#f5b840]' : 'border-white/10 text-[#c9c1ab]'}`}>
                        <Icon size={15} />
                      </div>
                      <div className="flex-1 text-[14px] font-medium text-[#f5efe1]">{p.label}</div>
                      <ArrowUpRight size={14} className={`transition-transform ${open ? 'text-[#f5b840] rotate-45' : 'text-[#7d8391]'}`} />
                    </motion.div>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-1 pl-[68px]">
                            <p className="text-[12.5px] text-[#c9c1ab] leading-relaxed mb-3">{p.blurb}</p>
                            <a
                              href={partnerWhatsapp(p.id)}
                              target="_blank"
                              rel="noreferrer"
                              data-testid={`partner-cta-${p.id}`}
                              className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[#f5b840] hover:text-[#f5efe1] transition"
                            >
                              Explore this path <ArrowUpRight size={12} />
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Big CTA */}
            <a
              href={partnerWhatsapp(openPartner)}
              target="_blank"
              rel="noreferrer"
              data-testid="partner-whatsapp-cta"
              className="btn-primary w-full justify-center relative"
            >
              <Handshake size={14} /> Start the Conversation
            </a>
            <div className="text-[10.5px] font-mono tracking-wider text-[#7d8391] mt-3 relative">
              Direct line to the Operations Director · Every conversation is confidential
            </div>
          </motion.div>
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-10 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            ['9+', 'Years operating'],
            ['100k+', 'Parcels every month'],
            ['23', 'Cities in daily service'],
            ['6M+', 'Lifetime deliveries']
          ].map(([v, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-[30px] lg:text-[36px] font-medium text-[#f5b840] leading-none tabular-nums">{v}</div>
              <div className="font-mono text-[9.5px] tracking-[0.24em] uppercase text-[#7d8391] mt-2">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
