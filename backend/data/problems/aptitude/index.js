// Aptitude Round Cheat Sheet - grindgram.in problems
// Complete aptitude practice problems organized by topic

import { averageProblems } from './average.js';
import { timeDistanceProblems } from './timeDistance.js';
import { timeWorkProblems } from './timeWork.js';
import { profitLossProblems } from './profitLoss.js';
import { interestProblems } from './interest.js';
import { ratioProportionProblems } from './ratioProportion.js';
import { probabilityProblems } from './probability.js';
import { hcfLcmProblems } from './hcfLcm.js';
import { agesProblems } from './ages.js';
import { permutationsCombinationsProblems } from './permutationsCombinations.js';

// Export all aptitude problems as a single object
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

// Calculate total problems across all aptitude topics
export const getTotalAptitudeProblemsCount = () => {
  return Object.values(aptitudeProblems).reduce((total, topic) => {
    return total + (topic.totalProblems || 0);
  }, 0);
};

// Get problems by aptitude topic
export const getAptitudeProblemsByTopic = (topic) => {
  return aptitudeProblems[topic] || null;
};

// Get all aptitude topics
export const getAllAptitudeTopics = () => {
  return Object.keys(aptitudeProblems);
};