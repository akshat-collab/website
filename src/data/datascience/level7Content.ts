/**
 * LEVEL 7: Advanced ML + Data Engineering
 * Topics: Feature Eng, Feature Sel, Pipelines, Imbalanced, Deep Learning, NLP, Deployment
 */

import type { CodingExercise, Mcq } from "./schema";
import type { MiniAssignment } from "./level1ContentExtended";

// ─── TOPIC 1: Feature Engineering ────────────────────────────────────────
export const LEVEL7_T1_EXERCISES: CodingExercise[] = [
  { id: "l7-t1-e1", topicId: "t7-feature-eng", title: "Binning", description: "Return bin index (0,1,2) for value x given edges [0,10,20]. x<10->0, 10<=x<20->1, x>=20->2.", difficulty: "easy", type: "short", boilerplate: { python: "def bin_value(x, edges):\n    for i, e in enumerate(edges):\n        if x < e: return i\n    return len(edges)" }, testCases: [{ input: "15, [0,10,20]", expectedOutput: 1 }], hints: [] },
  { id: "l7-t1-e2", topicId: "t7-feature-eng", title: "One-Hot Encode", description: "Given value and categories list, return one-hot list. E.g. 'b', ['a','b','c'] -> [0,1,0].", difficulty: "easy", type: "short", boilerplate: { python: "def one_hot(val, categories):\n    return [1 if c == val else 0 for c in categories]" }, testCases: [{ input: '"b", ["a","b","c"]', expectedOutput: [0, 1, 0] }], hints: [] },
  { id: "l7-t1-e3", topicId: "t7-feature-eng", title: "Polynomial Feature", description: "Return [x, x^2, x^3] for value x.", difficulty: "easy", type: "short", boilerplate: { python: "def poly_features(x, degree):\n    return [x**i for i in range(1, degree+1)]" }, testCases: [{ input: "2, 3", expectedOutput: [2, 4, 8] }], hints: [] },
  { id: "l7-t1-e4", topicId: "t7-feature-eng", title: "Log Transform", description: "Return log(1+x) for x (handle 0).", difficulty: "easy", type: "short", boilerplate: { python: "import math\ndef log_transform(x):\n    return math.log1p(x)" }, testCases: [{ input: "0", expectedOutput: 0 }, { input: "1", expectedOutput: 0.6931471805599453 }], hints: [] },
  { id: "l7-t1-e5", topicId: "t7-feature-eng", title: "Ratio Feature", description: "Return a/b if b!=0 else 0.", difficulty: "easy", type: "short", boilerplate: { python: "def ratio_feature(a, b):\n    return a / b if b else 0" }, testCases: [{ input: "10, 2", expectedOutput: 5 }, { input: "5, 0", expectedOutput: 0 }], hints: [] },
];

export const LEVEL7_T1_MCQS: Mcq[] = [
  { id: "l7-t1-q1", topicId: "t7-feature-eng", question: "Binning converts?", options: [{ id: "a", text: "Continuous to categorical", isCorrect: true, explanation: "Discretization" }, { id: "b", text: "Categorical to continuous", isCorrect: false }, { id: "c", text: "Text to numbers", isCorrect: false }, { id: "d", text: "Missing to zero", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l7-t1-q2", topicId: "t7-feature-eng", question: "One-hot encoding avoids?", options: [{ id: "a", text: "Implied order in categories", isCorrect: true, explanation: "No ordinal assumption" }, { id: "b", text: "Missing values", isCorrect: false }, { id: "c", text: "High cardinality", isCorrect: false }, { id: "d", text: "Outliers", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l7-t1-q3", topicId: "t7-feature-eng", question: "Log transform helps with?", options: [{ id: "a", text: "Skewed / right-tailed distributions", isCorrect: true, explanation: "Compresses large values" }, { id: "b", text: "Categorical data", isCorrect: false }, { id: "c", text: "Missing data", isCorrect: false }, { id: "d", text: "Class imbalance", isCorrect: false }], difficulty: "medium", type: "basic" },
];

export const LEVEL7_T1_ASSIGN: MiniAssignment = {
  id: "l7-t1-assign", topicId: "t7-feature-eng", title: "Feature Engineering Pipeline",
  description: "Implement: (1) Binning with custom edges. (2) One-hot encode a column. (3) Create interaction feature (x1*x2). (4) Extract hour from datetime string '2024-01-15 14:30:00'.",
  rubric: [{ criterion: "Binning", points: 25 }, { criterion: "One-hot", points: 25 }, { criterion: "Interaction", points: 25 }, { criterion: "Datetime", points: 25 }],
};

// ─── TOPIC 2: Feature Selection ───────────────────────────────────────────
export const LEVEL7_T2_EXERCISES: CodingExercise[] = [
  { id: "l7-t2-e1", topicId: "t7-feature-sel", title: "Correlation with Target", description: "Return absolute correlation of each column with target. Data: list of lists, last col is target.", difficulty: "medium", type: "medium", boilerplate: { python: "import math\ndef corr_with_target(data):\n    n = len(data)\n    ncols = len(data[0]) - 1\n    y = [row[-1] for row in data]\n    my = sum(y)/n\n    sy = math.sqrt(sum((a-my)**2 for a in y)/n) or 1e-10\n    out = []\n    for j in range(ncols):\n        x = [row[j] for row in data]\n        mx = sum(x)/n\n        sx = math.sqrt(sum((a-mx)**2 for a in x)/n) or 1e-10\n        r = sum((x[i]-mx)*(y[i]-my) for i in range(n))/(n*sx*sy)\n        out.append(abs(r))\n    return out" }, testCases: [{ input: "[[1,2,5],[2,4,10],[3,6,15]]", expectedOutput: [1, 1] }], hints: [] },
  { id: "l7-t2-e2", topicId: "t7-feature-sel", title: "Variance Threshold", description: "Return indices of columns with variance > threshold. Data: list of lists.", difficulty: "easy", type: "short", boilerplate: { python: "def variance_threshold(data, thresh):\n    n = len(data)\n    if n == 0: return []\n    out = []\n    for j in range(len(data[0])):\n        col = [row[j] for row in data]\n        m = sum(col)/n\n        v = sum((x-m)**2 for x in col)/n\n        if v > thresh: out.append(j)\n    return out" }, testCases: [{ input: "[[1,0],[2,0],[3,0]], 0.5", expectedOutput: [0] }], hints: [] },
  { id: "l7-t2-e3", topicId: "t7-feature-sel", title: "Top K by Correlation", description: "Return indices of top k columns by abs correlation with target. Use same corr logic as corr_with_target.", difficulty: "medium", type: "medium", boilerplate: { python: "import math\ndef top_k_corr(data, k):\n    n = len(data)\n    ncols = len(data[0]) - 1\n    y = [row[-1] for row in data]\n    my = sum(y)/n\n    sy = math.sqrt(sum((a-my)**2 for a in y)/n) or 1e-10\n    cors = []\n    for j in range(ncols):\n        x = [row[j] for row in data]\n        mx = sum(x)/n\n        sx = math.sqrt(sum((a-mx)**2 for a in x)/n) or 1e-10\n        r = sum((x[i]-mx)*(y[i]-my) for i in range(n))/(n*sx*sy)\n        cors.append((abs(r), j))\n    cors.sort(key=lambda x: -x[0])\n    return [i for _, i in cors[:k]]" }, testCases: [{ input: "[[1,2,5],[2,4,10],[3,6,15]], 2", expectedOutput: [0, 1] }], hints: [] },
];

export const LEVEL7_T2_MCQS: Mcq[] = [
  { id: "l7-t2-q1", topicId: "t7-feature-sel", question: "Feature selection helps with?", options: [{ id: "a", text: "Overfitting, interpretability, speed", isCorrect: true, explanation: "Fewer features" }, { id: "b", text: "Only accuracy", isCorrect: false }, { id: "c", text: "Only speed", isCorrect: false }, { id: "d", text: "Data collection", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l7-t2-q2", topicId: "t7-feature-sel", question: "Filter methods use?", options: [{ id: "a", text: "Feature scores (e.g. correlation) before model", isCorrect: true, explanation: "Independent of model" }, { id: "b", text: "Model training to select", isCorrect: false }, { id: "c", text: "Only domain knowledge", isCorrect: false }, { id: "d", text: "Manual selection only", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL7_T2_ASSIGN: MiniAssignment = {
  id: "l7-t2-assign", topicId: "t7-feature-sel", title: "Feature Selection",
  description: "Implement: (1) Correlation-based filter: drop features with |r| < threshold to target. (2) Variance filter: drop zero-variance columns. (3) Forward selection: add feature that improves metric most (simplified: add by correlation order).",
  rubric: [{ criterion: "Correlation filter", points: 35 }, { criterion: "Variance filter", points: 35 }, { criterion: "Forward selection", points: 30 }],
};

// ─── TOPIC 3: Pipelines & GridSearch ───────────────────────────────────────
export const LEVEL7_T3_EXERCISES: CodingExercise[] = [
  { id: "l7-t3-e1", topicId: "t7-pipelines", title: "Pipeline Apply", description: "Given steps [(name, fn)], data. Apply each fn to output of previous. fn(x) -> transformed.", difficulty: "medium", type: "medium", boilerplate: { python: "def pipeline_apply(steps, data):\n    x = data\n    for name, fn in steps:\n        x = fn(x)\n    return x" }, testCases: [{ input: '[(\"a\", lambda x: [v*2 for v in x]), (\"b\", lambda x: [v+1 for v in x])], [1,2,3]', expectedOutput: [3, 5, 7] }], hints: [] },
  { id: "l7-t3-e2", topicId: "t7-pipelines", title: "Grid Expand", description: "Given param_grid {a:[1,2], b:[3,4]}, return list of all combos as dicts.", difficulty: "medium", type: "medium", boilerplate: { python: "from itertools import product\ndef grid_expand(param_grid):\n    keys = list(param_grid.keys())\n    vals = [param_grid[k] for k in keys]\n    return [dict(zip(keys, p)) for p in product(*vals)]" }, testCases: [{ input: '{"a":[1,2],"b":[3]}', expectedOutput: [{ a: 1, b: 3 }, { a: 2, b: 3 }] }], hints: [] },
  { id: "l7-t3-e3", topicId: "t7-pipelines", title: "Cross-Val Split", description: "Split indices 0..n-1 into k folds. Return list of (train_idx, val_idx).", difficulty: "medium", type: "medium", boilerplate: { python: "def kfold_splits(n, k):\n    fold_size = n // k\n    out = []\n    for i in range(k):\n        val_start = i * fold_size\n        val_end = (i+1)*fold_size if i < k-1 else n\n        val_idx = list(range(val_start, val_end))\n        train_idx = [j for j in range(n) if j not in val_idx]\n        out.append((train_idx, val_idx))\n    return out" }, testCases: [{ input: "6, 3", expectedOutput: 3 }], hints: [] },
  { id: "l7-t3-e4", topicId: "t7-pipelines", title: "Best Params", description: "Given list of (params_dict, score), return params with best (max) score.", difficulty: "easy", type: "short", boilerplate: { python: "def best_params(results):\n    return max(results, key=lambda x: x[1])[0] if results else {}" }, testCases: [{ input: '[({"c":1}, 0.8), ({"c":2}, 0.9)]', expectedOutput: { c: 2 } }], hints: [] },
];

export const LEVEL7_T3_MCQS: Mcq[] = [
  { id: "l7-t3-q1", topicId: "t7-pipelines", question: "Pipeline ensures?", options: [{ id: "a", text: "No data leakage (fit on train only)", isCorrect: true, explanation: "Transform fit on train" }, { id: "b", text: "Faster training", isCorrect: false }, { id: "c", text: "More features", isCorrect: false }, { id: "d", text: "Lower memory", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l7-t3-q2", topicId: "t7-pipelines", question: "GridSearchCV does?", options: [{ id: "a", text: "Exhaustive search over param grid with CV", isCorrect: true, explanation: "All combos, cross-validate" }, { id: "b", text: "Random search only", isCorrect: false }, { id: "c", text: "Feature selection", isCorrect: false }, { id: "d", text: "Data cleaning", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL7_T3_ASSIGN: MiniAssignment = {
  id: "l7-t3-assign", topicId: "t7-pipelines", title: "Pipeline & Tuning",
  description: "Implement: (1) Simple pipeline: scale -> model. (2) Grid search: try all param combos, return best score. (3) Nested CV structure (outer fold for eval, inner for tuning).",
  rubric: [{ criterion: "Pipeline", points: 35 }, { criterion: "Grid search", points: 40 }, { criterion: "Nested CV", points: 25 }],
};

// ─── TOPIC 4: Imbalanced Data ─────────────────────────────────────────────
export const LEVEL7_T4_EXERCISES: CodingExercise[] = [
  { id: "l7-t4-e1", topicId: "t7-imbalanced", title: "Class Weights", description: "Return weight for class: n_total / (2 * n_class). Balanced weight.", difficulty: "easy", type: "short", boilerplate: { python: "def class_weight(n_total, n_class):\n    return n_total / (2 * n_class) if n_class else 0" }, testCases: [{ input: "100, 20", expectedOutput: 2.5 }], hints: [] },
  { id: "l7-t4-e2", topicId: "t7-imbalanced", title: "Oversample", description: "Given indices of minority class, return indices oversampled to match majority count. (Repeat minority indices).", difficulty: "medium", type: "medium", boilerplate: { python: "import random\ndef oversample_indices(minority_idx, majority_count):\n    n = len(minority_idx)\n    if n == 0: return []\n    return [minority_idx[i % n] for i in range(majority_count)]" }, testCases: [{ input: "[0,1], 4", expectedOutput: [0, 1, 0, 1] }], hints: [] },
];

export const LEVEL7_T4_MCQS: Mcq[] = [
  { id: "l7-t4-q1", topicId: "t7-imbalanced", question: "For imbalanced data, avoid?", options: [{ id: "a", text: "Accuracy as sole metric", isCorrect: true, explanation: "Misleading when 99% one class" }, { id: "b", text: "Precision and recall", isCorrect: false }, { id: "c", text: "Class weights", isCorrect: false }, { id: "d", text: "SMOTE", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l7-t4-q2", topicId: "t7-imbalanced", question: "SMOTE does?", options: [{ id: "a", text: "Synthetic oversampling of minority", isCorrect: true, explanation: "Create synthetic samples" }, { id: "b", text: "Undersample majority", isCorrect: false }, { id: "c", text: "Remove minority", isCorrect: false }, { id: "d", text: "Change threshold only", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL7_T4_ASSIGN: MiniAssignment = {
  id: "l7-t4-assign", topicId: "t7-imbalanced", title: "Imbalanced Data Handling",
  description: "Implement: (1) Compute class distribution. (2) Assign sample weights: inverse frequency. (3) Random oversample minority to balance. (4) Adjust decision threshold: given probs and threshold, return predictions.",
  rubric: [{ criterion: "Distribution", points: 20 }, { criterion: "Weights", points: 30 }, { criterion: "Oversample", points: 30 }, { criterion: "Threshold", points: 20 }],
};

// ─── TOPIC 5: Intro Deep Learning ─────────────────────────────────────────
export const LEVEL7_T5_EXERCISES: CodingExercise[] = [
  { id: "l7-t5-e1", topicId: "t7-deep", title: "ReLU", description: "Return max(0, x) for each element in list.", difficulty: "easy", type: "short", boilerplate: { python: "def relu(arr):\n    return [max(0, x) for x in arr]" }, testCases: [{ input: "[-1, 0, 1, 2]", expectedOutput: [0, 0, 1, 2] }], hints: [] },
  { id: "l7-t5-e2", topicId: "t7-deep", title: "Softmax", description: "Return softmax of list: exp(xi) / sum(exp(xj)).", difficulty: "medium", type: "medium", boilerplate: { python: "import math\ndef softmax(arr):\n    m = max(arr)\n    ex = [math.exp(x - m) for x in arr]\n    s = sum(ex)\n    return [e/s for e in ex]" }, testCases: [{ input: "[1, 2, 3]", expectedOutput: [0.09003057317038046, 0.24472847105479764, 0.6652409557748219] }], hints: [] },
  { id: "l7-t5-e3", topicId: "t7-deep", title: "Dot Product", description: "Return dot product of two vectors.", difficulty: "easy", type: "short", boilerplate: { python: "def dot(a, b):\n    return sum(x*y for x,y in zip(a,b))" }, testCases: [{ input: "[1,2,3], [4,5,6]", expectedOutput: 32 }], hints: [] },
];

export const LEVEL7_T5_MCQS: Mcq[] = [
  { id: "l7-t5-q1", topicId: "t7-deep", question: "ReLU(x) = max(0,x) helps with?", options: [{ id: "a", text: "Vanishing gradients (vs sigmoid)", isCorrect: true, explanation: "Non-saturating" }, { id: "b", text: "Overfitting only", isCorrect: false }, { id: "c", text: "Speed only", isCorrect: false }, { id: "d", text: "Data loading", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l7-t5-q2", topicId: "t7-deep", question: "Softmax outputs?", options: [{ id: "a", text: "Probability distribution (sum to 1)", isCorrect: true, explanation: "Multi-class" }, { id: "b", text: "Any real numbers", isCorrect: false }, { id: "c", text: "Binary 0/1", isCorrect: false }, { id: "d", text: "Logits", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL7_T5_ASSIGN: MiniAssignment = {
  id: "l7-t5-assign", topicId: "t7-deep", title: "Neural Network Basics",
  description: "Implement: (1) Forward pass: linear (Wx+b) then ReLU for one layer. (2) Softmax for output. (3) Cross-entropy loss for softmax output and one-hot target.",
  rubric: [{ criterion: "Linear + ReLU", points: 40 }, { criterion: "Softmax", points: 30 }, { criterion: "Cross-entropy", points: 30 }],
};

// ─── TOPIC 6: Basic NLP ───────────────────────────────────────────────────
export const LEVEL7_T6_EXERCISES: CodingExercise[] = [
  { id: "l7-t6-e1", topicId: "t7-nlp", title: "Tokenize", description: "Split string by spaces, lowercase, return list of words.", difficulty: "easy", type: "short", boilerplate: { python: "def tokenize(text):\n    return text.lower().split()" }, testCases: [{ input: '"Hello World"', expectedOutput: ["hello", "world"] }], hints: [] },
  { id: "l7-t6-e2", topicId: "t7-nlp", title: "Word Count", description: "Return dict of word -> count from list of words.", difficulty: "easy", type: "short", boilerplate: { python: "def word_count(words):\n    from collections import Counter\n    return dict(Counter(words))" }, testCases: [{ input: '["a","b","a","c","a"]', expectedOutput: { a: 3, b: 1, c: 1 } }], hints: [] },
  { id: "l7-t6-e3", topicId: "t7-nlp", title: "Bag of Words", description: "Given words and vocab (ordered list), return count vector.", difficulty: "medium", type: "medium", boilerplate: { python: "def bag_of_words(words, vocab):\n    from collections import Counter\n    c = Counter(words)\n    return [c.get(v, 0) for v in vocab]" }, testCases: [{ input: '["a","b","a"], ["a","b","c"]', expectedOutput: [2, 1, 0] }], hints: [] },
];

export const LEVEL7_T6_MCQS: Mcq[] = [
  { id: "l7-t6-q1", topicId: "t7-nlp", question: "Bag of words loses?", options: [{ id: "a", text: "Word order", isCorrect: true, explanation: "Only counts" }, { id: "b", text: "Word identity", isCorrect: false }, { id: "c", text: "Word count", isCorrect: false }, { id: "d", text: "Vocabulary", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l7-t6-q2", topicId: "t7-nlp", question: "TF-IDF upweights?", options: [{ id: "a", text: "Rare but discriminative terms", isCorrect: true, explanation: "IDF downweights common" }, { id: "b", text: "Common words", isCorrect: false }, { id: "c", text: "Stop words", isCorrect: false }, { id: "d", text: "All equally", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL7_T6_ASSIGN: MiniAssignment = {
  id: "l7-t6-assign", topicId: "t7-nlp", title: "NLP Pipeline",
  description: "Implement: (1) Tokenize and build vocabulary from corpus. (2) Bag-of-words for each document. (3) Simple TF: count/total_words per doc. (4) IDF: log(N/df) where df=docs containing term.",
  rubric: [{ criterion: "Tokenize + vocab", points: 25 }, { criterion: "BoW", points: 35 }, { criterion: "TF", points: 20 }, { criterion: "IDF", points: 20 }],
};

// ─── TOPIC 7: Deployment Intro ───────────────────────────────────────────
export const LEVEL7_T7_EXERCISES: CodingExercise[] = [
  { id: "l7-t7-e1", topicId: "t7-deployment", title: "Predict Wrapper", description: "Given model (dict with 'coef' and 'intercept'), features list, return prediction: coef·features + intercept.", difficulty: "easy", type: "short", boilerplate: { python: "def predict_linear(model, features):\n    return sum(model['coef'][i]*f for i,f in enumerate(features)) + model['intercept']" }, testCases: [{ input: '{"coef":[1,2],"intercept":0}, [1,1]', expectedOutput: 3 }], hints: [] },
];

export const LEVEL7_T7_MCQS: Mcq[] = [
  { id: "l7-t7-q1", topicId: "t7-deployment", question: "REST API for ML typically?", options: [{ id: "a", text: "POST /predict with JSON body", isCorrect: true, explanation: "Send features, get prediction" }, { id: "b", text: "GET only", isCorrect: false }, { id: "c", text: "WebSocket only", isCorrect: false }, { id: "d", text: "File upload only", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l7-t7-q2", topicId: "t7-deployment", question: "Model serialization uses?", options: [{ id: "a", text: "pickle, joblib", isCorrect: true, explanation: "Save/load Python objects" }, { id: "b", text: "CSV only", isCorrect: false }, { id: "c", text: "JSON only", isCorrect: false }, { id: "d", text: "Database only", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL7_T7_ASSIGN: MiniAssignment = {
  id: "l7-t7-assign", topicId: "t7-deployment", title: "Deployment Design",
  description: "Design: (1) API contract: input schema (features), output schema (prediction, confidence). (2) Preprocessing steps that must run before predict. (3) Error handling: invalid input, model load failure.",
  rubric: [{ criterion: "API contract", points: 40 }, { criterion: "Preprocessing", points: 30 }, { criterion: "Error handling", points: 30 }],
};

// ─── Combined exports ────────────────────────────────────────────────────
export const LEVEL7_ALL_EXERCISES: CodingExercise[] = [
  ...LEVEL7_T1_EXERCISES,
  ...LEVEL7_T2_EXERCISES,
  ...LEVEL7_T3_EXERCISES,
  ...LEVEL7_T4_EXERCISES,
  ...LEVEL7_T5_EXERCISES,
  ...LEVEL7_T6_EXERCISES,
  ...LEVEL7_T7_EXERCISES,
];

export const LEVEL7_ALL_MCQS: Mcq[] = [
  ...LEVEL7_T1_MCQS,
  ...LEVEL7_T2_MCQS,
  ...LEVEL7_T3_MCQS,
  ...LEVEL7_T4_MCQS,
  ...LEVEL7_T5_MCQS,
  ...LEVEL7_T6_MCQS,
  ...LEVEL7_T7_MCQS,
];

export const LEVEL7_ALL_ASSIGNMENTS: Record<string, MiniAssignment> = {
  "t7-feature-eng": LEVEL7_T1_ASSIGN,
  "t7-feature-sel": LEVEL7_T2_ASSIGN,
  "t7-pipelines": LEVEL7_T3_ASSIGN,
  "t7-imbalanced": LEVEL7_T4_ASSIGN,
  "t7-deep": LEVEL7_T5_ASSIGN,
  "t7-nlp": LEVEL7_T6_ASSIGN,
  "t7-deployment": LEVEL7_T7_ASSIGN,
};
