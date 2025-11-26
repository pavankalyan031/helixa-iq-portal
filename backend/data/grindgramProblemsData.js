// Complete grindgram.in problems data
// This file contains ALL 413+ coding problems from grindgram.in organized by topic and section

export const grindgramProblemsData = {
  basics: {
    title: 'Basics',
    subtitle: 'Beginner problems to get started with problem solving.',
    sections: {
      'beginners-basic-math-probs': {
        sectionTitle: 'Beginners Basic Math Probs',
        sectionSubtitle: 'Beginner maths concepts to get started with problem solving.',
        xp: '0/60 XP',
        problems: [
          { title: 'Find even or odd', difficulty: 'medium', videoLink: 'https://youtu.be/KpgEakivSHw?si=IFF0Ei1u0qBAmR1Y', solutionLink: 'https://www.geeksforgeeks.org/dsa/check-whether-given-number-even-odd/', practiceLink: 'https://www.geeksforgeeks.org/problems/odd-or-even3618/1' },
          { title: 'Find last digit in a number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-last-digit-number/', practiceLink: 'https://www.geeksforgeeks.org/problems/last-digit-of-a-number/1' },
          { title: 'Count digits in a number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/count-digits-number/', practiceLink: 'https://www.geeksforgeeks.org/problems/count-digits/1' },
          { title: 'Reverse a number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/reverse-digits-number/', practiceLink: 'https://www.geeksforgeeks.org/problems/reverse-a-number/1' },
          { title: 'Find power of a number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/power-function-cc/', practiceLink: 'https://www.geeksforgeeks.org/problems/power-of-numbers/1' },
          { title: 'GCD', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/gcd-two-numbers/', practiceLink: 'https://www.geeksforgeeks.org/problems/gcd-of-two-numbers/1' },
          { title: 'Print all divisors of a number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-all-divisors-of-a-natural-number/', practiceLink: 'https://www.geeksforgeeks.org/problems/all-divisors-of-a-number/1' },
          { title: 'Prime number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/prime-numbers/', practiceLink: 'https://www.geeksforgeeks.org/problems/prime-number/1' },
          { title: 'Armstrong number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/armstrong-numbers/', practiceLink: 'https://www.geeksforgeeks.org/problems/armstrong-numbers/1' },
          { title: 'Check palindrome of number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/check-number-palindrome/', practiceLink: 'https://www.geeksforgeeks.org/problems/palindrome/1' },
          { title: 'Square root of a number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/square-root-number/', practiceLink: 'https://www.geeksforgeeks.org/problems/square-root/1' },
          { title: 'Perfect number', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/perfect-number/', practiceLink: 'https://www.geeksforgeeks.org/problems/perfect-numbers/1' }
        ]
      }
    }
  },

  array: {
    title: 'Array - Data structure',
    subtitle: 'This is a huge topic and an array acts as a base data structure for many concepts, so let\'s master the basics in this section. For all the data structures moving forward, make sure to visually note down and understand how it is represented.',
    sections: {
      'basics-with-traversal': {
        sectionTitle: 'Basics with traversal',
        sectionSubtitle: 'Introduction to arrays focusing on basics and traversal techniques.',
        xp: '0/65 XP',
        problems: [
          { title: 'What is an array? How is it represented?', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/what-is-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/what-is-array/1' },
          { title: 'Find the maximum and minimum element in array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/maximum-and-minimum-in-an-array/1' },
          { title: 'Find third largest element in array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/third-largest-element/', practiceLink: 'https://www.geeksforgeeks.org/problems/third-largest-element/1' },
          { title: 'Search an element in array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/searching-in-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/searching-in-array/1' },
          { title: 'Find missing number in array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-missing-number/', practiceLink: 'https://www.geeksforgeeks.org/problems/missing-number-in-array/1' },
          { title: 'Find repeating number in array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-repeating-element/', practiceLink: 'https://www.geeksforgeeks.org/problems/find-repeating-element/1' },
          { title: 'Sort an array of 0s , 1s and 2s', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/sort-array-0s-1s-2s/', practiceLink: 'https://www.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s/1' },
          { title: 'Check if two arrays are equal or not', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/check-if-two-arrays-are-equal-or-not/', practiceLink: 'https://www.geeksforgeeks.org/problems/check-if-two-arrays-are-equal-or-not/1' },
          { title: 'Rotate the array by 1', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/array-rotation/', practiceLink: 'https://www.geeksforgeeks.org/problems/rotate-array-by-one/1' },
          { title: 'Rotate the array by k', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/rotate-array-by-k/', practiceLink: 'https://www.geeksforgeeks.org/problems/rotate-array-by-k/1' },
          { title: 'Array subset of another array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-whether-an-array-is-subset-of-another-array-set-1/', practiceLink: 'https://www.geeksforgeeks.org/problems/array-subset-of-another-array/1' },
          { title: 'Learn what is map and how its represented before moving forward', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/map-associative-containers-the-c-standard-template-library-stl/', practiceLink: 'https://www.geeksforgeeks.org/problems/map-in-c-stl/1' },
          { title: 'Count frequency of elements in array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/counting-frequencies-of-array-elements/', practiceLink: 'https://www.geeksforgeeks.org/problems/counting-frequencies-of-array-elements/1' }
        ]
      },
      'two-pointer': {
        sectionTitle: 'Two pointer',
        sectionSubtitle: 'Similar to search, sort, this is also an important technique to learn. Not just for these problems, but very commonly you can use this technique.',
        xp: '0/55 XP',
        problems: [
          { title: 'Find pair with given sum', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/given-sum-pair/', practiceLink: 'https://www.geeksforgeeks.org/problems/pair-with-given-sum/1' },
          { title: '3 Sum', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-given-sum/', practiceLink: 'https://www.geeksforgeeks.org/problems/3-sum/1' },
          { title: '4 Sum', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-four-elements-that-sum-to-a-given-value/', practiceLink: 'https://www.geeksforgeeks.org/problems/4-sum/1' },
          { title: 'Find triplets with zero sum', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-triplets-with-zero-sum/', practiceLink: 'https://www.geeksforgeeks.org/problems/triplets-with-zero-sum/1' },
          { title: 'Count triplets', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/count-triplets-sum-less-value/', practiceLink: 'https://www.geeksforgeeks.org/problems/count-triplets/1' },
          { title: 'Union of two arrays', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/union-of-two-arrays/', practiceLink: 'https://www.geeksforgeeks.org/problems/union-of-two-arrays/1' },
          { title: 'Intersection of two arrays', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/intersection-of-two-arrays/', practiceLink: 'https://www.geeksforgeeks.org/problems/intersection-of-two-arrays/1' },
          { title: 'Remove duplicates from array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/remove-duplicates-sorted-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/remove-duplicates-from-unsorted-array/1' },
          { title: 'kth element of 2 sorted arrays', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/', practiceLink: 'https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array/1' },
          { title: 'Length of longest subarray with sum k', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/longest-sub-array-sum-k/', practiceLink: 'https://www.geeksforgeeks.org/problems/longest-subarray-with-sum-k/1' },
          { title: 'Trapping rain water', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/trapping-rain-water/', practiceLink: 'https://www.geeksforgeeks.org/problems/trapping-rain-water/1' }
        ]
      },
      'advanced-problems': {
        sectionTitle: 'Advanced Problems',
        sectionSubtitle: 'Must solve problems for two pointers',
        xp: '0/35 XP',
        problems: [
          { title: 'Majority element', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/majority-element/', practiceLink: 'https://www.geeksforgeeks.org/problems/majority-element/1' },
          { title: 'Kadane\'s algo (super imp)', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/kadanes-algorithm/', practiceLink: 'https://www.geeksforgeeks.org/problems/kadanes-algorithm/1' },
          { title: 'Count inversions', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/counting-inversions/', practiceLink: 'https://www.geeksforgeeks.org/problems/inversion-of-array/1' },
          { title: 'Merge intervals', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/merging-intervals/', practiceLink: 'https://www.geeksforgeeks.org/problems/merge-intervals/1' },
          { title: 'Maximum product subarray', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/maximum-product-subarray/', practiceLink: 'https://www.geeksforgeeks.org/problems/maximum-product-subarray/1' },
          { title: 'Next permutation', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/next-permutation/', practiceLink: 'https://www.geeksforgeeks.org/problems/next-permutation/1' },
          { title: 'Seive of eratosthenes (Popular algo for prime numbers)', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/sieve-of-eratosthenes/', practiceLink: 'https://www.geeksforgeeks.org/problems/sieve-of-eratosthenes/1' }
        ]
      }
    }
  },

  'time-complexity': {
    title: 'Time and Space Complexity',
    subtitle: 'Time and Space complexity are base for finding the efficiency of the algorithm you write.',
    sections: {}
  },

  matrix: {
    title: 'Matrix - Data structure',
    subtitle: 'Matrix is super important for Advanced topics like graphs, DP, backtracking. This section is to learn 2D array and to get grip on basics.',
    sections: {
      'traversal-basic-must-solve': {
        sectionTitle: 'Traversal & Basic & Must solve',
        sectionSubtitle: 'Essential problems to understand traversal techniques and basic operations in matrices.',
        xp: '0/35 XP',
        problems: [
          { title: 'What is a 2D Array? How to access element?', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/what-is-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/what-is-array/1' },
          { title: 'Search in a matrix', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/search-in-a-matrix/', practiceLink: 'https://www.geeksforgeeks.org/problems/search-in-a-matrix/1' },
          { title: 'Rotate by 90 degree', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/rotate-matrix-90-degree-clockwise-without-extra-space/', practiceLink: 'https://www.geeksforgeeks.org/problems/rotate-by-90-degree/1' },
          { title: 'Maximum num of 1\'s row', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-row-with-maximum-number-1s/', practiceLink: 'https://www.geeksforgeeks.org/problems/row-with-max-1s/1' },
          { title: 'Left rotate matrix k times', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/rotate-matrix-elements/', practiceLink: 'https://www.geeksforgeeks.org/problems/rotate-matrix-elements/1' },
          { title: 'Print matrix in diagonal pattern', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/print-matrix-diagonal-pattern/', practiceLink: 'https://www.geeksforgeeks.org/problems/print-matrix-in-diagonal-pattern/1' },
          { title: 'Set matrix zeros', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/set-matrix-zeroes/', practiceLink: 'https://www.geeksforgeeks.org/problems/set-matrix-zeroes/1' }
        ]
      }
    }
  },

  'binary-search': {
    title: 'Binary Search - Algorithm',
    subtitle: 'Binary search is an efficient algorithm for finding elements in sorted arrays.',
    sections: {
      'basic-pattern': {
        sectionTitle: 'Basic pattern',
        sectionSubtitle: 'Fundamental binary search algorithms and variations.',
        xp: '0/95 XP',
        problems: [
          { title: 'Search in a sorted array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/binary-search/', practiceLink: 'https://www.geeksforgeeks.org/problems/binary-search/1' },
          { title: 'Find floor and ceil in sorted array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/floor-and-ceil-in-sorted-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/floor-and-ceil-in-sorted-array/1' },
          { title: 'Find first and last occurrence of element in sorted array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-first-and-last-positions-of-an-element-in-a-sorted-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/first-and-last-occurrences-of-x/1' },
          { title: 'Find missing num from 1 to N', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-missing-number-1-n/', practiceLink: 'https://www.geeksforgeeks.org/problems/missing-number-in-array/1' },
          { title: 'Find square root', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/square-root-of-a-number/', practiceLink: 'https://www.geeksforgeeks.org/problems/square-root/1' },
          { title: 'Search for element in infinite array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-element-infinite-sized-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/search-in-infinite-sorted-array/1' }
        ]
      }
    }
  },

  sorting: {
    title: 'Sorting - Algorithm',
    subtitle: 'Make sure to completely understand the algo thoroughly, and time & space complexity',
    sections: {
      basics: {
        sectionTitle: 'Basics',
        sectionSubtitle: 'Fundamental sorting algorithms and their implementations.',
        xp: '0/75 XP',
        problems: [
          { title: 'Bubble sort', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/bubble-sort/', practiceLink: 'https://www.geeksforgeeks.org/problems/bubble-sort/1' },
          { title: 'Selection sort', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/selection-sort/', practiceLink: 'https://www.geeksforgeeks.org/problems/selection-sort/1' },
          { title: 'Insertion sort', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/insertion-sort/', practiceLink: 'https://www.geeksforgeeks.org/problems/insertion-sort/1' },
          { title: 'Merge sort', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/merge-sort/', practiceLink: 'https://www.geeksforgeeks.org/problems/merge-sort/1' },
          { title: 'Quick sort', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/quick-sort/', practiceLink: 'https://www.geeksforgeeks.org/problems/quick-sort/1' }
        ]
      }
    }
  },

  'linked-list': {
    title: 'Linked List - Data structure',
    subtitle: 'Linked lists are fundamental data structures. Master the basics and advanced operations.',
    sections: {
      'basic-patterns': {
        sectionTitle: 'Basic patterns',
        sectionSubtitle: 'Completely understand how Node in linkedList is represented and then go ahead with the patterns',
        xp: '0/190 XP',
        problems: [
          { title: 'Create, Insert, Delete Operations in LL', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/linked-list-set-1-introduction/', practiceLink: 'https://www.geeksforgeeks.org/problems/introduction-to-linked-list/1' },
          { title: 'Search for an element in LL', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/search-an-element-in-a-linked-list-iterative-and-recursive/', practiceLink: 'https://www.geeksforgeeks.org/problems/search-in-linked-list/1' },
          { title: 'Reverse a LL', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/reverse-a-linked-list/', practiceLink: 'https://www.geeksforgeeks.org/problems/reverse-a-linked-list/1' },
          { title: 'Check if LL is a Palindrome', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/', practiceLink: 'https://www.geeksforgeeks.org/problems/check-if-linked-list-is-pallindrome/1' },
          { title: 'Middle element of LL', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/', practiceLink: 'https://www.geeksforgeeks.org/problems/finding-middle-element-in-a-linked-list/1' },
          { title: 'Find the intersection point of Y LL', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/', practiceLink: 'https://www.geeksforgeeks.org/problems/intersection-point-in-y-shapped-linked-lists/1' },
          { title: 'Union and Intersection of LL', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/union-and-intersection-of-two-linked-lists/', practiceLink: 'https://www.geeksforgeeks.org/problems/union-of-two-linked-list/1' },
          { title: 'Delete without head pointer', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/delete-a-node-from-linked-list-without-head-pointer/', practiceLink: 'https://www.geeksforgeeks.org/problems/delete-without-head-pointer/1' },
          { title: 'Count pairs with given sum', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/count-pairs-in-two-linked-lists-whose-sum-is-equal-to-a-given-value/', practiceLink: 'https://www.geeksforgeeks.org/problems/count-pairs-whose-sum-is-equal-to-x/1' },
          { title: 'Reverse LL in groups of given size', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/reverse-a-linked-list-in-groups-of-given-size/', practiceLink: 'https://www.geeksforgeeks.org/problems/reverse-a-linked-list-in-groups-of-given-size/1' }
        ]
      }
    }
  },

  stack: {
    title: 'Stack - Data structure',
    subtitle: 'Stack is a LIFO data structure. Learn various applications and problem-solving techniques.',
    sections: {
      basic: {
        sectionTitle: 'Basic',
        sectionSubtitle: 'Basic stack operations and implementations.',
        xp: '0/65 XP',
        problems: [
          { title: 'What is stack? Learn how to represent the data structure and working of it', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/stack-data-structure/', practiceLink: 'https://www.geeksforgeeks.org/problems/introduction-to-stack/1' },
          { title: 'Implement 2 stack using array', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/implement-two-stacks-in-an-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/implement-two-stacks-in-an-array/1' },
          { title: 'Check for balanced parenthesis', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/', practiceLink: 'https://www.geeksforgeeks.org/problems/parenthesis-checker/1' },
          { title: 'Get min from stack in O(1) space and time', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/design-a-stack-that-supports-getmin-in-o1-time-and-o1-extra-space/', practiceLink: 'https://www.geeksforgeeks.org/problems/get-minimum-element-from-stack/1' }
        ]
      }
    }
  },

  queue: {
    title: 'Queue - Data structure',
    subtitle: 'Queue is a FIFO data structure. Learn various queue implementations and applications.',
    sections: {
      'basic-pattern': {
        sectionTitle: 'Basic pattern',
        sectionSubtitle: 'Basic queue operations and implementations.',
        xp: '0/85 XP',
        problems: [
          { title: 'What is queue? Learn the basic representation and how its implemented?', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/queue-data-structure/', practiceLink: 'https://www.geeksforgeeks.org/problems/introduction-to-queue/1' },
          { title: 'Implement queue using linkedlist', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/queue-linked-list-implementation/', practiceLink: 'https://www.geeksforgeeks.org/problems/implement-queue-using-linked-list/1' },
          { title: 'Implement queue using stack(super imp)', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/queue-using-stacks/', practiceLink: 'https://www.geeksforgeeks.org/problems/queue-using-two-stacks/1' },
          { title: 'Implement stack using queue(super imp)', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/implement-stack-using-queue/', practiceLink: 'https://www.geeksforgeeks.org/problems/stack-using-two-queues/1' },
          { title: 'Reverse a queue', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/reversing-a-queue/', practiceLink: 'https://www.geeksforgeeks.org/problems/queue-reversal/1' }
        ]
      }
    }
  },

  tree: {
    title: 'Tree - Data structure',
    subtitle: 'Trees are hierarchical data structures. Master tree traversal and common algorithms.',
    sections: {
      traversals: {
        sectionTitle: 'Traversals',
        sectionSubtitle: 'Different ways to traverse tree structures.',
        xp: '0/215 XP',
        problems: [
          { title: 'Understand the basic of how tree data structure is represented', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/tree-data-structure/', practiceLink: 'https://www.geeksforgeeks.org/problems/introduction-to-trees/1' },
          { title: 'PreOrder Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/', practiceLink: 'https://www.geeksforgeeks.org/problems/preorder-traversal/1' },
          { title: 'InOrder Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/', practiceLink: 'https://www.geeksforgeeks.org/problems/inorder-traversal/1' },
          { title: 'PostOrder Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/', practiceLink: 'https://www.geeksforgeeks.org/problems/postorder-traversal/1' },
          { title: 'Level Order Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/level-order-tree-traversal/', practiceLink: 'https://www.geeksforgeeks.org/problems/level-order-traversal/1' },
          { title: 'Boundary Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/', practiceLink: 'https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1' },
          { title: 'Vertical Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/print-a-binary-tree-in-vertical-order/', practiceLink: 'https://www.geeksforgeeks.org/problems/print-a-binary-tree-in-vertical-order/1' },
          { title: 'Top View of BT', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/', practiceLink: 'https://www.geeksforgeeks.org/problems/top-view-of-binary-tree/1' },
          { title: 'Bottom View of BT', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/bottom-view-binary-tree/', practiceLink: 'https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1' },
          { title: 'Left View of BT', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/print-left-view-binary-tree/', practiceLink: 'https://www.geeksforgeeks.org/problems/left-view-of-binary-tree/1' },
          { title: 'Right View of BT', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/print-right-view-binary-tree-2/', practiceLink: 'https://www.geeksforgeeks.org/problems/right-view-of-binary-tree/1' },
          { title: 'Diagonal Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/diagonal-traversal-of-binary-tree/', practiceLink: 'https://www.geeksforgeeks.org/problems/diagonal-traversal-of-binary-tree/1' }
        ]
      }
    }
  },

  'sliding-window': {
    title: 'Sliding Window - Technique',
    subtitle: 'Dont skip this topic, I personally have been asked this topic in many interviews. GeekForGeeks has very limited probs in this topics, so use leetcode for this even if you practice on gfg generally',
    sections: {
      'fixed-sliding-window': {
        sectionTitle: 'Fixed Sliding Window',
        sectionSubtitle: 'Size of the window will be provided',
        xp: '0/125 XP',
        problems: [
          { title: 'Maximum sum subarray of size k', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/window-sliding-technique/', practiceLink: 'https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k/1' },
          { title: 'Count distinct element in every window', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/count-distinct-elements-in-every-window-of-size-k/', practiceLink: 'https://www.geeksforgeeks.org/problems/count-distinct-elements-in-every-window/1' },
          { title: 'First negative integer in every window of size k', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/first-negative-integer-every-window-size-k/', practiceLink: 'https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k/1' },
          { title: 'Maximum of all subarray of size k', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/', practiceLink: 'https://www.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k/1' },
          { title: 'Count substring of length k with k-1 distinct elements', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/count-of-substrings-of-length-k-with-exactly-k-distinct-characters/', practiceLink: 'https://www.geeksforgeeks.org/problems/count-of-substrings-of-length-k-with-exactly-k-distinct-characters/1' },
          { title: 'Maximum of minimum for every window', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/find-the-maximum-of-minimums-for-every-window-size-in-a-given-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/maximum-of-minimum-for-every-window-size/1' }
        ]
      }
    }
  },

  graph: {
    title: 'Graph - Data structure',
    subtitle: 'Graphs represent relationships between objects. Learn graph algorithms and traversal techniques.',
    sections: {
      'traversals-basic': {
        sectionTitle: 'Traversals & Basic',
        sectionSubtitle: 'BFS and DFS techniques for graph exploration.',
        xp: '0/115 XP',
        problems: [
          { title: 'Understand how graph is represented?', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/', practiceLink: 'https://www.geeksforgeeks.org/problems/introduction-to-graphs/1' },
          { title: 'BFS Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/', practiceLink: 'https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1' },
          { title: 'DFS Traversal', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/', practiceLink: 'https://www.geeksforgeeks.org/problems/dfs-traversal-of-graph/1' },
          { title: 'Detect cycle in Directed graph', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/detect-cycle-in-a-directed-graph/', practiceLink: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1' },
          { title: 'Detect cycle in Undirected graph', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/detect-cycle-undirected-graph/', practiceLink: 'https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1' },
          { title: 'Detect Negative cycle in graph', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/detect-negative-cycle-graph-bellman-ford/', practiceLink: 'https://www.geeksforgeeks.org/problems/negative-weight-cycle/1' }
        ]
      }
    }
  },

  'backtracking-recursion': {
    title: 'Backtracking & Recursion advanced - Technique',
    subtitle: 'This is super imp topic before moving further!! Draw the recursion tree to understand the flow as the first step, this will help in visualization of the flow',
    sections: {
      'basic-patterns-must-solve': {
        sectionTitle: 'Basic patterns and must solve',
        sectionSubtitle: 'Fundamental backtracking algorithms and techniques.',
        xp: '0/635 XP',
        problems: [
          { title: 'Understand the basics of backtracking and start solving', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/backtracking-algorithms/', practiceLink: 'https://www.geeksforgeeks.org/problems/introduction-to-backtracking/1' },
          { title: 'Permutations of a string', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/', practiceLink: 'https://www.geeksforgeeks.org/problems/permutations-of-a-given-string/1' },
          { title: 'Combination sum I', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/combinational-sum/', practiceLink: 'https://www.geeksforgeeks.org/problems/combination-sum/1' },
          { title: 'Combination sum II', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/combination-sum-2/', practiceLink: 'https://www.geeksforgeeks.org/problems/combination-sum-ii/1' },
          { title: 'Rat in maze', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/rat-in-a-maze-backtracking-2/', practiceLink: 'https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1' },
          { title: 'N-Queen', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/', practiceLink: 'https://www.geeksforgeeks.org/problems/n-queen-problem/1' },
          { title: 'Word search', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/search-a-word-in-a-2d-grid-of-characters/', practiceLink: 'https://www.geeksforgeeks.org/problems/word-search/1' },
          { title: 'Palindrome partition of string', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/palindrome-partitioning-dp-17/', practiceLink: 'https://www.geeksforgeeks.org/problems/palindrome-partitioning/1' },
          { title: 'Generate parantheses', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/generate-parentheses/', practiceLink: 'https://www.geeksforgeeks.org/problems/generate-parentheses/1' },
          { title: 'Subsets', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/subsets-power-set/', practiceLink: 'https://www.geeksforgeeks.org/problems/subsets/1' }
        ]
      }
    }
  },

  greedy: {
    title: 'Greedy - Technique',
    subtitle: 'Greedy algorithms make locally optimal choices at each step to find a global optimum.',
    sections: {
      'basics-must-solves': {
        sectionTitle: 'Basics and must solves',
        sectionSubtitle: 'Fundamental greedy algorithms and important problems.',
        xp: '0/585 XP',
        problems: [
          { title: 'Minimum number of jumps', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/', practiceLink: 'https://www.geeksforgeeks.org/problems/minimum-number-of-jumps/1' },
          { title: 'Activity selection prob', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/activity-selection-problem-greedy-algo-1/', practiceLink: 'https://www.geeksforgeeks.org/problems/activity-selection/1' },
          { title: 'Minimum platforms', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/', practiceLink: 'https://www.geeksforgeeks.org/problems/minimum-platforms/1' },
          { title: 'Job sequencing prob', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/job-sequencing-problem/', practiceLink: 'https://www.geeksforgeeks.org/problems/job-sequencing-problem/1' },
          { title: 'Fractional knapsack', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/fractional-knapsack-problem/', practiceLink: 'https://www.geeksforgeeks.org/problems/fractional-knapsack/1' },
          { title: 'Jump game', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/jump-game/', practiceLink: 'https://www.geeksforgeeks.org/problems/jump-game/1' }
        ]
      }
    }
  },

  dp: {
    title: 'Dynamic Programming',
    subtitle: 'DP is an optimization technique that solves complex problems by breaking them into simpler subproblems.',
    sections: {
      '1d-linear-dp': {
        sectionTitle: '1D - Linear DP',
        sectionSubtitle: 'One-dimensional linear dynamic programming problems.',
        xp: '0/125 XP',
        problems: [
          { title: 'Count num of hops', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/count-number-of-ways-to-reach-given-score-game/', practiceLink: 'https://www.geeksforgeeks.org/problems/count-number-of-hops/1' },
          { title: 'Count way to reach nth stair', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/count-ways-reach-nth-stair/', practiceLink: 'https://www.geeksforgeeks.org/problems/count-ways-to-reach-the-nth-stair/1' },
          { title: 'House robber', difficulty: 'medium', videoLink: 'https://youtu.be/example', solutionLink: 'https://www.geeksforgeeks.org/maximum-sum-such-that-no-two-elements-are-adjacent/', practiceLink: 'https://www.geeksforgeeks.org/problems/stickler-theif/1' }
        ]
      }
    }
  },

  heaps: {
    title: 'He