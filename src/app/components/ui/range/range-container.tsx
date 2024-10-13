import { useRef } from "react";
import { useRange } from "./contexts/range-context";
import InputRange from "./input-range";
import Thumb from "./thumb";
import { Track, TrackRange } from "./track";
import {
  calculateThumbPosition,
  findClosestValue,
  getClosestValueIndex,
} from "./utils/utils";

const RangeContainer = () => {
  const {
    rangeValue,
    updateRangeValue,
    updateIsDragging,
    initialValue,
    thumbSize,
    onValueCommit,
    values,
  } = useRange();

  const trackRef = useRef<HTMLDivElement>(null);

  const leftThumbRef = useRef<HTMLDivElement>(null);
  const rightThumbRef = useRef<HTMLDivElement>(null);

  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);

  const rangeValueRef = useRef(rangeValue);

  const handleMouseMove = (event: MouseEvent) => {
    if (!trackRef.current) return;

    const mouseXPosition = event.clientX;
    const trackRect = trackRef.current.getBoundingClientRect();

    const thumbPosition = calculateThumbPosition(
      mouseXPosition,
      trackRect.left,
      trackRect.width,
      initialValue.min,
      initialValue.max,
      thumbSize / 2
    );

    let value =
      values.length > 0
        ? findClosestValue(thumbPosition, values)
        : thumbPosition;

    const leftValueIndex = getClosestValueIndex(values, rangeValue.min);
    const rightValueIndex = getClosestValueIndex(values, rangeValue.max);

    const differenceIndexFromThumbs = rightValueIndex - leftValueIndex;

    if (isDraggingLeft.current) {
      if (value <= initialValue.min) {
        value = initialValue.min;
      } else if (
        value >= rangeValue.max ||
        (differenceIndexFromThumbs <= 1 && values.length > 0)
      ) {
        return;
      }

      updateRangeValue({ ...rangeValue, min: value });
      rangeValueRef.current = { ...rangeValue, min: value };
    }

    if (isDraggingRight.current) {
      if (value >= initialValue.max) {
        value = initialValue.max;
      } else if (
        value <= rangeValue.min ||
        (differenceIndexFromThumbs <= 1 && values.length > 0)
      ) {
        return;
      }

      updateRangeValue({ ...rangeValue, max: value });
      rangeValueRef.current = { ...rangeValue, max: value };
    }
  };

  const handleMouseDownLeft = () => {
    isDraggingLeft.current = true;
    updateIsDragging(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownRight = () => {
    isDraggingRight.current = true;
    updateIsDragging(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isDraggingLeft.current = false;
    isDraggingRight.current = false;

    updateIsDragging(false);
    onValueCommit?.(rangeValueRef.current);

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex items-center justify-center gap-2.5">
      <InputRange position="left" />
      <Track ref={trackRef}>
        <TrackRange />
        <Thumb
          position="left"
          ref={leftThumbRef}
          onMouseDown={handleMouseDownLeft}
        />
        <Thumb
          position="right"
          ref={rightThumbRef}
          onMouseDown={handleMouseDownRight}
        />
      </Track>
      <InputRange position="right" />
    </div>
  );
};

export default RangeContainer;
