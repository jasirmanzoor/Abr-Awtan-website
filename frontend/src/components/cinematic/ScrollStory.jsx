import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileCheck2, Truck, PackageOpen, Bike, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

const CHAPTERS = [
  { icon: FileCheck2, code: '01', title: 'Custom Clearance', tag: 'PORT OF ENTRY',
    body: 'Every shipment begins with paperwork. Our FASAH-certified team pre-clears documentation before your goods land — no ports queued, no bonded delays.',
    accent: 'from-[#f5b840]/25 to-transparent' },
  { icon: Truck, code: '02', title: 'Linehaul & Trucking', tag: 'INTERCITY BACKBONE',
    body: 'Owned heavy fleet moves your goods across GCC corridors. Refrigerated, dry, hazmat — our drivers, our trucks, our accountability.',
    accent: 'from-[#22c55e]/25 to-transparent' },
  { icon: Warehouse, code: '03', title: 'Warehousing & Fulfillment', tag: 'THE HUB',
    body: 'ZATCA-compliant bonded storage with WMS integration to Salla, Zid, Shopify. RFID-tracked inventory, pick-pack-ship in under 4 hours.',
    accent: 'from-[#f5b840]/25 to-transparent' },
  { icon: Bike, code: '04', title: 'Last-Mile Delivery', tag: "YOUR CUSTOMER'S DOOR",
    body: 'The final 500 meters matter most. OTP verification, cash-on-delivery, live customer alerts — handled by our own riders. 99% first-attempt success.',
    accent: 'from-[#22c55e]/25 to-transparent' }
];

function Chapter({ c, i, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const xText = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, 30]);
  const yIcon = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <div ref={ref} className="h-screen flex items-center justify-center">
      <motion.div style={{ opacity, scale }} className="max-w-[1240px] mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-10 items-center">
        <motion.div style={{ x: xText }} className="lg:col-span-6 order-2 lg:order-1">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] uppercase text-[#f5b840]">
            <span className="text-[46px] font-display text-[#f5b840]/40 leading-none">{c.code}</span>
            <div className="h-8 w-[1px] bg-[#f5b840]/40" />
            <div>
              <div className="text-[#7d8391]">Chapter {i + 1} of {total}</div>
              <div className="text-[#f5b840] font-semibold mt-0.5">{c.tag}</div>
            </div>
          </div>

          <h2 className="font-display text-[46px] lg:text-[80px] font-medium leading-[0.98] tracking-[-0.03em] text-[#f5efe1] mt-6">
            {c.title}
          </h2>

          <p className="text-[17px] text-[#c9c1ab] mt-6 leading-[1.7] max-w-xl">{c.body}</p>

          <div className="flex items-center gap-6 mt-10">
            <Link to="/services" className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] border-b border-[#f5b840]/40 pb-1 hover:border-[#f5b840] transition">
              Explore Capability →
            </Link>
          </div>
        </motion.div>

        <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-square flex items-center justify-center">
          <motion.div style={{ y: yIcon }} className="relative">
            <div className={`absolute inset-0 bg-gradient-radial ${c.accent} blur-3xl scale-150 rounded-full`} />
            <div className="relative w-[280px] h-[280px] lg:w-[420px] lg:h-[420px] border border-[#f5b840]/25 bg-gradient-to-br from-[#0a0f1a] to-[#050810] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#f5b840]" />
              <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#f5b840]" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-[#f5b840]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#f5b840]" />
              <c.icon size={200} className="text-[#f5b840] relative z-10" strokeWidth={0.6} />
              <div className="absolute top-6 left-6 font-mono text-[11px] tracking-[0.24em] text-[#f5b840]/70">/{c.code}</div>
              <div className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.22em] text-[#7d8391]">SERVICE MATRIX</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section className="relative bg-[#050810]">
      <div className="sticky top-0 h-24 z-10 bg-gradient-to-b from-[#050810] to-transparent flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
          <div className="section-tag">The Journey · Every Step Owned</div>
        </div>
      </div>
      {CHAPTERS.map((c, i) => <Chapter key={i} c={c} i={i} total={CHAPTERS.length} />)}
    </section>
  );
}
