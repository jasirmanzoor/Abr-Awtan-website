import React from 'react';
import { REGIONS } from '../data/mock';
import { MapPin, Warehouse, Radio, Store as StoreIcon } from 'lucide-react';

const typeIcon = { Warehouse: Warehouse, Station: Radio, Store: StoreIcon };
const typeColor = { Warehouse: '#f5b840', Station: '#ffffff', Store: '#c9c1ab' };

export default function Locations() {
  return (
    <section className="relative bg-[#050810] pb-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="section-tag mb-4">Every region · Every asset</div>
            <h3 className="font-display text-[28px] lg:text-[36px] font-medium text-[#f5efe1] tracking-tight">Fully owned, fully accountable.</h3>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONS.map((r) => (
            <div key={r.name} className="border border-white/8 bg-[#0a0f1a] p-6 hover:border-[#f5b840]/25 transition">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#f5b840]" />
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5efe1] font-semibold">{r.name}</div>
                </div>
                <div className="font-mono text-[10px] text-[#7d8391]">{r.count} · sites</div>
              </div>
              <div className="space-y-2">
                {r.locations.map((l, i) => {
                  const Icon = typeIcon[l.type];
                  return (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div className="flex items-center gap-2.5">
                        <Icon size={13} className="text-[#7d8391]" />
                        <span className="text-[13px] text-[#f5efe1]">{l.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: typeColor[l.type] }} />
                        <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#7d8391]">{l.type}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
