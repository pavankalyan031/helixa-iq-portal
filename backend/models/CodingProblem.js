// Coding Problem Model
// Handles all coding problem operations

class CodingProblem {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.difficulty = data.difficulty || 'medium';
    this.topicId = data.topicId;
    this.sectionId = data.sectionId;
    this.xpValue = data.xpValue || 10;
    this.videoLink = data.videoLink || '';
    this.solutionLink = data.solutionLink || '';
    this.practiceLink = data.practiceLink || '';
    this.description = data.description || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Convert to JSON for database storage
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      difficulty: this.difficulty,
      topicId: this.topicId,
      sectionId: this.sectionId,
      xpValue: this.xpValue,
      videoLink: this.videoLink,
      solutionLink: this.solutionLink,
      practiceLink: this.practiceLink,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Create from database data
  static fromJSON(data) {
    return new CodingProblem(data);
  }
}

export default CodingProblem;