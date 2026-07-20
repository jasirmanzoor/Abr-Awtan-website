import React, { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data/mock';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0d1420]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[74px] flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-3">
          <div>
            <div className="font-display text-[22px] font-semibold tracking-tight text-[#ece5d3] leading-none">ABR AL AWTAN</div>
            <div className="text-[10px] tracking-[0.28em] text-[#9a9585] uppercase mt-1">Logistics Infrastructure</div>
            <div className="text-[10px] text-[#9a9585] font-arabic mt-0.5">أبر الأوطان — البنية التحتية اللوجستية</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link text-[13px] font-medium text-[#d9d2bf]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href="#contact" className="btn-green text-[13px] tracking-wide">
            Partner With Us <ArrowUpRight size={16} strokeWidth={2} />
          </a>
        </div>

        <button className="lg:hidden text-[#ece5d3]" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0d1420] border-t border-white/5 px-6 py-6">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[14px] text-[#d9d2bf]">{l.label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-green text-[13px] w-fit mt-2">Partner With Us <ArrowUpRight size={16} /></a>
          </div>
        </div>
      )}
    </header>
  );
}
