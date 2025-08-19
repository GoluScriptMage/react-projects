import React from "react";
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import TempCart from "./components/TempCart";

const App = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLogin, setisLogin] = useState(false);

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      setisLogin(true);
    }
  }, []);

  const updateFormData = (data) => {
    setFormData({
      ...data,
    });
    setisLogin(true);
    localStorage.setItem("userLogin", true);
  };

  const handleLogout = () => {
    setisLogin(false);
    localStorage.removeItem("userLogin");
  };

  return (
    <>
      {/* <Navbar isLogin={isLogin} onLogout={handleLogout} />
    {isLogin && (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">
                Welcome, {formData.email}
            </h3>
            <p className="text-gray-300 text-center">You are now logged in!</p>
            </div>
        </div>
    )}
    {!isLogin && <LoginForm updateFormData={updateFormData} />}
   */}
      <TempCart />
    </>
  );
};

export default App;
