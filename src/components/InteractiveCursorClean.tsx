import React, { useEffect, useRef } from 'react';
import styles from './InteractiveCursor.module.css';
import { useTheme } from '../hooks/useTheme';

type Props = {
  enabled?: boolean;
  particleCount?: number;
};

/**
 * InteractiveCursor (clean)
 * - Small elegant cursor that follows the mouse (no trails).
 * - Subtle particle explosion on click using CSS animations.
 * - Theme-aware via useTheme() and lightweight for performance.
 */
const InteractiveCursor: React.FC<Props> = ({ enabled = true, particleCount = 8 }) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: -1000, y: -1000 });
  const pos = useRef({ x: -1000, y: -1000 });
  const { actualTheme } = useTheme();
  const colorRef = useRef<string>('rgba(255,255,255,0.95)');

  // Effect A: stable global listeners and RAF loop (does not depend on theme)
  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const particlesContainer = particlesRef.current;
    if (!cursor || !particlesContainer) return;

    // Hide cursor on touch devices for usability
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      cursor.style.display = 'none';
      return;
    }

    const handleMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      cursor.style.opacity = '1';
    };

    const handleLeave = () => {
      target.current.x = -1000;
      target.current.y = -1000;
      cursor.style.opacity = '0';
    };

    const handleDown = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) spawnParticles(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseleave', handleLeave);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.22);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.22);
      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    function spawnParticles(cx: number, cy: number) {
      if (!particlesContainer) return;
      const count = Math.max(4, Math.min(12, particleCount));
      const frag = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = styles.particle + ' ' + styles.explode;
        const angle = Math.random() * Math.PI * 2;
        const dist = 8 + Math.random() * 18;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const dur = 260 + Math.round(Math.random() * 240);

        p.style.left = `${cx}px`;
        p.style.top = `${cy}px`;
        p.style.setProperty('--tx', `${dx}px`);
        p.style.setProperty('--ty', `${dy}px`);
        p.style.setProperty('--dur', `${dur}ms`);
        p.style.background = colorRef.current; // theme-aware color via ref
        (p.style as any).animationDuration = `${dur}ms`;
        frag.appendChild(p);
        p.addEventListener('animationend', () => p.remove(), { once: true });
        setTimeout(() => p.remove(), dur + 200);
      }
      particlesContainer.appendChild(frag);
      const max = 120;
      while (particlesContainer.childElementCount > max) {
        particlesContainer.removeChild(particlesContainer.firstChild as ChildNode);
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('touchstart', handleTouchStart);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, particleCount]);

  // Effect B: update theme color without rebinding listeners
  useEffect(() => {
    colorRef.current = actualTheme === 'dark' ? 'rgba(99,102,241,0.95)' : 'rgba(79,70,229,0.95)';
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.background = actualTheme === 'dark' ? 'rgba(255,255,255,0.95)' : 'rgba(17,24,39,0.95)';
    }
  }, [actualTheme]);

  // cursor base color adapts with theme via inline style for immediate effect
  const cursorColor = actualTheme === 'dark' ? 'rgba(255,255,255,0.95)' : 'rgba(17,24,39,0.95)';

  return (
    <div className={styles.overlay} aria-hidden>
      <div ref={particlesRef} className={styles.particles} />
      <div
        ref={cursorRef}
        className={styles.cursor}
        style={{ background: cursorColor }}
      />
    </div>
  );
};

export default InteractiveCursor;
