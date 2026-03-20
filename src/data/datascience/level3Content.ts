/**
 * LEVEL 3: Data Analytics
 * Topics: NumPy, Pandas, Cleaning, Feature Scaling, GroupBy, Joins, Time Series, Matplotlib, Seaborn
 * Each topic: exercises, MCQs, 1 assignment
 */

import type { CodingExercise, Mcq } from "./schema";
import type { MiniAssignment } from "./level1ContentExtended";

// ─── TOPIC 1: NumPy ───────────────────────────────────────────────────────
export const LEVEL3_T1_EXERCISES: CodingExercise[] = [
  { id: "l3-t1-e1", topicId: "t3-numpy", title: "Array Mean", description: "Return mean of array using numpy. arr is list.", difficulty: "easy", type: "short", boilerplate: { python: "import numpy as np\ndef arr_mean(arr):\n    return float(np.mean(arr))" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: 3 }], hints: [] },
  { id: "l3-t1-e2", topicId: "t3-numpy", title: "Array Sum", description: "Return sum of numpy array.", difficulty: "easy", type: "short", boilerplate: { python: "import numpy as np\ndef arr_sum(arr):\n    return int(np.sum(arr))" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: 15 }], hints: [] },
  { id: "l3-t1-e3", topicId: "t3-numpy", title: "Double Array", description: "Return array with each element doubled.", difficulty: "easy", type: "short", boilerplate: { python: "import numpy as np\ndef double_arr(arr):\n    return (np.array(arr) * 2).tolist()" }, testCases: [{ input: "[1,2,3]", expectedOutput: [2, 4, 6] }], hints: [] },
  { id: "l3-t1-e4", topicId: "t3-numpy", title: "Array Shape", description: "Return shape of 2D array as (rows, cols).", difficulty: "easy", type: "short", boilerplate: { python: "import numpy as np\ndef get_shape(arr):\n    return list(np.array(arr).shape)" }, testCases: [{ input: "[[1,2],[3,4],[5,6]]", expectedOutput: [3, 2] }], hints: [] },
  { id: "l3-t1-e5", topicId: "t3-numpy", title: "Zeros", description: "Return n×n matrix of zeros.", difficulty: "easy", type: "short", boilerplate: { python: "import numpy as np\ndef zeros_matrix(n):\n    return np.zeros((n,n)).tolist()" }, testCases: [{ input: "2", expectedOutput: [[0, 0], [0, 0]] }], hints: [] },
  { id: "l3-t1-m1", topicId: "t3-numpy", title: "Array Stats", description: "Return dict with mean, std, min, max of array.", difficulty: "medium", type: "medium", boilerplate: { python: "import numpy as np\ndef arr_stats(arr):\n    a = np.array(arr)\n    return {'mean': float(np.mean(a)), 'std': float(np.std(a)), 'min': float(np.min(a)), 'max': float(np.max(a))}" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: { mean: 3, std: 1.4142135623730951, min: 1, max: 5 } }], hints: [] },
  { id: "l3-t1-m2", topicId: "t3-numpy", title: "Matrix Transpose", description: "Transpose 2D array using NumPy.", difficulty: "medium", type: "medium", boilerplate: { python: "import numpy as np\ndef transpose(arr):\n    return np.array(arr).T.tolist()" }, testCases: [{ input: "[[1,2],[3,4],[5,6]]", expectedOutput: [[1, 3, 5], [2, 4, 6]] }], hints: [] },
];

export const LEVEL3_T1_MCQS: Mcq[] = [
  { id: "l3-t1-q1", topicId: "t3-numpy", question: "What is the main advantage of NumPy over Python lists?", options: [{ id: "a", text: "More functions", isCorrect: false }, { id: "b", text: "Vectorized operations and C-level speed", isCorrect: true, explanation: "NumPy arrays are homogeneous and fast" }, { id: "c", text: "Smaller size", isCorrect: false }, { id: "d", text: "Easier syntax", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t1-q2", topicId: "t3-numpy", question: "np.array([1,2,3]) * 2 produces?", options: [{ id: "a", text: "[2,4,6]", isCorrect: true, explanation: "Vectorized multiplication" }, { id: "b", text: "Error", isCorrect: false }, { id: "c", text: "2", isCorrect: false }, { id: "d", text: "[1,2,3,1,2,3]", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t1-q3", topicId: "t3-numpy", question: "np.zeros((2,3)).shape is?", options: [{ id: "a", text: "(3, 2)", isCorrect: false }, { id: "b", text: "(2, 3)", isCorrect: true, explanation: "2 rows, 3 columns" }, { id: "c", text: "6", isCorrect: false }, { id: "d", text: "Error", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t1-q4", topicId: "t3-numpy", question: "What does arr[:, 1] select?", options: [{ id: "a", text: "First row", isCorrect: false }, { id: "b", text: "Second column (all rows)", isCorrect: true, explanation: ": is all rows, 1 is column index" }, { id: "c", text: "First row, second col", isCorrect: false }, { id: "d", text: "Last element", isCorrect: false }], difficulty: "medium", type: "basic" },
  { id: "l3-t1-q5", topicId: "t3-numpy", question: "np.linspace(0, 1, 5) produces?", options: [{ id: "a", text: "[0,1,2,3,4,5]", isCorrect: false }, { id: "b", text: "[0, 0.25, 0.5, 0.75, 1]", isCorrect: true, explanation: "5 evenly spaced values from 0 to 1" }, { id: "c", text: "[0,1]", isCorrect: false }, { id: "d", text: "5", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL3_T1_ASSIGN: MiniAssignment = {
  id: "l3-t1-assign", topicId: "t3-numpy", title: "Array Analytics",
  description: "Implement: (1) normalize(arr): scale to [0,1] using min-max. (2) correlation(x,y): Pearson correlation. (3) matrix_mult(A,B): matrix multiplication (without np.dot).",
  rubric: [{ criterion: "normalize", points: 35 }, { criterion: "correlation", points: 35 }, { criterion: "matrix_mult", points: 30 }],
};

// ─── TOPIC 2: Pandas ────────────────────────────────────────────────────
export const LEVEL3_T2_EXERCISES: CodingExercise[] = [
  { id: "l3-t2-e1", topicId: "t3-pandas", title: "DataFrame from Dict", description: "Create DataFrame from dict and return sum of column 'A'.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef df_sum_a(data):\n    df = pd.DataFrame(data)\n    return int(df['A'].sum())" }, testCases: [{ input: '{"A":[1,2,3],"B":[4,5,6]}', expectedOutput: 6 }], hints: [] },
  { id: "l3-t2-e2", topicId: "t3-pandas", title: "Column Mean", description: "Return mean of column 'val' from dict data.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef col_mean(data):\n    df = pd.DataFrame(data)\n    return float(df['val'].mean())" }, testCases: [{ input: '{"val":[10,20,30]}', expectedOutput: 20 }], hints: [] },
  { id: "l3-t2-e3", topicId: "t3-pandas", title: "Row Count", description: "Return number of rows in DataFrame from dict.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef row_count(data):\n    return len(pd.DataFrame(data))" }, testCases: [{ input: '{"A":[1,2,3]}', expectedOutput: 3 }], hints: [] },
  { id: "l3-t2-e4", topicId: "t3-pandas", title: "Select Columns", description: "Return list of values in column col from data.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef get_column(data, col):\n    df = pd.DataFrame(data)\n    return df[col].tolist()" }, testCases: [{ input: '[{"x":[1,2,3],"y":[4,5,6]}, "x"]', expectedOutput: [1, 2, 3] }], hints: [] },
  { id: "l3-t2-e5", topicId: "t3-pandas", title: "DataFrame Shape", description: "Return (rows, cols) of DataFrame.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef df_shape(data):\n    return list(pd.DataFrame(data).shape)" }, testCases: [{ input: '{"A":[1,2],"B":[3,4],"C":[5,6]}', expectedOutput: [2, 3] }], hints: [] },
  { id: "l3-t2-m1", topicId: "t3-pandas", title: "Filter Rows", description: "Return rows where col equals val.", difficulty: "medium", type: "medium", boilerplate: { python: "import pandas as pd\ndef filter_rows(data, col, val):\n    df = pd.DataFrame(data)\n    return df[df[col]==val].to_dict('records')" }, testCases: [{ input: '[{"cat":["A","B","A"],"val":[1,2,3]}, "cat", "A"]', expectedOutput: [{ cat: "A", val: 1 }, { cat: "A", val: 3 }] }], hints: [] },
];

export const LEVEL3_T2_MCQS: Mcq[] = [
  { id: "l3-t2-q1", topicId: "t3-pandas", question: "What does df.head() return?", options: [{ id: "a", text: "First 5 rows", isCorrect: true, explanation: "Default is 5 rows" }, { id: "b", text: "Column headers", isCorrect: false }, { id: "c", text: "Last 5 rows", isCorrect: false }, { id: "d", text: "Data types", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t2-q2", topicId: "t3-pandas", question: "df.loc[0] returns?", options: [{ id: "a", text: "First column", isCorrect: false }, { id: "b", text: "Row with index 0", isCorrect: true, explanation: "Label-based selection" }, { id: "c", text: "First 0 rows", isCorrect: false }, { id: "d", text: "Error", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t2-q3", topicId: "t3-pandas", question: "df.iloc is?", options: [{ id: "a", text: "Integer position-based", isCorrect: true, explanation: "iloc = integer location" }, { id: "b", text: "Label-based", isCorrect: false }, { id: "c", text: "For columns only", isCorrect: false }, { id: "d", text: "Same as loc", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t2-q4", topicId: "t3-pandas", question: "df.describe() shows?", options: [{ id: "a", text: "Mean, std, min, max, quartiles", isCorrect: true, explanation: "Summary statistics" }, { id: "b", text: "All rows", isCorrect: false }, { id: "c", text: "Column names", isCorrect: false }, { id: "d", text: "Missing counts", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t2-q5", topicId: "t3-pandas", question: "df[['A','B']] returns?", options: [{ id: "a", text: "Series", isCorrect: false }, { id: "b", text: "DataFrame with 2 columns", isCorrect: true, explanation: "Double brackets for multiple columns" }, { id: "c", text: "Single value", isCorrect: false }, { id: "d", text: "Error", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL3_T2_ASSIGN: MiniAssignment = {
  id: "l3-t2-assign", topicId: "t3-pandas", title: "Data Exploration",
  description: "Given a CSV-like structure: (1) Load and show shape, dtypes. (2) Compute summary stats for numeric columns. (3) Filter rows by condition. (4) Select and rename columns.",
  rubric: [{ criterion: "Load and inspect", points: 25 }, { criterion: "Summary stats", points: 30 }, { criterion: "Filter", points: 25 }, { criterion: "Select/rename", points: 20 }],
};

// ─── TOPIC 3: Data Cleaning ───────────────────────────────────────────────
export const LEVEL3_T3_EXERCISES: CodingExercise[] = [
  { id: "l3-t3-e1", topicId: "t3-cleaning", title: "Count Missing", description: "Return count of NaN/None per column. Use pd.DataFrame(data).", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef count_missing(data):\n    df = pd.DataFrame(data)\n    return {k: int(v) for k,v in df.isna().sum().items()}" }, testCases: [{ input: '{"A":[1,null,3],"B":[4,5,null]}', expectedOutput: { A: 1, B: 1 } }], hints: [] },
  { id: "l3-t3-e2", topicId: "t3-cleaning", title: "Fill with Mean", description: "Fill NaN in numeric column with column mean.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef fill_mean(data, col):\n    df = pd.DataFrame(data)\n    df[col] = df[col].fillna(df[col].mean())\n    return [int(x) if x==int(x) else round(x, 6) for x in df[col].tolist()]" }, testCases: [{ input: '[{"x":[1.0,null,3.0]}, "x"]', expectedOutput: [1, 2, 3] }], hints: [] },
  { id: "l3-t3-e3", topicId: "t3-cleaning", title: "Drop Duplicates", description: "Return row count after dropping duplicates.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef drop_dup_count(data):\n    return len(pd.DataFrame(data).drop_duplicates())" }, testCases: [{ input: '{"A":[1,1,2,2],"B":[3,3,4,4]}', expectedOutput: 2 }], hints: [] },
  { id: "l3-t3-e4", topicId: "t3-cleaning", title: "Convert Type", description: "Convert column to int, return list.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef to_int(data, col):\n    df = pd.DataFrame(data)\n    return df[col].astype(int).tolist()" }, testCases: [{ input: '[{"x":[1.0,2.0,3.0]}, "x"]', expectedOutput: [1, 2, 3] }], hints: [] },
  { id: "l3-t3-m1", topicId: "t3-cleaning", title: "Clean Pipeline", description: "Drop rows with NaN, drop duplicates, return shape.", difficulty: "medium", type: "medium", boilerplate: { python: "import pandas as pd\ndef clean_pipeline(data):\n    df = pd.DataFrame(data)\n    df = df.dropna().drop_duplicates()\n    return list(df.shape)" }, testCases: [{ input: '{"A":[1,1,null,2],"B":[3,3,4,4]}', expectedOutput: [2, 2] }], hints: [] },
];

export const LEVEL3_T3_MCQS: Mcq[] = [
  { id: "l3-t3-q1", topicId: "t3-cleaning", question: "df.isna().sum() returns?", options: [{ id: "a", text: "Total NaN in DataFrame", isCorrect: false }, { id: "b", text: "Count of NaN per column", isCorrect: true, explanation: "Series with column counts" }, { id: "c", text: "Rows with NaN", isCorrect: false }, { id: "d", text: "Boolean mask", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t3-q2", topicId: "t3-cleaning", question: "df.dropna() removes?", options: [{ id: "a", text: "All columns with NaN", isCorrect: false }, { id: "b", text: "Rows with any NaN", isCorrect: true, explanation: "Default: drop rows" }, { id: "c", text: "Duplicate rows", isCorrect: false }, { id: "d", text: "All NaN values", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t3-q3", topicId: "t3-cleaning", question: "df.fillna(0) does?", options: [{ id: "a", text: "Drops NaN", isCorrect: false }, { id: "b", text: "Replaces NaN with 0", isCorrect: true, explanation: "In-place or returns new" }, { id: "c", text: "Counts NaN", isCorrect: false }, { id: "d", text: "Fills with mean", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t3-q4", topicId: "t3-cleaning", question: "pd.to_datetime() is used for?", options: [{ id: "a", text: "Converting strings to datetime", isCorrect: true, explanation: "Parse date columns" }, { id: "b", text: "Getting current time", isCorrect: false }, { id: "c", text: "Formatting numbers", isCorrect: false }, { id: "d", text: "Dropping dates", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t3-q5", topicId: "t3-cleaning", question: "df.duplicated() returns?", options: [{ id: "a", text: "DataFrame without duplicates", isCorrect: false }, { id: "b", text: "Boolean Series", isCorrect: true, explanation: "True for duplicate rows" }, { id: "c", text: "Count of duplicates", isCorrect: false }, { id: "d", text: "List of duplicate indices", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL3_T3_ASSIGN: MiniAssignment = {
  id: "l3-t3-assign", topicId: "t3-cleaning", title: "Data Cleaning Pipeline",
  description: "Build a cleaning pipeline: (1) Detect and report missing values. (2) Handle missing (drop or fill). (3) Remove duplicates. (4) Fix data types. (5) Document decisions.",
  rubric: [{ criterion: "Missing detection", points: 20 }, { criterion: "Missing handling", points: 25 }, { criterion: "Duplicates", points: 20 }, { criterion: "Types", points: 20 }, { criterion: "Documentation", points: 15 }],
};

// ─── TOPIC 4: Feature Scaling ─────────────────────────────────────────────
export const LEVEL3_T4_EXERCISES: CodingExercise[] = [
  { id: "l3-t4-e1", topicId: "t3-feature-scale", title: "Min-Max Scale", description: "Scale list to [0,1] using (x-min)/(max-min).", difficulty: "easy", type: "short", boilerplate: { python: "def minmax_scale(arr):\n    a = list(arr)\n    mn, mx = min(a), max(a)\n    if mx == mn:\n        return [0.5] * len(a)\n    return [(x - mn) / (mx - mn) for x in a]" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: [0, 0.25, 0.5, 0.75, 1] }], hints: [] },
  { id: "l3-t4-e2", topicId: "t3-feature-scale", title: "Z-Score", description: "Standardize: (x - mean) / std. Use population std.", difficulty: "easy", type: "short", boilerplate: { python: "import numpy as np\ndef zscore(arr):\n    a = np.array(arr, dtype=float)\n    return ((a - np.mean(a)) / np.std(a)).tolist()" }, testCases: [{ input: "[1,2,3,4,5]", expectedOutput: [-1.414213562373095, -0.7071067811865475, 0, 0.7071067811865475, 1.414213562373095] }], hints: [] },
  { id: "l3-t4-e3", topicId: "t3-feature-scale", title: "Scale to Sum", description: "Scale so values sum to 1.", difficulty: "easy", type: "short", boilerplate: { python: "def scale_to_sum(arr):\n    s = sum(arr)\n    return [x/s for x in arr] if s else arr" }, testCases: [{ input: "[1,2,3]", expectedOutput: [0.16666666666666666, 0.3333333333333333, 0.5] }], hints: [] },
  { id: "l3-t4-m1", topicId: "t3-feature-scale", title: "Scale Columns", description: "Apply min-max to each column of 2D list.", difficulty: "medium", type: "medium", boilerplate: { python: "def scale_columns(matrix):\n    import numpy as np\n    a = np.array(matrix, dtype=float)\n    mn = a.min(axis=0)\n    mx = a.max(axis=0)\n    r = mx - mn\n    r[r==0] = 1\n    return ((a - mn) / r).tolist()" }, testCases: [{ input: "[[1,10],[2,20],[3,30]]", expectedOutput: [[0, 0], [0.5, 0.5], [1, 1]] }], hints: [] },
];

export const LEVEL3_T4_MCQS: Mcq[] = [
  { id: "l3-t4-q1", topicId: "t3-feature-scale", question: "Why scale features?", options: [{ id: "a", text: "To reduce dataset size", isCorrect: false }, { id: "b", text: "To put features on comparable scale for ML", isCorrect: true, explanation: "Algorithms sensitive to magnitude" }, { id: "c", text: "To remove outliers", isCorrect: false }, { id: "d", text: "To speed up loading", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t4-q2", topicId: "t3-feature-scale", question: "Min-Max scaling produces values in?", options: [{ id: "a", text: "[0, 1]", isCorrect: true, explanation: "Linear scale to 0-1" }, { id: "b", text: "Mean 0, std 1", isCorrect: false }, { id: "c", text: "[-1, 1]", isCorrect: false }, { id: "d", text: "Original range", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t4-q3", topicId: "t3-feature-scale", question: "StandardScaler produces?", options: [{ id: "a", text: "Mean 0, std 1", isCorrect: true, explanation: "Z-score normalization" }, { id: "b", text: "Values in [0,1]", isCorrect: false }, { id: "c", text: "Integer values", isCorrect: false }, { id: "d", text: "Normalized sum", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t4-q4", topicId: "t3-feature-scale", question: "When to use RobustScaler?", options: [{ id: "a", text: "When data has outliers", isCorrect: true, explanation: "Uses median and IQR" }, { id: "b", text: "When data is small", isCorrect: false }, { id: "c", text: "When data is binary", isCorrect: false }, { id: "d", text: "Always", isCorrect: false }], difficulty: "medium", type: "basic" },
];

export const LEVEL3_T4_ASSIGN: MiniAssignment = {
  id: "l3-t4-assign", topicId: "t3-feature-scale", title: "Scaling Comparison",
  description: "Implement MinMaxScaler and StandardScaler from scratch. Apply both to a dataset. Compare and document when each is appropriate.",
  rubric: [{ criterion: "MinMaxScaler", points: 40 }, { criterion: "StandardScaler", points: 40 }, { criterion: "Comparison", points: 20 }],
};

// ─── TOPIC 5: GroupBy ────────────────────────────────────────────────────
export const LEVEL3_T5_EXERCISES: CodingExercise[] = [
  { id: "l3-t5-e1", topicId: "t3-groupby", title: "Group Sum", description: "Group by col and return sum of val.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef group_sum(data):\n    df = pd.DataFrame(data)\n    return df.groupby('cat')['val'].sum().to_dict()" }, testCases: [{ input: '{"cat":["A","A","B"],"val":[1,2,3]}', expectedOutput: { A: 3, B: 3 } }], hints: [] },
  { id: "l3-t5-e2", topicId: "t3-groupby", title: "Group Mean", description: "Group by col and return mean.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef group_mean(data):\n    df = pd.DataFrame(data)\n    return df.groupby('cat')['val'].mean().to_dict()" }, testCases: [{ input: '{"cat":["A","A","B"],"val":[2,4,6]}', expectedOutput: { A: 3, B: 6 } }], hints: [] },
  { id: "l3-t5-e3", topicId: "t3-groupby", title: "Group Count", description: "Return count per group.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef group_count(data):\n    df = pd.DataFrame(data)\n    return df.groupby('cat').size().to_dict()" }, testCases: [{ input: '{"cat":["A","A","B","B"]}', expectedOutput: { A: 2, B: 2 } }], hints: [] },
  { id: "l3-t5-m1", topicId: "t3-groupby", title: "Group Agg", description: "Group by cat, return mean and sum of val.", difficulty: "medium", type: "medium", boilerplate: { python: "import pandas as pd\ndef group_agg(data):\n    df = pd.DataFrame(data)\n    g = df.groupby('cat')['val'].agg(['mean','sum'])\n    return g.to_dict()" }, testCases: [{ input: '{"cat":["A","A","B"],"val":[2,4,6]}', expectedOutput: { mean: { A: 3, B: 6 }, sum: { A: 6, B: 6 } } }], hints: [] },
];

export const LEVEL3_T5_MCQS: Mcq[] = [
  { id: "l3-t5-q1", topicId: "t3-groupby", question: "df.groupby('cat') produces?", options: [{ id: "a", text: "DataFrame", isCorrect: false }, { id: "b", text: "GroupBy object", isCorrect: true, explanation: "Lazy evaluation" }, { id: "c", text: "Series", isCorrect: false }, { id: "d", text: "List", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t5-q2", topicId: "t3-groupby", question: "df.groupby('cat')['val'].mean() returns?", options: [{ id: "a", text: "Mean of all val", isCorrect: false }, { id: "b", text: "Mean of val per group", isCorrect: true, explanation: "Series with group index" }, { id: "c", text: "DataFrame", isCorrect: false }, { id: "d", text: "Error", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t5-q3", topicId: "t3-groupby", question: "agg(['mean','sum']) does?", options: [{ id: "a", text: "One aggregation", isCorrect: false }, { id: "b", text: "Multiple aggregations", isCorrect: true, explanation: "Apply multiple functions" }, { id: "c", text: "Aggregates rows", isCorrect: false }, { id: "d", text: "Merges groups", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t5-q4", topicId: "t3-groupby", question: "groupby with multiple columns?", options: [{ id: "a", text: "df.groupby(['a','b'])", isCorrect: true, explanation: "Multi-level grouping" }, { id: "b", text: "df.groupby('a','b')", isCorrect: false }, { id: "c", text: "Not supported", isCorrect: false }, { id: "d", text: "df.groupby('a').groupby('b')", isCorrect: false }], difficulty: "medium", type: "basic" },
];

export const LEVEL3_T5_ASSIGN: MiniAssignment = {
  id: "l3-t5-assign", topicId: "t3-groupby", title: "GroupBy Analytics",
  description: "Given sales data: (1) Total sales by category. (2) Average sales by region. (3) Count of transactions per region. (4) Pivot-style summary.",
  rubric: [{ criterion: "Total by category", points: 30 }, { criterion: "Avg by region", points: 30 }, { criterion: "Count", points: 20 }, { criterion: "Pivot", points: 20 }],
};

// ─── TOPIC 6: Joins ──────────────────────────────────────────────────────
export const LEVEL3_T6_EXERCISES: CodingExercise[] = [
  { id: "l3-t6-e1", topicId: "t3-joins", title: "Inner Merge", description: "Merge two dict DataFrames on key, how='inner'.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef inner_merge(left, right):\n    l = pd.DataFrame(left)\n    r = pd.DataFrame(right)\n    return pd.merge(l, r, on='key', how='inner').to_dict('records')" }, testCases: [{ input: '[{"key":[1,2],"a":[10,20]}, {"key":[1,3],"b":[100,300]}]', expectedOutput: [{ key: 1, a: 10, b: 100 }] }], hints: [] },
  { id: "l3-t6-e2", topicId: "t3-joins", title: "Left Merge", description: "Merge with how='left'. Return list of dicts.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef left_merge(left, right):\n    l = pd.DataFrame(left)\n    r = pd.DataFrame(right)\n    m = pd.merge(l, r, on='key', how='left')\n    return m.where(pd.notnull(m), None).to_dict('records')" }, testCases: [{ input: '[{"key":[1,2],"a":[10,20]}, {"key":[1],"b":[100]}]', expectedOutput: [{ key: 1, a: 10, b: 100 }, { key: 2, a: 20, b: null }] }], hints: [] },
  { id: "l3-t6-m1", topicId: "t3-joins", title: "Concat Rows", description: "Concatenate two DataFrames vertically.", difficulty: "medium", type: "medium", boilerplate: { python: "import pandas as pd\ndef concat_rows(d1, d2):\n    return pd.concat([pd.DataFrame(d1), pd.DataFrame(d2)], ignore_index=True).to_dict('records')" }, testCases: [{ input: '[{"A":[1,2]}, {"A":[3,4]}]', expectedOutput: [{ A: 1 }, { A: 2 }, { A: 3 }, { A: 4 }] }], hints: [] },
];

export const LEVEL3_T6_MCQS: Mcq[] = [
  { id: "l3-t6-q1", topicId: "t3-joins", question: "Inner join keeps?", options: [{ id: "a", text: "All rows from both", isCorrect: false }, { id: "b", text: "Only matching rows", isCorrect: true, explanation: "Intersection" }, { id: "c", text: "All from left", isCorrect: false }, { id: "d", text: "All from right", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t6-q2", topicId: "t3-joins", question: "Left join keeps?", options: [{ id: "a", text: "All rows from left", isCorrect: true, explanation: "Right fills where match" }, { id: "b", text: "Only matching", isCorrect: false }, { id: "c", text: "All from right", isCorrect: false }, { id: "d", text: "Union", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t6-q3", topicId: "t3-joins", question: "pd.merge needs?", options: [{ id: "a", text: "A join key", isCorrect: true, explanation: "on= or left_on/right_on" }, { id: "b", text: "Same shape", isCorrect: false }, { id: "c", text: "Same columns", isCorrect: false }, { id: "d", text: "Index", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL3_T6_ASSIGN: MiniAssignment = {
  id: "l3-t6-assign", topicId: "t3-joins", title: "Data Merging",
  description: "Merge two datasets: (1) Inner join on key. (2) Left join. (3) Handle duplicate keys. (4) Document join logic.",
  rubric: [{ criterion: "Inner join", points: 30 }, { criterion: "Left join", points: 30 }, { criterion: "Duplicate handling", points: 25 }, { criterion: "Documentation", points: 15 }],
};

// ─── TOPIC 7: Time Series ─────────────────────────────────────────────────
export const LEVEL3_T7_EXERCISES: CodingExercise[] = [
  { id: "l3-t7-e1", topicId: "t3-timeseries", title: "Rolling Mean", description: "Return 3-period rolling mean of list.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef rolling_mean(arr, window):\n    s = pd.Series(arr)\n    return s.rolling(window, min_periods=1).mean().tolist()" }, testCases: [{ input: "[1,2,3,4,5], 3", expectedOutput: [1, 1.5, 2, 3, 4] }], hints: [] },
  { id: "l3-t7-e2", topicId: "t3-timeseries", title: "Diff", description: "Return first difference of list.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef diff_series(arr):\n    s = pd.Series(arr)\n    return s.diff().fillna(0).astype(int).tolist()" }, testCases: [{ input: "[1,3,5,7]", expectedOutput: [0, 2, 2, 2] }], hints: [] },
  { id: "l3-t7-m1", topicId: "t3-timeseries", title: "Cumulative Sum", description: "Return cumulative sum.", difficulty: "medium", type: "medium", boilerplate: { python: "def cumsum_arr(arr):\n    return list(__import__('numpy').cumsum(arr))" }, testCases: [{ input: "[1,2,3,4]", expectedOutput: [1, 3, 6, 10] }], hints: [] },
];

export const LEVEL3_T7_MCQS: Mcq[] = [
  { id: "l3-t7-q1", topicId: "t3-timeseries", question: "resample('M') groups by?", options: [{ id: "a", text: "Month", isCorrect: true, explanation: "M = month" }, { id: "b", text: "Minute", isCorrect: false }, { id: "c", text: "Millisecond", isCorrect: false }, { id: "d", text: "Max", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t7-q2", topicId: "t3-timeseries", question: "rolling(7).mean() gives?", options: [{ id: "a", text: "7-period moving average", isCorrect: true, explanation: "Window of 7" }, { id: "b", text: "7th value", isCorrect: false }, { id: "c", text: "Sum of 7", isCorrect: false }, { id: "d", text: "7 rows", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t7-q3", topicId: "t3-timeseries", question: "shift(1) does?", options: [{ id: "a", text: "Lag by 1 period", isCorrect: true, explanation: "Shift values down" }, { id: "b", text: "Lead by 1", isCorrect: false }, { id: "c", text: "Sort", isCorrect: false }, { id: "d", text: "Roll", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL3_T7_ASSIGN: MiniAssignment = {
  id: "l3-t7-assign", topicId: "t3-timeseries", title: "Time Series Analysis",
  description: "Given daily data: (1) Resample to weekly. (2) Compute rolling mean. (3) Compute lag and diff. (4) Visualize trend.",
  rubric: [{ criterion: "Resample", points: 30 }, { criterion: "Rolling", points: 30 }, { criterion: "Lag/diff", points: 25 }, { criterion: "Visualization", points: 15 }],
};

// ─── TOPIC 8: Matplotlib ─────────────────────────────────────────────────
export const LEVEL3_T8_EXERCISES: CodingExercise[] = [
  { id: "l3-t8-e1", topicId: "t3-matplotlib", title: "Plot Returns", description: "Return 'ok' if matplotlib can create a simple plot (no display).", difficulty: "easy", type: "short", boilerplate: { python: "def plot_ready():\n    import matplotlib\n    matplotlib.use('Agg')\n    import matplotlib.pyplot as plt\n    plt.plot([1,2,3],[1,4,9])\n    plt.close()\n    return 'ok'" }, testCases: [{ input: "", expectedOutput: "ok" }], hints: [] },
  { id: "l3-t8-e2", topicId: "t3-matplotlib", title: "Bar Data", description: "Return list of [label, value] for bar chart from dict.", difficulty: "easy", type: "short", boilerplate: { python: "def bar_data(d):\n    return [[k, v] for k, v in d.items()]" }, testCases: [{ input: '{"a":1,"b":2}', expectedOutput: [["a", 1], ["b", 2]] }], hints: [] },
  { id: "l3-t8-m1", topicId: "t3-matplotlib", title: "Histogram Bins", description: "Return bin edges for n bins over data range.", difficulty: "medium", type: "medium", boilerplate: { python: "def hist_bins(data, n):\n    import numpy as np\n    mn, mx = min(data), max(data)\n    return np.linspace(mn, mx, n+1).tolist()" }, testCases: [{ input: "[0,1,2,3,4,5], 5", expectedOutput: [0, 1, 2, 3, 4, 5] }], hints: [] },
];

export const LEVEL3_T8_MCQS: Mcq[] = [
  { id: "l3-t8-q1", topicId: "t3-matplotlib", question: "plt.plot(x, y) creates?", options: [{ id: "a", text: "Line plot", isCorrect: true, explanation: "Default is line" }, { id: "b", text: "Scatter", isCorrect: false }, { id: "c", text: "Bar", isCorrect: false }, { id: "d", text: "Histogram", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t8-q2", topicId: "t3-matplotlib", question: "plt.subplots(2, 2) creates?", options: [{ id: "a", text: "2x2 grid of axes", isCorrect: true, explanation: "4 subplots" }, { id: "b", text: "2 plots", isCorrect: false }, { id: "c", text: "2x2 data", isCorrect: false }, { id: "d", text: "Single plot", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t8-q3", topicId: "t3-matplotlib", question: "plt.xlabel sets?", options: [{ id: "a", text: "X-axis label", isCorrect: true, explanation: "Axis label" }, { id: "b", text: "X data", isCorrect: false }, { id: "c", text: "Title", isCorrect: false }, { id: "d", text: "Legend", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t8-q4", topicId: "t3-matplotlib", question: "plt.hist(data, bins=20) shows?", options: [{ id: "a", text: "Distribution of data", isCorrect: true, explanation: "Histogram" }, { id: "b", text: "Line over time", isCorrect: false }, { id: "c", text: "Scatter", isCorrect: false }, { id: "d", text: "Bar chart", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL3_T8_ASSIGN: MiniAssignment = {
  id: "l3-t8-assign", topicId: "t3-matplotlib", title: "Visualization Dashboard",
  description: "Create 4 plots: (1) Line plot. (2) Bar chart. (3) Histogram. (4) Subplot layout. Save to file.",
  rubric: [{ criterion: "Line", points: 25 }, { criterion: "Bar", points: 25 }, { criterion: "Histogram", points: 25 }, { criterion: "Subplots", points: 25 }],
};

// ─── TOPIC 9: Seaborn ────────────────────────────────────────────────────
export const LEVEL3_T9_EXERCISES: CodingExercise[] = [
  { id: "l3-t9-e1", topicId: "t3-seaborn", title: "Correlation Matrix", description: "Return correlation matrix of DataFrame as nested list.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef corr_matrix(data):\n    return pd.DataFrame(data).corr().values.tolist()" }, testCases: [{ input: '{"a":[1,2,3],"b":[2,4,6]}', expectedOutput: [[1, 1], [1, 1]] }], hints: [] },
  { id: "l3-t9-e2", topicId: "t3-seaborn", title: "Pairwise Corr", description: "Return correlation between two columns.", difficulty: "easy", type: "short", boilerplate: { python: "import pandas as pd\ndef corr_two(data, c1, c2):\n    df = pd.DataFrame(data)\n    return float(df[c1].corr(df[c2]))" }, testCases: [{ input: '[{"x":[1,2,3],"y":[2,4,6]}, "x", "y"]', expectedOutput: 1 }], hints: [] },
  { id: "l3-t9-m1", topicId: "t3-seaborn", title: "Box Stats", description: "Return min, q1, median, q3, max for column.", difficulty: "medium", type: "medium", boilerplate: { python: "import pandas as pd\ndef box_stats(data, col):\n    s = pd.DataFrame(data)[col]\n    q = s.quantile([0, 0.25, 0.5, 0.75, 1])\n    return q.tolist()" }, testCases: [{ input: '[{"val":[1,2,3,4,5]}, "val"]', expectedOutput: [1, 2, 3, 4, 5] }], hints: [] },
];

export const LEVEL3_T9_MCQS: Mcq[] = [
  { id: "l3-t9-q1", topicId: "t3-seaborn", question: "Seaborn is built on?", options: [{ id: "a", text: "Matplotlib", isCorrect: true, explanation: "High-level wrapper" }, { id: "b", text: "NumPy", isCorrect: false }, { id: "c", text: "Pandas only", isCorrect: false }, { id: "d", text: "Plotly", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t9-q2", topicId: "t3-seaborn", question: "sns.heatmap often shows?", options: [{ id: "a", text: "Correlation matrix", isCorrect: true, explanation: "Common use" }, { id: "b", text: "Time series", isCorrect: false }, { id: "c", text: "Scatter", isCorrect: false }, { id: "d", text: "Bar", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t9-q3", topicId: "t3-seaborn", question: "sns.boxplot compares?", options: [{ id: "a", text: "Distributions across groups", isCorrect: true, explanation: "Box per category" }, { id: "b", text: "Two variables", isCorrect: false }, { id: "c", text: "Time", isCorrect: false }, { id: "d", text: "Correlations", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l3-t9-q4", topicId: "t3-seaborn", question: "hue in sns.scatterplot adds?", options: [{ id: "a", text: "Color by third variable", isCorrect: true, explanation: "Categorical coloring" }, { id: "b", text: "Size", isCorrect: false }, { id: "c", text: "Title", isCorrect: false }, { id: "d", text: "Legend only", isCorrect: false }], difficulty: "medium", type: "basic" },
];

export const LEVEL3_T9_ASSIGN: MiniAssignment = {
  id: "l3-t9-assign", topicId: "t3-seaborn", title: "Statistical Visualization",
  description: "Create: (1) Histogram with distribution. (2) Boxplot by category. (3) Scatter with hue. (4) Correlation heatmap.",
  rubric: [{ criterion: "Histogram", points: 25 }, { criterion: "Boxplot", points: 25 }, { criterion: "Scatter", points: 25 }, { criterion: "Heatmap", points: 25 }],
};

// ─── Combined exports ────────────────────────────────────────────────────
export const LEVEL3_ALL_EXERCISES: CodingExercise[] = [
  ...LEVEL3_T1_EXERCISES,
  ...LEVEL3_T2_EXERCISES,
  ...LEVEL3_T3_EXERCISES,
  ...LEVEL3_T4_EXERCISES,
  ...LEVEL3_T5_EXERCISES,
  ...LEVEL3_T6_EXERCISES,
  ...LEVEL3_T7_EXERCISES,
  ...LEVEL3_T8_EXERCISES,
  ...LEVEL3_T9_EXERCISES,
];

export const LEVEL3_ALL_MCQS: Mcq[] = [
  ...LEVEL3_T1_MCQS,
  ...LEVEL3_T2_MCQS,
  ...LEVEL3_T3_MCQS,
  ...LEVEL3_T4_MCQS,
  ...LEVEL3_T5_MCQS,
  ...LEVEL3_T6_MCQS,
  ...LEVEL3_T7_MCQS,
  ...LEVEL3_T8_MCQS,
  ...LEVEL3_T9_MCQS,
];

export const LEVEL3_ALL_ASSIGNMENTS: Record<string, MiniAssignment> = {
  "t3-numpy": LEVEL3_T1_ASSIGN,
  "t3-pandas": LEVEL3_T2_ASSIGN,
  "t3-cleaning": LEVEL3_T3_ASSIGN,
  "t3-feature-scale": LEVEL3_T4_ASSIGN,
  "t3-groupby": LEVEL3_T5_ASSIGN,
  "t3-joins": LEVEL3_T6_ASSIGN,
  "t3-timeseries": LEVEL3_T7_ASSIGN,
  "t3-matplotlib": LEVEL3_T8_ASSIGN,
  "t3-seaborn": LEVEL3_T9_ASSIGN,
};
