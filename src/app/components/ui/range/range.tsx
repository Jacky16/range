"use client";
import { RangeProvider } from "./contexts/range-context";
import RangeContainer from "./range-container";

interface Props {
  min?: number;
  max?: number;
}

const Range: React.FC<Props> = ({ min = 0, max = 100 }) => {
  return (
    <RangeProvider initialValue={{ min, max }}>
      <RangeContainer />
    </RangeProvider>
  );
};

export default Range;
