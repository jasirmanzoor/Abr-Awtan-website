import React from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader, { CTABand } from '../components/PageHeader';
import { Truck, Snowflake, Package, Wrench, Fuel, Radio, Shield } from 'lucide-react';

const VEHICLES = [
  { name: '2-Ton Cargo Van', category: 'Light Fleet', count: 62, capacity: '1,500 kg', use: 'Last-mile B2C, express parcels, small-parcel distribution', img: 'https://images.unsplash.com/photo-1601912552080-0fb89fd08042' },
  { name: '3-Ton Box Truck', category: 'Medium Fleet', count: 44, capacity: '3,000 kg', use: 'Urban B2B branch distribution and mid-volume shipments', img: 'https://images.pexels.com/photos/5410923/pexels-photo-5410923.jpeg' },
  { name: '10-Ton Curtain Sider', category: 'Heavy Fleet', count: 21, capacity: '10,000 kg', use: 'Regional linehaul & cross-city bulk cargo', img: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242' },
  { name: '40ft Reefer Trailer', category: 'Cold Chain', count: 12, capacity: '24,000 kg', use: 'Temperature-controlled pharma & FMCG', img: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e' },
  { name: '40ft Flatbed Trailer', category: 'Heavy Fleet', count: 9, capacity: '25,000 kg', use: 'Machinery, project cargo, out-of-gauge freight', img: 'https://images.pexels.com/photos/11666903/pexels-photo-11666903.jpeg' },
  { name: 'Rider Motorbikes', category: 'Express', count: 42, capacity: '25 kg', use: '2-6 hour intra-city express delivery', img: 'https://images.pexels.com/photos/14053428/pexels-photo-14053428.jpeg' }
];

const CAPS = [
  { icon: Radio, title: 'GPS + Telematics', desc: 'Every vehicle live-tracked with driver behaviour analytics.' },
  { icon: Snowflake, title: 'Cold Chain Ready', desc: 'Reefer fleet maintains 2–25°C for pharma & food.' },
  { icon: Wrench, title: 'In-House Maintenance', desc: 'Owned workshop with ISO 9001 servicing schedule.' },
  { icon: Fuel, title: 'Fuel-Optimized', desc: 'Route-planned dispatch minimizes empty miles.' },
  { icon: Shield, title: 'Fully Insured', desc: 'Comprehensive fleet & cargo cover — no surprises.' },
  { icon: Package, title: 'Cargo Protection', desc: 'Load-secured, seal-tracked, tamper-evident.' }
];

export default function Fleet() {
  const total = VEHICLES.reduce((s, v) => s + v.count, 0);
  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader eyebrow="Fleet" title="190+ owned vehicles." italic="Zero brokerage." subtitle="Every vehicle in the field wears our colours, is driven by our people, and is maintained in our workshops. That's what accountability looks like." crumbs={[{ label: 'Fleet' }]} />

      <section className="relative py-16 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[[`${total}+`, 'Total Vehicles'], ['6', 'Categories'], ['99.2%', 'Uptime'], ['24/7', 'Dispatch']].map(([v, l]) => (
              <div key={l} className="border border-white/8 bg-[#0a0f1a] p-6">
                <div className="font-display text-[38px] font-medium text-[#f5b840] leading-none">{v}</div>
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391] mt-3">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="section-tag mb-4">Vehicle Categories</div>
          <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-[#f5efe1] tracking-tight mb-12">Right vehicle. <span className="italic text-amber-grad">Every payload.</span></h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VEHICLES.map((v) => (
              <div key={v.name} className="group border border-white/8 bg-[#0a0f1a] overflow-hidden hover:border-[#f5b840]/30 transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={v.img} alt={v.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840] bg-[#050810]/70 border border-[#f5b840]/30 px-2.5 py-1">{v.category}</div>
                  <div className="absolute bottom-4 right-4 font-display text-[28px] font-semibold text-[#f5b840]">{v.count}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[22px] font-medium text-[#f5efe1] leading-tight">{v.name}</h3>
                  <div className="flex items-center gap-2 mt-2"><Truck size={13} className="text-[#f5b840]" /><span className="font-mono text-[11px] text-[#c9c1ab]">Cap. {v.capacity}</span></div>
                  <p className="text-[13px] text-[#c9c1ab] mt-3 leading-relaxed">{v.use}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a0f1a] border-y border-white/5 py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="section-tag mb-4">Fleet Capabilities</div>
          <h2 className="font-display text-[36px] lg:text-[48px] font-medium text-[#f5efe1] tracking-tight mb-10">Built for <span className="italic text-amber-grad">every terrain.</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPS.map((c) => (
              <div key={c.title} className="border border-white/8 bg-[#050810] p-7 hover:border-[#f5b840]/30 transition">
                <div className="w-11 h-11 border border-[#f5b840]/30 bg-[#f5b840]/5 flex items-center justify-center"><c.icon size={18} className="text-[#f5b840]" /></div>
                <h4 className="font-display text-[20px] font-medium text-[#f5efe1] mt-5">{c.title}</h4>
                <p className="text-[13px] text-[#c9c1ab] mt-2 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Need a dedicated fleet?" italic="Lease from us." subtitle="Daily and monthly leasing with owned drivers or bare-vehicle options. Get pricing in minutes." ctaLabel="Request Fleet" ctaTo="/contact" />
      <SiteFooter />
    </div>
  );
}
