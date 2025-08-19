import React from "react";

const Navbar = ({ isLogin, onLogout }) => {
  return (
    <nav className="bg-gray-900 text-white border-b-2 border-gray-700 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center  gap-4">
        <h2 className="text-2xl font-bold tracking-wide">
          A Typical Login Page
        </h2>
      </div>
      {isLogin && (
        <div className="flex items-center gap-6">
          <h3 className="hover:text-blue-400 cursor-pointer transition-colors">
            User
          </h3>
          <h3 className="hover:text-blue-400 cursor-pointer transition-colors">
            Admin
          </h3>
          <button onClick={onLogout} className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold transition-colors shadow">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
