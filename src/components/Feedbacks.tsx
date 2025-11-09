import React, { useEffect, useRef } from 'react';
import styles from './Feedbacks.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NUM_FEEDBACKS = 16;

export const Feedbacks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // decorative sphere on the left (will be animated) and images row
  const sphereRef = useRef<SVGGElement | null>(null);
  const imagesRowRef = useRef<HTMLDivElement | null>(null);

  // Resolve available feedback assets (prefer PNG, fallback to SVG).
  // Use Vite's import.meta.glob so missing files don't break the build.
  const modules = import.meta.glob('../assets/feedback*.{png,svg}', { eager: true, as: 'url' }) as Record<string, string>;
  const images = Array.from({ length: NUM_FEEDBACKS }, (_, i) => {
    const pngKey = `../assets/feedback${i + 1}.png`;
    const svgKey = `../assets/feedback${i + 1}.svg`;
    if (modules[pngKey]) return modules[pngKey];
    if (modules[svgKey]) return modules[svgKey];
    // tiny transparent fallback
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGD4DwABBAEAf+z3WwAAAABJRU5ErkJggg==';
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Clean up any existing ScrollTriggers for hot-reload safety
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const CONFIG = {
      quickToDuration: 1.8,
      pinMultiplier: 1.2,
      ease: 'power3.out',
    };

    const ctx = gsap.context(() => {
      const totalX = -100 * (NUM_FEEDBACKS - 1);
      const movement = Math.min(window.innerHeight * 0.45, 700);
      const SPHERE_FACTOR = 0.32;
      const sphereMovement = movement * SPHERE_FACTOR;

      const toX = imagesRowRef.current
        ? (gsap as any).quickTo(imagesRowRef.current, 'xPercent', { duration: CONFIG.quickToDuration, ease: CONFIG.ease })
        : null;
      const toY = sphereRef.current
        ? (gsap as any).quickTo(sphereRef.current, 'y', { duration: CONFIG.quickToDuration, ease: CONFIG.ease })
        : null;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${Math.max(window.innerHeight * CONFIG.pinMultiplier, 1000)}`,
        pin: true,
        anticipatePin: 1,
        scrub: false,
        onUpdate(self) {
          const p = self.progress; // 0..1

          // target positions
          const targetX = totalX * p;
          const targetY = -sphereMovement + p * (sphereMovement * 2);

          if (toX) toX(targetX);
          if (toY) toY(targetY);
        },
      });

      // Accessibility: ensure imagesRow has transform will-change for smoothness
      if (imagesRowRef.current) imagesRowRef.current.style.willChange = 'transform';
      if (sphereRef.current) (sphereRef.current as any).style.willChange = 'transform';
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="feedbacks" className={styles.section} ref={containerRef} aria-label="Feedbacks">
      <div className={styles.inner}>
        <div className={styles.left}>
          {/* Decorative sphere (replaces the previous windmill/arrow) */}
          <svg
            viewBox="0 0 200 200"
            className={styles.windmill}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <radialGradient id="ballGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#fce7ff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#7dd3fc" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
              </radialGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g ref={sphereRef} filter="url(#softGlow)">
              <circle cx="100" cy="100" r="56" fill="url(#ballGrad)" />
              <circle cx="86" cy="86" r="18" fill="rgba(255,255,255,0.6)" opacity="0.9" />
            </g>
          </svg>
        </div>

        <div className={styles.right}>
          <div className={styles.sliderViewport}>
            <div className={styles.imagesRow} ref={imagesRowRef}>
              {images.map((src, idx) => (
                <div key={src || idx} className={styles.slide}>
                  <img src={src} alt={`Feedback ${idx + 1}`} className={styles.feedbackImage} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedbacks;
