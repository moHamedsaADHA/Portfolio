import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#certifications' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Use IntersectionObserver centered on the viewport to pick the section
    // that occupies the center region. Fall back to midpoint-distance method
    // if IntersectionObserver isn't available.
    const sectionIds = navItems.map((item) => item.href.substring(1));

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          // mark as scrolled if we've moved down at all
          setScrolled(window.scrollY > 50);

          // Pick the visible entry with the largest intersectionRatio
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length) {
            visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            setActiveSection(visible[0].target.id);
            return;
          }

          // Fallback: pick closest midpoint
          const mid = window.innerHeight / 2;
          let closest: { section: string; distance: number } | null = null;
          for (const id of sectionIds) {
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            const elemMid = (rect.top + rect.bottom) / 2;
            const distance = Math.abs(elemMid - mid);
            if (!closest || distance < closest.distance) closest = { section: id, distance };
          }
          if (closest) setActiveSection(closest.section);
        },
        {
          root: null,
          // focus the central 20% of the viewport (so element centered there gets priority)
          rootMargin: '-40% 0px -40% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      // Observe each section element if present
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      // ensure initial state
      // trigger a small scroll event to let the observer evaluate immediately
      setTimeout(() => observer.takeRecords(), 50);

      return () => observer.disconnect();
    }

    // Final fallback for environments without IntersectionObserver
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const mid = window.innerHeight / 2;
      let closest: { section: string; distance: number } | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const elemMid = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(elemMid - mid);
        if (!closest || distance < closest.distance) closest = { section: id, distance };
      }
      if (closest) setActiveSection(closest.section);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass-card backdrop-blur-xl border-b border-glass-border shadow-card' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <span className="text-2xl font-bold gradient-text">MS</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ y: -2 }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'text-accent'
                    : 'text-foreground hover:text-accent'
                }`}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden glass-card"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-card border-t border-glass-border"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-left px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                      activeSection === item.href.substring(1)
                        ? 'text-accent bg-accent/10'
                        : 'text-foreground hover:text-accent hover:bg-accent/10'
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}