import React, { useEffect, useState } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader, { CTABand } from '../components/PageHeader';
import { listJobs, applyJob } from '../lib/api';
import { toast } from '../hooks/use-toast';
import { MapPin, Briefcase, Clock, ArrowRight, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [active, setActive] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience_years: 3, cover: '' });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { listJobs().then(setJobs).catch(() => setJobs([])); }, []);

  const apply = async (e) => {
    e.preventDefault();
    setBusy(true);
    try { await applyJob({ ...form, position: active.title }); setDone(true); toast({ title: 'Application submitted', description: 'Our HR team will review and respond soon.' }); }
    catch { toast({ title: 'Try again', description: 'Could not submit right now.' }); }
    finally { setBusy(false); }
  };

  const closeModal = () => { setActive(null); setDone(false); setForm({ name:'', email:'', phone:'', experience_years:3, cover:'' }); };

  const inputCls = 'w-full bg-[#050810] border border-white/10 focus:border-[#f5b840] px-4 py-3 text-[14px] text-[#f5efe1] placeholder:text-[#7d8391] outline-none';

  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader eyebrow="Careers" title="Build the Kingdom's" italic="logistics future." subtitle="We hire operators, not aggregators. Direct-hire, full benefits, real impact — across warehouses, fleet, technology and enterprise sales." crumbs={[{ label: 'Careers' }]} />

      <section className="relative py-16 border-b border-white/5">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[['500+', 'Team members'], ['9', 'Warehouse hubs'], ['24/7', 'Ops shifts'], ['ISO 9001', 'Certified']].map(([v, l]) => (
              <div key={l} className="border border-white/8 bg-[#0a0f1a] p-5">
                <div className="font-display text-[30px] font-medium text-[#f5b840] leading-none">{v}</div>
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391] mt-3">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="section-tag mb-4">Open Roles</div>
          <h2 className="font-display text-[36px] lg:text-[46px] font-medium text-[#f5efe1] tracking-tight mb-10">{jobs.length} positions <span className="italic text-amber-grad">open right now.</span></h2>

          <div className="space-y-3">
            {jobs.map((j) => (
              <div key={j.id} className="group border border-white/8 bg-[#0a0f1a] p-6 hover:border-[#f5b840]/30 transition">
                <div className="grid lg:grid-cols-12 items-center gap-6">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840]">{j.dept}</span>
                      <span className="w-1 h-1 bg-[#7d8391] rounded-full" />
                      <span className="font-mono text-[10px] text-[#7d8391]">{j.id}</span>
                    </div>
                    <h3 className="font-display text-[24px] font-medium text-[#f5efe1] leading-tight">{j.title}</h3>
                    <p className="text-[13.5px] text-[#c9c1ab] mt-2 leading-relaxed">{j.summary}</p>
                  </div>
                  <div className="lg:col-span-3 flex flex-wrap gap-4">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#c9c1ab]"><MapPin size={12} className="text-[#f5b840]" /> {j.location}</div>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#c9c1ab]"><Clock size={12} className="text-[#f5b840]" /> {j.type}</div>
                  </div>
                  <div className="lg:col-span-2 lg:justify-self-end">
                    <button onClick={() => setActive(j)} className="btn-primary text-[12px] py-2.5 px-4 group-hover:!bg-[#22c55e]">Apply <ArrowRight size={13} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div className="fixed inset-0 z-[70] bg-[#050810]/90 backdrop-blur-md flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-[#0a0f1a] border border-[#f5b840]/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/8">
              <div>
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840]">Apply for</div>
                <h3 className="font-display text-[22px] font-medium text-[#f5efe1] mt-1">{active.title}</h3>
              </div>
              <button onClick={closeModal} className="w-9 h-9 border border-white/10 flex items-center justify-center hover:border-[#f5b840] hover:text-[#f5b840] text-[#c9c1ab]"><X size={16} /></button>
            </div>
            <div className="p-6">
              {done ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 mx-auto border-2 border-[#22c55e] flex items-center justify-center bg-[#22c55e]/10"><CheckCircle2 size={24} className="text-[#22c55e]" /></div>
                  <h4 className="font-display text-[24px] font-medium text-[#f5efe1] mt-5">Application submitted</h4>
                  <p className="text-[13px] text-[#c9c1ab] mt-2">Our HR team will review and reach out.</p>
                  <button onClick={closeModal} className="btn-ghost mt-6">Close</button>
                </div>
              ) : (
                <>
                  <p className="text-[13.5px] text-[#c9c1ab] leading-relaxed">{active.summary}</p>
                  <div className="mt-4 mb-6">
                    <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840] mb-2">Requirements</div>
                    <ul className="space-y-1">
                      {active.requirements.map((r) => <li key={r} className="text-[13px] text-[#c9c1ab]">• {r}</li>)}
                    </ul>
                  </div>
                  <form onSubmit={apply} className="grid sm:grid-cols-2 gap-4">
                    <input required placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputCls} />
                    <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputCls} />
                    <input required placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputCls} />
                    <input required type="number" placeholder="Years of experience" value={form.experience_years} onChange={e => setForm({...form, experience_years: parseInt(e.target.value || '0')})} className={inputCls} />
                    <textarea rows={4} placeholder="Brief cover note" value={form.cover} onChange={e => setForm({...form, cover: e.target.value})} className={inputCls + ' sm:col-span-2 resize-none'} />
                    <button type="submit" disabled={busy} className="btn-primary sm:col-span-2 justify-center">
                      {busy ? <><Loader2 size={14} className="animate-spin" /> Submitting…</> : 'Submit Application'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <CTABand title="Don't see your fit?" italic="Send your CV." subtitle="We're always meeting exceptional operators. Introduce yourself." ctaLabel="Send CV" ctaTo="/contact" />
      <SiteFooter />
    </div>
  );
}
