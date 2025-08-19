import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT": {
        console.log(`Input changed: ${action.value} from reducer`);
      return {
        ...state,
        value: action.value,
        isTouched: state.isTouched,
      };
    }
    case "BLUR": {
      return {
        ...state,
        isTouched: true,
      };
    }
    case "RESET": {
      return {
        value: "",
        isTouched: false,
      };
    }
  }

  return initialState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputReducer, initialState);

  const isValueValid = validateValue(inputState.value);
  const hasError = !isValueValid && inputState.isTouched; // Fix: Use validateValue for error detection

  const onValueChangeHandler = (event) => {
    return dispatch({ type: "INPUT", value: event.target.value });
  };

  const onBlurHandler = () => {
    return dispatch({ type: "BLUR" });
  };

  const onResetHandler = () => {
    return dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: isValueValid,
    hasError,
    onValueChangeHandler,
    onResetHandler,
    onBlurHandler,
  };
};

export default useInput;
