import React from "react";
import { useState } from "react";

const AddExpense = ({ onExpenseUpdate }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: Number,
    date: "",
    id: Math.random().toString(36).substring(2, 9), // Unique ID for each expense
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => {
      return {
        ...prevExpense,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onExpenseUpdate(expense);
    setExpense({
      name: "",
      amount: Number,
      date: "",
      id: Math.random().toString(36).substring(2, 9),
    });
    console.log("Expense added:", expense);
  };

  return (
    <div className="flex items-start justify-center py-8 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6 animate-fade-in transition-colors duration-500
                md:max-w-3xl md:space-y-4"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-4">
          Add New Expense
        </h2>
        {/* First row: Name and Amount */}
        <div className="space-y-4 w-full md:space-y-0 md:flex md:gap-4">
          <div className="md:w-1/2">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-1 font-medium"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              name="name"
              onChange={handleChange}
              value={expense.name}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
              placeholder="Expense name"
            />
          </div>
          <div className="md:w-1/2">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-1 font-medium"
              htmlFor="amount"
            >
              Amount
            </label>
            <input
              onChange={handleChange}
              required
              value={expense.amount}
              type="number"
              id="amount"
              name="amount"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        {/* Second row: Date and Button */}
        <div className="space-y-4 w-full md:space-y-0 md:flex md:gap-4">
          <div className="md:w-1/2">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-1 font-medium"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              required
              onChange={handleChange}
              value={expense.date}
              id="date"
              name="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition"
            />
          </div>
          <div className="md:w-1/2 flex items-end">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
            >
              Add Expense
            </button>
          </div>
        </div>
      </form>
      {/* Animation keyframes */}
      <style>
        {`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(30px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fade-in {
                    animation: fade-in 0.8s cubic-bezier(.4,0,.2,1) both;
                }
                `}
      </style>
    </div>
  );
};

export default AddExpense;
