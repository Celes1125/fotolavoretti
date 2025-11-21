import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <img src="/logo.svg" alt="Fotolavoretti Logo" className={styles.logo} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
