import getRangeValueData from "@/api/range-fetcher";
import Link from "next/link";
import Range from "../components/ui/range/range";

const PageExerciseOne = async () => {
  const rangeData = await getRangeValueData();

  return (
    <div className="mx-auto flex h-dvh w-full max-w-xl items-center justify-center gap-4">
      <div className="flex w-96 flex-col  gap-6">
        <h1 className="text-start text-3xl">Normal Range</h1>
        <div className="flex flex-col items-center gap-6  rounded-xl border p-10">
          <Range min={rangeData.min} max={rangeData.max} />
        </div>
        <Link
          className="self-center text-gray-600 hover:underline"
          href="/exercise2"
        >
          Go to exercise 2
        </Link>
      </div>
    </div>
  );
};

export default PageExerciseOne;
