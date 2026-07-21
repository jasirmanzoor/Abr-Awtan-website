import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { getBlogPost, listBlog } from '../lib/api';
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [others, setOthers] = useState([]);

  useEffect(() => {
    setPost(null);
    getBlogPost(slug).then(setPost).catch(() => setPost(null));
    listBlog().then((all) => setOthers(all.filter((p) => p.slug !== slug).slice(0, 3)));
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!post) {
    return (
      <div className="font-body bg-[#050810] min-h-screen">
        <SiteNav />
        <div className="pt-[200px] text-center text-[#7d8391]">Loading…</div>
      </div>
    );
  }

  return (
    <div className="font-body bg-[#050810]">
      <SiteNav />

      <article className="relative pt-[160px] pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute inset-0 opacity-20">
          <img src={post.image} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/60 via-[#050810]/80 to-[#050810]" />
        </div>
        <div className="relative max-w-[900px] mx-auto px-6 lg:px-10">
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-[#7d8391] hover:text-[#f5b840] transition mb-8"><ArrowLeft size={14} /> Back to Briefing</Link>
          <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#f5b840] mb-4">{post.category}</div>
          <h1 className="font-display text-[38px] lg:text-[60px] font-medium leading-[1.05] tracking-[-0.02em] text-[#f5efe1]">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-5 mt-6 font-mono text-[12px] text-[#7d8391]">
            <span className="flex items-center gap-2"><User size={12} className="text-[#f5b840]" /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={12} className="text-[#f5b840]" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={12} className="text-[#f5b840]" /> {post.read}</span>
          </div>
        </div>
      </article>

      <section className="relative py-4 lg:py-8">
        <div className="max-w-[820px] mx-auto px-6 lg:px-10">
          <div className="relative aspect-[16/9] overflow-hidden border border-white/8">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <div className="prose-content mt-12 space-y-6">
            <p className="text-[18px] text-[#c9c1ab] leading-[1.75] font-light">{post.excerpt}</p>
            <div className="h-[1px] bg-white/10" />
            <p className="text-[16px] text-[#ede6d4] leading-[1.8]">{post.content}</p>
          </div>

          <div className="mt-16 pt-8 border-t border-white/8 flex items-center justify-between">
            <Link to="/blog" className="btn-ghost text-[12px] py-2.5 px-4"><ArrowLeft size={13} /> All Articles</Link>
            <Link to="/contact" className="btn-primary text-[12px] py-2.5 px-4">Talk to Operations <ArrowRight size={13} /></Link>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="relative bg-[#0a0f1a] border-t border-white/5 py-20 mt-16">
          <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
            <div className="section-tag mb-4">Related</div>
            <h3 className="font-display text-[28px] lg:text-[36px] font-medium text-[#f5efe1] mb-10">Continue reading</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group border border-white/8 bg-[#050810] overflow-hidden hover:border-[#f5b840]/30 transition">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="p-5">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#f5b840]">{p.category}</div>
                    <h4 className="font-display text-[18px] font-medium text-[#f5efe1] leading-tight mt-2">{p.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
