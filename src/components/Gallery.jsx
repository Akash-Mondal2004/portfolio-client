import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Leaf } from 'lucide-react';

import pic1 from '../assets/amanchandrapic1.jpeg';
import pic2 from '../assets/amanchandrapic2.jpeg';
import pic3 from '../assets/amanchandrapic3.jpeg';
import pic4 from '../assets/amanchandrapic4.jpeg';
import pic5 from '../assets/amanchandrapic5.jpeg';
import pic6 from '../assets/amanchandrapic6.jpeg';
import pic7 from '../assets/amanchandrapic7.jpeg';
import pic8 from '../assets/amanchandrapic8.jpeg';
import pic9 from '../assets/amanchandrapic9.jpeg';

const photos = [
  { src: pic1, caption: 'Seedling Management', tag: 'Farmcult Agri-tech' },
  { src: pic2, caption: 'Polyhouse Operations', tag: 'Protected Cultivation' },
  { src: pic3, caption: 'Crop Inspection', tag: 'Quality Control' },
  { src: pic4, caption: 'Tomato Harvest', tag: 'High-Value Crops' },
  { src: pic5, caption: 'Hydroponic Setup', tag: 'NFT System' },
  { src: pic6, caption: 'Nutrient Management', tag: 'Fertigation' },
  { src: pic7, caption: 'Bell Pepper Yield', tag: 'Cocopeat System' },
  { src: pic8, caption: 'Farm Operations', tag: 'CEA Facility' },
  { src: pic9, caption: 'Greenhouse Monitoring', tag: 'Smart Agriculture' },
];

// Split into two rows — row 1: first 5, row 2: last 4 + first 1 for visual balance
const row1 = [...photos.slice(0, 5), ...photos.slice(0, 5)]; // duplicated for seamless loop
const row2 = [...photos.slice(4),    ...photos.slice(4)];    // offset + duplicated

function PhotoCard({ src, caption, tag }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
      style={{ width: 280, height: 360 }}
    >
      {/* Photo */}
      <img
        src={src}
        alt={caption}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        draggable={false}
      />

      {/* Gradient overlay — always subtle, stronger on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(5,46,22,0.75) 0%, rgba(5,46,22,0.1) 45%, transparent 70%)',
        }}
      />

      {/* Bottom caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2"
          style={{ background: 'rgba(34,197,94,0.3)', color: '#86efac', backdropFilter: 'blur(6px)' }}
        >
          {tag}
        </span>
        <p className="text-sm font-bold text-white leading-tight">{caption}</p>
      </div>

      {/* Corner shine on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: 'inset 0 0 0 1.5px rgba(34,197,94,0.4)' }}
      />
    </div>
  );
}

/* ── Marquee row component ─────────────────────────────────── */
function MarqueeRow({ photos, direction = 'left', speed = 40 }) {
  // direction: 'left' = normal, 'right' = reverse
  const animationName = direction === 'left' ? 'marquee-left' : 'marquee-right';

  return (
    <div
      className="flex gap-5 w-max"
      style={{
        animation: `${animationName} ${speed}s linear infinite`,
        willChange: 'transform',
      }}
    >
      {photos.map((photo, i) => (
        <PhotoCard key={i} {...photo} />
      ))}
    </div>
  );
}

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="py-14 relative overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-72" style={{
          background: 'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 70%)',
        }} />
        <div className="absolute bottom-0 right-0 w-80 h-72" style={{
          background: 'radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%)',
        }} />
      </div>

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase mb-4 px-4 py-2 rounded-full"
            style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.25)' }}
          >
            <Camera className="w-4 h-4" />
            Field &amp; Farm Visuals
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: '#052e16' }}
          >
            Life at the{' '}
            <span style={{
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Greenhouse
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base leading-relaxed"
            style={{ color: '#4b7a5e' }}
          >
            A visual journey through commercial hydroponic farms, hands-on crop management, and the thriving ecosystems Aman has built from the ground up.
          </motion.p>
        </div>

        {/* ── Row 1: scrolls LEFT ── */}
        <div
          className="overflow-hidden mb-5"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
          onMouseEnter={(e) => { e.currentTarget.querySelector('.marquee-inner').style.animationPlayState = 'paused'; }}
          onMouseLeave={(e) => { e.currentTarget.querySelector('.marquee-inner').style.animationPlayState = 'running'; }}
        >
          <div
            className="marquee-inner flex gap-5"
            style={{
              animation: `marquee-left 45s linear infinite`,
              willChange: 'transform',
            }}
          >
            {row1.map((photo, i) => <PhotoCard key={i} {...photo} />)}
          </div>
        </div>

        {/* ── Row 2: scrolls RIGHT ── */}
        <div
          className="overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
          onMouseEnter={(e) => { e.currentTarget.querySelector('.marquee-inner-r').style.animationPlayState = 'paused'; }}
          onMouseLeave={(e) => { e.currentTarget.querySelector('.marquee-inner-r').style.animationPlayState = 'running'; }}
        >
          <div
            className="marquee-inner-r flex gap-5"
            style={{
              animation: `marquee-right 50s linear infinite`,
              willChange: 'transform',
            }}
          >
            {row2.map((photo, i) => <PhotoCard key={i} {...photo} />)}
          </div>
        </div>

        {/* ── Leaf badge row ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mt-12 px-6"
        >
          {['NFT Systems', 'Cocopeat Media', 'DWC & Dutch Bucket', 'NVPH Polyhouse', 'Precision Fertigation', 'High-Value Crops'].map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full"
              style={{
                background: 'rgba(22,163,74,0.08)',
                color: '#16a34a',
                border: '1px solid rgba(22,163,74,0.2)',
              }}
            >
              <Leaf className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
