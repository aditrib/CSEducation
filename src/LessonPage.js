import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const LessonPage = ({ lesson, onBack }) => {
  const [answers, setAnswers] = useState({});
  const [freeResponses, setFreeResponses] = useState({});

  const handleMultipleChoiceAnswer = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleFreeResponseAnswer = (questionId, response) => {
    setFreeResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Answers:', answers);
    console.log('Free Responses:', freeResponses);
  };

  return (
    <div className="lesson-page">
      <button
        onClick={onBack}
        className="back-button"
      >
        <ArrowLeft className="icon" />
        <span>Back to Course</span>
      </button>

      <div className="lesson-content-container">
        <h1 className="lesson-title">{lesson.title}</h1>
        
        {/* Introduction */}
        <div className="lesson-section">
          <h2>Introduction</h2>
          <p>{lesson.content.introduction}</p>
        </div>

        {/* Content Sections */}
        {lesson.content.sections.map((section, index) => (
          <div key={index} className="lesson-section">
            <h2>{section.title}</h2>
            <div className="section-content">
              {section.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Assignments Section */}
        <div className="assignments-section">
          <h2>Assignments</h2>
          {lesson.content.assignments?.map((assignment, index) => (
            <div key={index} className="assignment-item">
              <p className="question">{assignment.question}</p>
              
              {assignment.type === 'multiple-choice' ? (
                <div className="options-container">
                  {assignment.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="option-label">
                      <input
                        type="radio"
                        name={assignment.id}
                        checked={answers[assignment.id] === optionIndex}
                        onChange={() => handleMultipleChoiceAnswer(assignment.id, optionIndex)}
                      />
                      <span className="option-text">{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="free-response-container">
                  <textarea
                    value={freeResponses[assignment.id] || ''}
                    onChange={(e) => handleFreeResponseAnswer(assignment.id, e.target.value)}
                    placeholder="Enter your response here..."
                    rows={6}
                    className="response-textarea"
                  />
                </div>
              )}
            </div>
          ))}
          
          <button 
            className="submit-button"
            onClick={handleSubmit}
          >
            Submit Assignments
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;