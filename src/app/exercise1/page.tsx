import getRangeValueData from "@/api/range-fetcher";
import Range from "../components/ui/range/range";

const PageExerciseOne = async () => {
  const rangeData = await getRangeValueData();

  return (
    <div className="mx-auto flex h-dvh w-full  max-w-xl items-center justify-center gap-4">
      <div className="flex size-full flex-col  justify-center gap-8">
        <h1 className="text-start text-3xl">Normal Range</h1>
        <div className="flex aspect-video h-40 min-w-96 items-center justify-center rounded-xl border p-2 shadow-md">
          <Range min={rangeData.min} max={rangeData.max} />
        </div>
      </div>
    </div>
  );
};

export default PageExerciseOne;
