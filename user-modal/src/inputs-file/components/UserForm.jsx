import React from "react";
import { useState } from "react";
import Dialog from "./Dialog";
import useInput from "../hooks/useInput";

const UserForm = ({ onUpdateUserData }) => {
  const [open, setopen] = useState(false);

  const validateUsername = (val) => val.trim() !== "";
  const validateEmail = (val) => val.includes("@") && val.trim() !== "";

  const {
    value: inputUsername,
    isValid: isUsernameValid,
    hasError: hasUsernameError,
    onValueChangeHandler: onUsernameChange,
    onResetHandler: onUsernameReset,
    onBlurHandler: onUsernameBlur,
  } = useInput(validateUsername);

  const {
    value: inputEmail,
    isValid: isEmailValid,
    hasError: hasEmailError,
    onValueChangeHandler: onEmailChange,
    onResetHandler: onEmailReset,
    onBlurHandler: onEmailBlur,
  } = useInput(validateEmail);

  let formValid = false;
  if (isUsernameValid && isEmailValid) formValid = true;

  const errorClasses = (key, className) => {
    return key ? className : "";
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!formValid) return;
        onEmailReset();
        onUsernameReset();
      }}
      className="flex flex-col gap-5 items-center w-full max-w-md p-8 bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900 border border-gray-800 rounded-xl shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-gray-100 mb-2 tracking-tight">
        User Details
      </h2>
      <label
        htmlFor="username"
        className="text-gray-300 font-medium self-start"
      >
        Username
      </label>
      <input
        type="text"
        name="username"
        value={inputUsername}
        onChange={(e) => onUsernameChange(e)}
        onBlur={onUsernameBlur}
        required
        className={`mb-2 p-3 w-full rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 placeholder-gray-500 ${errorClasses(
          hasUsernameError,
          "border-red-500"
        )}`}
        placeholder="Enter your username"
      />
      {hasUsernameError && (
        <p className="text-red-500">Please enter a valid username.</p>
      )}
      <label htmlFor="email" className="text-gray-300 font-medium self-start">
        Email
      </label>
      <input
        type="email"
        value={inputEmail}
        onChange={(e) => onEmailChange(e)}
        onBlur={onEmailBlur}
        required
        name="email"
        className={`mb-2 p-3 w-full rounded-md bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 placeholder-gray-500 ${errorClasses(
          hasEmailError,
          "border-red-500"
        )}`}
        placeholder="Enter your email"
      />
      {hasEmailError && (
        <p className="text-red-500">Please enter a valid username.</p>
      )}
      <button
        type="submit"
        className="p-3 w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold mt-2 rounded-md shadow-md transition-colors duration-200 tracking-wide"
      >
        Add User
      </button>
      <Dialog open={open}></Dialog>
    </form>
  );
};

export default UserForm;
