import { useState, useEffect } from 'react';
import Modal from '../Modal';
import ChristmasOrderForm from './ChristmasOrderForm';

export default function ChristmasOrderModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('1');

  useEffect(() => {
    console.log('ChristmasOrderModal: Mounting and attaching event listener.');
    const handleOpenModal = (e) => {
      setSelectedOption(e.detail.option);
      setIsModalOpen(true);
    };

    document.addEventListener('open-christmas-modal', handleOpenModal);

    return () => {
      document.removeEventListener('open-christmas-modal', handleOpenModal);
    };
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={handleClose}>
      <ChristmasOrderForm selectedOption={selectedOption} />
    </Modal>
  );
}
