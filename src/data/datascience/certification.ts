/**
 * Certification Criteria & Final Exam Structure
 * Professional Data Scientist Certification
 */

export const CERTIFICATION_CRITERIA = {
  eligibility: {
    minLevelsCompleted: 8,
    minOverallScore: 70,
    minCapstoneScore: 60,
    minExamScore: 65,
  },
  finalExam: {
    durationMinutes: 120,
    totalQuestions: 50,
    breakdown: {
      mcq: 30,
      coding: 15,
      caseStudy: 5,
    },
    difficultyDistribution: {
      easy: 15,
      medium: 25,
      hard: 8,
      expert: 2,
    },
    topics: [
      "Python & Data Structures",
      "Data Analytics & Visualization",
      "Statistics & Probability",
      "Machine Learning",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  proctoredExam: {
    required: true,
    tools: ["webcam", "screen_share", "tab_monitor"],
    retakePolicy: "Max 2 retakes, 7-day cooldown",
  },
  certificateTemplate: {
    title: "Professional Data Scientist",
    subtitle: "TechMasterAI Certified",
    fields: ["name", "completionDate", "score", "badgeId", "certificateId"],
    validity: "Lifetime",
  },
};

export const CERTIFICATE_METADATA_SCHEMA = {
  "@context": "https://schema.org",
  type: "EducationalOccupationalCredential",
  credentialCategory: "Professional Certification",
  name: "Professional Data Scientist",
  description: "Certifies completion of TechMasterAI Data Science track",
  recognizedBy: { name: "TechMasterAI" },
  validFor: { name: "Data Science roles" },
};
