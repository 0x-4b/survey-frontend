import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import CustomButton from './CustomButton';
import '../styles/HomePage.css';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [language, setLanguage] = useState(() => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage ? storedLanguage : 'en'; // Default to 'en' if nothing is stored
  });

  const navigate = useNavigate();

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSurveyButtonClick = () => {
    navigate('/survey');
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); // Save to localStorage
  };

  return (
    <div className="homepage">
      <h1 className="homepage-title">
        {language === 'en' ? 'Survey on Vaping' : 'استبيان عن التدخين الإلكتروني'}
      </h1>
      <p className="homepage-description">
        {language === 'en'
          ? 'We appreciate your feedback. Please take a moment to participate in our vaping survey.'
          : 'نقدر تعليقاتك. يرجى تخصيص بعض الوقت للمشاركة في استبيان التدخين الإلكتروني.'}
      </p>

      {/* Language Toggle Button */}
      <CustomButton
        text={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
        onClick={toggleLanguage}
        className="language-toggle"
      />

      {/* Survey Button */}
      <CustomButton
        text={language === 'en' ? 'Take the Survey' : 'ابدأ الاستبيان'}
        onClick={handleSurveyButtonClick}
        className="survey-btn"
      />

      {/* Modal */}
      {isModalOpen && (
        <Modal
          message={modalMessage}
          onClose={closeModal}
          isLoading={false}
          language={language}
        />
      )}
    </div>
  );
};

export default HomePage;
