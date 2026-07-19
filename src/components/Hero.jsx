import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Droplet, Leaf, Sprout, Wind, ArrowRight, ShieldCheck } from 'lucide-react';

// ── Leaf rain particle ──────────────────────────────────────────
const LeafParticle = ({ delay, left, size, duration }) => (
  <div
    className="leaf-particle"
    style={{
      left,
      width: size,
      height: size,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      opacity: 0,
    }}
  >
    <Leaf
      className="w-full h-full"
      style={{ color: `rgba(22,163,74,${0.10 + Math.random() * 0.18})` }}
    />
  </div>
);

// ── Animated counter hook ───────────────────────────────────────
function useCounter(target, duration = 1800, trigger) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (!numeric) return;
    let start = 0;
    const steps = 60;
    const increment = numeric / steps;
    const interval = duration / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) { setCount(numeric); clearInterval(timer); }
      else setCount(Math.floor(start * 10) / 10);
    }, interval);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);

  const suffix = target.replace(/[0-9.]/g, '');
  const numericVal = parseFloat(target.replace(/[^0-9.]/g, ''));
  const display = Number.isInteger(numericVal) ? Math.round(count) : count.toFixed(1);
  return `${display}${suffix}`;
}

function StatCard({ value, label, icon: Icon, index, triggered }) {
  const displayed = useCounter(value, 1500 + index * 200, triggered);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: triggered ? 1 : 0, y: triggered ? 0 : 20 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
      className="flex items-center gap-4"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'rgba(22,163,74,0.1)',
          border: '1px solid rgba(22,163,74,0.25)',
        }}
      >
        <Icon className="w-5 h-5" style={{ color: '#16a34a' }} />
      </div>
      <div>
        <div className="text-2xl font-black leading-none tracking-tight" style={{ color: '#052e16' }}>
          {displayed}
        </div>
        <div className="text-xs mt-1 font-medium leading-tight" style={{ color: '#4b7a5e' }}>
          {label}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTriggered(true), 400);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { value: '90%', label: 'Water Savings (NFT systems)', icon: Droplet },
    { value: '3+', label: 'Years Smart Agri Experience', icon: Sprout },
    { value: '10+', label: 'High-Value Crops Managed', icon: Leaf },
  ];

  const particles = [
    { delay: 0,  left: '8%',  size: 22, duration: 14 },
    { delay: 3,  left: '18%', size: 30, duration: 18 },
    { delay: 7,  left: '33%', size: 18, duration: 12 },
    { delay: 1,  left: '55%', size: 26, duration: 16 },
    { delay: 5,  left: '72%', size: 20, duration: 13 },
    { delay: 9,  left: '82%', size: 32, duration: 20 },
    { delay: 2,  left: '91%', size: 24, duration: 15 },
    { delay: 11, left: '45%', size: 16, duration: 11 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #f0fdf4 0%, #ffffff 45%, #f0fdf4 100%)' }}
    >
      {/* Radial soft glow spots */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute" style={{
          top: '-5%', left: '-5%', width: '55%', height: '65%',
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.08) 0%, transparent 70%)',
        }} />
        <div className="absolute" style={{
          bottom: '5%', right: '-5%', width: '45%', height: '55%',
          background: 'radial-gradient(ellipse, rgba(22,163,74,0.07) 0%, transparent 70%)',
        }} />
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.5]" style={{
        backgroundImage: 'radial-gradient(circle, rgba(22,163,74,0.12) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      {/* Leaf rain */}
      {particles.map((p, i) => <LeafParticle key={i} {...p} />)}

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* ── Left text ── */}
        <div className="lg:col-span-7 text-left space-y-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: 'rgba(22,163,74,0.1)',
              border: '1px solid rgba(22,163,74,0.3)',
              color: '#16a34a',
            }}
          >
            <ShieldCheck className="w-4 h-4" />
            Senior Agronomist &amp; Hydroponics Lead
          </motion.div>

          {/* Headline */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight"
              style={{ color: '#052e16' }}
            >
              Cultivating the{' '}
              <br className="hidden sm:inline" />
              Future of{' '}
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #4ade80 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Sustainable Agriculture
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg max-w-xl leading-relaxed"
              style={{ color: '#4b7a5e' }}
            >
              Hi, I'm{' '}
              <strong style={{ color: '#16a34a', fontWeight: 700 }}>Aman Chandra</strong>. I engineer
              commercial-scale hydroponic ecosystems (NFT, Dutch Bucket, DWC), optimize nutrient
              formulations, and streamline FMCG supply chains for maximum quality, yield, and ecological
              efficiency.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#dashboard"
              className="group relative px-7 py-4 rounded-xl text-white font-bold text-sm flex items-center gap-2 overflow-hidden transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,197,94,0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
            >
              Explore Smart Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-7 py-4 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                border: '1.5px solid rgba(22,163,74,0.4)',
                background: 'rgba(22,163,74,0.06)',
                color: '#16a34a',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(22,163,74,0.12)';
                e.currentTarget.style.borderColor = 'rgba(22,163,74,0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(22,163,74,0.06)';
                e.currentTarget.style.borderColor = 'rgba(22,163,74,0.4)';
              }}
            >
              Consult an Agronomist
            </a>
          </motion.div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6"
            style={{ borderTop: '1.5px solid rgba(22,163,74,0.15)' }}>
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} index={i} triggered={triggered} />
            ))}
          </div>
        </div>

        {/* ── Right: Visual Orb ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center relative"
        >
          <div className="relative flex items-center justify-center" style={{ width: 360, height: 360 }}>
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
            }} />

            {/* Spinning rings */}
            <div className="absolute inset-0 rounded-full animate-spin-slow" style={{
              border: '1.5px dashed rgba(22,163,74,0.25)',
            }} />
            <div className="absolute animate-spin-slow-rev rounded-full" style={{
              inset: 28,
              border: '1px dotted rgba(34,197,94,0.35)',
            }} />

            {/* Main orb */}
            <div className="relative flex flex-col items-center justify-center rounded-full shadow-xl" style={{
              width: 260, height: 260,
              background: 'linear-gradient(145deg, #ffffff, #f0fdf4)',
              border: '1.5px solid rgba(34,197,94,0.25)',
              boxShadow: '0 20px 60px rgba(34,197,94,0.15), 0 0 0 1px rgba(34,197,94,0.08)',
            }}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(22,163,74,0.1)',
                  border: '1px solid rgba(22,163,74,0.3)',
                  boxShadow: '0 0 25px rgba(34,197,94,0.15)',
                }}
              >
                <Sprout className="w-12 h-12" style={{ color: '#16a34a' }} />
              </motion.div>
              <div className="mt-4 text-center">
                <span className="block text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: '#16a34a' }}>
                  SMART GROWING
                </span>
                <span className="block text-sm mt-1" style={{ color: '#4b7a5e' }}>
                  Ecosystem Optimizer
                </span>
              </div>
            </div>

            {/* Orbital floating tags */}
            <div
              className="absolute -top-2 right-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(34,197,94,0.3)',
                color: '#15803d',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
              Real-Time pH/EC Control
            </div>
            <div
              className="absolute bottom-4 -left-8 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(34,197,94,0.3)',
                color: '#15803d',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Wind className="w-4 h-4 flex-shrink-0" style={{ color: '#16a34a' }} />
              Precision Fertigation
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
