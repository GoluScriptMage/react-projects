import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "Burger",
      price: 10.0,
      desc: "Juicy grilled burger with cheese",
      quantity: 1,
    },
    {
      id: 2,
      name: "Pizza",
      price: 12.0,
      desc: "Delicious cheese pizza with fresh toppings",
      quantity: 1,
    },
  ],
  // two items, each quantity 1
  totalQuantity: 2,
  totalPrice: 22.0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
      console.log("Item added:", action.payload);
    },
    removeItem: (state, action) => {
      const { id, quantity = 1, price } = action.payload;
      const existing = state.items.find((it) => it.id === id);
      if (!existing) return; // nothing to remove

      if (existing.quantity > quantity) {
        // decrement quantity
        existing.quantity -= quantity;
      } else {
        // remove the item entirely
        state.items = state.items.filter((it) => it.id !== id);
      }

      // update totals safely
      state.totalQuantity = state.totalQuantity - quantity;
      state.totalPrice = Math.max(
        0,
        state.totalPrice - (price ?? existing.price) * quantity
      );
      console.log("Item removed:", id);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
