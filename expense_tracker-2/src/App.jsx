import React from "react";
import AddExpense from "./components/AddExpense";
import Expenselist from "./components/Expenselists";
import ChartBar from "./components/ChartBar";
import { useState } from "react";
import testData from "./TestData/data";

const App = () => {
  const [expenseData, setexpenseData] = useState(testData);
  const [updatedYear, setupdatedYear] = useState(new Date().getFullYear());

  const updateExpenseData = (newExpense) => {
    setexpenseData((prevData) => [...prevData, newExpense]);
  };

  const updateStateYear = (year) => {
    setupdatedYear(year);
  };

  const deleteExpense = (id) => {
    setexpenseData((prevData) =>
      prevData.filter((expense) => expense.name !== id)
    );
  };

  const monthFormatChange = (date) =>
    new Date(date).toLocaleString("default", { month: "short" });
  console.log("Formatted Month:", monthFormatChange("2025-06-01"));

  const getArrayItems = (arr, item1, item2) => {
    return arr.map((item) => ({
      [item1]: item[item1],
      month: monthFormatChange(item[item2]),
    }));
  };

  console.log(getArrayItems(expenseData, "amount", "date"));

  const yearDataFilter = (year, data) => {
    return data.filter((item) => new Date(item.date).getFullYear() === year);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500 py-10">
      <div className="w-full max-w-2xl mx-auto ">
        <AddExpense onExpenseUpdate={updateExpenseData} />
        <ChartBar
          // expense={expenseData}
          // updatedYear={updatedYear}
          // onYearFilter={yearDataFilter}
          updatedData={yearDataFilter(updatedYear, expenseData)}
          onGetArrayItems={getArrayItems}
        />
        <Expenselist
          onUpdatedYear={updateStateYear}
          expense={expenseData}
          onYearFilter={yearDataFilter}
          onExpenseDelete={deleteExpense}
        />
      </div>
    </div>
  );
};

export default App;
