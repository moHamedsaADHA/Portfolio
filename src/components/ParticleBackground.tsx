import React, { useCallback, useEffect, useRef } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine } from 'tsparticles-engine';
import { useTheme } from '../hooks/useTheme';

export function ParticleBackground() {
  const { actualTheme } = useTheme();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<Container | undefined>();
  const visibleRef = useRef(true);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    containerRef.current = container;
  }, []);

  const particleOptions = {
    background: {
      color: {
        value: 'transparent',
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: actualTheme === 'dark' ? '#4F46E5' : '#6366F1',
      },
      links: {
        color: actualTheme === 'dark' ? '#4F46E5' : '#6366F1',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: 'none' as const,
        enable: true,
        outModes: {
          default: 'bounce' as const,
        },
        random: false,
        speed: 0.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      shape: {
        type: 'circle',
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
          sync: false,
        },
      },
    },
    detectRetina: true,
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      const vis = entries[0]?.isIntersecting ?? true;
      visibleRef.current = vis;
      const c = containerRef.current;
      if (!c) return;
      if (vis) c.play(); else c.pause();
    }, { threshold: 0 });
    io.observe(el);

    const onVisChange = () => {
      const c = containerRef.current;
      if (!c) return;
      if (document.hidden) c.pause(); else if (visibleRef.current) c.play();
    };
    document.addEventListener('visibilitychange', onVisChange);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisChange);
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 z-0">
      <Particles
        id="particle-background"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleOptions}
        className="absolute inset-0 z-0"
      />
    </div>
  );
}