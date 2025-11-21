import React from 'react';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Scegli il tuo pacchetto',
      description: 'Classico, completo o premium. Puoi anche scegliere animazioni individuali o richiedere un lavoro di design personalizzato.'
    },
    {
      id: 2,
      title: 'Decidi come inviarmi le creazioni',
      description: '',
      details: [
        'Consegna a domicilio (solo a Cuveglio)',
        'Consegna davanti a scuola (solo a Cuveglio)',
        'Invia le foto se sei lontano'
      ]
    },
    {
      id: 3,
      title: 'Prenota l’appuntamento',
      description: 'Se scegli la consegna di persona (a domicilio o a scuola), seleziona l’orario che preferisci.'
    },
    {
      id: 4,
      title: 'Decidi cosa fare con i lavoretti originali',
      description: '',
      details: [
        'Smaltimento responsabile senza costi aggiuntivi',
        'Restituzione dei lavoretti'
      ]
    },
    {
      id: 5,
      title: 'Produzione digitale',
      description: 'Trasformiamo i lavoretti in PDF, galleria HD, video con musica e animazione personalizzata secondo il pacchetto scelto.'
    },
    {
      id: 6,
      title: 'Consegna dei ricordi digitali',
      description: 'Ricevi il tuo ricordo digitale in 7–10 giorni. Se hai scelto la restituzione dei lavoretti, ti contatterò per concordare data e orario.'
    }
  ];

  return (
    <div className={styles.hiwContainer}>
      <h2 className={styles.sectionTitle}>Come funziona</h2>
      <p className={styles.sectionSubtitle}>Il processo è semplice e veloce</p>

      <div className={styles.timeline}>
        {steps.map((step) => (
          <div key={step.id} className={styles.timelineItem}>
            <div className={styles.timelineMarker}>
              <div className={styles.circle}>{step.id}</div>
            </div>
            <div className={styles.timelineContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              {step.description && <p className={styles.stepDesc}>{step.description}</p>}
              {step.details && step.details.length > 0 && (
                <ul className={styles.stepDetails}>
                  {step.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
