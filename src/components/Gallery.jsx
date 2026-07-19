import React, { useEffect, useRef } from 'react';
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
  { src: pic1, caption: 'Plants Proper Care', tag: 'Farmcult Agri-tech' },
  { src: pic2, caption: 'Polyhouse Operations', tag: 'Protected Cultivation' },
  { src: pic3, caption: 'Crop Inspection', tag: 'Quality Control' },
  { src: pic4, caption: 'Tomato Harvest', tag: 'High-Value Crops' },
  { src: pic5, caption: 'Soil Based Farming', tag: 'Open Field Cultivation' },
  { src: pic6, caption: 'Nutrient Management', tag: 'Fertigation' },
  { src: pic7, caption: 'Bell Pepper Yield', tag: 'Cocopeat System' },
  { src: pic8, caption: 'Farm Operations', tag: 'CEA Facility' },
  { src: pic9, caption: 'Greenhouse Monitoring', tag: 'Smart Agriculture' },
];

// Duplicate photos so each row loops seamlessly (we translate -50%)
const row1 = [...photos.slice(0, 5), ...photos.slice(0, 5)];
const row2 = [...photos.slice(4), ...photos.slice(4)];

/* ── Single photo card ───────────────────────────────────────── */
function PhotoCard({ src, caption, tag }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-2xl overflow-hidden group"
      style={{ width: 280, height: 360, pointerEvents: 'none' }}
    >
      <img
        src={src}
        alt={caption}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        draggable={false}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(5,46,22,0.75) 0%, rgba(5,46,22,0.1) 45%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2"
          style={{ background: 'rgba(34,197,94,0.3)', color: '#86efac', backdropFilter: 'blur(6px)' }}
        >
          {tag}
        </span>
        <p className="text-sm font-bold text-white leading-tight">{caption}</p>
      </div>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: 'inset 0 0 0 1.5px rgba(34,197,94,0.4)' }}
      />
    </div>
  );
}

/* ── Draggable auto-scrolling marquee track ──────────────────── */
function MarqueeTrack({ photos, direction = 'left', pxPerSec = 70 }) {
  const trackRef = useRef(null);
  const posRef = useRef(null);   // null = not yet initialized
  const halfRef = useRef(0);
  const rafRef = useRef(null);
  const isDragging = useRef(false);
  const lastTS = useRef(null);
  const dragStartX = useRef(0);
  const dragStartP = useRef(0);
  const velRef = useRef(0);      // momentum velocity px/frame
  const lastDragX = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait one frame so images have laid out and scrollWidth is accurate
    const init = () => {
      halfRef.current = track.scrollWidth / 2;
      // left → start at 0, right → start at -half so it slides rightward toward 0
      if (posRef.current === null) {
        posRef.current = direction === 'right' ? -halfRef.current : 0;
      }
    };
    requestAnimationFrame(init);

    function loop(ts) {
      const half = halfRef.current;
      if (half === 0) { rafRef.current = requestAnimationFrame(loop); return; }

      if (!isDragging.current) {
        // Apply momentum decay after release
        if (Math.abs(velRef.current) > 0.3) {
          posRef.current += velRef.current;
          velRef.current *= 0.93;           // friction
        } else {
          velRef.current = 0;
          // Normal auto-scroll
          const dt = lastTS.current ? ts - lastTS.current : 16;
          const delta = pxPerSec * (dt / 1000);
          posRef.current += direction === 'left' ? -delta : delta;
        }
      }

      // Wrap around seamlessly
      if (posRef.current <= -half) posRef.current += half;
      if (posRef.current >= 0 && direction === 'right') posRef.current -= half;

      lastTS.current = ts;
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, pxPerSec]);

  /* pointer events for drag */
  const onPointerDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartP.current = posRef.current;
    lastDragX.current = e.clientX;
    velRef.current = 0;
    lastTS.current = null;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - dragStartX.current;
    velRef.current = e.clientX - lastDragX.current;  // track velocity
    lastDragX.current = e.clientX;

    let newPos = dragStartP.current + delta;
    const half = halfRef.current;
    // keep in bounds for wrap
    if (newPos <= -half) newPos += half;
    if (newPos > 0) newPos -= half;
    posRef.current = newPos;
  };

  const onPointerUp = () => {
    isDragging.current = false;
    // velRef already has the last drag velocity for momentum
  };

  return (
    <div
      ref={trackRef}
      className="flex gap-5 cursor-grab active:cursor-grabbing select-none"
      style={{ width: 'max-content', willChange: 'transform' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {photos.map((p, i) => <PhotoCard key={i} {...p} />)}
    </div>
  );
}

/* ── Gallery Section ─────────────────────────────────────────── */
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
        {/* Header */}
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
            A visual journey through commercial hydroponic farms, hands-on crop management, and the
            thriving ecosystems Aman has built from the ground up.{' '}
            <span className="font-semibold" style={{ color: '#16a34a' }}>Drag to explore →</span>
          </motion.p>
        </div>

        {/* Row 1 — scrolls LEFT, faster */}
        <div
          className="overflow-hidden mb-5 touch-pan-y"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)' }}
        >
          <MarqueeTrack photos={row1} direction="left" pxPerSec={55} />
        </div>

        {/* Row 2 — scrolls RIGHT, slightly slower for depth effect */}
        <div
          className="overflow-hidden touch-pan-y"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)' }}
        >
          <MarqueeTrack photos={row2} direction="right" pxPerSec={50} />
        </div>

        {/* Technique tags */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mt-10 px-6"
        >
          {['NFT Systems', 'Cocopeat Media', 'DWC & Dutch Bucket', 'NVPH Polyhouse', 'Precision Fertigation', 'High-Value Crops'].map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full"
              style={{ background: 'rgba(22,163,74,0.08)', color: '#16a34a', border: '1px solid rgba(22,163,74,0.2)' }}
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
