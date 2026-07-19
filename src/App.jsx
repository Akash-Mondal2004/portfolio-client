import React from 'react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Gallery from './components/Gallery';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen antialiased selection:bg-green-500 selection:text-white overflow-x-hidden" style={{ backgroundColor: '#f8fffe' }}>
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Skills />
        <Gallery />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
