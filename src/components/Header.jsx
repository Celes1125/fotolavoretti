import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
       
        <nav className={styles.nav}>
           <a href="/" className={styles.logoLink}>
            <img src="/logo.png" alt="Fotolavoretti Logo" className={styles.logo} />
            <p>fotolavoretti</p>
          </a>
          <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
          <ul className={`${styles.navList} ${isOpen ? styles.open : ''}`}>
            <li><a href="#product-description" onClick={toggleMenu}>Servizi</a></li>
            <li><a href="#how-it-works" onClick={toggleMenu}>Come funziona</a></li>
            <li><a href="#pricing-packages" onClick={toggleMenu}>Prezzi</a></li>
            <li><a href="#faqs" onClick={toggleMenu}>FAQ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
