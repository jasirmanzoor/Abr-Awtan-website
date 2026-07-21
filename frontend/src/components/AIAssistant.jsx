import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles, ArrowUp } from 'lucide-react';
import { sendChat } from '../lib/api';

const SUGGESTIONS = [
  'What services do you offer?',
  'How do I ship a parcel to Jazan?',
  'What makes you different from aggregators?',
  'Can I get a rate for Riyadh to Jeddah?'
];

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [session] = useState(() => localStorage.getItem('aaw_chat_session') || (() => { const s = 'sess-' + Date.now(); localStorage.setItem('aaw_chat_session', s); return s; })());
  const [msgs, setMsgs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aaw_chat_msgs') || 'null') || [
      { role: 'assistant', text: "Hi — I'm Aisha, the Abr Al Awtan AI assistant. Ask me anything about our services, coverage, pricing, or how to ship a parcel across the Kingdom." }
    ]; } catch { return []; }
  });
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scroller = useRef(null);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
    try { localStorage.setItem('aaw_chat_msgs', JSON.stringify(msgs.slice(-40))); } catch {}
  }, [msgs]);

  useEffect(() => {
    const h = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || busy) return;
    setInput('');
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setBusy(true);
    try {
      const r = await sendChat(session, q);
      setMsgs((m) => [...m, { role: 'assistant', text: r.reply }]);
    } catch {
      setMsgs((m) => [...m, { role: 'assistant', text: 'I hit a hiccup reaching the command center. Please retry or WhatsApp us at +966 50 000 0000.' }]);
    } finally {
      setBusy(false);
    }
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* Floating trigger + scroll-top */}
      <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end gap-2">
        {showScrollTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-11 h-11 bg-[#0f1524] border border-white/10 hover:border-[#f5b840] text-[#f5efe1] hover:text-[#f5b840] transition flex items-center justify-center">
            <ArrowUp size={16} />
          </button>
        )}
        {!open && (
          <button onClick={() => setOpen(true)} className="group relative flex items-center gap-3 pl-2 pr-4 py-2 bg-gradient-to-br from-[#0f1524] to-[#050810] border border-[#f5b840]/40 hover:border-[#f5b840] shadow-2xl transition">
            <div className="relative w-10 h-10 bg-gradient-to-br from-[#f5b840] to-[#e0942c] flex items-center justify-center">
              <Sparkles size={16} className="text-[#050810]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-[#050810] pulse-dot" />
            </div>
            <div className="text-left">
              <div className="text-[13px] font-semibold text-[#f5efe1] leading-tight">Ask Aisha</div>
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#22c55e]">AI · Online</div>
            </div>
          </button>
        )}
      </div>

      {/* Chat panel */}
      {open && (
        <div className="fixed inset-0 z-[75] pointer-events-none">
          <div className="absolute bottom-6 right-6 lg:bottom-6 lg:right-6 w-[95vw] max-w-[420px] h-[80vh] max-h-[640px] bg-[#050810] border border-[#f5b840]/30 shadow-2xl flex flex-col pointer-events-auto" style={{ animation: 'fadeUp 0.4s cubic-bezier(0.2,0.7,0.2,1) forwards' }}>
            {/* Header */}
            <div className="relative flex items-center justify-between p-4 border-b border-white/8 bg-gradient-to-r from-[#0f1524] to-[#050810]">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 bg-gradient-to-br from-[#f5b840] to-[#e0942c] flex items-center justify-center">
                  <Sparkles size={18} className="text-[#050810]" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-[#050810] pulse-dot" />
                </div>
                <div>
                  <div className="font-display text-[16px] font-semibold text-[#f5efe1] leading-tight">Aisha</div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-[#22c55e]">
                    <span className="w-1 h-1 bg-[#22c55e] rounded-full" /> Online · AI Assistant
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 border border-white/10 hover:border-[#f5b840] hover:text-[#f5b840] text-[#c9c1ab] flex items-center justify-center transition">
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scroller} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#050810]">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-[13.5px] leading-relaxed ${m.role === 'user' ? 'bg-[#f5b840]/15 border border-[#f5b840]/25 text-[#f5efe1]' : 'bg-[#0f1524] border border-white/8 text-[#ede6d4]'}`} style={{ whiteSpace: 'pre-wrap' }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="bg-[#0f1524] border border-white/8 p-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-[#f5b840] rounded-full" style={{ animation: 'pulseDot 1s ease-in-out infinite' }} />
                      <span className="w-1.5 h-1.5 bg-[#f5b840] rounded-full" style={{ animation: 'pulseDot 1s ease-in-out infinite 0.2s' }} />
                      <span className="w-1.5 h-1.5 bg-[#f5b840] rounded-full" style={{ animation: 'pulseDot 1s ease-in-out infinite 0.4s' }} />
                    </div>
                    <span className="text-[11px] font-mono text-[#7d8391] tracking-wider">AISHA IS TYPING</span>
                  </div>
                </div>
              )}

              {msgs.length <= 1 && !busy && (
                <div className="pt-4">
                  <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#7d8391] mb-2">Try asking</div>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} onClick={() => send(s)} className="text-[11.5px] text-[#f5b840] border border-[#f5b840]/25 hover:bg-[#f5b840]/8 px-3 py-1.5 transition">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-white/8 p-3 bg-[#0a0f1a]">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  rows={1}
                  placeholder="Ask about services, pricing, coverage…"
                  className="flex-1 bg-[#050810] border border-white/10 focus:border-[#f5b840] px-3 py-2.5 text-[13px] text-[#f5efe1] placeholder:text-[#7d8391] outline-none resize-none max-h-24"
                />
                <button onClick={() => send()} disabled={busy || !input.trim()} className="w-10 h-10 bg-gradient-to-br from-[#f5b840] to-[#e0942c] hover:from-[#ffd27a] hover:to-[#f5b840] disabled:opacity-40 flex items-center justify-center text-[#050810] transition">
                  {busy ? <Loader2 size={15} className="animate-spin" /> : <Send size={14} />}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 font-mono text-[9px] tracking-[0.22em] uppercase text-[#7d8391]">
                <span>AI · Answers can be inaccurate</span>
                <a href="https://wa.me/966500000000" target="_blank" rel="noreferrer" className="text-[#22c55e] hover:underline">• WhatsApp a human</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
