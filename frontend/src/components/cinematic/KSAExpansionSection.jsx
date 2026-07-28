import React from 'react';
import { portfolioView, REGULATORY_LANDSCAPE, SCALE_TARGETS } from '../../lib/ksaExpansionModel';
import { CheckCircle2, ArrowUpRight, MapPin, Warehouse, Truck, Users } from 'lucide-react';

function GlassCard({ children, className = '' }) {
  return <div className={`bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl ${className}`}>{children}</div>;
}

function SectionTag({ children }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <div className="w-8 h-px bg-[#E5A93C]" />
      <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#E5A93C] font-semibold">{children}</span>
    </div>
  );
}

export default function KSAExpansionSection() {
  const view = portfolioView();

  return (
    <>
      {/* ═══ KSA EXPANSION & SCALE ═══ */}
      <section id="expansion" className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionTag>KSA Expansion</SectionTag>
          <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">
            Densify the Kingdom. <span className="text-[#E5A93C]">Own every lane.</span>
          </h2>
          <p className="text-white/50 mb-14 max-w-2xl leading-relaxed">
            From 100k to 280k monthly parcels. From 25 to 40 cities. Zero remote surcharges.
            The only growth path is deeper ownership of Saudi infrastructure.
          </p>

          {/* Scale Targets */}
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {[
              { label: 'Current', data: SCALE_TARGETS.current, accent: false },
              { label: 'Year 1 Target', data: SCALE_TARGETS.year1, accent: true },
              { label: 'Year 2 Target', data: SCALE_TARGETS.year2, accent: false },
            ].map((col) => (
              <GlassCard key={col.label} className={`p-6 ${col.accent ? 'border-[#E5A93C]/30 bg-[#E5A93C]/5' : ''}`}>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-4">{col.label}</div>
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-white/50 text-sm">Parcels / mo</span><span className="font-semibold text-white">{col.data.monthlyParcels.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/50 text-sm">Cities</span><span className="font-semibold text-white">{col.data.cities}</span></div>
                  <div className="flex justify-between"><span className="text-white/50 text-sm">Own Vans</span><span className="font-semibold text-white">{col.data.ownVans}</span></div>
                  <div className="flex justify-between"><span className="text-white/50 text-sm">Salary Drivers</span><span className="font-semibold text-white">{col.data.salaryDrivers}</span></div>
                  <div className="flex justify-between"><span className="text-white/50 text-sm">Warehouses</span><span className="font-semibold text-white">{col.data.warehouses}</span></div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Regional densification */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-xl font-medium">Regional Densification</h3>
            <div className="font-mono text-[11px] text-[#E5A93C]">+{view.upliftPct}% volume uplift target</div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {view.regions.map((r) => (
              <GlassCard key={r.name} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium text-white">{r.name}</div>
                    <div className="font-arabic text-sm text-white/40">{r.nameAr}</div>
                  </div>
                  <div className="font-mono text-[10px] text-white/30">P{r.priority}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
                  <MapPin size={12} /> {r.currentCities} → {r.targetCities} cities
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#E5A93C] to-[#38BDF8] rounded-full"
                    style={{ width: `${Math.min(100, (r.monthlyVolumeNow / r.monthlyVolumeTarget) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-white/40">
                  <span>{r.monthlyVolumeNow.toLocaleString()} now</span>
                  <span>{r.monthlyVolumeTarget.toLocaleString()} target</span>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* CapEx summary */}
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            <GlassCard className="p-6">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Year 1 CapEx</div>
              <div className="font-display text-3xl font-semibold text-[#E5A93C]">SAR {(view.capexY1 / 1000000).toFixed(2)}M</div>
              <div className="text-sm text-white/40 mt-2">+35 vans · +3 warehouses · +4 stations</div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">Year 2 CapEx</div>
              <div className="font-display text-3xl font-semibold text-white">SAR {(view.capexY2 / 1000000).toFixed(2)}M</div>
              <div className="text-sm text-white/40 mt-2">+45 vans · +4 warehouses · +5 stations</div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ═══ KSA REGULATORY COMPLIANCE LANDSCAPE ═══ */}
      <section id="regulatory" className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <SectionTag>Regulatory Landscape</SectionTag>
          <h2 className="font-display text-3xl lg:text-5xl font-medium tracking-tight mb-4">
            KSA Compliance Framework. <span className="text-[#E5A93C]">Fully owned.</span>
          </h2>
          <p className="text-white/50 mb-14 max-w-2xl">
            Six regulatory layers. Every license, permit, and obligation is held directly by Abr Al Awtan — not by brokers or third parties.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REGULATORY_LANDSCAPE.map((layer) => (
              <GlassCard key={layer.layer} className="p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-display text-lg font-medium text-white">{layer.layer}</div>
                    <div className="text-xs text-white/40 mt-1">{layer.body}</div>
                  </div>
                  <span className={`font-mono text-[9px] tracking-wider uppercase px-2 py-1 rounded-full ${
                    layer.status === 'Active'
                      ? 'bg-[#E5A93C]/15 text-[#E5A93C] border border-[#E5A93C]/25'
                      : 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/25'
                  }`}>
                    {layer.status}
                  </span>
                </div>
                <ul className="space-y-2 flex-1">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                      <CheckCircle2 size={14} className="text-[#E5A93C] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
