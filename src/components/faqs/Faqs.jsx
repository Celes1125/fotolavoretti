import React, { useState } from 'react';
import styles from './Faqs.module.css';

const Faqs = () => {
  const [faqs, setFaqs] = useState([
    {
      question: '1. Quali sono gli orari di risposta?',
      isOpen: false,
      details: [
        { label: 'Instagram DM:', text: 'tra le 09:00 e le 12:00.' },
        { label: 'Email:', text: 'risposta entro 24 ore.' }
      ]
    },
    {
      question: '2. Quali sono i tempi di consegna?',
      isOpen: false,
      details: [
        { label: 'Standard:', text: '7–10 giorni dal ricevimento dei lavoretti. Animazioni 2-5 giorni.' },
        { label: 'Alta richiesta:', text: 'in caso di picchi, avviso anticipato per un possibile prolungamento di 2–3 giorni.' }
      ]
    },
    {
      question: '3. Come funziona il ritiro e la restituzione dei lavoretti?',
      isOpen: false,
      details: [
        { label: 'Zona coperta:', text: 'Cuvio e Cuveglio.' },
        { label: 'Ritiro:', text: 'su appuntamento, generalmente all’uscita della scuola (Cuveglio) o a domicilio se più comodo.' },
        { label: 'Restituzione:', text: 'Se vuoi conservarli, te li riconsegno subito. Se non vuoi tenerli, me ne occupo io in modo responsabile, senza costi aggiuntivi.' }
      ]
    },
    {
      question: '4. Posso inviare solo le foto dei lavoretti?',
      isOpen: false,
      details: [
        { label: 'Sì, è possibile.', text: 'La qualità finale può risultare leggermente inferiore rispetto agli originali.' },
        { text: 'Per chi si trova fuori da Cuveglio, questa è l’unica modalità disponibile.' }
      ]
    },
    {
      question: '5. Quali sono i metodi di pagamento?',
      isOpen: false,
      details: [
        { text: 'Contanti.' },
        { text: 'Pagamento elettronico tramite link.' }
      ]
    }
  ]);

  const toggleFaq = (index) => {
    setFaqs(faqs.map((faq, i) => 
      i === index ? { ...faq, isOpen: !faq.isOpen } : faq
    ));
  };

  return (
    <div className={styles.faqContainer}>
      <h2 className={styles.faqTitle}>FAQ – Domande Frequenti</h2>
      
      <div className={styles.faqList}>
        {faqs.map((item, i) => (
          <div key={i} className={`${styles.faqItem} ${item.isOpen ? styles.open : ''}`}>
            <button className={styles.faqQuestion} onClick={() => toggleFaq(i)}>
              <span>{item.question}</span>
              <span className={styles.arrowIcon}>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>

            <div className={styles.faqAnswerWrapper} style={{ maxHeight: item.isOpen ? '600px' : '0' }}>
              <div className={styles.faqAnswer}>
                <ul>
                  {item.details.map((detail, j) => (
                    <li key={j}>
                      {detail.label && <strong className={styles.detailLabel}>{detail.label}</strong>}
                      {detail.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
