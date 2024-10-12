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

export const calculateRelativePercentage = (
  value: number,
  minValue: number,
  maxValue: number
): number => {
  if (value < minValue) return 0;
  if (value > maxValue) return 100;

  return ((value - minValue) / (maxValue - minValue)) * 100;
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

export const findClosestValue = (
  position: number,
  values: number[]
): number => {
  let closestValue = values[0];

  let closestDiff = Math.abs(position - closestValue);

  for (const value of values) {
    const diff = Math.abs(position - value);

    if (diff < closestDiff) {
      closestDiff = diff;
      closestValue = value;
    }
  }

  return closestValue;
};

export const getClosestValueIndex = (values: number[], nextValue: number) => {
  const distances = values.map((value) => Math.abs(value - nextValue));

  const closestDistance = Math.min(...distances);

  return distances.indexOf(closestDistance);
};
