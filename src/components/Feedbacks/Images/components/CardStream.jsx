import React, { useRef, useEffect, useState } from 'react';
import styles from './CardStream.module.css';

export default function CardStream({ images = [], onImageClick, enableKeyBoost = true }) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const positionsRef = useRef([]);
  const velocityRef = useRef(0.06); // lower initial velocity to slow motion
  const dragRef = useRef({ active: false, startX: 0, lastX: 0, vx: 0 });
  // Keyboard speed control refs
  const targetKeyBoostRef = useRef(0); // target boost applied while key pressed
  const currentKeyBoostRef = useRef(0); // smoothed boost applied each frame
  const KEY_BOOST_MAG = 0.32; // magnitude of speed change when arrow pressed (px/ms)
  const [seed, setSeed] = useState(0); // to force re-render when needed

  const CARD_WIDTH = 360; // card width (kept large)
  const CARD_GAP = 4; // significantly tighten horizontal spacing between cards
  const BASE_SPEED = 0.08; // slower base speed (px per ms baseline)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = images.map((src, i) => ({ src, i }));

    // compute initial positions in pixels
    const totalWidth = items.length * (CARD_WIDTH + CARD_GAP);
    positionsRef.current = items.map((_, i) => i * (CARD_WIDTH + CARD_GAP));

    let last = performance.now();

    function step(now) {
      const dt = Math.min(40, now - last);
      last = now;

      // Smoothly interpolate currentKeyBoost towards targetKeyBoost for gentle acceleration
      currentKeyBoostRef.current += (targetKeyBoostRef.current - currentKeyBoostRef.current) * 0.14;

      // velocity combines base, user velocity, key boost and drag/ref inertia
      const v = BASE_SPEED + velocityRef.current + currentKeyBoostRef.current; // px per ms

      for (let i = 0; i < positionsRef.current.length; i++) {
        positionsRef.current[i] -= v * dt;
        // wrap logic
        const wrapPoint = -CARD_WIDTH - CARD_GAP;
        if (positionsRef.current[i] < wrapPoint) {
          // find rightmost current
          const rightmost = Math.max(...positionsRef.current);
          positionsRef.current[i] = rightmost + CARD_WIDTH + CARD_GAP;
        }
      }

      // apply slight friction to velocityRef (momentum)
      velocityRef.current *= 0.995;

      // sync to DOM by forcing react render occasionally
      // we avoid heavy setState on every frame; use small throttle
      setSeed((s) => (s + 1) % 1000000);

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    // Keyboard handlers: adjust targetKeyBoostRef on arrow down/up
    function onKeyDown(e) {
      if (!enableKeyBoost) return;
      if (e.code === 'ArrowRight') {
        // move images faster to the right -> negative overall velocity
        targetKeyBoostRef.current = -KEY_BOOST_MAG;
      } else if (e.code === 'ArrowLeft') {
        // move images faster to the left -> positive overall velocity
        targetKeyBoostRef.current = KEY_BOOST_MAG;
      }
    }

    function onKeyUp(e) {
      if (!enableKeyBoost) return;
      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        // release: revert to normal speed (target 0)
        targetKeyBoostRef.current = 0;
      }
    }

    if (enableKeyBoost) {
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
    }
    function onPointerDown(e) {
      dragRef.current.active = true;
      dragRef.current.startX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      dragRef.current.lastX = dragRef.current.startX;
      dragRef.current.vx = 0;
      // capture pointer if possible
      if (e.target && e.target.setPointerCapture && e.pointerId) {
        try { e.target.setPointerCapture(e.pointerId); } catch (err) {}
      }
    }

    function onPointerMove(e) {
      if (!dragRef.current.active) return;
      const x = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? dragRef.current.lastX;
      const dx = x - dragRef.current.lastX;
      dragRef.current.lastX = x;
      // adjust positions directly for responsive drag
      for (let i = 0; i < positionsRef.current.length; i++) {
        positionsRef.current[i] += dx; // drag moves stream
      }
      // capture velocity for momentum
      dragRef.current.vx = dx;
      // give a boost to velocityRef so it accelerates while dragging
      // reduced sensitivity for slower, smoother manual dragging
      velocityRef.current += -dx * 0.004;
      // clamp
      velocityRef.current = Math.max(-2.5, Math.min(2.5, velocityRef.current));
      setSeed((s) => s + 1);
    }

    function onPointerUp(e) {
      dragRef.current.active = false;
      // add pointer vx to velocityRef for momentum (reduced)
      velocityRef.current += -dragRef.current.vx * 0.006;
    }

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      // remove keyboard listeners
      try {
        if (enableKeyBoost) {
          window.removeEventListener('keydown', onKeyDown);
          window.removeEventListener('keyup', onKeyUp);
        }
      } catch (err) {}
    };
  }, [images]);

  const renderCards = (mask = false) => {
    return images.map((src, idx) => {
      const x = positionsRef.current[idx] ?? idx * (CARD_WIDTH + CARD_GAP);
      return (
        <div
          key={idx + (mask ? '-m' : '')}
          className={styles.card}
          style={{ transform: `translate3d(${x}px, 0, 0)`, width: CARD_WIDTH }}
          onClick={() => typeof onImageClick === 'function' && onImageClick(idx)}
          role={onImageClick ? 'button' : undefined}
          tabIndex={onImageClick ? 0 : undefined}
          aria-hidden="true"
        >
          <img src={src} alt={`feedback-${idx}`} draggable={false} />
        </div>
      );
    });
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.track} aria-hidden>
        {renderCards(false)}
      </div>

      {/* Scanned overlay - clipped to center area and with strong GPU filter */}
      <div className={styles.scannedMask} aria-hidden>
        <div className={styles.track}>
          {renderCards(true)}
        </div>
      </div>
    </div>
  );
}
