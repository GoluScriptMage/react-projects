import React, { useState } from "react";

const Practice = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-900 rounded-lg shadow-lg">
      <div
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        onClick={handleCheckboxChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleCheckboxChange();
          }
        }}
        className="flex items-center space-x-2 text-white cursor-pointer"
      >
        <div
          className={`w-5 h-5 border-2 rounded ${
            isChecked ? "bg-blue-600 border-blue-600" : "bg-gray-700 border-gray-600"
          }`}
        ></div>
        <span>{isChecked ? "Checked" : "Unchecked"}</span>
      </div>
    </div>
  );
};

export default Practice;
