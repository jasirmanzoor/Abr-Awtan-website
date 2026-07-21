import React, { useState } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader from '../components/PageHeader';
import { calcRate } from '../lib/api';
import { Loader2, Calculator, ArrowRight, Package, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const CITIES = ['Riyadh','Jeddah','Makkah','Madinah','Dammam','Al Kharj','Buraydah','Hail','Tabuk','Yanbu','Abha','Jazan','Al Ula','Jubail','Sakaka','Rafha','Najran','Taif','Hafer al Batin','Ar Rass'];

export default function RateCalculator() {
  const [f, setF] = useState({ origin_city: 'Riyadh', destination_city: 'Jeddah', weight_kg: 5, pieces: 1, service_level: 'next_day', package_type: 'parcel' });
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState(null);

  const calc = async (e) => {
    e.preventDefault();
    setBusy(true);
    try { setOut(await calcRate(f)); }
    catch { setOut(null); }
    finally { setBusy(false); }
  };

  const set = (k, v) => setF({ ...f, [k]: v });

  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader eyebrow="Rate Calculator" title="Get an instant" italic="price estimate." subtitle="Zone-based pricing across the Kingdom with real-time VAT breakdown. Estimates for planning only — book to lock the price." crumbs={[{ label: 'Rate Calculator' }]} />

      <section className="relative py-16">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-8">
          <form onSubmit={calc} className="lg:col-span-7 glass-strong corner-brackets p-8 lg:p-10">
            <div className="section-tag mb-4">Shipment details</div>
            <h3 className="font-display text-[24px] font-medium text-[#f5efe1]">Tell us what you're shipping.</h3>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <Select label="Origin city" v={f.origin_city} on={(v) => set('origin_city', v)} opts={CITIES} />
              <Select label="Destination city" v={f.destination_city} on={(v) => set('destination_city', v)} opts={CITIES} />
              <Select label="Package type" v={f.package_type} on={(v) => set('package_type', v)} opts={[['document','Document'],['parcel','Parcel'],['pallet','Pallet'],['freight','Freight / FTL']]} />
              <Input label="Weight (kg)" v={f.weight_kg} on={(v) => set('weight_kg', parseFloat(v || '0'))} type="number" />
              <Input label="Pieces" v={f.pieces} on={(v) => set('pieces', parseInt(v || '1'))} type="number" />
              <Select label="Service level" v={f.service_level} on={(v) => set('service_level', v)} opts={[['express','Express (2-6h)'],['same_day','Same-day'],['next_day','Next-day'],['standard','Standard']]} />
            </div>
            <button type="submit" disabled={busy} className="btn-primary mt-8">{busy ? <><Loader2 size={14} className="animate-spin" /> Calculating…</> : <><Calculator size={14} /> Calculate Rate</>}</button>
          </form>

          <div className="lg:col-span-5">
            {out ? (
              <div className="border border-[#f5b840]/40 bg-gradient-to-br from-[#0a0f1a] to-[#050810] p-8 fade-up sticky top-32">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#f5b840] font-semibold">Your Estimate</div>
                  <div className="font-mono text-[10px] text-[#22c55e] flex items-center gap-1"><TrendingUp size={11} /> LIVE</div>
                </div>
                <div className="mt-6">
                  <div className="font-display text-[64px] lg:text-[72px] font-medium text-[#f5efe1] leading-none tracking-[-0.02em]">
                    {out.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    <span className="text-[24px] text-[#f5b840] ml-2">SAR</span>
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391] mt-3">Total incl. 15% VAT</div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/8 space-y-2 text-[13px] text-[#c9c1ab]">
                  <Line k="Base" v={`SAR ${out.breakdown.base}`} />
                  <Line k="Weight charge" v={`SAR ${out.breakdown.weight_charge}`} />
                  <Line k="Zone charge" v={`SAR ${out.breakdown.zone_charge}`} />
                  <Line k="Service multiplier" v={`${out.breakdown.service_multiplier}x`} />
                  <Line k="Subtotal" v={`SAR ${out.subtotal.toFixed(2)}`} />
                  <Line k="VAT (15%)" v={`SAR ${out.vat.toFixed(2)}`} />
                </div>

                <div className="mt-6 pt-6 border-t border-white/8">
                  <div className="flex items-center gap-2"><Package size={14} className="text-[#f5b840]" /><div className="text-[13px] text-[#f5efe1]">Delivery in {out.eta}</div></div>
                </div>

                <Link to="/ship-now" className="btn-primary w-full justify-center mt-8">Book This Shipment <ArrowRight size={14} /></Link>
              </div>
            ) : (
              <div className="border border-white/8 bg-[#0a0f1a] p-8 lg:sticky lg:top-32">
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Your Estimate</div>
                <div className="font-display text-[64px] font-medium text-[#7d8391]/30 leading-none tracking-[-0.02em] mt-4">—</div>
                <p className="text-[13px] text-[#7d8391] mt-6">Fill in your shipment details and press Calculate to see your instant estimate.</p>
                <div className="mt-8 pt-6 border-t border-white/5 text-[12px] text-[#7d8391]">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#f5b840] mb-2">Included in every quote</div>
                  <ul className="space-y-1">
                    <li>• Owned fleet dispatch</li>
                    <li>• Insurance up to SAR 5,000</li>
                    <li>• Live tracking</li>
                    <li>• ZATCA-compliant invoicing</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Input({ label, v, on, type = 'text' }) {
  return <div><label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840]">{label}</label><input type={type} value={v} onChange={e => on(e.target.value)} className="w-full mt-2 bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] outline-none" /></div>;
}
function Select({ label, v, on, opts }) {
  return <div><label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840]">{label}</label><select value={v} onChange={e => on(e.target.value)} className="w-full mt-2 bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] outline-none">{opts.map(o => Array.isArray(o) ? <option key={o[0]} value={o[0]}>{o[1]}</option> : <option key={o} value={o}>{o}</option>)}</select></div>;
}
function Line({ k, v }) { return <div className="flex justify-between"><span className="text-[#7d8391]">{k}</span><span className="font-mono text-[#f5efe1]">{v}</span></div>; }
