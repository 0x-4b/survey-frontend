import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import Modal from './Modal';
import Loading from './Loading';
import '../styles/Survey.css';
import questionsData from '../data/questions'; // Import questions data

const Survey = () => {
  const [formData, setFormData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: '' });
  const [language, setLanguage] = useState('en'); // Default language is English

  const navigate = useNavigate();

  const questions = useMemo(
    () =>
      questionsData.map((question) => ({
        ...question,
        questionText: question.question[language], // Toggle between English/Arabic question
        options: question.options.map((option) => ({
          ...option,
          optionText: option[language], // Toggle between English/Arabic options
        })),
      })),
    [language]
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

    if (!currentAnswer || (Array.isArray(currentAnswer) && currentAnswer.length === 0)) {
      setModal({
        isOpen: true,
        message: language === 'en' ? 'Please answer this question before proceeding.' : 'الرجاء الإجابة على هذا السؤال قبل المتابعة.',
      });
      return;
    }

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
      (q) => q.required && (!formData[q.name] || (Array.isArray(formData[q.name]) && formData[q.name].length === 0))
    );

    if (unansweredQuestions.length > 0) {
      setModal({
        isOpen: true,
        message: language === 'en' ? 'Please answer all required questions before submitting the survey.' : 'الرجاء الإجابة على جميع الأسئلة المطلوبة قبل إرسال الاستبيان.',
      });
      return;
    }

    const responses = filteredQuestions.map((question) => {
      if (formData[question.name]) {
        return {
          questionId: question.name,
          answer: Array.isArray(formData[question.name])
            ? formData[question.name]
            : [formData[question.name]],
        };
      }
      return null;
    }).filter(Boolean);

    const comments = formData.comments || '';

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/api/surveys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vape: formData.vape, responses, comments }),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setSubmitted(true);
      setModal({
        isOpen: true,
        message: language === 'en' ? 'Survey submitted successfully!' : 'تم إرسال الاستبيان بنجاح!',
      });
    } catch (error) {
      console.error('Error submitting survey:', error);
      setModal({
        isOpen: true,
        message: language === 'en' ? 'There was an error submitting the survey. Please try again.' : 'حدث خطأ أثناء إرسال الاستبيان. يرجى المحاولة مرة أخرى.',
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
    () => questions.filter((q) => q.renderCondition(formData)),
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
              {filteredQuestions[currentQuestionIndex].questionText}
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
                <label key={option.value}>
                  <input
                    type={filteredQuestions[currentQuestionIndex].isCheckbox ? 'checkbox' : 'radio'}
                    name={filteredQuestions[currentQuestionIndex].name}
                    value={option.value}
                    checked={
                      Array.isArray(formData[filteredQuestions[currentQuestionIndex].name])
                        ? formData[filteredQuestions[currentQuestionIndex].name].includes(option.value)
                        : formData[filteredQuestions[currentQuestionIndex].name] === option.value
                    }
                    onChange={(e) =>
                      handleInputChange(e, filteredQuestions[currentQuestionIndex].name, filteredQuestions[currentQuestionIndex].isCheckbox)
                    }
                  />
                  {option.optionText}
                </label>
              ))
            )}
          </div>

          <div className="survey-navigation">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              {language === 'en' ? 'Previous' : 'السابق'}
            </button>
            {currentQuestionIndex === filteredQuestions.length - 1 ? (
              <button className="submit" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (language === 'en' ? 'Submitting...' : 'إرسال...') : (language === 'en' ? 'Submit' : 'إرسال')}
              </button>
            ) : (
              <button onClick={handleNext}>
                {language === 'en' ? 'Next' : 'التالي'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Survey;
