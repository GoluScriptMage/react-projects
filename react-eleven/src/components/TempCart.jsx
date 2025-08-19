import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const products = ["Jeans", "Shirt", "Shoes"];

const TempCart = () => {
  const { cartItems, dispatchCart } = useContext(CartContext);

  console.log("Cart Items:", cartItems);

  return (
    // Main cart container with dark theme and card-like styling
    <div className="bg-gray-900 text-white max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg border border-gray-700">
      {/* Cart title */}
      <h3 className="text-2xl font-bold mb-6 text-center">Temporary Cart</h3>
      {/* Product action buttons for each product (no logic, just styling) */}
      {products.map((product) => (
        <div
          key={product}
          className="flex items-center justify-between bg-gray-800 p-4 rounded mb-4"
        >
          {/* Product name */}
          <h4 className="text-lg font-semibold">{product}</h4>
          <div>
            {/* Add item button with green color (no logic) */}
            <button
              onClick={() => dispatchCart({ type: "ADD_ITEM", item: product })}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2 transition"
            >
              Add item
            </button>
            {/* Remove item button with red color (no logic) */}
            <button
              onClick={() =>
                dispatchCart({ type: "REMOVE_ITEM", item: product })
              }
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
            >
              Remove item
            </button>
          </div>
        </div>
      ))}
      {/* Cart items display section (static dummy data) */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h4 className="text-lg font-semibold mb-2">Cart Items:</h4>
        {cartItems.length === 0 ? (
          // Message when cart is empty
          <p className="text-gray-400">Cart is empty.</p>
        ) : (
          // List of items in the cart
          <ul className="list-disc pl-5">
            {cartItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>
      {/* Remove all items button with yellow color (no logic) */}
      <div className="text-center">
        <button
          onClick={() => dispatchCart({ type: "REMOVE_ALL_ITEMS" })}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded shadow transition font-bold"
        >
          Remove all items
        </button>
      </div>
    </div>
  );
};

export default TempCart;
