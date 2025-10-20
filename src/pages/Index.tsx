import React from 'react';
import { ThemeProvider } from '../hooks/useTheme';
import { ParticleBackground } from '../components/ParticleBackground';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects'; 
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

const Portfolio = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main className="relative z-10">
          <section id="hero">
            <Hero />
          </section>
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
