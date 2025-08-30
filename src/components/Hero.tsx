import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import profileImage from '../assets/mohammed-saad-profile.jpg';

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <div className="text-center space-y-8">
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="relative inline-block"
          >
            <div className="cosmic-border rounded-full p-1 animate-pulse-glow">
              <img
                src={profileImage}
                alt="Mohammed Saad"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-background"
              />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-cosmic opacity-50"
              style={{ padding: '2px' }}
            />
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              Mohammed Saad
            </h1>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="secondary" className="glass-card">Full-Stack Developer</Badge>
              <Badge variant="secondary" className="glass-card">UI/UX Designer</Badge>
              <Badge variant="secondary" className="glass-card">Project Management</Badge>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
              With 2+ years freelance experience and 14 completed projects. 
              Let's build modern, scalable web products that make a difference.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-accent-glow transition-all duration-300 group"
            >
              View My Work
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="glass-card border-glass-border hover:shadow-accent-glow transition-all duration-300 group"
            >
              Get In Touch
              <Mail className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-4"
          >
            <Button
              variant="ghost"
              size="icon"
              className="glass-card hover:shadow-accent-glow transition-all duration-300"
              asChild
            >
              <a href="mailto:mohamed.saad2827822772@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="glass-card hover:shadow-accent-glow transition-all duration-300"
              asChild
            >
              <a href="https://www.linkedin.com/in/mohamed-saad-b33767320/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="glass-card hover:shadow-accent-glow transition-all duration-300"
              asChild
            >
              <a href="https://github.com/moHamedsaADHA" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground hover:text-accent transition-colors"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}