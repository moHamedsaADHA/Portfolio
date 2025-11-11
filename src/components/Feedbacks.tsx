import styles from './Feedbacks.module.css';

const NUM_FEEDBACKS = 16;


import React, { useState } from 'react';

const Feedbacks: React.FC = () => {
  const modules = import.meta.glob('../assets/feedback*.{png,svg}', { eager: true, as: 'url' }) as Record<string, string>;
  const images = Array.from({ length: NUM_FEEDBACKS }, (_, i) => {
    const pngKey = `../assets/feedback${i + 1}.png`;
    const svgKey = `../assets/feedback${i + 1}.svg`;
    if (modules[pngKey]) return modules[pngKey];
    if (modules[svgKey]) return modules[svgKey];
    return null;
  }).filter(Boolean);

  const [modalIdx, setModalIdx] = useState<number | null>(null);

  const handleOpenModal = (idx: number) => {
    setModalIdx(idx);
    document.body.style.overflow = 'hidden';
  };
  const handleCloseModal = () => {
    setModalIdx(null);
    document.body.style.overflow = '';
  };

  return (
    <section id="feedbacks" className={styles.section} aria-label="Feedbacks">
      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Feedbacks</h2>
        <div className={styles.subheading}>
          A collection of client and user testimonials, highlighting experiences, satisfaction, and the impact of my work.
        </div>
      </div>
      <div className={styles.gridViewport}>
        <div className={styles.imagesGrid}>
          {images.map((src, idx) => (
            <div key={src} className={styles.gridItem}>
              <img
                src={src}
                alt={`Feedback ${idx + 1}`}
                className={styles.feedbackImage}
                onClick={() => handleOpenModal(idx)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
      {modalIdx !== null && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.modalBack} onClick={handleCloseModal} aria-label="Close enlarged image">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L20 16" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 12L12 16L16 20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <img
              src={images[modalIdx]}
              alt={`Feedback ${modalIdx + 1}`}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Feedbacks;
