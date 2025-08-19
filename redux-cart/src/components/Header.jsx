import React from "react";
import Button from "../ui/Button";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItemsCount = useSelector((state) => state.cart.totalQuantity);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-w-full text-white shadow-md border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4"
              />
              <circle cx="7" cy="20" r="1" />
              <circle cx="20" cy="20" r="1" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-wide text-white">
              Redux Cart
            </h1>
            <p className="text-xs text-gray-400">A tiny shopping cart demo</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            fn={() => {}}
            className="relative inline-flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-sm rounded-md transition-colors duration-150"
            aria-label="Open cart"
          >
            <svg
              className="w-5 h-5 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6H19"
              />
            </svg>
            <span className="text-sm text-gray-200">Cart</span>
            <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-900 bg-yellow-400 rounded-full">
              {cartItemsCount}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
