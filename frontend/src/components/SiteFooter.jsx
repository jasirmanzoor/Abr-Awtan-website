import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import { toast } from '../hooks/use-toast';
import { subscribe } from '../lib/api';

export default function SiteFooter() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const sub = async () => {
    if (!email) return;
    setBusy(true);
    try { await subscribe(email); toast({ title: 'Subscribed', description: 'You are on the operator briefing.' }); setEmail(''); }
    catch { toast({ title: 'Try again', description: 'Could not subscribe right now.' }); }
    finally { setBusy(false); }
  };

  return (
    <footer className="relative bg-[#050810] pt-20 pb-8 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0e5a2f] via-[#f5b840] to-[#0e5a2f]" />
      <div className="absolute inset-0 bg-dots opacity-20" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#f5b840]/50 flex items-center justify-center relative">
                <div className="absolute inset-1 bg-[#f5b840]/10" />
                <div className="relative font-display text-[16px] font-bold text-[#f5b840]">A</div>
              </div>
              <div>
                <div className="font-display text-[20px] font-semibold text-[#f5efe1] tracking-tight">ABR AL AWTAN</div>
                <div className="font-mono text-[9px] tracking-[0.32em] text-[#7d8391] uppercase mt-1">Logistics Infrastructure</div>
              </div>
            </Link>

            <p className="text-[13.5px] text-[#c9c1ab] mt-6 leading-relaxed max-w-sm">
              The physical foundation for enterprise logistics in Saudi Arabia. Own warehouses, own fleet, own workforce — zero brokerage.
            </p>

            <div className="space-y-2.5 mt-6">
              <div className="flex items-center gap-3 text-[13px] text-[#c9c1ab]"><MapPin size={13} className="text-[#f5b840]" /> Riyadh, Kingdom of Saudi Arabia</div>
              <div className="flex items-center gap-3 text-[13px] text-[#c9c1ab]"><Phone size={13} className="text-[#f5b840]" /> +966 11 XXX XXXX</div>
              <div className="flex items-center gap-3 text-[13px] text-[#c9c1ab]"><Mail size={13} className="text-[#f5b840]" /> info@abr-alawtan.com</div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              {[Linkedin, Instagram, Twitter].map((I, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-white/10 hover:border-[#f5b840] hover:text-[#f5b840] flex items-center justify-center text-[#c9c1ab] transition"><I size={13} /></a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#f5b840] font-semibold">Company</div>
            <ul className="mt-5 space-y-3">
              {[['Services','/services'],['Fleet','/fleet'],['About','/about'],['Careers','/careers'],['Blog','/blog'],['Contact','/contact']].map(([l, p]) => (
                <li key={p}><Link to={p} className="text-[13px] text-[#c9c1ab] hover:text-[#f5b840] transition">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#f5b840] font-semibold">Ship &amp; Track</div>
            <ul className="mt-5 space-y-3">
              {[['Ship Now','/ship-now'],['Track Shipment','/track'],['Rate Calculator','/rate-calculator']].map(([l, p]) => (
                <li key={p}><Link to={p} className="text-[13px] text-[#c9c1ab] hover:text-[#f5b840] transition">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#f5b840] font-semibold">Operator Briefing</div>
            <p className="text-[13px] text-[#c9c1ab] mt-4 leading-relaxed">
              Strategic updates on Saudi logistical infrastructure and remote-region operations. Enterprise-only, no spam.
            </p>
            <div className="mt-5 flex">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Corporate email" className="flex-1 bg-[#0a0f1a] border border-white/10 px-4 py-3 text-[13px] text-[#f5efe1] placeholder:text-[#7d8391] outline-none focus:border-[#f5b840]" />
              <button onClick={sub} disabled={busy} className="btn-amber">{busy ? '…' : 'Subscribe'}</button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">© 2026 Abr Al Awtan · All Rights Reserved</div>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391]">
            <a href="#" className="hover:text-[#f5b840]">Privacy</a>
            <a href="#" className="hover:text-[#f5b840]">Terms</a>
            <a href="#" className="hover:text-[#f5b840]">ZATCA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
