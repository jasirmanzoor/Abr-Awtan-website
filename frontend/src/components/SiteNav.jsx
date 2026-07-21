import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Radio, Phone, ChevronDown } from 'lucide-react';

const LINKS = [
  { label: 'Services', to: '/services' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' }
];

const SHIP_LINKS = [
  { label: 'Ship Now', to: '/ship-now' },
  { label: 'Track Shipment', to: '/track' },
  { label: 'Rate Calculator', to: '/rate-calculator' }
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(false); }, [loc.pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#050810] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[30px] flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-4 text-[#7d8391]">
            <div className="flex items-center gap-2 text-[#22c55e]">
              <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-dot" />
              <span>COMMAND CENTER · LIVE</span>
            </div>
            <span className="hidden md:inline">RIYADH · KSA</span>
          </div>
          <div className="flex items-center gap-4 text-[#7d8391]">
            <a href="tel:+966500000000" className="hover:text-[#f5b840] transition flex items-center gap-1.5"><Phone size={11} /> +966 50 000 0000</a>
            <span className="hidden md:inline text-[#f5b840]">EN</span>
          </div>
        </div>
      </div>

      <header className={`fixed top-[30px] left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050810]/95 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[74px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
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
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className={`nav-link text-[13px] font-medium ${loc.pathname === l.to ? 'text-[#f5b840]' : 'text-[#c9c1ab]'}`}>{l.label}</Link>
            ))}
            <div className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button className="nav-link text-[13px] font-medium text-[#c9c1ab] flex items-center gap-1">
                Ship &amp; Track <ChevronDown size={13} className={dropdown ? 'rotate-180 transition' : 'transition'} />
              </button>
              {dropdown && (
                <div className="absolute top-full left-0 pt-3">
                  <div className="glass-strong min-w-[220px] p-2">
                    {SHIP_LINKS.map((s) => (
                      <Link key={s.to} to={s.to} className="block px-4 py-3 text-[13px] text-[#c9c1ab] hover:bg-[#f5b840]/10 hover:text-[#f5b840] transition">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/track" className="btn-ghost text-[12px] py-2.5 px-4"><Radio size={14} /> Track</Link>
            <Link to="/ship-now" className="btn-primary text-[12px] py-2.5 px-4">Ship Now <ArrowUpRight size={14} /></Link>
          </div>

          <button className="lg:hidden text-[#ede6d4]" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>

        {open && (
          <div className="lg:hidden bg-[#050810] border-t border-white/5 px-6 py-6">
            <div className="flex flex-col gap-3">
              {[...LINKS, ...SHIP_LINKS].map((l) => (
                <Link key={l.to} to={l.to} className="text-[14px] text-[#c9c1ab] py-2 border-b border-white/5">{l.label}</Link>
              ))}
              <Link to="/ship-now" className="btn-primary text-[12px] w-fit mt-3">Ship Now <ArrowUpRight size={14} /></Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
