import React from 'react';
import { GALLERY } from '../data/mock';

export default function Gallery() {
  return (
    <section className="relative bg-[#111a29] border-t border-white/5 py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <div className="section-tag mb-3">Infrastructure Gallery <span className="font-arabic text-[13px] tracking-normal text-[#9a9585] normal-case">معرض البنية التحتية</span></div>
          <h3 className="font-display text-[34px] lg:text-[46px] font-medium tracking-tight">Real Assets. <span className="italic text-[#e6a446]">Real Operations.</span></h3>
          <p className="text-[15px] text-[#c9c1ab] mt-4 max-w-2xl leading-relaxed">
            Photos of our warehouses, vehicle fleet, and team showcase the physical infrastructure that powers the network across the Kingdom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {GALLERY.map((g) => (
            <div key={g.title} className="group relative aspect-[3/4] overflow-hidden bg-[#0d1420] border border-white/5">
              <img src={g.image} alt={g.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1420] via-[#0d1420]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="h-[1px] w-8 bg-[#e6a446] mb-3" />
                <div className="font-display text-[20px] font-medium text-[#f4ecdc]">{g.title}</div>
                <div className="font-arabic text-[13px] text-[#9a9585] mt-0.5">{g.titleAr}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-[11px] tracking-[0.24em] uppercase text-[#9a9585]">
          Real data from Abrat Awtan KSA Network
        </div>
      </div>
    </section>
  );
}
