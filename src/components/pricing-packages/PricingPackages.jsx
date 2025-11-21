import React from 'react';
import styles from './PricingPackages.module.css';

const PricingPackages = () => {
  const packages = [
    {
      name: 'Classico',
      price: 35,
      features: [
        'Fotolavoretto in PDF (impaginato, pronto da condividere o stampare).',
        'Galleria completa in immagini HD (tutte le creazioni digitalizzate singolarmente).'
      ],
      target: 'Per le famiglie che vogliono preservare le creazioni senza occupare spazio a casa e averle sempre disponibili in qualità impeccabile.'
    },
    {
      name: 'Completo',
      price: 40,
      features: [
        'Fotolavoretto in PDF.',
        'Galleria HD.',
        'Video MP4 con musica a scelta (per compleanni, riunioni familiari o da inviare ai nonni).'
      ],
      target: 'Per chi desidera un’esperienza più emozionante e versatile, con formato pronto da condividere su qualsiasi schermo.',
      highlight: true 
    },
    {
      name: 'Premium',
      price: 50,
      features: [
        'Fotolavoretto in PDF.',
        'Galleria HD.',
        'Video MP4 con musica e animazione personalizzata basata su un personaggio creato dal bambino.',
        'Reel Instagram pronto da pubblicare.'
      ],
      target: 'Per chi cerca il ricordo più completo, moderno e presentabile, con contenuti perfetti per social e eventi familiari.'
    }
  ];

  return (
    <div className={styles.pricingContainer}>
      <h2 className={styles.mainTitle}>FOTOLAVORRETTO</h2>
      <p className={styles.subtitle}>Scegli il ricordo perfetto per la tua famiglia</p>

      <div className={styles.cardsGrid}>
        {packages.map((pkg) => (
          <div key={pkg.name} className={`${styles.card} ${pkg.highlight ? styles.highlighted : ''}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.packageName}>{pkg.name}</h3>
              <div className={styles.price}>
                <span className={styles.currency}>€</span>
                <span className={styles.amount}>{pkg.price}</span>
              </div>
            </div>

            <div className={styles.cardBody}>
              <div className={styles.featuresSection}>
                <p className={styles.sectionLabel}>Include:</p>
                <ul>
                  {pkg.features.map((feature, index) => (
                    <li key={index}>
                      <span className={styles.checkIcon}>✔</span> 
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.targetSection}>
                <p className={styles.sectionLabel}>Per chi è:</p>
                <p className={styles.targetText}>{pkg.target}</p>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button className={styles.ctaButton}>Scegli {pkg.name}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPackages;
