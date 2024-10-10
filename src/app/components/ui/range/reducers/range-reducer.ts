import { RangeContextActions, RangeState } from "../types/range-context.types";

const rangeReducer = (
  state: RangeState,
  action: RangeContextActions
): RangeState => {
  switch (action.type) {
    case "SET_VALUE_MIN":
      return { ...state, valueMin: action.payload };
    case "SET_VALUE_MAX":
      return { ...state, valueMax: action.payload };
    default:
      return state;
  }
};

export default rangeReducer;
