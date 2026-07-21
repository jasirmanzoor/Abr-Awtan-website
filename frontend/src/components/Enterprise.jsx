import React from 'react';
import { Check, Award, ShieldCheck, ArrowRight, Download } from 'lucide-react';
import { generateCompanyProfilePDF } from '../utils/pdfUtils';

const BULLETS = [
  'Owned warehouse network',
  'Remote region dominance — 15+ areas',
  'ZATCA + FASAH compliant',
  'B2B & B2C dedicated ops',
  '150+ own salary drivers',
  '50+ own big vans',
  '250+ trained manpower',
  '100k+ parcels processed monthly'
];

export default function Enterprise() {
  return (
    <section id="enterprise" className="relative bg-[#f5efe1] text-[#050810] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-cream-dots opacity-60" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-[1px] bg-[#0e5a2f]" />
              <span className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#0e5a2f] font-semibold">The Enterprise</span>
            </div>

            <h2 className="font-display text-[42px] lg:text-[64px] leading-[1.02] font-medium tracking-[-0.025em]">
              Not an aggregator. <br />
              <span className="italic" style={{ color: '#0e5a2f' }}>An operator.</span>
            </h2>

            <p className="text-[16px] text-[#3a3628] mt-8 leading-relaxed max-w-2xl">
              The Saudi market is filled with logistics resellers passing off third-party assets as their own. Abr Al Awtan operates differently.
            </p>
            <p className="text-[16px] text-[#3a3628] mt-4 leading-relaxed max-w-2xl">
              We own the warehouses. We employ the workforce. We maintain the vehicles. This total control over the physical supply chain lets us guarantee service levels where aggregators quietly outsource and fail.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-10">
              {BULLETS.map((b) => (
                <div key={b} className="flex items-center gap-3 border-b border-[#050810]/10 pb-3">
                  <div className="w-5 h-5 bg-[#0e5a2f] flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <div className="text-[14px] font-medium text-[#050810]">{b}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <a href="#quote" className="btn-primary">Partner With Us <ArrowRight size={14} /></a>
              <button onClick={generateCompanyProfilePDF} className="btn-ghost !text-[#050810] !border-[#050810]/20 hover:!border-[#0e5a2f] hover:!text-[#0e5a2f]">
                <Download size={14} /> Download Company Profile
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="border border-[#050810]/10 bg-white/80 backdrop-blur p-7 corner-brackets">
              <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#0e5a2f] font-semibold">Our Mission</div>
              <p className="text-[15px] text-[#3a3628] mt-4 leading-relaxed">
                To provide absolute logistical certainty across the Kingdom through owned infrastructure, skilled direct labor, and an uncompromising approach to difficult operational environments.
              </p>
            </div>

            <div className="border border-[#050810]/10 bg-white/80 backdrop-blur p-7">
              <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#0e5a2f] font-semibold">Our Vision</div>
              <p className="text-[15px] text-[#3a3628] mt-4 leading-relaxed">
                To be the undisputed foundation for B2B logistics in Saudi Arabia — the physical layer that enterprise operations rely upon to scale.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#050810]/10 bg-white/80 p-4 flex items-center gap-3">
                <Award size={20} className="text-[#f5b840]" />
                <div>
                  <div className="text-[12px] font-semibold text-[#050810]">ISO 9001</div>
                  <div className="font-mono text-[10px] text-[#050810]/50 uppercase tracking-wider">Certified</div>
                </div>
              </div>
              <div className="border border-[#050810]/10 bg-white/80 p-4 flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#0e5a2f]" />
                <div>
                  <div className="text-[12px] font-semibold text-[#050810]">MoL / ZATCA</div>
                  <div className="font-mono text-[10px] text-[#050810]/50 uppercase tracking-wider">Registered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
