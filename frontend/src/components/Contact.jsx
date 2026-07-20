import React, { useState } from 'react';
import { toast } from '../hooks/use-toast';
import { Send, MessageCircle, Mail, MapPin, Radio, Phone } from 'lucide-react';
import { CTA_WHATSAPP } from '../data/mock';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: 'Please complete required fields', description: 'Name, email and message are required.' });
      return;
    }
    try {
      const stored = JSON.parse(localStorage.getItem('aaw_messages') || '[]');
      localStorage.setItem('aaw_messages', JSON.stringify([{ ...form, ts: Date.now() }, ...stored]));
    } catch {}
    toast({ title: 'Message received', description: 'Our operations team will respond within 24 hours.' });
    setForm({ name: '', email: '', company: '', message: '' });
  };

  const inputCls = 'w-full bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] placeholder:text-[#7d8391] outline-none transition';

  return (
    <section id="contact" className="relative bg-[#050810] py-28 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            <div className="section-tag mb-5">Direct Line</div>
            <h2 className="font-display text-[42px] lg:text-[60px] leading-[1.02] font-medium tracking-[-0.025em] text-[#f5efe1]">
              Talk to our <span className="italic text-amber-grad">operations directors.</span>
            </h2>
            <p className="text-[15px] text-[#c9c1ab] mt-5 max-w-xl leading-relaxed">
              For custom deployments, remote-region requirements, or enterprise scoping — message us directly. Response within 24 hours, guaranteed.
            </p>

            <form onSubmit={submit} className="mt-10 grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Your Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls + ' mt-2'} placeholder="Full name" />
              </div>
              <div>
                <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Business Email *</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className={inputCls + ' mt-2'} placeholder="you@company.com" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Company</label>
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls + ' mt-2'} placeholder="Corporate entity" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Your Message *</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className={inputCls + ' mt-2 resize-none'} placeholder="Tell us about your logistics requirements…" />
              </div>
              <button type="submit" className="btn-primary w-fit sm:col-span-2">Send Message <Send size={14} /></button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="glass corner-brackets p-8">
              <div className="flex items-center gap-2 mb-6">
                <Radio size={16} className="text-[#f5b840]" />
                <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#f5b840] font-semibold">Command Center</div>
              </div>

              <div className="space-y-5">
                {[
                  { icon: Phone, label: 'WhatsApp / Phone', value: '+966 50 000 0000', href: CTA_WHATSAPP },
                  { icon: Mail, label: 'Email', value: 'corporate@abralawtan.sa', href: 'mailto:corporate@abralawtan.sa' },
                  { icon: MapPin, label: 'Headquarters', value: 'Riyadh, Kingdom of Saudi Arabia' },
                  { icon: Radio, label: 'Operations', value: '24/7 Command Center Live' }
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#f5b840]/25 bg-[#f5b840]/5 flex items-center justify-center shrink-0">
                      <r.icon size={16} className="text-[#f5b840]" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">{r.label}</div>
                      {r.href ? (
                        <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-[15px] font-medium text-[#f5efe1] hover:text-[#f5b840] transition">{r.value}</a>
                      ) : (
                        <div className="text-[15px] font-medium text-[#f5efe1]">{r.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a href={CTA_WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center mt-7">
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
              <div className="text-center font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391] mt-3">Fastest response channel</div>
            </div>

            <div className="mt-4 border border-[#f5b840]/30 bg-[#f5b840]/5 p-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840] font-semibold">Remote Deployment Ready</div>
              </div>
              <p className="text-[13px] text-[#c9c1ab] mt-3 leading-relaxed">
                Our specialized remote divisions can mobilize rapidly to any location in the Kingdom. Include extreme-region requirements in your message for a dedicated feasibility assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
