import React from 'react';
import InvestmentForm from './components/InvestmentForm';
import InvestmentDataTable from './components/InvestmentDataTable';
import { useState } from 'react';
import calcInvestmentReturn from './CalcLogic';

const App = () => {
  const [investmentData, setInvestmentData] = useState({
    currentSavings: 0,
    yearlySavings: 0,
    expectedReturn: 0,
    duration: 0,
  });
  const [investmentReturn, setInvestmentReturn] = useState([]);

  const onFormDataUpdate = (data) => {
    setInvestmentData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const onResetForm = () => {
    setInvestmentData({
      currentSavings: 0,
      yearlySavings: 0,
      expectedReturn: 0,
      duration: 0,
    });
    setInvestmentReturn([]);
  };

  const onCalculateInvestment = () => {
    const investReturnData = calcInvestmentReturn(investmentData);
    return setInvestmentReturn([...investReturnData]);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center bg-neutral-950 text-white py-12 px-8 gap-12">
      <h1 className="text-2xl">Investment Calculator</h1>
      <InvestmentForm
        onFormUpdate={onFormDataUpdate}
        onClickReset={onResetForm}
        onClickCalculate={onCalculateInvestment}
      />
      {investmentReturn.length > 0 ? (
        <InvestmentDataTable investmentReturn={investmentReturn} />
      ) : (
        <h3 className="text-lg text-neutral-400">
          No data to display. Please fill the form and calculate.
        </h3>
      )}
    </div>
  );
};

export default App;
