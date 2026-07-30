import React, { useState } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader from '../components/PageHeader';
import { submitContact } from '../lib/api';
import { toast } from '../hooks/use-toast';
import { Mail, Phone, MapPin, Radio, MessageCircle, Send, Loader2, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', subject: 'General', message: '' });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast({ title: 'Missing fields', description: 'Name, email and message are required.' }); return; }
    setBusy(true);
    try { await submitContact(form); setDone(true); toast({ title: 'Message sent', description: 'Operations team will respond within 24 hours.' }); }
    catch { toast({ title: 'Try again', description: 'Could not send right now.' }); }
    finally { setBusy(false); }
  };

  const inputCls = 'w-full bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] placeholder:text-[#7d8391] outline-none transition';

  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader eyebrow="Contact" title="Talk to" italic="operations directly." subtitle="For custom deployments, remote-region requirements, or enterprise scoping — message us directly. Response within 24 hours, guaranteed." crumbs={[{ label: 'Contact' }]} />

      <section className="relative py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7">
            {done ? (
              <div className="glass-strong corner-brackets p-10 text-center">
                <div className="w-14 h-14 mx-auto border-2 border-[#22c55e] flex items-center justify-center bg-[#22c55e]/10"><CheckCircle2 size={24} className="text-[#22c55e]" /></div>
                <h3 className="font-display text-[28px] font-medium text-[#f5efe1] mt-6">Message received.</h3>
                <p className="text-[14px] text-[#c9c1ab] mt-3">Our operations directors will follow up within 24 hours.</p>
                <button onClick={() => { setDone(false); setForm({ name:'', email:'', company:'', subject:'General', message:'' }); }} className="btn-ghost mt-6">Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="glass-strong corner-brackets p-8 lg:p-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Full Name *</label>
                    <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className={inputCls + ' mt-2'} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Business Email *</label>
                    <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} type="email" className={inputCls + ' mt-2'} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Company</label>
                    <input value={form.company} onChange={(e) => setForm({...form, company: e.target.value})} className={inputCls + ' mt-2'} placeholder="Corporate entity" />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Topic</label>
                    <select value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} className={inputCls + ' mt-2'}>
                      {['General','Quote / Pricing','Enterprise Partnership','Careers','Media','Support'].map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] font-semibold">Message *</label>
                    <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows={6} className={inputCls + ' mt-2 resize-none'} placeholder="Tell us about your logistics requirements…" />
                  </div>
                </div>
                <button type="submit" disabled={busy} className="btn-primary mt-7">
                  {busy ? <><Loader2 size={14} className="animate-spin" /> Sending…</> : <>Send Message <Send size={14} /></>}
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass p-8 corner-brackets">
              <div className="flex items-center gap-2 mb-6"><Radio size={16} className="text-[#f5b840]" /><div className="font-mono text-[11px] tracking-[0.28em] uppercase text-[#f5b840] font-semibold">Command Center</div></div>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: 'WhatsApp (Ops Director)', value: '+966 57 806 1556', href: 'https://wa.me/966578061556' },
                  { icon: Phone, label: 'Office', value: '+966 555 324 149', href: 'tel:+966555324149' },
                  { icon: Phone, label: 'Direct Line', value: '+966 536 708 287', href: 'tel:+966536708287' },
                  { icon: Mail, label: 'Email', value: 'info@abr-alawtan.com', href: 'mailto:info@abr-alawtan.com' },
                  { icon: MapPin, label: 'Headquarters', value: 'Riyadh, Kingdom of Saudi Arabia' },
                  { icon: Radio, label: 'Operations', value: '24/7 Command Center Live' }
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#f5b840]/25 bg-[#f5b840]/5 flex items-center justify-center shrink-0"><r.icon size={16} className="text-[#f5b840]" /></div>
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">{r.label}</div>
                      {r.href ? <a href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="text-[15px] font-medium text-[#f5efe1] hover:text-[#f5b840]">{r.value}</a> : <div className="text-[15px] font-medium text-[#f5efe1]">{r.value}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/966578061556" target="_blank" rel="noreferrer" className="btn-primary w-full justify-center mt-7"><MessageCircle size={16} /> Chat on WhatsApp</a>
            </div>

            <div className="border border-[#f5b840]/30 bg-[#f5b840]/5 p-6">
              <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" /><div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840] font-semibold">Remote Deployment Ready</div></div>
              <p className="text-[13px] text-[#c9c1ab] mt-3 leading-relaxed">Specialized remote divisions can mobilize rapidly to any location in the Kingdom. Include extreme-region requirements in your message.</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
