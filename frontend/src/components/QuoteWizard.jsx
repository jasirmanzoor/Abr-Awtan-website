import React, { useState } from 'react';
import { SERVICES, CTA_WHATSAPP } from '../data/mock';
import { generateQuotePDF, newQuoteId } from '../utils/pdfUtils';
import { submitQuote } from '../lib/api';
import { ArrowRight, ArrowLeft, Check, Download, MessageCircle, FileText, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

const STEPS = ['Services', 'Volume', 'Regions', 'Contact', 'Review'];

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [quoteId, setQuoteId] = useState('');
  const [data, setData] = useState({
    services: [],
    volume: '',
    timeline: '',
    regions: '',
    company: '',
    contact: '',
    email: '',
    phone: '',
    notes: ''
  });

  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggleService = (title) => setData(d => ({ ...d, services: d.services.includes(title) ? d.services.filter(s => s !== title) : [...d.services, title] }));

  const canNext = () => {
    if (step === 0) return data.services.length > 0;
    if (step === 1) return data.volume && data.timeline;
    if (step === 2) return !!data.regions;
    if (step === 3) return data.company && data.contact && data.email && data.phone;
    return true;
  };

  const buildWhatsAppUrl = (id) => {
    const svc = data.services.length ? data.services.join(', ') : '—';
    const lines = [
      `*New Quote Request · Ref ${id}*`,
      '',
      `*Company:* ${data.company}`,
      `*Contact:* ${data.contact}`,
      `*Email:* ${data.email}`,
      `*Phone:* ${data.phone}`,
      '',
      `*Services:* ${svc}`,
      `*Monthly Volume:* ${data.volume || '—'}`,
      `*Timeline:* ${data.timeline || '—'}`,
      `*Regions:* ${data.regions || '—'}`,
      data.notes ? `*Notes:* ${data.notes}` : null,
      '',
      'Please share the commercial proposal.'
    ].filter(Boolean).join('\n');
    return `${CTA_WHATSAPP}?text=${encodeURIComponent(lines)}`;
  };

  const submit = () => {
    setLoading(true);
    submitQuote(data)
      .then((r) => {
        setQuoteId(r.id);
        setDone(true);
        try {
          const stored = JSON.parse(localStorage.getItem('aaw_quotes') || '[]');
          localStorage.setItem('aaw_quotes', JSON.stringify([{ id: r.id, ...data, ts: Date.now() }, ...stored]));
        } catch {
          // localStorage may be unavailable in some contexts — non-critical
        }
        // Auto-open WhatsApp with the full quote details
        try { window.open(buildWhatsAppUrl(r.id), '_blank', 'noopener'); } catch { /* popup blocked */ }
      })
      .catch(() => {
        const id = newQuoteId();
        setQuoteId(id);
        setDone(true);
        try { window.open(buildWhatsAppUrl(id), '_blank', 'noopener'); } catch { /* popup blocked */ }
      })
      .finally(() => setLoading(false));
  };

  const downloadPDF = () => generateQuotePDF({ id: quoteId, ...data });

  const reset = () => { setStep(0); setDone(false); setQuoteId(''); setData({ services: [], volume: '', timeline: '', regions: '', company: '', contact: '', email: '', phone: '', notes: '' }); };

  return (
    <section id="quote" className="relative bg-[#0a0f1a] py-28 lg:py-36 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#f5b840]/8 rounded-full blur-3xl" />

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag mb-5 justify-center inline-flex">02 · Instant Quote</div>
          <h2 className="font-display text-[42px] lg:text-[60px] leading-[1.02] font-medium tracking-[-0.025em] text-[#f5efe1]">
            From requirement to <span className="italic text-amber-grad">proposal.</span>
          </h2>
          <p className="text-[16px] text-[#c9c1ab] mt-5 leading-relaxed">
            Answer 4 quick questions. Download your branded quote instantly. Our operations directors follow up within 24 hours with the commercial proposal.
          </p>
        </div>

        {!done ? (
          <div className="glass-strong corner-brackets p-6 lg:p-10">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {STEPS.map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-2 ${i <= step ? 'text-[#f5b840]' : 'text-[#7d8391]'}`}>
                    <div className={`w-8 h-8 flex items-center justify-center border font-mono text-[11px] transition ${i < step ? 'bg-[#22c55e] border-[#22c55e] text-white' : i === step ? 'border-[#f5b840] text-[#f5b840] bg-[#f5b840]/5' : 'border-white/10'}`}>
                      {i < step ? <Check size={12} /> : `0${i+1}`}
                    </div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] hidden sm:block">{s}</div>
                  </div>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-[1px] ${i < step ? 'bg-[#22c55e]' : 'bg-white/10'}`} />}
                </React.Fragment>
              ))}
            </div>

            <div className="min-h-[380px]">
              {step === 0 && (
                <div className="fade-up">
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-3">Q1 · Which services do you need?</div>
                  <h3 className="font-display text-[26px] font-medium text-[#f5efe1]">Select every capability that applies.</h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
                    {SERVICES.map((s) => {
                      const active = data.services.includes(s.title);
                      return (
                        <button key={s.id} onClick={() => toggleService(s.title)} className={`text-left p-4 border transition group ${active ? 'border-[#f5b840] bg-[#f5b840]/8' : 'border-white/10 bg-[#050810] hover:border-white/25'}`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-mono text-[10px] tracking-[0.22em] text-[#7d8391]">/{s.code}</div>
                              <div className="font-display text-[16px] font-medium text-[#f5efe1] mt-1">{s.title}</div>
                              <div className="font-arabic text-[11px] text-[#7d8391] mt-0.5">{s.ar}</div>
                            </div>
                            <div className={`w-5 h-5 border flex items-center justify-center ${active ? 'bg-[#f5b840] border-[#f5b840]' : 'border-white/20'}`}>
                              {active && <Check size={12} className="text-[#050810]" strokeWidth={3} />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="fade-up">
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-3">Q2 · Volume &amp; timeline</div>
                  <h3 className="font-display text-[26px] font-medium text-[#f5efe1]">Give us a sense of scale.</h3>
                  <div className="grid sm:grid-cols-2 gap-6 mt-8">
                    <div>
                      <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#f5b840]">Monthly Volume</label>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {['< 1,000','1k – 10k','10k – 50k','50k+'].map((v) => (
                          <button key={v} onClick={() => set('volume', v)} className={`p-3 text-[13px] border transition ${data.volume === v ? 'border-[#f5b840] bg-[#f5b840]/8 text-[#f5efe1]' : 'border-white/10 text-[#c9c1ab] hover:border-white/25'}`}>{v}</button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#f5b840]">Start Timeline</label>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {['Immediate','Within 30 days','Q+1 planning','Exploratory'].map((v) => (
                          <button key={v} onClick={() => set('timeline', v)} className={`p-3 text-[13px] border transition ${data.timeline === v ? 'border-[#f5b840] bg-[#f5b840]/8 text-[#f5efe1]' : 'border-white/10 text-[#c9c1ab] hover:border-white/25'}`}>{v}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="fade-up">
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-3">Q3 · Coverage areas</div>
                  <h3 className="font-display text-[26px] font-medium text-[#f5efe1]">Which regions do you serve?</h3>
                  <div className="grid sm:grid-cols-3 gap-2 mt-8">
                    {['Central','Western','Eastern','Northern','Southern','Nationwide','GCC Cross-Border','Remote Only'].map((r) => (
                      <button key={r} onClick={() => set('regions', r)} className={`p-3 text-[13px] border transition ${data.regions === r ? 'border-[#f5b840] bg-[#f5b840]/8 text-[#f5efe1]' : 'border-white/10 text-[#c9c1ab] hover:border-white/25'}`}>{r}</button>
                    ))}
                  </div>
                  <div className="mt-6">
                    <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#f5b840]">Anything specific?</label>
                    <textarea value={data.notes} onChange={(e) => set('notes', e.target.value)} rows={3} placeholder="e.g. Riyadh + Jazan, cold chain, hazmat, weekend ops…" className="w-full mt-2 bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[13px] text-[#f5efe1] outline-none transition resize-none" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="fade-up">
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-3">Q4 · Who&rsquo;s asking?</div>
                  <h3 className="font-display text-[26px] font-medium text-[#f5efe1]">Corporate details.</h3>
                  <div className="grid sm:grid-cols-2 gap-5 mt-8">
                    <Field label="Company" value={data.company} onChange={(v) => set('company', v)} placeholder="Corporate entity" />
                    <Field label="Your name" value={data.contact} onChange={(v) => set('contact', v)} placeholder="Full name" />
                    <Field label="Business Email" type="email" value={data.email} onChange={(v) => set('email', v)} placeholder="you@company.com" />
                    <Field label="Direct Phone" value={data.phone} onChange={(v) => set('phone', v)} placeholder="+966 5X XXX XXXX" />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="fade-up">
                  <div className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#f5b840] mb-3">Final · Review &amp; submit</div>
                  <h3 className="font-display text-[26px] font-medium text-[#f5efe1]">Confirm your request.</h3>
                  <div className="grid sm:grid-cols-2 gap-3 mt-8">
                    <Row k="Company" v={data.company} />
                    <Row k="Contact" v={`${data.contact} · ${data.email}`} />
                    <Row k="Phone" v={data.phone} />
                    <Row k="Regions" v={data.regions} />
                    <Row k="Volume / Month" v={data.volume} />
                    <Row k="Timeline" v={data.timeline} />
                    <Row k="Services" v={data.services.join(', ')} full />
                    {data.notes && <Row k="Notes" v={data.notes} full />}
                  </div>
                </div>
              )}
            </div>

            {/* Nav */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className="btn-ghost text-[12px] py-2.5 px-4 disabled:opacity-40 disabled:cursor-not-allowed">
                <ArrowLeft size={14} /> Back
              </button>
              <div className="font-mono text-[10px] text-[#7d8391] tracking-[0.22em]">STEP {step + 1} OF {STEPS.length}</div>
              {step < STEPS.length - 1 ? (
                <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()} className="btn-primary text-[12px] py-2.5 px-4 disabled:opacity-40 disabled:cursor-not-allowed">
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={submit} disabled={loading} className="btn-primary text-[12px] py-2.5 px-4">
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Generating…</> : <>Submit Request <Sparkles size={14} /></>}
                </button>
              )}
            </div>

            {loading && (
              <div className="mt-6 relative h-[2px] overflow-hidden bg-white/5">
                <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#f5b840] to-transparent loader-bar" />
              </div>
            )}
          </div>
        ) : (
          <div className="glass-strong corner-brackets p-10 text-center fade-up">
            <div className="w-16 h-16 mx-auto border-2 border-[#22c55e] flex items-center justify-center bg-[#22c55e]/10">
              <CheckCircle2 size={28} className="text-[#22c55e]" />
            </div>
            <h3 className="font-display text-[36px] font-medium text-[#f5efe1] mt-6">Request sent to our Operations Director.</h3>
            <p className="text-[15px] text-[#c9c1ab] mt-4 max-w-xl mx-auto">
              Your reference is <span className="font-mono text-[#f5b840]">{quoteId}</span>. We&rsquo;ve opened WhatsApp with your full request — send it to Jasir Manzoor and he&rsquo;ll respond within a few hours with a commercial proposal.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a href={buildWhatsAppUrl(quoteId)} target="_blank" rel="noreferrer" data-testid="quote-whatsapp-btn" className="btn-primary"><MessageCircle size={14} /> Open WhatsApp Chat</a>
              <button onClick={downloadPDF} data-testid="quote-pdf-btn" className="btn-ghost"><Download size={14} /> Download Quote PDF</button>
              <button onClick={reset} data-testid="quote-new-btn" className="btn-ghost"><FileText size={14} /> New Request</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#f5b840]">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full mt-2 bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] outline-none transition" />
    </div>
  );
}

function Row({ k, v, full }) {
  return (
    <div className={`border border-white/8 bg-[#050810] p-4 ${full ? 'sm:col-span-2' : ''}`}>
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391]">{k}</div>
      <div className="text-[14px] text-[#f5efe1] mt-1">{v || '—'}</div>
    </div>
  );
}
