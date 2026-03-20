/**
 * Digital Badge System - Professional Data Science Track
 * Bronze → Silver → Gold → Platinum
 */

import type { Badge } from "./schema";

export const DS_BADGES: Badge[] = [
  {
    id: "bronze-python",
    name: "Python Fundamentals",
    description: "Completed Level 1: Python Foundations with 80%+ score",
    icon: "🥉",
    requiredLevels: ["level-1"],
    scoreThreshold: 80,
    metadata: {
      issuer: "TechMasterAI",
      criteria: "Complete all Level 1 topics, exercises, and pass assessment",
      version: "1.0",
    },
  },
  {
    id: "silver-analyst",
    name: "Data Analyst",
    description: "Completed Levels 1-3: Python, Advanced Python, Data Analytics",
    icon: "🥈",
    requiredLevels: ["level-1", "level-2", "level-3"],
    scoreThreshold: 75,
    metadata: {
      issuer: "TechMasterAI",
      criteria: "Complete Data Analytics track with dashboard project",
      version: "1.0",
    },
  },
  {
    id: "gold-ml-engineer",
    name: "Machine Learning Engineer",
    description: "Completed Levels 1-6: Full ML pipeline",
    icon: "🥇",
    requiredLevels: ["level-1", "level-2", "level-3", "level-4", "level-5", "level-6"],
    scoreThreshold: 70,
    metadata: {
      issuer: "TechMasterAI",
      criteria: "Complete ML Core with 3 ML assignments",
      version: "1.0",
    },
  },
  {
    id: "platinum-data-scientist",
    name: "Professional Data Scientist",
    description: "Completed full track + Capstone + Certification Exam",
    icon: "💎",
    requiredLevels: ["level-1", "level-2", "level-3", "level-4", "level-5", "level-6", "level-7", "level-8"],
    scoreThreshold: 70,
    metadata: {
      issuer: "TechMasterAI",
      criteria: "Pass proctored exam, complete 1 capstone, 70%+ overall",
      version: "1.0",
    },
  },
];

export const BADGE_LOGIC = {
  bronze: {
    levelIds: ["level-1"],
    minScore: 80,
    minExercisesCompleted: 70,
    minMcqsCorrect: 32,
  },
  silver: {
    levelIds: ["level-1", "level-2", "level-3"],
    minScore: 75,
    dashboardProjectRequired: true,
  },
  gold: {
    levelIds: ["level-1", "level-2", "level-3", "level-4", "level-5", "level-6"],
    minScore: 70,
    mlAssignmentsRequired: 3,
  },
  platinum: {
    allLevels: true,
    minScore: 70,
    capstoneRequired: 1,
    proctoredExamPass: true,
  },
};
