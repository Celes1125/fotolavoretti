import React, { useState, useEffect } from 'react';
import styles from './ProductDescription.module.css';

const ProductDescription = () => {
  const totalImages = 16;
  const [images, setImages] = useState([]);

  // Generate image paths once
  useEffect(() => {
    const imagePaths = [];
    for (let i = 1; i <= totalImages; i++) {
      const padded = i.toString().padStart(3, '0');
      imagePaths.push(`/gallery/${padded}.png`);
    }
    setImages(imagePaths);
  }, [totalImages]);

  return (
    <>
      <p className={styles.descriptionText}>Un fotolavoretto è il modo più semplice per conservare davvero i lavoretti scolastici di tuo figlio. Prima che carta e colori si rovinino o vadano persi, li fotografo, li organizzo e li trasformo in un ricordo digitale che dura negli anni.</p>

      <div className={styles.galleryContainer}>
        {images.map((src, index) => (
          <div key={index} className={styles.galleryItem}>
            <img src={src} alt={`Gallery image ${index + 1}`} className={styles.galleryImage} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDescription;
