// Define your slice logic here
import { createSlice } from "@reduxjs/toolkit";

const mathsSlice = createSlice({
  name: "Maths",
  initialState: {
    result: 0,
  },
  reducers: {
    add(state, action) {
      state.result = action.payload.num1 + action.payload.num2;
    },
    substract(state, action) {
      state.result = action.payload.num1 - action.payload.num2;
    },
    multiply(state, action) {
      state.result = action.payload.num1 * action.payload.num2;
    },
  },
});

export const { add, substract, multiply } = mathsSlice.actions;
export default mathsSlice.reducer;