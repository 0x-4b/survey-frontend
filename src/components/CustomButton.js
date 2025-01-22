import React from 'react';
import PropTypes from 'prop-types';
// import '../styles/CustomButton.css'; // Import your custom styles here

const CustomButton = ({ text, onClick, className }) => {
  return (
    <button className={`custom-btn ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string, // Optional className for additional styling
};

CustomButton.defaultProps = {
  className: '', // Default empty string if no className is provided
};

export default CustomButton;
