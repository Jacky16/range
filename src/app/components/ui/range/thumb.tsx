import { forwardRef, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { useRange } from "./contexts/range-context";
import { ThumbPosition } from "./types/thumb.types";
import { calculateRelativePercentage } from "./utils/utils";

const thumb = tv({
  base: "absolute cursor-grab rounded-full bg-primary transition-transform ease-out hover:scale-125",
  variants: {
    dragging: {
      true: "hover:cursor-grabbing",
      false: "hover:cursor-grab",
    },
  },
});

interface Props extends HTMLAttributes<HTMLDivElement> {
  position: ThumbPosition;
}

const Thumb = forwardRef<HTMLDivElement, Props>(
  ({ className, position, ...props }, ref) => {
    const { isDragging, rangeValue, thumbSize, initialValue } = useRange();

    return (
      <div
        ref={ref}
        className={thumb({ className, dragging: isDragging })}
        style={{
          ...props.style,
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
          left: `${calculateRelativePercentage(
            position === "left" ? rangeValue.min : rangeValue.max,
            initialValue.min,
            initialValue.max
          )}%`,
        }}
        role="slider"
        aria-valuemin={position === "left" ? initialValue.min : rangeValue.min}
        aria-valuemax={position === "left" ? rangeValue.max : initialValue.max}
        aria-orientation="horizontal"
        aria-valuenow={position === "left" ? rangeValue.min : rangeValue.max}
        {...props}
      />
    );
  }
);
Thumb.displayName = "Thumb";

export default Thumb;
