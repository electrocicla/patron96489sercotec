const SCORE_PATTERN = /(?:^|[^\d])(-?\d{1,3})(?:\s*([,.])\s*(\d{1,4}))?(?!\d)/;

export const normalizeScore = (input: string | null | undefined) => {
  if (!input) {
    return null;
  }

  const match = input.trim().match(SCORE_PATTERN);
  if (!match) {
    return null;
  }

  const integerPart = match[1];
  const decimalPart = match[3]?.replace(/0+$/, "") ?? "";
  return decimalPart.length > 0 ? `${integerPart}.${decimalPart}` : integerPart;
};

export const isKnownRepeatedScore = (normalizedScore: string | null) =>
  normalizedScore === "96.489";
