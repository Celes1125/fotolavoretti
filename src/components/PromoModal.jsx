import { useState, useEffect } from 'react';
import styles from './PromoModal.module.css';

export default function PromoModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const promoModalShown = sessionStorage.getItem('promoModalShown');
    if (!promoModalShown) {
      const timer = setTimeout(() => {
        setShow(true);
        sessionStorage.setItem('promoModalShown', 'true');
      }, 1500);

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>&times;</button>
        <div className={styles.content}>
          <img src="fotolavoretti_logo_natale.png" alt="Christmas Offer" className={styles.image} />
          <h2>Offerta Speciale Natale!</h2>
          <p>Crea le tue cartoline di Natale personalizzate.</p>
          <p className={styles.deadline}>Disponibile fino al 22 Dicembre!</p>
          <a href="/offerte-natale" className={styles.ctaButton}>
            Vedi l'offerta
          </a>
        </div>
      </div>
    </div>
  );
}
