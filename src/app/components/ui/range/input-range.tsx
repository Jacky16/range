import { forwardRef, useState } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { useRange } from "./contexts/range-context";
import { checkThumbPosition } from "./utils/utils";

const inputRange = tv({
  base: "w-16 border-b-2 border-transparent bg-transparent text-left text-sm [appearance:textfield] focus:border-b-2 focus:border-gray-500 focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
  variants: {
    position: {
      left: "text-right",
      right: "text-left",
    },
  },
});

type InputRangeVariants = VariantProps<typeof inputRange>;

interface Props extends InputRangeVariants {
  className?: string;
  onChange?: (value: number) => void;
}

enum INPUT_STATE {
  NORMAL = "NORMAL",
  FOCUS = "FOCUS",
}

const expressionRegularToGetOnlyNumbers = /[^0-9]/g;

const formatCurrency = (value: number) => {
  return value.toLocaleString("es", {
    style: "currency",
    currency: "EUR",
  });
};

const InputRange = forwardRef<HTMLInputElement, Props>(
  ({ className, position, onChange }, ref) => {
    const { updateRangeValue, rangeValue, initialValue, values } = useRange();

    const [state, setState] = useState<INPUT_STATE>(INPUT_STATE.NORMAL);
    const [inputValue, setInputValue] = useState(
      position === "left" ? rangeValue.min : rangeValue.max
    );

    const getValue = () => {
      if (state === INPUT_STATE.FOCUS) {
        return inputValue.toFixed(0);
      }

      return position === "left"
        ? formatCurrency(rangeValue.min)
        : formatCurrency(rangeValue.max);
    };

    return (
      <input
        ref={ref}
        readOnly={values.length > 0}
        disabled={values.length > 0}
        type="text"
        aria-label={position === "left" ? "min" : "max"}
        className={inputRange({ className, position })}
        value={getValue()}
        onChange={(event) => {
          const newValue = Number(
            event.target.value.replace(expressionRegularToGetOnlyNumbers, "")
          );

          setInputValue(newValue);

          onChange?.(newValue);
        }}
        onBlur={(event) => {
          let newValue = Number(
            event.target.value.replace(expressionRegularToGetOnlyNumbers, "")
          );

          newValue = Math.max(Math.min(newValue, initialValue.max), 0);

          const checkedValue = checkThumbPosition(
            newValue,
            rangeValue,
            initialValue,
            position as "left" | "right"
          );

          setState(INPUT_STATE.NORMAL);

          setInputValue(checkedValue);

          if (position === "left") {
            updateRangeValue({ ...rangeValue, min: checkedValue });
          } else if (position === "right") {
            updateRangeValue({ ...rangeValue, max: checkedValue });
          }
        }}
        onFocus={() => {
          setState(INPUT_STATE.FOCUS);

          if (position === "left") {
            setInputValue(rangeValue.min);
          } else {
            setInputValue(rangeValue.max);
          }
        }}
      />
    );
  }
);

InputRange.displayName = "InputRange";

export default InputRange;
