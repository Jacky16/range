import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { useRange } from "./contexts/range-context";

export const Track = forwardRef<
  HTMLDivElement,
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
>(({ className, children, ...props }, ref) => {
  const { thumbSize } = useRange();

  return (
    <div
      ref={ref}
      {...props}
      style={{ marginRight: `${thumbSize}px` }}
      className={twMerge(
        "relative inline-flex h-1 w-44 items-center ",
        className
      )}
    >
      {children}
    </div>
  );
});

Track.displayName = "Track";

export const TrackRange = () => {
  const { thumbSize } = useRange();

  return (
    <div
      style={{ left: `${thumbSize / 2}px` }}
      className="absolute inset-x-0 h-1 w-full rounded-full bg-primary"
    />
  );
};
