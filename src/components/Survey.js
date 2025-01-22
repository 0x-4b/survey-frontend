import React, { useState, useEffect, useMemo } from 'react';
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

  const questions = useMemo(
    () => [
      { question: "Do you vape?", options: ["Yes", "No"], name: "vape", renderCondition: () => true, required: true },
      { question: "Why did you start vaping?", options: ["Curiosity", "Stress Relief", "Quitting Smoking", "Peer Pressure", "Availability", "Other"], name: "whyVape", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
      { question: "What emotions do you associate with vaping?", options: ["Relaxation", "Stress", "Excitement", "Sadness", "Neutral"], name: "emotionsVaping", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
      { question: "How often do you vape daily?", options: ["Less than 5 times", "5–10 times", "11–20 times", "More than 20 times"], name: "vapeFrequency", renderCondition: () => formData.vape === "Yes" },
      { question: "Do you believe vaping has improved your quality of life?", options: ["Yes", "No", "Not Sure"], name: "vapingImprovedLife", renderCondition: () => formData.vape === "Yes" },
      { question: "What social settings do you usually vape in?", options: ["Parties", "With Friends", "Alone", "At Work/School", "Public Spaces", "Other"], name: "vapeSocialSettings", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
      { question: "What are the primary reasons you continue to vape?", options: ["Habit", "Stress Relief", "Enjoyment", "Social Influence", "Other"], name: "reasonsContinueVaping", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
      { question: "Have you experienced any negative effects from vaping?", options: ["Coughing", "Breathing Issues", "Increased Stress", "Dependency", "None", "Other"], name: "negativeEffectsVaping", renderCondition: () => formData.vape === "Yes", isCheckbox: true },
      { question: "Do you think vaping is more harmful than smoking?", options: ["Yes", "No", "Not Sure"], name: "moreHarmfulThanSmoking", renderCondition: () => formData.vape === "Yes" },
      { question: "Have you ever tried quitting vaping?", options: ["Yes", "No", "Currently Trying"], name: "triedQuittingVaping", renderCondition: () => formData.vape === "Yes" },
      { question: "What is your opinion on vaping?", options: ["Positive", "Neutral", "Negative"], name: "opinionOnVaping", renderCondition: () => formData.vape === "No", required: true },
      { question: "What concerns you the most about vaping?", options: ["Health Risks", "Addiction", "Social Influence", "Accessibility to Youth", "Cost", "None"], name: "concernsAboutVaping", renderCondition: () => formData.vape === "No", isCheckbox: true },
      { question: "Do you feel peer pressure to start vaping?", options: ["Yes", "No", "Sometimes"], name: "peerPressureVaping", renderCondition: () => formData.vape === "No" },
      { question: "Have you ever tried vaping out of curiosity?", options: ["Yes", "No"], name: "triedVapingCuriosity", renderCondition: () => formData.vape === "No" },
      { question: "What do you think are the main reasons people vape?", options: ["Stress Relief", "Social Influence", "Quitting Smoking", "Curiosity", "Other"], name: "reasonsPeopleVape", renderCondition: () => formData.vape === "No", isCheckbox: true },
      { question: "How strong is the social influence of vaping in your environment?", options: ["High", "Moderate", "Low", "None"], name: "socialInfluenceVaping", renderCondition: () => formData.vape === "No" },
      { question: "Would you ever consider vaping in the future?", options: ["Yes", "No", "Not Sure"], name: "considerVapingFuture", renderCondition: () => formData.vape === "No" },
      { question: "Do you think vaping is a safer alternative to smoking?", options: ["Yes", "No", "Not Sure"], name: "vapingSaferThanSmoking", renderCondition: () => formData.vape === "No" },
      { question: "If a friend offered you a vape, would you accept it?", options: ["Yes", "No", "Depends on the Situation"], name: "acceptVapeOffer", renderCondition: () => formData.vape === "No" },
      { question: "Any additional comments or thoughts?", name: "comments", renderCondition: () => true, isTextarea: true, optional: true },
    ],
    [formData]
  );

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

    // Check if the current question has been answered
    if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
      setModal({
        isOpen: true,
        message: 'Please answer this question before proceeding.',
      });
      return;
    }

    // Find the next valid question index
    const nextIndex = filteredQuestions.findIndex(
      (q, index) => index > currentQuestionIndex && q.renderCondition()
    );

    if (nextIndex !== -1) {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    const prevIndex = filteredQuestions
      .slice(0, currentQuestionIndex)
      .reverse()
      .findIndex((q) => q.renderCondition());

    if (prevIndex !== -1) {
      setCurrentQuestionIndex(currentQuestionIndex - prevIndex - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const unansweredQuestions = filteredQuestions.filter(
      (q) => q.required && (!formData[q.name] || formData[q.name].length === 0)
    );

    if (unansweredQuestions.length > 0) {
      setModal({
        isOpen: true,
        message: 'Please answer all required questions before submitting the survey.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/api/surveys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setSubmitted(true);
      setModal({ isOpen: true, message: 'Survey submitted successfully!' });
    } catch (error) {
      console.error('Error submitting survey:', error);
      setModal({
        isOpen: true,
        message: 'There was an error submitting the survey. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
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

  const filteredQuestions = useMemo(
    () => questions.filter((q) => q.renderCondition()),
    [formData, questions]
  );

  return (
    <div className="survey-container">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {modal.isOpen && (
            <Modal
              message={modal.message}
              onClose={() => setModal({ isOpen: false, message: '' })}
            />
          )}

          <ProgressBar
            progress={
              filteredQuestions.length === 1
                ? 100
                : (currentQuestionIndex / (filteredQuestions.length - 1)) * 100
            }
          />

          <div className="option">
            <h2 id={`question-${currentQuestionIndex}`}>
              {filteredQuestions[currentQuestionIndex].question}
            </h2>
            {filteredQuestions[currentQuestionIndex].isTextarea ? (
              <textarea
                aria-labelledby={`question-${currentQuestionIndex}`}
                value={formData[filteredQuestions[currentQuestionIndex].name] || ''}
                onChange={(e) =>
                  handleInputChange(e, filteredQuestions[currentQuestionIndex].name)
                }
              />
            ) : (
              filteredQuestions[currentQuestionIndex].options.map((option) => (
                <label key={option}>
                  <input
                    type={filteredQuestions[currentQuestionIndex].isCheckbox ? 'checkbox' : 'radio'}
                    name={filteredQuestions[currentQuestionIndex].name}
                    value={option}
                    checked={
                      Array.isArray(formData[filteredQuestions[currentQuestionIndex].name])
                        ? formData[filteredQuestions[currentQuestionIndex].name].includes(option)
                        : formData[filteredQuestions[currentQuestionIndex].name] === option
                    }
                    onChange={(e) =>
                      handleInputChange(e, filteredQuestions[currentQuestionIndex].name, filteredQuestions[currentQuestionIndex].isCheckbox)
                    }
                  />
                  {option}
                </label>
              ))
            )}
          </div>

          <div className="survey-navigation">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            {currentQuestionIndex === filteredQuestions.length - 1 ? (
              <button className="submit" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            ) : (
              <button onClick={handleNext}>Next</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Survey;
