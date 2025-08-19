import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, multiply, substract } from "../features/exampleSlice";

const Maths = () => {
  const { result } = useSelector((store) => store.maths);
  const dispatch = useDispatch();

  console.log(`Dispatched add with result: ${result}`);

  return (
    <div>
      <button onClick={() =>   dispatch(add({ num1: 5, num2: 3 }))}>Add</button>
      <button onClick={() =>   dispatch(multiply({ num1: 5, num2: 3 }))}>Multiply</button>
      <button onClick={() =>   dispatch(substract({ num1: 5, num2: 3 }))}>Substract</button>
      {/* <button onClick={() => handleMaths(multiply)}>Multiply</button>
      <button onClick={() => handleMaths(substract)}>Substract</button> */}
    </div>
  );
};

export default Maths;
