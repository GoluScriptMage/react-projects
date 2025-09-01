import React from "react";

const Button = ({ name, fn }) => {
  return (
    <>
      <button
        onClick={fn}
        className="mt-4 inline-block rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
      >
        {name}
      </button>
    </>
  );
};

export default Button;
