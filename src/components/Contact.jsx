import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2"
    fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const contactItems = [
  {
    icon: Mail, label: 'Email Address', value: 'amanchandra292@gmail.com',
    href: 'mailto:amanchandra292@gmail.com', color: '#16a34a',
  },
  {
    icon: Phone, label: 'Phone Connection', value: '+91 8171759866',
    href: 'tel:+918171759866', color: '#22c55e',
  },
  {
    icon: MapPin, label: 'Location Base', value: 'Delhi, India',
    href: null, color: '#15803d',
  },
  {
    icon: LinkedinIcon, label: 'Professional Network', value: 'linkedin.com/in/amanchandra',
    href: 'https://www.linkedin.com/in/amanchandra', color: '#16a34a',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }, 1200);
  };

  const inputStyle = (name) => ({
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    background: focused === name ? '#ffffff' : '#f8fffe',
    border: `1.5px solid ${focused === name ? 'rgba(22,163,74,0.6)' : 'rgba(22,163,74,0.2)'}`,
    color: '#052e16',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
    boxShadow: focused === name ? '0 0 0 3px rgba(22,163,74,0.1)' : 'none',
    fontFamily: 'inherit',
  });

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: '#f0fdf4' }}>
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2" style={{
          background: 'radial-gradient(ellipse, rgba(34,197,94,0.07) 0%, transparent 65%)',
        }} />
        <div className="absolute top-0 right-0 w-72 h-72" style={{
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
            <Mail className="w-4 h-4" />
            Let's Connect
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black mb-4"
            style={{ color: '#052e16' }}
          >
            Get In{' '}
            <span style={{
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Touch</span>
          </motion.h2>
          <p className="leading-relaxed" style={{ color: '#4b7a5e' }}>
            Let's discuss commercial setup consultancy, hydroponics optimization, or market linkage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">

          {/* Contact Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl p-8 flex flex-col justify-between shadow-lg"
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(22,163,74,0.18)',
            }}
          >
            <div className="space-y-7">
              <div>
                <h3 className="text-2xl font-black mb-2" style={{ color: '#052e16' }}>Contact Information</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4b7a5e' }}>
                  Feel free to reach out via phone, email, or LinkedIn. I am open to consultancy engagements, speaking opportunities, and leadership roles in protected cultivation.
                </p>
              </div>

              <div className="space-y-2">
                {contactItems.map((item, i) => {
                  const Icon = item.icon;
                  const Tag = item.href ? 'a' : 'div';
                  return (
                    <Tag
                      key={i}
                      {...(item.href ? {
                        href: item.href,
                        target: item.href.startsWith('http') ? '_blank' : undefined,
                        rel: 'noopener noreferrer',
                      } : {})}
                      className="flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-200 group"
                      style={{ border: '1px solid transparent' }}
                      onMouseEnter={item.href ? (e) => {
                        e.currentTarget.style.background = 'rgba(22,163,74,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(22,163,74,0.2)';
                      } : undefined}
                      onMouseLeave={item.href ? (e) => {
                        e.currentTarget.style.background = '';
                        e.currentTarget.style.borderColor = 'transparent';
                      } : undefined}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                        style={{
                          background: `${item.color}12`,
                          border: `1px solid ${item.color}30`,
                        }}
                      >
                        <Icon style={{ color: item.color, width: 18, height: 18 }} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#4b7a5e' }}>
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold transition-colors" style={{ color: '#15803d' }}>
                          {item.value}
                        </span>
                      </div>
                    </Tag>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 pt-5 text-xs" style={{ borderTop: '1px solid rgba(22,163,74,0.12)', color: '#4b7a5e' }}>
              © {new Date().getFullYear()} Aman Chandra · Designed with green smart farming aesthetics.
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl p-8 shadow-lg"
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(22,163,74,0.18)',
            }}
          >
            <h3 className="text-2xl font-black mb-7" style={{ color: '#052e16' }}>Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4b7a5e' }}>
                    Your Name
                  </label>
                  <input
                    type="text" id="name" required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    placeholder="Enter your name"
                    style={inputStyle('name')}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4b7a5e' }}>
                    Email Address
                  </label>
                  <input
                    type="email" id="email" required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="name@domain.com"
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4b7a5e' }}>
                  Message Details
                </label>
                <textarea
                  id="message" required rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  placeholder="How can I assist you?"
                  style={{ ...inputStyle('message'), resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading || sent}
                className="w-full py-4 rounded-xl font-black text-white flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 cursor-pointer relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
                onMouseEnter={(e) => { if (!loading && !sent) e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,197,94,0.4)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ''; }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : sent ? (
                    <><Check className="w-5 h-5" /> Message Sent!</>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Send Message
                    </>
                  )}
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #22c55e, #4ade80)' }} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
