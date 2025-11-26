// Time & Work Problems - Quantitative Aptitude
// Based on grindgram.in aptitude cheatsheet

export const timeWorkProblems = {
  title: "Time & Work",
  subtitle: "Work-efficiency, combined work, and related patterns",
  totalProblems: 16,
  problems: [
    {
      id: "tw-1",
      title: "A can do a work in 10 days, B in 15 days. How long will they take together?",
      difficulty: "easy",
      solution: "A's 1 day work = 1/10, B's = 1/15. Together = 1/10 + 1/15 = 1/6. Time = 6 days.",
      answer: "6 days",
      explanation: "Combined work rate = sum of individual rates."
    },
    {
      id: "tw-2",
      title: "A and B together can do a work in 8 days. A alone can do it in 12 days. How long will B take alone?",
      difficulty: "easy",
      solution: "A's 1 day work = 1/12. Together = 1/8. B's work = 1/8 - 1/12 = 1/24. B takes 24 days.",
      answer: "24 days",
      explanation: "B's rate = combined rate - A's rate."
    },
    {
      id: "tw-3",
      title: "A is twice as efficient as B. A takes 6 days less than B. How long does B take?",
      difficulty: "medium",
      solution: "Let B takes x days, A takes x-6 days. A's efficiency = 2 × B's. Work: A does 1/(x-6), B does 1/x. Ratio 2:1. So 1/(x-6) = 2/x. x = 12 days.",
      answer: "12 days",
      explanation: "Set up ratio of efficiencies and solve."
    },
    {
      id: "tw-4",
      title: "12 men can complete a work in 8 days. How many days will 16 men take?",
      difficulty: "easy",
      solution: "Men × Days = Constant. 12 × 8 = 16 × Days. Days = 96/16 = 6 days.",
      answer: "6 days",
      explanation: "More men = less days for same work."
    },
    {
      id: "tw-5",
      title: "A pipe can fill a tank in 6 hours, another in 8 hours. How long to fill together?",
      difficulty: "easy",
      solution: "Rate1 = 1/6, Rate2 = 1/8. Together = 1/6 + 1/8 = 7/24. Time = 24/7 ≈ 3.43 hours.",
      answer: "3.43 hours",
      explanation: "Combined filling rate = sum of individual rates."
    },
    {
      id: "tw-6",
      title: "A pipe fills tank in 10 hours, leak empties in 15 hours. How long to fill?",
      difficulty: "medium",
      solution: "Net rate = 1/10 - 1/15 = 1/30. Time = 30 hours.",
      answer: "30 hours",
      explanation: "Net rate = filling rate - emptying rate."
    },
    {
      id: "tw-7",
      title: "A and B can do a work in 10 days, B and C in 15 days, C and A in 12 days. How long for A alone?",
      difficulty: "hard",
      solution: "2(A+B+C) = 10+15+12 = 37 days. A+B+C = 18.5 days. A = (A+B+C) - (B+C) = 18.5 - 15 = 3.5 days.",
      answer: "3.5 days",
      explanation: "Add all three equations and solve for individual times."
    },
    {
      id: "tw-8",
      title: "4 men and 6 women finish work in 8 days. 3 men and 7 women in 10 days. Find time for 10 women.",
      difficulty: "hard",
      solution: "Let M = man's 1 day work, W = woman's. 4M + 6W = 1/8, 3M + 7W = 1/10. Solving: M = 1/400, W = 1/200. 10 women = 10×(1/200) = 1/20. Time = 20 days.",
      answer: "20 days",
      explanation: "Set up equations and solve for individual rates."
    },
    {
      id: "tw-9",
      title: "A can do 1/4 of work in 5 days. How many days for complete work?",
      difficulty: "easy",
      solution: "A does 1/4 work in 5 days, so 1 work in 5×4 = 20 days.",
      answer: "20 days",
      explanation: "If 1/4 work takes 5 days, full work takes 4×5 = 20 days."
    },
    {
      id: "tw-10",
      title: "A does 2/3 of work in 6 days. B finishes remaining in 2 days. How long for B alone?",
      difficulty: "medium",
      solution: "A does 2/3 work in 6 days, so 1 work in 6×3/2 = 9 days. B does 1/3 work in 2 days, so 1 work in 6 days.",
      answer: "6 days",
      explanation: "Calculate B's rate from remaining work and time."
    },
    {
      id: "tw-11",
      title: "A and B together finish work in 6 days. A works twice as fast as B. How long for A alone?",
      difficulty: "easy",
      solution: "Let B takes x days, A takes x/2 days. Together: 1/(x/2) + 1/x = 2/x + 1/x = 3/x = 1/6. So x = 18 days. A takes 9 days.",
      answer: "9 days",
      explanation: "Set up ratio and solve for individual times."
    },
    {
      id: "tw-12",
      title: "Pipe A fills in 20 hours, B in 30 hours, C empties in 40 hours. How long to fill?",
      difficulty: "medium",
      solution: "Net rate = 1/20 + 1/30 - 1/40 = 6/120 + 4/120 - 3/120 = 7/120. Time = 120/7 ≈ 17.14 hours.",
      answer: "17.14 hours",
      explanation: "Net rate = sum of filling rates - emptying rate."
    },
    {
      id: "tw-13",
      title: "A works twice as fast as B. Together they finish in 12 days. How long for B alone?",
      difficulty: "easy",
      solution: "Let B takes x days, A takes x/2. Together: 1/(x/2) + 1/x = 2/x + 1/x = 3/x = 1/12. x = 36 days.",
      answer: "36 days",
      explanation: "Set up ratio and solve."
    },
    {
      id: "tw-14",
      title: "5 men can do work in 10 days. How many men needed for 5 days?",
      difficulty: "easy",
      solution: "Men × Days = Constant. 5 × 10 = Men × 5. Men = 10.",
      answer: "10 men",
      explanation: "More men = less time for same work."
    },
    {
      id: "tw-15",
      title: "A can finish work in 18 days, B in 24 days. They work together for 6 days, then A leaves. How long more for B?",
      difficulty: "medium",
      solution: "Work done in 6 days = 6×(1/18 + 1/24) = 6×(4/72 + 3/72) = 6×7/72 = 42/72 = 7/12. Remaining work = 5/12. B takes 5/12 × 24 = 10 days.",
      answer: "10 days",
      explanation: "Calculate work done together, then remaining work by B."
    },
    {
      id: "tw-16",
      title: "Two pipes A and B can fill tank in 12 and 15 hours. Pipe C empties in 20 hours. All opened, how long to fill?",
      difficulty: "medium",
      solution: "Net rate = 1/12 + 1/15 - 1/20 = 5/60 + 4/60 - 3/60 = 6/60 = 1/10. Time = 10 hours.",
      answer: "10 hours",
      explanation: "Net rate = filling rates - emptying rate."
    }
  ]
};