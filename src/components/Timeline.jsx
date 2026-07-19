import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

const experiences = [
  {
    role: 'Senior Agronomist and Market Linkage Manager',
    company: 'Farmcult Agri-tech Pvt. Ltd',
    period: 'April 2025 – Present',
    location: 'Delhi NCR, India',
    current: true,
    highlights: [
      'Managed commercial-scale hydroponic farming operations including crop planning, nutrient recipe management, irrigation schedules, and climate systems using NFT, DWC, Dutch Bucket, and Cocopeat systems.',
      'Experienced in precision fertigation management, EC/pH monitoring, and worked under Greenhouse/NVPH Polyhouse conditions for premium high-value crops (Seedless Cucumber, Bell Peppers, Tomatoes, Lettuce, Coriander).',
      'Evaluated crop quality parameters including size, firmness, marketability, and disease resistance, ensuring full safety standard compliance during harvesting and post-harvest.',
    ],
  },
  {
    role: 'Agronomist (Farm Executive) – Hydroponic & FMCG Supply Chain',
    company: 'Hyper Pure by Zomato',
    period: 'Jan 2024 – Mar 2025',
    location: 'Delhi NCR, India',
    current: false,
    highlights: [
      'Monitored nutrient solutions and adjusted formulations to maximize yields of controlled environment hydroponic farms.',
      `Collaborated with Zomato's logistics & supply chain teams to align daily farm production schedules with warehouse distribution demands.`,
      'Managed packaging, grading, and labeling for direct dispatch to distribution hubs and high-profile B2B clients, minimizing food wastage.',
      'Conducted crop management for open-field segments: Broccoli, Strawberries, Squash, Radish, Beetroot, and Tomatoes.',
    ],
  },
  {
    role: 'Agri-Business & Agronomist Associate',
    company: 'Agri Plast Protected Cultivation',
    period: 'Aug 2021 – Jan 2024',
    location: 'Delhi NCR, India',
    current: false,
    highlights: [
      'Managed key grower and client relationships, offering agronomical consultation to farmers optimizing modern polyhouse structures.',
      'Coordinated internal technical support, field distributors, and sales teams to facilitate smooth design deployments.',
      'Organized grower workshops, educational farm demos, and field marketing campaigns promoting protected cultivation technologies.',
    ],
  },
];

export default function Timeline() {
  return (
    <section
      id="experience"
      className="py-14 relative overflow-hidden"
      style={{ background: '#f8fffe' }}
    >
      {/* Subtle background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-16 -right-16 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 -left-10 w-64 h-64 rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)' }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(22,163,74,0.12) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
            style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.25)' }}
          >
            <Briefcase className="w-4 h-4" />
            Career Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: '#052e16' }}
          >
            Professional{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Experience
            </span>
          </motion.h2>
          <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: '#4b7a5e' }}>
            Bridging agronomic science and modern commerce to create high-performing agricultural value chains.
          </p>
        </div>

        {/* ── Alternating Timeline ── */}
        <div className="relative">

          {/* Center vertical line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 hidden md:block"
            style={{
              width: 2,
              background: 'linear-gradient(to bottom, transparent, #22c55e 8%, #4ade80 50%, #22c55e 92%, transparent)',
              borderRadius: 2,
            }}
          />

          <div className="space-y-16">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0; // even → card on LEFT, odd → card on RIGHT

              return (
                <div key={idx} className="relative flex items-center justify-center">

                  {/* ── Center Orb ── */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex w-10 h-10 rounded-full items-center justify-center flex-shrink-0"
                    style={{
                      background: exp.current
                        ? 'linear-gradient(135deg, #16a34a, #22c55e)'
                        : '#ffffff',
                      border: '2.5px solid #22c55e',
                      boxShadow: exp.current
                        ? '0 0 0 6px rgba(34,197,94,0.15), 0 0 25px rgba(34,197,94,0.4)'
                        : '0 0 0 6px rgba(34,197,94,0.08), 0 0 15px rgba(34,197,94,0.15)',
                    }}
                  >
                    <Briefcase
                      className="w-4 h-4"
                      style={{ color: exp.current ? '#ffffff' : '#16a34a' }}
                    />
                  </div>

                  {/* ── Two-column layout ── */}
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

                    {/* Left slot */}
                    <div className={`${isLeft ? 'hidden md:flex md:justify-end' : 'hidden md:block'}`}>
                      {isLeft ? (
                        // Card slides from LEFT
                        <motion.div
                          initial={{ opacity: 0, x: -60 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full max-w-lg"
                        >
                          <ExperienceCard exp={exp} />
                        </motion.div>
                      ) : (
                        // Empty right slot: show company/date label aligned right
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-end justify-center text-right pr-4 h-full"
                        >
                          <span className="text-sm font-bold" style={{ color: '#16a34a' }}>{exp.company}</span>
                          <span className="flex items-center justify-end gap-1 mt-1 text-xs font-medium" style={{ color: '#4b7a5e' }}>
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Right slot */}
                    <div className={`${!isLeft ? 'hidden md:flex md:justify-start' : 'hidden md:block'}`}>
                      {!isLeft ? (
                        // Card slides from RIGHT
                        <motion.div
                          initial={{ opacity: 0, x: 60 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full max-w-lg"
                        >
                          <ExperienceCard exp={exp} />
                        </motion.div>
                      ) : (
                        // Empty left slot: show company/date label aligned left
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-start justify-center text-left pl-4 h-full"
                        >
                          <span className="text-sm font-bold" style={{ color: '#16a34a' }}>{exp.company}</span>
                          <span className="flex items-center gap-1 mt-1 text-xs font-medium" style={{ color: '#4b7a5e' }}>
                            <Calendar className="w-3 h-3" />
                            {exp.period}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Mobile: full-width card with slide-up */}
                    <motion.div
                      className="md:hidden col-span-1"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ExperienceCard exp={exp} />
                    </motion.div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable experience card ─────────────────────────────── */
function ExperienceCard({ exp }) {
  return (
    <div
      className="rounded-3xl p-6 md:p-8 transition-all duration-300 group hover:-translate-y-1 shimmer-card cursor-default"
      style={{
        background: 'rgba(255,255,255,0.95)',
        border: '1px solid rgba(22,163,74,0.15)',
        boxShadow: '0 4px 20px rgba(34,197,94,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)';
        e.currentTarget.style.boxShadow = '0 16px 50px rgba(34,197,94,0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(22,163,74,0.15)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(34,197,94,0.06)';
      }}
    >
      {/* Company + Current badge */}
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-sm font-bold" style={{ color: '#16a34a' }}>
          {exp.company}
        </span>
        {exp.current && (
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
            style={{ background: 'rgba(34,197,94,0.12)', color: '#16a34a', border: '1px solid rgba(34,197,94,0.25)' }}
          >
            ● Current
          </span>
        )}
      </div>

      {/* Role + Location */}
      <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
        <h3
          className="text-lg font-black leading-snug group-hover:text-green-700 transition-colors"
          style={{ color: '#052e16' }}
        >
          {exp.role}
        </h3>
        <span className="flex items-center gap-1 text-xs font-semibold flex-shrink-0" style={{ color: '#4b7a5e' }}>
          <MapPin className="w-3.5 h-3.5" />
          {exp.location}
        </span>
      </div>

      {/* Period */}
      <div className="flex items-center gap-1.5 text-xs font-medium mb-4" style={{ color: '#4b7a5e' }}>
        <Calendar className="w-3.5 h-3.5" />
        {exp.period}
      </div>

      {/* Divider */}
      <div className="mb-4" style={{ borderTop: '1px solid rgba(22,163,74,0.1)' }} />

      {/* Highlights */}
      <ul className="space-y-3">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: '#4b7a5e' }}>
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#22c55e' }} />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
