import React from 'react';

function CustomModal({ isOpen, closeModal, children }) {
  if (!isOpen) return null;

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <button className="closeButton" onClick={closeModal}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default CustomModal;

