import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const PythonDSAVideoPlayer = () => {
  const navigate = useNavigate()
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [watchedVideos, setWatchedVideos] = useState(new Set([0])) // Track watched videos by index
  const [player, setPlayer] = useState(null)
  const playerRef = useRef(null)

  // Load YouTube IFrame Player API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        createPlayer()
      }
    } else {
      createPlayer()
    }

    function createPlayer() {
      const newPlayer = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        playerVars: {
          listType: 'playlist',
          list: 'PLhR2IpV1b2FwWwviBHRrR118YAaSlyhTU',
          index: currentVideoIndex,
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event) => {
            console.log('YouTube player ready')
            setPlayer(event.target)
            // Load the specific video index
            event.target.playVideoAt(currentVideoIndex)
          },
          onStateChange: (event) => {
            // Mark video as watched when it starts playing
            if (event.data === window.YT.PlayerState.PLAYING) {
              setWatchedVideos(prev => new Set([...prev, currentVideoIndex]))
            }
          }
        }
      })
    }
  }, [])

  // Complete DSA with Python playlist videos
  const videos = [
    { title: "DSA in Python - Extraction of Digits Using Loops - Part 5 [Hindi] | Code & Debug", duration: "6:14" },
    { title: "DSA in Python Course - Count the Number of Digits in an Integer - Part 6 [Hindi] | Code & Debug", duration: "8:32" },
    { title: "DSA in Python Course - Check if a Number is Palindrome or Not - Part 7 [Hindi] | Code & Debug", duration: "9:31" },
    { title: "DSA in Python Course - Armstrong Number Explained - Part 8 [Hindi] | Code & Debug", duration: "8:51" },
    { title: "DSA in Python Course - Print All Factors of a Given Number - Part 9 [Hindi] | Code & Debug", duration: "20:28" },
    { title: "DSA Python Course 2025 - Store Frequency in Dictionary - Part 10 [Hindi] | Code & Debug", duration: "16:50" },
    { title: "DSA Python Course 2025 - Introduction to Hashing in Python - Part 11 [Hindi] | Code & Debug", duration: "27:47" },
    { title: "DSA Python Course 2025 - Introduction to Recursion Concept - Part 12 [Hindi] | Code & Debug", duration: "25:03" },
    { title: "DSA Python Course 2025 - Recursion Using Parameters - Part 13 [Hindi] | Code & Debug", duration: "18:31" },
    { title: "DSA Python Course 2025 - What is Functional Recursion? - Part 14 [Hindi] | Code & Debug", duration: "16:18" },
    { title: "DSA Python Course 2025 - Find the Factorial of a Number - Part 15 [Hindi] | Code & Debug", duration: "9:06" },
    { title: "DSA in Python Course - Reverse an Array Using Recursion - Part 16 [Hindi] | Code & Debug", duration: "15:00" },
    { title: "DSA in Python Course- Check if a String is Palindrome or Not - Part 17 [Hindi] | Code & Debug", duration: "20:57" },
    { title: "DSA in Python Course - Find the Fibonacci Number - Part 18 [Hindi] | Code & Debug", duration: "11:18" },
    { title: "DSA in Python Course - Selection Sort in Python - Part 19 [Hindi] | Code & Debug", duration: "13:13" },
    { title: "DSA in Python Course - Bubble Sort in Python - Part 20 [Hindi] | Code & Debug", duration: "17:43" },
    { title: "DSA in Python Course - Insertion Sort in Python - Part 21 [Hindi] | Code & Debug", duration: "17:53" },
    { title: "DSA in Python Course - Merge Sort in Python - Part 22 [Hindi] | Code & Debug", duration: "31:56" },
    { title: "DSA in Python Course - Quick Sort Algorithm in Python - Part 23 [Hindi] | Code & Debug", duration: "29:34" },
    { title: "DSA in Python Course - Find the Largest Element in an Array - Part 24 [Hindi] | Code & Debug", duration: "9:49" },
    { title: "DSA in Python Course - Find the Second Largest Element in an Array Without Sorting - Part 25", duration: "15:02" },
    { title: "DSA in Python Course - Check if an Array is Sorted - Part 26 [Hindi] | Code & Debug", duration: "5:22" },
    { title: "DSA in Python Course - Remove Duplicates from a Sorted Array - Part 27 [Hindi] | Code & Debug", duration: "20:05" },
    { title: "DSA in Python Course - Right Rotate an Array by One Place - Part 28 [Hindi] | Code & Debug", duration: "9:32" },
    { title: "DSA in Python Course - Leetcode 189: Right Rotate an Array by K Places - Part 29 [Hindi]", duration: "22:17" },
    { title: "DSA in Python Course - Leetcode 283: Move Zeros to the End of the List - Part 30 [Hindi]", duration: "18:14" },
    { title: "DSA in Python Course - Implementing Linear Search - Part 31 [Hindi] | Code & Debug", duration: "4:53" },
    { title: "DSA in Python Course - Merge 2 Sorted Arrays Without Duplicates - Part 32 [Hindi] | Code & Debug", duration: "14:43" },
    { title: "DSA in Python Course - Leetcode 268: Find Missing Number in an Array - Part 33 [Hindi]", duration: "14:44" },
    { title: "DSA in Python Course - Leetcode 485: Max Consecutive Ones - Part 34 [Hindi] | Code & Debug", duration: "9:46" },
    { title: "DSA in Python Course - Leetcode 1: Two Sum Problem - Part 35 [Hindi] | Code & Debug", duration: "16:44" },
    { title: "DSA in Python Course - Leetcode 53: Find the Maximum Subarray Sum - Part 36 [Hindi] | Code & Debug", duration: "19:40" },
    { title: "DSA in Python Course - Leetcode 121: Best Time to Buy and Sell Stock - Part 37 [Hindi]", duration: "17:17" },
    { title: "DSA in Python Course - Leetcode 2149: Rearrange Array Elements by Sign - Part 38 [Hindi]", duration: "18:17" },
    { title: "DSA in Python Course - Leetcode 128: Longest Consecutive Sequence - Part 39 [Hindi] | Code & Debug", duration: "29:53" },
    { title: "DSA in Python Course - Learn About 2D List or Matrix - Part 40 [Hindi] | Code & Debug", duration: "25:53" },
    { title: "DSA in Python Course - Leetcode 73: Set Matrix Zeros - Part 41 [Hindi] | Code & Debug", duration: "30:18" },
    { title: "DSA in Python Course - Leetcode 48: Rotate Matrix by 90 Degrees - Part 42 [Hindi] | Code & Debug", duration: "26:58" },
    { title: "DSA in Python Course - Leetcode 54: Print the Matrix in Spiral Order - Part 43 [Hindi]", duration: "21:40" },
    { title: "DSA in Python Course - Leetcode 15: 3Sum Problem - Part 44 [Hindi]", duration: "39:46" },
    { title: "DSA in Python Course - Leetcode 18: 4Sum Problem - Part 45 [Hindi] | Code & Debug", duration: "39:10" },
    { title: "DSA in Python Course - Introduction to Binary Search - Part 46 [Hindi] | Code & Debug", duration: "35:06" },
    { title: "DSA in Python Course - Implementation of Lower and Upper Bound - Part 47 [Hindi] | Code & Debug", duration: "22:39" },
    { title: "DSA in Python - Leetcode 35: Search Insert Position | Binary Search Optimization - Part 48 [Hindi]", duration: "7:24" },
    { title: "DSA in Python Course - Floor & Ceil in Sorted Array | Binary Search Approach - Part 49 [Hindi]", duration: "10:50" },
    { title: "DSA in Python - Find First & Last Occurrence in Sorted Array | Binary Search - Part 50 [Hindi]", duration: "16:10" },
    { title: "DSA in Python Course - Count Occurrences in Sorted Array | Binary Search Approach - Part 51 [Hindi]", duration: "10:24" },
    { title: "DSA in Python Course - Search in Rotated Sorted Array | Binary Search Approach - Part 52 [Hindi]", duration: "18:29" },
    { title: "DSA in Python - Search in Rotated Sorted Array II | Binary Search with Duplicate - Part 53 [Hindi]", duration: "12:19" },
    { title: "DSA in Python Course - Find Minimum in Rotated Sorted Array | Binary Search - Part 54 [Hindi]", duration: "16:57" },
    { title: "Introduction to Linked Lists in Python | Real-Life Example | Memory Allocation - Part 55 [Hindi]", duration: "11:08" },
    { title: "Singly Linked List Operations | Traversal, Insertion, Deletion, Append in Python - Part 56 [Hindi]", duration: "41:11" },
    { title: "DSA in Python - Leetcode 876: Middle of the Linked List | Tortoise-Hare Approach - Part 57 [Hindi]", duration: "15:17" },
    { title: "DSA in Python Course - Reverse a Linked List | Iterative Approach - Part 58 [Hindi]", duration: "19:21" },
    { title: "DSA in Python Course - Leetcode 141: Linked List Cycle | Floyd's Cycle Detection - Part 59 [Hindi]", duration: "17:34" },
    { title: "DSA in Python - Leetcode 142: Linked List Cycle II | Find the Cycle Starting Point - Part 60 [Hindi]", duration: "18:00" },
    { title: "DSA in Python Course - Find Length of Loop in Linked List | Floyd Cycle Detection Algo - Part 61", duration: "16:55" },
    { title: "DSA in Python Course - Leetcode 328: Odd Even Linked List | Rearrange Nodes | Part 62 [Hindi]", duration: "23:21" },
    { title: "DSA Python - Leetcode 19: Remove Nth Node from End of List | Two Pointer Approach - Part 63 [Hindi]", duration: "20:04" },
    { title: "DSA in Python Course - What is a Doubly Linked List? | Real Life Example | Part 162 [Hindi]", duration: "4:51" },
    { title: "DSA in Python - Doubly Linked List Methods Explained with Code | Insert, Delete, Traverse | Part 163", duration: "23:27" },
    { title: "DSA in Python Course - Reverse a Doubly Linked List | GFG Practice | Part 164 [Hindi]", duration: "17:34" },
    { title: "DSA in Python - Delete All Occurrences of a Key in Doubly Linked List | GFG Practice | Part 165", duration: "14:41" },
    { title: "DSA in Python - Find Pairs with Given Sum in Doubly Linked List | Brute to Optimal | GFG | Part 166", duration: "26:24" },
    { title: "DSA in Python Course - Remove Duplicates from a Sorted Doubly Linked List | GFG Practice | Part 167", duration: "9:32" },
    { title: "DSA in Python - Introduction to Bit Manipulation | AND, OR, XOR, NOT, Shift Operations - Part 64", duration: "33:43" },
    { title: "DSA in Python - Bit Manipulation Basics | Swapping, Setting, Clearing, Toggling Bits - Part 65", duration: "33:01" },
    { title: "DSA in Python - Minimum Bit Flips to Convert Number | Bit Manipulation | Leetcode 2220 - Part 66", duration: "9:42" },
    { title: "DSA in Python - Single Number | Bit Manipulation & XOR Trick | Leetcode 136 - Part 67 [Hindi]", duration: "8:13" },
    { title: "DSA in Python - Generate Subsets Using Bit Manipulation | Power Set | Leetcode 78 - Part 68 [Hindi]", duration: "15:10" },
    { title: "DSA in Python - Advanced Recursion | Generate All Subsequences Using Recursion - Part 69 [Hindi]", duration: "35:58" },
    { title: "DSA in Python - Advanced Recursion | Generate Subsequences with Sum K | Backtracking - Part 70", duration: "33:11" },
    { title: "DSA in Python Course - Backtracking | Check if a Subsequence with Sum = K Exists | Part 71 [Hindi]", duration: "22:41" },
    { title: "DSA in Python - Advanced Recursion | Count All Subsequences with Sum K | Backtracking - Part 72", duration: "24:15" },
    { title: "DSA in Python - Generate All Binary Strings | Backtracking & Recursion | GFG - Part 73 [Hindi]", duration: "24:15" },
    { title: "DSA in Python - Generate Parentheses | Recursion & Backtracking | Leetcode 22 - Part 74 [Hindi]", duration: "25:42" },
    { title: "DSA in Python - Combination Sum | Recursion & Backtracking | Leetcode 39 - Part 75 [Hindi]", duration: "24:37" },
    { title: "DSA in Python - Combination Sum II | Recursion & Backtracking | Leetcode 40 - Part 76 [Hindi]", duration: "33:22" },
    { title: "DSA in Python - Subset Sums | Recursion & Backtracking | GFG Problem - Part 77 [Hindi]", duration: "16:26" },
    { title: "DSA in Python - Combination Sum III | Recursion & Backtracking | Leetcode 216 - Part 78 [Hindi]", duration: "21:58" },
    { title: "DSA in Python - Letter Combinations of a Phone Number | Backtracking | Leetcode 17 - Part 79 [Hindi]", duration: "20:56" },
    { title: "DSA in Python - N-Queens Problem | Recursion & Backtracking | Leetcode 51 - Part 80 [Hindi]", duration: "48:28" },
    { title: "DSA in Python - Rat in a Maze | Recursion & Backtracking | GFG Problem - Part 81 [Hindi]", duration: "29:49" },
    { title: "DSA in Python - Implement Stack using Arrays | Stack Data Structure Explained - Part 82 [Hindi]", duration: "21:12" },
    { title: "DSA in Python - Implement Queue using Arrays | Queue Data Structure Explained - Part 83 [Hindi]", duration: "14:35" },
    { title: "DSA in Python - Understanding Deque in Python | append, popleft, appendleft, pop | Part 84 [Hindi]", duration: "9:04" },
    { title: "DSA in Python - Implement Stack using Queue | Two Approaches Explained | Part 85 [Hindi]", duration: "13:05" },
    { title: "DSA in Python - Implement Queue using Stack | Using Two Stacks Explained | Part 86 [Hindi]", duration: "11:51" },
    { title: "DSA in Python Course - Implement Stack & Queue using Doubly Linked List - Part 87 [Hindi]", duration: "8:55" },
    { title: "DSA in Python Course - Valid Parentheses | Stack-Based Approach | Leetcode 20 - Part 88 [Hindi]", duration: "16:22" },
    { title: "DSA in Python Course - Min Stack | Get Minimum in O(1) using Stack | Leetcode 155 - Part 89 [Hindi]", duration: "11:11" },
    { title: "DSA in Python Course - Infix, Postfix & Prefix | Conversions Explained with Stack - Part 90 [Hindi]", duration: "45:40" },
    { title: "DSA in Python - Next Greater Element | Monotonic Stack Approach | GFG Problem - Part 91 [Hindi]", duration: "20:08" },
    { title: "DSA Python - Next Greater Element II | Circular Array using Stack | Leetcode 503 - Part 92 [Hindi]", duration: "12:47" },
    { title: "DSA in Python - Asteroid Collision | Stack Simulation | Leetcode 735 - Part 93 [Hindi]", duration: "18:14" },
    { title: "DSA in Python - Longest Substring Without Repeating Characters | Leetcode 3 - Part 94 [Hindi]", duration: "29:03" },
    { title: "DSA in Python - Max Consecutive Ones III | Sliding Window Approach | Leetcode 1004 - Part 95 [Hindi]", duration: "28:46" },
    { title: "DSA in Python - Fruit Into Baskets | Brute, Better & Optimal | Leetcode 904 - Part 96 [Hindi]", duration: "30:45" },
    { title: "DSA in Python Course - Maximum Points You Can Obtain from Cards | Leetcode 1423 - Part 97 [Hindi]", duration: "11:56" },
    { title: "DSA in Python - Assign Cookies | Greedy Optimal O(nlogn) Solution | Leetcode 455 - Part 98 [Hindi]", duration: "12:17" },
    { title: "DSA in Python - Fractional Knapsack | Greedy + Sorting Optimal Solution | GFG - Part 99 [Hindi]", duration: "20:08" },
    { title: "DSA in Python - Minimum Number of Coins | Greedy Optimal Solution | GFG - Part 100 [Hindi]", duration: "9:22" },
    { title: "DSA in Python - Lemonade Change | Greedy Solution | Leetcode 860 - Part 101 [Hindi]", duration: "11:13" },
    { title: "DSA in Python - N Meetings in One Room | Greedy Scheduling Optimal Solution | GFG - Part 102 [Hindi]", duration: "15:42" },
    { title: "DSA in Python - Jump Game | Optimal Greedy | Leetcode 55 - Part 103 [Hindi]", duration: "9:46" },
    { title: "DSA in Python - Jump Game II | Recursion to Greedy (All Approaches) | Leetcode 45 - Part 104 [Hindi]", duration: "21:13" },
    { title: "DSAPython - Minimum Platforms Required | Brute Force to Optimal Two-Pointer | GFG - Part 105 [Hindi]", duration: "18:39" },
    { title: "DSA Python - Introduction to Binary Trees | Concepts, Terminology, Types Explained | Part 106[Hindi]", duration: "16:38" },
    { title: "DSA in Python - Binary Tree Implementation | Node Class & Tree Construction | Part 107 [Hindi]", duration: "8:45" },
    { title: "DSA in Python - DFS in Binary Trees | Preorder, Inorder, Postorder Traversal - Part 108 [Hindi]", duration: "23:31" },
    { title: "DSA in Python - Level Order Traversal (BFS) in Binary Tree | Using Deque | Part 109 [Hindi]", duration: "11:39" },
    { title: "DSA in Python - Height of Binary Tree | DFS & BFS Approaches | Leetcode 104 - Part 110 [Hindi]", duration: "18:39" },
    { title: "DSA in Python - Diameter of Binary Tree | Optimized DFS Approach | Leetcode 543 - Part 111 [Hindi]", duration: "11:22" },
    { title: "DSA Python 2025 - Check if Binary Tree is Height Balanced | Optimized DFS - Part 112 [Hindi]", duration: "10:13" },
    { title: "DSA Python - Binary Tree Maximum Path Sum | Optimized DFS Approach | Leetcode 124 - Part 113 [Hindi]", duration: "13:53" },
    { title: "DSA in Python - Top View of Binary Tree | Vertical Line BFS + Hashmap | GFG - Part 114 [Hindi]", duration: "14:55" },
    { title: "DSA in Python - Bottom View of Binary Tree | BFS + Line Mapping | GFG - Part 115 [Hindi]", duration: "8:36" },
    { title: "DSA in Python - Right Side View of Binary Tree | BFS + Reverse DFS | Leetcode 199 - Part 116 [Hindi]", duration: "19:24" },
    { title: "DSA Python 2025 - Introduction to Graphs | Nodes, Edges, Cycles, Weighted Graphs - Part 117 [Hindi]", duration: "15:55" },
    { title: "DSA Python - Graph Representation in Python | Adjacency Matrix, List & Dictionary - Part 118 [Hindi]", duration: "22:44" },
    { title: "DSA with Python - What Are Connected Components in Graphs? - Part 119 [Hindi]", duration: "6:40" },
    { title: "DSA Python - Breadth First Search (BFS) in Graph | Queue + Visited Logic | GFG - Part 120 [Hindi]", duration: "21:34" },
    { title: "DSA Python - Depth First Search (DFS) in Graph | Recursion + Visited Set | GFG - Part 121 [Hindi]", duration: "19:11" },
    { title: "DSA with Python - Rotting Oranges | BFS Grid Traversal | Leetcode 994 - Part 122 [Hindi]", duration: "29:28" },
    { title: "DSA with Python - Flood Fill Algorithm | DFS & BFS Grid Coloring | Leetcode 733 - Part 123 [Hindi]", duration: "34:03" },
    { title: "DSA in Python - Detect Cycle in Undirected Graph | BFS with Parent Tracking | GFG - Part 124 [Hindi]", duration: "21:13" },
    { title: "DSA Python 2025 - Detect Cycle in Undirected Graph | DFS with Parent Check | GFG - Part 125 [Hindi]", duration: "15:24" },
    { title: "DSA Python - 01 Matrix | Multi-Source BFS for Shortest Distance | Leetcode 542 - Part 126 [Hindi]", duration: "25:42" },
    { title: "DSA Python 2025 - Surrounded Regions | Boundary DFS Grid Fill | Leetcode 130 - Part 127 [Hindi]", duration: "29:08" },
    { title: "DSA Python - Number of Enclaves | Boundary BFS Grid Traversal | Leetcode 1020 - Part 128 [Hindi]", duration: "25:23" },
    { title: "DSA Python 2025 - Word Ladder | BFS for Shortest Transformation | Leetcode 127 - Part 129 [Hindi]", duration: "35:06" },
    { title: "DSA Python 2025 - Word Ladder II | All Shortest Paths Using BFS | Leetcode 126 - Part 130 [Hindi]", duration: "23:06" },
    { title: "DSA Python 2025 - Number of Islands | DFS & BFS Grid Traversal | Leetcode 200 - Part 131 [Hindi]", duration: "25:18" },
    { title: "DSA Python 2025 - Count Distinct Islands Using DFS | Shape Normalization | GFG - Part 132 [Hindi]", duration: "30:40" },
    { title: "DSA Python 2025 - Check If Graph is Bipartite Using DFS | Leetcode 785 - Part 133 [Hindi]", duration: "23:42" },
    { title: "DSA Python - Topological Sort Using DFS | GFG Problem | Directed Acyclic Graph - Part 135 [Hindi]", duration: "17:10" },
    { title: "DSA Python - Detect Cycle in Directed Graph | GFG Problem | DFS + Path Visited - Part 134 [Hindi]", duration: "23:13" },
    { title: "DSA Python - Topological Sort using Kahn's Algorithm | GFG Problem | BFS on DAG - Part 136 [Hindi]", duration: "15:24" },
    { title: "DSA Python - Detect Cycle in Directed Graph using Kahn's Algorithm | GFG Problem - Part 137 [Hindi]", duration: "6:13" },
    { title: "DSA Python 2025 - Course Schedule I & II | Kahn's Algo | Leetcode 207 & 210 - Part 138 [Hindi]", duration: "11:59" },
    { title: "DSA Python - Eventual Safe States | BFS | Reverse Graph + Topo Sort | LC 802 - Part 139 [Hindi]", duration: "19:57" },
    { title: "DSA Python - Eventual Safe States | Detect Terminal Nodes | LC 802 Explained - Part 140 [Hindi]", duration: "18:54" },
    { title: "DSA in Python Course - Alien Dictionary | Topological Sort in Graph | GFG | Part 141 [Hindi]", duration: "7:30" },
    { title: "DSA in Python - Shortest Path in Undirected Graph with Unit Distance | BFS | GFG | Part 142 [Hindi]", duration: "16:06" },
    { title: "DSA in Python - Shortest Path in Directed Weighted Graph (DAG) | Topological Sort | GFG | Part 143", duration: "28:58" },
    { title: "DSA in Python Course - Dijkstra's Algorithm Using Priority Queue | GFG | Graphs Part 144", duration: "22:27" },
    { title: "DSA in Python- Dijkstra's Algorithm Using Set | Why Priority Queue is Better | Graphs Part 145", duration: "17:23" },
    { title: "DSA Python 2025 - Why Use Priority Queue and not Queue in Dijkstra's Algorithm? | Part 146", duration: "16:30" },
    { title: "DSA in Python - Print Shortest Path Using Dijkstra | Path Reconstruction | Graphs - Part 147 [Hindi]", duration: "21:31" },
    { title: "DSA Python - Shortest Path in Binary Matrix | Leetcode 1091 | BFS Grid Traversal - Part 148 [Hindi]", duration: "22:23" },
    { title: "DSA in Python - Path With Minimum Effort | Leetcode 1631 Explained | Dijkstra on Grids - Part 149", duration: "21:56" },
    { title: "DSA in Python - Cheapest Flights Within K Stops | Leetcode 787 | Modified BFS | Part 150 [Hindi]", duration: "25:26" },
    { title: "DSA in Python - Minimum Multiplications to Reach End | GFG Problem Explained | Part 151 [Hindi]", duration: "14:35" },
    { title: "DSA in Python - Number of Ways to Arrive at Destination | Dijkstra | LC 1976 | Part 152 [Hindi]", duration: "26:49" },
    { title: "DSA in Python - Bellman-Ford Algorithm | Detect Negative Cycles | GFG Problem | Part 153 [Hindi]", duration: "25:53" },
    { title: "DSA in Python - Floyd Warshall Algorithm | All-Pairs Shortest Path | GFG Problem | Part 154 [Hindi]", duration: "30:16" },
    { title: "DSA in Python - Smallest City with Threshold Neighbors | Leetcode 1334 | Floyd Warshall | Part 155", duration: "14:13" },
    { title: "DSA in Python - What is Minimum Spanning Tree (MST)? | Theory Only | GFG MST | Part 156 [Hindi]", duration: "7:03" },
    { title: "DSA in Python - Prim's Algorithm | Minimum Spanning Tree (MST) | GFG | Part 157 [Hindi]", duration: "19:09" },
    { title: "DSA in Python - Disjoint Set (Union-Find) | Path Compression + Union by Size/Rank | Part 158 [Hindi]", duration: "44:36" },
    { title: "DSA in Python - Minimum Spanning Tree Using Kruskal's Algorithm | GFG MST | Part 159 [Hindi]", duration: "16:10" },
    { title: "DSA in Python - Number of Provinces Using Disjoint Set (Union-Find) | GFG Graph | Part 160 [Hindi]", duration: "10:31" },
    { title: "DSA in Python - Make Network Connected Using Disjoint Set | LeetCode 1319 | Part 161 [Hindi]", duration: "18:34" },
    { title: "DSA in Python Course - Introduction to Binary Search Tree | BST Explained | Part 168 [Hindi]", duration: "7:37" },
    { title: "DSA in Python Course - Search in a Binary Search Tree | LeetCode Easy | Part 169 [Hindi]", duration: "6:57" },
    { title: "DSA in Python Course - Minimum Element in BST | GFG Practice | Part 170 [Hindi]", duration: "5:35" },
    { title: "DSA in Python Course - Ceil in BST | Find Ceiling Value in Binary Search Tree | GFG | Part 171", duration: "10:33" },
    { title: "DSA in Python Course - Floor in BST | Find Floor Value in Binary Search Tree | Part 172 [Hindi]", duration: "5:08" },
    { title: "DSA in Python Course - Insert into a Binary Search Tree | LeetCode Medium | Part 173 [Hindi]", duration: "7:48" },
    { title: "DSA in Python Course - Delete Node in a BST | LeetCode Medium | Part 174 [Hindi]", duration: "14:10" },
    { title: "DSA in Python Course - Morris Algorithm for Inorder/Preorder Traversal | Space Optimized | Part 175", duration: "21:40" },
    { title: "DSA in Python Course - Kth Smallest Element in a BST | Morris Algorithm | LeetCode Medium | Part 176", duration: "10:39" },
    { title: "DSA in Python Course - Validate Binary Search Tree | Range Validation | LeetCode Medium | Part 177", duration: "12:25" },
    { title: "DSA in Python Course - Lowest Common Ancestor of a Binary Search Tree | LeetCode Medium | Part 178", duration: "19:20" },
    { title: "DSA in Python Course - Predecessor and Successor in BST | GFG Practice | Part 179 [Hindi]", duration: "11:55" },
    { title: "DSA in Python - Introduction to Priority Queues using Binary Heaps | Min & Max Heaps | Part 180", duration: "22:35" },
    { title: "DSA in Python Course - Heapify Algorithm Explained | Building Heaps Efficiently | Part 181 [Hindi]", duration: "22:26" },
    { title: "DSA in Python Course - Implement Min Heap | From Scratch with Code | Part 183 [Hindi]", duration: "13:00" },
    { title: "DSA in Python Course - Implement Max Heap | From Scratch with Code | Part 184 [Hindi]", duration: "7:07" },
    { title: "DSA in Python Course - Check if an Array Represents a Min Heap | Validation Explained | Part 185", duration: "7:27" },
    { title: "DSA in Python Course - Build Heap from a Given Array | Heap Construction Explained | Part 182", duration: "15:22" },
    { title: "DSA in Python Course - Convert Min Heap to Max Heap | Efficient Transformation | Part 186 [Hindi]", duration: "2:20" },
    { title: "DSA in Python Course - Heap Sort Algorithm | Sorting using Max Heap | Part 187 [Hindi]", duration: "16:19" },
    { title: "DSA in Python Course - Kth Largest Element in an Array | QuickSelect Algorithm | Part 188", duration: "38:29" },
    { title: "DSA in Python Course - Kth Largest Element in a Stream | Min Heap Design | Medium | Part 189", duration: "9:27" },
    { title: "Introduction to Dynamic Programming | Recursion, Memoization, Tabulation | Part 190 | DSA in Python", duration: "37:59" },
    { title: "Climbing Stairs | All 4 DP Approaches | Recursion to Optimal | Part 191 | DSA in Python Course", duration: "11:10" },
    { title: "DSA in Python - Frog Jump | All 4 DP Approaches | Recursion to Optimal | GFG Practice | Part 192", duration: "35:09" },
    { title: "DSA in Python - House Robber II | 4 DP Approaches | Circular Constraint | LeetCode Medium | Part 194", duration: "11:03" },
    { title: "DSA in Python - House Robber | All 4 DP Approaches | Recursion to Optimal | LC Medium | Part 193", duration: "29:40" },
    { title: "DSA in Python - Geek's Training | 2D DP on Activities | GFG Practice | Part 195 [Hindi]", duration: "50:42" },
    { title: "DSA in Python - Unique Paths II | Grid DP with Obstacles | LeetCode 63 | Part 197 [Hindi]", duration: "9:36" },
    { title: "DSA in Python - Unique Paths | 4 DP Approaches | LeetCode 62 | Part 196 [Hindi]", duration: "43:44" },
    { title: "DSA in Python - Minimum Path Sum | 4 Grid DP Approaches | LeetCode 64 | Part 198 [Hindi]", duration: "23:17" },
    { title: "DSA in Python - Minimum Path Sum in Triangular Grid | 4 DP Approaches | LeetCode 120 | Part 199", duration: "32:16" },
    { title: "DSA in Python - Minimum/Maximum Falling Path Sum | Grid DP Full Approaches | LeetCode 931 | Part 200", duration: "34:41" },
    { title: "DSA in Python - Cherry Pickup II | 3D DP for 2 Robots | LeetCode 1463 | Part 201 [Hindi]", duration: "37:32" },
    { title: "DSA in Python - Partition Equal Subset Sum | 1D DP on Subsequences | LeetCode 416 | Part 203 [Hindi]", duration: "6:20" },
    { title: "DSA in Python - Subset Sum Equal to Target | Pick/Not-Pick DP | GFG Practice | Part 202 [Hindi]", duration: "35:40" },
    { title: "DSA in Python - Partition Set Into 2 Subsets with Min Absolute Sum Difference | GFG | Part 204", duration: "21:19" },
    { title: "DSA in Python - Count Subsets with Sum K | Perfect Sum Problem | GFG Practice | Part 205", duration: "36:30" },
    { title: "DSA in Python - Count Partitions with Given Difference | Reduce to Subset Sum | GFG | Part 206", duration: "8:47" },
    { title: "DSA in Python - 0/1 Knapsack | 5 DP Approaches + Space-Optimized Tricks | GFG Practice | Part 207", duration: "37:41" },
    { title: "DSA in Python - Longest Common Subsequence (LCS) | 5 DP Variations + Space Optimization | Part 208", duration: "53:59" },
    { title: "DSA in Python - Print the Longest Common Subsequence | Build DP Table + Backtrack | Part 209 [Hindi]", duration: "18:57" },
    { title: "DSA in Python - Longest Common Substring | DP on Strings (Tabulation + Space Opt) | Part 210 [Hindi]", duration: "14:29" },
    { title: "DSA in Python - Longest Palindromic Subsequence (LPS) | LCS Trick + DP Variations | Part 211 [Hindi]", duration: "9:19" },
    { title: "Minimum Insertion Steps to Make a String Palindrome | LPS Trick + Interval DP | Part 212 [Hindi]", duration: "11:43" },
    { title: "DSA in Python - Delete Operation for Two Strings | LCS-Based DP + Space Opt | Part 213 [Hindi]", duration: "9:31" },
    { title: "DSA in Python - Best Time to Buy and Sell Stock II | DP Intuition | LeetCode 122 | Part 214 [Hindi]", duration: "37:46" },
    { title: "DSA in Python - Best Time to Buy and Sell Stock III | At-Most Two Trades DP | Part 215 [Hindi]", duration: "32:32" },
    { title: "DSA in Python - Best Time to Buy and Sell Stock IV | At-Most K Trades DP (O(n·k)) | Part 216 [Hindi]", duration: "5:26" },
    { title: "DSA in Python - Remove Outermost Parentheses | Depth Counter Trick (O(n)) | Part 217 [Hindi]", duration: "11:46" },
    { title: "DSA in Python - Reverse Words in a String | Clean Split-Reverse-Join (O(n)) | Part 218 [Hindi]", duration: "7:44" },
    { title: "DSA in Python - Largest Odd Number in String | Greedy Right-to-Left Scan (O(n)) | Part 219 [Hindi]", duration: "6:55" },
    { title: "DSA in Python - Longest Common Prefix | Vertical Scan + Alternatives (O(N·M)) | Part 220 [Hindi]", duration: "17:12" },
    { title: "DSA in Python - Isomorphic Strings | Bidirectional Hash Maps (O(n)) | Part 221 [Hindi]", duration: "15:50" },
    { title: "DSA in Python - Rotate String | s+s Substring Trick (O(n)) | Part 222 [Hindi]", duration: "13:21" },
    { title: "DSA in Python - Valid Anagram | Hash Map vs Sorting (O(n) vs O(n log n)) | Part 223 [Hindi]", duration: "15:18" },
    { title: "Sort Characters By Frequency | Hash Map + Sort/Heap (O(n + k log k)) | Part 224 [Hindi]", duration: "11:32" },
    { title: "DSA in Python - Maximum Nesting Depth of the Parentheses | Depth Counter | Part 225 [Hindi]", duration: "10:21" },
    { title: "DSA in Python - Roman to Integer | Mapping + Subtraction Rule | LeetCode 13 | Part 226 [Hindi]", duration: "12:33" },
    { title: "DSA in Python - Implement Trie (Prefix Tree) | Insert, Search, startsWith | Part 227 [Hindi]", duration: "32:59" },
    { title: "DSA in Python - Implement Trie II | Insert, Count, and Erase Operations | Part 228 [Hindi]", duration: "20:57" },
    { title: "DSA in Python - Complete String | Trie Based Prefix Checking | Part 229 [Hindi]", duration: "22:08" },
    { title: "DSA in Python - Count Distinct Substrings | Brute Force vs Trie Approach | Naukri Code360 | Part 230", duration: "13:08" }
  ]
  // Update player when video index changes
  useEffect(() => {
    if (player && player.playVideoAt) {
      console.log('Switching to video index:', currentVideoIndex)
      player.playVideoAt(currentVideoIndex)
    }
  }, [currentVideoIndex, player])


  const handleVideoSelect = (videoIndex) => {
    console.log('Switching to video index:', videoIndex)
    setCurrentVideoIndex(videoIndex)
    // Mark video as watched
    setWatchedVideos(prev => new Set([...prev, videoIndex]))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const progressPercentage = (watchedVideos.size / videos.length) * 100

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/python-dsa-videos')}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-blue-500 shadow-lg">
                <img
                  src="/assets/images/ltsu-custom-logo.png"
                  alt="Helixa IQ Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">DSA with Python Video Player</h1>
                <p className="text-gray-400 text-xs">Helixa IQ Portal</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className={`h-[calc(100vh-80px)] ${isFullscreen ? 'flex flex-col' : 'flex'}`}>
        {/* Video Player Section */}
        <div className={`${isFullscreen ? 'w-full' : 'w-1/2'} bg-gray-900 p-6`}>
          <div className="h-full">
            <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 h-full">
              {/* Video Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">
                    {videos[currentVideoIndex]?.title || 'DSA with Python Tutorial'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Duration: {videos[currentVideoIndex]?.duration || 'N/A'}
                  </p>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-700 rounded-lg"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-7 7m0 0l7 7m-7-7h7m-7 7v7m7-7H3m7 7l-7-7m7 7V3m0 7H3" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <div
                  ref={playerRef}
                  className="w-full h-full"
                  id="youtube-player"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className={`${isFullscreen ? 'w-full bg-gray-800 p-6' : 'w-1/2 bg-gray-800 border-l border-gray-700 p-6'} overflow-y-auto`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Course Playlist</h2>
            <p className="text-gray-400 text-sm">Select a video to start watching</p>
          </div>

          <div className={`space-y-3 ${isFullscreen ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : ''}`}>
            {videos.map((video, index) => (
              <div
                key={index}
                onClick={() => handleVideoSelect(index)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  index === currentVideoIndex
                    ? 'bg-blue-600/20 border-blue-500'
                    : watchedVideos.has(index)
                    ? 'bg-green-600/10 border-green-500'
                    : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === currentVideoIndex
                      ? 'bg-blue-600 text-white'
                      : watchedVideos.has(index)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-medium truncate ${
                      index === currentVideoIndex ? 'text-white' : 'text-gray-300'
                    }`}>
                      {video.title}
                    </h4>
                    <p className="text-gray-500 text-xs mt-1">
                      Duration: {video.duration}
                    </p>
                    {watchedVideos.has(index) && index !== currentVideoIndex && (
                      <div className="flex items-center mt-1">
                        <svg className="w-3 h-3 text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-400 text-xs">Watched</span>
                      </div>
                    )}
                  </div>
                  {index === currentVideoIndex && (
                    <div className="text-blue-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
            <h3 className="text-white font-medium mb-2">Course Progress</h3>
            <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="text-gray-400 text-xs">{watchedVideos.size} of {videos.length} videos completed ({Math.round(progressPercentage)}%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PythonDSAVideoPlayer