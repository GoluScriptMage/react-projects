import React from "react";
import Bar from "./Bar";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getMonthlyData(data) {
  // data: [{ amount, date }]
  return months.map((month, idx) => {
    // Find all items for this month
    const itemsThisMonth = data
      .filter((item) => {
        const d = new Date(item.date);
        return d.getMonth() === idx;
      })

      console.log(itemsThisMonth);

      const total = itemsThisMonth.reduce((sum, item) => sum + Number(item.amount), 0);
    //   console.log(total);
    return { month, amount: total };
  });
}

const ChartBar = ({ updatedData }) => {
  const monthlyData = getMonthlyData(updatedData);
  const maxAmount = Math.max(...monthlyData.map((d) => d.amount));

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 transition-colors duration-500 animate-fade-in">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
        Monthly Expenses
      </h3>
      <div className="flex items-end justify-between h-48 gap-2">
        {monthlyData.map((data, idx) => (
          <Bar
            key={data.month}
            month={data.month}
            amount={data.amount}
            max={maxAmount}
          />
        ))}
      </div>
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

export default ChartBar;
