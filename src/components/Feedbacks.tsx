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
          marginBottom: '0', // no space below
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
            marginBottom: '0', // no space below
            lineHeight: '1.5',
          }}>
            A collection of client and user testimonials, highlighting experiences, satisfaction, and the impact of my work.
          </div>
        </div>
        <div className={styles.gridViewport} style={{paddingTop: '0.2rem'}}>
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
