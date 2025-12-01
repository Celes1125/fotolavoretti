import React from "react";
import styles from "./StatusModal.module.css";


const StatusModal = ({ status, message, onClose }) => {
  if (!status) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.logoContainer}>
          <img src='/fotolavoretti_logo.png' alt="Fotolavoretti Logo" />
        </div>
        <p className={`${styles.message} ${styles[status]}`}>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
