import React from "react";

const IncomeTransaction = ({ incomeTrans }) => (
  <div className="flex items-center justify-start">
    <span className="text-green-400 font-semibold text-lg md:text-xl mr-2 font-sans">Income</span>
    <span className="bg-green-500/20 text-green-300 font-bold px-3 py-1 rounded-lg shadow-sm ml-2 font-sans">
      {incomeTrans}
    </span>
  </div>
);

export default IncomeTransaction;
