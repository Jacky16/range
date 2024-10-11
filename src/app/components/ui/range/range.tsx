"use client";
import { RangeProvider } from "./contexts/range-context";
import RangeContainer from "./range-container";
import { RangeValue } from "./types/range-context.types";

interface Props {
  min?: number;
  max?: number;
  onChange?: (value: RangeValue) => void;
  onValueCommit?: (value: RangeValue) => void;
}

const Range: React.FC<Props> = ({
  min = 0,
  max = 100,
  onChange,
  onValueCommit,
}) => {
  return (
    <RangeProvider
      initialValue={{ min, max }}
      onChange={onChange}
      onValueCommit={onValueCommit}
    >
      <RangeContainer />
    </RangeProvider>
  );
};

export default Range;
