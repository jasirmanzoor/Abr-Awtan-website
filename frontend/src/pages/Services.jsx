import React from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader, { CTABand } from '../components/PageHeader';
import { SERVICES } from '../data/mock';
import { FileCheck2, Truck, PackageOpen, Bike, Building2, Zap, Warehouse, Users, Bus, ArrowUpRight, Check } from 'lucide-react';

const ICONS = { FileCheck2, Truck, PackageOpen, Bike, Building2, Zap, Warehouse, Users, Bus };

const DETAILS = {
  clearance: ['Pre-cleared FASAH documentation', 'Bonded warehouse network', 'HS-code advisory', 'Dedicated customs officers per lane'],
  linehaul: ['Refrigerated + dry + hazmat fleet', 'GCC cross-border corridors', 'Owned drivers, tracked live', 'FTL & LTL scheduling'],
  fulfillment: ['WMS integrations (Salla, Zid, Shopify)', 'Pick-pack-ship SLA', 'RFID inventory accuracy 99.8%', 'B2B & D2C ready'],
  lastmile: ['OTP + COD handled by riders', 'Same-day & next-day options', 'Real-time customer SMS alerts', '99%+ first-attempt success'],
  b2b: ['Route-optimized branch delivery', 'ePOD signature capture', 'Custom SLA per client', 'Bulk & pallet ready'],
  express: ['2-6h intra-city guarantee', 'Priority handling', 'Live customer notifications', 'Air + surface hybrid'],
  warehousing: ['ZATCA-compliant bonded storage', 'RFID & CCTV 24/7', 'Ambient / cold chain / freezer', 'Cross-docking ready'],
  manpower: ['Ajeer + single sponsorship', 'Trained warehouse & delivery labor', 'Flexible daily/monthly staffing', 'MoL compliant contracts'],
  fleet: ['Vans, 3-ton, 40ft trailers', 'Daily / monthly leasing', 'Driver + fuel bundle options', 'GPS-tracked, insured, ISO-maintained']
};

export default function Services() {
  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader
        eyebrow="01 · Capability Matrix"
        title="Every logistics function."
        italic="One operator."
        subtitle="Nine core services powered by infrastructure we own end-to-end — from the port of entry to your customer's doorstep. No brokers, no handoffs, no excuses."
        crumbs={[{ label: 'Services' }]}
      />

      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-20" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 space-y-10">
          {SERVICES.map((s, idx) => {
            const Icon = ICONS[s.icon];
            const reversed = idx % 2 === 1;
            return (
              <div key={s.id} id={s.id} className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center border border-white/8 bg-[#0a0f1a] p-8 lg:p-12 ${reversed ? '' : ''}`}>
                <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 border border-[#f5b840]/30 bg-[#f5b840]/8 flex items-center justify-center"><Icon size={20} className="text-[#f5b840]" /></div>
                    <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#7d8391]">Service /{s.code}</div>
                  </div>
                  <h2 className="font-display text-[36px] lg:text-[48px] font-medium mt-5 text-[#f5efe1] tracking-tight leading-tight">{s.title}</h2>
                  <p className="font-arabic text-[15px] text-[#7d8391] mt-1">{s.ar}</p>
                  <p className="text-[15px] text-[#c9c1ab] mt-5 leading-relaxed max-w-xl">{s.desc}</p>

                  <div className="grid sm:grid-cols-2 gap-3 mt-7">
                    {(DETAILS[s.id] || []).map((d) => (
                      <div key={d} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#22c55e] flex items-center justify-center shrink-0 mt-0.5"><Check size={11} className="text-white" strokeWidth={3} /></div>
                        <div className="text-[13.5px] text-[#f5efe1]">{d}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-8">
                    <Link to="/ship-now" className="btn-primary text-[12px] py-2.5 px-4">Book This Service <ArrowUpRight size={14} /></Link>
                    <Link to="/rate-calculator" className="btn-ghost text-[12px] py-2.5 px-4">Calculate Rate</Link>
                  </div>
                </div>
                <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-white/10 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#111a29] to-[#050810]" />
                    <div className="absolute inset-0 bg-grid opacity-40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <Icon size={140} className="text-[#f5b840]/25" strokeWidth={0.8} />
                        <div className="absolute inset-0 flex items-center justify-center font-display text-[54px] font-medium text-[#f5b840]">/{s.code}</div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                      {s.tags.map(t => <span key={t} className="font-mono text-[10px] tracking-wider text-[#f5b840] border border-[#f5b840]/30 bg-[#050810]/70 px-2 py-0.5">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CTABand title="Ready to move?" italic="Let's build your plan." subtitle="Submit a request and our operations directors will scope your requirement within 24 hours." ctaLabel="Get Instant Quote" ctaTo="/rate-calculator" />
      <SiteFooter />
    </div>
  );
}
