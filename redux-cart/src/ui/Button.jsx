import React from "react";

const Button = ({ fn, name, children, className = "", ...rest }) => {
  // default styling (can be overridden by passing a className)
  const base = "px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <button onClick={fn} className={`${base} ${className}`} {...rest}>
      {children ?? name}
    </button>
  );
};

export default Button;
