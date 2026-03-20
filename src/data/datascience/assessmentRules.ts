/**
 * Auto-Grading System Rules
 * Hidden test cases, partial scoring, validation logic
 */

export const ASSESSMENT_RULES = {
  coding: {
    visibleTestCases: 2,
    hiddenTestCases: 5,
    partialScoring: true,
    scoringWeights: {
      visible: 0.3,
      hidden: 0.7,
    },
    timeLimitSeconds: 30,
    memoryLimitMB: 256,
  },
  mcq: {
    singleAttempt: false,
    showExplanationAfterSubmit: true,
    negativeMarking: false,
  },
  fillInBlanks: {
    caseSensitive: false,
    trimWhitespace: true,
    allowSynonyms: true,
  },
  outputPrediction: {
    exactMatch: true,
    normalizeWhitespace: true,
  },
  plagiarismDetection: {
    enabled: true,
    checks: ["structure_similarity", "variable_renaming", "comment_stripping"],
    threshold: 0.85,
  },
  datasetSubmission: {
    maxSizeMB: 50,
    allowedFormats: ["csv", "json", "parquet"],
    schemaValidation: true,
  },
  mlModelValidator: {
    metrics: ["accuracy", "f1", "auc_roc"],
    minThresholds: { accuracy: 0.6, f1: 0.5 },
    testSetSplit: 0.2,
  },
};
