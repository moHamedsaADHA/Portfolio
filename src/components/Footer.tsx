import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';


const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Feedbacks', href: '#feedbacks' },
  { name: 'Contact', href: '#contact' },
  { name: 'Certifications', href: '#certifications' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div 
              className="cursor-pointer inline-block"
              onClick={scrollToTop}
            >
              <h3 className="text-2xl font-bold gradient-text">mohammed Saad</h3>
              <p className="text-sm text-muted-foreground">Full-Stack Developer & UI/UX Designer</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building modern, scalable web applications with passion and precision. 
              Let's create something amazing together.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:shadow-accent-glow transition-all duration-300"
                asChild
              >
                <a href="mailto:mohamed.saad2827822772@gmail.com" aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:shadow-accent-glow transition-all duration-300"
                asChild
              >
                <a href="https://www.linkedin.com/in/mohamed-saad-b33767320/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:shadow-accent-glow transition-all duration-300"
                asChild
              >
                <a href="https://github.com/moHamedsaADHA" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold gradient-text">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-0.6 gap-y-2">
              <ul className="space-y-2">
                {quickLinks.slice(0, 4).map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      style={{ background: 'none', border: 'none', padding: 0, margin: 0, fontWeight: 500, cursor: 'pointer' }}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {quickLinks.slice(4, 8).map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      style={{ background: 'none', border: 'none', padding: 0, margin: 0, fontWeight: 500, cursor: 'pointer' }}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold gradient-text">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Full-Stack Web Development</li>
              <li>UI/UX Design</li>
              <li>RESTful APIs</li>
              <li>Database Design</li>
              <li>Project Management</li>
              <li>Technical Consulting</li>
            </ul>
          </motion.div>

        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="my-8 h-px bg-gradient-cosmic"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-2"
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            © 2024 mohammed Saad.
            </p>
          <p className="text-xs text-muted-foreground">
            All rights reserved. Designed and developed with modern web technologies.
          </p>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </footer>
  );
}