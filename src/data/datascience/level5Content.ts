/**
 * LEVEL 5: Graph Theory for Data Science
 * Topics: Representations, BFS/DFS, Dijkstra, Network Analysis, PageRank, Graph Clustering
 */

import type { CodingExercise, Mcq } from "./schema";
import type { MiniAssignment } from "./level1ContentExtended";

// ─── TOPIC 1: Graph Representations ──────────────────────────────────────
export const LEVEL5_T1_EXERCISES: CodingExercise[] = [
  { id: "l5-t1-e1", topicId: "t5-representations", title: "Adjacency List", description: "Given edges as list of [u,v], return adjacency list dict.", difficulty: "easy", type: "short", boilerplate: { python: "def edges_to_adj(edges):\n    adj = {}\n    for u, v in edges:\n        if u not in adj: adj[u] = []\n        adj[u].append(v)\n        if v not in adj: adj[v] = []\n        adj[v].append(u)\n    return adj" }, testCases: [{ input: "[[0,1],[0,2],[1,2]]", expectedOutput: { 0: [1, 2], 1: [0, 2], 2: [0, 1] } }], hints: [] },
  { id: "l5-t1-e2", topicId: "t5-representations", title: "Adjacency Matrix", description: "Given n nodes and edges, return n×n adjacency matrix.", difficulty: "easy", type: "short", boilerplate: { python: "def edges_to_matrix(n, edges):\n    m = [[0]*n for _ in range(n)]\n    for u, v in edges:\n        m[u][v] = 1\n        m[v][u] = 1\n    return m" }, testCases: [{ input: "3, [[0,1],[1,2]]", expectedOutput: [[0, 1, 0], [1, 0, 1], [0, 1, 0]] }], hints: [] },
  { id: "l5-t1-e3", topicId: "t5-representations", title: "Count Edges", description: "Return number of edges from adjacency list.", difficulty: "easy", type: "short", boilerplate: { python: "def count_edges(adj):\n    return sum(len(neighbors) for neighbors in adj.values()) // 2" }, testCases: [{ input: "{0:[1,2],1:[0],2:[0]}", expectedOutput: 2 }], hints: [] },
  { id: "l5-t1-m1", topicId: "t5-representations", title: "List to Matrix", description: "Convert adjacency list to adjacency matrix.", difficulty: "medium", type: "medium", boilerplate: { python: "def adj_to_matrix(adj):\n    n = max(adj.keys()) + 1 if adj else 0\n    m = [[0]*n for _ in range(n)]\n    for u, neighbors in adj.items():\n        for v in neighbors:\n            m[u][v] = 1\n    return m" }, testCases: [{ input: "{0:[1],1:[0,2],2:[1]}", expectedOutput: [[0, 1, 0], [1, 0, 1], [0, 1, 0]] }], hints: [] },
];

export const LEVEL5_T1_MCQS: Mcq[] = [
  { id: "l5-t1-q1", topicId: "t5-representations", question: "Adjacency list is preferred when?", options: [{ id: "a", text: "Graph is dense", isCorrect: false }, { id: "b", text: "Graph is sparse", isCorrect: true, explanation: "Sparse graphs have few edges" }, { id: "c", text: "Need O(1) edge lookup", isCorrect: false }, { id: "d", text: "Graph is directed only", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l5-t1-q2", topicId: "t5-representations", question: "Adjacency matrix space complexity for n nodes?", options: [{ id: "a", text: "O(n)", isCorrect: false }, { id: "b", text: "O(n²)", isCorrect: true, explanation: "n×n matrix" }, { id: "c", text: "O(E)", isCorrect: false }, { id: "d", text: "O(n log n)", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL5_T1_ASSIGN: MiniAssignment = {
  id: "l5-t1-assign", topicId: "t5-representations", title: "Graph Representation Converter",
  description: "Implement: (1) Convert weighted edges to adjacency list with weights. (2) Convert directed graph to adjacency matrix. (3) Compute in-degree and out-degree for directed graph.",
  rubric: [{ criterion: "Weighted adj list", points: 35 }, { criterion: "Directed matrix", points: 35 }, { criterion: "Degree computation", points: 30 }],
};

// ─── TOPIC 2: BFS & DFS ───────────────────────────────────────────────────
export const LEVEL5_T2_EXERCISES: CodingExercise[] = [
  { id: "l5-t2-e1", topicId: "t5-bfs-dfs", title: "BFS Order", description: "Return list of nodes in BFS order from start.", difficulty: "easy", type: "short", boilerplate: { python: "def bfs_order(adj, start):\n    from collections import deque\n    visited, q, out = set(), deque([start]), []\n    while q:\n        u = q.popleft()\n        if u in visited: continue\n        visited.add(u); out.append(u)\n        for v in adj.get(u, []):\n            if v not in visited: q.append(v)\n    return out" }, testCases: [{ input: "{0:[1,2],1:[0,3],2:[0],3:[1]}, 0", expectedOutput: [0, 1, 2, 3] }], hints: [] },
  { id: "l5-t2-e2", topicId: "t5-bfs-dfs", title: "DFS Order", description: "Return list of nodes in DFS order from start.", difficulty: "easy", type: "short", boilerplate: { python: "def dfs_order(adj, start):\n    visited, out = set(), []\n    def dfs(u):\n        if u in visited: return\n        visited.add(u); out.append(u)\n        for v in adj.get(u, []): dfs(v)\n    dfs(start)\n    return out" }, testCases: [{ input: "{0:[1,2],1:[3],2:[],3:[]}, 0", expectedOutput: [0, 1, 3, 2] }], hints: [] },
  { id: "l5-t2-e3", topicId: "t5-bfs-dfs", title: "Connected Components", description: "Return number of connected components.", difficulty: "medium", type: "medium", boilerplate: { python: "def num_components(adj):\n    visited = set()\n    def dfs(u):\n        visited.add(u)\n        for v in adj.get(u, []):\n            if v not in visited: dfs(v)\n    count = 0\n    for u in adj:\n        if u not in visited: dfs(u); count += 1\n    return count" }, testCases: [{ input: "{0:[1],1:[0],2:[3],3:[2]}", expectedOutput: 2 }], hints: [] },
  { id: "l5-t2-e4", topicId: "t5-bfs-dfs", title: "Shortest Path Length", description: "Return shortest path length from start to end (unweighted). -1 if unreachable.", difficulty: "medium", type: "medium", boilerplate: { python: "def shortest_path(adj, start, end):\n    from collections import deque\n    if start == end: return 0\n    q, dist = deque([start]), {start: 0}\n    while q:\n        u = q.popleft()\n        for v in adj.get(u, []):\n            if v not in dist: dist[v] = dist[u] + 1; q.append(v)\n            if v == end: return dist[v]\n    return -1" }, testCases: [{ input: "{0:[1,2],1:[0,3],2:[0],3:[1]}, 0, 3", expectedOutput: 2 }], hints: [] },
];

export const LEVEL5_T2_MCQS: Mcq[] = [
  { id: "l5-t2-q1", topicId: "t5-bfs-dfs", question: "BFS uses which data structure?", options: [{ id: "a", text: "Stack", isCorrect: false }, { id: "b", text: "Queue", isCorrect: true, explanation: "FIFO for level-order" }, { id: "c", text: "Heap", isCorrect: false }, { id: "d", text: "Set", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l5-t2-q2", topicId: "t5-bfs-dfs", question: "DFS gives shortest path in unweighted graph?", options: [{ id: "a", text: "Yes, always", isCorrect: false }, { id: "b", text: "No, BFS does", isCorrect: true, explanation: "BFS explores by levels" }, { id: "c", text: "Both do", isCorrect: false }, { id: "d", text: "Neither", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL5_T2_ASSIGN: MiniAssignment = {
  id: "l5-t2-assign", topicId: "t5-bfs-dfs", title: "Graph Traversal Analysis",
  description: "Implement: (1) BFS that returns distance from start to every node. (2) DFS that detects cycles. (3) Find all nodes reachable from start in directed graph.",
  rubric: [{ criterion: "BFS distances", points: 35 }, { criterion: "Cycle detection", points: 35 }, { criterion: "Reachable nodes", points: 30 }],
};

// ─── TOPIC 3: Dijkstra ────────────────────────────────────────────────────
export const LEVEL5_T3_EXERCISES: CodingExercise[] = [
  { id: "l5-t3-e1", topicId: "t5-dijkstra", title: "Dijkstra Distances", description: "Given adj as {u: [(v, w), ...]}, return shortest distances from start to all nodes.", difficulty: "medium", type: "medium", boilerplate: { python: "import heapq\ndef dijkstra(adj, start):\n    dist = {start: 0}\n    pq = [(0, start)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist.get(u, float('inf')): continue\n        for v, w in adj.get(u, []):\n            nd = d + w\n            if nd < dist.get(v, float('inf')): dist[v] = nd; heapq.heappush(pq, (nd, v))\n    return dist" }, testCases: [{ input: "{0:[(1,1),(2,4)],1:[(2,2)],2:[]}, 0", expectedOutput: { 0: 0, 1: 1, 2: 3 } }], hints: [] },
  { id: "l5-t3-e2", topicId: "t5-dijkstra", title: "Shortest Path Cost", description: "Return shortest path cost from start to end. Infinity if unreachable.", difficulty: "medium", type: "medium", boilerplate: { python: "import heapq\ndef dijkstra_cost(adj, start, end):\n    dist = {start: 0}\n    pq = [(0, start)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if u == end: return d\n        if d > dist.get(u, float('inf')): continue\n        for v, w in adj.get(u, []):\n            nd = d + w\n            if nd < dist.get(v, float('inf')): dist[v] = nd; heapq.heappush(pq, (nd, v))\n    return float('inf')" }, testCases: [{ input: "{0:[(1,2),(2,5)],1:[(2,1)],2:[]}, 0, 2", expectedOutput: 3 }], hints: [] },
  { id: "l5-t3-e3", topicId: "t5-dijkstra", title: "Unweighted Dijkstra", description: "For unweighted graph (all edges weight 1), return distances.", difficulty: "easy", type: "short", boilerplate: { python: "def unweighted_dist(adj, start):\n    from collections import deque\n    dist = {start: 0}\n    q = deque([start])\n    while q:\n        u = q.popleft()\n        for v in adj.get(u, []):\n            if v not in dist: dist[v] = dist[u] + 1; q.append(v)\n    return dist" }, testCases: [{ input: "{0:[1,2],1:[0,3],2:[0],3:[1]}, 0", expectedOutput: { 0: 0, 1: 1, 2: 1, 3: 2 } }], hints: [] },
];

export const LEVEL5_T3_MCQS: Mcq[] = [
  { id: "l5-t3-q1", topicId: "t5-dijkstra", question: "Dijkstra works with negative weights?", options: [{ id: "a", text: "Yes", isCorrect: false }, { id: "b", text: "No", isCorrect: true, explanation: "Requires non-negative weights" }, { id: "c", text: "Only in directed graphs", isCorrect: false }, { id: "d", text: "Only for small graphs", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l5-t3-q2", topicId: "t5-dijkstra", question: "Dijkstra uses which data structure for efficiency?", options: [{ id: "a", text: "Queue", isCorrect: false }, { id: "b", text: "Min-heap / Priority queue", isCorrect: true, explanation: "Extract minimum distance" }, { id: "c", text: "Stack", isCorrect: false }, { id: "d", text: "Array", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL5_T3_ASSIGN: MiniAssignment = {
  id: "l5-t3-assign", topicId: "t5-dijkstra", title: "Shortest Path Implementation",
  description: "Implement Dijkstra from scratch: (1) Return distances to all nodes. (2) Return actual path (list of nodes) from start to end. (3) Handle disconnected graph.",
  rubric: [{ criterion: "Distances", points: 40 }, { criterion: "Path reconstruction", points: 40 }, { criterion: "Edge cases", points: 20 }],
};

// ─── TOPIC 4: Network Analysis ─────────────────────────────────────────────
export const LEVEL5_T4_EXERCISES: CodingExercise[] = [
  { id: "l5-t4-e1", topicId: "t5-network", title: "Degree Centrality", description: "Return dict of node -> degree (number of neighbors).", difficulty: "easy", type: "short", boilerplate: { python: "def degree_centrality(adj):\n    return {u: len(neighbors) for u, neighbors in adj.items()}" }, testCases: [{ input: "{0:[1,2],1:[0],2:[0]}", expectedOutput: { 0: 2, 1: 1, 2: 1 } }], hints: [] },
  { id: "l5-t4-e2", topicId: "t5-network", title: "Max Degree Node", description: "Return node with highest degree.", difficulty: "easy", type: "short", boilerplate: { python: "def max_degree_node(adj):\n    return max(adj.keys(), key=lambda u: len(adj[u])) if adj else None" }, testCases: [{ input: "{0:[1,2,3],1:[0],2:[0],3:[0]}", expectedOutput: 0 }], hints: [] },
  { id: "l5-t4-e3", topicId: "t5-network", title: "Average Degree", description: "Return average degree of all nodes.", difficulty: "easy", type: "short", boilerplate: { python: "def avg_degree(adj):\n    if not adj: return 0\n    return sum(len(n) for n in adj.values()) / len(adj)" }, testCases: [{ input: "{0:[1,2],1:[0],2:[0]}", expectedOutput: 1.3333333333333333 }], hints: [] },
];

export const LEVEL5_T4_MCQS: Mcq[] = [
  { id: "l5-t4-q1", topicId: "t5-network", question: "Degree centrality measures?", options: [{ id: "a", text: "Shortest path", isCorrect: false }, { id: "b", text: "Number of connections", isCorrect: true, explanation: "Local connectivity" }, { id: "c", text: "Betweenness", isCorrect: false }, { id: "d", text: "Clustering coefficient", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l5-t4-q2", topicId: "t5-network", question: "Network analysis is used in?", options: [{ id: "a", text: "Social networks, fraud detection", isCorrect: true, explanation: "Graph-based analysis" }, { id: "b", text: "Image classification only", isCorrect: false }, { id: "c", text: "Time series only", isCorrect: false }, { id: "d", text: "NLP only", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL5_T4_ASSIGN: MiniAssignment = {
  id: "l5-t4-assign", topicId: "t5-network", title: "Network Metrics",
  description: "Implement: (1) Degree distribution (histogram of degrees). (2) Identify hub nodes (degree > threshold). (3) Compute density: 2*|E| / (n*(n-1)) for undirected.",
  rubric: [{ criterion: "Degree distribution", points: 35 }, { criterion: "Hub detection", points: 35 }, { criterion: "Density", points: 30 }],
};

// ─── TOPIC 5: PageRank ────────────────────────────────────────────────────
export const LEVEL5_T5_EXERCISES: CodingExercise[] = [
  { id: "l5-t5-e1", topicId: "t5-pagerank", title: "Outgoing Links", description: "Return dict of node -> list of nodes it links to (outlinks).", difficulty: "easy", type: "short", boilerplate: { python: "def get_outlinks(adj):\n    return {u: list(neighbors) for u, neighbors in adj.items()}" }, testCases: [{ input: "{0:[1,2],1:[0],2:[]}", expectedOutput: { 0: [1, 2], 1: [0], 2: [] } }], hints: [] },
  { id: "l5-t5-e2", topicId: "t5-pagerank", title: "PageRank One Step", description: "Given scores dict and outlinks, return new scores: each node distributes its score equally to outlinks.", difficulty: "medium", type: "medium", boilerplate: { python: "def pagerank_step(scores, outlinks):\n    new_scores = {u: 0 for u in scores}\n    for u, score in scores.items():\n        targets = outlinks.get(u, [])\n        if targets:\n            for v in targets: new_scores[v] += score / len(targets)\n        else:\n            for v in new_scores: new_scores[v] += score / len(new_scores)\n    return new_scores" }, testCases: [{ input: "{0:1,1:0,2:0}, {0:[1,2],1:[],2:[]}", expectedOutput: { 0: 0, 1: 0.5, 2: 0.5 } }], hints: [] },
];

export const LEVEL5_T5_MCQS: Mcq[] = [
  { id: "l5-t5-q1", topicId: "t5-pagerank", question: "PageRank idea: a page is important if?", options: [{ id: "a", text: "It has many outgoing links", isCorrect: false }, { id: "b", text: "Important pages link to it", isCorrect: true, explanation: "Recursive importance" }, { id: "c", text: "It is old", isCorrect: false }, { id: "d", text: "It has few links", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l5-t5-q2", topicId: "t5-pagerank", question: "PageRank uses?", options: [{ id: "a", text: "Single iteration", isCorrect: false }, { id: "b", text: "Iterative convergence", isCorrect: true, explanation: "Until steady state" }, { id: "c", text: "One-shot computation", isCorrect: false }, { id: "d", text: "Random sampling", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL5_T5_ASSIGN: MiniAssignment = {
  id: "l5-t5-assign", topicId: "t5-pagerank", title: "PageRank Implementation",
  description: "Implement simplified PageRank: (1) Initialize equal scores. (2) Iterate until convergence (max 100 steps, tolerance 1e-6). (3) Handle dangling nodes (no outlinks).",
  rubric: [{ criterion: "Initialization", points: 20 }, { criterion: "Iteration", points: 50 }, { criterion: "Dangling nodes", points: 30 }],
};

// ─── TOPIC 6: Graph Clustering ─────────────────────────────────────────────
export const LEVEL5_T6_EXERCISES: CodingExercise[] = [
  { id: "l5-t6-e1", topicId: "t5-clustering", title: "Local Clustering", description: "For node u, clustering = 2*edges among neighbors / (k*(k-1)). Return clustering coefficient for node.", difficulty: "medium", type: "medium", boilerplate: { python: "def clustering_coef(adj, u):\n    neighbors = adj.get(u, [])\n    k = len(neighbors)\n    if k < 2: return 0\n    edges = sum(1 for a in neighbors for b in neighbors if a < b and b in adj.get(a, []))\n    return 2 * edges / (k * (k - 1))" }, testCases: [{ input: "{0:[1,2],1:[0,2],2:[0,1]}, 0", expectedOutput: 1 }], hints: [] },
  { id: "l5-t6-e2", topicId: "t5-clustering", title: "Triangle Count", description: "Return number of triangles (3-cliques) in graph.", difficulty: "medium", type: "medium", boilerplate: { python: "def count_triangles(adj):\n    count = 0\n    for u in adj:\n        for v in adj[u]:\n            if v > u:\n                for w in adj.get(v, []):\n                    if w > v and w in adj.get(u, []): count += 1\n    return count" }, testCases: [{ input: "{0:[1,2],1:[0,2],2:[0,1]}", expectedOutput: 1 }], hints: [] },
  { id: "l5-t6-e3", topicId: "t5-clustering", title: "Dense Subgraph", description: "Return nodes with degree >= threshold.", difficulty: "easy", type: "short", boilerplate: { python: "def dense_nodes(adj, threshold):\n    return [u for u, n in adj.items() if len(n) >= threshold]" }, testCases: [{ input: "{0:[1,2,3],1:[0],2:[0],3:[0]}, 2", expectedOutput: [0] }], hints: [] },
];

export const LEVEL5_T6_MCQS: Mcq[] = [
  { id: "l5-t6-q1", topicId: "t5-clustering", question: "Clustering coefficient measures?", options: [{ id: "a", text: "How connected a node's neighbors are", isCorrect: true, explanation: "Local density" }, { id: "b", text: "Global graph density", isCorrect: false }, { id: "c", text: "Path length", isCorrect: false }, { id: "d", text: "Node degree", isCorrect: false }], difficulty: "easy", type: "basic" },
  { id: "l5-t6-q2", topicId: "t5-clustering", question: "Graph clustering helps find?", options: [{ id: "a", text: "Shortest paths", isCorrect: false }, { id: "b", text: "Communities / modules", isCorrect: true, explanation: "Densely connected groups" }, { id: "c", text: "PageRank scores", isCorrect: false }, { id: "d", text: "Minimum spanning tree", isCorrect: false }], difficulty: "easy", type: "basic" },
];

export const LEVEL5_T6_ASSIGN: MiniAssignment = {
  id: "l5-t6-assign", topicId: "t5-clustering", title: "Community Detection",
  description: "Implement: (1) Average clustering coefficient for graph. (2) Find connected components as 'communities'. (3) Label each node with its component id.",
  rubric: [{ criterion: "Avg clustering", points: 35 }, { criterion: "Components as communities", points: 35 }, { criterion: "Node labeling", points: 30 }],
};

// ─── Combined exports ────────────────────────────────────────────────────
export const LEVEL5_ALL_EXERCISES: CodingExercise[] = [
  ...LEVEL5_T1_EXERCISES,
  ...LEVEL5_T2_EXERCISES,
  ...LEVEL5_T3_EXERCISES,
  ...LEVEL5_T4_EXERCISES,
  ...LEVEL5_T5_EXERCISES,
  ...LEVEL5_T6_EXERCISES,
];

export const LEVEL5_ALL_MCQS: Mcq[] = [
  ...LEVEL5_T1_MCQS,
  ...LEVEL5_T2_MCQS,
  ...LEVEL5_T3_MCQS,
  ...LEVEL5_T4_MCQS,
  ...LEVEL5_T5_MCQS,
  ...LEVEL5_T6_MCQS,
];

export const LEVEL5_ALL_ASSIGNMENTS: Record<string, MiniAssignment> = {
  "t5-representations": LEVEL5_T1_ASSIGN,
  "t5-bfs-dfs": LEVEL5_T2_ASSIGN,
  "t5-dijkstra": LEVEL5_T3_ASSIGN,
  "t5-network": LEVEL5_T4_ASSIGN,
  "t5-pagerank": LEVEL5_T5_ASSIGN,
  "t5-clustering": LEVEL5_T6_ASSIGN,
};
