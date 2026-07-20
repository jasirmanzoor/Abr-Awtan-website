import React from 'react';
import { REGIONS } from '../data/mock';
import { MapPin, Warehouse, Radio, Store as StoreIcon } from 'lucide-react';

const typeIcon = { Warehouse: Warehouse, Station: Radio, Store: StoreIcon };
const typeColor = { Warehouse: '#e6a446', Station: '#ffffff', Store: '#8a8577' };

export default function Locations() {
  return (
    <section className="relative bg-[#0d1420] pb-28">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="section-tag mb-3">All Locations <span className="font-arabic text-[13px] tracking-normal text-[#9a9585] normal-case">جميع المواقع</span></div>
            <h3 className="font-display text-[28px] lg:text-[36px] font-medium">Every region. Every asset.</h3>
          </div>
        </div>

        <div className="space-y-8">
          {REGIONS.map((r) => (
            <div key={r.name}>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-[#e6a446]" />
                  <h4 className="text-[13px] tracking-[0.22em] uppercase text-[#f4ecdc] font-semibold">{r.name}</h4>
                </div>
                <div className="text-[11px] text-[#9a9585]">{r.count} locations</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {r.locations.map((l, i) => {
                  const Icon = typeIcon[l.type];
                  return (
                    <div key={l.name + i} className="group border border-white/5 bg-[#111a29] p-4 hover:border-[#e6a446]/30 transition">
                      <div className="flex items-start justify-between">
                        <div className="text-[14px] text-[#f4ecdc] font-medium">{l.name}</div>
                        <Icon size={14} className="text-[#9a9585] group-hover:text-[#e6a446] transition" />
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: typeColor[l.type] }} />
                        <span className="text-[10px] tracking-[0.22em] uppercase text-[#9a9585]">{l.type}</span>
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
