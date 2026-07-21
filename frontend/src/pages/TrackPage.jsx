import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader from '../components/PageHeader';
import { trackShipment } from '../lib/api';
import { Search, Loader2, CheckCircle2, MapPin, Truck, Package } from 'lucide-react';

export default function TrackPage() {
  const [params] = useSearchParams();
  const [id, setId] = useState(params.get('id') || '');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [data, setData] = useState(null);

  const track = async (tid) => {
    setLoading(true); setErr(''); setData(null);
    try { const r = await trackShipment(tid); setData(r); }
    catch { setErr(`No shipment found for ${tid}. Try AAW-48291736 as a demo.`); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (params.get('id')) track(params.get('id')); }, []);

  const submit = (e) => { e.preventDefault(); if (id) track(id); };

  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader eyebrow="Live Tracking" title="Track any parcel" italic="in real-time." subtitle="Enter your tracking reference to see live status across the Kingdom — from fulfillment to your customer's doorstep." crumbs={[{ label: 'Track' }]} />

      <section className="relative py-16">
        <div className="max-w-[1080px] mx-auto px-6 lg:px-10">
          <form onSubmit={submit} className="flex gap-2">
            <input value={id} onChange={(e) => setId(e.target.value.toUpperCase())} placeholder="e.g. AAW-48291736" className="flex-1 bg-[#0a0f1a] border border-white/10 focus:border-[#f5b840] px-5 py-4 text-[14px] font-mono text-[#f5efe1] outline-none" />
            <button type="submit" className="btn-primary px-6">{loading ? <Loader2 size={16} className="animate-spin" /> : <><Search size={14} /> Track</>}</button>
          </form>
          <div className="flex items-center gap-2 mt-3 text-[12px] text-[#7d8391] font-mono">
            <span>Demo:</span>
            {['AAW-48291736','AAW-77123902','AAW-99045128'].map(x => (
              <button key={x} onClick={() => { setId(x); track(x); }} className="text-[#f5b840] hover:underline">{x}</button>
            ))}
          </div>

          <div className="mt-10">
            {err && <div className="glass p-8 border-[#ef4444]/30 border text-[#c9c1ab]"><div className="font-mono text-[11px] text-[#ef4444] uppercase tracking-[0.22em]">Not Found</div><div className="mt-2 text-[14px]">{err}</div></div>}

            {data && (
              <div className="glass-strong corner-brackets p-6 lg:p-10 fade-up">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/8">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Reference</div>
                    <div className="font-mono text-[18px] text-[#f5b840] mt-0.5">{data.tracking_id}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Route</div>
                    <div className="text-[14px] text-[#f5efe1] mt-0.5">{data.route}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Service</div>
                    <div className="text-[14px] text-[#f5efe1] mt-0.5 capitalize">{(data.service_level || 'standard').replace('_', ' ')}</div>
                  </div>
                  <div className="flex items-center gap-2 border border-[#22c55e]/40 bg-[#22c55e]/10 px-3 py-1.5">
                    <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
                    <span className="font-mono text-[11px] text-[#22c55e] tracking-wider uppercase">{(data.status || 'received').replace('_', ' ')}</span>
                  </div>
                </div>

                <div className="mt-8 relative">
                  <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/8" />
                  <div className="space-y-5">
                    {(data.events || []).map((ev, i) => {
                      const current = i === data.events.length - 1;
                      return (
                        <div key={i} className="flex items-start gap-5">
                          <div className={`relative w-10 h-10 flex items-center justify-center border ${current ? 'bg-[#f5b840] border-[#f5b840] glow-ping' : 'bg-[#22c55e] border-[#22c55e]'}`}>
                            {current ? <Truck size={14} className="text-[#050810]" /> : <CheckCircle2 size={14} className="text-white" />}
                          </div>
                          <div className="flex-1 pt-2">
                            <div className="text-[15px] font-medium text-[#f5efe1]">{ev.label}</div>
                            <div className="text-[12px] text-[#7d8391] mt-0.5 flex items-center gap-1.5"><MapPin size={11} className="text-[#f5b840]" /> {ev.location}</div>
                          </div>
                          <div className="font-mono text-[11px] text-[#7d8391] pt-2 whitespace-nowrap">{new Date(ev.ts).toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {!data && !err && !loading && (
              <div className="glass p-12 text-center">
                <div className="w-14 h-14 mx-auto border border-[#f5b840]/30 bg-[#f5b840]/5 flex items-center justify-center"><Package size={22} className="text-[#f5b840]" /></div>
                <div className="font-display text-[22px] font-medium text-[#f5efe1] mt-6">Enter a tracking reference above.</div>
                <div className="text-[13px] text-[#7d8391] mt-2">Try one of the demo IDs for a live preview.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
