import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Leaf, Compass, ArrowUpRight, BarChart2, CheckCircle } from 'lucide-react';

// ── Animated SVG arc for water savings ───────────────────────
function ArcProgress({ percent = 90, size = 180, strokeWidth = 12 }) {
  const [animated, setAnimated] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(percent); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percent]);

  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference - (animated / 100) * circumference;

  return (
    <div ref={ref} className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="rgba(34,197,94,0.1)" strokeWidth={strokeWidth} />
        {/* Progress */}
        <circle cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="url(#arc-gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <Droplet className="w-7 h-7 mb-1" style={{ color: '#22c55e' }} />
        <span className="text-4xl font-black" style={{ color: '#052e16' }}>{animated}%</span>
        <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: '#16a34a' }}>Water Saved</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const features = [
    {
      icon: Leaf, title: 'Automated Climate Loops',
      desc: 'Integrated air temperature & humidity automation rules.',
    },
    {
      icon: BarChart2, title: 'Crop Cycle Scheduling',
      desc: 'Established high-yield sequential harvesting structures.',
    },
    {
      icon: Droplet, title: 'NFT Recirculation',
      desc: '90% water savings vs. open-field cultivation methods.',
    },
    {
      icon: CheckCircle, title: 'Precision Fertigation',
      desc: 'Programmed nutrient dosing loops balancing pH & EC.',
    },
  ];

  return (
    <section
      id="projects"
      className="py-14 relative overflow-hidden"
      style={{ background: '#f8fffe' }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-0 w-96 h-96 opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.25)' }}
          >
            <Compass className="w-4 h-4" />
            Featured Deployment
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: '#052e16' }}
          >
            Signature{' '}
            <span style={{
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Project
            </span>
          </motion.h2>
          <p style={{ color: '#4b7a5e' }}>
            Real-world execution of commercial-scale protected farming environments.
          </p>
        </div>

        {/* Featured card with gradient border */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="gradient-border"
          >
            <div
              className="rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden group shimmer-card"
              style={{
                background: 'rgba(255,255,255,0.95)',
                boxShadow: '0 20px 70px rgba(34,197,94,0.1)',
              }}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 80% 20%, rgba(34,197,94,0.04) 0%, transparent 60%)' }} />

              {/* Left content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ background: 'rgba(34,197,94,0.1)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.25)' }}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Featured Deployment
                  </span>
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider"
                    style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid rgba(34,197,94,0.2)' }}
                  >
                    NFT System
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: '#052e16' }}>
                  Commercial Hydroponic Setup & Automation
                </h3>

                <p className="text-base leading-relaxed" style={{ color: '#4b7a5e' }}>
                  Designed, installed, and scaled a state-of-the-art Nutrient Film Technique (NFT) system for
                  continuous year-round cultivation of high-value leafy vegetables. Programmed specialized nutrient
                  dosing loops, balancing pH fluctuations and EC salt levels automatically.
                </p>

                {/* Feature pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {features.map((f, i) => {
                    const FIcon = f.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.2)' }}>
                          <FIcon className="w-4 h-4" style={{ color: '#16a34a' }} />
                        </div>
                        <div>
                          <h4 className="text-xs font-black uppercase tracking-wide" style={{ color: '#052e16' }}>{f.title}</h4>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#4b7a5e' }}>{f.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:gap-3"
                  style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 25px rgba(34,197,94,0.4)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
                >
                  Discuss a Similar Project
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Right: Animated arc */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center gap-6">
                <div
                  className="p-8 rounded-3xl flex flex-col items-center gap-4"
                  style={{
                    background: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
                    border: '1px solid rgba(34,197,94,0.2)',
                    boxShadow: '0 8px 30px rgba(34,197,94,0.1)',
                  }}
                >
                  <ArcProgress percent={90} size={180} strokeWidth={14} />
                  <div className="text-center">
                    <h4 className="text-sm font-black" style={{ color: '#052e16' }}>NFT Recirculation Efficiency</h4>
                    <p className="text-xs mt-1 max-w-[200px] leading-relaxed" style={{ color: '#4b7a5e' }}>
                      Compared to traditional open-field crop cultivation methods.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
