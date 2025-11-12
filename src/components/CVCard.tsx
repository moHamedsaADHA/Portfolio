import React from 'react';
import styles from './CVCard.module.css';
import cvUrl from '../assets/Mo_Saad\'s_CV.pdf';

const CVCard: React.FC = () => {
  return (
    <section id="cv" className={styles.wrapper}>
      <div className={styles.card}>
        <h3 className={styles.title}>My CV</h3>

        <div className={styles.controls}>
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.openButton}`}
          >
            Open
          </a>

          <a
            href={cvUrl}
            download="Mo_Saad's_CV.pdf"
            className={`${styles.btn} ${styles.downloadButton}`}
          >
            Download
          </a>
        </div>
      </div>
    </section>
  );
};

export default CVCard;
