import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

interface BackToTopArrowProps {
  showAfterSelector?: string; // CSS selector for the element after which the arrow appears (default: '#services')
  targetSelector?: string | null; // CSS selector to scroll to. If null, scrolls to page top.
  rightOffset?: number | string; // distance from right edge (px or CSS string)
  size?: number; // diameter in px
  ariaLabel?: string;
  floatAmplitude?: number; // px for subtle vertical float
  floatDuration?: number; // seconds for float cycle
  className?: string;
}

/**
 * BackToTopArrow
 * - Appears after the user scrolls past the `showAfterSelector` element.
 * - Fixed to the right center of the viewport. Slides in from the right when shown.
 * - Gentle floating micro-animation and hover feedback.
 * - Fully configurable and reusable.
 *
 * Note: This component uses IntersectionObserver to detect when the page
 * has scrolled past the provided element. It does not modify any existing
 * layout or components.
 */
export default function BackToTopArrow({
  showAfterSelector = '#services',
  targetSelector = null,
  rightOffset = '18px',
  size = 52,
  ariaLabel = 'Back to top',
  floatAmplitude = 6,
  floatDuration = 3,
  className,
}: BackToTopArrowProps) {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { actualTheme } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = document.querySelector(showAfterSelector);
    if (!el) {
      // If target element not found, default to show after 600px scroll
      const onScroll = () => {
        setVisible(window.scrollY > 600);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Show when user has scrolled past the element (element no longer intersecting
        // and it is above the viewport top)
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { root: null, threshold: 0 }
    );

    obs.observe(el);
    observerRef.current = obs;

    return () => {
      try {
        observerRef.current?.disconnect();
      } catch (e) {
        /* ignore */
      }
    };
  }, [showAfterSelector]);

  const handleClick = () => {
    if (targetSelector) {
      const target = document.querySelector(targetSelector);
      if (target && 'scrollIntoView' in target) {
        (target as Element).scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    // fallback: scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    right: typeof rightOffset === 'number' ? `${rightOffset}px` : rightOffset,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 60,
  };

  const buttonStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: size / 2,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 20px rgba(3, 7, 18, 0.45)',
    background: 'linear-gradient(180deg, rgba(43, 199, 226, 0.68), rgba(45,212,191,0.06))',
    backdropFilter: 'blur(6px)',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.04)',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="back-to-top"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          style={containerStyle}
          className={className}
        >
          <motion.button
            onClick={handleClick}
            aria-label={ariaLabel}
            title={ariaLabel}
            style={buttonStyle}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            // floating micro animation
            animate={{ y: [0, -floatAmplitude, 0] }}
            transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Minimal arrow SVG (up) - color adapts to theme */}
            <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5l-7 7h4v7h6v-7h4l-7-7z" fill={actualTheme === 'light' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'} />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
