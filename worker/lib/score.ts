const SCORE_PATTERN = /(\d{1,3})\s*([,.])\s*(\d{1,3})/;

export const normalizeScore = (input: string | null | undefined) => {
  if (!input) {
    return null;
  }

  const match = input.trim().match(SCORE_PATTERN);
  if (!match) {
    return null;
  }

  const integerPart = match[1];
  const decimalPart = match[3];
  return `${integerPart}.${decimalPart}`;
};

export const isKnownRepeatedScore = (normalizedScore: string | null) =>
  normalizedScore === "96.489";
