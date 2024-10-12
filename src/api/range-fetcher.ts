import { RangeResponse } from "./types/range-response.types";

const getRangeValueData = async (): Promise<RangeResponse> => {
  const fetchRangeData = await fetch(`${process.env.BASE_URL}range-data`);

  if (!fetchRangeData.ok) {
    throw new Error("Failed to fetch range data");
  }

  return fetchRangeData.json();
};

export default getRangeValueData;
