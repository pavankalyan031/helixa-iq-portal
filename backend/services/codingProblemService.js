// Coding Problem Service
// Handles all coding problem operations

import CodingProblem from '../models/CodingProblem.js'

class CodingProblemService {
  constructor() {
    this.problems = new Map(); // In production, use database
  }

  // Get all problems for a specific topic
  async getProblemsByTopic(topicId) {
    try {
      // In production, query database: SELECT * FROM problems WHERE topic_id = ?
      const topicProblems = Array.from(this.problems.values())
        .filter(problem => problem.topicId === topicId);

      // Group by sections
      const sections = {};
      topicProblems.forEach(problem => {
        if (!sections[problem.sectionId]) {
          sections[problem.sectionId] = [];
        }
        sections[problem.sectionId].push(problem);
      });

      return {
        success: true,
        data: sections
      };
    } catch (error) {
      console.error('Error fetching problems by topic:', error);
      return {
        success: false,
        error: 'Failed to fetch problems'
      };
    }
  }

  // Get all problems for a specific section
  async getProblemsBySection(sectionId) {
    try {
      const sectionProblems = Array.from(this.problems.values())
        .filter(problem => problem.sectionId === sectionId);

      return {
        success: true,
        data: sectionProblems
      };
    } catch (error) {
      console.error('Error fetching problems by section:', error);
      return {
        success: false,
        error: 'Failed to fetch section problems'
      };
    }
  }

  // Get problem by ID
  async getProblemById(problemId) {
    try {
      const problem = this.problems.get(problemId);
      if (!problem) {
        return {
          success: false,
          error: 'Problem not found'
        };
      }

      return {
        success: true,
        data: problem
      };
    } catch (error) {
      console.error('Error fetching problem:', error);
      return {
        success: false,
        error: 'Failed to fetch problem'
      };
    }
  }

  // Add new problem
  async addProblem(problemData) {
    try {
      const problem = new CodingProblem({
        ...problemData,
        id: `problem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      });

      this.problems.set(problem.id, problem);

      return {
        success: true,
        data: problem,
        message: 'Problem added successfully'
      };
    } catch (error) {
      console.error('Error adding problem:', error);
      return {
        success: false,
        error: 'Failed to add problem'
      };
    }
  }

  // Bulk import problems (for grindgram.in data)
  async bulkImportProblems(problemsData) {
    try {
      const importedProblems = [];

      for (const problemData of problemsData) {
        const problem = new CodingProblem({
          ...problemData,
          id: `problem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });

        this.problems.set(problem.id, problem);
        importedProblems.push(problem);
      }

      return {
        success: true,
        data: importedProblems,
        count: importedProblems.length,
        message: `Successfully imported ${importedProblems.length} problems`
      };
    } catch (error) {
      console.error('Error bulk importing problems:', error);
      return {
        success: false,
        error: 'Failed to import problems'
      };
    }
  }

  // Update problem
  async updateProblem(problemId, updateData) {
    try {
      const existingProblem = this.problems.get(problemId);
      if (!existingProblem) {
        return {
          success: false,
          error: 'Problem not found'
        };
      }

      const updatedProblem = new CodingProblem({
        ...existingProblem.toJSON(),
        ...updateData,
        updatedAt: new Date()
      });

      this.problems.set(problemId, updatedProblem);

      return {
        success: true,
        data: updatedProblem,
        message: 'Problem updated successfully'
      };
    } catch (error) {
      console.error('Error updating problem:', error);
      return {
        success: false,
        error: 'Failed to update problem'
      };
    }
  }

  // Delete problem
  async deleteProblem(problemId) {
    try {
      if (!this.problems.has(problemId)) {
        return {
          success: false,
          error: 'Problem not found'
        };
      }

      this.problems.delete(problemId);

      return {
        success: true,
        message: 'Problem deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting problem:', error);
      return {
        success: false,
        error: 'Failed to delete problem'
      };
    }
  }

  // Get problem statistics
  async getProblemStats() {
    try {
      const problems = Array.from(this.problems.values());
      const stats = {
        total: problems.length,
        byDifficulty: {
          easy: problems.filter(p => p.difficulty === 'easy').length,
          medium: problems.filter(p => p.difficulty === 'medium').length,
          hard: problems.filter(p => p.difficulty === 'hard').length
        },
        byTopic: {}
      };

      // Group by topic
      problems.forEach(problem => {
        if (!stats.byTopic[problem.topicId]) {
          stats.byTopic[problem.topicId] = 0;
        }
        stats.byTopic[problem.topicId]++;
      });

      return {
        success: true,
        data: stats
      };
    } catch (error) {
      console.error('Error getting problem stats:', error);
      return {
        success: false,
        error: 'Failed to get statistics'
      };
    }
  }

  // Search problems
  async searchProblems(query, filters = {}) {
    try {
      let problems = Array.from(this.problems.values());

      // Text search
      if (query) {
        problems = problems.filter(problem =>
          problem.title.toLowerCase().includes(query.toLowerCase()) ||
          problem.description.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Apply filters
      if (filters.difficulty) {
        problems = problems.filter(problem => problem.difficulty === filters.difficulty);
      }

      if (filters.topicId) {
        problems = problems.filter(problem => problem.topicId === filters.topicId);
      }

      if (filters.sectionId) {
        problems = problems.filter(problem => problem.sectionId === filters.sectionId);
      }

      return {
        success: true,
        data: problems
      };
    } catch (error) {
      console.error('Error searching problems:', error);
      return {
        success: false,
        error: 'Failed to search problems'
      };
    }
  }
}

export default new CodingProblemService();