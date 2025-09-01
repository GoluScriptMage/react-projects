import React from "react";

const HeroPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900 w-full p-5 font-sans text-center">
      <h2 className="text-3xl font-bold">Welcome to the Hero Page</h2>
      <p className="mt-4 text-lg">
        This is the hero page. Here you can showcase your main features or content.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Get Started
        </button>
        <button className="bg-gray-300 text-gray-900 py-2 px-4 rounded hover:bg-gray-400">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default HeroPage;
