import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const OPS = ['Warehouse Network', 'Manpower Staffing', 'Delivery Operations', 'Vehicle Fleet', 'Express Logistics'];
const CORP = ['The Enterprise', 'Remote Dominance', 'Our Partners', 'The Advantage', 'Engage'];

export default function Footer() {
  const [email, setEmail] = React.useState('');
  return (
    <footer className="relative bg-[#0d1420] pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1a6b48] via-[#e6a446] to-[#1a6b48]" />
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="font-display text-[28px] font-semibold text-[#f4ecdc] tracking-tight">ABR AL AWTAN</div>
            <div className="text-[10px] tracking-[0.28em] text-[#9a9585] uppercase mt-1">Logistics Infrastructure</div>
            <div className="font-arabic text-[12px] text-[#9a9585] mt-1">أبر الأوطان — البنية التحتية اللوجستية</div>

            <p className="text-[14px] text-[#c9c1ab] mt-6 leading-relaxed max-w-sm">
              The physical foundation for enterprise logistics in Saudi Arabia. We build, own, and operate the infrastructure required to conquer the Kingdom.
            </p>

            <div className="space-y-3 mt-8">
              <div className="flex items-center gap-3 text-[13px] text-[#d9d2bf]">
                <MapPin size={14} className="text-[#e6a446]" /> Riyadh, Kingdom of Saudi Arabia
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#d9d2bf]">
                <Phone size={14} className="text-[#e6a446]" /> +966 11 XXX XXXX
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#d9d2bf]">
                <Mail size={14} className="text-[#e6a446]" /> corporate@abralawtan.sa
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[11px] tracking-[0.28em] uppercase text-[#e6a446] font-semibold">Operations</div>
            <ul className="mt-5 space-y-3">
              {OPS.map((o) => (
                <li key={o}><a href="#services" className="text-[13px] text-[#c9c1ab] hover:text-[#e6a446] transition">{o}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="text-[11px] tracking-[0.28em] uppercase text-[#e6a446] font-semibold">Corporate</div>
            <ul className="mt-5 space-y-3">
              {CORP.map((c) => (
                <li key={c}><a href="#enterprise" className="text-[13px] text-[#c9c1ab] hover:text-[#e6a446] transition">{c}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="text-[11px] tracking-[0.28em] uppercase text-[#e6a446] font-semibold">Intelligence Briefing</div>
            <p className="text-[13px] text-[#c9c1ab] mt-4 leading-relaxed">
              Strategic updates on Saudi logistical infrastructure and remote region operations.
            </p>
            <div className="mt-5 flex">
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Corporate Email" className="flex-1 bg-[#111a29] border border-white/10 px-4 py-3 text-[13px] text-[#f4ecdc] placeholder:text-[#9a9585] outline-none focus:border-[#e6a446]" />
              <button onClick={() => { if (email) { setEmail(''); } }} className="btn-amber">Initialize</button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#9a9585]">© 2026 Abr Al Awtan. All Rights Reserved.</div>
          <div className="flex items-center gap-6 text-[11px] tracking-[0.2em] uppercase text-[#9a9585]">
            <a href="#" className="hover:text-[#e6a446]">Privacy Policy</a>
            <a href="#" className="hover:text-[#e6a446]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
