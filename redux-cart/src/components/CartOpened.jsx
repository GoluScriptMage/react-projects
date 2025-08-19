import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../store/cartReducer";

const CartOpened = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [removingIds, setRemovingIds] = useState([]);

  // Minimal Item row with subtle animation
  const ItemRow = ({ item }) => {
    const [mounted, setMounted] = useState(false);
    const isRemoving = removingIds.includes(item.id);

    useEffect(() => {
      const t = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(t);
    }, []);

    const handleRemove = () => {
      setRemovingIds((s) => [...s, item.id]);
      setTimeout(() => {
        dispatch(removeItem({ id: item.id, quantity: 1, price: item.price }));
        setRemovingIds((s) => s.filter((id) => id !== item.id));
      }, 120); // short delay for subtle leave
    };

    const handleAdd = () => dispatch(addItem({ id: item.id, quantity: 1, price: item.price }));

    const base = "py-3 flex items-center justify-between transition duration-150 ease-out";
    const enter = mounted ? "opacity-100 scale-100" : "opacity-0 scale-98";
    const leave = isRemoving ? "opacity-0 scale-98" : "";

    return (
      <li key={item.id} className={`${base} ${enter} ${leave}`}>
        <div>
          <div className="text-sm font-medium">{item.name}</div>
          <div className="text-xs text-gray-400">${item.price.toFixed(2)}</div>
        </div>

        <div className="flex items-center gap-2">
          <Button fn={handleRemove} className="w-8 h-8 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 flex items-center justify-center">-</Button>
          <div className="w-8 text-center text-sm">{item.quantity ?? item.qty ?? 0}</div>
          <Button fn={handleAdd} className="w-8 h-8 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-200 flex items-center justify-center">+</Button>
        </div>
      </li>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-4">
      <aside className="w-full max-w-md mx-auto bg-gradient-to-b  from-gray-900 via-gray-800 to-gray-900 text-white rounded-lg shadow-xl border border-gray-700 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Shopping Cart</h3>
          <span className="text-sm text-gray-400">{items.length} items</span>
        </div>
        <ul className="divide-y divide-gray-700 overflow-y-auto max-h-60">
          {items.map((it) => (
            <ItemRow key={it.id} item={it} />
          ))}
        </ul>

        <div className="mt-4 border-t border-gray-700 pt-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Subtotal</div>
            <div className="text-lg font-semibold">${totalPrice}</div>
          </div>
          <Button fn={() => {}} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md shadow">Checkout</Button>
        </div>
      </aside>
    </div>
  );
};

export default CartOpened;