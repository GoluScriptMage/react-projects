import React, { useState } from 'react';
import { getQuestions } from '../../data/questions';
import QuestionCard from '../shared/QuestionCard';
import ResultDisplay from '../shared/ResultDisplay';
import { calculateCompatibility } from '../../utils/scoring';

/**
 * Love Calculator Component
 * @param {Object} props - Component props
 * @param {string} props.userName - User's name
 * @param {string} props.targetGender - Gender preference
 */
const LoveCalculator = ({ userName = 'friend', targetGender = 'anyone' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState(null);
  
  const questions = getQuestions('love', userName, targetGender);
  
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = {
      questionId: questions[questionIndex].id,
      optionId: questions[questionIndex].options[optionIndex].id,
      score: questions[questionIndex].options[optionIndex].points
    };
    setAnswers(newAnswers);
    
    // Move to next question or show results
    if (questionIndex < questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      calculateResults(newAnswers);
    }
  };
  
  const calculateResults = (answers) => {
    const result = calculateCompatibility(answers, 'love');
    setResult(result);
    setIsComplete(true);
  };
  
  const resetCalculator = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setResult(null);
  };
  
  const shareResults = () => {
    // Implement sharing functionality
    alert('Sharing results is not implemented yet');
  };
  
  if (isComplete && result) {
    return (
      <ResultDisplay
        percentage={result.percentage}
        category={result.category}
        breakdown={result.breakdown}
        calculatorType="love"
        onReset={resetCalculator}
        onShare={shareResults}
      />
    );
  }
  
  const currentQ = questions[currentQuestion];
  
  return (
    <QuestionCard
      question={currentQ.question}
      options={currentQ.options}
      selectedAnswer={answers[currentQuestion] ? 
        currentQ.options.findIndex(opt => opt.id === answers[currentQuestion].optionId) : 
        null}
      onAnswerSelect={(optionIndex) => handleAnswerSelect(currentQuestion, optionIndex)}
      questionNumber={currentQuestion + 1}
      totalQuestions={questions.length}
      calculatorType="love"
      englishHint={currentQ.englishHint}
    />
  );
};

export default LoveCalculator;
