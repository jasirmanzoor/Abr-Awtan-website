import React, { useState } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader from '../components/PageHeader';
import { createShipment } from '../lib/api';
import { toast } from '../hooks/use-toast';
import { CTA_WHATSAPP } from '../data/mock';
import { Package, ArrowRight, ArrowLeft, Loader2, CheckCircle2, Copy, Search, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CITIES = ['Riyadh','Jeddah','Makkah','Madinah','Dammam','Al Kharj','Buraydah','Hail','Tabuk','Yanbu','Abha','Jazan','Al Ula','Jubail','Sakaka','Rafha','Najran','Taif','Hafer al Batin','Ar Rass','Marat'];

export default function ShipNow() {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [f, setF] = useState({
    sender_name: '', sender_phone: '', sender_city: 'Riyadh', sender_address: '',
    recipient_name: '', recipient_phone: '', recipient_city: 'Jeddah', recipient_address: '',
    package_type: 'parcel', weight_kg: 2, pieces: 1,
    service_level: 'next_day', payment_mode: 'prepaid', cod_amount: 0, notes: ''
  });
  const set = (k, v) => setF({ ...f, [k]: v });

  const submit = async () => {
    setBusy(true);
    try { const r = await createShipment(f); setResult(r); }
    catch { toast({ title: 'Try again', description: 'Could not create shipment.' }); }
    finally { setBusy(false); }
  };

  const inputCls = 'w-full bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] placeholder:text-[#7d8391] outline-none';
  const canNext = () => {
    if (step === 0) return f.sender_name && f.sender_phone && f.sender_city && f.sender_address;
    if (step === 1) return f.recipient_name && f.recipient_phone && f.recipient_city && f.recipient_address;
    if (step === 2) return f.weight_kg > 0 && f.service_level && f.package_type;
    return true;
  };

  const STEPS = ['Sender', 'Recipient', 'Package', 'Review'];

  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader eyebrow="Ship Now" title="Create a shipment" italic="in under 60 seconds." subtitle="Fill sender, recipient and package details — receive your tracking number instantly." crumbs={[{ label: 'Ship Now' }]} />

      <section className="relative py-16">
        <div className="max-w-[1080px] mx-auto px-6 lg:px-10">
          {result ? (
            <div className="glass-strong corner-brackets p-10 text-center">
              <div className="w-16 h-16 mx-auto border-2 border-[#22c55e] flex items-center justify-center bg-[#22c55e]/10"><CheckCircle2 size={28} className="text-[#22c55e]" /></div>
              <h3 className="font-display text-[32px] font-medium text-[#f5efe1] mt-6">Shipment created</h3>
              <p className="text-[14px] text-[#c9c1ab] mt-3">Your parcel is scheduled for pickup. ETA within {result.eta_hours} hours.</p>
              <div className="mt-8 border border-[#f5b840]/40 bg-[#f5b840]/8 p-6 max-w-md mx-auto">
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840]">Tracking Reference</div>
                <div className="flex items-center justify-between gap-3 mt-2">
                  <div className="font-mono text-[26px] text-[#f5efe1]">{result.tracking_id}</div>
                  <button onClick={() => { navigator.clipboard.writeText(result.tracking_id); toast({ title: 'Copied' }); }} className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#f5b840] hover:text-[#f5b840] text-[#c9c1ab]"><Copy size={14} /></button>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <Link to={`/track?id=${result.tracking_id}`} className="btn-primary"><Search size={14} /> Track Now</Link>
                <a
                  href={`${CTA_WHATSAPP}?text=${encodeURIComponent(`*New Shipment* · Ref ${result.tracking_id}\n\nFrom: ${f.sender_name} (${f.sender_city}) · ${f.sender_phone}\nTo: ${f.recipient_name} (${f.recipient_city}) · ${f.recipient_phone}\nService: ${f.service_level.replace('_',' ')} · ${f.package_type} · ${f.weight_kg}kg\nPayment: ${f.payment_mode === 'cod' ? `COD SAR ${f.cod_amount}` : 'Prepaid'}\n\nPlease confirm pickup schedule.`)}`}
                  target="_blank" rel="noreferrer" data-testid="ship-whatsapp-btn" className="btn-ghost">
                  <MessageCircle size={14} /> WhatsApp Ops
                </a>
                <button onClick={() => { setResult(null); setStep(0); }} className="btn-ghost">Create Another</button>
              </div>
            </div>
          ) : (
            <div className="glass-strong corner-brackets p-8 lg:p-10">
              <div className="flex items-center gap-2 mb-8">
                {STEPS.map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`flex items-center gap-2 ${i <= step ? 'text-[#f5b840]' : 'text-[#7d8391]'}`}>
                      <div className={`w-8 h-8 flex items-center justify-center border font-mono text-[11px] ${i < step ? 'bg-[#22c55e] border-[#22c55e] text-white' : i === step ? 'border-[#f5b840] text-[#f5b840] bg-[#f5b840]/5' : 'border-white/10'}`}>{i + 1}</div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.18em] hidden sm:block">{s}</div>
                    </div>
                    {i < STEPS.length - 1 && <div className={`flex-1 h-[1px] ${i < step ? 'bg-[#22c55e]' : 'bg-white/10'}`} />}
                  </React.Fragment>
                ))}
              </div>

              <div className="min-h-[360px]">
                {step === 0 && (
                  <div className="fade-up">
                    <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-2">Step 01 · Sender</div>
                    <h3 className="font-display text-[24px] font-medium text-[#f5efe1]">Where does the shipment start?</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                      <Input label="Sender name" v={f.sender_name} on={(v) => set('sender_name', v)} />
                      <Input label="Sender phone" v={f.sender_phone} on={(v) => set('sender_phone', v)} />
                      <Select label="Sender city" v={f.sender_city} on={(v) => set('sender_city', v)} opts={CITIES} />
                      <Input label="Pickup address" v={f.sender_address} on={(v) => set('sender_address', v)} />
                    </div>
                  </div>
                )}
                {step === 1 && (
                  <div className="fade-up">
                    <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-2">Step 02 · Recipient</div>
                    <h3 className="font-display text-[24px] font-medium text-[#f5efe1]">Where should it arrive?</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                      <Input label="Recipient name" v={f.recipient_name} on={(v) => set('recipient_name', v)} />
                      <Input label="Recipient phone" v={f.recipient_phone} on={(v) => set('recipient_phone', v)} />
                      <Select label="Destination city" v={f.recipient_city} on={(v) => set('recipient_city', v)} opts={CITIES} />
                      <Input label="Delivery address" v={f.recipient_address} on={(v) => set('recipient_address', v)} />
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="fade-up">
                    <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-2">Step 03 · Package &amp; Service</div>
                    <h3 className="font-display text-[24px] font-medium text-[#f5efe1]">Tell us about the shipment.</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mt-6">
                      <Select label="Package type" v={f.package_type} on={(v) => set('package_type', v)} opts={[['document','Document'],['parcel','Parcel'],['pallet','Pallet'],['freight','Freight / FTL']]} />
                      <Input label="Weight (kg)" v={f.weight_kg} on={(v) => set('weight_kg', parseFloat(v || '0'))} type="number" />
                      <Input label="Pieces" v={f.pieces} on={(v) => set('pieces', parseInt(v || '1'))} type="number" />
                      <Select label="Service level" v={f.service_level} on={(v) => set('service_level', v)} opts={[['express','Express (2-6h)'],['same_day','Same-day'],['next_day','Next-day'],['standard','Standard']]} />
                      <Select label="Payment" v={f.payment_mode} on={(v) => set('payment_mode', v)} opts={[['prepaid','Prepaid'],['cod','Cash on Delivery']]} />
                      {f.payment_mode === 'cod' && <Input label="COD amount (SAR)" v={f.cod_amount} on={(v) => set('cod_amount', parseFloat(v || '0'))} type="number" />}
                      <div className="sm:col-span-2">
                        <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840]">Notes (optional)</label>
                        <textarea rows={3} value={f.notes} onChange={e => set('notes', e.target.value)} className={inputCls + ' mt-2 resize-none'} placeholder="Fragile, cold chain, delivery window, etc." />
                      </div>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="fade-up">
                    <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-2">Step 04 · Review</div>
                    <h3 className="font-display text-[24px] font-medium text-[#f5efe1]">Confirm the shipment.</h3>
                    <div className="grid sm:grid-cols-2 gap-3 mt-6">
                      <Row k="From" v={`${f.sender_name} · ${f.sender_city}`} />
                      <Row k="To" v={`${f.recipient_name} · ${f.recipient_city}`} />
                      <Row k="Package" v={`${f.package_type} · ${f.weight_kg} kg · ${f.pieces} pc`} />
                      <Row k="Service" v={f.service_level.replace('_', ' ')} />
                      <Row k="Payment" v={f.payment_mode === 'cod' ? `COD SAR ${f.cod_amount}` : 'Prepaid'} />
                      {f.notes && <Row k="Notes" v={f.notes} full />}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
                <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="btn-ghost text-[12px] py-2.5 px-4 disabled:opacity-40"><ArrowLeft size={14} /> Back</button>
                <div className="font-mono text-[10px] text-[#7d8391] tracking-[0.22em]">STEP {step + 1} OF {STEPS.length}</div>
                {step < STEPS.length - 1 ? (
                  <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()} className="btn-primary text-[12px] py-2.5 px-4 disabled:opacity-40">Continue <ArrowRight size={14} /></button>
                ) : (
                  <button onClick={submit} disabled={busy} className="btn-primary text-[12px] py-2.5 px-4">{busy ? <><Loader2 size={14} className="animate-spin" /> Creating…</> : <>Create Shipment <Package size={14} /></>}</button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Input({ label, v, on, type = 'text' }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840]">{label}</label>
      <input type={type} value={v} onChange={e => on(e.target.value)} className="w-full mt-2 bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] outline-none" />
    </div>
  );
}
function Select({ label, v, on, opts }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840]">{label}</label>
      <select value={v} onChange={e => on(e.target.value)} className="w-full mt-2 bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] outline-none">
        {opts.map(o => Array.isArray(o) ? <option key={o[0]} value={o[0]}>{o[1]}</option> : <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
function Row({ k, v, full }) {
  return <div className={`border border-white/8 bg-[#050810] p-4 ${full ? 'sm:col-span-2' : ''}`}><div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391]">{k}</div><div className="text-[14px] text-[#f5efe1] mt-1">{v}</div></div>;
}
