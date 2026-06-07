export interface PatternFlags {
  patternScore96489: boolean;
  patternSameMessage: boolean;
  patternCapitalAbejaPendingWithScore: boolean;
}

export const emptyPatternFlags = (): PatternFlags => ({
  patternScore96489: false,
  patternSameMessage: false,
  patternCapitalAbejaPendingWithScore: false
});
