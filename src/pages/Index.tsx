import React from 'react';
import { ThemeProvider } from '../hooks/useTheme';
// Use the clean InteractiveCursor implementation
import InteractiveCursor from '../components/InteractiveCursorClean';
import { ParticleBackground } from '../components/ParticleBackground';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import Feedbacks from '../components/Feedbacks';
import { Services } from '../components/Services';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import BackToTopArrow from '../components/BackToTopArrow';

const Portfolio = () => {
  return (
    <ThemeProvider>
      {/* Interactive cursor overlay (mounted inside ThemeProvider so it reads theme) */}
      <InteractiveCursor />
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
          <Services />
          <Projects />
          {/* Feedbacks component already renders a section with id="feedbacks" */}
          <Feedbacks />
          <Skills />
          <Contact />
        </main>
        
        {/* Footer */}
        <Footer />
        {/* Back to top arrow (appears after Services) */}
        <BackToTopArrow showAfterSelector="#services" targetSelector="#hero" />
      </div>
    </ThemeProvider>
  );
};

export default Portfolio;
