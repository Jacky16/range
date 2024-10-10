import { forwardRef, HTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: number;
}

const thumb = tv({
  base: " absolute size-4 cursor-grab rounded-full bg-primary transition-transform ease-out hover:scale-125 ",
  variants: {
    dragging: {
      true: "hover:cursor-grabbing",
      false: "hover:cursor-grab",
    },
  },
});

type ThumbVariants = VariantProps<typeof thumb>;

const Thumb = forwardRef<HTMLDivElement, Props & ThumbVariants>(
  ({ className, dragging, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        role="slider"
        aria-valuenow={value}
        className={thumb({ className, dragging })}
      />
    );
  }
);
Thumb.displayName = "Thumb";

export default Thumb;
