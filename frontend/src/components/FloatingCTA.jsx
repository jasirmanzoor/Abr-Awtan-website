import React, { useEffect, useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { CTA_WHATSAPP } from '../data/mock';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="glass-strong p-5 max-w-[280px] fade-up">
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840]">Quick Quote</div>
          <div className="font-display text-[16px] font-medium text-[#f5efe1] mt-2">Need instant pricing? Ping our operations directors on WhatsApp.</div>
          <a href={CTA_WHATSAPP} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center mt-4 text-[12px] py-2.5">
            <MessageCircle size={14} /> Start Chat
          </a>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-11 h-11 bg-[#0f1524] border border-white/10 hover:border-[#f5b840] text-[#f5efe1] hover:text-[#f5b840] transition flex items-center justify-center">
          <ArrowUp size={16} />
        </button>
        <button onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)} onClick={() => window.open(CTA_WHATSAPP, '_blank')} className="h-11 pl-4 pr-5 bg-[#22c55e] hover:bg-[#16a34a] text-white transition flex items-center gap-2 shadow-lg shadow-[#22c55e]/25">
          <MessageCircle size={16} />
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase font-semibold">Chat Now</span>
        </button>
      </div>
    </div>
  );
}
