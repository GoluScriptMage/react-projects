import { configureStore } from "@reduxjs/toolkit";
import mathsSlice from "../features/exampleSlice";

const store = configureStore({
  reducer: {
    maths: mathsSlice,
  },
});

export default store;
