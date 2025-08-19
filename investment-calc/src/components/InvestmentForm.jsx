import React from 'react';
import FormInput from './ui/FormInput';
import { useState } from 'react';

const InvestmentForm = ({ onFormUpdate, onClickReset, onClickCalculate }) => {
  const [inputData, setinputData] = useState([]);

  const stateDataUpdate = (name, value) => {
    setinputData((prev) => ({
      ...prev,
      [name]: value,
    }));
    onFormUpdate({ ...inputData, [name]: value });
  };

  const formDataSender = [
    { name: 'Current Savings', idx: 'currentSavings' },
    { name: 'Yearly Savings', idx: 'yearlySavings' },
    { name: 'Expected return ( % per year)', idx: 'expectedReturn' },
    { name: 'Investment Duration ( Years )', idx: 'duration' },
  ];

  return (
    <div className="bg-neutral-900/90 border border-neutral-700 shadow-lg rounded-xl p-8 w-full max-w-xl">
      <form className="flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
          {formDataSender.map((data, id) => {
            return (
              <FormInput
                name={data.name}
                idx={data.idx}
                key={id}
                onDataUpdate={stateDataUpdate}
              />
            );
          })}
        </div>
        <div className="flex flex-row justify-center items-center w-full gap-6">
          <button
            className="bg-neutral-800 border-none text-white border border-neutral-100 py-2 px-4 rounded-lg max-w-32 shadow-md hover:bg-neutral-700 hover:scale-105 hover:shadow-lg transition duration-200 active:scale-95"
            type="reset"
            onClick={onClickReset}
          >
            Reset
          </button>
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg max-w-32 shadow-md hover:bg-indigo-700 hover:scale-105 hover:shadow-lg transition duration-200 active:scale-95"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              onClickCalculate();
            }}
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestmentForm;
