import React, { useState, useEffect, useRef } from 'react';
import styles from './ProductDescription.module.css';

const ProductDescription = () => {
  const totalImages = 16;
  const [images, setImages] = useState([]);
  const galleryRef = useRef(null);

  useEffect(() => {
    const imagePaths = [];
    for (let i = 1; i <= totalImages; i++) {
      const padded = i.toString().padStart(3, '0');
      imagePaths.push(`/gallery/${padded}.jpg`);
    }
    setImages(imagePaths);
  }, [totalImages]);

  const scroll = (direction) => {
    if (galleryRef.current) {
      // Calculate scroll amount based on the width of one item plus its gap
      const galleryItem = galleryRef.current.querySelector('.' + styles.galleryItem);
      if (galleryItem) {
        const scrollAmount = galleryItem.offsetWidth * 1.5;
        galleryRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      <div id="product-description-text" className={styles.descriptionText}>
        <p>Un FOTOLAVORETTO è il modo più semplice per conservare davvero i lavoretti scolastici di tuo figlio.
        Prima che carta e colori si rovinino o vadano persi, li fotografo, li organizzo e li trasformo in un ricordo digitale che dura negli anni.</p>
        </div>
      
      <div className={styles.galleryWrapper}>
        <button onClick={() => scroll('left')} className={`${styles.navButton} ${styles.prevButton}`}>
          &#10094;
        </button>
        <div className={styles.galleryContainer} ref={galleryRef}>
          {images.map((src, index) => (
            <div key={index} className={styles.galleryItem}>
              <img src={src} alt={`Gallery image ${index + 1}`} className={styles.galleryImage} />
            </div>
          ))}
        </div>
        <button onClick={() => scroll('right')} className={`${styles.navButton} ${styles.nextButton}`}>
          &#10095;
        </button>
      </div>
    </>
  );
};

export default ProductDescription;
