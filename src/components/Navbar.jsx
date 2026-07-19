import React, { useState, useEffect } from 'react';
import { Sprout, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['home', 'dashboard', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'py-3 shadow-lg shadow-green-100/80' : 'py-5'
      }`}
      style={{
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(34,197,94,0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11">
            {/* Glow ring */}
            <span className="absolute inset-0 rounded-xl bg-green-400/20 group-hover:bg-green-400/30 transition-all duration-300 scale-100 group-hover:scale-110" />
            <div className="relative w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>
              <Sprout className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight tracking-wide text-green-950">
              AMAN CHANDRA
            </span>
            <span className="text-xs text-green-500 font-semibold tracking-widest uppercase">
              Senior Agronomist
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`relative text-sm font-medium tracking-wide py-2 transition-colors duration-200 ${
                    activeSection === link.id ? 'text-green-600' : 'text-green-900/70 hover:text-green-700'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span
                      className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                      style={{ background: 'linear-gradient(90deg, #16a34a, #4ade80)' }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="relative px-5 py-2.5 rounded-xl text-sm font-bold text-white overflow-hidden group transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
          >
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #22c55e, #4ade80)' }} />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-300"
              style={{ boxShadow: '0 0 25px rgba(34,197,94,0.5)' }} />
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg transition-colors text-green-900 hover:text-green-600"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full px-6 py-6 flex flex-col gap-5 shadow-2xl"
          style={{
            background: 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(34,197,94,0.2)',
          }}
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-semibold transition-colors ${
                    activeSection === link.id ? 'text-green-600' : 'text-green-900/70'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 rounded-xl text-white text-center font-bold transition-all"
            style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
          >
            Get In Touch
          </a>
        </div>
      )}
    </nav>
  );
}
