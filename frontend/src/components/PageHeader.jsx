import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export default function PageHeader({ eyebrow, title, italic, subtitle, crumbs = [], bg }) {
  return (
    <section className="relative pt-[170px] pb-16 lg:pb-20 overflow-hidden border-b border-white/5">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -top-40 left-1/4 w-[600px] h-[400px] bg-[#f5b840]/8 rounded-full blur-3xl" />
      {bg && (
        <div className="absolute inset-0 opacity-25">
          <img src={bg} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/70 via-[#050810]/85 to-[#050810]" />
        </div>
      )}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] uppercase text-[#7d8391] mb-5">
          <Link to="/" className="hover:text-[#f5b840] transition">Home</Link>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}><ChevronRight size={11} />{c.to ? <Link to={c.to} className="hover:text-[#f5b840] transition">{c.label}</Link> : <span className="text-[#f5b840]">{c.label}</span>}</React.Fragment>
          ))}
        </div>
        {eyebrow && <div className="section-tag mb-4">{eyebrow}</div>}
        <h1 className="font-display text-[46px] lg:text-[72px] font-medium leading-[1.02] tracking-[-0.025em] text-[#f5efe1] max-w-4xl">
          {title} {italic && <span className="italic text-amber-grad">{italic}</span>}
        </h1>
        {subtitle && <p className="text-[16px] lg:text-[17px] text-[#c9c1ab] mt-6 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}

export function CTABand({ title, italic, subtitle, ctaLabel = 'Get Quote', ctaTo = '/ship-now' }) {
  return (
    <section className="relative bg-[#0a0f1a] border-y border-white/5 py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 diagonal-lines opacity-40" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-[#f5b840]/10 rounded-full blur-3xl" />
      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10 text-center">
        <h3 className="font-display text-[36px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.025em] text-[#f5efe1]">
          {title} <span className="italic text-amber-grad">{italic}</span>
        </h3>
        {subtitle && <p className="text-[15px] text-[#c9c1ab] mt-5 max-w-xl mx-auto">{subtitle}</p>}
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          <Link to={ctaTo} className="btn-primary">{ctaLabel} <ArrowUpRight size={15} /></Link>
          <Link to="/contact" className="btn-ghost">Talk to Operations</Link>
        </div>
      </div>
    </section>
  );
}
