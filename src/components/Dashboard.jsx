import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Activity, Thermometer, Droplet, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';

function SliderControl({ label, value, min, max, step, onChange, unit = '' }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm items-center">
        <span className="font-medium" style={{ color: '#4b7a5e' }}>{label}</span>
        <span
          className="font-black text-sm px-3 py-1 rounded-lg"
          style={{
            background: 'rgba(22,163,74,0.1)',
            color: '#16a34a',
            border: '1px solid rgba(22,163,74,0.2)',
          }}
        >
          {typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(1) : value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="green-slider w-full"
        style={{ '--value': `${percent}%` }}
      />
    </div>
  );
}

function GaugeCard({ label, value, displayValue, status, statusText, icon: Icon }) {
  const colorMap = {
    optimal: { bg: 'rgba(22,163,74,0.07)',  border: 'rgba(22,163,74,0.25)',  text: '#16a34a',  pill: 'rgba(22,163,74,0.1)' },
    warning: { bg: 'rgba(234,179,8,0.07)',   border: 'rgba(234,179,8,0.25)',  text: '#b45309',  pill: 'rgba(234,179,8,0.1)' },
    danger:  { bg: 'rgba(220,38,38,0.07)',   border: 'rgba(220,38,38,0.25)', text: '#dc2626',  pill: 'rgba(220,38,38,0.1)' },
  };
  const c = colorMap[status] || colorMap.optimal;
  return (
    <div
      className="rounded-2xl p-5 text-center transition-all duration-300 hover:scale-[1.03] cursor-default shimmer-card"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      {Icon && (
        <div className="flex justify-center mb-1">
          <Icon className="w-4 h-4" style={{ color: c.text }} />
        </div>
      )}
      <span className="text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: '#4b7a5e' }}>{label}</span>
      <span className="text-3xl font-black block tracking-tight my-2" style={{ color: '#052e16' }}>{displayValue}</span>
      <span className="inline-block text-[10px] px-3 py-1 rounded-full font-bold uppercase"
        style={{ background: c.pill, color: c.text }}>
        {statusText}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [ph, setPh] = useState(6.0);
  const [ec, setEc] = useState(2.0);
  const [temp, setTemp] = useState(21.5);
  const [humidity] = useState(65);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleReset = () => {
    setIsRefreshing(true);
    setTimeout(() => { setPh(6.0); setEc(2.0); setIsRefreshing(false); }, 800);
  };

  const getPhStatus = () => {
    if (ph < 5.5) return { status: 'warning', text: 'pH too acidic. Fe & Mn toxicity potential. Target: 5.8–6.2.' };
    if (ph > 6.5) return { status: 'warning', text: 'pH too alkaline. Phosphate & Micronutrient lockout. Target: 5.8–6.2.' };
    return { status: 'optimal', text: 'pH Optimal. Maximum nutrient bioavailability.' };
  };
  const getEcStatus = () => {
    if (ec < 1.4) return { status: 'warning', text: 'EC too low. Underfeeding vine/leafy crops. Target: 1.6–2.2.' };
    if (ec > 2.6) return { status: 'danger', text: 'EC too high! Nutrient burn & root tip damage risks. Flush lines.' };
    return { status: 'optimal', text: 'EC Optimal. Perfect salt/water ratio.' };
  };

  const phState = getPhStatus();
  const ecState = getEcStatus();

  const alertColor = (s) => ({
    optimal: { bg: 'rgba(22,163,74,0.06)',  border: 'rgba(22,163,74,0.2)',  icon: '#16a34a', text: '#4b7a5e' },
    warning: { bg: 'rgba(234,179,8,0.06)',  border: 'rgba(234,179,8,0.2)',  icon: '#b45309', text: '#78350f' },
    danger:  { bg: 'rgba(220,38,38,0.06)',  border: 'rgba(220,38,38,0.2)', icon: '#dc2626', text: '#7f1d1d' },
  }[s] || { bg: 'rgba(22,163,74,0.06)', border: 'rgba(22,163,74,0.2)', icon: '#16a34a', text: '#4b7a5e' });

  return (
    <section id="dashboard" className="py-24 relative overflow-hidden" style={{ background: '#f0fdf4' }}>
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96" style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
        }} />
        <div className="absolute bottom-0 left-0 w-72 h-72" style={{
          background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
            style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.25)' }}
          >
            <Activity className="w-4 h-4 animate-pulse" />
            Interactive Smart Systems
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: '#052e16' }}
          >
            Hydroponic System{' '}
            <span style={{
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Simulator</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: '#4b7a5e' }}
            className="leading-relaxed"
          >
            I develop and manage precise nutrient dosing configurations. Interact with this simulation panel to see how pH levels and EC concentrations affect plant growth indicators in real time.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 rounded-3xl p-8 flex flex-col justify-between shadow-lg"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(22,163,74,0.18)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="space-y-8">
              <div className="flex justify-between items-center pb-4"
                style={{ borderBottom: '1px solid rgba(22,163,74,0.12)' }}>
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5" style={{ color: '#16a34a' }} />
                  <h3 className="font-bold" style={{ color: '#052e16' }}>Nutrient Dosing Controls</h3>
                </div>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg transition-colors hover:bg-green-50"
                  style={{ color: '#16a34a' }}
                  title="Reset System"
                >
                  <RotateCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <SliderControl label="Nutrient Solution pH" value={ph} min={4.5} max={8.0} step={0.1} onChange={setPh} />
              <SliderControl label="EC (mS/cm – Concentration)" value={ec} min={0.5} max={3.5} step={0.1} onChange={setEc} unit=" mS" />
              <SliderControl label="Water Temp (°C)" value={temp} min={15} max={30} step={0.5} onChange={setTemp} unit="°C" />
            </div>
            <div className="mt-8 pt-4 flex items-center gap-2 text-xs"
              style={{ borderTop: '1px solid rgba(22,163,74,0.1)', color: '#4b7a5e' }}>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Simulator online · {time}
            </div>
          </motion.div>

          {/* Monitor Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 rounded-3xl p-8 flex flex-col justify-between shadow-lg"
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(22,163,74,0.18)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex flex-wrap justify-between items-center gap-4 pb-6"
              style={{ borderBottom: '1px solid rgba(22,163,74,0.12)' }}>
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#052e16' }}>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  Live Crop Monitoring Node #041
                </h3>
                <span className="text-xs" style={{ color: '#4b7a5e' }}>Polyhouse Sector B, Vine Crop Area</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.25)' }}>
                NFT ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-8">
              <GaugeCard label="Solution pH" displayValue={ph.toFixed(1)} status={phState.status} statusText={phState.status} />
              <GaugeCard label="EC Level" displayValue={`${ec.toFixed(1)} mS`} status={ecState.status} statusText={ecState.status} />
              <GaugeCard label="Water Temp" displayValue={`${temp.toFixed(1)}°C`} icon={Thermometer}
                status={temp >= 18 && temp <= 23 ? 'optimal' : 'warning'}
                statusText={temp >= 18 && temp <= 23 ? 'Optimal' : 'Sub-opt'} />
              <GaugeCard label="Air Humidity" displayValue={`${humidity}%`} icon={Droplet} status="optimal" statusText="Normal" />
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-bold" style={{ color: '#4b7a5e' }}>
                Agronomist System Diagnostics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'pH Nutrient Solute Status', state: phState },
                  { title: 'EC Salt/Nutrient Load', state: ecState },
                ].map(({ title, state }, i) => {
                  const c = alertColor(state.status);
                  return (
                    <div key={i} className="p-4 rounded-xl flex gap-3 items-start transition-all duration-300"
                      style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                      {state.status === 'optimal'
                        ? <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: c.icon }} />
                        : <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: c.icon }} />}
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#052e16' }}>{title}</div>
                        <p className="text-xs leading-relaxed" style={{ color: c.text }}>{state.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
