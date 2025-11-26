// Average Problems - Quantitative Aptitude
// Based on grindgram.in aptitude cheatsheet

export const averageProblems = {
  title: "Average",
  subtitle: "Average problems for quantitative aptitude",
  totalProblems: 24,
  problems: [
    {
      id: "avg-1",
      title: "The average of 5 numbers is 20. If one number is excluded, the average becomes 16. What is the excluded number?",
      difficulty: "easy",
      solution: "Let the excluded number be x. Sum of 5 numbers = 5 × 20 = 100. Sum of remaining 4 numbers = 4 × 16 = 64. So x = 100 - 64 = 36.",
      answer: "36",
      explanation: "Total sum = average × count. When one number is excluded, the remaining sum = total sum - excluded number."
    },
    {
      id: "avg-2",
      title: "The average age of a group of 10 students is 15 years. If 2 more students join with ages 12 and 14, what is the new average?",
      difficulty: "easy",
      solution: "Total age of 10 students = 10 × 15 = 150. Total age of 12 students = 150 + 12 + 14 = 176. New average = 176 ÷ 12 = 14.67 years.",
      answer: "14.67 years",
      explanation: "Add the new ages to the total sum and divide by the new count."
    },
    {
      id: "avg-3",
      title: "Find the average of first 50 natural numbers.",
      difficulty: "easy",
      solution: "Sum = n(n+1)/2 = 50×51/2 = 1275. Average = 1275 ÷ 50 = 25.5.",
      answer: "25.5",
      explanation: "Formula for sum of first n natural numbers is n(n+1)/2."
    },
    {
      id: "avg-4",
      title: "The average of 7 numbers is 12. If the average of first 4 is 10 and that of last 4 is 14, find the 4th number.",
      difficulty: "medium",
      solution: "Sum of 7 numbers = 7 × 12 = 84. Sum of first 4 = 4 × 10 = 40. Sum of last 4 = 4 × 14 = 56. 4th number = (40 + 56) - 84 = 12.",
      answer: "12",
      explanation: "The 4th number is counted in both first 4 and last 4 sums."
    },
    {
      id: "avg-5",
      title: "A batsman has an average of 40 after 20 innings. How many runs does he need in his 21st innings to increase his average to 42?",
      difficulty: "medium",
      solution: "Current total runs = 20 × 40 = 800. Required total for 21 innings = 21 × 42 = 882. Runs needed = 882 - 800 = 82.",
      answer: "82 runs",
      explanation: "Calculate required total runs and subtract current total."
    },
    {
      id: "avg-6",
      title: "The average weight of 25 students is 50 kg. If the teacher's weight is included, the average becomes 51 kg. Find the teacher's weight.",
      difficulty: "easy",
      solution: "Total weight of 25 students = 25 × 50 = 1250 kg. Total weight of 26 people = 26 × 51 = 1326 kg. Teacher's weight = 1326 - 1250 = 76 kg.",
      answer: "76 kg",
      explanation: "New total = new average × new count. Teacher's weight = new total - students' total."
    },
    {
      id: "avg-7",
      title: "The average of 6 numbers is 8. If one number is 12, what is the average of the remaining 5 numbers?",
      difficulty: "easy",
      solution: "Total sum = 6 × 8 = 48. Sum of remaining 5 = 48 - 12 = 36. Average = 36 ÷ 5 = 7.2.",
      answer: "7.2",
      explanation: "Subtract the known number from total sum and divide by remaining count."
    },
    {
      id: "avg-8",
      title: "Find the average of all numbers between 1 and 100 that are divisible by 7.",
      difficulty: "medium",
      solution: "Numbers: 7, 14, 21, ..., 98. First = 7, last = 98, common difference = 7. n = (98-7)/7 + 1 = 14. Sum = n/2 × (first + last) = 14/2 × (7+98) = 7 × 105 = 735. Average = 735 ÷ 14 = 52.5.",
      answer: "52.5",
      explanation: "Use arithmetic progression formula to find sum and then divide by count."
    },
    {
      id: "avg-9",
      title: "The average of 8 numbers is 25. If 3 numbers are 20, 22, 24, what is the average of the remaining 5 numbers?",
      difficulty: "easy",
      solution: "Total sum = 8 × 25 = 200. Sum of 3 numbers = 20 + 22 + 24 = 66. Sum of remaining 5 = 200 - 66 = 134. Average = 134 ÷ 5 = 26.8.",
      answer: "26.8",
      explanation: "Subtract the sum of known numbers from total sum and divide by remaining count."
    },
    {
      id: "avg-10",
      title: "A man bought 5 kg of apples at ₹40/kg and 3 kg at ₹50/kg. What is the average price per kg?",
      difficulty: "easy",
      solution: "Total cost = (5×40) + (3×50) = 200 + 150 = 350. Total weight = 5 + 3 = 8 kg. Average price = 350 ÷ 8 = 43.75.",
      answer: "₹43.75 per kg",
      explanation: "Total cost divided by total weight gives average price per kg."
    },
    {
      id: "avg-11",
      title: "The average of 10 numbers is 15. If each number is increased by 2, what is the new average?",
      difficulty: "easy",
      solution: "When each number increases by 2, the total sum increases by 10×2 = 20. New sum = 10×15 + 20 = 170. New average = 170 ÷ 10 = 17.",
      answer: "17",
      explanation: "Adding a constant to each number adds that constant to the average."
    },
    {
      id: "avg-12",
      title: "The average of 12 numbers is 20. If each number is multiplied by 2, what is the new average?",
      difficulty: "easy",
      solution: "When each number is multiplied by 2, the average also gets multiplied by 2. New average = 20 × 2 = 40.",
      answer: "40",
      explanation: "Multiplying each number by a constant multiplies the average by that constant."
    },
    {
      id: "avg-13",
      title: "The average of marks of 50 students is 75. If the highest mark is 95 and lowest is 35, find the average excluding these two.",
      difficulty: "medium",
      solution: "Total marks = 50 × 75 = 3750. Sum excluding highest and lowest = 3750 - 95 - 35 = 3620. Average of 48 students = 3620 ÷ 48 = 75.416.",
      answer: "75.42 (approximately)",
      explanation: "Subtract the extreme values and divide by remaining count."
    },
    {
      id: "avg-14",
      title: "The average of 5 consecutive even numbers is 24. What is the largest number?",
      difficulty: "medium",
      solution: "Let numbers be x-4, x-2, x, x+2, x+4. Average = x = 24. Largest = x+4 = 28.",
      answer: "28",
      explanation: "In consecutive even numbers, the middle number is the average."
    },
    {
      id: "avg-15",
      title: "The average of 7 consecutive odd numbers is 35. What is the smallest number?",
      difficulty: "medium",
      solution: "Let numbers be x-6, x-4, x-2, x, x+2, x+4, x+6. Average = x = 35. Smallest = x-6 = 29.",
      answer: "29",
      explanation: "In consecutive odd numbers, the middle number is the average."
    },
    {
      id: "avg-16",
      title: "A student scores 85, 90, 88, 92, 87 in 5 subjects. What should he score in 6th subject to get an average of 90?",
      difficulty: "easy",
      solution: "Current sum = 85+90+88+92+87 = 442. Required total for 6 subjects = 6×90 = 540. 6th score = 540 - 442 = 98.",
      answer: "98",
      explanation: "Calculate required total and subtract current sum."
    },
    {
      id: "avg-17",
      title: "The average of 6 numbers is 12. If one number 8 is replaced by 16, what is the new average?",
      difficulty: "easy",
      solution: "Old sum = 6×12 = 72. New sum = 72 - 8 + 16 = 80. New average = 80 ÷ 6 = 13.33.",
      answer: "13.33",
      explanation: "Replace old number with new number and recalculate average."
    },
    {
      id: "avg-18",
      title: "The average of 8 numbers is 25. If two numbers 20 and 30 are replaced by 25 and 35, what is the new average?",
      difficulty: "medium",
      solution: "Old sum = 8×25 = 200. New sum = 200 - 20 - 30 + 25 + 35 = 200 - 50 + 60 = 210. New average = 210 ÷ 8 = 26.25.",
      answer: "26.25",
      explanation: "Replace old numbers with new numbers and recalculate."
    },
    {
      id: "avg-19",
      title: "Find the average of squares of first 10 natural numbers.",
      difficulty: "medium",
      solution: "Sum of squares = n(n+1)(2n+1)/6 = 10×11×21/6 = 2310/6 = 385. Average = 385 ÷ 10 = 38.5.",
      answer: "38.5",
      explanation: "Use formula for sum of squares of first n natural numbers."
    },
    {
      id: "avg-20",
      title: "The average of 10 numbers is 15. If 2 is added to each number, what is the new average?",
      difficulty: "easy",
      solution: "Adding 2 to each number adds 2 to the average. New average = 15 + 2 = 17.",
      answer: "17",
      explanation: "Adding a constant to each number adds that constant to the average."
    },
    {
      id: "avg-21",
      title: "The average of 12 numbers is 18. If each number is decreased by 3, what is the new average?",
      difficulty: "easy",
      solution: "Decreasing each number by 3 decreases the average by 3. New average = 18 - 3 = 15.",
      answer: "15",
      explanation: "Subtracting a constant from each number subtracts that constant from the average."
    },
    {
      id: "avg-22",
      title: "The average of 5 numbers is 20. If 10 is subtracted from each number, what is the new average?",
      difficulty: "easy",
      solution: "Subtracting 10 from each number subtracts 10 from the average. New average = 20 - 10 = 10.",
      answer: "10",
      explanation: "Subtracting a constant from each number subtracts that constant from the average."
    },
    {
      id: "avg-23",
      title: "The average of marks of 40 students is 60. 5 students leave with average 50. What is the average of remaining students?",
      difficulty: "medium",
      solution: "Total marks = 40×60 = 2400. Marks of leaving students = 5×50 = 250. Remaining marks = 2400 - 250 = 2150. Remaining students = 35. Average = 2150 ÷ 35 = 61.43.",
      answer: "61.43",
      explanation: "Subtract the marks of leaving students and divide by remaining count."
    },
    {
      id: "avg-24",
      title: "The average of 6 numbers is 25. If one number is 35, what is the average of the other 5 numbers?",
      difficulty: "easy",
      solution: "Total sum = 6×25 = 150. Sum of other 5 = 150 - 35 = 115. Average = 115 ÷ 5 = 23.",
      answer: "23",
      explanation: "Subtract the known number from total sum and divide by remaining count."
    }
  ]
};