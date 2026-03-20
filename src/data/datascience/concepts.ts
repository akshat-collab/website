/**
 * Data Science Course - Original Concept Content
 * All content hosted on your platform. No external links.
 */

export const DS_CONCEPT_CONTENT: Record<string, string> = {
  // ═══════════════════════════════════════════════════════════════
  // LEVEL 1: Python Foundations
  // ═══════════════════════════════════════════════════════════════

  "t1-variables": `# Variables & Data Types

## What is Data?
Data is information. In programming, we store data in **variables**—named containers that hold values.

## Variables in Python
Assign with \`=\`. Variable names: letters, digits, underscore. Cannot start with a digit.

\`\`\`python
x = 10
name = "Alice"
price = 19.99
\`\`\`

## Built-in Data Types
| Type | Example | Use |
|------|---------|-----|
| int | 42, -7 | Integers |
| float | 3.14, -0.5 | Decimals |
| str | "hello" | Text |
| bool | True, False | Logic |
| list | [1, 2, 3] | Ordered collection |
| dict | {"a": 1} | Key-value pairs |
| set | {1, 2, 3} | Unique items |

## Type Conversion
\`\`\`python
int("42")      # 42
str(42)        # "42"
float("3.14")  # 3.14
\`\`\`

## Operators
Arithmetic: \`+ - * / // % **\`
Comparison: \`== != < > <= >=\`
Logical: \`and or not\``,

  "t1-control": `# Control Flow

## Conditional Execution
Execute code only when a condition is true.

\`\`\`python
if score >= 60:
    print("Pass")
elif score >= 40:
    print("Retake")
else:
    print("Fail")
\`\`\`

## Truthiness
\`False\`, \`0\`, \`""\`, \`[]\`, \`None\` are falsy. Everything else is truthy.

## Nested Conditions
\`\`\`python
if x > 0:
    if y > 0:
        print("Both positive")
\`\`\`

## Ternary Expression
\`\`\`python
result = "even" if n % 2 == 0 else "odd"
\`\`\``,

  "t1-loops": `# Loops

## for Loop
Iterate over a sequence (list, range, string).

\`\`\`python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for char in "hello":
    print(char)
\`\`\`

## while Loop
Repeat while condition is true.

\`\`\`python
n = 0
while n < 5:
    print(n)
    n += 1
\`\`\`

## break and continue
\`break\` exits the loop. \`continue\` skips to next iteration.

\`\`\`python
for x in range(10):
    if x == 5:
        break
    if x % 2 == 0:
        continue
    print(x)
\`\`\``,

  "t1-functions": `# Functions

## Defining Functions
\`\`\`python
def greet(name):
    return f"Hello, {name}"

result = greet("Alice")
\`\`\`

## Parameters and Defaults
\`\`\`python
def power(base, exp=2):
    return base ** exp

power(3)    # 9
power(3, 3) # 27
\`\`\`

## *args and **kwargs
\`\`\`python
def sum_all(*args):
    return sum(args)

def print_kw(**kwargs):
    for k, v in kwargs.items():
        print(k, v)
\`\`\``,

  "t1-collections": `# Lists, Sets, Dicts

## Lists
Ordered, mutable, allows duplicates.

\`\`\`python
nums = [1, 2, 3]
nums.append(4)
nums[0] = 10
nums[-1]  # last
nums[1:3] # slice
\`\`\`

## Sets
Unordered, unique elements, mutable.

\`\`\`python
s = {1, 2, 2, 3}  # {1, 2, 3}
s.add(4)
s.discard(2)
\`\`\`

## Dicts
Key-value pairs. Keys must be hashable.

\`\`\`python
d = {"a": 1, "b": 2}
d["c"] = 3
d.get("x", 0)  # default
for k, v in d.items():
    print(k, v)
\`\`\``,

  "t1-oop": `# OOP Basics

## Classes and Objects
\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name}"

p = Person("Alice", 30)
p.greet()
\`\`\`

## Inheritance
\`\`\`python
class Student(Person):
    def __init__(self, name, age, grade):
        super().__init__(name, age)
        self.grade = grade
\`\`\``,

  "t1-files": `# File Handling

## Reading Files
\`\`\`python
with open("data.txt", "r") as f:
    content = f.read()

with open("data.txt", "r") as f:
    lines = f.readlines()
\`\`\`

## Writing Files
\`\`\`python
with open("out.txt", "w") as f:
    f.write("Hello\\n")

with open("out.txt", "a") as f:
    f.write("Append")
\`\`\`

## CSV
\`\`\`python
import csv
with open("data.csv", "r") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
\`\`\``,

  "t1-exceptions": `# Exception Handling

## try / except
\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    result = 0

try:
    x = int("abc")
except ValueError as e:
    print(f"Error: {e}")
\`\`\`

## finally
\`\`\`python
try:
    f = open("file.txt")
    # use f
finally:
    f.close()
\`\`\`

## raise
\`\`\`python
if n < 0:
    raise ValueError("n must be non-negative")
\`\`\``,

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 2: Advanced Python
  // ═══════════════════════════════════════════════════════════════

  "t2-comprehensions": `# List Comprehensions

## Why Comprehensions?
Comprehensions are **concise, readable** ways to build lists, dicts, and sets. They often run faster than equivalent loops.

## Structure Diagram
\`\`\`
[ expression  for  item  in  iterable  if  condition ]
     │              │         │              │
     │              │         │              └── optional filter
     │              │         └── source (list, range, etc.)
     │              └── loop variable
     └── what to put in result
\`\`\`

## Basic Syntax
\`\`\`python
squares = [x**2 for x in range(10)]      # [0,1,4,9,...]
evens = [x for x in nums if x % 2 == 0]  # filter
\`\`\`

## Flow: Loop vs Comprehension
\`\`\`
Traditional loop:          Comprehension:
┌─────────────────┐       ┌─────────────────────────┐
│ result = []     │       │ result = [x*2 for x in   │
│ for x in nums:  │  =>   │   nums if x > 0]         │
│   if x > 0:     │       └─────────────────────────┘
│     result.append(x*2)  │
└─────────────────┘       One line, same result
\`\`\`

## Nested Comprehensions
\`\`\`python
matrix = [[i*j for j in range(3)] for i in range(3)]
# [[0,0,0], [0,1,2], [0,2,4]]

pairs = [(a, b) for a in [1,2] for b in [3,4]]
# [(1,3),(1,4),(2,3),(2,4)]
\`\`\`

## Dict and Set Comprehensions
| Type | Syntax | Example |
|------|--------|---------|
| List | \`[x for x in ...]\` | \`[1,2,3]\` |
| Dict | \`{k: v for ...}\` | \`{"a":1,"b":2}\` |
| Set | \`{x for x in ...}\` | \`{1,2,3}\` |

\`\`\`python
d = {k: v**2 for k, v in [("a",1), ("b",2)]}  # {"a":1,"b":4}
s = {x % 5 for x in range(20)}                  # {0,1,2,3,4}
\`\`\``,

  "t2-lambda": `# Lambda & Higher-Order Functions

## Lambda: Anonymous Functions
A **lambda** is a one-line function with no name. Use when you need a small function once.

## Syntax Diagram
\`\`\`
lambda  arg1, arg2, ...  :  expression
  │         │                  │
  │         │                  └── single expression (no return)
  │         └── parameters
  └── keyword
\`\`\`

## Lambda vs def
| def | lambda |
|-----|--------|
| Multi-line | Single expression only |
| Named | Anonymous |
| Can have statements | Expression only |

\`\`\`python
square = lambda x: x ** 2
add = lambda a, b: a + b
# Equivalent: def square(x): return x**2
\`\`\`

## Higher-Order Functions
Functions that take or return other functions.

\`\`\`
map(f, [a,b,c])     →  [f(a), f(b), f(c)]
filter(p, [a,b,c])  →  [x for x in [a,b,c] if p(x)]
reduce(f, [a,b,c])  →  f(f(a,b), c)
\`\`\`

\`\`\`python
list(map(lambda x: x*2, [1,2,3]))      # [2,4,6]
list(filter(lambda x: x>0, [-1,1,2])) # [1,2]
from functools import reduce
reduce(lambda a,b: a+b, [1,2,3])       # 6
\`\`\``,

  "t2-decorators": `# Decorators

## What is a Decorator?
A decorator **wraps** a function to add behavior (logging, timing, caching) without changing the original code.

## Flow Diagram
\`\`\`
@log
def add(a, b):
    return a + b

     ↓  equivalent to  ↓

add = log(add)

Call flow:
  add(1,2)  →  log's wrapper  →  print("Calling add")  →  original add(1,2)  →  return 3
\`\`\`

## Structure
\`\`\`python
def log(func):
    def wrapper(*args, **kwargs):
        print("Calling", func.__name__)
        return func(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    return a + b
\`\`\`

## Common Uses
| Decorator | Purpose |
|-----------|---------|
| @log | Print before/after call |
| @timer | Measure execution time |
| @cache | Memoize results |
| @validate | Check arguments |
\`\`\``,

  "t2-generators": `# Generators & Iterators

## Why Generators?
**Memory efficient**: produce values one at a time instead of building a full list.

## Iterator Flow
\`\`\`
Generator function          Consumer (for loop)
┌──────────────────┐      ┌─────────────────┐
│ def count_up(n):  │      │ for x in gen:   │
│   i = 0           │      │   print(x)      │
│   while i < n:    │  ←→  │                 │
│     yield i   ────┼──────│  gets next val  │
│     i += 1        │      └─────────────────┘
└──────────────────┘
\`\`\`

## yield vs return
| return | yield |
|--------|-------|
| Exits function | Pauses, resumes later |
| One value | Can yield many |
| Function ends | Generator continues |

\`\`\`python
def count_up(n):
    i = 0
    while i < n:
        yield i
        i += 1

for x in count_up(5):
    print(x)  # 0, 1, 2, 3, 4
\`\`\`

## Generator Expression
Like list comprehension but lazy: \`(x**2 for x in range(10))\`
\`\`\`python
gen = (x**2 for x in range(10))
next(gen)  # 0
next(gen)  # 1
\`\`\``,

  "t2-venv": `# Virtual Environments & Project Structure

## Why Virtual Environments?
Isolate project dependencies. Avoid version conflicts between projects.

## venv Flow
\`\`\`
Project A (Django 4)     Project B (Django 3)
┌─────────────────┐     ┌─────────────────┐
│ venv/           │     │ venv/           │
│  lib/           │     │  lib/           │
│   django 4.x    │     │   django 3.x    │
└─────────────────┘     └─────────────────┘
        │                         │
        └────── Same Python ──────┘
\`\`\`

## Commands
| Command | Purpose |
|---------|---------|
| \`python -m venv .venv\` | Create env |
| \`source .venv/bin/activate\` | Activate (Unix) |
| \`pip install -r requirements.txt\` | Install deps |
| \`pip freeze > requirements.txt\` | Save deps |

## Project Structure
\`\`\`
my_project/
├── .venv/           # virtual env (gitignore)
├── src/
│   ├── __init__.py
│   ├── main.py
│   └── utils.py
├── tests/
├── requirements.txt
└── README.md
\`\`\``,

  "t2-complexity": `# Complexity Analysis

## Big O: Growth Rate
How runtime/memory grows as input size n increases.

## Complexity Chart (n → operations)
\`\`\`
Operations
    │
 2ⁿ │                    *
    │                  *
    │                *
 n² │              *
    │            *
n   │          *
    │        *
log n│      *
    │    *
 1  │  *
    └───────────────────── n
\`\`\`

## Common Complexities
| Notation | Name | Example |
|---------|------|---------|
| O(1) | Constant | \`lst[i]\`, \`d[k]\` |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Recursive fib |

## Data Structure Costs
| Operation | List | Dict | Set |
|-----------|------|------|-----|
| Access by index/key | O(1) | O(1) | N/A |
| Search (in) | O(n) | O(1) avg | O(1) avg |
| Append/Insert | O(1) | O(1) | O(1) |
| Delete | O(n) | O(1) | O(1) |
`,

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 3: Data Analytics
  // ═══════════════════════════════════════════════════════════════

  "t3-numpy": `# NumPy: Numerical Computing Foundation

## Why NumPy?
NumPy is the foundational library for numerical computing in Python. Unlike Python lists, NumPy arrays are **homogeneous** (same type), **contiguous in memory**, and support **vectorized operations**—meaning operations run on entire arrays without Python loops, achieving C-level speed.

## Array Structure
\`\`\`
1D array:  [ 1 2 3 4 5 ]     shape: (5,)
           index: 0 1 2 3 4

2D array:  [ 1 2 ]           shape: (2, 3)
           [ 3 4 ]
           [ 5 6 ]           row 0, row 1, row 2
                 col0 col1
\`\`\`

## Creation & Shape
\`\`\`python
import numpy as np
arr = np.array([1, 2, 3, 4, 5])
arr2d = np.array([[1,2], [3,4]])
arr.shape   # (5,) or (2, 2)
arr.dtype   # int64 or float64

np.zeros((3, 3))   # 3×3 matrix of zeros
np.ones(5)         # [1,1,1,1,1]
np.arange(0, 10, 2)  # [0,2,4,6,8]
np.linspace(0, 1, 5) # [0, 0.25, 0.5, 0.75, 1]
\`\`\`

## Vectorized Operations (Key Advantage)
\`\`\`
Python loop:     for x in arr: result.append(x*2)   → slow
NumPy vectorized: arr * 2                           → fast (C backend)
\`\`\`

\`\`\`python
arr * 2
arr + arr
np.mean(arr)
np.std(arr)
np.sum(arr)
np.min(arr)
np.max(arr)
\`\`\`

## Indexing & Slicing
\`\`\`python
arr[0]       # first element
arr[-1]      # last
arr[1:4]     # slice [1,2,3]
arr2d[1, 0]  # row 1, col 0
arr2d[:, 1]  # all rows, col 1
\`\`\`

## Broadcasting
When shapes differ, NumPy broadcasts smaller arrays to match larger ones:
\`\`\`
[1,2,3] + 10  →  [11, 12, 13]
(3,) + scalar → (3,)
\`\`\``,

  "t3-pandas": `# Pandas: Data Manipulation

## Overview
Pandas provides **DataFrame** (2D table) and **Series** (1D column). It's the standard tool for loading, cleaning, transforming, and analyzing tabular data.

## DataFrame Structure
\`\`\`
     col_A  col_B  col_C
0      1      4      7      ← row index
1      2      5      8
2      3      6      9
       ↑
    column
\`\`\`

## Creating & Loading
\`\`\`python
import pandas as pd
df = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})
df = pd.read_csv("data.csv")
df = pd.read_excel("data.xlsx")
\`\`\`

## Inspecting Data
\`\`\`python
df.head()       # first 5 rows
df.tail()       # last 5
df.info()       # dtypes, non-null counts
df.describe()   # mean, std, min, max, quartiles
df.shape        # (rows, cols)
df.columns     # column names
df.dtypes      # type per column
\`\`\`

## Selection: loc vs iloc
| Method | Use | Example |
|--------|-----|---------|
| loc | Label-based | df.loc[0], df.loc[0:2, "A"] |
| iloc | Integer position | df.iloc[0], df.iloc[0:5, 1] |
| df["col"] | Single column | Returns Series |
| df[["c1","c2"]] | Multiple columns | Returns DataFrame |

\`\`\`python
df["A"]
df[["A", "B"]]
df.loc[0]
df.iloc[0:5]
\`\`\``,

  "t3-cleaning": `# Data Cleaning & Missing Values

## The 80% Rule
Data scientists spend ~80% of time on data cleaning. Real-world data is messy: missing values, duplicates, wrong types, outliers.

## Missing Values Flow
\`\`\`
Raw data          Detect           Handle
┌─────────┐     ┌─────────┐     ┌─────────┐
│ 1 2 NaN │     │ isna()  │     │ dropna  │
│ 4 NaN 6 │  →  │ sum()   │  →  │ fillna  │
│ 7 8 9   │     │ 2 NaNs  │     │ interpolate
└─────────┘     └─────────┘     └─────────┘
\`\`\`

## Handling Missing Data
\`\`\`python
df.isna().sum()        # count per column
df.dropna()            # drop rows with any NaN
df.dropna(subset=["col"])  # drop rows where col is NaN
df.fillna(0)            # replace with constant
df.fillna(df.mean())    # replace with column mean
df.ffill()  # forward fill (propagate last valid)
\`\`\`

## Duplicates
\`\`\`python
df.duplicated()           # boolean mask
df.drop_duplicates()      # keep first
df.drop_duplicates(subset=["col"])  # by column
\`\`\`

## Type Conversion
\`\`\`python
df["col"] = df["col"].astype(int)
df["date"] = pd.to_datetime(df["date"])
df["cat"] = df["cat"].astype("category")
\`\`\``,

  "t3-feature-scale": `# Feature Scaling

## Why Scale?
Features often have different units (age: years, income: dollars). Many ML algorithms (e.g., gradient descent, KNN) are sensitive to feature magnitude. Scaling puts features on a comparable scale.

## Scaling Methods
\`\`\`
Original     Min-Max     Standardization
[1,10,100]   [0,0.09,1]  [-1.2, -0.6, 1.8]
     │            │              │
     └────────────┴──────────────┘
     min-max to [0,1]   (x-mean)/std
\`\`\`

## Min-Max
\`\`\`python
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
df_scaled = scaler.fit_transform(df[["col"]])
# Values in [0, 1]
\`\`\`

## Standardization (Z-score)
\`\`\`python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
df_scaled = scaler.fit_transform(df[["col"]])
# Mean 0, std 1
\`\`\`

## When to Use
| Method | Use case |
|--------|----------|
| Min-Max | Bounded data, neural networks |
| StandardScaler | Normally distributed, many algorithms |
| RobustScaler | Outliers present |
\`\`\``,

  "t3-groupby": `# GroupBy & Aggregations

## Concept
Split data into groups, apply a function to each group, combine results.

## GroupBy Flow
\`\`\`
DataFrame
     cat   val
0    A     10
1    B     20      →  groupby("cat")
2    A     30
3    B     40

     Group A: [10, 30]  →  sum → 40
     Group B: [20, 40]  →  sum → 60

Result: cat  val
        A    40
        B    60
\`\`\`

## Syntax
\`\`\`python
df.groupby("category").sum()
df.groupby("category")["sales"].mean()
df.groupby(["cat1", "cat2"]).agg({"col": ["mean", "count"]})
df.groupby("cat").agg(avg=("val", "mean"), total=("val", "sum"))
\`\`\`

## Common Aggregations
| Function | Description |
|----------|-------------|
| sum, mean | Sum, average |
| count | Non-null count |
| min, max | Min, max |
| std, var | Standard deviation, variance |
| first, last | First/last value |
\`\`\``,

  "t3-joins": `# Joins & Merges

## Join Types
\`\`\`
Left (A)     Right (B)     Inner    Left    Right   Outer
  a 1          a 10          a 1,10   a 1,10  a 1,10  a 1,10
  b 2          c 30          c 3,30   b 2,-   -  -,30  b 2,-
  c 3          d 40                    c 3,30  d 4,40  c 3,30
                                       d -,40  d 4,40
\`\`\`

## Merge
\`\`\`python
pd.merge(left, right, on="key")
pd.merge(left, right, on="key", how="left")
pd.merge(left, right, on="key", how="outer")
pd.merge(left, right, left_on="a", right_on="b")
\`\`\`

## Concat
\`\`\`python
pd.concat([df1, df2], axis=0)   # stack rows
pd.concat([df1, df2], axis=1)   # side by side
\`\`\``,

  "t3-timeseries": `# Time Series Basics

## What is Time Series?
Data indexed by time (e.g., daily sales, hourly temperature). Key: **temporal order** matters.

## Resampling
\`\`\`
Daily data  →  resample('M')  →  Monthly
     │              │
     └──────────────┘
     Aggregate (mean, sum)
\`\`\`

## Pandas Time Series
\`\`\`python
df["date"] = pd.to_datetime(df["date"])
df = df.set_index("date")
df.resample("M").mean()

# Rolling
df["rolling_mean"] = df["col"].rolling(7).mean()
df["rolling_std"] = df["col"].rolling(7).std()
\`\`\`

## Common Operations
| Operation | Purpose |
|-----------|---------|
| resample | Change frequency |
| rolling | Moving window |
| shift | Lag/lead |
| diff | Difference |
\`\`\``,

  "t3-matplotlib": `# Matplotlib

## Figure Hierarchy
\`\`\`
Figure
    └── Axes (axes)
            └── plot, scatter, bar, etc.
\`\`\`

## Plot Types
| Method | Use |
|--------|-----|
| plot | Line |
| scatter | Points |
| bar | Bars |
| hist | Histogram |
| boxplot | Box |

## Basic
\`\`\`python
import matplotlib.pyplot as plt
plt.plot(x, y)
plt.scatter(x, y)
plt.bar(labels, values)
plt.hist(data, bins=20)
plt.xlabel("X")
plt.ylabel("Y")
plt.title("Title")
plt.show()
\`\`\`

## Subplots
\`\`\`python
fig, axes = plt.subplots(2, 2)
axes[0, 0].plot(x, y)
axes[0, 1].scatter(x, y)
plt.tight_layout()
\`\`\``,

  "t3-seaborn": `# Seaborn

## Built on Matplotlib
Seaborn provides high-level statistical plots with attractive defaults.

## Key Plots
| Plot | Purpose |
|------|---------|
| histplot | Distribution |
| boxplot | Compare groups |
| scatterplot | Two vars + hue |
| heatmap | Correlation matrix |
| lineplot | Time series |

## Usage
\`\`\`python
import seaborn as sns
sns.histplot(data=df, x="col")
sns.boxplot(data=df, x="cat", y="val")
sns.scatterplot(data=df, x="x", y="y", hue="cat")
sns.heatmap(df.corr(), annot=True)
\`\`\``,

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 4: Statistics
  // ═══════════════════════════════════════════════════════════════

  "t4-descriptive": `# Descriptive Statistics

## Purpose
Summarize and describe data with numbers. Before modeling, always explore: central tendency, spread, shape.

## Central Tendency
| Measure | Formula | When to Use |
|---------|---------|-------------|
| **Mean** | Σx/n | Symmetric data, no outliers |
| **Median** | Middle value | Skewed data, robust to outliers |
| **Mode** | Most frequent | Categorical, multimodal |

\`\`\`
Data: [1, 2, 2, 3, 100]
Mean = 21.6 (pulled by outlier)
Median = 2 (robust)
\`\`\`

## Dispersion
\`\`\`
        min    Q1   median   Q3    max
         |-----|-----|-----|-----|
         |<- IQR ->|
         |<-------- range -------->|
\`\`\`

- **Variance**: σ² = Σ(x - μ)² / n
- **Std Dev**: σ = √Variance (same units as data)
- **IQR**: Q3 - Q1 (spread of middle 50%)

## Percentiles
\`\`\`python
import numpy as np
np.percentile(data, [25, 50, 75])  # Q1, median, Q3
\`\`\``,

  "t4-probability": `# Probability Theory

## Axioms
- 0 ≤ P(A) ≤ 1
- P(S) = 1 (sample space)
- P(A ∪ B) = P(A) + P(B) - P(A ∩ B)

## Conditional Probability
\`\`\`
P(A|B) = P(A ∩ B) / P(B)
"Probability of A given B"
\`\`\`

## Venn Diagram
\`\`\`
    ┌─────────────────┐
    │   A ∩ B         │
    │  ┌───┐          │
    │  │   │  B       │
    │  │ A │          │
    │  └───┘          │
    └─────────────────┘
\`\`\`

## Independence
A and B independent ⟺ P(A ∩ B) = P(A) × P(B)
⟺ P(A|B) = P(A)
\`\`\``,

  "t4-bayes": `# Bayes Theorem

## Formula
\`\`\`
         P(B|A) × P(A)
P(A|B) = ─────────────
              P(B)

Posterior = (Likelihood × Prior) / Evidence
\`\`\`

## Flow
\`\`\`
Prior P(A)  →  Observe B  →  Update  →  Posterior P(A|B)
     │              │            │
     └──────────────┴────────────┘
     Bayes combines prior belief with new evidence
\`\`\`

## Example: Spam Filter
- P(Spam) = 0.3 (prior)
- P("winner"|Spam) = 0.1, P("winner"|Not Spam) = 0.01
- P(Spam|"winner") = ?
\`\`\``,

  "t4-distributions": `# Distributions

## Normal (Gaussian)
\`\`\`
        μ-2σ  μ-σ   μ   μ+σ  μ+2σ
          |    |    |    |    |
    ___/‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\\___
          68% within 1σ
          95% within 2σ
\`\`\`

## Correlation
\`\`\`
r = +1: perfect positive (line up)
r = 0:  no linear relationship
r = -1: perfect negative
\`\`\`

## Correlation ≠ Causation
X and Y correlated can mean: X→Y, Y→X, or Z→both.
\`\`\``,

  "t4-hypothesis": `# Hypothesis Testing

## Flow
\`\`\`
H₀ (null)     H₁ (alternative)     α = 0.05
    │                │
    └───────┬────────┘
            │
    Collect data → Test statistic → p-value
            │
    p < α? → Reject H₀ (significant)
    p ≥ α? → Fail to reject (not significant)
\`\`\`

## p-value
Probability of observing data (or more extreme) if H₀ is true. Small p → evidence against H₀.

## Common Tests
| Test | Use |
|------|-----|
| t-test | Compare means (2 groups) |
| chi-square | Categorical association |
| ANOVA | Compare 3+ means |
| z-test | Large sample, known σ |
\`\`\``,

  "t4-ab": `# A/B Testing

## Setup
\`\`\`
Users → Random split → Group A (control)  → Metric A
                    → Group B (variant)  → Metric B
                              │
                    Statistical test: A vs B
\`\`\`

## Key Steps
1. **Metric**: Conversion rate, CTR, revenue
2. **Sample size**: Power analysis
3. **Randomization**: Avoid bias
4. **Test**: t-test, z-test, chi-square
5. **Decision**: p < α → B wins
\`\`\``,

  "t4-confidence": `# Confidence Intervals

## Interpretation
95% CI: If we repeated the experiment many times, 95% of CIs would contain the true parameter.

## Formula (mean, known σ)
\`\`\`
CI = x̄ ± z × (σ/√n)
z = 1.96 for 95%
\`\`\`

## Formula (mean, unknown σ)
\`\`\`
CI = x̄ ± t × (s/√n)
t from t-distribution (df = n-1)
\`\`\`

## Width
Larger n → narrower CI. Higher confidence → wider CI.
\`\`\``,

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 5: Graph Theory
  // ═══════════════════════════════════════════════════════════════

  "t5-representations": `# Graph Representations

## Adjacency List
\`\`\`python
graph = {0: [1, 2], 1: [0, 3], 2: [0], 3: [1]}
\`\`\`

## Adjacency Matrix
2D array where A[i][j] = 1 if edge exists.

## When to Use
- Sparse: adjacency list
- Dense: adjacency matrix
- Fast neighbor lookup: list
\`\`\``,

  "t5-bfs-dfs": `# BFS & DFS

## BFS (Breadth-First)
Queue. Level-order. Shortest path in unweighted graph.

## DFS (Depth-First)
Stack/recursion. Explores deep before wide. Cycle detection, topological sort.

## Implementation
\`\`\`python
from collections import deque
def bfs(graph, start):
    visited = set()
    q = deque([start])
    while q:
        node = q.popleft()
        if node in visited: continue
        visited.add(node)
        for n in graph[node]:
            q.append(n)
\`\`\``,

  "t5-dijkstra": `# Shortest Path (Dijkstra)

## Algorithm
1. Start at source, distance 0
2. Pick unvisited node with min distance
3. Update neighbors
4. Repeat until destination reached

## Use Case
Weighted graphs, non-negative weights. O((V+E) log V) with heap.
\`\`\``,

  "t5-network": `# Network Analysis

## Metrics
- Degree: number of connections
- Centrality: importance of node
- Clustering: how connected neighbors are

## Applications
Social networks, fraud detection, recommendation systems.
\`\`\``,

  "t5-pagerank": `# PageRank Concept

## Idea
A page is important if important pages link to it.

## Algorithm
Iteratively assign scores. Each page distributes its score to its outlinks. Converges to steady state.
\`\`\``,

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 6: Machine Learning
  // ═══════════════════════════════════════════════════════════════

  "t6-linear": `# Linear Regression

## Formula
y = β₀ + β₁x₁ + ... + βₙxₙ

Finds best-fit line (or hyperplane) by minimizing RSS (residual sum of squares).

## Slope and Intercept
- Slope: rate of change
- Intercept: value when x=0

## Implementation
\`\`\`python
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X, y)
predictions = model.predict(X_test)
\`\`\`

## Metrics
R², MSE, MAE, RMSE
\`\`\``,

  "t6-logistic": `# Logistic Regression

## Use Case
Binary classification. Outputs probability (0-1).

## Formula
P(y=1) = 1 / (1 + e^(-z)) where z = β₀ + β₁x₁ + ...

## Implementation
\`\`\`python
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X, y)
probs = model.predict_proba(X_test)
\`\`\``,

  "t6-knn": `# KNN (K-Nearest Neighbors)

## Idea
Classify by majority vote of k nearest neighbors.

## Steps
1. Choose k
2. Find k nearest neighbors (by distance)
3. Vote for class (or average for regression)

## Pros/Cons
Simple, no training. Slow at prediction, sensitive to scale.
\`\`\``,

  "t6-trees": `# Decision Trees

## Structure
Recursive splits. Each node: split on feature. Leaves: class label.

## Split Criteria
- Gini impurity
- Entropy / Information gain

## Pros/Cons
Interpretable, handles non-linearity. Prone to overfitting.
\`\`\``,

  "t6-forest": `# Random Forest

## Idea
Ensemble of decision trees. Each tree on bootstrap sample. Vote for classification, average for regression.

## Benefits
Reduces overfitting. Handles missing values. Feature importance.
\`\`\`python
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
\`\`\``,

  "t6-metrics": `# Evaluation Metrics

## Classification
- Accuracy: (TP+TN) / total
- Precision: TP / (TP+FP)
- Recall: TP / (TP+FN)
- F1: 2 × Precision × Recall / (Precision + Recall)
- AUC-ROC: area under ROC curve

## Regression
- MSE, MAE, RMSE
- R²: variance explained
\`\`\``,

  "t6-kmeans": `# K-Means

## Algorithm
1. Pick k centroids
2. Assign points to nearest centroid
3. Update centroids as mean of assigned points
4. Repeat until stable

## Unsupervised
No labels. Clustering by similarity.
\`\`\`python
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)
labels = kmeans.fit_predict(X)
\`\`\``,

  "t6-pca": `# PCA (Principal Component Analysis)

## Purpose
Dimensionality reduction. Find directions of max variance.

## Steps
1. Center data
2. Compute covariance matrix
3. Eigenvalues/eigenvectors
4. Project onto top k components

## Use
Visualization, noise reduction, faster training.
\`\`\``,

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 7: Advanced ML
  // ═══════════════════════════════════════════════════════════════

  "t7-feature-eng": `# Feature Engineering

## Creating Features
- Binning: convert continuous to categorical
- Polynomial: x², x³
- One-hot: categorical to binary columns
- Binning time: hour, day, month

## Domain Knowledge
Use business understanding to create meaningful features.
\`\`\``,

  "t7-feature-sel": `# Feature Selection

## Methods
- Filter: correlation, mutual info
- Wrapper: forward/backward selection
- Embedded: Lasso, tree importance

## Why
Reduce overfitting, faster training, interpretability.
\`\`\``,

  "t7-pipelines": `# Pipelines & GridSearchCV

## Pipeline
\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("model", LogisticRegression())
])
\`\`\`

## GridSearchCV
\`\`\`python
from sklearn.model_selection import GridSearchCV
param_grid = {"model__C": [0.1, 1, 10]}
grid = GridSearchCV(pipe, param_grid, cv=5)
grid.fit(X, y)
\`\`\``,

  "t7-imbalanced": `# Handling Imbalanced Data

## Techniques
- Oversampling: SMOTE, random oversample
- Undersampling: random undersample
- Class weights: higher weight for minority
- Threshold tuning: change decision threshold

## Metrics
Use precision, recall, F1, AUC-ROC instead of accuracy.
\`\`\``,

  "t7-deep": `# Intro to Deep Learning

## Neural Networks
Layers of neurons. Each neuron: weighted sum + activation.

## Common Architectures
- MLP: feedforward
- CNN: images
- RNN: sequences

## Frameworks
TensorFlow, PyTorch
\`\`\``,

  "t7-nlp": `# Basic NLP

## Tasks
- Tokenization
- Text classification
- Sentiment analysis
- Named entity recognition

## Common Approaches
- Bag of words
- TF-IDF
- Word embeddings
\`\`\``,

  "t7-deployment": `# Deployment Intro (API)

## API Idea
Expose model as REST API. Client sends features, returns prediction.

## Example Flow
1. Train model, save (pickle, joblib)
2. Load in API server
3. Endpoint: POST /predict with JSON body
4. Return prediction

## Tools
Flask, FastAPI, Docker
\`\`\``,

  // ═══════════════════════════════════════════════════════════════
  // LEVEL 8: Capstone
  // ═══════════════════════════════════════════════════════════════

  "t8-capstone-fraud": `# Capstone: Fraud Detection

## Business Problem
Detect fraudulent transactions in real time. Minimize false negatives (missed fraud) while keeping false positives low.

## Approach
- EDA on transaction features
- Feature engineering (time, amount, velocity)
- Train supervised models (Logistic, Random Forest)
- Evaluate with precision, recall, F1
- Consider class imbalance
\`\`\``,

  "t8-capstone-churn": `# Capstone: Customer Churn

## Business Problem
Predict which customers will leave. Use churn data to target retention campaigns.

## Approach
- Clean customer data
- Handle churn imbalance (SMOTE, weights)
- Build classifier (AUC-ROC target > 0.75)
- Feature importance for business insights
- Actionable recommendations
\`\`\``,

  "t8-capstone-recommend": `# Capstone: Recommendation Engine

## Business Problem
Recommend products or content to users.

## Approaches
- Collaborative filtering: user-item matrix
- Content-based: item features
- Hybrid

## Evaluation
RMSE, MAE for ratings. Precision@k, Recall@k for top-k.
\`\`\``,

  "t8-cert-exam": `# Final Certification Exam

## Structure
- Proctored exam
- Multiple choice + coding
- Covers all 8 levels
- Time limit

## Passing Score
Minimum threshold. Certificate and digital badge on completion.
\`\`\``,
};
