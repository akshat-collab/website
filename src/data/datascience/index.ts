/**
 * Professional Data Science Learning Track - Main Export
 * Production-ready, modular, auto-gradable, certification-based
 */

export * from "./schema";
export { DS_COURSE_OUTLINE } from "./courseOutline";
export { DS_BADGES, BADGE_LOGIC } from "./badges";
export { CERTIFICATION_CRITERIA, CERTIFICATE_METADATA_SCHEMA } from "./certification";
export { ASSESSMENT_RULES } from "./assessmentRules";
export { DATA_CTF_CHALLENGES, DATA_CTF_LEADERBOARD_CONFIG } from "./dataCtfChallenges";
export {
  LEVEL1_TOPICS,
  LEVEL1_EXERCISES,
  LEVEL1_MCQS,
  LEVEL1_MINI_ASSIGNMENT_T1,
  T1_VARIABLES_CONCEPT,
} from "./level1Content";
export {
  LEVEL1_EXTENDED_EXERCISES,
  LEVEL1_EXTENDED_MCQS,
  LEVEL1_ALL_ASSIGNMENTS,
} from "./level1ContentExtended";
export type { MiniAssignment } from "./level1ContentExtended";

// Combined: all Level 1 exercises and MCQs
import { LEVEL1_EXERCISES, LEVEL1_MCQS } from "./level1Content";
import { LEVEL1_EXTENDED_EXERCISES, LEVEL1_EXTENDED_MCQS, LEVEL1_ALL_ASSIGNMENTS } from "./level1ContentExtended";
export const LEVEL1_ALL_EXERCISES = [...LEVEL1_EXERCISES, ...LEVEL1_EXTENDED_EXERCISES];
export const LEVEL1_ALL_MCQS = [...LEVEL1_MCQS, ...LEVEL1_EXTENDED_MCQS];
export {
  LEVEL2_TOPICS,
  LEVEL3_TOPICS,
  LEVEL4_TOPICS,
  LEVEL5_TOPICS,
  LEVEL6_TOPICS,
  LEVEL7_TOPICS,
  LEVEL8_CAPSTONES,
} from "./level2To8Content";
export {
  LEVEL2_ALL_EXERCISES,
  LEVEL2_ALL_MCQS,
  LEVEL2_ALL_ASSIGNMENTS,
} from "./level2Content";
export {
  LEVEL3_ALL_EXERCISES,
  LEVEL3_ALL_MCQS,
  LEVEL3_ALL_ASSIGNMENTS,
} from "./level3Content";
export {
  LEVEL4_ALL_EXERCISES,
  LEVEL4_ALL_MCQS,
  LEVEL4_ALL_ASSIGNMENTS,
} from "./level4Content";
export { DS_CONCEPT_CONTENT } from "./concepts";

// Combined: all exercises and MCQs across levels (Level 1 + 2 + 3 + 4)
import { LEVEL2_ALL_EXERCISES, LEVEL2_ALL_MCQS, LEVEL2_ALL_ASSIGNMENTS } from "./level2Content";
import { LEVEL3_ALL_EXERCISES, LEVEL3_ALL_MCQS, LEVEL3_ALL_ASSIGNMENTS } from "./level3Content";
import { LEVEL4_ALL_EXERCISES, LEVEL4_ALL_MCQS, LEVEL4_ALL_ASSIGNMENTS } from "./level4Content";
export const DS_ALL_EXERCISES = [...LEVEL1_ALL_EXERCISES, ...LEVEL2_ALL_EXERCISES, ...LEVEL3_ALL_EXERCISES, ...LEVEL4_ALL_EXERCISES];
export const DS_ALL_MCQS = [...LEVEL1_ALL_MCQS, ...LEVEL2_ALL_MCQS, ...LEVEL3_ALL_MCQS, ...LEVEL4_ALL_MCQS];
export const DS_ALL_ASSIGNMENTS: Record<string, import("./level1ContentExtended").MiniAssignment> = {
  ...LEVEL1_ALL_ASSIGNMENTS,
  ...LEVEL2_ALL_ASSIGNMENTS,
  ...LEVEL3_ALL_ASSIGNMENTS,
  ...LEVEL4_ALL_ASSIGNMENTS,
};
