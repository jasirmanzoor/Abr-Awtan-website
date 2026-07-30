import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Radio, Phone, ChevronDown, Globe } from 'lucide-react';
import { useLang } from '../context/LangContext';

const LINKS = [
  { key: 'nav.services', to: '/services' },
  { key: 'nav.fleet', to: '/fleet' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.careers', to: '/careers' },
  { key: 'nav.blog', to: '/blog' },
  { key: 'nav.contact', to: '/contact' }
];

const SHIP_LINKS = [
  { key: 'nav.shipNow', to: '/ship-now' },
  { key: 'nav.trackShipment', to: '/track' },
  { key: 'nav.rateCalc', to: '/rate-calculator' }
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const loc = useLocation();
  const { t, lang, toggle } = useLang();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setOpen(false); setDropdown(false); }, [loc.pathname]);

  return (
    <>
      {/* Top status bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#0A1F14] border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[30px] flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-4 text-[#A8C5B5]">
            <div className="flex items-center gap-2 text-[#0D8A45]">
              <span className="w-1.5 h-1.5 bg-[#0D8A45] rounded-full pulse-dot" />
              <span>{t('topbar.command') || 'Command Center Live'}</span>
            </div>
            <span className="hidden md:inline">{t('topbar.location') || 'Riyadh · Kingdom of Saudi Arabia'}</span>
          </div>

            </button>
          </div>
        </div>
      </div>

      <header className={`fixed top-[30px] left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-[rgba(0,108,53,0.1)] shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[74px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 border border-[#006C35]/50 flex items-center justify-center rounded-sm">
              <div className="absolute inset-1 bg-[#006C35]/08" />
              <div className="relative font-display text-[16px] font-bold text-[#006C35]">A</div>
              <div className="absolute -top-px -left-px w-2 h-2 border-l border-t border-[#006C35]" />
              <div className="absolute -bottom-px -right-px w-2 h-2 border-r border-b border-[#006C35]" />
            </div>
            <div>
              <div className={`font-display text-[19px] font-semibold tracking-tight leading-none transition-colors ${scrolled ? 'text-[#0A1F14]' : 'text-[#0A1F14]'}`}>ABR AL AWTAN</div>
              <div className="text-[9px] tracking-[0.32em] text-[#5A6B62] uppercase mt-1.5 font-mono">Logistics Infrastructure</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} data-testid={`nav-${l.key.split('.')[1]}`} 
                className={`nav-link text-[13px] font-medium transition-colors ${loc.pathname === l.to ? 'text-[#006C35]' : 'text-[#1A2F24] hover:text-[#006C35]'}`}>
                {t(l.key)}
              </Link>
            ))}
            <div className="relative" onMouseEnter={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)}>
              <button className="nav-link text-[13px] font-medium text-[#1A2F24] flex items-center gap-1 hover:text-[#006C35]">
                {t('nav.shipTrack') || 'Ship & Track'} <ChevronDown size={13} className={dropdown ? 'rotate-180 transition' : 'transition'} />
              </button>
              {dropdown && (
                <div className="absolute top-full left-0 pt-3">
                  <div className="glass-strong min-w-[220px] p-2 rounded-lg shadow-lg">
                    {SHIP_LINKS.map((s) => (
                      <Link key={s.to} to={s.to} data-testid={`nav-${s.key.split('.')[1]}`} 
                        className="block px-4 py-3 text-[13px] text-[#1A2F24] hover:bg-[#E8F5EE] hover:text-[#006C35] transition rounded-md">
                        {t(s.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/track" data-testid="btn-track-header" className="btn-ghost text-[12px] py-2.5 px-4"><Radio size={14} /> {t('nav.track') || 'Track'}</Link>
            <Link to="/ship-now" data-testid="btn-shipnow-header" className="btn-primary text-[12px] py-2.5 px-4">{t('nav.shipNow') || 'Ship Now'} <ArrowUpRight size={14} /></Link>
          </div>

          <button className="lg:hidden text-[#0A1F14]" onClick={() => setOpen(!open)} data-testid="mobile-menu-toggle">{open ? <X size={22} /> : <Menu size={22} />}</button>
        </div>

        {open && (
          <div className="lg:hidden bg-white border-t border-[rgba(0,108,53,0.1)] px-6 py-6 shadow-lg">
            <div className="flex flex-col gap-3">
              {[...LINKS, ...SHIP_LINKS].map((l) => (
                <Link key={l.to} to={l.to} className="text-[14px] text-[#1A2F24] py-2 border-b border-[rgba(0,108,53,0.08)]">{t(l.key)}</Link>
              ))}
              <button onClick={toggle} data-testid="lang-toggle-mobile" className="flex items-center gap-2 text-[13px] text-[#006C35] py-2 mt-1"><Globe size={14} /> {lang === 'en' ? 'العربية' : 'English'}</button>
              <Link to="/ship-now" className="btn-primary text-[12px] w-fit mt-3">{t('nav.shipNow') || 'Ship Now'} <ArrowUpRight size={14} /></Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
