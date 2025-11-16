import styles from './Feedbacks.module.css';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ParticlesCanvas from './Feedbacks/Images/components/ParticlesCanvas';
import ScannerCanvas from './Feedbacks/Images/components/ScannerCanvas';
import CardStream from './Feedbacks/Images/components/CardStream';

const Feedbacks: React.FC = () => {
  // dynamically load feedback assets from src/assets
  const modules = import.meta.glob('../assets/feedback*.{png,svg}', { eager: true, as: 'url' }) as Record<string, string>;
  // Sort keys so order is deterministic (feedback6.png, feedback7.png, ...)
  const images = Object.keys(modules)
    .sort((a, b) => {
      const na = a.match(/feedback(\d+)/i)?.[1] ?? '0';
      const nb = b.match(/feedback(\d+)/i)?.[1] ?? '0';
      return Number(na) - Number(nb);
    })
    .map(k => modules[k]) as string[];

  const [modalIdx, setModalIdx] = useState<number | null>(null);

  const handleOpenModal = (idx: number) => {
    setModalIdx(idx);
    document.body.style.overflow = 'hidden';
  };
  const handleCloseModal = () => {
    setModalIdx(null);
    document.body.style.overflow = '';
  };

  // Keyboard navigation for lightbox (Arrow keys / Escape)
  useEffect(() => {
    if (modalIdx === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.code === 'ArrowRight') {
        setModalIdx((prev) => (prev === null ? null : (prev + 1) % images.length));
      } else if (e.code === 'ArrowLeft') {
        setModalIdx((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
      } else if (e.code === 'Escape') {
        handleCloseModal();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalIdx, images.length]);

  return (
    <section id="feedbacks" className={styles.section} aria-label="Feedbacks">
      {/* Visual layers */}
      <ParticlesCanvas />
      <ScannerCanvas />
      {/* Card stream uses the same images; pass them as prop */}
      <CardStream images={images} onImageClick={handleOpenModal} enableKeyBoost={modalIdx === null} />

      <div className={styles.headingWrapper}>
        <h2 className={styles.heading}>Feedbacks</h2>
        <div className={styles.subheading}>
          A collection of client and user testimonials, highlighting experiences, satisfaction, and the impact of my work.
        </div>
      </div>

      {/* keep original grid viewport for accessibility/fallback — user can still open modal */}
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

      <AnimatePresence>
        {modalIdx !== null && (
          <motion.div
            key="lightbox"
            className={styles.modalOverlay}
            onClick={handleCloseModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <button className={styles.modalBack} onClick={handleCloseModal} aria-label="Close enlarged image">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16L20 16" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 12L12 16L16 20" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <button className={`${styles.modalNav} ${styles.modalNavLeft}`} onClick={() => setModalIdx((prev) => prev === null ? null : (prev - 1 + images.length) % images.length)} aria-label="Previous image">
                ‹
              </button>

              <img
                src={images[modalIdx]}
                alt={`Feedback ${modalIdx + 1}`}
                className={styles.modalImage}
              />

              <button className={`${styles.modalNav} ${styles.modalNavRight}`} onClick={() => setModalIdx((prev) => prev === null ? null : (prev + 1) % images.length)} aria-label="Next image">
                ›
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Feedbacks;
