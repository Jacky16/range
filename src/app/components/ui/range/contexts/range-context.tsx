import { createContext, PropsWithChildren, useReducer } from "react";
import rangeReducer from "../reducers/range-reducer";
import {
  RangeContextValue,
  RangeProviderProps,
  RangeState,
} from "../types/range-context.types";

const initialState: RangeState = {
  min: 0,
  max: 100,
  valueMin: 0,
  valueMax: 100,
};

const RangeContext = createContext<RangeContextValue>({
  dispatch: () => {},
  state: { ...initialState },
});

export default RangeContext;

export const RangeProvider = ({
  max,
  min,
  children,
}: PropsWithChildren<RangeProviderProps>) => {
  const [state, dispatch] = useReducer(rangeReducer, {
    ...initialState,
    min,
    max,
    valueMin: min,
    valueMax: max,
  });

  return (
    <RangeContext.Provider value={{ state, dispatch }}>
      {children}
    </RangeContext.Provider>
  );
};
