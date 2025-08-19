import React from "react";

const FormInput = ({ name, idx, onDataUpdate}) => {

  const onInputChange = (e) => {
    const {name, value} = e.target;
    onDataUpdate(name, value)
  }
  
  return (
    <div className="flex flex-col mx-3 gap-0.5 w-full">
      <label className="mb-1 text-sm text-neutral-300">{name}</label>
      <input
      onChange={onInputChange}
        type="number"
        className="bg-neutral-900 border border-neutral-600 rounded-md text-white px-3 py-2 shadow-sm
          focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400
          hover:border-indigo-400 transition-all duration-200
          [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        name={idx}
        required
      />
    </div>
  );
};

export default FormInput;
