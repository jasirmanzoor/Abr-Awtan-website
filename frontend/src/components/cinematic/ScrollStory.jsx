import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileCheck2, Truck, PackageOpen, Bike, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

const CHAPTERS = [
  { icon: FileCheck2, code: '01', title: 'Custom Clearance', tag: 'PORT OF ENTRY',
    body: 'Every shipment begins with paperwork. Our FASAH-certified team pre-clears documentation before your goods land — no ports queued, no bonded delays.',
    accent: 'from-[#006C35]/20 to-transparent' },
  { icon: Truck, code: '02', title: 'Linehaul & Trucking', tag: 'INTERCITY BACKBONE',
    body: 'Owned heavy fleet moves your goods across GCC corridors. Refrigerated, dry, hazmat — our drivers, our trucks, our accountability.',
    accent: 'from-[#0D8A45]/20 to-transparent' },
  { icon: Warehouse, code: '03', title: 'Warehousing & Fulfillment', tag: 'THE HUB',
    body: 'ZATCA-compliant bonded storage with WMS integration to Salla, Zid, Shopify. RFID-tracked inventory, pick-pack-ship in under 4 hours.',
    accent: 'from-[#B8860B]/15 to-transparent' },
  { icon: Bike, code: '04', title: 'Last-Mile Delivery', tag: "YOUR CUSTOMER'S DOOR",
    body: 'The final 500 meters matter most. OTP verification, cash-on-delivery, live customer alerts — handled by our own riders. 99% first-attempt success.',
    accent: 'from-[#006C35]/20 to-transparent' }
];

function Chapter({ c, i, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);
  const xText = useTransform(scrollYProgress, [0, 0.5, 1], [-24, 0, 24]);
  const yIcon = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={ref} className="h-screen flex items-center justify-center">
      <motion.div style={{ opacity, scale }} className="max-w-[1240px] mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-10 items-center">
        <motion.div style={{ x: xText }} className="lg:col-span-6 order-2 lg:order-1">
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] uppercase text-[#006C35]">
            <span className="text-[42px] font-display text-[#006C35]/30 leading-none">{c.code}</span>
            <div className="h-8 w-[1px] bg-[#006C35]/30" />
            <div>
              <div className="text-[#5A6B62]">Chapter {i + 1} of {total}</div>
              <div className="text-[#006C35] font-semibold mt-0.5">{c.tag}</div>
            </div>
          </div>

          <h2 className="font-display text-[40px] lg:text-[68px] font-medium leading-[1.02] tracking-[-0.03em] text-[#0A1F14] mt-6">
            {c.title}
          </h2>

          <p className="text-[16px] lg:text-[17px] text-[#5A6B62] mt-6 leading-[1.7] max-w-xl">{c.body}</p>

          <div className="flex items-center gap-6 mt-10">
            <Link to="/services" className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#006C35] border-b border-[#006C35]/40 pb-1 hover:border-[#006C35] transition">
              Explore Capability →
            </Link>
          </div>
        </motion.div>

        <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-square flex items-center justify-center">
          <motion.div style={{ y: yIcon }} className="relative">
            <div className={`absolute inset-0 bg-gradient-radial ${c.accent} blur-3xl scale-150 rounded-full`} />
            <div className="relative w-[260px] h-[260px] lg:w-[400px] lg:h-[400px] border border-[#006C35]/20 bg-white shadow-xl shadow-[#006C35]/5 flex items-center justify-center overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute top-0 left-0 w-14 h-14 border-l-2 border-t-2 border-[#006C35]/60" />
              <div className="absolute top-0 right-0 w-14 h-14 border-r-2 border-t-2 border-[#006C35]/60" />
              <div className="absolute bottom-0 left-0 w-14 h-14 border-l-2 border-b-2 border-[#006C35]/60" />
              <div className="absolute bottom-0 right-0 w-14 h-14 border-r-2 border-b-2 border-[#006C35]/60" />
              <c.icon size={180} className="text-[#006C35] relative z-10" strokeWidth={0.7} />
              <div className="absolute top-5 left-5 font-mono text-[11px] tracking-[0.2em] text-[#006C35]/70">/{c.code}</div>
              <div className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.18em] text-[#5A6B62]">SERVICE MATRIX</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ScrollStory() {
  return (
    <section className="relative bg-[#F7FAF8]">
      <div className="sticky top-0 h-20 z-10 bg-gradient-to-b from-[#F7FAF8] to-transparent flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 w-full">
          <div className="section-tag">The Journey · Every Step Owned</div>
        </div>
      </div>
      {CHAPTERS.map((c, i) => <Chapter key={i} c={c} i={i} total={CHAPTERS.length} />)}
    </section>
  );
}
