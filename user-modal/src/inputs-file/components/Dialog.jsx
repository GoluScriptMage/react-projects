import React from "react";

const Dialog = ({ open, data }) => {
  if (!open) return null;

  return (
    <div>
      <h3>Invalid Error</h3>
      <p>Please enter Valid Name and Age</p>
    </div>
  );
};

export default Dialog;
