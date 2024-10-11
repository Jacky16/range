import { RangeValue } from "../types/range-context.types";

export const calculateThumbPosition = (
  mouseXPosition: number,
  rangeLeftPosition: number,
  rangeWidth: number,
  thumbSize: number
) => {
  return (
    ((mouseXPosition - rangeLeftPosition - thumbSize / 2) / rangeWidth) * 100
  );
};

export const checkThumbPosition = (
  currentValue: number,
  previousValue: RangeValue,
  initialValue: RangeValue,
  position: "left" | "right",
  offsetBetweenThumbs = 0.01
) => {
  if (position === "left") {
    if (currentValue >= initialValue.max || currentValue >= previousValue.max)
      return previousValue.max - offsetBetweenThumbs;
  } else if (position === "right") {
    if (currentValue <= initialValue.min || currentValue <= previousValue.min)
      return previousValue.min + offsetBetweenThumbs;
  }

  return currentValue;
};
