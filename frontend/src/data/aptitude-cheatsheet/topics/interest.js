// Simple Interest & Compound Interest Problems - Quantitative Aptitude
// Based on grindgram.in aptitude cheatsheet

export const interestProblems = {
  title: "Simple Interest & Compound Interest",
  subtitle: "Interest computations and comparisons",
  totalProblems: 28,
  problems: [
    {
      id: "int-1",
      title: "Find simple interest on ₹2000 at 5% per annum for 3 years.",
      difficulty: "easy",
      solution: "SI = (P × R × T)/100 = (2000 × 5 × 3)/100 = ₹300.",
      answer: "₹300",
      explanation: "Simple Interest formula: SI = P×R×T/100"
    },
    {
      id: "int-2",
      title: "Find amount if ₹5000 invested at 6% compound interest for 2 years.",
      difficulty: "easy",
      solution: "A = P(1 + R/100)^T = 5000 × (1 + 6/100)^2 = 5000 × 1.06^2 = 5000 × 1.1236 = ₹5618.",
      answer: "₹5618",
      explanation: "Compound Interest formula: A = P(1 + R/100)^T"
    },
    {
      id: "int-3",
      title: "Difference between SI and CI on ₹10000 at 10% for 2 years.",
      difficulty: "medium",
      solution: "SI = (10000 × 10 × 2)/100 = ₹2000. CI = 10000 × (1.1)^2 - 10000 = 12100 - 10000 = ₹2100. Difference = ₹100.",
      answer: "₹100",
      explanation: "CI is always more than SI. Difference = P×(R/100)^2 for 2 years."
    },
    {
      id: "int-4",
      title: "A sum becomes ₹1331 in 3 years at 10% CI. Find principal.",
      difficulty: "medium",
      solution: "1331 = P × (1.1)^3. P = 1331 / (1.1)^3 = 1331 / 1.331 = ₹1000.",
      answer: "₹1000",
      explanation: "P = A / (1 + R/100)^T"
    },
    {
      id: "int-5",
      title: "Find time for ₹2000 to become ₹2420 at 10% SI.",
      difficulty: "easy",
      solution: "SI = 2420 - 2000 = ₹420. 420 = (2000 × 10 × T)/100. T = 420 × 100 / (2000 × 10) = 2.1 years.",
      answer: "2.1 years",
      explanation: "T = (SI × 100) / (P × R)"
    },
    {
      id: "int-6",
      title: "Find rate if ₹5000 becomes ₹6050 in 2 years SI.",
      difficulty: "easy",
      solution: "SI = 1050. 1050 = (5000 × R × 2)/100. R = 1050 × 100 / (5000 × 2) = 10.5%.",
      answer: "10.5%",
      explanation: "R = (SI × 100) / (P × T)"
    },
    {
      id: "int-7",
      title: "Compound interest compounded half-yearly on ₹10000 at 20% for 1 year.",
      difficulty: "medium",
      solution: "Half-yearly rate = 10%, periods = 2. A = 10000 × (1.1)^2 = ₹12100. CI = ₹2100.",
      answer: "₹2100",
      explanation: "For half-yearly compounding, rate = R/2, periods = 2T."
    },
    {
      id: "int-8",
      title: "Find CI on ₹8000 at 15% for 2 years compounded annually.",
      difficulty: "easy",
      solution: "A = 8000 × (1.15)^2 = 8000 × 1.3225 = ₹10580. CI = 10580 - 8000 = ₹2580.",
      answer: "₹2580",
      explanation: "CI = A - P"
    }
  ]
};