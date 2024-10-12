"use client";
import { RangeProvider } from "./contexts/range-context";
import RangeContainer from "./range-container";
import { RangeValue } from "./types/range-context.types";

interface Props {
  min?: number;
  max?: number;
  values?: number[];
  onChange?: (value: RangeValue) => void;
  onValueCommit?: (value: RangeValue) => void;
}

const Range: React.FC<Props> = ({
  min = 0,
  max = 100,
  values = [],
  onChange,
  onValueCommit,
}) => {
  return (
    <RangeProvider
      initialValue={{
        min: values[0] ?? min,
        max: values[values.length - 1] ?? max,
      }}
      onChange={onChange}
      onValueCommit={onValueCommit}
      values={values}
    >
      <RangeContainer />
    </RangeProvider>
  );
};

export default Range;
