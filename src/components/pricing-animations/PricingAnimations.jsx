import React from 'react';
import styles from './PricingAnimations.module.css';

const PricingAnimations = () => {
  const animationOptions = [
    {
      title: 'Animazione standard',
      price: 10,
      description: 'Messaggi e voci predefinite.',
      videoSrc: '/videos/animation-standard.mp4',
    },
    {
      title: 'Animazione personalizzata',
      price: 15,
      description: 'La voce racconta quello che desideri.',
      videoSrc: '/videos/animation-custom.mp4'
    }
  ];

  return (
    <div className={styles.animationsContainer}>
      <div className={styles.headerSection}>
        <h2 className={styles.mainTitle}>Sei venuto solo per le animazioni?</h2>
        <p className={styles.subtitle}>(Ideale come regalo veloce, saluto speciale o contenuto per i social.)</p>
      </div>

      <div className={styles.videoGrid}>
        {animationOptions.map((option) => (
          <div key={option.title} className={styles.videoCard}>
            <div className={styles.videoWrapper}>
              <video
                src={option.videoSrc}
                controls
                playsInline
                preload="metadata"
                poster={option.posterSrc || ''}>
                Il tuo browser non supporta il video tag.
              </video>
            </div>

            <div className={styles.infoContent}>
              <h3 className={styles.optionTitle}>
                {option.title}:
                <span className={styles.price}> {option.price} €</span>
              </h3>
              <p className={styles.optionDesc}>{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footerSection}>
        <p className={styles.contactText}>Hai un’altra proposta o un progetto diverso? </p>
        <button className={styles.cta}>
          <a href="/contatto">Contattami qui</a>
        </button>      </div>
    </div>
  );
};

export default PricingAnimations;
