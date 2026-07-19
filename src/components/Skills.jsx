import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Truck, BarChart4, Cpu, Droplet, Warehouse, ShieldAlert, BarChart3, Palette, Compass } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Precision Hydroponics & CEA',
      icon: Leaf,
      description: 'Controlled Environment Agriculture systems design, crop cycle tracking, and climate regulation.',
      color: '#16a34a',
      lightBg: 'rgba(22,163,74,0.08)',
      lightBorder: 'rgba(22,163,74,0.2)',
      skills: [
        { name: 'Hydroponic & Greenhouse Management', icon: Leaf },
        { name: 'Nutrient Formulation & Dosing', icon: Droplet },
        { name: 'Pest & Disease Control in CEA', icon: ShieldAlert },
        { name: 'Automation & Sensor Integration', icon: Cpu },
      ]
    },
    {
      title: 'Supply Chain & Operations',
      icon: Truck,
      description: 'Streamlining farm production directly to high-capacity consumer hubs and distribution points.',
      color: '#22c55e',
      lightBg: 'rgba(34,197,94,0.08)',
      lightBorder: 'rgba(34,197,94,0.2)',
      skills: [
        { name: 'FMCG Supply Chain Logistics', icon: Truck },
        { name: 'Inventory & Distribution Planning', icon: BarChart3 },
        { name: 'Warehousing & Cold Chain Systems', icon: Warehouse },
      ]
    },
    {
      title: 'Sustainable Growth & Design',
      icon: BarChart4,
      description: 'Leveraging data models to maximize efficiency, scale resource conservation, and design layouts.',
      color: '#15803d',
      lightBg: 'rgba(21,128,61,0.08)',
      lightBorder: 'rgba(21,128,61,0.2)',
      skills: [
        { name: 'Sustainable Resource Optimization', icon: Compass },
        { name: 'Data Analysis & Yield Uplifts', icon: BarChart4 },
        { name: 'Landscaping & Canopy Design', icon: Palette },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Decorative soft blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 left-0 w-96 h-96" style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
        }} />
        <div className="absolute bottom-0 right-0 w-80 h-80" style={{
          background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
        }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'radial-gradient(circle, rgba(22,163,74,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
            style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.25)' }}
          >
            <Leaf className="w-4 h-4" />
            Core Competencies
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: '#052e16' }}
          >
            Skills &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Expertise</span>
          </motion.h2>
          <p className="leading-relaxed" style={{ color: '#4b7a5e' }}>
            A comprehensive blend of technical crop science, digital operations, and logistics coordination.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => {
            const CatIcon = cat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="rounded-3xl p-8 flex flex-col shimmer-card group transition-all duration-300 hover:-translate-y-2 shadow-md"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(22,163,74,0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${cat.color}55`;
                  e.currentTarget.style.boxShadow = '0 16px 50px rgba(34,197,94,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(22,163,74,0.15)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: cat.lightBg,
                      border: `1px solid ${cat.lightBorder}`,
                      boxShadow: `0 0 20px ${cat.color}18`,
                    }}
                  >
                    <CatIcon className="w-7 h-7" style={{ color: cat.color }} />
                  </div>
                  <h3 className="text-xl font-black leading-tight" style={{ color: '#052e16' }}>{cat.title}</h3>
                </div>

                <p className="text-sm leading-relaxed mb-8" style={{ color: '#4b7a5e' }}>
                  {cat.description}
                </p>

                <div className="space-y-3 mt-auto">
                  {cat.skills.map((skill, sIdx) => {
                    const SkillIcon = skill.icon;
                    return (
                      <div
                        key={sIdx}
                        className="flex items-center gap-3.5 p-3.5 rounded-xl transition-all duration-200"
                        style={{
                          background: 'rgba(22,163,74,0.04)',
                          border: '1px solid rgba(22,163,74,0.1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = cat.lightBg;
                          e.currentTarget.style.borderColor = cat.lightBorder;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(22,163,74,0.04)';
                          e.currentTarget.style.borderColor = 'rgba(22,163,74,0.1)';
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: cat.lightBg }}
                        >
                          <SkillIcon className="w-4 h-4" style={{ color: cat.color }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#15803d' }}>{skill.name}</span>
                        <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: cat.color, opacity: 0.5 }} />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
