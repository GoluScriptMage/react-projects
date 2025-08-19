import React from "react";
import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartReducer";
import menu from "../data/menuData";

const Menu = () => {
  const products = menu;
  const dispatch = useDispatch();
  return (
    <section className="w-full max-w-4xl mx-auto px-6 py-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-white mb-4">Menu</h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {products.map((p) => (
          <article
            key={p.id}
            className="w-full sm:w-[400px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-white">{p.name}</h3>
                <p className="text-sm text-gray-400">{p.desc}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">
                  ${p.price.toFixed(2)}
                </div>
                <Button
                  fn={() => dispatch(addItem({ id: p.id, name: p.name, price: p.price, quantity: 1, desc: p.desc }))}
                  className="mt-2 inline-flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-md"
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Menu;
