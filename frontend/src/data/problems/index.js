// Master index file for all grindgram.in coding problems
// This file imports all problem categories and exports them as a single object

import { basicsProblems } from './basics.js';
import { arrayProblems } from './array.js';
import { timeComplexityProblems } from './timeComplexity.js';
import { matrixProblems } from './matrix.js';
import { binarySearchProblems } from './binarySearch.js';
import { sortingProblems } from './sorting.js';
import { linkedListProblems } from './linkedList.js';
import { stackProblems } from './stack.js';
import { queueProblems } from './queue.js';
import { treeProblems } from './tree.js';
import { slidingWindowProblems } from './slidingWindow.js';
import { graphProblems } from './graph.js';
import { backtrackingProblems } from './backtracking.js';
import { greedyProblems } from './greedy.js';
import { dpProblems } from './dp.js';
import { heapsProblems } from './heaps.js';
import { trieProblems } from './trie.js';
import { stringProblems } from './string.js';
import { aptitudeProblems } from './aptitude/index.js';

// Export all problems as a single object
export const grindgramProblems = {
  basics: basicsProblems,
  array: arrayProblems,
  timeComplexity: timeComplexityProblems,
  matrix: matrixProblems,
  binarySearch: binarySearchProblems,
  sorting: sortingProblems,
  linkedList: linkedListProblems,
  stack: stackProblems,
  queue: queueProblems,
  tree: treeProblems,
  slidingWindow: slidingWindowProblems,
  graph: graphProblems,
  backtracking: backtrackingProblems,
  greedy: greedyProblems,
  dp: dpProblems,
  heaps: heapsProblems,
  trie: trieProblems,
  string: stringProblems,
  aptitude: aptitudeProblems
};

// Calculate total problems across all categories
export const getTotalProblemsCount = () => {
  return Object.values(grindgramProblems).reduce((total, category) => {
    return total + (category.totalProblems || 0);
  }, 0);
};

// Get problems by category
export const getProblemsByCategory = (category) => {
  return grindgramProblems[category] || null;
};

// Get all categories
export const getAllCategories = () => {
  return Object.keys(grindgramProblems);
};