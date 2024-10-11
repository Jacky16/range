import { useRef } from "react";
import { useRange } from "./contexts/range-context";
import InputRange from "./input-range";
import Thumb from "./thumb";
import { Track, TrackRange } from "./track";

const RangeContainer = () => {
  const { rangeValue, updateRangeValue, updateIsDragging, initialValue } =
    useRange();

  const trackRef = useRef<HTMLDivElement>(null);

  const leftThumbRef = useRef<HTMLDivElement>(null);
  const rightThumbRef = useRef<HTMLDivElement>(null);

  const isDraggingLeft = useRef(false);
  const isDraggingRight = useRef(false);

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
      if (thumbPosition <= initialValue.min) {
        thumbPosition = initialValue.min;
      } else if (thumbPosition >= rangeValue.max) {
        thumbPosition = rangeValue.max;
      }

      updateRangeValue({
        ...rangeValue,
        min: thumbPosition,
      });
    }

    if (isDraggingRight.current) {
      if (thumbPosition >= initialValue.max) thumbPosition = initialValue.max;
      else if (thumbPosition <= rangeValue.min)
        thumbPosition = rangeValue.min - 0.01;

      updateRangeValue({
        ...rangeValue,
        max: thumbPosition,
      });
    }
  };

  const handleMouseDownLeft = () => {
    isDraggingLeft.current = true;

    updateIsDragging(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    isDraggingLeft.current = false;
    isDraggingRight.current = false;

    updateIsDragging(false);

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDownRight = () => {
    isDraggingRight.current = true;

    updateIsDragging(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
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
