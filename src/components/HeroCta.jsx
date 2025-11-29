import React, { useState } from 'react';
import OrderForm from './forms/OrderForm.jsx';
import Modal from './Modal.jsx';

const HeroCta = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);

  const openOrderForm = (e) => {
    e.preventDefault();
    setShowOrderForm(true);
  };

  const closeOrderForm = () => {
    setShowOrderForm(false);
  };

  return (
    <>
      <div className="cta-container">
        <a href="#" className="cta-button" onClick={openOrderForm}>
          PRENOTA
        </a>
      </div>
      <Modal isOpen={showOrderForm} onClose={closeOrderForm}>
        <OrderForm />
      </Modal>
    </>
  );
};

export default HeroCta;
