import React from "react";
import ExpenseItem from "./ExpenseItem";
import { useState } from "react";

const Expenselist = ({ expense, onExpenseDelete, onYearFilter, onUpdatedYear }) => {

  const [currYear, setcurrYear] = useState(new Date().getFullYear());

  const handleYearChange = (e) => {
    setcurrYear(Number(e.target.value));
    onUpdatedYear(Number(e.target.value));
    // Logic to filter expenses by year can be added here if needed
  }

  console.log("Current Year:", currYear);

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-6 transition-colors duration-500 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Sort By
        </span>
        <select onChange={handleYearChange}  className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition">
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>
      <div
        className={`space-y-4 ${
          expense.length > 5
            ? "max-h-96 overflow-y-auto custom-scroll"
            : ""
        }`}
      >
        {expense.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No expenses found.
          </p>
        )}
        {expense.length > 0 &&
          onYearFilter(currYear, expense).map((exp) => (
            <ExpenseItem
              key={exp.id}
              onDelete={() => onExpenseDelete(exp.id)}
              expense={exp}
            />
          ))}
      </div>
      {/* Animation keyframes and custom scrollbar */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both;
          }
          .custom-scroll::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #3b82f6 40%, #6366f1 100%);
            border-radius: 8px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 8px;
          }
          .dark .custom-scroll::-webkit-scrollbar-track {
            background: #1f2937;
          }
          .dark .custom-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #2563eb 40%, #818cf8 100%);
          }
        `}
      </style>
    </div>
  );
};

export default Expenselist;
