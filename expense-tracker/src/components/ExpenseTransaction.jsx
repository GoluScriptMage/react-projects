import React from 'react';

const ExpenseTransaction = ({ expenseTrans }) => (
  <div className="flex items-center justify-end">
    <span className="text-red-400 font-semibold text-lg md:text-xl mr-2 font-sans">Expense</span>
    <span className="bg-red-500/20 text-red-300 font-bold px-3 py-1 rounded-lg shadow-sm ml-2 font-sans">
      {expenseTrans}
    </span>
  </div>
);

export default ExpenseTransaction;