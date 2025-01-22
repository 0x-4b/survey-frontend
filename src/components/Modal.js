import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Modal.css';

const Modal = ({ message, onClose, isLoading }) => {
  if (!message) return null; // Prevent rendering when no message is set

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{isLoading ? "Processing..." : message}</p>
        
        {/* Close Button (X) */}
        <button className="modal-close" onClick={onClose}>
           {/* "×" is the HTML entity for the "X" symbol */}
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Modal;
