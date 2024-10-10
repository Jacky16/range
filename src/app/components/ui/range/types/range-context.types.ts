import { Dispatch } from "react";

export interface RangeState {
  valueMin: number;
  valueMax: number;
  min: number;
  max: number;
}

export interface RangeContextValue {
  state: RangeState;
  dispatch: Dispatch<RangeContextActions>;
}

export interface RangeProviderProps {
  min: number;
  max: number;
}

export type RangeContextActions =
  | {
      type: "SET_VALUE_MIN";
      payload: number;
    }
  | {
      type: "SET_VALUE_MAX";
      payload: number;
    };
