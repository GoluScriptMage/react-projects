import React from "react";

const TranctionHistory = ({transactions, formatterAmount, handleDeleteTrans}) => {
  return (
    <div className="backdrop-blur-lg bg-white/20 border border-white/20 rounded-3xl shadow-2xl mt-6 md:mt-0 p-6 w-full max-w-md mx-auto animate-fade-in transition-all duration-500 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white font-sans">
          Transaction History
        </h3>
      </div>
      {/* Scrollable list after 5 items */}
      <ul
        className="space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 flex-1"
        style={{
          maxHeight: "320px",
          scrollbarColor: "#374151 #d1d5db", // For Firefox
          scrollbarWidth: "thin",
        }}
      >
        {transactions.map((t, idx) => (
          <li
            key={idx}
            className={`
              flex items-center justify-between bg-gray-800/70 rounded-xl px-5 py-3 shadow
              transition-all duration-300 ease-out animate-fade-in-up
            `}
          >
            <span className="text-gray-200 font-sans pl-4">{t.name}</span>
            <span
              className={`font-bold font-sans ${
                t.type === "income" ? "text-green-400" : "text-red-400"
              }`}
            >
              {formatterAmount(t.amount)}
            </span>
            <button onClick={handleDeleteTrans(t)} className="ml-2 px-2 py-1 rounded bg-red-600/80 text-white text-xs hover:bg-red-700 transition font-sans">
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* Custom scrollbar styling for Webkit browsers */}
      <style>
        {`
          ul::-webkit-scrollbar {
            width: 8px;
            border-radius: 8px;
            background: #d1d5db;
          }
          ul::-webkit-scrollbar-thumb {
            background: #374151;
            border-radius: 8px;
          }
        `}
      </style>
    </div>
  );
};

export default TranctionHistory;
