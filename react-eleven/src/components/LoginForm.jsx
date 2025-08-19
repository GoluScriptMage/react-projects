import React, { useState } from "react";

const LoginForm = ({ updateFormData }) => {
  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  });

  const updateUserDetails = (e) => {
    setuserDetails({
      ...userDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData(userDetails);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-bold mb-6 text-white text-center">
          Login Form
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              value={userDetails.email}
              onChange={updateUserDetails}
              className={`w-full px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 border-2 transition-colors ${userDetails.email !== '' && !userDetails.email.includes("@") ? "border-red-500" : "border-gray-600"}`}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={userDetails.password}
              onChange={updateUserDetails}
              className={`w-full px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 border-2 transition-colors ${userDetails.password !== '' && userDetails.password.length <= 6 ? "border-red-500" : "border-gray-600"}`}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
