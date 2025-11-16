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
  { name: 'Feedbacks', href: '#feedbacks' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // If window isn't available (SSR), bail out early so subsequent
    // references to `window` don't trigger TS18048 ('window' is possibly 'undefined').
    if (typeof window === 'undefined') return;

    // Use IntersectionObserver centered on the viewport to pick the section
    // that occupies the center region. Fall back to midpoint-distance method
    // if IntersectionObserver isn't available.
    const sectionIds = navItems.map((item) => item.href.substring(1));

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          // If the Feedbacks section is pinned or occupying the top area of
          // the viewport (typical when GSAP ScrollTrigger pins the section),
          // force the nav to mark it active until the pinned period ends.
          try {
            const fb = document.getElementById('feedbacks');
            if (fb) {
              const r = fb.getBoundingClientRect();
              // r.top near 0 while pinned; require the bottom to extend past
              // a small portion of the viewport so we don't accidentally lock
              // when it's scrolled past.
              if (r.top <= 2 && r.bottom >= window.innerHeight * 0.25) {
                setActiveSection('feedbacks');
                return;
              }
            }
          } catch (e) {
            // ignore DOM errors in weird environments
          }
          // If we're at the very top of the page and no explicit hash is set,
          // prefer the hero section (Home). This fixes a case where the
          // About section can be reported as the largest intersecting
          // region on load causing the nav to highlight About instead of Home.
          if (typeof window !== 'undefined' && window.scrollY < 80) {
            const hash = window.location.hash;
            if (!hash || hash === '' || hash === '#hero') {
              setActiveSection('hero');
              return;
            }
          }
          // mark as scrolled if we've moved down at all
          if (typeof window !== 'undefined') setScrolled(window.scrollY > 50);

          // Prefer the intersecting entry with the largest intersection area
          // (width * height) to avoid ties when multiple sections intersect.
          const intersecting = entries.filter((e) => e.isIntersecting && e.intersectionRect);
          if (intersecting.length) {
            let best = intersecting[0];
            let bestArea = (best.intersectionRect.width || 0) * (best.intersectionRect.height || 0);
            for (let i = 1; i < intersecting.length; i++) {
              const e = intersecting[i];
              const area = (e.intersectionRect.width || 0) * (e.intersectionRect.height || 0);
              if (area > bestArea) {
                best = e;
                bestArea = area;
              }
            }
            const id = (best.target as HTMLElement).id?.trim();
            if (id && id !== activeSection) setActiveSection(id);
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
          if (closest && closest.section !== activeSection) setActiveSection(closest.section);
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

      // Listen for hash changes (mobile native anchor taps update the hash).
      // When hash changes, smoothly scroll to the new section. This ensures
      // that taps on mobile anchors that update the URL will trigger a smooth
      // scroll even if the browser default jump is suppressed or inconsistent.
      const onHashChange = () => {
        const id = window.location.hash ? window.location.hash.substring(1) : '';
        if (!id) return;
        const el = document.getElementById(id);
        if (el) {
          // Use requestAnimationFrame to avoid layout jank on some mobile browsers
          requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
        }
      };
      window.addEventListener('hashchange', onHashChange);

      return () => {
        observer.disconnect();
        window.removeEventListener('hashchange', onHashChange);
      };
    }

    // Final fallback for environments without IntersectionObserver
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      setScrolled(window.scrollY > 50);

      // If feedbacks is currently pinned (or occupying top area), keep
      // the nav active on it until scrolling past the section.
      try {
        const fb = document.getElementById('feedbacks');
        if (fb) {
          const r = fb.getBoundingClientRect();
          if (r.top <= 2 && r.bottom >= window.innerHeight * 0.25) {
            setActiveSection('feedbacks');
            return;
          }
        }
      } catch (e) {
        // ignore
      }

      // If we're at the very top and there's no explicit hash, ensure
      // the hero section (Home) is selected. This prevents About from
      // showing as active immediately on initial load.
      if (window.scrollY < 80) {
        const hash = window.location.hash;
        if (!hash || hash === '' || hash === '#hero') {
          setActiveSection('hero');
          return;
        }
      }
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
    if (typeof window !== 'undefined') {
      (window as Window).addEventListener('scroll', handleScroll, { passive: true });
      (window as Window).addEventListener('resize', handleScroll);
    }
    return () => {
      if (typeof window !== 'undefined') {
        (window as Window).removeEventListener('scroll', handleScroll);
        (window as Window).removeEventListener('resize', handleScroll);
      }
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
          <div className="hidden md:flex items-center space-x-4">
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
                  // Use native anchor on mobile so taps update the URL/hash and
                  // behave consistently across devices. We still close the mobile
                  // menu on click. Use `motion.a` (which is already an anchor)
                  // — do not pass an `as` prop because Framer Motion's types
                  // don't include it for `motion.a` and it causes a TS2322.
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={(e) => {
                      // Close the mobile menu and programmatically smooth-scroll
                      // to the target section. Prevent the default native jump to
                      // ensure consistent smooth behavior on mobile browsers.
                      e.preventDefault();
                      setIsOpen(false);
                      // Use requestAnimationFrame to avoid layout jank on some devices
                      requestAnimationFrame(() => {
                        scrollToSection(item.href);
                        // update the URL hash for consistency
                        try { window.history.replaceState(undefined, '', item.href); } catch (err) { }
                      });
                    }}
                    className={`block text-left px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                      activeSection === item.href.substring(1)
                        ? 'text-accent bg-accent/10'
                        : 'text-foreground hover:text-accent hover:bg-accent/10'
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}