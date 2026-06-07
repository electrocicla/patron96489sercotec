import { REGION_OPTIONS, type Region } from "@/types/reports";

export { REGION_OPTIONS, type Region };

export const isRegion = (value: string): value is Region =>
  REGION_OPTIONS.some((region) => region === value);
