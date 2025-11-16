import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * RevealOnScroll
 * ----------------
 * Lightweight, non-invasive wrapper that reveals its child when it
 * enters the viewport. It intentionally does not change the child's
 * internal animations or styles — instead it optionally defers mounting
 * until the child becomes visible and applies a subtle fade+slide to the
 * wrapper so the child's mount-time animations (if any) trigger naturally.
 *
 * Key features:
 * - Uses IntersectionObserver for reliable, performant visibility detection.
 * - Optional `mountOnEnter` (default `true`) to delay mounting until revealed.
 * - `index` + `stagger` props make cascading reveals trivial when mapping lists.
 * - Supports reverse-scroll: when the wrapper leaves the viewport (and
 *   `once` is false) it will animate back to the hidden state. Parent
 *   components can use `onHide` to run their own reverse animations.
 * - Props: `delay`, `index`, `stagger`, `once`, `threshold`, `rootMargin`,
 *   `className`, `style`, `mountOnEnter`.
 *
 * Usage examples:
 *
 * 1) Wrap a single box (default behavior):
 *
 *    <RevealOnScroll>
 *      <CertificationBox />
 *    </RevealOnScroll>
 *
 * 2) Cascade a list of boxes (common pattern):
 *
 *    {items.map((item, i) => (
 *      <RevealOnScroll key={item.id} index={i} stagger={0.06} mountOnEnter once>
 *        <CertBox data={item} />
 *      </RevealOnScroll>
 *    ))}
 *
 * 3) Tune behavior for earlier reveal and a base delay:
 *
 *    <RevealOnScroll delay={0.12} threshold={0.12} rootMargin="0px 0px -8% 0px">
 *      <Box />
 *    </RevealOnScroll>
 */

interface RevealOnScrollProps {
  children: React.ReactNode;
  rootMargin?: string; // IntersectionObserver rootMargin
  threshold?: number | number[];
  once?: boolean; // if true, reveal only once
  delay?: number; // animation delay in seconds (base delay)
  className?: string;
  style?: React.CSSProperties;
  mountOnEnter?: boolean; // if true, child is mounted only when revealed
  // index and stagger allow easy cascading when wrapping a list of boxes.
  // Example: boxes.map((b, i) => <RevealOnScroll index={i} stagger={0.06}>{b}</RevealOnScroll>)
  index?: number;
  stagger?: number; // seconds added per index
  animateOpacity?: boolean; // if false, wrapper will only animate translateY (preserve child's opacity)
  onReveal?: () => void; // optional callback called when the element becomes visible
  onHide?: () => void; // optional callback called when the element leaves the viewport
}

/**
 * RevealOnScroll
 * - Wrap each timeline / box component with this wrapper.
 * - It uses IntersectionObserver to detect when the wrapper enters the viewport,
 *   then (optionally) mounts the child and animates a subtle fade/slide.
 * - IMPORTANT: this wrapper does NOT modify or duplicate any internal
 *   animations that live inside the child component; instead it defers the
 *   child's mount until it becomes visible (so the child's mount-time
 *   animations will naturally trigger when revealed).
 */
export default function RevealOnScroll({
  children,
  rootMargin = '-10% 0px -10% 0px',
  threshold = 0.15,
  once = true,
  delay = 0,
  className,
  style,
  mountOnEnter = true,
  index,
  stagger = 0.06,
  animateOpacity = true,
  onReveal,
  onHide,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(!mountOnEnter); // if not mounting on enter, already mounted

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (mountOnEnter) {
              setMounted(true);
              // Call onReveal after the child mounts so mount-time animations run.
              // Use setTimeout 0 to run on next tick after React mounts the child.
              if (onReveal) setTimeout(() => onReveal(), 0);
            } else {
              if (onReveal) onReveal();
            }
            if (once && observer) {
              observer.unobserve(entry.target);
            }
          } else {
            // Element left viewport
            if (!once) {
              setVisible(false);
              if (onHide) onHide();
            }
          }
        });
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    observer.observe(el);

    return () => {
      try {
        observer.disconnect();
      } catch (err) {
        // ignore
      }
    };
  }, [rootMargin, threshold, once, mountOnEnter, onReveal, onHide]);


  const variants = animateOpacity
    ? { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
    : { hidden: { y: 16 }, visible: { y: 0 } };

  // Compute effective delay: base delay + (index * stagger) when index is provided
  const effectiveDelay = delay + (typeof index === 'number' ? index * stagger : 0);

  return (
    <div ref={ref} className={className} style={style}>
      {mounted ? (
        <motion.div
          initial="hidden"
          animate={visible ? 'visible' : 'hidden'}
          variants={variants}
          transition={{ duration: 0.8, ease: 'easeOut', delay: effectiveDelay }}
          style={{ willChange: animateOpacity ? 'opacity, transform' : 'transform' }}
        >
          {children}
        </motion.div>
      ) : null}
    </div>
  );
}
