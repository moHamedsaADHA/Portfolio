import React, { useRef, useEffect } from 'react';
import styles from './ScannerCanvas.module.css';

export default function ScannerCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let ratio = window.devicePixelRatio || 1;

    function resize() {
      const containerW = Math.min(1100, window.innerWidth - 120);
      const containerH = 220;
      sizeRef.current = { w: containerW, h: containerH };
      canvas.style.width = containerW + 'px';
      canvas.style.height = containerH + 'px';
      canvas.width = Math.floor(containerW * ratio);
      canvas.height = Math.floor(containerH * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    let t = 0;
    const speed = 0.6; // pixels per ms-ish (adjusted by delta)
    let last = performance.now();

    function step(now) {
      const { w, h } = sizeRef.current;
      const dt = Math.min(40, now - last);
      last = now;
      t += dt * speed * 0.35;
      // vertical position cycles
      const y = (t % (h + 80)) - 40; // keep it allowed to go slightly off

      ctx.clearRect(0, 0, w, h);

      // subtle translucent overlay to dim area
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, w, h);

      // horizontal scanner line intentionally removed per request.
      // The canvas remains to preserve layering and sizing but no horizontal
      // stroke is drawn here so the moving green line is gone.

      rafRef.current = requestAnimationFrame(step);
    }

    const startLoop = () => {
      if (rafRef.current) return;
      last = performance.now();
      rafRef.current = requestAnimationFrame(step);
    };
    const stopLoop = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    startLoop();

    // Visibility-based pause
    const io = new IntersectionObserver((entries) => {
      const vis = entries[0]?.isIntersecting ?? true;
      visibleRef.current = vis;
      if (vis) startLoop(); else stopLoop();
    }, { threshold: 0 });
    io.observe(canvas);

    const onVisChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (visibleRef.current) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', onVisChange);

    return () => {
      window.removeEventListener('resize', resize);
      stopLoop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
