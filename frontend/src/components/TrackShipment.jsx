import React, { useState } from 'react';
import { TRACK_STAGES } from '../data/mock';
import { Search, MapPin, CheckCircle2, Truck, Package, Loader2 } from 'lucide-react';

export default function TrackShipment() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);
  const [step, setStep] = useState(4); // Current position in the timeline

  const track = (e) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setShown(true); }, 1200);
  };

  return (
    <section id="track" className="relative bg-[#050810] py-28 lg:py-32 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <div className="section-tag mb-5">Live Tracking</div>
            <h2 className="font-display text-[38px] lg:text-[48px] leading-[1.05] font-medium tracking-[-0.025em] text-[#f5efe1]">
              Track any parcel <br /><span className="italic text-amber-grad">in real-time.</span>
            </h2>
            <p className="text-[15px] text-[#c9c1ab] mt-5 leading-relaxed">
              Enter your reference to see live status across the Kingdom — from fulfillment to your customer&rsquo;s doorstep.
            </p>

            <form onSubmit={track} className="mt-8">
              <div className="flex">
                <input value={id} onChange={(e) => setId(e.target.value)} placeholder="AAW-XXXXXXXX or waybill"
                  className="flex-1 bg-[#0a0f1a] border border-white/10 focus:border-[#f5b840] px-4 py-3.5 text-[13px] font-mono text-[#f5efe1] outline-none transition" />
                <button type="submit" className="btn-primary px-5">
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3 text-[11px] text-[#7d8391] font-mono">
                <span>Try:</span>
                <button type="button" onClick={() => setId('AAW-48291736')} className="text-[#f5b840] hover:underline">AAW-48291736</button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-8">
            <div className="glass corner-brackets p-6 lg:p-8 min-h-[500px]">
              {!shown && !loading && (
                <div className="flex flex-col items-center justify-center h-full min-h-[440px] text-center">
                  <div className="w-14 h-14 border border-[#f5b840]/30 bg-[#f5b840]/5 flex items-center justify-center">
                    <Package size={22} className="text-[#f5b840]" />
                  </div>
                  <div className="font-display text-[24px] font-medium text-[#f5efe1] mt-6">Awaiting reference</div>
                  <div className="text-[13px] text-[#7d8391] mt-2">Enter an AAW tracking code to view live shipment status.</div>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center h-full min-h-[440px] text-center">
                  <Loader2 size={28} className="text-[#f5b840] animate-spin" />
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#7d8391] mt-4">Pinging command center…</div>
                </div>
              )}

              {shown && (
                <div className="fade-up">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/8">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Reference</div>
                      <div className="font-mono text-[16px] text-[#f5b840] mt-0.5">{id.toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Route</div>
                      <div className="text-[14px] text-[#f5efe1] mt-0.5">Riyadh → Jeddah</div>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">Service</div>
                      <div className="text-[14px] text-[#f5efe1] mt-0.5">Linehaul + Last-Mile</div>
                    </div>
                    <div className="flex items-center gap-2 border border-[#22c55e]/40 bg-[#22c55e]/10 px-3 py-1.5">
                      <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
                      <span className="font-mono text-[11px] text-[#22c55e] tracking-wider uppercase">In-transit</span>
                    </div>
                  </div>

                  <div className="mt-8 relative">
                    {/* Vertical connector line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-white/8" />
                    <div className="absolute left-[19px] top-4 w-[2px] bg-gradient-to-b from-[#22c55e] to-[#f5b840]" style={{ height: `${(step / (TRACK_STAGES.length - 1)) * 100}%` }} />

                    <div className="space-y-5">
                      {TRACK_STAGES.map((s, i) => {
                        const done = i < step; const current = i === step;
                        return (
                          <div key={i} className="flex items-start gap-5 relative">
                            <div className={`relative w-10 h-10 flex items-center justify-center border ${done ? 'bg-[#22c55e] border-[#22c55e]' : current ? 'bg-[#f5b840] border-[#f5b840] glow-ping' : 'border-white/15 bg-[#050810]'}`}>
                              {done ? <CheckCircle2 size={14} className="text-white" /> : current ? <Truck size={14} className="text-[#050810]" /> : <MapPin size={12} className="text-[#7d8391]" />}
                            </div>
                            <div className="flex-1 pt-2">
                              <div className={`text-[15px] font-medium ${done || current ? 'text-[#f5efe1]' : 'text-[#7d8391]'}`}>{s.label}</div>
                              <div className="text-[12px] text-[#7d8391] mt-0.5">{s.location}</div>
                            </div>
                            <div className="font-mono text-[11px] text-[#7d8391] pt-2 whitespace-nowrap">{s.time}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
