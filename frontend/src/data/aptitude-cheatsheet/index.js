// Aptitude Round Cheat Sheet - Complete aptitude practice problems
// Based on grindgram.in aptitude cheatsheet

export const aptitudeCheatsheet = {
  title: "Aptitude Round Cheat Sheet",
  subtitle: "Complete aptitude practice problems organized by topic",
  description: "Master quantitative aptitude with comprehensive problem sets covering all major topics for placement exams.",
  totalProblems: 196,
  topics: [
    {
      id: "average",
      title: "Average",
      subtitle: "Average problems for quantitative aptitude",
      totalProblems: 24,
      difficulty: "easy",
      estimatedTime: "30 mins"
    },
    {
      id: "timeDistance",
      title: "Time & Distance",
      subtitle: "Core speed-time-distance patterns and practice",
      totalProblems: 16,
      difficulty: "easy",
      estimatedTime: "25 mins"
    },
    {
      id: "timeWork",
      title: "Time & Work",
      subtitle: "Work-efficiency, combined work, and related patterns",
      totalProblems: 16,
      difficulty: "medium",
      estimatedTime: "30 mins"
    },
    {
      id: "profitLoss",
      title: "Profit & Loss",
      subtitle: "Core profit, loss, discount, and related scenarios",
      totalProblems: 20,
      difficulty: "medium",
      estimatedTime: "35 mins"
    },
    {
      id: "interest",
      title: "Simple Interest & Compound Interest",
      subtitle: "Interest computations and comparisons",
      totalProblems: 28,
      difficulty: "medium",
      estimatedTime: "40 mins"
    },
    {
      id: "ratioProportion",
      title: "Ratio & Proportion",
      subtitle: "Ratios, proportions, mixtures, and distributions",
      totalProblems: 20,
      difficulty: "medium",
      estimatedTime: "35 mins"
    },
    {
      id: "probability",
      title: "Probability",
      subtitle: "Fundamentals and applied probability questions",
      totalProblems: 8,
      difficulty: "hard",
      estimatedTime: "20 mins"
    },
    {
      id: "hcfLcm",
      title: "HCF & LCM",
      subtitle: "Greatest common divisor and least common multiple problems",
      totalProblems: 20,
      difficulty: "easy",
      estimatedTime: "25 mins"
    },
    {
      id: "ages",
      title: "Ages",
      subtitle: "Age problems including ratios and timelines",
      totalProblems: 16,
      difficulty: "medium",
      estimatedTime: "30 mins"
    },
    {
      id: "permutationsCombinations",
      title: "Permutations & Combinations",
      subtitle: "Counting techniques with permutations and combinations",
      totalProblems: 8,
      difficulty: "hard",
      estimatedTime: "25 mins"
    }
  ]
};

// Import all topic data
import { averageProblems } from './topics/average.js';
import { timeDistanceProblems } from './topics/timeDistance.js';
import { timeWorkProblems } from './topics/timeWork.js';
import { profitLossProblems } from './topics/profitLoss.js';
import { interestProblems } from './topics/interest.js';
import { ratioProportionProblems } from './topics/ratioProportion.js';
import { probabilityProblems } from './topics/probability.js';
import { hcfLcmProblems } from './topics/hcfLcm.js';
import { agesProblems } from './topics/ages.js';
import { permutationsCombinationsProblems } from './topics/permutationsCombinations.js';

export const aptitudeProblems = {
  average: averageProblems,
  timeDistance: timeDistanceProblems,
  timeWork: timeWorkProblems,
  profitLoss: profitLossProblems,
  interest: interestProblems,
  ratioProportion: ratioProportionProblems,
  probability: probabilityProblems,
  hcfLcm: hcfLcmProblems,
  ages: agesProblems,
  permutationsCombinations: permutationsCombinationsProblems
};

// Helper functions
export const getAptitudeTopic = (topicId) => {
  return aptitudeProblems[topicId] || null;
};

export const getAllAptitudeTopics = () => {
  return Object.keys(aptitudeProblems);
};

export const getTotalAptitudeProblems = () => {
  return Object.values(aptitudeProblems).reduce((total, topic) => {
    return total + (topic.problems ? topic.problems.length : 0);
  }, 0);
};

export const getAptitudeProgress = (solvedProblems = {}) => {
  const total = getTotalAptitudeProblems();
  const solved = Object.values(solvedProblems).reduce((sum, count) => sum + count, 0);
  return {
    solved,
    total,
    percentage: total > 0 ? Math.round((solved / total) * 100) : 0
  };
};