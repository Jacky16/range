import { forwardRef, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { useRange } from "./contexts/range-context";
import { ThumbPosition } from "./types/thumb.types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  position: ThumbPosition;
}

const thumb = tv({
  base: " absolute cursor-grab rounded-full bg-primary transition-transform ease-out hover:scale-125 ",
  variants: {
    dragging: {
      true: "hover:cursor-grabbing",
      false: "hover:cursor-grab",
    },
  },
});

const Thumb = forwardRef<HTMLDivElement, Props>(
  ({ className, position, ...props }, ref) => {
    const { isDragging, rangeValue, thumbSize } = useRange();

    return (
      <div
        ref={ref}
        style={{
          width: `${thumbSize}px`,
          height: `${thumbSize}px`,
          left:
            position === "left" ? `${rangeValue.min}%` : `${rangeValue.max}%`,
        }}
        {...props}
        role="slider"
        aria-valuemin={position === "left" ? rangeValue.min : rangeValue.max}
        aria-valuemax={position === "left" ? rangeValue.max : rangeValue.min}
        aria-orientation="horizontal"
        aria-labelledby={`${position}-thumb`}
        aria-readonly
        aria-valuenow={position === "left" ? rangeValue.min : rangeValue.max}
        className={thumb({ className, dragging: isDragging })}
      />
    );
  }
);
Thumb.displayName = "Thumb";

export default Thumb;
