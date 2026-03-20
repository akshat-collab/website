/**
 * LEVEL 2-8: Content Structure & Exercise IDs
 * Full content expandable per module
 */

export const LEVEL2_TOPICS = [
  { id: "t2-comprehensions", title: "List Comprehensions", exercises: 5, mcqs: 3 },
  { id: "t2-lambda", title: "Lambda & Higher-Order", exercises: 3, mcqs: 2 },
  { id: "t2-decorators", title: "Decorators", exercises: 2, mcqs: 2 },
  { id: "t2-generators", title: "Generators & Iterators", exercises: 3, mcqs: 2 },
  { id: "t2-venv", title: "Virtual Envs & Structure", exercises: 2, mcqs: 1 },
  { id: "t2-complexity", title: "Complexity Analysis", exercises: 5, mcqs: 5 },
];

export const LEVEL3_TOPICS = [
  { id: "t3-numpy", title: "NumPy", exercises: 7, mcqs: 5 },
  { id: "t3-pandas", title: "Pandas Basics", exercises: 6, mcqs: 5 },
  { id: "t3-cleaning", title: "Data Cleaning", exercises: 5, mcqs: 5 },
  { id: "t3-feature-scale", title: "Feature Scaling", exercises: 4, mcqs: 4 },
  { id: "t3-groupby", title: "GroupBy & Aggregations", exercises: 4, mcqs: 4 },
  { id: "t3-joins", title: "Joins & Merges", exercises: 3, mcqs: 3 },
  { id: "t3-timeseries", title: "Time Series Basics", exercises: 3, mcqs: 3 },
  { id: "t3-matplotlib", title: "Matplotlib", exercises: 3, mcqs: 4 },
  { id: "t3-seaborn", title: "Seaborn", exercises: 3, mcqs: 4 },
];

export const LEVEL4_TOPICS = [
  { id: "t4-descriptive", title: "Descriptive Statistics", exercises: 7, mcqs: 5 },
  { id: "t4-probability", title: "Probability", exercises: 5, mcqs: 5 },
  { id: "t4-bayes", title: "Bayes Theorem", exercises: 3, mcqs: 3 },
  { id: "t4-distributions", title: "Distributions", exercises: 4, mcqs: 4 },
  { id: "t4-hypothesis", title: "Hypothesis Testing", exercises: 4, mcqs: 5 },
  { id: "t4-ab", title: "A/B Testing", exercises: 3, mcqs: 3 },
  { id: "t4-confidence", title: "Confidence Intervals", exercises: 4, mcqs: 4 },
];

export const LEVEL5_TOPICS = [
  { id: "t5-representations", title: "Graph Representations", exercises: 4, mcqs: 2 },
  { id: "t5-bfs-dfs", title: "BFS & DFS", exercises: 4, mcqs: 2 },
  { id: "t5-dijkstra", title: "Dijkstra", exercises: 3, mcqs: 2 },
  { id: "t5-network", title: "Network Analysis", exercises: 3, mcqs: 2 },
  { id: "t5-pagerank", title: "PageRank", exercises: 2, mcqs: 2 },
  { id: "t5-clustering", title: "Graph Clustering", exercises: 3, mcqs: 2 },
];

export const LEVEL6_TOPICS = [
  { id: "t6-linear", title: "Linear Regression", exercises: 3, mcqs: 2 },
  { id: "t6-logistic", title: "Logistic Regression", exercises: 3, mcqs: 2 },
  { id: "t6-knn", title: "KNN", exercises: 2, mcqs: 1 },
  { id: "t6-trees", title: "Decision Trees", exercises: 3, mcqs: 2 },
  { id: "t6-forest", title: "Random Forest", exercises: 2, mcqs: 2 },
  { id: "t6-metrics", title: "Evaluation Metrics", exercises: 4, mcqs: 2 },
  { id: "t6-kmeans", title: "K-Means", exercises: 2, mcqs: 1 },
  { id: "t6-hierarchical", title: "Hierarchical Clustering", exercises: 2, mcqs: 2 },
  { id: "t6-pca", title: "PCA", exercises: 2, mcqs: 1 },
];

export const LEVEL7_TOPICS = [
  { id: "t7-feature-eng", title: "Feature Engineering", exercises: 5, mcqs: 3 },
  { id: "t7-feature-sel", title: "Feature Selection", exercises: 3, mcqs: 2 },
  { id: "t7-pipelines", title: "Pipelines & GridSearch", exercises: 4, mcqs: 2 },
  { id: "t7-imbalanced", title: "Imbalanced Data", exercises: 2, mcqs: 2 },
  { id: "t7-deep", title: "Intro Deep Learning", exercises: 3, mcqs: 2 },
  { id: "t7-nlp", title: "Basic NLP", exercises: 2, mcqs: 2 },
  { id: "t7-deployment", title: "Deployment Intro", exercises: 1, mcqs: 2 },
];

export const LEVEL8_CAPSTONES = [
  {
    id: "capstone-fraud",
    title: "Fraud Detection System",
    businessProblem:
      "Build a system to detect fraudulent transactions. Dataset: transaction logs with labels.",
    requirements: [
      "EDA and visualization",
      "Feature engineering",
      "Train at least 2 models",
      "Evaluation with precision, recall, F1",
      "Documentation",
    ],
    rubric: { eda: 20, features: 25, model: 25, eval: 20, docs: 10 },
  },
  {
    id: "capstone-churn",
    title: "Customer Churn Prediction",
    businessProblem: "Predict which customers will churn. Use telecom/customer dataset.",
    requirements: [
      "Data cleaning",
      "Target imbalance handling",
      "Model with AUC-ROC > 0.75",
      "Business recommendations",
    ],
    rubric: { cleaning: 20, model: 35, metrics: 25, recommendations: 20 },
  },
  {
    id: "capstone-recommend",
    title: "Recommendation Engine",
    businessProblem: "Build a product/movie recommendation system.",
    requirements: [
      "Collaborative or content-based approach",
      "Evaluation (RMSE/MAE or precision@k)",
      "API or notebook interface",
    ],
    rubric: { approach: 30, evaluation: 35, interface: 35 },
  },
];
