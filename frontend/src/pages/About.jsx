import React from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader, { CTABand } from '../components/PageHeader';
import { LEADERS } from '../data/mock';
import { Award, ShieldCheck, Building2, Zap, Radio, Flag, Users, Quote, Linkedin, MapPin } from 'lucide-react';

const MILESTONES = [
  { year: '2019', title: 'Founded', desc: 'Established in Riyadh with 10 vehicles and a mission to own the physical supply chain.' },
  { year: '2021', title: 'Nationwide Reach', desc: 'Expanded operations to all 5 major Saudi regions with 4 owned warehouses.' },
  { year: '2023', title: 'Compliance & Tech', desc: 'ZATCA registration, FASAH accreditation, and launch of our proprietary WMS.' },
  { year: '2024', title: 'Enterprise Partnerships', desc: 'Signed Aramex, iMile, Aymakan, Zajil, SMSA as top-tier partners across the Kingdom.' },
  { year: '2026', title: 'Scale & Innovation', desc: '9 warehouses, 500+ direct employees, 150+ owned vehicles, 25+ cities — and growing.' }
];

const VALUES = [
  { icon: ShieldCheck, title: 'Direct Ownership', desc: 'Every asset in the field belongs to us — no leased brand-lift.' },
  { icon: Zap, title: 'Operational Excellence', desc: 'Documented processes, real KPIs, verifiable outcomes.' },
  { icon: Radio, title: 'Total Accountability', desc: 'One partner. One dashboard. One throat to choke.' },
  { icon: Flag, title: 'Saudi-First', desc: 'Built in the Kingdom, for the Kingdom — with local know-how in remote regions.' }
];

export default function About() {
  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader eyebrow="About Us" title="The physical foundation of" italic="Saudi logistics." subtitle="Founded in 2019, Abr Al Awtan grew from a 10-vehicle operator into the Kingdom's most vertically integrated B2B logistics infrastructure company — with warehouses, workforce, and vehicles we own outright." crumbs={[{ label: 'About' }]} bg="https://images.pexels.com/photos/4487363/pexels-photo-4487363.jpeg" />

      <section className="relative py-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-14">
          <div>
            <div className="section-tag mb-4">Our Story</div>
            <h2 className="font-display text-[36px] lg:text-[46px] font-medium text-[#f5efe1] leading-tight tracking-tight">From 10 vehicles to a <span className="italic text-amber-grad">Kingdom-scale network.</span></h2>
            <p className="text-[15px] text-[#c9c1ab] mt-6 leading-relaxed">Abr Al Awtan was founded on a stubborn conviction: that Saudi logistics deserved a genuine operator, not another aggregator. Six years later, we're the physical backbone that global brands and government programs quietly depend on.</p>
            <p className="text-[15px] text-[#c9c1ab] mt-4 leading-relaxed">Every warehouse, every truck, every worker is directly owned or employed by us. That single-source accountability is what unlocks the SLAs we guarantee in the toughest corners of the Kingdom.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['9+', 'Years Operating'], ['500+', 'Direct Staff'], ['150+', 'Owned Vehicles'], ['25+', 'Cities Covered'], ['9', 'Warehouses'], ['6M+', 'Annual Orders']].map(([v, l]) => (
              <div key={l} className="border border-white/8 bg-[#0a0f1a] p-5">
                <div className="font-display text-[30px] font-medium text-[#f5b840] leading-none">{v}</div>
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391] mt-3">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a0f1a] border-y border-white/5 py-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="section-tag mb-4">Journey</div>
          <h2 className="font-display text-[36px] lg:text-[46px] font-medium text-[#f5efe1] tracking-tight mb-12">Key milestones in our <span className="italic text-amber-grad">growth story.</span></h2>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-white/8" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className="grid grid-cols-[40px_1fr] gap-6 items-start">
                  <div className="relative w-10 h-10 border border-[#f5b840] bg-[#050810] font-mono text-[11px] text-[#f5b840] flex items-center justify-center">{i + 1}</div>
                  <div className="border-l-2 border-[#f5b840]/40 pl-6 pb-4">
                    <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840]">{m.year}</div>
                    <h3 className="font-display text-[22px] font-medium text-[#f5efe1] mt-1">{m.title}</h3>
                    <p className="text-[14px] text-[#c9c1ab] mt-2 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="leadership" className="relative py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="section-tag mb-4">Leadership</div>
          <h2 className="font-display text-[36px] lg:text-[52px] font-medium text-[#f5efe1] tracking-tight mb-12">The minds behind <span className="italic text-amber-grad">the mission.</span></h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {LEADERS.map((l, idx) => (
              <article key={l.name} className="group relative border border-white/8 bg-[#0a0f1a] overflow-hidden hover:border-[#f5b840]/25 transition p-8 lg:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 border border-[#f5b840]/40 bg-[#f5b840]/8 flex items-center justify-center font-display text-[26px] font-semibold text-[#f5b840]">
                      {l.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-display text-[26px] font-medium text-[#f5efe1] leading-tight">{l.name}</h3>
                      <div className="font-arabic text-[14px] text-[#7d8391] mt-1">{l.nameAr}</div>
                    </div>
                  </div>
                  {idx === 1 && (
                    <a href="https://www.linkedin.com/in/jasir-kuloo-7539301b7" target="_blank" rel="noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#f5b840] hover:text-[#f5b840] transition">
                      <Linkedin size={13} />
                    </a>
                  )}
                </div>
                <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#f5b840] mt-6 font-semibold">{l.role}</div>
                <div className="flex items-center gap-2 mt-2 text-[12px] text-[#c9c1ab]">
                  <MapPin size={12} className="text-[#f5b840]" /> {l.location}
                </div>
                <div className="mt-6 border-l-2 border-[#f5b840]/60 pl-5">
                  <Quote size={16} className="text-[#f5b840] mb-2" />
                  <p className="text-[15px] text-[#f5efe1] leading-relaxed italic">“{l.quote}”</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-[#0a0f1a] border-y border-white/5 py-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="section-tag mb-4">Values</div>
          <h2 className="font-display text-[36px] lg:text-[46px] font-medium text-[#f5efe1] tracking-tight mb-12">What we <span className="italic text-amber-grad">refuse to compromise on.</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v) => (
              <div key={v.title} className="border border-white/8 bg-[#050810] p-6">
                <v.icon size={22} className="text-[#f5b840]" />
                <h4 className="font-display text-[20px] font-medium text-[#f5efe1] mt-5">{v.title}</h4>
                <p className="text-[13px] text-[#c9c1ab] mt-2 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Partner with the operator." italic="Not the reseller." ctaLabel="Start Conversation" ctaTo="/contact" />
      <SiteFooter />
    </div>
  );
}
