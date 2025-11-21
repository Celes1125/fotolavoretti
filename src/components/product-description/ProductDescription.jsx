import React, { useState, useEffect, useCallback } from 'react';
import styles from './ProductDescription.module.css';

const ProductDescription = () => {
  const [sheets, setSheets] = useState([]);
  const totalImages = 16;

  const formatImageName = useCallback((num) => {
    if (num > totalImages) return '';
    const padded = num.toString().padStart(3, '0');
    return `/gallery/${padded}.png`;
  }, [totalImages]);

  const generateSheets = useCallback(() => {
    const newSheets = [];
    let idCounter = 0;
    for (let i = 1; i <= totalImages; i += 2) {
      newSheets.push({
        id: idCounter++,
        frontImage: formatImageName(i),
        backImage: formatImageName(i + 1),
        flipped: false
      });
    }
    setSheets(newSheets);
  }, [formatImageName, totalImages]);

  useEffect(() => {
    generateSheets();
  }, [generateSheets]);

  const togglePage = useCallback((index) => {
    setSheets(prevSheets => {
      const newSheets = [...prevSheets];
      const sheet = newSheets[index];

      if (!sheet.flipped) {
        const previousSheet = newSheets[index - 1];
        if (index === 0 || (previousSheet && previousSheet.flipped)) {
          sheet.flipped = true;
        }
      } else {
        const nextSheet = newSheets[index + 1];
        if (!nextSheet || !nextSheet.flipped) {
          sheet.flipped = false;
        }
      }
      return newSheets;
    });
  }, []);

  const calculateZIndex = useCallback((index, isFlipped) => {
    const total = sheets.length;
    if (isFlipped) {
      return index + 1;
    } else {
      return total - index + 1;
    }
  }, [sheets.length]);

  return (
    <>
      <p>Un fotolavoretto è il modo più semplice per conservare davvero i lavoretti scolastici di tuo figlio.</p>
      <p>Prima che carta e colori si rovinino o vadano persi, </p>
      <p>li fotografo, li organizzo e li trasformo in un ricordo digitale che dura negli anni.</p>

      <div className={styles.bookStage}>
        <div className={styles.bookContainer}>
          {sheets.map((sheet, i) => (
            <div
              key={sheet.id}
              className={`${styles.sheet} ${sheet.flipped ? styles.flipped : ''}`}
              style={{ zIndex: calculateZIndex(i, sheet.flipped) }}
              onClick={() => togglePage(i)}
            >
              <div className={`${styles.page} ${styles.front}`}>
                <img src={sheet.frontImage} alt="Front Page" />
              </div>

              <div className={`${styles.page} ${styles.back}`}>
                <img src={sheet.backImage} alt="Back Page" />
              </div>
            </div>
          ))}
        </div>
        <p className={styles.helpText}>Toca la esquina de la página para pasar</p>
      </div>
    </>
  );
};

export default ProductDescription;
