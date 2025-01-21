import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
import Loading from './Loading';
import '../styles/Survey.css';

const Survey = () => {
  const [formData, setFormData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: '' });

  const navigate = useNavigate();

  const questions = [
    { question: "Do you vape?", options: ["Yes", "No"], name: "vape", renderCondition: () => true },
    { question: "Why did you start vaping?", options: ["Curiosity", "Stress Relief", "Quitting Smoking", "Peer Pressure", "Availability", "Other"], name: "whyVape", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
    { question: "What emotions do you associate with vaping?", options: ["Relaxation", "Stress", "Excitement", "Sadness", "Neutral"], name: "emotionsVaping", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
    { question: "How often do you vape daily?", options: ["Less than 5 times", "5–10 times", "11–20 times", "More than 20 times"], name: "vapeFrequency", renderCondition: () => formData.vape === "Yes" },
    { question: "Do you believe vaping has improved your quality of life?", options: ["Yes", "No", "Not Sure"], name: "vapingImprovedLife", renderCondition: () => formData.vape === "Yes" },
    { question: "What social settings do you usually vape in?", options: ["Parties", "With Friends", "Alone", "At Work/School", "Public Spaces", "Other"], name: "vapeSocialSettings", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
    { question: "What are the primary reasons you continue to vape?", options: ["Habit", "Stress Relief", "Enjoyment", "Social Influence", "Other"], name: "reasonsContinueVaping", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
    { question: "Have you experienced any negative effects from vaping?", options: ["Coughing", "Breathing Issues", "Increased Stress", "Dependency", "None", "Other"], name: "negativeEffectsVaping", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
    { question: "Do you think vaping is more harmful than smoking?", options: ["Yes", "No", "Not Sure"], name: "moreHarmfulThanSmoking", renderCondition: () => formData.vape === "Yes" },
    { question: "Have you ever tried quitting vaping?", options: ["Yes", "No", "Currently Trying"], name: "triedQuittingVaping", renderCondition: () => formData.vape === "Yes" },
    { question: "What is your opinion on vaping?", options: ["Positive", "Neutral", "Negative"], name: "opinionOnVaping", renderCondition: () => formData.vape === "No" },
    { question: "What concerns you the most about vaping?", options: ["Health Risks", "Addiction", "Social Influence", "Accessibility to Youth", "Cost", "None"], name: "concernsAboutVaping", renderCondition: () => formData.vape === "No", isCheckbox: true },
    { question: "Do you feel peer pressure to start vaping?", options: ["Yes", "No", "Sometimes"], name: "peerPressureVaping", renderCondition: () => formData.vape === "No" },
    { question: "Have you ever tried vaping out of curiosity?", options: ["Yes", "No"], name: "triedVapingCuriosity", renderCondition: () => formData.vape === "No" },
    { question: "What do you think are the main reasons people vape?", options: ["Stress Relief", "Social Influence", "Quitting Smoking", "Curiosity", "Other"], name: "reasonsPeopleVape", renderCondition: () => formData.vape === "No", isCheckbox: true },
    { question: "How strong is the social influence of vaping in your environment?", options: ["High", "Moderate", "Low", "None"], name: "socialInfluenceVaping", renderCondition: () => formData.vape === "No" },
    { question: "Would you ever consider vaping in the future?", options: ["Yes", "No", "Not Sure"], name: "considerVapingFuture", renderCondition: () => formData.vape === "No" },
    { question: "Do you think vaping is a safer alternative to smoking?", options: ["Yes", "No", "Not Sure"], name: "vapingSaferThanSmoking", renderCondition: () => formData.vape === "No" },
    { question: "If a friend offered you a vape, would you accept it?", options: ["Yes", "No", "Depends on the Situation"], name: "acceptVapeOffer", renderCondition: () => formData.vape === "No" },
    { question: "Any additional comments or thoughts?", name: "comments", renderCondition: () => true, isTextarea: true, optional: true },
  ];

  const handleInputChange = (event, questionName, isCheckbox) => {
    const { value, checked } = event.target;

    setFormData((prev) => {
      if (isCheckbox) {
        const currentValues = prev[questionName] || [];
        return {
          ...prev,
          [questionName]: checked
            ? [...currentValues, value]
            : currentValues.filter((v) => v !== value),
        };
      }
      return { ...prev, [questionName]: value };
    });
  };

  const handleNext = () => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const currentAnswer = formData[currentQuestion.name];

    if (currentQuestionIndex === 0 && !currentAnswer) {
      setModal({
        isOpen: true,
        message: "Please answer the first question: Do you vape?",
      });
      return;
    }

    if (currentQuestion.required && (!currentAnswer || currentAnswer.length === 0)) {
      setModal({
        isOpen: true,
        message: "Please answer this question before proceeding.",
      });
      return;
    }

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const surveyData = {
      vape: formData.vape,
      responses: Object.keys(formData)
        .filter((key) => key !== 'comments' || formData[key] !== "")
        .map((key) => ({
          questionId: key,
          answer: Array.isArray(formData[key]) ? formData[key] : [formData[key]],
        })),
      comments: formData.comments || "",
    };

    try {
      const response = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('There was an error submitting the survey. Please try again.');
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);

  const filteredQuestions = questions.filter((q) => q.renderCondition());

  const isCurrentQuestionAnswered = () => {
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const currentAnswer = formData[currentQuestion.name];
    return currentQuestion.isCheckbox
      ? Array.isArray(currentAnswer) && currentAnswer.length > 0
      : currentAnswer !== undefined && currentAnswer !== '';
  };

  const isNextButtonDisabled = !isCurrentQuestionAnswered();

  if (submitted) {
    return (
      <Modal
        message="Survey submitted successfully!"
        onClose={() => navigate('/')}
      />
    );
  }

  return (
    <div className="survey-form">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {modal.isOpen && (
            <Modal
              message={modal.message}
              onClose={() => setModal({ isOpen: false, message: '' })}
            />
          )}
          {isSubmitting && <Modal message="Processing..." isLoading />}
          <ProgressBar
            progress={
              filteredQuestions.length === 1
                ? 100
                : (currentQuestionIndex / (filteredQuestions.length - 1)) * 100
            }
          />

          <div className="question-container">
            <h2>{filteredQuestions[currentQuestionIndex].question}</h2>
            {filteredQuestions[currentQuestionIndex].isTextarea ? (
              <textarea
                name={filteredQuestions[currentQuestionIndex].name}
                value={formData[filteredQuestions[currentQuestionIndex].name] || ''}
                onChange={(e) =>
                  handleInputChange(e, filteredQuestions[currentQuestionIndex].name, false)
                }
                placeholder="Write your comments here..."
              />
            ) : (
              <div className="options">
                {filteredQuestions[currentQuestionIndex].options.map((option, index) => (
                  <label key={index}>
                    <input
                      type={
                        filteredQuestions[currentQuestionIndex].isCheckbox
                          ? 'checkbox'
                          : 'radio'
                      }
                      name={filteredQuestions[currentQuestionIndex].name}
                      value={option}
                      checked={
                        filteredQuestions[currentQuestionIndex].isCheckbox
                          ? formData[filteredQuestions[currentQuestionIndex].name]?.includes(option)
                          : formData[filteredQuestions[currentQuestionIndex].name] === option
                      }
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          filteredQuestions[currentQuestionIndex].name,
                          filteredQuestions[currentQuestionIndex].isCheckbox
                        )
                      }
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={isNextButtonDisabled}
            >
              Next
            </button>
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Survey;
