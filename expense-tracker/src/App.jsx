import React, { useState } from "react";
import IncomeTransaction from "./components/IncomeTransaction";
import ExpenseTransaction from "./components/ExpenseTransaction";
import AddTransaction from "./components/AddTransaction";
import TranctionHistory from "./components/TranctionHistory";

// Add this font to your index.html or Tailwind config for best results:
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />

const App = () => {
  const [allTransactions, setAllTransactions] = useState([
    { name: "Salary", amount: 3000, type: "income" },
    { name: "Groceries", amount: 150, type: "expense" },
    { name: "Freelance Project", amount: 800, type: "income" },
    { name: "Electricity Bill", amount: 120, type: "expense" },
  ]);

  const updateAllTransactions = (newTransaction) => {
    setAllTransactions((prevTrans) => [...prevTrans, newTransaction]);
  };

  const transactionFilter = () => {
    const income = allTransactions.filter((trans) => trans.type === "income");
    const expense = allTransactions.filter((trans) => trans.type === "expense");
    return { income, expense };
  };

  const { income, expense } = transactionFilter();

  const calcTotal = (trans) => {
    return trans.reduce((sum, item) => sum + Number(item.amount), 0);
  };

  const formatter = (item) => {
    return item.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  const handleDeleteTransaction = (item) => {
    setAllTransactions(allTransactions.filter(trans => trans.name !== item.name));
  }

  const balance = calcTotal(income) - calcTotal(expense);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 font-sans"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Headings */}
      <div className="mb-6 text-center px-2">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight font-sans">
          Expense Tracker
        </h1>
        <h2 className="text-lg md:text-xl text-gray-300 mt-2 font-medium tracking-wide font-sans">
          Track your spending
        </h2>
      </div>
      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 w-full max-w-6xl px-2">
        {/* Main Card */}
        <div className="flex-1 flex flex-col items-center w-full">
          <div className="backdrop-blur-lg bg-white/15 border border-white/20 rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-md animate-fade-in transition-all duration-500">
            <h3 className="text-xl md:text-2xl text-gray-100 mb-8 text-center font-bold font-sans">
              Your Balance <br />
              <span className="inline-block mt-2 px-4 py-2 bg-yellow-300/90 text-gray-900 font-semibold rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 font-sans">
                {formatter(balance)}
              </span>
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between gap-4">
                <IncomeTransaction incomeTrans={formatter(calcTotal(income))} />
                <ExpenseTransaction expenseTrans={formatter(calcTotal(expense))} />
              </div>
              <AddTransaction updateTransactions={updateAllTransactions} />
            </div>
          </div>
        </div>
        {/* Transaction History Card */}
        <div className="w-full md:w-auto md:max-w-xs mt-6 md:mt-0 animate-fade-in-right transition-all duration-500">
          <TranctionHistory transactions={allTransactions} formatterAmount={formatter} handleDeleteTrans={handleDeleteTransaction}/>
        </div>
      </div>
    </div>
  );
};

export default App;
