// // ...existing code...

//     const handleDown = (e: MouseEvent) => {
//       spawnParticles(e.clientX, e.clientY);
//     };

//     const handleTouchStart = (e: TouchEvent) => {
//       const t = e.touches[0];
//       if (t) spawnParticles(t.clientX, t.clientY);
//     };

//     window.addEventListener('mousemove', handleMove, { passive: true });
//     window.addEventListener('mouseleave', handleLeave);
//     window.addEventListener('mousedown', handleDown);
//     window.addEventListener('touchstart', handleTouchStart, { passive: true });

//     // Smooth follow loop (GPU-friendly using translate3d)
//     const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
//     const tick = () => {
//       pos.current.x = lerp(pos.current.x, target.current.x, 0.22);
//       pos.current.y = lerp(pos.current.y, target.current.y, 0.22);
//       cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
//       rafRef.current = requestAnimationFrame(tick);
//     };

//     rafRef.current = requestAnimationFrame(tick);

//     function spawnParticles(cx: number, cy: number) {
//       if (!particlesContainer) return;
//       const count = Math.max(4, Math.min(12, particleCount));
//       const frag = document.createDocumentFragment();
//       for (let i = 0; i < count; i++) {
//         const p = document.createElement('div');
//         p.className = styles.particle + ' ' + styles.explode;
//         // random angle and distance (small subtle explosion)
//         const angle = Math.random() * Math.PI * 2;
//         const dist = 8 + Math.random() * 18;
//         const dx = Math.cos(angle) * dist;
//         const dy = Math.sin(angle) * dist;
//         const dur = 260 + Math.round(Math.random() * 240);

//         p.style.left = `${cx}px`;
//         p.style.top = `${cy}px`;
//         p.style.setProperty('--tx', `${dx}px`);
//         p.style.setProperty('--ty', `${dy}px`);
//         p.style.setProperty('--dur', `${dur}ms`);

//         // theme-aware color
//         p.style.background = actualTheme === 'dark' ? 'rgba(99,102,241,0.95)' : 'rgba(79,70,229,0.95)';

//         // assign animation duration explicitly for older browsers
//         (p.style as any).animationDuration = `${dur}ms`;

//         frag.appendChild(p);

//         // cleanup after animation
//         p.addEventListener('animationend', () => p.remove(), { once: true });
//         // safety removal
//         setTimeout(() => p.remove(), dur + 200);
//       }
//       particlesContainer.appendChild(frag);
//       // keep container small
//       const max = 120;
//       while (particlesContainer.childElementCount > max) {
//         particlesContainer.removeChild(particlesContainer.firstChild as ChildNode);
//       }
//     }

//     return () => {
//       window.removeEventListener('mousemove', handleMove);
//       window.removeEventListener('mouseleave', handleLeave);
//       window.removeEventListener('mousedown', handleDown);
//       window.removeEventListener('touchstart', handleTouchStart);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [enabled, particleCount, actualTheme]);

//   // cursor base color adapts with theme via inline style for immediate effect
//   const cursorColor = actualTheme === 'dark' ? 'rgba(255,255,255,0.95)' : 'rgba(17,24,39,0.95)';

//   return (
//     <div className={styles.overlay} aria-hidden>
//       <div ref={particlesRef} className={styles.particles} />
//       <div
//         ref={cursorRef}
//         className={styles.cursor}
//         style={{ background: cursorColor }}
//       />
//     </div>
//   );
// };

// export default InteractiveCursor;
// // All code below this line is removed to fix duplicate blocks and exports
// import React, { useEffect, useRef } from 'react';
// import styles from './InteractiveCursor.module.css';
// import { useTheme } from '../hooks/useTheme';

// type Props = {
//   enabled?: boolean;
//   particleCount?: number;
// };

// /**
//  * InteractiveCursor
//  * - Small elegant cursor that follows the mouse (no trails).
//  * - Subtle particle explosion on click.
//  * - Adapts to dark/light mode via useTheme().
//  * - Uses DOM elements and CSS animations for GPU-accelerated performance.
//  */
// const InteractiveCursor: React.FC<Props> = ({ enabled = true, particleCount = 8 }) => {
//   const cursorRef = useRef<HTMLDivElement | null>(null);
//   const particlesRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);
//   const targetRef = useRef({ x: -100, y: -100 });
//   const posRef = useRef({ x: -100, y: -100 });
//   const { actualTheme } = useTheme();

//   useEffect(() => {
//     if (!enabled) return;

//     const cursor = cursorRef.current;
//     const particlesContainer = particlesRef.current;
//     if (!cursor || !particlesContainer) return;

//     let mounted = true;

//     const onMove = (e: MouseEvent) => {
//       targetRef.current.x = e.clientX;
//       targetRef.current.y = e.clientY;
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       const t = e.touches[0];
//       if (t) {
//         targetRef.current.x = t.clientX;
//         targetRef.current.y = t.clientY;
//       }
//     };

//     const onDown = (e: MouseEvent) => {
//       spawnParticles(e.clientX, e.clientY);
//     };

//     const onTouchStart = (e: TouchEvent) => {
//       const t = e.touches[0];
//       if (t) spawnParticles(t.clientX, t.clientY);
//     };

//     window.addEventListener('mousemove', onMove, { passive: true });
//     window.addEventListener('touchmove', onTouchMove, { passive: true });
//     window.addEventListener('mousedown', onDown);
//     window.addEventListener('touchstart', onTouchStart, { passive: true });

//     // Smooth follow using RAF and transform (GPU-accelerated)
//     const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

//     const loop = () => {
//       const t = targetRef.current;
//       const p = posRef.current;
//       p.x = lerp(p.x, t.x, 0.22);
//       p.y = lerp(p.y, t.y, 0.22);
//       if (cursor) {
//         cursor.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate3d(-50%, -50%, 0)`;
//       }
//       rafRef.current = requestAnimationFrame(loop);
//     };

//     rafRef.current = requestAnimationFrame(loop);

//     function spawnParticles(cx: number, cy: number) {
//       if (!particlesContainer) return;
//       const count = Math.max(4, Math.min(12, particleCount));
//       for (let i = 0; i < count; i++) {
//         const el = document.createElement('div');
//         el.className = `${styles.particle} ${styles.explode}`;
//         // Random angle and distance
//         const angle = Math.random() * Math.PI * 2;
//         const dist = 10 + Math.random() * 18; // small subtle explosion
//         const dx = Math.cos(angle) * dist;
//         const dy = Math.sin(angle) * dist;
//         const duration = 300 + Math.round(Math.random() * 220);

//         // Set position and CSS vars for animation
//         el.style.left = `${cx}px`;
//         el.style.top = `${cy}px`;
//         el.style.setProperty('--tx', `${dx}px`);
//         el.style.setProperty('--ty', `${dy}px`);
//         el.style.setProperty('--dur', `${duration}ms`);

//         // color adapts to theme
//         const color = actualTheme === 'dark' ? 'rgba(99,102,241,0.95)' : 'rgba(79,70,229,0.95)';
//         el.style.background = color;

//         // apply animation duration inline
//         (el.style as any).animationDuration = `${duration}ms`;

//         particlesContainer.appendChild(el);

//         const remove = () => {
//           if (el && el.parentNode) el.parentNode.removeChild(el);
//         };

//         el.addEventListener('animationend', remove, { once: true });
//         // Safety remove after a little longer
//         setTimeout(remove, duration + 80);
//       }
//       // Limit children to avoid bloat
//       const max = 120;
//       while (particlesContainer.childElementCount > max) {
//         particlesContainer.removeChild(particlesContainer.firstChild as ChildNode);
//       }
//     }

//     return () => {
//       mounted = false;
//       window.removeEventListener('mousemove', onMove);
//       window.removeEventListener('touchmove', onTouchMove);
//       window.removeEventListener('mousedown', onDown);
//       window.removeEventListener('touchstart', onTouchStart);
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [enabled, particleCount, actualTheme]);

//   // initial inline style for cursor color adapted to theme
//   const cursorColor = actualTheme === 'dark' ? 'rgba(99,102,241,1)' : 'rgba(79,70,229,1)';

//   return (
//     <div className={styles.overlay} aria-hidden>
//       <div
//         ref={particlesRef}
//         className={styles.particles}
//       />
//       <div
//         ref={cursorRef}
//         className={styles.cursor}
//         style={{ background: cursorColor }}
//       />
//     </div>
//   );
// };

// export default InteractiveCursor;
// import React, { useEffect, useRef } from 'react';
// import styles from './InteractiveCursor.module.css';
// import { useTheme } from '../hooks/useTheme';

// const InteractiveCursor: React.FC<{ enabled?: boolean; particleCount?: number }> = ({ enabled = true, particleCount = 8 }) => {
//   const { actualTheme } = useTheme();
//   const overlayRef = useRef<HTMLDivElement | null>(null);
//   const cursorRef = useRef<HTMLDivElement | null>(null);
//   const rafRef = useRef<number | null>(null);
//   import React, { useEffect, useRef } from 'react';
//   import styles from './InteractiveCursor.module.css';
//   import { useTheme } from '../hooks/useTheme';

//   /**
//    * InteractiveCursor (final clean implementation)
//    * - Single DOM-based cursor element that follows the mouse.
//    * - Subtle CSS-animated particles on click.
//    * - Theme-aware via useTheme().
//    */
//   const InteractiveCursor: React.FC<{ enabled?: boolean; particleCount?: number }> = ({ enabled = true, particleCount = 8 }) => {
//     const { actualTheme } = useTheme();
//     const overlayRef = useRef<HTMLDivElement | null>(null);
//     const cursorRef = useRef<HTMLDivElement | null>(null);
//     const rafRef = useRef<number | null>(null);
//     const mousePos = useRef({ x: -1000, y: -1000 });
//     const renderedPos = useRef({ x: -1000, y: -1000 });

//       useEffect(() => {
//         if (!enabled) return;
//         const cursor = cursorRef.current;
//         const particlesContainer = particlesRef.current;
//         if (!cursor || !particlesContainer) return;
//         const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
//         if (isTouch) {
//           cursor.style.display = 'none';
//           return;
//         }
//         const handleMove = (e: MouseEvent) => {
//           target.current.x = e.clientX;
//           target.current.y = e.clientY;
//           cursor.style.opacity = '1';
//         };
//         const handleLeave = () => {
//           target.current.x = -1000;
//           target.current.y = -1000;
//           cursor.style.opacity = '0';
//         };
//         const handleDown = (e: MouseEvent) => {
//           spawnParticles(e.clientX, e.clientY);
//         };
//         const handleTouchStart = (e: TouchEvent) => {
//           const t = e.touches[0];
//           if (t) spawnParticles(t.clientX, t.clientY);
//         };
//         window.addEventListener('mousemove', handleMove, { passive: true });
//         window.addEventListener('mouseleave', handleLeave);
//         window.addEventListener('mousedown', handleDown);
//         window.addEventListener('touchstart', handleTouchStart, { passive: true });
//         const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
//         const tick = () => {
//           pos.current.x = lerp(pos.current.x, target.current.x, 0.22);
//           pos.current.y = lerp(pos.current.y, target.current.y, 0.22);
//           cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
//           rafRef.current = requestAnimationFrame(tick);
//         };
//         rafRef.current = requestAnimationFrame(tick);
//         function spawnParticles(cx: number, cy: number) {
//           if (!particlesContainer) return;
//           const count = Math.max(4, Math.min(12, particleCount));
//           const frag = document.createDocumentFragment();
//           for (let i = 0; i < count; i++) {
//             const p = document.createElement('div');
//             p.className = styles.particle + ' ' + styles.explode;
//             const angle = Math.random() * Math.PI * 2;
//             const dist = 8 + Math.random() * 18;
//             const dx = Math.cos(angle) * dist;
//             const dy = Math.sin(angle) * dist;
//             const dur = 260 + Math.round(Math.random() * 240);
//             p.style.left = `${cx}px`;
//             p.style.top = `${cy}px`;
//             p.style.setProperty('--tx', `${dx}px`);
//             p.style.setProperty('--ty', `${dy}px`);
//             p.style.setProperty('--dur', `${dur}ms`);
//             p.style.background = actualTheme === 'dark' ? 'rgba(99,102,241,0.95)' : 'rgba(79,70,229,0.95)';
//             (p.style as any).animationDuration = `${dur}ms`;
//             frag.appendChild(p);
//             p.addEventListener('animationend', () => p.remove(), { once: true });
//             setTimeout(() => p.remove(), dur + 200);
//           }
//           particlesContainer.appendChild(frag);
//           const max = 120;
//           while (particlesContainer.childElementCount > max) {
//             particlesContainer.removeChild(particlesContainer.firstChild as ChildNode);
//           }
//         }
//         return () => {
//           window.removeEventListener('mousemove', handleMove);
//           window.removeEventListener('mouseleave', handleLeave);
//           window.removeEventListener('mousedown', handleDown);
//           window.removeEventListener('touchstart', handleTouchStart);
//           if (rafRef.current) cancelAnimationFrame(rafRef.current);
//         };
//       }, [enabled, particleCount, actualTheme]);
//         spawnParticles(e.clientX, e.clientY);
//       };

//       const onTouchStart = (e: TouchEvent) => {
//         if (e.touches && e.touches[0]) {
//           const t = e.touches[0];
//           spawnParticles(t.clientX, t.clientY);
//         }
//       };

//       window.addEventListener('mousemove', onMove);
//       window.addEventListener('mouseleave', onLeave);
//       window.addEventListener('mousedown', onDown);
//       window.addEventListener('touchstart', onTouchStart, { passive: true });

//       const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
//       const tick = () => {
//         renderedPos.current.x = lerp(renderedPos.current.x, mousePos.current.x, 0.18);
//         renderedPos.current.y = lerp(renderedPos.current.y, mousePos.current.y, 0.18);
//         if (cursor) {
//           cursor.style.transform = `translate3d(${renderedPos.current.x}px, ${renderedPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
//         }
//         rafRef.current = requestAnimationFrame(tick);
//       };

//       rafRef.current = requestAnimationFrame(tick);

//       return () => {
//         if (rafRef.current) cancelAnimationFrame(rafRef.current);
//         window.removeEventListener('mousemove', onMove);
//         window.removeEventListener('mouseleave', onLeave);
//         window.removeEventListener('mousedown', onDown);
//         window.removeEventListener('touchstart', onTouchStart);
//         try {
//           cursor && cursor.remove();
//           overlay && overlay.remove();
//         } catch (err) {
//           // ignore
//         }
//       };
//     }, [enabled, particleCount, actualTheme]);

//     return null;
//   };

//   export default InteractiveCursor;
//   color: string;
// };

// /**
//  * InteractiveCursor
//  * - Fullscreen canvas overlay that draws a smooth orb following the cursor
//  *   and a colorful particle explosion on mouse click.
//  * - Adapts colors to dark/light mode using `useTheme()`.
//  * - Uses requestAnimationFrame; scales for DPR for crisp rendering.
//  */
// const InteractiveCursor: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const rafRef = useRef<number | null>(null);
//   const particlesRef = useRef<Particle[]>([]);
//   const orbRef = useRef({ x: -9999, y: -9999, tx: -9999, ty: -9999 });
//   const dprRef = useRef<number>(1);
//   const { actualTheme } = useTheme();

//   useEffect(() => {
//     if (!enabled) return;
//     const canvas = document.createElement('canvas');
//     canvasRef.current = canvas;
//     canvas.className = styles.overlay + ' interactive-cursor-canvas';
//     canvas.style.position = 'fixed';
//     canvas.style.top = '0';
//     canvas.style.left = '0';
//     canvas.style.width = '100%';
//     canvas.style.height = '100%';
//     canvas.style.pointerEvents = 'none';
//     canvas.style.zIndex = '9999';

//     document.body.appendChild(canvas);

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return () => {};

//     const setSize = () => {
//       const dpr = window.devicePixelRatio || 1;
//       dprRef.current = dpr;
//       const w = Math.max(1, Math.floor(window.innerWidth));
//       const h = Math.max(1, Math.floor(window.innerHeight));
//       canvas.width = Math.floor(w * dpr);
//       canvas.height = Math.floor(h * dpr);
//       canvas.style.width = w + 'px';
//       canvas.style.height = h + 'px';
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//       // Set blend mode to allow nice glow blending and GPU friendly compositing
//       // mixBlendMode is CSS-level; for canvas use globalCompositeOperation when needed
//       canvas.style.mixBlendMode = actualTheme === 'dark' ? 'screen' : 'multiply';
//     };

//     setSize();
//     const onResize = () => setSize();
//     window.addEventListener('resize', onResize);

//     // Mouse tracking
//     const onMove = (e: MouseEvent) => {
//       orbRef.current.tx = e.clientX;
//       orbRef.current.ty = e.clientY;
//       // Keep orb on screen if hidden previously
//       if (orbRef.current.x === -9999) {
//         orbRef.current.x = e.clientX;
//         orbRef.current.y = e.clientY;
//       }
//     };

//     // Click explosion
//     const onDown = (e: MouseEvent) => {
//       spawnParticles(e.clientX, e.clientY);
//     };

//     window.addEventListener('mousemove', onMove);
//     window.addEventListener('mousedown', onDown);

//     // Touch support: use first touch as pointer and spawn on touchstart
//     const onTouch = (e: TouchEvent) => {
//       if (e.touches && e.touches[0]) {
//         const t = e.touches[0];
//         orbRef.current.tx = t.clientX;
//         orbRef.current.ty = t.clientY;
//       }
//     };
//     const onTouchStart = (e: TouchEvent) => {
//       if (e.touches && e.touches[0]) {
//         const t = e.touches[0];
//         spawnParticles(t.clientX, t.clientY);
//       }
//     };
//     window.addEventListener('touchmove', onTouch);
//     window.addEventListener('touchstart', onTouchStart);

//     // Particle spawn
//     function spawnParticles(x: number, y: number) {
//       const count = 18; // moderate count for performance
//       const hueBase = actualTheme === 'dark' ? 220 : 260; // bluish/purple in dark, adjust for light
//       for (let i = 0; i < count; i++) {
//         const angle = Math.random() * Math.PI * 2;
//         const speed = 0.9 + Math.random() * 2.4;
//         const size = 2 + Math.random() * 3.5;
//         const life = 40 + Math.random() * 40;
//         const hue = (hueBase + (Math.random() * 60 - 30)) | 0;
//         const sat = actualTheme === 'dark' ? 80 : 70;
//         const light = actualTheme === 'dark' ? 60 : 40;
//         const color = `hsl(${hue} ${sat}% ${light}%)`;

//         particlesRef.current.push({
//           x,
//           y,
//           vx: Math.cos(angle) * speed,
//           vy: Math.sin(angle) * speed - 0.4,
//           life,
//           size,
//           color,
//         });
//       }
//       // limit total particles
//       if (particlesRef.current.length > 800) {
//         particlesRef.current.splice(0, particlesRef.current.length - 800);
//       }
//     }

//     // Orb follow smoothing
//     const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

//     let last = performance.now();
//     function frame(now: number) {
//       const dt = Math.min(48, now - last);
//       last = now;

//         // soft fade: draw a translucent rect with destination-out or set globalAlpha
//         // This creates a subtle trail; on reduced-motion systems the CSS hides the overlay.
//         ctx.save();
//         ctx.globalCompositeOperation = 'destination-out';
//         ctx.fillStyle = 'rgba(0,0,0,0.12)';
//         if (actualTheme === 'light') ctx.fillStyle = 'rgba(255,255,255,0.14)';
//         ctx.fillRect(0, 0, canvas.width / dprRef.current, canvas.height / dprRef.current);
//         ctx.restore();

//       // update orb position
//       orbRef.current.x = lerp(orbRef.current.x, orbRef.current.tx, 0.18);
//       orbRef.current.y = lerp(orbRef.current.y, orbRef.current.ty, 0.18);

//       // draw glow orb
//       const ox = orbRef.current.x;
//       const oy = orbRef.current.y;
//       if (isFinite(ox) && isFinite(oy)) {
//         const size = 14; // base orb size
//         const grd = ctx.createRadialGradient(ox, oy, 0, ox, oy, size * 3);
//         if (actualTheme === 'dark') {
//           grd.addColorStop(0, 'rgba(99,102,241,0.95)');
//           grd.addColorStop(0.35, 'rgba(99,102,241,0.25)');
//           grd.addColorStop(1, 'rgba(99,102,241,0)');
//         } else {
//           grd.addColorStop(0, 'rgba(79,70,229,0.95)');
//           grd.addColorStop(0.35, 'rgba(79,70,229,0.20)');
//           grd.addColorStop(1, 'rgba(79,70,229,0)');
//         }
//         ctx.beginPath();
//         ctx.fillStyle = grd;
//         ctx.arc(ox, oy, size * 2.3, 0, Math.PI * 2);
//         ctx.fill();

//   // small solid core
//   ctx.beginPath();
//   ctx.fillStyle = 'rgba(255,255,255,0.95)';
//   ctx.arc(ox, oy, 3.5, 0, Math.PI * 2);
//   ctx.fill();
//       }

//       // update particles
//       const particles = particlesRef.current;
//       for (let i = particles.length - 1; i >= 0; i--) {
//         const p = particles[i];
//         // physics
//         p.vy += 0.03; // gravity subtle
//         p.vx *= 0.99;
//         p.vy *= 0.99;
//         p.x += p.vx * (dt / 16);
//         p.y += p.vy * (dt / 16);
//         p.life -= dt * 0.06;

//   const alpha = Math.max(0, Math.min(1, p.life / 80));
//   ctx.beginPath();
//   // use lighter composite mode for bright particles
//   ctx.globalCompositeOperation = 'lighter';
//   ctx.fillStyle = p.color;
//   ctx.globalAlpha = alpha;
//   ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//   ctx.fill();
//   ctx.globalAlpha = 1;
//   ctx.globalCompositeOperation = 'source-over';

//         if (p.life <= 0 || p.y > window.innerHeight + 100) {
//           particles.splice(i, 1);
//         }
//       }

//       rafRef.current = requestAnimationFrame(frame);
//     }

//     rafRef.current = requestAnimationFrame(frame);

//     // Cleanup
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//       window.removeEventListener('resize', onResize);
//       window.removeEventListener('mousemove', onMove);
//       window.removeEventListener('mousedown', onDown);
//       window.removeEventListener('touchmove', onTouch);
//       window.removeEventListener('touchstart', onTouchStart);
//       if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [enabled, actualTheme]);

//   import React, { useEffect, useRef } from 'react';
//   import styles from './InteractiveCursor.module.css';
//   import { useTheme } from '../hooks/useTheme';

//   /**
//    * InteractiveCursor (clean, refined)
//    * - Small elegant following cursor implemented with a DOM element (GPU-accelerated transforms).
//    * - Subtle particle explosion on clicks using CSS animations (no canvas, no trails).
//    * - Theme-aware via useTheme(); minimal performance impact and immediate integration.
//    */
//   const InteractiveCursor: React.FC<{ enabled?: boolean; particleCount?: number }> = ({ enabled = true, particleCount = 8 }) => {
//     const { actualTheme } = useTheme();
//     const overlayRef = useRef<HTMLDivElement | null>(null);
//     const cursorRef = useRef<HTMLDivElement | null>(null);
//     const rafRef = useRef<number | null>(null);
//     const mousePos = useRef({ x: -1000, y: -1000 });
//     const renderedPos = useRef({ x: -1000, y: -1000 });

//     useEffect(() => {
//       if (!enabled) return;

//       // Create overlay and cursor elements if not present
//       let overlay = overlayRef.current;
//       let cursor = cursorRef.current;

//       if (!overlay) {
//         overlay = document.createElement('div');
//         overlay.className = styles.overlay;
//         overlayRef.current = overlay;
//         // expose CSS vars for theme
//         setThemeCSSVars(overlay, actualTheme);
//         document.body.appendChild(overlay);
//       }

//       if (!cursor) {
//         cursor = document.createElement('div');
//         cursor.className = styles.cursor;
//         cursorRef.current = cursor;
//         overlay.appendChild(cursor);
//       }

//       // Hide the cursor element on touch devices (cursor isn't relevant there)
//       const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
//       if (isTouchDevice) {
//         cursor.style.display = 'none';
//       }

//       function setThemeCSSVars(el: HTMLElement, theme: 'dark' | 'light') {
//         // CSS variables used by the styles module
//         if (theme === 'dark') {
//           el.style.setProperty('--cursor-color', 'rgba(255,255,255,0.95)');
//           el.style.setProperty('--particle-color', 'rgba(99,102,241,0.95)');
//           el.style.setProperty('--cursor-blend', 'screen');
//         } else {
//           el.style.setProperty('--cursor-color', 'rgba(17,24,39,0.95)');
//           el.style.setProperty('--particle-color', 'rgba(79,70,229,0.95)');
//           el.style.setProperty('--cursor-blend', 'normal');
//         }
//       }

//       // Update CSS vars on theme changes
//       setThemeCSSVars(overlay, actualTheme);

//       // Event handlers
//       const onMove = (e: MouseEvent) => {
//         mousePos.current.x = e.clientX;
//         mousePos.current.y = e.clientY;
//         // ensure cursor visible
//         if (cursor) cursor.style.opacity = '1';
//       };

//       const onLeave = () => {
//         // move off-screen and hide
//         mousePos.current.x = -1000;
//         mousePos.current.y = -1000;
//         if (cursor) cursor.style.opacity = '0';
//       };

//       const onDown = (e: MouseEvent) => {
//         // small click scale effect
//         if (cursor) {
//           cursor.style.transform = 'translate3d(calc(var(--cx,0px)), calc(var(--cy,0px)), 0) scale(0.85)';
//           setTimeout(() => {
//             cursor && (cursor.style.transform = 'translate3d(calc(var(--cx,0px)), calc(var(--cy,0px)), 0) scale(1)');
//           }, 120);
//         }
//         spawnParticles(e.clientX, e.clientY);
//       };

//       const onTouchStart = (e: TouchEvent) => {
//         if (e.touches && e.touches[0]) {
//           const t = e.touches[0];
//           spawnParticles(t.clientX, t.clientY);
//         }
//       };

//       window.addEventListener('mousemove', onMove);
//       window.addEventListener('mouseleave', onLeave);
//       window.addEventListener('mousedown', onDown);
//       window.addEventListener('touchstart', onTouchStart, { passive: true });

//       // Spawn particle elements (DOM + CSS animation) for better GPU offloading
//       function spawnParticles(x: number, y: number) {
//         if (!overlay) return;
//         const frag = document.createDocumentFragment();
//         const count = Math.max(4, Math.min(12, particleCount));
//         for (let i = 0; i < count; i++) {
//           const p = document.createElement('div');
//           p.className = styles.particle;
//           // random direction and distance
//           const angle = Math.random() * Math.PI * 2;
//           const dist = 8 + Math.random() * 18; // px
//           const dx = Math.cos(angle) * dist;
//           const dy = Math.sin(angle) * dist;
//           const dur = 380 + Math.random() * 260; // ms
//           // set initial position
//           p.style.left = x + 'px';
//           p.style.top = y + 'px';
//           // animate with CSS using variables for GPU-accelerated transforms
//           p.style.setProperty('--dx', dx + 'px');
//           p.style.setProperty('--dy', dy + 'px');
//           p.style.setProperty('--dur', dur + 'ms');
//           // color slightly variant
//           const base = actualTheme === 'dark' ? 'hsl(240 90% 70%)' : 'hsl(255 85% 45%)';
//           p.style.background = base;
//           p.style.animation = `particleAnim ${dur}ms cubic-bezier(.2,.8,.3,1) forwards`;
//           // append
//           frag.appendChild(p);
//           // cleanup after animation
//           p.addEventListener('animationend', () => p.remove(), { once: true });
//         }
//         overlay.appendChild(frag);
//       }

//       // Smooth cursor follow using rAF and lerp for buttery motion
//       const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
//       const tick = () => {
//         const tX = mousePos.current.x;
//         const tY = mousePos.current.y;
//         renderedPos.current.x = lerp(renderedPos.current.x, tX, 0.2);
//         renderedPos.current.y = lerp(renderedPos.current.y, tY, 0.2);

//         if (cursor) {
//           // set CSS custom vars for easy transform and subpixel GPU acceleration
//           cursor.style.setProperty('--cx', renderedPos.current.x + 'px');
//           cursor.style.setProperty('--cy', renderedPos.current.y + 'px');
//           cursor.style.transform = `translate3d(${renderedPos.current.x}px, ${renderedPos.current.y}px, 0) translate3d(-50%, -50%, 0)`;
//         }

//         rafRef.current = requestAnimationFrame(tick);
//       };

//       rafRef.current = requestAnimationFrame(tick);

//       // Cleanup
//       return () => {
//         if (rafRef.current) cancelAnimationFrame(rafRef.current);
//         window.removeEventListener('mousemove', onMove);
//         window.removeEventListener('mouseleave', onLeave);
//         window.removeEventListener('mousedown', onDown);
//         window.removeEventListener('touchstart', onTouchStart);
//         // remove DOM nodes we added
//         try {
//           cursor && cursor.remove();
//           overlay && overlay.remove();
//         } catch (e) {
//           // ignore
//         }
//       };
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [enabled, particleCount, actualTheme]);

//     // Render nothing in React tree; the component mounts DOM nodes to body for global overlay
//     return null;
//   };

//   export default InteractiveCursor;
