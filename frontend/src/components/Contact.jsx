import React, { useState } from 'react';
import { toast } from '../hooks/use-toast';
import { Send, MessageCircle, Mail, MapPin, Radio, Phone, ArrowRight } from 'lucide-react';

const SERVICE_OPTIONS = ['Warehouse', 'Manpower', 'Delivery', 'Fleet', 'Pickup', 'Express'];

export default function Contact() {
  const [form, setForm] = useState({
    company: '', director: '', email: '', phone: '', zones: '', scope: '',
    services: []
  });

  const toggle = (s) => {
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter(x => x !== s) : [...f.services, s] }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.company || !form.director || !form.email || !form.phone || form.services.length === 0) {
      toast({ title: 'Missing required fields', description: 'Please complete corporate details and select at least one service.' });
      return;
    }
    toast({ title: 'Logistics request submitted', description: 'Our operations directors will reach out within 24 hours.' });
    setForm({ company: '', director: '', email: '', phone: '', zones: '', scope: '', services: [] });
  };

  const inputCls = 'w-full bg-transparent border-b border-[#0d1420]/20 focus:border-[#1a6b48] outline-none py-3 text-[14px] text-[#0d1420] placeholder:text-[#0d1420]/40 transition';

  return (
    <section id="contact" className="relative bg-[#f4ecdc] text-[#0d1420] py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-cream-dots opacity-50" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-6 h-[1px] bg-[#1a6b48]" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#1a6b48] font-semibold">Initiate</span>
              <span className="font-arabic text-[13px] text-[#0d1420]/60">ابدأ التعاون</span>
            </div>

            <h2 className="font-display text-[42px] lg:text-[64px] leading-[1.02] font-medium tracking-[-0.02em]">
              Engage <span className="italic text-[#1a6b48]">Operations</span>
            </h2>
            <p className="font-arabic text-[16px] text-[#0d1420]/60 mt-3">تواصل معنا للتعاون</p>
            <p className="text-[15px] text-[#3a3628] mt-6 max-w-xl leading-relaxed">
              Provide your logistical requirements. Our operations directors will deliver a comprehensive deployment plan within 24 hours.
            </p>

            <form onSubmit={submit} className="mt-10 border border-[#0d1420]/10 bg-white/70 backdrop-blur p-8 lg:p-10">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="text-[11px] tracking-[0.24em] uppercase text-[#1a6b48] font-semibold">Corporate Entity *</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} placeholder="Enter corporate name" />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.24em] uppercase text-[#1a6b48] font-semibold">Director Name *</label>
                  <input value={form.director} onChange={(e) => setForm({ ...form, director: e.target.value })} className={inputCls} placeholder="Full name" />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.24em] uppercase text-[#1a6b48] font-semibold">Corporate Email *</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className={inputCls} placeholder="corporate@example.com" />
                </div>
                <div>
                  <label className="text-[11px] tracking-[0.24em] uppercase text-[#1a6b48] font-semibold">Direct Line *</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} placeholder="+966 5X XXX XXXX" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] tracking-[0.24em] uppercase text-[#1a6b48] font-semibold">Operational Zones</label>
                  <input value={form.zones} onChange={(e) => setForm({ ...form, zones: e.target.value })} className={inputCls} placeholder="e.g. Riyadh, Tabuk, Jazan" />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] tracking-[0.24em] uppercase text-[#1a6b48] font-semibold">Required Infrastructure *</label>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {SERVICE_OPTIONS.map((s) => (
                      <button type="button" key={s} onClick={() => toggle(s)}
                        className={`px-4 py-2 text-[12px] tracking-wider uppercase border transition ${form.services.includes(s) ? 'bg-[#1a6b48] text-white border-[#1a6b48]' : 'bg-transparent text-[#0d1420] border-[#0d1420]/20 hover:border-[#1a6b48]'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] tracking-[0.24em] uppercase text-[#1a6b48] font-semibold">Scope &amp; Volume Details</label>
                  <textarea value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} rows={4} className={inputCls + ' resize-none'} placeholder="Monthly volumes, urgent regions, timelines..." />
                </div>
              </div>

              <button type="submit" className="btn-green mt-8 w-full sm:w-auto justify-center">
                Submit Logistics Request <Send size={14} />
              </button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-[#0d1420]/10 bg-white/70 backdrop-blur p-8">
              <div className="flex items-center gap-2 mb-6">
                <Radio size={16} className="text-[#1a6b48]" />
                <div className="text-[11px] tracking-[0.28em] uppercase text-[#1a6b48] font-semibold">Command Center</div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a6b48]/10 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-[#1a6b48]" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.24em] uppercase text-[#0d1420]/60">WhatsApp / Phone</div>
                    <a href="https://wa.me/966500000000" className="text-[16px] font-medium text-[#0d1420] hover:text-[#1a6b48]">+966 50 000 0000</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a6b48]/10 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-[#1a6b48]" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.24em] uppercase text-[#0d1420]/60">Email</div>
                    <a href="mailto:corporate@abralawtan.sa" className="text-[16px] font-medium text-[#0d1420] hover:text-[#1a6b48]">corporate@abralawtan.sa</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a6b48]/10 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-[#1a6b48]" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.24em] uppercase text-[#0d1420]/60">Headquarters</div>
                    <div className="text-[16px] font-medium text-[#0d1420]">Riyadh, Kingdom of Saudi Arabia</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1a6b48]/10 flex items-center justify-center shrink-0">
                    <Radio size={16} className="text-[#1a6b48]" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-[0.24em] uppercase text-[#0d1420]/60">Operations</div>
                    <div className="text-[16px] font-medium text-[#0d1420]">24/7 Command Center</div>
                  </div>
                </div>
              </div>

              <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" className="btn-green w-full justify-center mt-8">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
              <div className="text-center text-[11px] text-[#0d1420]/50 mt-3">Fastest response channel</div>
            </div>

            <div className="mt-6 border border-[#e6a446]/40 bg-[#e6a446]/10 p-6">
              <div className="text-[11px] tracking-[0.24em] uppercase text-[#8a6425] font-semibold">Remote Deployment Available</div>
              <p className="text-[13px] text-[#3a3628] mt-3 leading-relaxed">
                Our specialized remote divisions can mobilize rapidly to any location in the Kingdom. Include your extreme-region requirements in the scope for a dedicated feasibility assessment.
              </p>
              <div className="inline-flex items-center gap-2 mt-4 text-[11px] tracking-wider uppercase text-[#1a6b48] font-semibold">
                <span className="w-1.5 h-1.5 bg-[#1a6b48] rounded-full pulse-dot" />
                Active Nationwide
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
