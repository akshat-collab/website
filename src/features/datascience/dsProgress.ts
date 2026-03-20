/**
 * Data Science Track - Progress computation & badge logic
 */

import { DS_COURSE_OUTLINE } from "@/data/datascience";
import {
  getCompletedTopics,
  getMcqAttempts,
  getEarnedBadges,
  awardBadge,
  hasViewedConcept,
  isExerciseComplete,
  isAssignmentSubmitted,
  isTopicComplete,
} from "./dsStorage";
import { DS_ALL_EXERCISES, DS_ALL_MCQS } from "@/data/datascience";

function getExercisesForTopic(topicId: string): string[] {
  return DS_ALL_EXERCISES.filter((e) => e.topicId === topicId).map((e) => e.id);
}

function getMcqIdsForTopic(topicId: string): string[] {
  return DS_ALL_MCQS.filter((m) => m.topicId === topicId).map((m) => m.id);
}

const TOPIC_ASSIGNMENTS: Record<string, string> = {
  "t1-variables": "l1-t1-assign",
  "t1-control": "l1-t2-assign",
  "t1-loops": "l1-t3-assign",
  "t1-functions": "l1-t4-assign",
  "t1-collections": "l1-t5-assign",
  "t1-oop": "l1-t6-assign",
  "t1-files": "l1-t7-assign",
  "t1-exceptions": "l1-t8-assign",
  "t2-comprehensions": "l2-t1-assign",
  "t2-lambda": "l2-t2-assign",
  "t2-decorators": "l2-t3-assign",
  "t2-generators": "l2-t4-assign",
  "t2-venv": "l2-t5-assign",
  "t2-complexity": "l2-t6-assign",
  "t3-numpy": "l3-t1-assign",
  "t3-pandas": "l3-t2-assign",
  "t3-cleaning": "l3-t3-assign",
  "t3-feature-scale": "l3-t4-assign",
  "t3-groupby": "l3-t5-assign",
  "t3-joins": "l3-t6-assign",
  "t3-timeseries": "l3-t7-assign",
  "t3-matplotlib": "l3-t8-assign",
  "t3-seaborn": "l3-t9-assign",
  "t4-descriptive": "l4-t1-assign",
  "t4-probability": "l4-t2-assign",
  "t4-bayes": "l4-t3-assign",
  "t4-distributions": "l4-t4-assign",
  "t4-hypothesis": "l4-t5-assign",
  "t4-ab": "l4-t6-assign",
  "t4-confidence": "l4-t7-assign",
  "t5-representations": "l5-t1-assign",
  "t5-bfs-dfs": "l5-t2-assign",
  "t5-dijkstra": "l5-t3-assign",
  "t5-network": "l5-t4-assign",
  "t5-pagerank": "l5-t5-assign",
  "t5-clustering": "l5-t6-assign",
  "t6-linear": "l6-t1-assign",
  "t6-logistic": "l6-t2-assign",
  "t6-knn": "l6-t3-assign",
  "t6-trees": "l6-t4-assign",
  "t6-forest": "l6-t5-assign",
  "t6-metrics": "l6-t6-assign",
  "t6-kmeans": "l6-t7-assign",
  "t6-hierarchical": "l6-t8-assign",
  "t6-pca": "l6-t9-assign",
  "t7-feature-eng": "l7-t1-assign",
  "t7-feature-sel": "l7-t2-assign",
  "t7-pipelines": "l7-t3-assign",
  "t7-imbalanced": "l7-t4-assign",
  "t7-deep": "l7-t5-assign",
  "t7-nlp": "l7-t6-assign",
  "t7-deployment": "l7-t7-assign",
};

export function getTopicProgress(topicId: string): {
  conceptViewed: boolean;
  exercisesCompleted: number;
  exercisesTotal: number;
  mcqsCorrect: number;
  mcqsTotal: number;
  assignmentSubmitted: boolean;
  canMarkComplete: boolean;
  isComplete: boolean;
} {
  const exercises = getExercisesForTopic(topicId);
  const mcqIds = getMcqIdsForTopic(topicId);
  const assignmentId = TOPIC_ASSIGNMENTS[topicId];

  const exercisesCompleted = exercises.filter((id) => isExerciseComplete(id)).length;
  const mcqAttempts = getMcqAttempts();
  const mcqsCorrect = mcqIds.filter((id) => mcqAttempts.find((a) => a.mcqId === id)?.correct).length;
  const conceptViewed = hasViewedConcept(topicId);
  const assignmentSubmitted = assignmentId ? isAssignmentSubmitted(assignmentId) : true;

  const exercisesTotal = exercises.length;
  const mcqsTotal = mcqIds.length;
  const hasAssignment = Boolean(assignmentId);

  const canMarkComplete =
    conceptViewed &&
    exercisesCompleted >= exercisesTotal &&
    mcqsCorrect >= Math.ceil(mcqsTotal * 0.6) &&
    (hasAssignment ? assignmentSubmitted : true);

  return {
    conceptViewed,
    exercisesCompleted,
    exercisesTotal,
    mcqsCorrect,
    mcqsTotal,
    assignmentSubmitted: hasAssignment ? assignmentSubmitted : true,
    canMarkComplete,
    isComplete: isTopicComplete(topicId),
  };
}

export function getLevelProgress(levelId: string): {
  completed: number;
  total: number;
  percent: number;
} {
  const level = DS_COURSE_OUTLINE.levels.find((l) => l.id === levelId);
  if (!level) return { completed: 0, total: 0, percent: 0 };

  const completed = level.topics.filter((t) => isTopicComplete(t.id)).length;

  return {
    completed,
    total: level.topics.length,
    percent: level.topics.length ? Math.round((completed / level.topics.length) * 100) : 0,
  };
}

export function getOverallProgress(): {
  completedTopics: number;
  totalTopics: number;
  percent: number;
  earnedBadges: string[];
} {
  let totalTopics = 0;
  let completedTopics = 0;

  for (const level of DS_COURSE_OUTLINE.levels) {
    for (const topic of level.topics) {
      totalTopics++;
      if (isTopicComplete(topic.id)) completedTopics++;
    }
  }

  checkAndAwardBadges();

  return {
    completedTopics,
    totalTopics,
    percent: totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0,
    earnedBadges: getEarnedBadges(),
  };
}

export function getResumeTopic(): { levelOrder: number; topicId: string; topicTitle: string } | null {
  for (const level of DS_COURSE_OUTLINE.levels) {
    for (const topic of level.topics) {
      if (!isTopicComplete(topic.id)) {
        return { levelOrder: level.order, topicId: topic.id, topicTitle: topic.title };
      }
    }
  }
  return null;
}

export function getCurrentLevelStatus(): { levelOrder: number; levelTitle: string; levelId: string; percent: number } | null {
  for (const level of DS_COURSE_OUTLINE.levels) {
    const prog = getLevelProgress(level.id);
    if (prog.percent < 100 && prog.total > 0) {
      return { levelOrder: level.order, levelTitle: level.title, levelId: level.id, percent: prog.percent };
    }
  }
  return null;
}

export function getSkillDistribution(): { skill: string; value: number; color: string }[] {
  const skills: { skill: string; levelIds: string[]; color: string }[] = [
    { skill: "Python", levelIds: ["level-1", "level-2"], color: "#22c55e" },
    { skill: "Data Analytics", levelIds: ["level-3"], color: "#3b82f6" },
    { skill: "Statistics", levelIds: ["level-4"], color: "#ef4444" },
    { skill: "Graph Theory", levelIds: ["level-5"], color: "#a855f7" },
    { skill: "Machine Learning", levelIds: ["level-6", "level-7"], color: "#8b5cf6" },
    { skill: "Capstone", levelIds: ["level-8"], color: "#f59e0b" },
  ];
  return skills.map((s) => {
    let completed = 0;
    let total = 0;
    for (const level of DS_COURSE_OUTLINE.levels) {
      if (s.levelIds.includes(level.id)) {
        total += level.topics.length;
        completed += level.topics.filter((t) => isTopicComplete(t.id)).length;
      }
    }
    return { ...s, value: total ? Math.round((completed / total) * 100) : 0 };
  });
}

function checkAndAwardBadges(): void {
  const completed = getCompletedTopics();

  if (
    completed.includes("t1-variables") &&
    completed.includes("t1-control") &&
    completed.includes("t1-loops") &&
    completed.includes("t1-functions") &&
    completed.includes("t1-collections") &&
    completed.includes("t1-oop") &&
    completed.includes("t1-files") &&
    completed.includes("t1-exceptions")
  ) {
    awardBadge("bronze-python");
  }
}
