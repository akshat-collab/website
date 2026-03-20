/**
 * LEVEL 6: Machine Learning Core
 * Topics: Linear/Logistic Regression, KNN, Trees, Forest, Metrics, K-Means, Hierarchical, PCA
 */

import type { CodingExercise, Mcq } from "./schema";
import type { MiniAssignment } from "./level1ContentExtended";

// ─── TOPIC 1: Linear Regression ───────────────────────────────────────────
export const LEVEL6_T1_EXERCISES: CodingExercise[] = [
  { id: "l6-t1-e1", topicId: "t6-linear", title: "Mean", description: "Return mean of list.", difficulty: "easy", type: "short", boilerplate: { python: "def mean_arr(arr):\n    return sum(arr) / len(arr) if arr else 0" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: 3 }], hints: [] },
  { id: "l6-t1-e2", topicId: "t6-linear", title: "Slope", description: "Return slope: cov(x,y)/var(x). cov = mean((x-xbar)*(y-ybar)), var = mean((x-xbar)**2).", difficulty: "medium", type: "medium", boilerplate: { python: "def slope(x, y):\n    n = len(x)\n    mx = sum(x)/n\n    my = sum(y)/n\n    cov = sum((a-mx)*(b-my) for a,b in zip(x,y))/n\n    var = sum((a-mx)**2 for a in x)/n\n    return cov / var if var else 0" }, testCases: [{ input: "[1,2,3,4,5], [2,4,6,8,10]", expectedOutput: 2 }], hints: [] },
  { id: "l6-t1-e3", topicId: "t6-linear", title: "Intercept", description: "Return intercept: ybar - slope*xbar.", difficulty: "easy", type: "short", boilerplate: { python: "def intercept(x, y, slope_val):\n    mx = sum(x)/len(x)\n    my = sum(y)/len(y)\n    return my - slope_val * mx" }, testCases: [{ input: "[1,2,3], [2,4,6], 2", expectedOutput: 0 }], hints: [] },
];

export const LEVEL6_T1_MCQS: Mcq[] = [
  { id: "l6-t1-q1", topicId: "t6-linear", question: "Linear regression minimizes?", options: [{ id: "a", text: "RSS (Residual Sum of Squares)", isCorrect: true, explanation: "Ordinary least squares" }, { id: "b", text: "Accuracy", isCorrect: false }, { id: "c", text: "Variance", isCorrect: false }, { id: "d", text: "Correlation", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l6-t1-q2", topicId: "t6-linear", question: "R² (R-squared) measures?", options: [{ id: "a", text: "Variance explained by model", isCorrect: true, explanation: "0 to 1, higher is better" }, { id: "b", text: "Number of features", isCorrect: false }, { id: "c", text: "Slope value", isCorrect: false }, { id: "d", text: "Residual sum", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T1_ASSIGN: MiniAssignment = {
  id: "l6-t1-assign", topicId: "t6-linear", title: "Linear Regression from Scratch",
  description: "Implement: (1) Fit slope and intercept using OLS. (2) Predict function. (3) Compute MSE and R². (4) Handle single feature case.",
  rubric: [{ criterion: "Fit", points: 35 }, { criterion: "Predict", points: 25 }, { criterion: "Metrics", points: 25 }, { criterion: "Edge cases", points: 15 }],
};

// ─── TOPIC 2: Logistic Regression ────────────────────────────────────────
export const LEVEL6_T2_EXERCISES: CodingExercise[] = [
  { id: "l6-t2-e1", topicId: "t6-logistic", title: "Sigmoid", description: "Return sigmoid(z) = 1/(1+exp(-z)).", difficulty: "easy", type: "short", boilerplate: { python: "import math\ndef sigmoid(z):\n    return 1 / (1 + math.exp(-z))" }, testCases: [{ input: "0", expectedOutput: 0.5 }, { input: "1", expectedOutput: 0.7310585786300049 }], hints: [] },
  { id: "l6-t2-e2", topicId: "t6-logistic", title: "Predict Class", description: "Given probability p, return 1 if p>=0.5 else 0.", difficulty: "easy", type: "short", boilerplate: { python: "def predict_class(p):\n    return 1 if p >= 0.5 else 0" }, testCases: [{ input: "0.7", expectedOutput: 1 }, { input: "0.3", expectedOutput: 0 }], hints: [] },
  { id: "l6-t2-e3", topicId: "t6-logistic", title: "Log Loss", description: "Binary cross-entropy: -[y*log(p) + (1-y)*log(1-p)]. Return for single sample.", difficulty: "medium", type: "medium", boilerplate: { python: "import math\ndef log_loss(y, p):\n    eps = 1e-15\n    p = max(eps, min(1-eps, p))\n    return -(y*math.log(p) + (1-y)*math.log(1-p))" }, testCases: [{ input: "1, 0.9", expectedOutput: 0.10536051565782628 }], hints: [] },
];

export const LEVEL6_T2_MCQS: Mcq[] = [
  { id: "l6-t2-q1", topicId: "t6-logistic", question: "Logistic regression outputs?", options: [{ id: "a", text: "Probability (0-1)", isCorrect: true, explanation: "Via sigmoid" }, { id: "b", text: "Any real number", isCorrect: false }, { id: "c", text: "Class label only", isCorrect: false }, { id: "d", text: "Distance", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l6-t2-q2", topicId: "t6-logistic", question: "Logistic regression is for?", options: [{ id: "a", text: "Regression only", isCorrect: false }, { id: "b", text: "Binary classification", isCorrect: true, explanation: "Or multi-class with extension" }, { id: "c", text: "Clustering", isCorrect: false }, { id: "d", text: "Dimensionality reduction", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T2_ASSIGN: MiniAssignment = {
  id: "l6-t2-assign", topicId: "t6-logistic", title: "Logistic Regression Concepts",
  description: "Implement: (1) Sigmoid and predict. (2) Binary cross-entropy loss for a batch. (3) Decision boundary: given weights [w0,w1,w2] and x1,x2, return 1 if w0+w1*x1+w2*x2>=0 else 0.",
  rubric: [{ criterion: "Sigmoid/predict", points: 30 }, { criterion: "Batch loss", points: 40 }, { criterion: "Decision boundary", points: 30 }],
};

// ─── TOPIC 3: KNN ─────────────────────────────────────────────────────────
export const LEVEL6_T3_EXERCISES: CodingExercise[] = [
  { id: "l6-t3-e1", topicId: "t6-knn", title: "Euclidean Distance", description: "Return Euclidean distance between points a and b (lists).", difficulty: "easy", type: "short", boilerplate: { python: "import math\ndef euclidean(a, b):\n    return math.sqrt(sum((x-y)**2 for x,y in zip(a,b)))" }, testCases: [{ input: "[0,0], [3,4]", expectedOutput: 5 }], hints: [] },
  { id: "l6-t3-e2", topicId: "t6-knn", title: "Nearest Label", description: "Given list of (point, label) and query point, return label of nearest (by Euclidean).", difficulty: "medium", type: "medium", boilerplate: { python: "import math\ndef nearest_label(points_labels, query):\n    def dist(a, b): return math.sqrt(sum((x-y)**2 for x,y in zip(a,b)))\n    nearest = min(points_labels, key=lambda p: dist(p[0], query))\n    return nearest[1]" }, testCases: [{ input: "[[[0,0],0],[[1,1],1],[[2,2],0]], [0.5,0.5]", expectedOutput: 0 }], hints: [] },
];

export const LEVEL6_T3_MCQS: Mcq[] = [
  { id: "l6-t3-q1", topicId: "t6-knn", question: "KNN is a?", options: [{ id: "a", text: "Lazy learner (no training)", isCorrect: true, explanation: "Stores data, predicts at query time" }, { id: "b", text: "Eager learner", isCorrect: false }, { id: "c", text: "Deep learning model", isCorrect: false }, { id: "d", text: "Generative model", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T3_ASSIGN: MiniAssignment = {
  id: "l6-t3-assign", topicId: "t6-knn", title: "KNN Implementation",
  description: "Implement KNN: (1) Find k nearest neighbors by distance. (2) Majority vote for classification. (3) Average for regression. Handle ties.",
  rubric: [{ criterion: "K neighbors", points: 40 }, { criterion: "Classification vote", points: 30 }, { criterion: "Regression average", points: 30 }],
};

// ─── TOPIC 4: Decision Trees ──────────────────────────────────────────────
export const LEVEL6_T4_EXERCISES: CodingExercise[] = [
  { id: "l6-t4-e1", topicId: "t6-trees", title: "Gini Impurity", description: "For binary labels, gini = 1 - p0^2 - p1^2. Return gini for list of 0/1.", difficulty: "easy", type: "short", boilerplate: { python: "def gini(labels):\n    n = len(labels)\n    if n == 0: return 0\n    p1 = sum(labels)/n\n    p0 = 1 - p1\n    return 1 - p0**2 - p1**2" }, testCases: [{ input: "[0,1,1,1]", expectedOutput: 0.375 }], hints: [] },
  { id: "l6-t4-e2", topicId: "t6-trees", title: "Entropy", description: "Entropy = -sum(p*log2(p)) for each class. Return entropy for binary labels.", difficulty: "medium", type: "medium", boilerplate: { python: "import math\ndef entropy(labels):\n    n = len(labels)\n    if n == 0: return 0\n    p1 = sum(labels)/n\n    p0 = 1 - p1\n    e = 0\n    if p0 > 0: e -= p0 * math.log2(p0)\n    if p1 > 0: e -= p1 * math.log2(p1)\n    return e" }, testCases: [{ input: "[0,1]", expectedOutput: 1 }], hints: [] },
  { id: "l6-t4-e3", topicId: "t6-trees", title: "Majority Class", description: "Return most frequent label in list.", difficulty: "easy", type: "short", boilerplate: { python: "def majority_class(labels):\n    from collections import Counter\n    return Counter(labels).most_common(1)[0][0] if labels else None" }, testCases: [{ input: "[0,1,1,1,0,1]", expectedOutput: 1 }], hints: [] },
];

export const LEVEL6_T4_MCQS: Mcq[] = [
  { id: "l6-t4-q1", topicId: "t6-trees", question: "Decision tree split aims to?", options: [{ id: "a", text: "Maximize impurity", isCorrect: false }, { id: "b", text: "Minimize impurity (maximize info gain)", isCorrect: true, explanation: "Purer child nodes" }, { id: "c", text: "Maximize depth", isCorrect: false }, { id: "d", text: "Minimize samples", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l6-t4-q2", topicId: "t6-trees", question: "Gini=0 means?", options: [{ id: "a", text: "All same class (pure)", isCorrect: true, explanation: "Perfect purity" }, { id: "b", text: "Maximum impurity", isCorrect: false }, { id: "c", text: "50-50 split", isCorrect: false }, { id: "d", text: "Error", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T4_ASSIGN: MiniAssignment = {
  id: "l6-t4-assign", topicId: "t6-trees", title: "Decision Tree Concepts",
  description: "Implement: (1) Gini and entropy. (2) Information gain for a binary split. (3) Best split threshold for a single feature (exhaustive search over midpoints).",
  rubric: [{ criterion: "Gini/entropy", points: 30 }, { criterion: "Info gain", points: 40 }, { criterion: "Best split", points: 30 }],
};

// ─── TOPIC 5: Random Forest ───────────────────────────────────────────────
export const LEVEL6_T5_EXERCISES: CodingExercise[] = [
  { id: "l6-t5-e1", topicId: "t6-forest", title: "Bootstrap Sample", description: "Return random sample of n indices with replacement from 0..size-1. Use random.seed(42) for reproducibility.", difficulty: "easy", type: "short", boilerplate: { python: "import random\ndef bootstrap_indices(n, size):\n    random.seed(42)\n    return [random.randint(0, size-1) for _ in range(n)]" }, testCases: [{ input: "5, 10", expectedOutput: [1, 0, 4, 3, 3] }], hints: [] },
  { id: "l6-t5-e2", topicId: "t6-forest", title: "Majority Vote", description: "Return most common element in list.", difficulty: "easy", type: "short", boilerplate: { python: "def majority_vote(votes):\n    from collections import Counter\n    return Counter(votes).most_common(1)[0][0] if votes else None" }, testCases: [{ input: "[1,1,0,1,0]", expectedOutput: 1 }], hints: [] },
];

export const LEVEL6_T5_MCQS: Mcq[] = [
  { id: "l6-t5-q1", topicId: "t6-forest", question: "Random Forest uses?", options: [{ id: "a", text: "Single tree", isCorrect: false }, { id: "b", text: "Ensemble of trees with bagging", isCorrect: true, explanation: "Bootstrap + vote" }, { id: "c", text: "Neural networks", isCorrect: false }, { id: "d", text: "Linear models", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l6-t5-q2", topicId: "t6-forest", question: "Bagging helps with?", options: [{ id: "a", text: "Overfitting", isCorrect: true, explanation: "Variance reduction" }, { id: "b", text: "Underfitting", isCorrect: false }, { id: "c", text: "Speed only", isCorrect: false }, { id: "d", text: "Interpretability", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T5_ASSIGN: MiniAssignment = {
  id: "l6-t5-assign", topicId: "t6-forest", title: "Ensemble Concepts",
  description: "Implement: (1) Bootstrap sample from dataset. (2) Aggregate predictions from multiple classifiers (list of predictions per sample). (3) Out-of-bag indices (indices not in bootstrap sample).",
  rubric: [{ criterion: "Bootstrap", points: 35 }, { criterion: "Aggregation", points: 35 }, { criterion: "OOB", points: 30 }],
};

// ─── TOPIC 6: Evaluation Metrics ───────────────────────────────────────────
export const LEVEL6_T6_EXERCISES: CodingExercise[] = [
  { id: "l6-t6-e1", topicId: "t6-metrics", title: "Accuracy", description: "Return (TP+TN)/total for y_true, y_pred binary lists.", difficulty: "easy", type: "short", boilerplate: { python: "def accuracy(y_true, y_pred):\n    return sum(a==b for a,b in zip(y_true,y_pred))/len(y_true) if y_true else 0" }, testCases: [{ input: "[1,0,1,0], [1,0,0,0]", expectedOutput: 0.75 }], hints: [] },
  { id: "l6-t6-e2", topicId: "t6-metrics", title: "Precision", description: "Return TP/(TP+FP). TP=correct 1s, FP=predicted 1 actual 0.", difficulty: "easy", type: "short", boilerplate: { python: "def precision(y_true, y_pred):\n    tp = sum(1 for a,b in zip(y_true,y_pred) if a==1 and b==1)\n    fp = sum(1 for a,b in zip(y_true,y_pred) if a==0 and b==1)\n    return tp/(tp+fp) if (tp+fp) else 0" }, testCases: [{ input: "[1,0,1,0], [1,1,1,0]", expectedOutput: 0.6666666666666666 }], hints: [] },
  { id: "l6-t6-e3", topicId: "t6-metrics", title: "Recall", description: "Return TP/(TP+FN).", difficulty: "easy", type: "short", boilerplate: { python: "def recall(y_true, y_pred):\n    tp = sum(1 for a,b in zip(y_true,y_pred) if a==1 and b==1)\n    fn = sum(1 for a,b in zip(y_true,y_pred) if a==1 and b==0)\n    return tp/(tp+fn) if (tp+fn) else 0" }, testCases: [{ input: "[1,0,1,0], [1,0,0,0]", expectedOutput: 0.5 }], hints: [] },
  { id: "l6-t6-e4", topicId: "t6-metrics", title: "F1 Score", description: "Return 2*precision*recall/(precision+recall).", difficulty: "easy", type: "short", boilerplate: { python: "def f1_score(y_true, y_pred):\n    tp = sum(1 for a,b in zip(y_true,y_pred) if a==1 and b==1)\n    fp = sum(1 for a,b in zip(y_true,y_pred) if a==0 and b==1)\n    fn = sum(1 for a,b in zip(y_true,y_pred) if a==1 and b==0)\n    p = tp/(tp+fp) if (tp+fp) else 0\n    r = tp/(tp+fn) if (tp+fn) else 0\n    return 2*p*r/(p+r) if (p+r) else 0" }, testCases: [{ input: "[1,0,1,0], [1,0,1,0]", expectedOutput: 1 }], hints: [] },
];

export const LEVEL6_T6_MCQS: Mcq[] = [
  { id: "l6-t6-q1", topicId: "t6-metrics", question: "Precision = TP/(TP+FP) measures?", options: [{ id: "a", text: "Of predicted positives, how many correct", isCorrect: true, explanation: "Precision" }, { id: "b", text: "Of actual positives, how many found", isCorrect: false }, { id: "c", text: "Overall correctness", isCorrect: false }, { id: "d", text: "Speed", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l6-t6-q2", topicId: "t6-metrics", question: "For imbalanced data, prefer?", options: [{ id: "a", text: "Accuracy only", isCorrect: false }, { id: "b", text: "Precision, Recall, F1", isCorrect: true, explanation: "Accuracy misleading" }, { id: "c", text: "MSE only", isCorrect: false }, { id: "d", text: "R² only", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T6_ASSIGN: MiniAssignment = {
  id: "l6-t6-assign", topicId: "t6-metrics", title: "Metrics Implementation",
  description: "Implement: (1) Confusion matrix (TP, TN, FP, FN). (2) Precision, recall, F1. (3) MSE and MAE for regression. (4) Handle edge cases (all same prediction).",
  rubric: [{ criterion: "Confusion matrix", points: 25 }, { criterion: "Classification metrics", points: 35 }, { criterion: "Regression metrics", points: 25 }, { criterion: "Edge cases", points: 15 }],
};

// ─── TOPIC 7: K-Means ─────────────────────────────────────────────────────
export const LEVEL6_T7_EXERCISES: CodingExercise[] = [
  { id: "l6-t7-e1", topicId: "t6-kmeans", title: "Assign to Centroid", description: "Given points (list of lists) and centroids, return list of cluster index per point (nearest centroid).", difficulty: "medium", type: "medium", boilerplate: { python: "def assign_clusters(points, centroids):\n    import math\n    def dist(a,b): return math.sqrt(sum((x-y)**2 for x,y in zip(a,b)))\n    return [min(range(len(centroids)), key=lambda i: dist(p, centroids[i])) for p in points]" }, testCases: [{ input: "[[0,0],[1,1],[10,10]], [[0,0],[10,10]]", expectedOutput: [0, 0, 1] }], hints: [] },
  { id: "l6-t7-e2", topicId: "t6-kmeans", title: "Update Centroids", description: "Given points and cluster assignments, return new centroids (mean of points per cluster).", difficulty: "medium", type: "medium", boilerplate: { python: "def update_centroids(points, assignments, k):\n    clusters = [[] for _ in range(k)]\n    for p, a in zip(points, assignments):\n        clusters[a].append(p)\n    return [\n        [sum(c[i] for c in cluster)/len(cluster) for i in range(len(points[0]))]\n        if cluster else [0]*len(points[0])\n        for cluster in clusters\n    ]" }, testCases: [{ input: "[[0,0],[2,0],[0,2]], [0,0,0], 2", expectedOutput: [[0.6666666666666666, 0.6666666666666666], [0, 0]] }], hints: [] },
];

export const LEVEL6_T7_MCQS: Mcq[] = [
  { id: "l6-t7-q1", topicId: "t6-kmeans", question: "K-Means is?", options: [{ id: "a", text: "Unsupervised clustering", isCorrect: true, explanation: "No labels" }, { id: "b", text: "Supervised classification", isCorrect: false }, { id: "c", text: "Regression", isCorrect: false }, { id: "d", text: "Dimensionality reduction", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T7_ASSIGN: MiniAssignment = {
  id: "l6-t7-assign", topicId: "t6-kmeans", title: "K-Means from Scratch",
  description: "Implement: (1) Initialize k centroids (random from points). (2) Assign step. (3) Update step. (4) Iterate until convergence (max 100 iterations).",
  rubric: [{ criterion: "Init", points: 20 }, { criterion: "Assign", points: 30 }, { criterion: "Update", points: 30 }, { criterion: "Loop", points: 20 }],
};

// ─── TOPIC 8: Hierarchical Clustering ──────────────────────────────────────
export const LEVEL6_T8_EXERCISES: CodingExercise[] = [
  { id: "l6-t8-e1", topicId: "t6-hierarchical", title: "Linkage Distance", description: "Single linkage: min distance between clusters. Given two clusters (lists of points), return min pairwise distance.", difficulty: "medium", type: "medium", boilerplate: { python: "import math\ndef single_linkage(c1, c2):\n    def dist(a,b): return math.sqrt(sum((x-y)**2 for x,y in zip(a,b)))\n    return min(dist(a,b) for a in c1 for b in c2) if c1 and c2 else float('inf')" }, testCases: [{ input: "[[0,0],[1,0]], [[2,0],[3,0]]", expectedOutput: 1 }], hints: [] },
  { id: "l6-t8-e2", topicId: "t6-hierarchical", title: "Cluster Centroid", description: "Return centroid (mean) of cluster points.", difficulty: "easy", type: "short", boilerplate: { python: "def cluster_centroid(points):\n    if not points: return []\n    n = len(points[0])\n    return [sum(p[i] for p in points)/len(points) for i in range(n)]" }, testCases: [{ input: "[[0,0],[2,0],[0,2]]", expectedOutput: [0.6666666666666666, 0.6666666666666666] }], hints: [] },
];

export const LEVEL6_T8_MCQS: Mcq[] = [
  { id: "l6-t8-q1", topicId: "t6-hierarchical", question: "Hierarchical clustering produces?", options: [{ id: "a", text: "Dendrogram / tree of merges", isCorrect: true, explanation: "Bottom-up or top-down" }, { id: "b", text: "Flat k clusters only", isCorrect: false }, { id: "c", text: "Single cluster", isCorrect: false }, { id: "d", text: "Regression line", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l6-t8-q2", topicId: "t6-hierarchical", question: "Single linkage uses?", options: [{ id: "a", text: "Min distance between clusters", isCorrect: true, explanation: "Nearest points" }, { id: "b", text: "Max distance", isCorrect: false }, { id: "c", text: "Average distance", isCorrect: false }, { id: "d", text: "Centroid distance only", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T8_ASSIGN: MiniAssignment = {
  id: "l6-t8-assign", topicId: "t6-hierarchical", title: "Hierarchical Clustering",
  description: "Implement: (1) Compute pairwise distances for n points. (2) Single linkage between two clusters. (3) Complete linkage (max distance). (4) Merge two closest clusters (return merged point list).",
  rubric: [{ criterion: "Pairwise distances", points: 25 }, { criterion: "Single linkage", points: 25 }, { criterion: "Complete linkage", points: 25 }, { criterion: "Merge", points: 25 }],
};

// ─── TOPIC 9: PCA ─────────────────────────────────────────────────────────
export const LEVEL6_T9_EXERCISES: CodingExercise[] = [
  { id: "l6-t9-e1", topicId: "t6-pca", title: "Center Data", description: "Return data with mean 0 per column. Data is list of lists (rows).", difficulty: "easy", type: "short", boilerplate: { python: "def center_data(data):\n    if not data: return []\n    n = len(data)\n    means = [sum(row[i] for row in data)/n for i in range(len(data[0]))]\n    return [[row[i]-means[i] for i in range(len(row))] for row in data]" }, testCases: [{ input: "[[1,2],[3,4],[5,6]]", expectedOutput: [[-2, -2], [0, 0], [2, 2]] }], hints: [] },
  { id: "l6-t9-e2", topicId: "t6-pca", title: "Variance", description: "Return variance of list.", difficulty: "easy", type: "short", boilerplate: { python: "def variance(arr):\n    n = len(arr)\n    m = sum(arr)/n\n    return sum((x-m)**2 for x in arr)/n" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: 2 }], hints: [] },
];

export const LEVEL6_T9_MCQS: Mcq[] = [
  { id: "l6-t9-q1", topicId: "t6-pca", question: "PCA finds?", options: [{ id: "a", text: "Directions of maximum variance", isCorrect: true, explanation: "Principal components" }, { id: "b", text: "Class boundaries", isCorrect: false }, { id: "c", text: "Cluster centers", isCorrect: false }, { id: "d", text: "Regression coefficients", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL6_T9_ASSIGN: MiniAssignment = {
  id: "l6-t9-assign", topicId: "t6-pca", title: "PCA Concepts",
  description: "Implement: (1) Center data. (2) Compute covariance matrix (2x2 for 2 features). (3) Project 2D data onto first principal component (direction of max variance).",
  rubric: [{ criterion: "Center", points: 25 }, { criterion: "Covariance", points: 40 }, { criterion: "Projection", points: 35 }],
};

// ─── Combined exports ────────────────────────────────────────────────────
export const LEVEL6_ALL_EXERCISES: CodingExercise[] = [
  ...LEVEL6_T1_EXERCISES,
  ...LEVEL6_T2_EXERCISES,
  ...LEVEL6_T3_EXERCISES,
  ...LEVEL6_T4_EXERCISES,
  ...LEVEL6_T5_EXERCISES,
  ...LEVEL6_T6_EXERCISES,
  ...LEVEL6_T7_EXERCISES,
  ...LEVEL6_T8_EXERCISES,
  ...LEVEL6_T9_EXERCISES,
];

export const LEVEL6_ALL_MCQS: Mcq[] = [
  ...LEVEL6_T1_MCQS,
  ...LEVEL6_T2_MCQS,
  ...LEVEL6_T3_MCQS,
  ...LEVEL6_T4_MCQS,
  ...LEVEL6_T5_MCQS,
  ...LEVEL6_T6_MCQS,
  ...LEVEL6_T7_MCQS,
  ...LEVEL6_T8_MCQS,
  ...LEVEL6_T9_MCQS,
];

export const LEVEL6_ALL_ASSIGNMENTS: Record<string, MiniAssignment> = {
  "t6-linear": LEVEL6_T1_ASSIGN,
  "t6-logistic": LEVEL6_T2_ASSIGN,
  "t6-knn": LEVEL6_T3_ASSIGN,
  "t6-trees": LEVEL6_T4_ASSIGN,
  "t6-forest": LEVEL6_T5_ASSIGN,
  "t6-metrics": LEVEL6_T6_ASSIGN,
  "t6-kmeans": LEVEL6_T7_ASSIGN,
  "t6-hierarchical": LEVEL6_T8_ASSIGN,
  "t6-pca": LEVEL6_T9_ASSIGN,
};
