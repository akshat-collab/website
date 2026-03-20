/**
 * LEVEL 4: Statistics for Data Science
 * Topics: Descriptive, Probability, Bayes, Distributions, Hypothesis, A/B, Confidence Intervals
 */

import type { CodingExercise, Mcq } from "./schema";
import type { MiniAssignment } from "./level1ContentExtended";

// ─── TOPIC 1: Descriptive Statistics ───────────────────────────────────────
export const LEVEL4_T1_EXERCISES: CodingExercise[] = [
  { id: "l4-t1-e1", topicId: "t4-descriptive", title: "Mean", description: "Return mean of list.", difficulty: "easy", type: "short", boilerplate: { python: "def mean_arr(arr):\n    return sum(arr) / len(arr) if arr else 0" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: 3 }], hints: [] },
  { id: "l4-t1-e2", topicId: "t4-descriptive", title: "Median", description: "Return median of list.", difficulty: "easy", type: "short", boilerplate: { python: "def median_arr(arr):\n    s = sorted(arr)\n    n = len(s)\n    return (s[n//2-1] + s[n//2]) / 2 if n % 2 == 0 else s[n//2]" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: 3 }, { input: "[1,2,3,4]", expectedOutput: 2.5 }], hints: [] },
  { id: "l4-t1-e3", topicId: "t4-descriptive", title: "Variance", description: "Return population variance.", difficulty: "easy", type: "short", boilerplate: { python: "def variance(arr):\n    m = sum(arr)/len(arr)\n    return sum((x-m)**2 for x in arr) / len(arr)" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: 2 }], hints: [] },
  { id: "l4-t1-e4", topicId: "t4-descriptive", title: "Std Dev", description: "Return population standard deviation.", difficulty: "easy", type: "short", boilerplate: { python: "def std_dev(arr):\n    import math\n    m = sum(arr)/len(arr)\n    v = sum((x-m)**2 for x in arr) / len(arr)\n    return math.sqrt(v)" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: 1.4142135623730951 }], hints: [] },
  { id: "l4-t1-e5", topicId: "t4-descriptive", title: "Range", description: "Return max - min.", difficulty: "easy", type: "short", boilerplate: { python: "def data_range(arr):\n    return max(arr) - min(arr) if arr else 0" }, testCases: [{ input: "[1,5,3,9,2]", expectedOutput: 8 }], hints: [] },
  { id: "l4-t1-m1", topicId: "t4-descriptive", title: "IQR", description: "Return interquartile range (Q3 - Q1).", difficulty: "medium", type: "medium", boilerplate: { python: "def iqr(arr):\n    s = sorted(arr)\n    n = len(s)\n    q1 = s[n//4] if n >= 4 else s[0]\n    q3 = s[3*n//4] if n >= 4 else s[-1]\n    return q3 - q1" }, testCases: [{ input: "[1,2,3,4,5,6,7,8]", expectedOutput: 4 }], hints: [] },
  { id: "l4-t1-m2", topicId: "t4-descriptive", title: "Percentile", description: "Return p-th percentile (0-100). Linear interpolation.", difficulty: "medium", type: "medium", boilerplate: { python: "def percentile(arr, p):\n    s = sorted(arr)\n    n = len(s)\n    k = (n-1) * p / 100\n    f = int(k)\n    c = min(f + 1, n - 1)\n    return s[f] + (k-f)*(s[c]-s[f]) if f != c else s[f]" }, testCases: [{ input: "[1,2,3,4,5], 50", expectedOutput: 3 }], hints: [] },
];

export const LEVEL4_T1_MCQS: Mcq[] = [
  { id: "l4-t1-q1", topicId: "t4-descriptive", question: "Which measure is most robust to outliers?", options: [{ id: "a", text: "Mean", isCorrect: false }, { id: "b", text: "Median", isCorrect: true, explanation: "Median uses middle value" }, { id: "c", text: "Mode", isCorrect: false }, { id: "d", text: "Range", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t1-q2", topicId: "t4-descriptive", question: "Variance is?", options: [{ id: "a", text: "Average squared deviation from mean", isCorrect: true, explanation: "σ² = Σ(x-μ)²/n" }, { id: "b", text: "Square root of mean", isCorrect: false }, { id: "c", text: "Max - min", isCorrect: false }, { id: "d", text: "Same as std dev", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t1-q3", topicId: "t4-descriptive", question: "IQR contains the middle?", options: [{ id: "a", text: "25% of data", isCorrect: false }, { id: "b", text: "50% of data", isCorrect: true, explanation: "Q3 - Q1" }, { id: "c", text: "75% of data", isCorrect: false }, { id: "d", text: "100% of data", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t1-q4", topicId: "t4-descriptive", question: "50th percentile equals?", options: [{ id: "a", text: "Mean", isCorrect: false }, { id: "b", text: "Median", isCorrect: true, explanation: "Middle value" }, { id: "c", text: "Mode", isCorrect: false }, { id: "d", text: "Q1", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t1-q5", topicId: "t4-descriptive", question: "When is mean preferred over median?", options: [{ id: "a", text: "Skewed data", isCorrect: false }, { id: "b", text: "Symmetric data, no outliers", isCorrect: true, explanation: "Mean uses all data" }, { id: "c", text: "Categorical data", isCorrect: false }, { id: "d", text: "Small sample", isCorrect: false }], difficulty: "medium", type: "basic" },
];

export const LEVEL4_T1_ASSIGN: MiniAssignment = {
  id: "l4-t1-assign", topicId: "t4-descriptive", title: "Summary Statistics",
  description: "Implement a full summary: mean, median, mode, variance, std, range, IQR, quartiles. Handle edge cases. Compare mean vs median for skewed data.",
  rubric: [{ criterion: "Central tendency", points: 30 }, { criterion: "Dispersion", points: 35 }, { criterion: "Edge cases", points: 20 }, { criterion: "Analysis", points: 15 }],
};

// ─── TOPIC 2: Probability ───────────────────────────────────────────────────
export const LEVEL4_T2_EXERCISES: CodingExercise[] = [
  { id: "l4-t2-e1", topicId: "t4-probability", title: "Union", description: "P(A∪B) = P(A)+P(B)-P(A∩B). Return union prob.", difficulty: "easy", type: "short", boilerplate: { python: "def prob_union(pa, pb, pab):\n    return pa + pb - pab" }, testCases: [{ input: "0.5, 0.3, 0.1", expectedOutput: 0.7 }], hints: [] },
  { id: "l4-t2-e2", topicId: "t4-probability", title: "Conditional", description: "P(A|B) = P(A∩B)/P(B).", difficulty: "easy", type: "short", boilerplate: { python: "def prob_cond(pab, pb):\n    return pab / pb if pb else 0" }, testCases: [{ input: "0.2, 0.5", expectedOutput: 0.4 }], hints: [] },
  { id: "l4-t2-e3", topicId: "t4-probability", title: "Independent", description: "Check if P(A∩B) = P(A)*P(B). Return True/False.", difficulty: "easy", type: "short", boilerplate: { python: "def is_independent(pa, pb, pab):\n    return abs(pab - pa*pb) < 1e-9" }, testCases: [{ input: "0.5, 0.4, 0.2", expectedOutput: true }], hints: [] },
  { id: "l4-t2-e4", topicId: "t4-probability", title: "Complement", description: "P(not A) = 1 - P(A).", difficulty: "easy", type: "short", boilerplate: { python: "def prob_complement(pa):\n    return 1 - pa" }, testCases: [{ input: "0.3", expectedOutput: 0.7 }], hints: [] },
  { id: "l4-t2-m1", topicId: "t4-probability", title: "Joint Independent", description: "P(A∩B) when A,B independent.", difficulty: "medium", type: "medium", boilerplate: { python: "def joint_independent(pa, pb):\n    return pa * pb" }, testCases: [{ input: "0.5, 0.6", expectedOutput: 0.3 }], hints: [] },
];

export const LEVEL4_T2_MCQS: Mcq[] = [
  { id: "l4-t2-q1", topicId: "t4-probability", question: "P(A|B) means?", options: [{ id: "a", text: "Probability of A and B", isCorrect: false }, { id: "b", text: "Probability of A given B", isCorrect: true, explanation: "Conditional" }, { id: "c", text: "Probability of B given A", isCorrect: false }, { id: "d", text: "Probability of A or B", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t2-q2", topicId: "t4-probability", question: "A and B independent means?", options: [{ id: "a", text: "P(A∩B) = P(A)×P(B)", isCorrect: true, explanation: "Definition" }, { id: "b", text: "A and B never occur together", isCorrect: false }, { id: "c", text: "P(A) = P(B)", isCorrect: false }, { id: "d", text: "A causes B", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t2-q3", topicId: "t4-probability", question: "P(A∪B) = P(A)+P(B) when?", options: [{ id: "a", text: "Always", isCorrect: false }, { id: "b", text: "When A and B are mutually exclusive", isCorrect: true, explanation: "No overlap" }, { id: "c", text: "When independent", isCorrect: false }, { id: "d", text: "Never", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t2-q4", topicId: "t4-probability", question: "P(S) for sample space S?", options: [{ id: "a", text: "0", isCorrect: false }, { id: "b", text: "1", isCorrect: true, explanation: "Something must happen" }, { id: "c", text: "0.5", isCorrect: false }, { id: "d", text: "Undefined", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t2-q5", topicId: "t4-probability", question: "P(A) + P(not A) = ?", options: [{ id: "a", text: "0", isCorrect: false }, { id: "b", text: "1", isCorrect: true, explanation: "Complement rule" }, { id: "c", text: "P(A)", isCorrect: false }, { id: "d", text: "2P(A)", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL4_T2_ASSIGN: MiniAssignment = {
  id: "l4-t2-assign", topicId: "t4-probability", title: "Probability Calculator",
  description: "Implement: (1) Union, intersection, conditional. (2) Bayes from scratch. (3) Independence check. (4) Solve a word problem (e.g., dice, cards).",
  rubric: [{ criterion: "Basic ops", points: 30 }, { criterion: "Bayes", points: 30 }, { criterion: "Independence", points: 20 }, { criterion: "Word problem", points: 20 }],
};

// ─── TOPIC 3: Bayes Theorem ─────────────────────────────────────────────────
export const LEVEL4_T3_EXERCISES: CodingExercise[] = [
  { id: "l4-t3-e1", topicId: "t4-bayes", title: "Bayes Formula", description: "P(A|B) = P(B|A)*P(A)/P(B). Return posterior.", difficulty: "easy", type: "short", boilerplate: { python: "def bayes(pba, pa, pb):\n    return (pba * pa) / pb if pb else 0" }, testCases: [{ input: "0.9, 0.1, 0.2", expectedOutput: 0.45 }], hints: [] },
  { id: "l4-t3-e2", topicId: "t4-bayes", title: "Evidence", description: "P(B) = P(B|A)P(A) + P(B|not A)P(not A). Return P(B).", difficulty: "easy", type: "short", boilerplate: { python: "def evidence(pba, pa, pbna, pna):\n    return pba*pa + pbna*pna" }, testCases: [{ input: "0.9, 0.1, 0.2, 0.9", expectedOutput: 0.27 }], hints: [] },
  { id: "l4-t3-m1", topicId: "t4-bayes", title: "Bayes Full", description: "Given P(A), P(B|A), P(B|not A). Return P(A|B).", difficulty: "medium", type: "medium", boilerplate: { python: "def bayes_full(pa, pba, pbna):\n    pb = pba*pa + pbna*(1-pa)\n    return (pba*pa)/pb if pb else 0" }, testCases: [{ input: "0.01, 0.9, 0.1", expectedOutput: 0.08264462809917356 }], hints: [] },
];

export const LEVEL4_T3_MCQS: Mcq[] = [
  { id: "l4-t3-q1", topicId: "t4-bayes", question: "In Bayes, P(A) is the?", options: [{ id: "a", text: "Prior", isCorrect: true, explanation: "Before evidence" }, { id: "b", text: "Posterior", isCorrect: false }, { id: "c", text: "Likelihood", isCorrect: false }, { id: "d", text: "Evidence", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t3-q2", topicId: "t4-bayes", question: "P(B|A) in Bayes is?", options: [{ id: "a", text: "Prior", isCorrect: false }, { id: "b", text: "Likelihood", isCorrect: true, explanation: "Probability of evidence given hypothesis" }, { id: "c", text: "Posterior", isCorrect: false }, { id: "d", text: "Evidence", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t3-q3", topicId: "t4-bayes", question: "Bayes updates?", options: [{ id: "a", text: "Prior to posterior with evidence", isCorrect: true, explanation: "Belief update" }, { id: "b", text: "Mean to median", isCorrect: false }, { id: "c", text: "Variance", isCorrect: false }, { id: "d", text: "Sample size", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL4_T3_ASSIGN: MiniAssignment = {
  id: "l4-t3-assign", topicId: "t4-bayes", title: "Bayesian Analysis",
  description: "Solve: (1) Medical test: P(disease)=0.01, P(positive|disease)=0.95, P(positive|healthy)=0.05. Find P(disease|positive). (2) Spam filter scenario. (3) Document your reasoning.",
  rubric: [{ criterion: "Medical problem", points: 40 }, { criterion: "Spam scenario", points: 40 }, { criterion: "Documentation", points: 20 }],
};

// ─── TOPIC 4: Distributions ────────────────────────────────────────────────
export const LEVEL4_T4_EXERCISES: CodingExercise[] = [
  { id: "l4-t4-e1", topicId: "t4-distributions", title: "Correlation", description: "Return Pearson correlation of x, y.", difficulty: "easy", type: "short", boilerplate: { python: "def correlation(x, y):\n    import math\n    n = len(x)\n    mx, my = sum(x)/n, sum(y)/n\n    sx = math.sqrt(sum((a-mx)**2 for a in x)/n)\n    sy = math.sqrt(sum((b-my)**2 for b in y)/n)\n    return sum((a-mx)*(b-my) for a,b in zip(x,y))/(n*sx*sy) if sx*sy else 0" }, testCases: [{ input: "[1,2,3,4,5], [2,4,6,8,10]", expectedOutput: 1 }], hints: [] },
  { id: "l4-t4-e2", topicId: "t4-distributions", title: "Z-Score", description: "Return z-score of x given mean and std.", difficulty: "easy", type: "short", boilerplate: { python: "def z_score(x, mean, std):\n    return (x - mean) / std if std else 0" }, testCases: [{ input: "75, 70, 5", expectedOutput: 1 }], hints: [] },
  { id: "l4-t4-e3", topicId: "t4-distributions", title: "Covariance", description: "Return sample covariance of x, y.", difficulty: "easy", type: "short", boilerplate: { python: "def covariance(x, y):\n    n = len(x)\n    mx, my = sum(x)/n, sum(y)/n\n    return sum((a-mx)*(b-my) for a,b in zip(x,y)) / (n-1) if n>1 else 0" }, testCases: [{ input: "[1,2,3], [4,5,6]", expectedOutput: 1 }], hints: [] },
  { id: "l4-t4-m1", topicId: "t4-distributions", title: "Correlation Matrix", description: "Return 2x2 correlation matrix for two columns.", difficulty: "medium", type: "medium", boilerplate: { python: "def corr_matrix(x, y):\n    def corr(a, b):\n        n=len(a); mx=sum(a)/n; my=sum(b)/n\n        sx=(sum((v-mx)**2 for v in a)/n)**0.5\n        sy=(sum((v-my)**2 for v in b)/n)**0.5\n        return sum((a[i]-mx)*(b[i]-my) for i in range(n))/(n*sx*sy) if sx*sy else 0\n    r = corr(x, y)\n    return [[1, r], [r, 1]]" }, testCases: [{ input: "[1,2,3], [1,2,3]", expectedOutput: [[1, 1], [1, 1]] }], hints: [] },
];

export const LEVEL4_T4_MCQS: Mcq[] = [
  { id: "l4-t4-q1", topicId: "t4-distributions", question: "68% of normal data lies within?", options: [{ id: "a", text: "1 standard deviation of mean", isCorrect: true, explanation: "68-95-99.7 rule" }, { id: "b", text: "2 std", isCorrect: false }, { id: "c", text: "Median", isCorrect: false }, { id: "d", text: "IQR", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t4-q2", topicId: "t4-distributions", question: "Correlation r=0 means?", options: [{ id: "a", text: "No linear relationship", isCorrect: true, explanation: "Not necessarily independent" }, { id: "b", text: "No relationship", isCorrect: false }, { id: "c", text: "Perfect negative", isCorrect: false }, { id: "d", text: "Error", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t4-q3", topicId: "t4-distributions", question: "Correlation implies causation?", options: [{ id: "a", text: "Yes", isCorrect: false }, { id: "b", text: "No", isCorrect: true, explanation: "Classic fallacy" }, { id: "c", text: "Sometimes", isCorrect: false }, { id: "d", text: "Only if r=1", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t4-q4", topicId: "t4-distributions", question: "r ranges from?", options: [{ id: "a", text: "0 to 1", isCorrect: false }, { id: "b", text: "-1 to 1", isCorrect: true, explanation: "Pearson correlation" }, { id: "c", text: "-1 to 0", isCorrect: false }, { id: "d", text: "0 to 100", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL4_T4_ASSIGN: MiniAssignment = {
  id: "l4-t4-assign", topicId: "t4-distributions", title: "Distribution Analysis",
  description: "Given a dataset: (1) Check normality (visual or test). (2) Compute correlation matrix. (3) Identify outliers using z-score. (4) Discuss correlation vs causation.",
  rubric: [{ criterion: "Normality", points: 25 }, { criterion: "Correlation", points: 35 }, { criterion: "Outliers", points: 25 }, { criterion: "Discussion", points: 15 }],
};

// ─── TOPIC 5: Hypothesis Testing ───────────────────────────────────────────
export const LEVEL4_T5_EXERCISES: CodingExercise[] = [
  { id: "l4-t5-e1", topicId: "t4-hypothesis", title: "Reject Check", description: "Return True if p < alpha (reject H0).", difficulty: "easy", type: "short", boilerplate: { python: "def reject_null(p, alpha):\n    return p < alpha" }, testCases: [{ input: "0.03, 0.05", expectedOutput: true }, { input: "0.07, 0.05", expectedOutput: false }], hints: [] },
  { id: "l4-t5-e2", topicId: "t4-hypothesis", title: "Z Critical", description: "Return 1.96 for 95%, 2.576 for 99%. alpha 0.05->1.96, 0.01->2.576.", difficulty: "easy", type: "short", boilerplate: { python: "def z_critical(alpha):\n    return 2.576 if alpha == 0.01 else 1.96" }, testCases: [{ input: "0.05", expectedOutput: 1.96 }], hints: [] },
  { id: "l4-t5-e3", topicId: "t4-hypothesis", title: "SE Mean", description: "Standard error of mean: std/sqrt(n).", difficulty: "easy", type: "short", boilerplate: { python: "def se_mean(std, n):\n    import math\n    return std / math.sqrt(n) if n else 0" }, testCases: [{ input: "10, 100", expectedOutput: 1 }], hints: [] },
  { id: "l4-t5-m1", topicId: "t4-hypothesis", title: "Z Test Stat", description: "Z = (x_bar - mu) / (sigma/sqrt(n)).", difficulty: "medium", type: "medium", boilerplate: { python: "def z_stat(xbar, mu, sigma, n):\n    import math\n    return (xbar - mu) / (sigma / math.sqrt(n)) if n and sigma else 0" }, testCases: [{ input: "52, 50, 10, 100", expectedOutput: 2 }], hints: [] },
];

export const LEVEL4_T5_MCQS: Mcq[] = [
  { id: "l4-t5-q1", topicId: "t4-hypothesis", question: "p-value < 0.05 means?", options: [{ id: "a", text: "Reject null at 5% level", isCorrect: true, explanation: "Significant result" }, { id: "b", text: "Accept null", isCorrect: false }, { id: "c", text: "95% sure", isCorrect: false }, { id: "d", text: "Effect is large", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t5-q2", topicId: "t4-hypothesis", question: "Null hypothesis H0 is?", options: [{ id: "a", text: "What we want to prove", isCorrect: false }, { id: "b", text: "Default/no effect assumption", isCorrect: true, explanation: "Status quo" }, { id: "c", text: "Always false", isCorrect: false }, { id: "d", text: "Alternative", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t5-q3", topicId: "t4-hypothesis", question: "Type I error is?", options: [{ id: "a", text: "Rejecting true H0", isCorrect: true, explanation: "False positive" }, { id: "b", text: "Failing to reject false H0", isCorrect: false }, { id: "c", text: "Accepting H0", isCorrect: false }, { id: "d", text: "Large p-value", isCorrect: false }], difficulty: "medium", type: "basic" },
  { id: "l4-t5-q4", topicId: "t4-hypothesis", question: "t-test is used when?", options: [{ id: "a", text: "Comparing means, unknown population std", isCorrect: true, explanation: "Use sample std" }, { id: "b", text: "Comparing proportions", isCorrect: false }, { id: "c", text: "Categorical data", isCorrect: false }, { id: "d", text: "Known population std", isCorrect: false }], difficulty: "medium", type: "basic" },
  { id: "l4-t5-q5", topicId: "t4-hypothesis", question: "Alpha = 0.05 means?", options: [{ id: "a", text: "5% chance of Type I error", isCorrect: true, explanation: "Significance level" }, { id: "b", text: "95% confidence", isCorrect: false }, { id: "c", text: "5% power", isCorrect: false }, { id: "d", text: "p-value threshold", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL4_T5_ASSIGN: MiniAssignment = {
  id: "l4-t5-assign", topicId: "t4-hypothesis", title: "Hypothesis Test Report",
  description: "Given two samples: (1) State H0 and H1. (2) Choose test (t, z, etc.). (3) Compute test statistic and p-value. (4) Conclude and interpret. (5) Discuss Type I/II error.",
  rubric: [{ criterion: "Hypotheses", points: 15 }, { criterion: "Test choice", points: 20 }, { criterion: "Computation", points: 35 }, { criterion: "Conclusion", points: 20 }, { criterion: "Error discussion", points: 10 }],
};

// ─── TOPIC 6: A/B Testing ───────────────────────────────────────────────────
export const LEVEL4_T6_EXERCISES: CodingExercise[] = [
  { id: "l4-t6-e1", topicId: "t4-ab", title: "Conversion Rate", description: "Return conversion rate: conversions/total.", difficulty: "easy", type: "short", boilerplate: { python: "def conversion_rate(conversions, total):\n    return conversions / total if total else 0" }, testCases: [{ input: "25, 1000", expectedOutput: 0.025 }], hints: [] },
  { id: "l4-t6-e2", topicId: "t4-ab", title: "Pooled SE", description: "Pooled std error for two proportions: sqrt(p*(1-p)*(1/n1+1/n2)).", difficulty: "easy", type: "short", boilerplate: { python: "import math\ndef pooled_se(p, n1, n2):\n    return math.sqrt(p*(1-p)*(1/n1+1/n2)) if n1 and n2 else 0" }, testCases: [{ input: "0.1, 100, 100", expectedOutput: 0.04242640687119285 }], hints: [] },
  { id: "l4-t6-m1", topicId: "t4-ab", title: "Lift", description: "Return % lift: (B-A)/A * 100.", difficulty: "medium", type: "medium", boilerplate: { python: "def lift(rate_a, rate_b):\n    return ((rate_b - rate_a) / rate_a * 100) if rate_a else 0" }, testCases: [{ input: "0.1, 0.12", expectedOutput: 20 }], hints: [] },
];

export const LEVEL4_T6_MCQS: Mcq[] = [
  { id: "l4-t6-q1", topicId: "t4-ab", question: "A/B test compares?", options: [{ id: "a", text: "Two variants (control vs treatment)", isCorrect: true, explanation: "Classic setup" }, { id: "b", text: "Before and after", isCorrect: false }, { id: "c", text: "Two different metrics", isCorrect: false }, { id: "d", text: "Sample sizes", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t6-q2", topicId: "t4-ab", question: "Randomization in A/B ensures?", options: [{ id: "a", text: "Unbiased group assignment", isCorrect: true, explanation: "Avoid selection bias" }, { id: "b", text: "Equal sample sizes", isCorrect: false }, { id: "c", text: "Faster results", isCorrect: false }, { id: "d", text: "Higher conversion", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t6-q3", topicId: "t4-ab", question: "When to stop an A/B test?", options: [{ id: "a", text: "When you see a winner", isCorrect: false }, { id: "b", text: "After pre-determined sample size or duration", isCorrect: true, explanation: "Avoid peeking" }, { id: "c", text: "After 1 day", isCorrect: false }, { id: "d", text: "When p < 0.05 once", isCorrect: false }], difficulty: "medium", type: "basic" },
];

export const LEVEL4_T6_ASSIGN: MiniAssignment = {
  id: "l4-t6-assign", topicId: "t4-ab", title: "A/B Test Design",
  description: "Design an A/B test: (1) Define metric and hypothesis. (2) Calculate required sample size. (3) Describe randomization. (4) Specify decision rule. (5) Discuss pitfalls (peeking, multiple comparisons).",
  rubric: [{ criterion: "Metric and hypothesis", points: 25 }, { criterion: "Sample size", points: 25 }, { criterion: "Randomization", points: 20 }, { criterion: "Decision rule", points: 15 }, { criterion: "Pitfalls", points: 15 }],
};

// ─── TOPIC 7: Confidence Intervals ─────────────────────────────────────────
export const LEVEL4_T7_EXERCISES: CodingExercise[] = [
  { id: "l4-t7-e1", topicId: "t4-confidence", title: "CI Width", description: "Half-width = z * (sigma/sqrt(n)). Return half-width.", difficulty: "easy", type: "short", boilerplate: { python: "import math\ndef ci_half_width(z, sigma, n):\n    return z * (sigma / math.sqrt(n)) if n else 0" }, testCases: [{ input: "1.96, 10, 100", expectedOutput: 1.96 }], hints: [] },
  { id: "l4-t7-e2", topicId: "t4-confidence", title: "CI Bounds", description: "Return [lower, upper] for mean. CI = xbar ± z*(s/sqrt(n)).", difficulty: "easy", type: "short", boilerplate: { python: "import math\ndef ci_bounds(xbar, s, n, z):\n    h = z * (s / math.sqrt(n)) if n else 0\n    return [round(xbar - h, 2), round(xbar + h, 2)]" }, testCases: [{ input: "50, 10, 100, 1.96", expectedOutput: [48.04, 51.96] }], hints: [] },
  { id: "l4-t7-e3", topicId: "t4-confidence", title: "N for Width", description: "n = (z*sigma/E)^2 to get margin E. Return n.", difficulty: "easy", type: "short", boilerplate: { python: "import math\ndef n_for_margin(z, sigma, E):\n    return int(math.ceil((z*sigma/E)**2)) if E else 0" }, testCases: [{ input: "1.96, 10, 2", expectedOutput: 97 }], hints: [] },
  { id: "l4-t7-m1", topicId: "t4-confidence", title: "CI for Proportion", description: "p ± z*sqrt(p(1-p)/n). Return [lower, upper] rounded to 3 decimals.", difficulty: "medium", type: "medium", boilerplate: { python: "import math\ndef ci_proportion(p, n, z):\n    se = math.sqrt(p*(1-p)/n) if n else 0\n    lo = round(max(0, p - z*se), 3)\n    hi = round(min(1, p + z*se), 3)\n    return [lo, hi]" }, testCases: [{ input: "0.5, 100, 1.96", expectedOutput: [0.402, 0.598] }], hints: [] },
];

export const LEVEL4_T7_MCQS: Mcq[] = [
  { id: "l4-t7-q1", topicId: "t4-confidence", question: "95% CI means?", options: [{ id: "a", text: "95% probability true value in interval", isCorrect: false }, { id: "b", text: "95% of such intervals contain true value", isCorrect: true, explanation: "Frequentist interpretation" }, { id: "c", text: "95% of data in interval", isCorrect: false }, { id: "d", text: "Interval is 95% wide", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t7-q2", topicId: "t4-confidence", question: "Larger n gives?", options: [{ id: "a", text: "Wider CI", isCorrect: false }, { id: "b", text: "Narrower CI", isCorrect: true, explanation: "More precision" }, { id: "c", text: "Same CI", isCorrect: false }, { id: "d", text: "Higher confidence", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t7-q3", topicId: "t4-confidence", question: "z=1.96 for?", options: [{ id: "a", text: "90% CI", isCorrect: false }, { id: "b", text: "95% CI", isCorrect: true, explanation: "Standard normal" }, { id: "c", text: "99% CI", isCorrect: false }, { id: "d", text: "50% CI", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l4-t7-q4", topicId: "t4-confidence", question: "Use t instead of z when?", options: [{ id: "a", text: "Population std unknown, small n", isCorrect: true, explanation: "t-distribution" }, { id: "b", text: "Large n", isCorrect: false }, { id: "c", text: "Known sigma", isCorrect: false }, { id: "d", text: "Proportions", isCorrect: false }], difficulty: "medium", type: "basic" },
];

export const LEVEL4_T7_ASSIGN: MiniAssignment = {
  id: "l4-t7-assign", topicId: "t4-confidence", title: "Confidence Interval Analysis",
  description: "Given sample data: (1) Compute 95% CI for mean. (2) Compute 99% CI. Compare widths. (3) Determine n needed for margin E. (4) CI for proportion. (5) Interpret results.",
  rubric: [{ criterion: "95% CI mean", points: 25 }, { criterion: "99% CI", points: 20 }, { criterion: "Sample size", points: 25 }, { criterion: "Proportion CI", points: 20 }, { criterion: "Interpretation", points: 10 }],
};

// ─── Combined exports ────────────────────────────────────────────────────
export const LEVEL4_ALL_EXERCISES: CodingExercise[] = [
  ...LEVEL4_T1_EXERCISES,
  ...LEVEL4_T2_EXERCISES,
  ...LEVEL4_T3_EXERCISES,
  ...LEVEL4_T4_EXERCISES,
  ...LEVEL4_T5_EXERCISES,
  ...LEVEL4_T6_EXERCISES,
  ...LEVEL4_T7_EXERCISES,
];

export const LEVEL4_ALL_MCQS: Mcq[] = [
  ...LEVEL4_T1_MCQS,
  ...LEVEL4_T2_MCQS,
  ...LEVEL4_T3_MCQS,
  ...LEVEL4_T4_MCQS,
  ...LEVEL4_T5_MCQS,
  ...LEVEL4_T6_MCQS,
  ...LEVEL4_T7_MCQS,
];

export const LEVEL4_ALL_ASSIGNMENTS: Record<string, MiniAssignment> = {
  "t4-descriptive": LEVEL4_T1_ASSIGN,
  "t4-probability": LEVEL4_T2_ASSIGN,
  "t4-bayes": LEVEL4_T3_ASSIGN,
  "t4-distributions": LEVEL4_T4_ASSIGN,
  "t4-hypothesis": LEVEL4_T5_ASSIGN,
  "t4-ab": LEVEL4_T6_ASSIGN,
  "t4-confidence": LEVEL4_T7_ASSIGN,
};
