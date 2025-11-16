import React from 'react';
import ParticlesCanvas from './components/ParticlesCanvas';
import ScannerCanvas from './components/ScannerCanvas';
import CardStream from './components/CardStream';
import styles from './Feedbacks.module.css';

export default function Feedbacks() {
  return (
    <section className={styles.feedbacks} aria-labelledby="feedbacks-title">
      <ParticlesCanvas />
      <ScannerCanvas />
      <CardStream />

      <div className={styles.textContent}>
        <h2 id="feedbacks-title">Feedbacks</h2>
        <p>Client testimonials and experiences.</p>
      </div>
    </section>
  );
}
