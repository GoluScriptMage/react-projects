import React from 'react';

/**
 * A progress bar component for tracking question progress
 * @param {Object} props - Component props
 * @param {number} props.current - Current question number
 * @param {number} props.total - Total number of questions
 * @param {string} [props.calculatorType] - Type of calculator (love, friendship, career, personality)
 */
const ProgressBar = ({ current, total, calculatorType = 'love' }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
      <div
        className={`h-full bg-${calculatorType}-500`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
