import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <a href="mailto:fotolavoretti@gmail.com">fotolavoretti@gmail.com</a>
          <span>&bull;</span>
          <a href="https://instagram.com/fotolavoretti" target="_blank" rel="noopener noreferrer">@fotolavoretti</a>
        </div>
        <div className={styles.credits}>
          <p>sito web progettato e sviluppato da Celeste Colautti</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
