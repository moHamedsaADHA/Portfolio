import React, { useEffect, useRef } from 'react';
import styles from './Feedbacks.module.css';

const NUM_FEEDBACKS = 16;

export const Feedbacks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesRowRef = useRef<HTMLDivElement | null>(null);

  const modules = import.meta.glob('../assets/feedback*.{png,svg}', { eager: true, as: 'url' }) as Record<string, string>;
  const images = Array.from({ length: NUM_FEEDBACKS }, (_, i) => {
    const pngKey = `../assets/feedback${i + 1}.png`;
    const svgKey = `../assets/feedback${i + 1}.svg`;
    if (modules[pngKey]) return modules[pngKey];
    if (modules[svgKey]) return modules[svgKey];
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NgYGD4DwABBAEAf+z3WwAAAABJRU5ErkJggg==';
  });

  return (
    <>
      <section id="feedbacks" className={styles.section} aria-label="Feedbacks">
        <div style={{
          textAlign: 'center',
          margin: '0 auto',
          marginBottom: '1.2rem',
          maxWidth: '700px',
        }}>
          <h2 style={{
            fontWeight: 'bold',
            fontSize: '2.2rem',
            color: '#38bdf8',
            margin: 0,
            letterSpacing: '0.02em',
          }}>
            Feedbacks
          </h2>
          <div style={{
            fontSize: '1.15rem',
            color: '#b0b8d1',
            marginTop: '0.5rem',
            marginBottom: '0.5rem',
            lineHeight: '1.5',
          }}>
            A collection of client and user testimonials, highlighting experiences, satisfaction, and the impact of my work.
          </div>
        </div>
        {/* Animated arrow guide: subtle, centered, aria-hidden for screen readers */}
        <div className={styles.arrowGuide} aria-hidden="true">
          <span className={`${styles.sideArrow} ${styles.arrow} ${styles.delay1}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </span>
          <div className={styles.arrowColumn}>
            <span className={`${styles.arrow} ${styles.delay2}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </span>
            <span className={`${styles.arrow} ${styles.delay3}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </span>
          </div>
          <span className={`${styles.sideArrow} ${styles.arrow} ${styles.delay4}`}>
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </span>
        </div>
        <div className={styles.gridViewport}>
          <div className={styles.imagesGrid}>
            {images.map((src, idx) => (
              <div key={src || idx} className={styles.gridItem}>
                <img src={src} alt={`Feedback ${idx + 1}`} className={styles.feedbackImage} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feedbacks;
