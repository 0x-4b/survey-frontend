import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Modal from './Modal';
import '../styles/HomePage.css';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSurveyButtonClick = () => {
    navigate('/survey'); // Programmatically navigate to the survey page
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">Survey on Vaping</h1>
      <p className="homepage-description">We appreciate your feedback. Please take a moment to participate in our vaping survey.</p>

      {/* Change Link to Button with hover styling */}
      <button 
        className="btn survey-btn" 
        onClick={handleSurveyButtonClick}
      >
        Take the Survey
      </button>

      {/* Modal rendering */}
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default HomePage;
