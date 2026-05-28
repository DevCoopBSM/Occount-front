import React, { useState } from 'react';
import Modal from 'components/Modal';

const Stock = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={modalOpen}>
        <button onClick={closeModal}>취소</button>
      </Modal>
    </>
  );
};

export default Stock;
