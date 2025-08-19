import React from "react";
import { formatINRCurrency } from '../CalcLogic';

const InvestmentDataTable = ({ investmentReturn }) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-neutral-900/90 rounded-xl shadow-lg p-6 mt-8 overflow-x-auto">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Investment Return
      </h2>
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-neutral-800 text-neutral-100">
            <th className="py-3 px-4 rounded-l-lg text-left">Year</th>
            <th className="py-3 px-4 text-left">Total Savings</th>
            <th className="py-3 px-4 text-left">Interest (yearly)</th>
            <th className="py-3 px-4 text-left">Total Interest</th>
            <th className="py-3 px-4 rounded-r-lg text-left">
              Invested (capital)
            </th>
          </tr>
        </thead>
        <tbody>
          {investmentReturn.map((data, index) => (
            <tr key={index} className="bg-neutral-900/80 hover:bg-neutral-800 transition">
              <td className="py-2 px-4 text-neutral-50 font-medium">
                {data.year}
              </td>
              <td className="py-2 px-4 text-neutral-50 font-semibold">
                {formatINRCurrency(data.savingsEndOfYear)}
              </td>
              <td className="py-2 px-4 text-neutral-50">
                {formatINRCurrency(data.yearlyInterest)}
              </td>
              <td className="py-2 px-4 text-neutral-50">
                {formatINRCurrency(data.totalInterest)}
              </td>
              <td className="py-2 px-4 text-neutral-50">
                {formatINRCurrency(data.savingsEndOfYear - data.totalInterest)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentDataTable;
