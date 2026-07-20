import React, { useEffect, useState } from 'react';
import { NAV_LINKS, CTA_WHATSAPP } from '../data/mock';
import { Menu, X, ArrowUpRight, Radio } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      {/* Live status strip */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#050810] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[30px] flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-4 text-[#7d8391]">
            <div className="flex items-center gap-2 text-[#22c55e]">
              <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
              <span>COMMAND CENTER — LIVE</span>
            </div>
            <span className="hidden md:inline">RIYADH • الرياض</span>
            <span className="hidden md:inline">{new Date().toLocaleDateString('en-GB')}</span>
          </div>
          <div className="flex items-center gap-4 text-[#7d8391]">
            <a href={CTA_WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-[#f5b840] transition">+966 50 000 0000</a>
            <span className="hidden md:inline text-[#f5b840]">EN / عربي</span>
          </div>
        </div>
      </div>

      <header className={`fixed top-[30px] left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050810]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[74px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 border border-[#f5b840]/50 flex items-center justify-center">
              <div className="absolute inset-1 bg-[#f5b840]/10" />
              <div className="relative font-display text-[16px] font-bold text-[#f5b840]">A</div>
              <div className="absolute -top-px -left-px w-2 h-2 border-l border-t border-[#f5b840]" />
              <div className="absolute -bottom-px -right-px w-2 h-2 border-r border-b border-[#f5b840]" />
            </div>
            <div>
              <div className="font-display text-[19px] font-semibold tracking-tight text-[#ede6d4] leading-none">ABR AL AWTAN</div>
              <div className="text-[9px] tracking-[0.32em] text-[#7d8391] uppercase mt-1.5 font-mono">Logistics Infrastructure</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-[13px] font-medium text-[#c9c1ab]">{l.label}</a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#track" className="btn-ghost text-[12px] py-2.5 px-4"><Radio size={14} /> Track</a>
            <a href="#quote" className="btn-primary text-[12px] py-2.5 px-4">Get Instant Quote <ArrowUpRight size={14} /></a>
          </div>

          <button className="lg:hidden text-[#ede6d4]" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-[#050810] border-t border-white/5 px-6 py-6">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[14px] text-[#c9c1ab]">{l.label}</a>
              ))}
              <a href="#quote" onClick={() => setOpen(false)} className="btn-primary text-[12px] w-fit mt-2">Get Instant Quote <ArrowUpRight size={14} /></a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
