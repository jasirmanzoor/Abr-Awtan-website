import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';
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
    <footer className="relative bg-[#0A1F14] pt-20 pb-8 overflow-hidden border-t border-white/10">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#006C35] via-[#B8860B] to-[#006C35]" />
      <div className="absolute inset-0 bg-dots opacity-15" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#B8860B]/50 flex items-center justify-center relative rounded-sm">
                <div className="absolute inset-1 bg-[#B8860B]/10" />
                <div className="relative font-display text-[16px] font-bold text-[#B8860B]">A</div>
              </div>
              <div>
                <div className="font-display text-[20px] font-semibold text-white tracking-tight">ABR AL AWTAN</div>
                <div className="font-mono text-[9px] tracking-[0.28em] text-[#A8C5B5] uppercase mt-1">Logistics Infrastructure</div>
              </div>
            </Link>

            <p className="text-[13.5px] text-[#A8C5B5] mt-6 leading-relaxed max-w-sm">
              The physical foundation for enterprise logistics in Saudi Arabia. Own warehouses, own fleet, own workforce — zero brokerage.
            </p>

            <div className="space-y-2.5 mt-6">
              <div className="flex items-center gap-3 text-[13px] text-[#A8C5B5]"><MapPin size={13} className="text-[#B8860B]" /> Riyadh, Kingdom of Saudi Arabia</div>
              <div className="flex items-center gap-3 text-[13px] text-[#A8C5B5]"><Phone size={13} className="text-[#B8860B]" /> +966 555 324 149</div>
              <div className="flex items-center gap-3 text-[13px] text-[#A8C5B5]"><Mail size={13} className="text-[#B8860B]" /> info@abr-alawtan.com</div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              {[Linkedin, Instagram, Twitter].map((I, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-white/15 hover:border-[#B8860B] hover:text-[#B8860B] flex items-center justify-center text-[#A8C5B5] transition rounded-lg"><I size={13} /></a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#B8860B] font-semibold">Company</div>
            <ul className="mt-5 space-y-3">
              {[['Services','/services'],['Fleet','/fleet'],['About','/about'],['Careers','/careers'],['Blog','/blog'],['Contact','/contact']].map(([l, p]) => (
                <li key={p}><Link to={p} className="text-[13px] text-[#A8C5B5] hover:text-white transition">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#B8860B] font-semibold">Ship &amp; Track</div>
            <ul className="mt-5 space-y-3">
              {[['Ship Now','/ship-now'],['Track Shipment','/track'],['Rate Calculator','/rate-calculator']].map(([l, p]) => (
                <li key={p}><Link to={p} className="text-[13px] text-[#A8C5B5] hover:text-white transition">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-[#B8860B] font-semibold">Operator Briefing</div>
            <p className="text-[13px] text-[#A8C5B5] mt-4 leading-relaxed">
              Strategic updates on Saudi logistical infrastructure and remote-region operations. Enterprise-only, no spam.
            </p>
            <div className="mt-5 flex gap-0">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Corporate email" className="flex-1 bg-white/5 border border-white/15 px-4 py-3 text-[13px] text-white placeholder:text-[#A8C5B5] outline-none focus:border-[#B8860B] rounded-l-lg" />
              <button onClick={sub} disabled={busy} className="btn-amber rounded-l-none">{busy ? '…' : 'Subscribe'}</button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#A8C5B5]">© 2026 Abr Al Awtan · All Rights Reserved</div>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] uppercase text-[#A8C5B5]">
            <a href="#" className="hover:text-[#B8860B]">Privacy</a>
            <a href="#" className="hover:text-[#B8860B]">Terms</a>
            <a href="#" className="hover:text-[#B8860B]">ZATCA</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
