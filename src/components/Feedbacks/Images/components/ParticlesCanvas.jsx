import React, { useRef, useEffect } from 'react';
import styles from './ParticlesCanvas.module.css';

export default function ParticlesCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let ratio = window.devicePixelRatio || 1;

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { w, h };
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      initParticles();
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function initParticles() {
      const { w, h } = sizeRef.current;
      const area = w * h;
      // density: about 1 particle per 16000px
      const target = Math.max(24, Math.floor(area / 16000));
      const particles = [];
      for (let i = 0; i < target; i++) {
        particles.push({
          x: rand(0, w),
          y: rand(0, h),
          vx: rand(-0.25, 0.25),
          vy: rand(-0.25, 0.25),
          r: rand(0.8, 2.2)
        });
      }
      particlesRef.current = particles;
    }

    function step() {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      // draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 110;
          if (d < maxDist) {
            const a = 1 - d / maxDist;
            ctx.strokeStyle = `rgba(200,220,255,${0.08 * a})`;
            ctx.lineWidth = 1 * a;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(220,230,255,0.95)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    const startLoop = () => {
      if (rafRef.current) return;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
