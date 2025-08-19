import React from 'react';
import { personalizeText } from '../../data/questions';
import ProgressBar from './ProgressBar';

/**
 * A reusable component for displaying calculator questions
 * @param {Object} props - Component props
 * @param {string} props.question - Question text
 * @param {Array} props.options - Answer options
 * @param {number|null} props.selectedAnswer - Index of selected answer
 * @param {Function} props.onAnswerSelect - Function to call when answer is selected
 * @param {number} props.questionNumber - Current question number
 * @param {number} props.totalQuestions - Total number of questions
 * @param {string} [props.calculatorType] - Type of calculator
 * @param {string} [props.englishHint] - English translation/hint for the question
 */
const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
  calculatorType,
  englishHint,
}) => {
  return (
    <div className={`question-card bg-${calculatorType || 'primary'}-gradient`}>
      <div className="question-header">
        <span className="question-number">
          Question {questionNumber} of {totalQuestions}
        </span>
        <ProgressBar current={questionNumber} total={totalQuestions} calculatorType={calculatorType} />
      </div>

      <h3 className="question-text">{question}</h3>
      {englishHint && <p className="english-hint">{englishHint}</p>}

      <div className="options-grid">
        {options.map((option, index) => (
          <button
            key={option.id || index}
            className={`option-button ${
              selectedAnswer === index ? "selected" : ""
            }`}
            onClick={() => onAnswerSelect(index)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
