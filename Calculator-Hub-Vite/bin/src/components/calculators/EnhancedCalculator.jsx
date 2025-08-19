import React, { useState, useEffect } from 'react';
import { getQuestions, analyzeScoreTags } from '../../data/questions';
import { calculateScore, getEnhancedResultMessage } from '../../utils/scoring';

/**
 * Enhanced Calculator Component
 * 
 * This component demonstrates how to use the enhanced questions and scoring system
 * that includes the "missing flavors" questions and personality trait analysis.
 */
function EnhancedCalculator({ calculatorType, userName = 'friend' }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load questions when component mounts or calculator type changes
  useEffect(() => {
    // Get questions for this calculator type
    const loadedQuestions = getQuestions(calculatorType, userName);
    setQuestions(loadedQuestions);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setLoading(false);
  }, [calculatorType, userName]);

  // Handle answer selection
  const handleAnswer = (questionId, optionId, points) => {
    const newAnswers = [...answers, { questionId, optionId, points }];
    setAnswers(newAnswers);

    // Move to next question or show result if done
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      showResult(newAnswers);
    }
  };

  // Calculate and display result
  const showResult = (finalAnswers) => {
    // Calculate overall score
    const score = calculateScore(finalAnswers);
    
    // Analyze personality traits based on score tags
    const personalityTraits = analyzeScoreTags(finalAnswers, questions);
    
    // Get enhanced result message with personality insights
    const resultData = getEnhancedResultMessage(
      score,
      calculatorType,
      userName,
      personalityTraits
    );
    
    setResult(resultData);
  };

  // Restart the quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (result) {
    return (
      <div className="result-container">
        <h2 className="result-title">{result.title}</h2>
        <div className="result-score">Score: {result.score}%</div>
        <div className="result-category">Category: {result.category}</div>
        
        <div className="result-message">{result.message}</div>
        
        {/* Display enhanced personality insights if available */}
        {result.enhancedMessage && (
          <div className="enhanced-message">
            <h3>Personality Insight:</h3>
            <p>{result.enhancedMessage}</p>
          </div>
        )}
        
        {/* Display dominant traits if available */}
        {result.dominantTraits && result.dominantTraits.length > 0 && (
          <div className="dominant-traits">
            <h3>Your Key Traits:</h3>
            <ul>
              {result.dominantTraits.map((trait, index) => (
                <li key={index}>
                  <strong>{trait.trait}:</strong> {trait.score}%
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="result-strengths">
          <h3>Your Strengths:</h3>
          <ul>
            {result.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
        
        <div className="result-improvements">
          <h3>Areas for Growth:</h3>
          <ul>
            {result.improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </div>
        
        {result.advice && (
          <div className="result-advice">
            <h3>Advice:</h3>
            <p>{result.advice}</p>
          </div>
        )}
        
        <button className="restart-button" onClick={restartQuiz}>
          Take Quiz Again
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      <div className="question-number">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      
      <div className="question">
        <h2>{question.question}</h2>
        {question.englishHint && (
          <div className="english-hint">{question.englishHint}</div>
        )}
      </div>
      
      <div className="options">
        {question.options.map((option) => (
          <button
            key={option.id}
            className="option-button"
            onClick={() => handleAnswer(question.id, option.id, option.points)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EnhancedCalculator;
