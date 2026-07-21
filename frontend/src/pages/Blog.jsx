import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import PageHeader from '../components/PageHeader';
import { listBlog } from '../lib/api';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { listBlog().then(setPosts).catch(() => setPosts([])); }, []);

  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />
      <PageHeader eyebrow="Operator Briefing" title="Field notes from" italic="the Kingdom's lanes." subtitle="Insight, strategy and operational know-how from the team routing Saudi Arabia's toughest logistics." crumbs={[{ label: 'Blog' }]} />

      {posts[0] && (
        <section className="relative py-16 border-b border-white/5">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
            <Link to={`/blog/${posts[0].slug}`} className="group grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
                <img src={posts[0].image} alt={posts[0].title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-700" />
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] bg-[#050810]/70 border border-[#f5b840]/30 px-2.5 py-1">Featured · {posts[0].category}</div>
              </div>
              <div>
                <div className="flex items-center gap-4 font-mono text-[11px] text-[#7d8391]">
                  <span className="flex items-center gap-1.5"><Calendar size={11} /> {posts[0].date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={11} /> {posts[0].read}</span>
                </div>
                <h2 className="font-display text-[32px] lg:text-[44px] font-medium text-[#f5efe1] leading-tight tracking-tight mt-4">{posts[0].title}</h2>
                <p className="text-[15px] text-[#c9c1ab] mt-4 leading-relaxed">{posts[0].excerpt}</p>
                <div className="flex items-center gap-2 mt-6 font-mono text-[11px] tracking-[0.22em] uppercase text-[#f5b840] group-hover:gap-3 transition-all">By {posts[0].author} <ArrowRight size={14} /></div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="relative py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group border border-white/8 bg-[#0a0f1a] overflow-hidden hover:border-[#f5b840]/30 transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840] bg-[#050810]/70 border border-[#f5b840]/30 px-2.5 py-1">{p.category}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 font-mono text-[10px] text-[#7d8391]">
                    <span>{p.date}</span><span>·</span><span>{p.read}</span>
                  </div>
                  <h3 className="font-display text-[20px] font-medium text-[#f5efe1] leading-tight mt-3">{p.title}</h3>
                  <p className="text-[13px] text-[#c9c1ab] mt-3 leading-relaxed line-clamp-3">{p.excerpt}</p>
                  <div className="flex items-center gap-2 mt-5 text-[11px] font-mono tracking-[0.22em] uppercase text-[#f5b840]">Read <ArrowRight size={12} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
