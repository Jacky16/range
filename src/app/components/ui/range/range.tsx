"use client";
import { useRef, useState } from "react";
import { RangeProvider } from "./contexts/range-context";
import Thumb from "./thumb";
import { Track, TrackRange } from "./track";

interface Props {
  min?: number;
  max?: number;
}

const Range: React.FC<Props> = ({ min = 0, max = 100 }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const leftThumbRef = useRef<HTMLDivElement>(null);
  const rightThumbRef = useRef<HTMLDivElement>(null);

  const sizeThumb =
    rightThumbRef.current?.clientWidth ??
    leftThumbRef.current?.clientWidth ??
    0;

  const [rangeValue, setRangeValue] = useState({
    min,
    max,
  });

  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);

  const [dragging, setDragging] = useState(false);

  const handleMouseMove = (event: MouseEvent) => {
    if (!trackRef.current) return;

    const mouseXPosition = event.clientX;
    const rangeWidth = trackRef.current.getBoundingClientRect();

    const offsetThumbPosition = isDraggingLeft.current
      ? (leftThumbRef.current?.clientWidth ?? 0) / 2
      : (rightThumbRef.current?.clientWidth ?? 0) / 2;

    let thumbPosition =
      ((mouseXPosition - rangeWidth.left - offsetThumbPosition) /
        rangeWidth.width) *
      100;

    if (isDraggingLeft.current) {
      if (thumbPosition <= min) {
        thumbPosition = min;
      } else if (thumbPosition >= rangeValue.max) {
        thumbPosition = rangeValue.max;
      }

      setRangeValue((prev) => ({ ...prev, min: thumbPosition }));
    }

    if (isDraggingRight.current) {
      if (thumbPosition >= max) thumbPosition = max;
      else if (thumbPosition <= rangeValue.min) thumbPosition = rangeValue.min;

      setRangeValue((prev) => ({ ...prev, max: thumbPosition }));
    }
  };

  const handleMouseUp = () => {
    isDraggingLeft.current = false;
    isDraggingRight.current = false;

    setDragging(false);

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownLeft = () => {
    isDraggingLeft.current = true;

    setDragging(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownRight = () => {
    isDraggingRight.current = true;

    setDragging(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <RangeProvider min={min} max={max}>
      <Track ref={trackRef}>
        <TrackRange thumbSize={sizeThumb} />

        <Thumb
          ref={leftThumbRef}
          onMouseDown={handleMouseDownLeft}
          style={{ left: `${rangeValue.min}%` }}
          value={rangeValue.min}
          dragging={dragging}
        />

        <Thumb
          ref={rightThumbRef}
          onMouseDown={handleMouseDownRight}
          style={{ left: `${rangeValue.max}%` }}
          value={rangeValue.max}
          dragging={dragging}
        />
      </Track>
    </RangeProvider>
  );
};

export default Range;
