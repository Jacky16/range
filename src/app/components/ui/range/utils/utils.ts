import { RangeValue } from "../types/range-context.types";

export const calculateThumbPosition = (
  mouseX: number,
  trackLeft: number,
  trackWidth: number,
  minValue: number,
  maxValue: number,
  offset?: number
): number => {
  const relativeX = mouseX - trackLeft - (offset ?? 0);

  const percentage = (relativeX / trackWidth) * 100;

  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return minValue + (clampedPercentage / 100) * (maxValue - minValue);
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
