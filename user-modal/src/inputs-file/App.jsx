import React from "react";
import UserForm from "./components/UserForm";
import { useState } from "react";
import Practice from "./components/practice";
import AriaExamples from "./components/AriaExamples";

const App = () => {
  const [userData, setuserData] = useState([]);

  const updateUserData = (user) => {
    setuserData((prevData) => {
      return [...prevData, user];
    });
  };

  return (
    <div className="flex flex-col gap-5 items-center w-full min-h-screen p-8 bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900 border border-gray-800 rounded-xl shadow-2xl justify-center text-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold drop-shadow-lg text-center mb-4 tracking-tight">
        🚀 Namaste! Internet ki Duniya Mein Aapka Swagat Hai 🌐
      </h1>
      {/* <UserForm onUpdateUserData={updateUserData} /> */}
      <AriaExamples />
    </div>
  );
};

export default App;
