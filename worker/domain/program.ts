import { PROGRAM_OPTIONS, type Program } from "@/types/reports";

export { PROGRAM_OPTIONS, type Program };

export const isProgram = (value: string): value is Program =>
  PROGRAM_OPTIONS.some((program) => program === value);
