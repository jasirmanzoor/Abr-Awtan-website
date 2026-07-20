import React from 'react';
import { ENTERPRISE_BULLETS } from '../data/mock';
import { Check, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Enterprise() {
  return (
    <section id="enterprise" className="relative bg-[#f4ecdc] text-[#0d1420] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-cream-dots opacity-60" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-[1px] bg-[#1a6b48]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#1a6b48] font-semibold">The Enterprise</span>
              <span className="font-arabic text-[13px] text-[#0d1420]/60">المؤسسة</span>
            </div>

            <h2 className="font-display text-[42px] lg:text-[64px] leading-[1.02] font-medium tracking-[-0.02em]">
              Not An Aggregator. <br />
              <span className="italic text-[#1a6b48]">An Operator.</span>
            </h2>
            <p className="font-arabic text-[16px] text-[#0d1420]/60 mt-3">لسنا وسيط — نحن مشغّل للوجستيات</p>

            <p className="text-[16px] text-[#3a3628] mt-8 leading-relaxed max-w-2xl">
              The Saudi market is filled with logistics aggregators passing off third-party assets as their own. Abr Al Awtan operates differently.
            </p>
            <p className="text-[16px] text-[#3a3628] mt-4 leading-relaxed max-w-2xl">
              We own the warehouses. We employ the workforce. We maintain the vehicles. This total control over the physical supply chain allows us to guarantee service levels in locations where aggregators fail.
            </p>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-10">
              {ENTERPRISE_BULLETS.map((b) => (
                <div key={b.en} className="flex items-start gap-3 border-b border-[#0d1420]/10 pb-3">
                  <div className="mt-0.5 w-5 h-5 bg-[#1a6b48] flex items-center justify-center shrink-0">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[#0d1420]">{b.en}</div>
                    <div className="font-arabic text-[12px] text-[#0d1420]/50">{b.ar}</div>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-green mt-10 text-[13px]">Partner With Us <ArrowRight size={14} /></a>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="border border-[#0d1420]/10 bg-white/60 backdrop-blur p-8">
              <div className="text-[11px] tracking-[0.25em] uppercase text-[#1a6b48] font-semibold">Our Mission</div>
              <div className="font-arabic text-[13px] text-[#0d1420]/60 mt-1">مهمتنا</div>
              <p className="text-[15px] text-[#3a3628] mt-4 leading-relaxed">
                To provide absolute logistical certainty across the Kingdom through owned infrastructure, skilled direct labor, and an uncompromising approach to difficult operational environments.
              </p>
            </div>

            <div className="border border-[#0d1420]/10 bg-white/60 backdrop-blur p-8">
              <div className="text-[11px] tracking-[0.25em] uppercase text-[#1a6b48] font-semibold">Our Vision</div>
              <div className="font-arabic text-[13px] text-[#0d1420]/60 mt-1">رؤيتنا</div>
              <p className="text-[15px] text-[#3a3628] mt-4 leading-relaxed">
                To be the undisputed foundation for B2B logistics in Saudi Arabia — the physical layer that enterprise operations rely upon to scale.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 border border-[#0d1420]/10 bg-white/60 p-4 flex items-center gap-3">
                <Award size={20} className="text-[#e6a446]" />
                <div>
                  <div className="text-[12px] font-semibold text-[#0d1420]">ISO 9001 Certified</div>
                  <div className="font-arabic text-[11px] text-[#0d1420]/50">معتمد ISO 9001</div>
                </div>
              </div>
              <div className="flex-1 border border-[#0d1420]/10 bg-white/60 p-4 flex items-center gap-3">
                <ShieldCheck size={20} className="text-[#1a6b48]" />
                <div>
                  <div className="text-[12px] font-semibold text-[#0d1420]">MoL Registered</div>
                  <div className="font-arabic text-[11px] text-[#0d1420]/50">مسجل في وزارة العمل</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
