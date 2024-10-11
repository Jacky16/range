export interface RangeValue {
  min: number;
  max: number;
}
export interface RangeContextProps {
  rangeValue: RangeValue;
  updateRangeValue: (newRangeValue: RangeValue) => void;

  isDragging: boolean;
  updateIsDragging: (isDragging: boolean) => void;

  initialValue: RangeValue;
  thumbSize: number;
}

export interface RangeProviderProps {
  initialValue: RangeValue;
  onChange?: (rangeValue: RangeValue) => void;
  thumbSize?: number;
}
