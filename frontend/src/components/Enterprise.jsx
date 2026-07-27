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
    <section id="enterprise" className="relative bg-[#E8F5EE] text-[#0A1F14] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-cream-dots opacity-50" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-[1px] bg-[#006C35]" />
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#006C35] font-semibold">The Enterprise</span>
            </div>

            <h2 className="font-display text-[38px] lg:text-[58px] leading-[1.05] font-medium tracking-[-0.025em]">
              Not an aggregator. <br />
              <span className="italic text-[#006C35]">An operator.</span>
            </h2>

            <p className="text-[16px] text-[#1A2F24] mt-8 leading-relaxed max-w-2xl">
              The Saudi market is filled with logistics resellers passing off third-party assets as their own. Abr Al Awtan operates differently.
            </p>
            <p className="text-[16px] text-[#1A2F24] mt-4 leading-relaxed max-w-2xl">
              We own the warehouses. We employ the workforce. We maintain the vehicles. This total control over the physical supply chain lets us guarantee service levels where aggregators quietly outsource and fail.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-10">
              {BULLETS.map((b) => (
                <div key={b} className="flex items-center gap-3 border-b border-[rgba(0,108,53,0.12)] pb-3">
                  <div className="w-5 h-5 bg-[#006C35] flex items-center justify-center shrink-0 rounded-sm">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <div className="text-[14px] font-medium text-[#0A1F14]">{b}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <a href="#quote" className="btn-primary">Partner With Us <ArrowRight size={14} /></a>
              <button onClick={generateCompanyProfilePDF} className="btn-ghost">
                <Download size={14} /> Download Company Profile
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="border border-[rgba(0,108,53,0.15)] bg-white/90 backdrop-blur p-7 rounded-xl">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#006C35] font-semibold">Our Mission</div>
              <p className="text-[15px] text-[#1A2F24] mt-4 leading-relaxed">
                To provide absolute logistical certainty across the Kingdom through owned infrastructure, skilled direct labor, and an uncompromising approach to difficult operational environments.
              </p>
            </div>

            <div className="border border-[rgba(0,108,53,0.15)] bg-white/90 backdrop-blur p-7 rounded-xl">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#006C35] font-semibold">Our Vision</div>
              <p className="text-[15px] text-[#1A2F24] mt-4 leading-relaxed">
                To be the undisputed foundation for B2B logistics in Saudi Arabia — the physical layer that enterprise operations rely upon to scale.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[rgba(0,108,53,0.12)] bg-white p-4 flex items-center gap-3 rounded-xl">
                <Award size={20} className="text-[#B8860B]" />
                <div>
                  <div className="text-[12px] font-semibold text-[#0A1F14]">ISO 9001</div>
                  <div className="font-mono text-[10px] text-[#5A6B62] uppercase tracking-wider">Certified</div>
                </div>
              </div>
              <div className="border border-[rgba(0,108,53,0.12)] bg-white p-4 flex items-center gap-3 rounded-xl">
                <ShieldCheck size={20} className="text-[#006C35]" />
                <div>
                  <div className="text-[12px] font-semibold text-[#0A1F14]">MoL / ZATCA</div>
                  <div className="font-mono text-[10px] text-[#5A6B62] uppercase tracking-wider">Registered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
