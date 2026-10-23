import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface LCQuestion {
  num: number;
  title: string;
  difficulty: Difficulty;
  link: string;
  topic: string;
  phase: number;
}

export interface PhaseGroup {
  phase: number;
  label: string;
  range: string;
  questions: LCQuestion[];
}

const ALL_QUESTIONS: LCQuestion[] = [
  // ── Phase 1: Foundations (1–80) ──────────────────────────────────
  // Arrays & Two Pointers (1–20)
  { num: 1,  title: 'Two Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/two-sum/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 2,  title: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 3,  title: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 4,  title: 'Move Zeroes', difficulty: 'Easy', link: 'https://leetcode.com/problems/move-zeroes/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 5,  title: 'Squares of a Sorted Array', difficulty: 'Easy', link: 'https://leetcode.com/problems/squares-of-a-sorted-array/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 6,  title: 'Find Pivot Index', difficulty: 'Easy', link: 'https://leetcode.com/problems/find-pivot-index/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 7,  title: 'Running Sum of 1d Array', difficulty: 'Easy', link: 'https://leetcode.com/problems/running-sum-of-1d-array/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 8,  title: 'Maximum Subarray', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-subarray/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 9,  title: 'Product of Array Except Self', difficulty: 'Medium', link: 'https://leetcode.com/problems/product-of-array-except-self/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 10, title: '3Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/3sum/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 11, title: 'Container With Most Water', difficulty: 'Medium', link: 'https://leetcode.com/problems/container-with-most-water/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 12, title: 'Rotate Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotate-array/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 13, title: 'Spiral Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/spiral-matrix/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 14, title: '4Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/4sum/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 15, title: 'Next Permutation', difficulty: 'Medium', link: 'https://leetcode.com/problems/next-permutation/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 16, title: 'Sort Colors', difficulty: 'Medium', link: 'https://leetcode.com/problems/sort-colors/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 17, title: 'Subarray Sum Equals K', difficulty: 'Medium', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 18, title: 'Trapping Rain Water', difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 19, title: 'First Missing Positive', difficulty: 'Hard', link: 'https://leetcode.com/problems/first-missing-positive/', topic: 'Arrays & Two Pointers', phase: 1 },
  { num: 20, title: 'Maximum Product Subarray', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-product-subarray/', topic: 'Arrays & Two Pointers', phase: 1 },
  // Strings & Sliding Window (21–40)
  { num: 21, title: 'Valid Palindrome', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-palindrome/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 22, title: 'Valid Anagram', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-anagram/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 23, title: 'Longest Common Prefix', difficulty: 'Easy', link: 'https://leetcode.com/problems/longest-common-prefix/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 24, title: 'Reverse String', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-string/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 25, title: 'Reverse Words in a String III', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-words-in-a-string-iii/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 26, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 27, title: 'Longest Palindromic Substring', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-substring/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 28, title: 'String to Integer (atoi)', difficulty: 'Medium', link: 'https://leetcode.com/problems/string-to-integer-atoi/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 29, title: 'Count and Say', difficulty: 'Medium', link: 'https://leetcode.com/problems/count-and-say/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 30, title: 'Group Anagrams', difficulty: 'Medium', link: 'https://leetcode.com/problems/group-anagrams/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 31, title: 'Minimum Window Substring', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-substring/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 32, title: 'Sliding Window Maximum', difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-maximum/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 33, title: 'Find All Anagrams in a String', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 34, title: 'Permutation in String', difficulty: 'Medium', link: 'https://leetcode.com/problems/permutation-in-string/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 35, title: 'Longest Repeating Character Replacement', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 36, title: 'Minimum Size Subarray Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-size-subarray-sum/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 37, title: 'Decode String', difficulty: 'Medium', link: 'https://leetcode.com/problems/decode-string/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 38, title: 'Zigzag Conversion', difficulty: 'Medium', link: 'https://leetcode.com/problems/zigzag-conversion/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 39, title: 'Reverse Words in a String', difficulty: 'Medium', link: 'https://leetcode.com/problems/reverse-words-in-a-string/', topic: 'Strings & Sliding Window', phase: 1 },
  { num: 40, title: 'Basic Calculator II', difficulty: 'Medium', link: 'https://leetcode.com/problems/basic-calculator-ii/', topic: 'Strings & Sliding Window', phase: 1 },
  // Hashing & Frequency Counting (41–60)
  { num: 41, title: 'Contains Duplicate', difficulty: 'Easy', link: 'https://leetcode.com/problems/contains-duplicate/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 42, title: 'Single Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/single-number/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 43, title: 'Intersection of Two Arrays', difficulty: 'Easy', link: 'https://leetcode.com/problems/intersection-of-two-arrays/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 44, title: 'Happy Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/happy-number/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 45, title: 'Isomorphic Strings', difficulty: 'Easy', link: 'https://leetcode.com/problems/isomorphic-strings/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 46, title: 'Word Pattern', difficulty: 'Easy', link: 'https://leetcode.com/problems/word-pattern/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 47, title: 'Top K Frequent Elements', difficulty: 'Medium', link: 'https://leetcode.com/problems/top-k-frequent-elements/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 48, title: 'Longest Consecutive Sequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-consecutive-sequence/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 49, title: '4Sum II', difficulty: 'Medium', link: 'https://leetcode.com/problems/4sum-ii/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 50, title: 'Contiguous Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/contiguous-array/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 51, title: 'Ransom Note', difficulty: 'Easy', link: 'https://leetcode.com/problems/ransom-note/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 52, title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 53, title: 'Brick Wall', difficulty: 'Medium', link: 'https://leetcode.com/problems/brick-wall/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 54, title: 'Minimum Number of Pushes to Type Word II', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-pushes-to-type-word-ii/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 55, title: 'First Unique Character in a String', difficulty: 'Easy', link: 'https://leetcode.com/problems/first-unique-character-in-a-string/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 56, title: 'Number of Pairs of Strings With Concatenation Equal to Target', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-pairs-of-strings-with-concatenation-equal-to-target/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 57, title: 'Sort Characters By Frequency', difficulty: 'Medium', link: 'https://leetcode.com/problems/sort-characters-by-frequency/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 58, title: 'Custom Sort String', difficulty: 'Medium', link: 'https://leetcode.com/problems/custom-sort-string/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 59, title: 'Majority Element', difficulty: 'Easy', link: 'https://leetcode.com/problems/majority-element/', topic: 'Hashing & Frequency Counting', phase: 1 },
  { num: 60, title: 'Find the Duplicate Number', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-the-duplicate-number/', topic: 'Hashing & Frequency Counting', phase: 1 },
  // Sorting & Binary Search (61–80)
  { num: 61, title: 'Binary Search', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-search/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 62, title: 'Search Insert Position', difficulty: 'Easy', link: 'https://leetcode.com/problems/search-insert-position/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 63, title: 'First Bad Version', difficulty: 'Easy', link: 'https://leetcode.com/problems/first-bad-version/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 64, title: 'Sqrt(x)', difficulty: 'Easy', link: 'https://leetcode.com/problems/sqrtx/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 65, title: 'Guess Number Higher or Lower', difficulty: 'Easy', link: 'https://leetcode.com/problems/guess-number-higher-or-lower/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 66, title: 'Search a 2D Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-a-2d-matrix/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 67, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 68, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 69, title: 'Find Peak Element', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-peak-element/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 70, title: 'Kth Smallest Element in a Sorted Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 71, title: 'H-Index', difficulty: 'Medium', link: 'https://leetcode.com/problems/h-index/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 72, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 73, title: 'Find in Mountain Array', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-in-mountain-array/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 74, title: 'Divide Chocolate', difficulty: 'Hard', link: 'https://leetcode.com/problems/divide-chocolate/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 75, title: 'Count of Smaller Numbers After Self', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 76, title: 'Koko Eating Bananas', difficulty: 'Medium', link: 'https://leetcode.com/problems/koko-eating-bananas/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 77, title: 'Capacity To Ship Packages Within D Days', difficulty: 'Medium', link: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 78, title: 'Find the Smallest Divisor Given a Threshold', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 79, title: 'Minimum Number of Days to Make m Bouquets', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/', topic: 'Sorting & Binary Search', phase: 1 },
  { num: 80, title: 'Split Array Largest Sum', difficulty: 'Hard', link: 'https://leetcode.com/problems/split-array-largest-sum/', topic: 'Sorting & Binary Search', phase: 1 },

  // ── Phase 2: Core Data Structures (81–200) ────────────────────────
  // Linked Lists (81–100)
  { num: 81,  title: 'Reverse Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-linked-list/', topic: 'Linked Lists', phase: 2 },
  { num: 82,  title: 'Merge Two Sorted Lists', difficulty: 'Easy', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', topic: 'Linked Lists', phase: 2 },
  { num: 83,  title: 'Linked List Cycle', difficulty: 'Easy', link: 'https://leetcode.com/problems/linked-list-cycle/', topic: 'Linked Lists', phase: 2 },
  { num: 84,  title: 'Middle of the Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', topic: 'Linked Lists', phase: 2 },
  { num: 85,  title: 'Palindrome Linked List', difficulty: 'Easy', link: 'https://leetcode.com/problems/palindrome-linked-list/', topic: 'Linked Lists', phase: 2 },
  { num: 86,  title: 'Remove Nth Node From End of List', difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', topic: 'Linked Lists', phase: 2 },
  { num: 87,  title: 'Add Two Numbers', difficulty: 'Medium', link: 'https://leetcode.com/problems/add-two-numbers/', topic: 'Linked Lists', phase: 2 },
  { num: 88,  title: 'Linked List Cycle II', difficulty: 'Medium', link: 'https://leetcode.com/problems/linked-list-cycle-ii/', topic: 'Linked Lists', phase: 2 },
  { num: 89,  title: 'Reorder List', difficulty: 'Medium', link: 'https://leetcode.com/problems/reorder-list/', topic: 'Linked Lists', phase: 2 },
  { num: 90,  title: 'LRU Cache', difficulty: 'Medium', link: 'https://leetcode.com/problems/lru-cache/', topic: 'Linked Lists', phase: 2 },
  { num: 91,  title: 'Sort List', difficulty: 'Medium', link: 'https://leetcode.com/problems/sort-list/', topic: 'Linked Lists', phase: 2 },
  { num: 92,  title: 'Rotate List', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotate-list/', topic: 'Linked Lists', phase: 2 },
  { num: 93,  title: 'Partition List', difficulty: 'Medium', link: 'https://leetcode.com/problems/partition-list/', topic: 'Linked Lists', phase: 2 },
  { num: 94,  title: 'Swap Nodes in Pairs', difficulty: 'Medium', link: 'https://leetcode.com/problems/swap-nodes-in-pairs/', topic: 'Linked Lists', phase: 2 },
  { num: 95,  title: 'Remove Duplicates from Sorted List II', difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/', topic: 'Linked Lists', phase: 2 },
  { num: 96,  title: 'Reverse Linked List II', difficulty: 'Medium', link: 'https://leetcode.com/problems/reverse-linked-list-ii/', topic: 'Linked Lists', phase: 2 },
  { num: 97,  title: 'Copy List with Random Pointer', difficulty: 'Medium', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', topic: 'Linked Lists', phase: 2 },
  { num: 98,  title: 'Merge k Sorted Lists', difficulty: 'Hard', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', topic: 'Linked Lists', phase: 2 },
  { num: 99,  title: 'Reverse Nodes in k-Group', difficulty: 'Hard', link: 'https://leetcode.com/problems/reverse-nodes-in-k-group/', topic: 'Linked Lists', phase: 2 },
  { num: 100, title: 'Flatten a Multilevel Doubly Linked List', difficulty: 'Medium', link: 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/', topic: 'Linked Lists', phase: 2 },
  // Stacks & Queues (101–120)
  { num: 101, title: 'Valid Parentheses', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-parentheses/', topic: 'Stacks & Queues', phase: 2 },
  { num: 102, title: 'Implement Stack using Queues', difficulty: 'Easy', link: 'https://leetcode.com/problems/implement-stack-using-queues/', topic: 'Stacks & Queues', phase: 2 },
  { num: 103, title: 'Implement Queue using Stacks', difficulty: 'Easy', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', topic: 'Stacks & Queues', phase: 2 },
  { num: 104, title: 'Min Stack', difficulty: 'Medium', link: 'https://leetcode.com/problems/min-stack/', topic: 'Stacks & Queues', phase: 2 },
  { num: 105, title: 'Daily Temperatures', difficulty: 'Medium', link: 'https://leetcode.com/problems/daily-temperatures/', topic: 'Stacks & Queues', phase: 2 },
  { num: 106, title: 'Next Greater Element I', difficulty: 'Easy', link: 'https://leetcode.com/problems/next-greater-element-i/', topic: 'Stacks & Queues', phase: 2 },
  { num: 107, title: 'Next Greater Element II', difficulty: 'Medium', link: 'https://leetcode.com/problems/next-greater-element-ii/', topic: 'Stacks & Queues', phase: 2 },
  { num: 108, title: 'Online Stock Span', difficulty: 'Medium', link: 'https://leetcode.com/problems/online-stock-span/', topic: 'Stacks & Queues', phase: 2 },
  { num: 109, title: 'Remove All Adjacent Duplicates In String', difficulty: 'Easy', link: 'https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/', topic: 'Stacks & Queues', phase: 2 },
  { num: 110, title: 'Evaluate Reverse Polish Notation', difficulty: 'Medium', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', topic: 'Stacks & Queues', phase: 2 },
  { num: 111, title: 'Largest Rectangle in Histogram', difficulty: 'Hard', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', topic: 'Stacks & Queues', phase: 2 },
  { num: 112, title: 'Maximal Rectangle', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximal-rectangle/', topic: 'Stacks & Queues', phase: 2 },
  { num: 113, title: 'Remove K Digits', difficulty: 'Medium', link: 'https://leetcode.com/problems/remove-k-digits/', topic: 'Stacks & Queues', phase: 2 },
  { num: 114, title: '132 Pattern', difficulty: 'Medium', link: 'https://leetcode.com/problems/132-pattern/', topic: 'Stacks & Queues', phase: 2 },
  { num: 115, title: 'Flatten Nested List Iterator', difficulty: 'Medium', link: 'https://leetcode.com/problems/flatten-nested-list-iterator/', topic: 'Stacks & Queues', phase: 2 },
  { num: 116, title: 'Design Circular Queue', difficulty: 'Medium', link: 'https://leetcode.com/problems/design-circular-queue/', topic: 'Stacks & Queues', phase: 2 },
  { num: 117, title: 'Number of Visible People in a Queue', difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-visible-people-in-a-queue/', topic: 'Stacks & Queues', phase: 2 },
  { num: 118, title: 'Car Fleet', difficulty: 'Medium', link: 'https://leetcode.com/problems/car-fleet/', topic: 'Stacks & Queues', phase: 2 },
  { num: 119, title: 'Longest Valid Parentheses', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-valid-parentheses/', topic: 'Stacks & Queues', phase: 2 },
  { num: 120, title: 'Maximum Frequency Stack', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-frequency-stack/', topic: 'Stacks & Queues', phase: 2 },
  // Trees (121–150)
  { num: 121, title: 'Binary Tree Inorder Traversal', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 122, title: 'Binary Tree Preorder Traversal', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-tree-preorder-traversal/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 123, title: 'Binary Tree Postorder Traversal', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-tree-postorder-traversal/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 124, title: 'Maximum Depth of Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 125, title: 'Symmetric Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/symmetric-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 126, title: 'Invert Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/invert-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 127, title: 'Path Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/path-sum/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 128, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 129, title: 'Binary Tree Zigzag Level Order Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 130, title: 'Binary Tree Right Side View', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 131, title: 'Construct Binary Tree from Preorder and Inorder Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 132, title: 'Construct Binary Tree from Inorder and Postorder Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 133, title: 'Flatten Binary Tree to Linked List', difficulty: 'Medium', link: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 134, title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 135, title: 'Path Sum II', difficulty: 'Medium', link: 'https://leetcode.com/problems/path-sum-ii/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 136, title: 'Path Sum III', difficulty: 'Medium', link: 'https://leetcode.com/problems/path-sum-iii/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 137, title: 'Diameter of Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 138, title: 'Balanced Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/balanced-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 139, title: 'Count Good Nodes in Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/count-good-nodes-in-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 140, title: 'Maximum Width of Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-width-of-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 141, title: 'All Nodes Distance K in Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 142, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 143, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 144, title: 'Vertical Order Traversal of a Binary Tree', difficulty: 'Hard', link: 'https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 145, title: 'Sum Root to Leaf Numbers', difficulty: 'Medium', link: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 146, title: 'Binary Tree Cameras', difficulty: 'Hard', link: 'https://leetcode.com/problems/binary-tree-cameras/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 147, title: 'Recover Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/recover-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 148, title: 'Populating Next Right Pointers in Each Node', difficulty: 'Medium', link: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 149, title: 'Find Largest Value in Each Tree Row', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-largest-value-in-each-tree-row/', topic: 'Trees (Binary Tree)', phase: 2 },
  { num: 150, title: 'Cousins in Binary Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/cousins-in-binary-tree/', topic: 'Trees (Binary Tree)', phase: 2 },
  // Binary Search Tree (151–165)
  { num: 151, title: 'Validate Binary Search Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/validate-binary-search-tree/', topic: 'Binary Search Tree', phase: 2 },
  { num: 152, title: 'Kth Smallest Element in a BST', difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', topic: 'Binary Search Tree', phase: 2 },
  { num: 153, title: 'Lowest Common Ancestor of a Binary Search Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', topic: 'Binary Search Tree', phase: 2 },
  { num: 154, title: 'Convert Sorted Array to Binary Search Tree', difficulty: 'Easy', link: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/', topic: 'Binary Search Tree', phase: 2 },
  { num: 155, title: 'Insert into a Binary Search Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', topic: 'Binary Search Tree', phase: 2 },
  { num: 156, title: 'Delete Node in a BST', difficulty: 'Medium', link: 'https://leetcode.com/problems/delete-node-in-a-bst/', topic: 'Binary Search Tree', phase: 2 },
  { num: 157, title: 'Two Sum IV - Input is a BST', difficulty: 'Easy', link: 'https://leetcode.com/problems/two-sum-iv-input-is-a-bst/', topic: 'Binary Search Tree', phase: 2 },
  { num: 158, title: 'Range Sum of BST', difficulty: 'Easy', link: 'https://leetcode.com/problems/range-sum-of-bst/', topic: 'Binary Search Tree', phase: 2 },
  { num: 159, title: 'Balance a Binary Search Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/balance-a-binary-search-tree/', topic: 'Binary Search Tree', phase: 2 },
  { num: 160, title: 'Trim a Binary Search Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/trim-a-binary-search-tree/', topic: 'Binary Search Tree', phase: 2 },
  { num: 161, title: 'Convert BST to Greater Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/convert-bst-to-greater-tree/', topic: 'Binary Search Tree', phase: 2 },
  { num: 162, title: 'Recover Binary Search Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/recover-binary-search-tree/', topic: 'Binary Search Tree', phase: 2 },
  { num: 163, title: 'Unique Binary Search Trees', difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-binary-search-trees/', topic: 'Binary Search Tree', phase: 2 },
  { num: 164, title: 'Unique Binary Search Trees II', difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-binary-search-trees-ii/', topic: 'Binary Search Tree', phase: 2 },
  { num: 165, title: 'Binary Search Tree Iterator', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-search-tree-iterator/', topic: 'Binary Search Tree', phase: 2 },
  // Heaps / Priority Queue (166–180)
  { num: 166, title: 'Kth Largest Element in an Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 167, title: 'Top K Frequent Words', difficulty: 'Medium', link: 'https://leetcode.com/problems/top-k-frequent-words/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 168, title: 'K Closest Points to Origin', difficulty: 'Medium', link: 'https://leetcode.com/problems/k-closest-points-to-origin/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 169, title: 'Find Median from Data Stream', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-median-from-data-stream/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 170, title: 'Kth Largest Element in a Stream', difficulty: 'Easy', link: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 171, title: 'Task Scheduler', difficulty: 'Medium', link: 'https://leetcode.com/problems/task-scheduler/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 172, title: 'Reorganize String', difficulty: 'Medium', link: 'https://leetcode.com/problems/reorganize-string/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 173, title: 'IPO', difficulty: 'Hard', link: 'https://leetcode.com/problems/ipo/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 174, title: 'Smallest Range Covering Elements from K Lists', difficulty: 'Hard', link: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 175, title: 'Sliding Window Median', difficulty: 'Hard', link: 'https://leetcode.com/problems/sliding-window-median/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 176, title: 'Last Stone Weight', difficulty: 'Easy', link: 'https://leetcode.com/problems/last-stone-weight/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 177, title: 'Seat Reservation Manager', difficulty: 'Medium', link: 'https://leetcode.com/problems/seat-reservation-manager/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 178, title: 'Furthest Building You Can Reach', difficulty: 'Medium', link: 'https://leetcode.com/problems/furthest-building-you-can-reach/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 179, title: 'Merge k Sorted Lists (heap approach)', difficulty: 'Hard', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', topic: 'Heaps / Priority Queue', phase: 2 },
  { num: 180, title: 'Minimum Cost to Hire K Workers', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-hire-k-workers/', topic: 'Heaps / Priority Queue', phase: 2 },

  // ── Phase 3: Intermediate Algorithms (201–320) ────────────────────
  // Greedy Algorithms (201–220)
  { num: 201, title: 'Assign Cookies', difficulty: 'Easy', link: 'https://leetcode.com/problems/assign-cookies/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 202, title: 'Lemonade Change', difficulty: 'Easy', link: 'https://leetcode.com/problems/lemonade-change/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 203, title: 'Jump Game', difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 204, title: 'Jump Game II', difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game-ii/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 205, title: 'Gas Station', difficulty: 'Medium', link: 'https://leetcode.com/problems/gas-station/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 206, title: 'Candy', difficulty: 'Hard', link: 'https://leetcode.com/problems/candy/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 207, title: 'Partition Labels', difficulty: 'Medium', link: 'https://leetcode.com/problems/partition-labels/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 208, title: 'Queue Reconstruction by Height', difficulty: 'Medium', link: 'https://leetcode.com/problems/queue-reconstruction-by-height/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 209, title: 'Non-overlapping Intervals', difficulty: 'Medium', link: 'https://leetcode.com/problems/non-overlapping-intervals/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 210, title: 'Merge Intervals', difficulty: 'Medium', link: 'https://leetcode.com/problems/merge-intervals/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 211, title: 'Meeting Rooms II', difficulty: 'Medium', link: 'https://leetcode.com/problems/meeting-rooms-ii/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 212, title: 'Maximum Units on a Truck', difficulty: 'Easy', link: 'https://leetcode.com/problems/maximum-units-on-a-truck/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 213, title: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 214, title: 'Insert Interval', difficulty: 'Medium', link: 'https://leetcode.com/problems/insert-interval/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 215, title: 'Two City Scheduling', difficulty: 'Medium', link: 'https://leetcode.com/problems/two-city-scheduling/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 216, title: 'Boats to Save People', difficulty: 'Medium', link: 'https://leetcode.com/problems/boats-to-save-people/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 217, title: 'Maximum Swap', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-swap/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 218, title: 'Minimum Deletions to Make Character Frequencies Unique', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 219, title: 'Largest Number', difficulty: 'Medium', link: 'https://leetcode.com/problems/largest-number/', topic: 'Greedy Algorithms', phase: 3 },
  { num: 220, title: 'Minimum Number of Refueling Stops', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-number-of-refueling-stops/', topic: 'Greedy Algorithms', phase: 3 },
  // Backtracking (221–245)
  { num: 221, title: 'Subsets', difficulty: 'Medium', link: 'https://leetcode.com/problems/subsets/', topic: 'Backtracking', phase: 3 },
  { num: 222, title: 'Subsets II', difficulty: 'Medium', link: 'https://leetcode.com/problems/subsets-ii/', topic: 'Backtracking', phase: 3 },
  { num: 223, title: 'Permutations', difficulty: 'Medium', link: 'https://leetcode.com/problems/permutations/', topic: 'Backtracking', phase: 3 },
  { num: 224, title: 'Permutations II', difficulty: 'Medium', link: 'https://leetcode.com/problems/permutations-ii/', topic: 'Backtracking', phase: 3 },
  { num: 225, title: 'Combinations', difficulty: 'Medium', link: 'https://leetcode.com/problems/combinations/', topic: 'Backtracking', phase: 3 },
  { num: 226, title: 'Combination Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/combination-sum/', topic: 'Backtracking', phase: 3 },
  { num: 227, title: 'Combination Sum II', difficulty: 'Medium', link: 'https://leetcode.com/problems/combination-sum-ii/', topic: 'Backtracking', phase: 3 },
  { num: 228, title: 'Combination Sum III', difficulty: 'Medium', link: 'https://leetcode.com/problems/combination-sum-iii/', topic: 'Backtracking', phase: 3 },
  { num: 229, title: 'Letter Combinations of a Phone Number', difficulty: 'Medium', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', topic: 'Backtracking', phase: 3 },
  { num: 230, title: 'Generate Parentheses', difficulty: 'Medium', link: 'https://leetcode.com/problems/generate-parentheses/', topic: 'Backtracking', phase: 3 },
  { num: 231, title: 'Palindrome Partitioning', difficulty: 'Medium', link: 'https://leetcode.com/problems/palindrome-partitioning/', topic: 'Backtracking', phase: 3 },
  { num: 232, title: 'Restore IP Addresses', difficulty: 'Medium', link: 'https://leetcode.com/problems/restore-ip-addresses/', topic: 'Backtracking', phase: 3 },
  { num: 233, title: 'N-Queens', difficulty: 'Hard', link: 'https://leetcode.com/problems/n-queens/', topic: 'Backtracking', phase: 3 },
  { num: 234, title: 'N-Queens II', difficulty: 'Hard', link: 'https://leetcode.com/problems/n-queens-ii/', topic: 'Backtracking', phase: 3 },
  { num: 235, title: 'Sudoku Solver', difficulty: 'Hard', link: 'https://leetcode.com/problems/sudoku-solver/', topic: 'Backtracking', phase: 3 },
  { num: 236, title: 'Word Search', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-search/', topic: 'Backtracking', phase: 3 },
  { num: 237, title: 'Word Search II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-search-ii/', topic: 'Backtracking', phase: 3 },
  { num: 238, title: 'Factor Combinations', difficulty: 'Medium', link: 'https://leetcode.com/problems/factor-combinations/', topic: 'Backtracking', phase: 3 },
  { num: 239, title: 'Expression Add Operators', difficulty: 'Hard', link: 'https://leetcode.com/problems/expression-add-operators/', topic: 'Backtracking', phase: 3 },
  { num: 240, title: 'Remove Invalid Parentheses', difficulty: 'Hard', link: 'https://leetcode.com/problems/remove-invalid-parentheses/', topic: 'Backtracking', phase: 3 },
  { num: 241, title: 'Beautiful Arrangement', difficulty: 'Medium', link: 'https://leetcode.com/problems/beautiful-arrangement/', topic: 'Backtracking', phase: 3 },
  { num: 242, title: 'Generalized Abbreviation', difficulty: 'Medium', link: 'https://leetcode.com/problems/generalized-abbreviation/', topic: 'Backtracking', phase: 3 },
  { num: 243, title: 'Binary Watch', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-watch/', topic: 'Backtracking', phase: 3 },
  { num: 244, title: 'Gray Code', difficulty: 'Medium', link: 'https://leetcode.com/problems/gray-code/', topic: 'Backtracking', phase: 3 },
  { num: 245, title: 'Partition to K Equal Sum Subsets', difficulty: 'Medium', link: 'https://leetcode.com/problems/partition-to-k-equal-sum-subsets/', topic: 'Backtracking', phase: 3 },
  // Divide & Conquer (246–260)
  { num: 246, title: 'Majority Element (Divide & Conquer)', difficulty: 'Easy', link: 'https://leetcode.com/problems/majority-element/', topic: 'Divide & Conquer', phase: 3 },
  { num: 247, title: 'Maximum Subarray (D&C approach)', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-subarray/', topic: 'Divide & Conquer', phase: 3 },
  { num: 248, title: 'Sort an Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/sort-an-array/', topic: 'Divide & Conquer', phase: 3 },
  { num: 249, title: 'Kth Largest Element in an Array (quickselect)', difficulty: 'Medium', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', topic: 'Divide & Conquer', phase: 3 },
  { num: 250, title: 'Different Ways to Add Parentheses', difficulty: 'Medium', link: 'https://leetcode.com/problems/different-ways-to-add-parentheses/', topic: 'Divide & Conquer', phase: 3 },
  { num: 251, title: 'The Skyline Problem', difficulty: 'Hard', link: 'https://leetcode.com/problems/the-skyline-problem/', topic: 'Divide & Conquer', phase: 3 },
  { num: 252, title: 'Count of Smaller Numbers After Self (mergesort)', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', topic: 'Divide & Conquer', phase: 3 },
  { num: 253, title: 'Reverse Pairs', difficulty: 'Hard', link: 'https://leetcode.com/problems/reverse-pairs/', topic: 'Divide & Conquer', phase: 3 },
  { num: 254, title: 'Find the Duplicate Number (Floyd\'s cycle)', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-the-duplicate-number/', topic: 'Divide & Conquer', phase: 3 },
  { num: 255, title: 'Closest Binary Search Tree Value', difficulty: 'Easy', link: 'https://leetcode.com/problems/closest-binary-search-tree-value/', topic: 'Divide & Conquer', phase: 3 },
  { num: 256, title: 'Search a 2D Matrix II', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-a-2d-matrix-ii/', topic: 'Divide & Conquer', phase: 3 },
  { num: 257, title: 'Beautiful Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/beautiful-array/', topic: 'Divide & Conquer', phase: 3 },
  { num: 258, title: 'Pow(x, n)', difficulty: 'Medium', link: 'https://leetcode.com/problems/powx-n/', topic: 'Divide & Conquer', phase: 3 },
  { num: 259, title: 'Super Pow', difficulty: 'Medium', link: 'https://leetcode.com/problems/super-pow/', topic: 'Divide & Conquer', phase: 3 },
  { num: 260, title: 'Count of Range Sum', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-range-sum/', topic: 'Divide & Conquer', phase: 3 },
  // Math & Number Theory (261–280)
  { num: 261, title: 'Fizz Buzz', difficulty: 'Easy', link: 'https://leetcode.com/problems/fizz-buzz/', topic: 'Math & Number Theory', phase: 3 },
  { num: 262, title: 'Count Primes', difficulty: 'Medium', link: 'https://leetcode.com/problems/count-primes/', topic: 'Math & Number Theory', phase: 3 },
  { num: 263, title: 'Power of Two', difficulty: 'Easy', link: 'https://leetcode.com/problems/power-of-two/', topic: 'Math & Number Theory', phase: 3 },
  { num: 264, title: 'Power of Three', difficulty: 'Easy', link: 'https://leetcode.com/problems/power-of-three/', topic: 'Math & Number Theory', phase: 3 },
  { num: 265, title: 'Excel Sheet Column Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/excel-sheet-column-number/', topic: 'Math & Number Theory', phase: 3 },
  { num: 266, title: 'Roman to Integer', difficulty: 'Easy', link: 'https://leetcode.com/problems/roman-to-integer/', topic: 'Math & Number Theory', phase: 3 },
  { num: 267, title: 'Integer to Roman', difficulty: 'Medium', link: 'https://leetcode.com/problems/integer-to-roman/', topic: 'Math & Number Theory', phase: 3 },
  { num: 268, title: 'Reverse Integer', difficulty: 'Medium', link: 'https://leetcode.com/problems/reverse-integer/', topic: 'Math & Number Theory', phase: 3 },
  { num: 269, title: 'Palindrome Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/palindrome-number/', topic: 'Math & Number Theory', phase: 3 },
  { num: 270, title: 'Factorial Trailing Zeroes', difficulty: 'Medium', link: 'https://leetcode.com/problems/factorial-trailing-zeroes/', topic: 'Math & Number Theory', phase: 3 },
  { num: 271, title: 'Ugly Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/ugly-number/', topic: 'Math & Number Theory', phase: 3 },
  { num: 272, title: 'Ugly Number II', difficulty: 'Medium', link: 'https://leetcode.com/problems/ugly-number-ii/', topic: 'Math & Number Theory', phase: 3 },
  { num: 273, title: 'Super Ugly Number', difficulty: 'Medium', link: 'https://leetcode.com/problems/super-ugly-number/', topic: 'Math & Number Theory', phase: 3 },
  { num: 274, title: 'Perfect Squares', difficulty: 'Medium', link: 'https://leetcode.com/problems/perfect-squares/', topic: 'Math & Number Theory', phase: 3 },
  { num: 275, title: 'Add Digits', difficulty: 'Easy', link: 'https://leetcode.com/problems/add-digits/', topic: 'Math & Number Theory', phase: 3 },
  { num: 276, title: 'Fraction to Recurring Decimal', difficulty: 'Medium', link: 'https://leetcode.com/problems/fraction-to-recurring-decimal/', topic: 'Math & Number Theory', phase: 3 },
  { num: 277, title: 'Largest Palindrome Product', difficulty: 'Hard', link: 'https://leetcode.com/problems/largest-palindrome-product/', topic: 'Math & Number Theory', phase: 3 },
  { num: 278, title: 'Reach a Number', difficulty: 'Medium', link: 'https://leetcode.com/problems/reach-a-number/', topic: 'Math & Number Theory', phase: 3 },
  { num: 279, title: 'Minimum Moves to Equal Array Elements II', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/', topic: 'Math & Number Theory', phase: 3 },
  { num: 280, title: 'Nth Digit', difficulty: 'Medium', link: 'https://leetcode.com/problems/nth-digit/', topic: 'Math & Number Theory', phase: 3 },
  // Bit Manipulation (281–300)
  { num: 281, title: 'Number of 1 Bits', difficulty: 'Easy', link: 'https://leetcode.com/problems/number-of-1-bits/', topic: 'Bit Manipulation', phase: 3 },
  { num: 282, title: 'Reverse Bits', difficulty: 'Easy', link: 'https://leetcode.com/problems/reverse-bits/', topic: 'Bit Manipulation', phase: 3 },
  { num: 283, title: 'Single Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/single-number/', topic: 'Bit Manipulation', phase: 3 },
  { num: 284, title: 'Single Number II', difficulty: 'Medium', link: 'https://leetcode.com/problems/single-number-ii/', topic: 'Bit Manipulation', phase: 3 },
  { num: 285, title: 'Single Number III', difficulty: 'Medium', link: 'https://leetcode.com/problems/single-number-iii/', topic: 'Bit Manipulation', phase: 3 },
  { num: 286, title: 'Missing Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/missing-number/', topic: 'Bit Manipulation', phase: 3 },
  { num: 287, title: 'Bitwise AND of Numbers Range', difficulty: 'Medium', link: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/', topic: 'Bit Manipulation', phase: 3 },
  { num: 288, title: 'Sum of Two Integers', difficulty: 'Medium', link: 'https://leetcode.com/problems/sum-of-two-integers/', topic: 'Bit Manipulation', phase: 3 },
  { num: 289, title: 'Counting Bits', difficulty: 'Easy', link: 'https://leetcode.com/problems/counting-bits/', topic: 'Bit Manipulation', phase: 3 },
  { num: 290, title: 'Find the Difference', difficulty: 'Easy', link: 'https://leetcode.com/problems/find-the-difference/', topic: 'Bit Manipulation', phase: 3 },
  { num: 291, title: 'Total Hamming Distance', difficulty: 'Medium', link: 'https://leetcode.com/problems/total-hamming-distance/', topic: 'Bit Manipulation', phase: 3 },
  { num: 292, title: 'Maximum XOR of Two Numbers in an Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', topic: 'Bit Manipulation', phase: 3 },
  { num: 293, title: 'Subsets (bit masking approach)', difficulty: 'Medium', link: 'https://leetcode.com/problems/subsets/', topic: 'Bit Manipulation', phase: 3 },
  { num: 294, title: 'XOR Queries of a Subarray', difficulty: 'Medium', link: 'https://leetcode.com/problems/xor-queries-of-a-subarray/', topic: 'Bit Manipulation', phase: 3 },
  { num: 295, title: 'Number of 1 Bits in Range', difficulty: 'Easy', link: 'https://leetcode.com/problems/number-of-1-bits/', topic: 'Bit Manipulation', phase: 3 },
  { num: 296, title: 'Decode XORed Array', difficulty: 'Easy', link: 'https://leetcode.com/problems/decode-xored-array/', topic: 'Bit Manipulation', phase: 3 },
  { num: 297, title: 'Minimum Flips to Make a OR b Equal to c', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/', topic: 'Bit Manipulation', phase: 3 },
  { num: 298, title: 'Divide Two Integers', difficulty: 'Medium', link: 'https://leetcode.com/problems/divide-two-integers/', topic: 'Bit Manipulation', phase: 3 },
  { num: 299, title: 'UTF-8 Validation', difficulty: 'Medium', link: 'https://leetcode.com/problems/utf-8-validation/', topic: 'Bit Manipulation', phase: 3 },
  { num: 300, title: 'Maximum Product of Word Lengths', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-product-of-word-lengths/', topic: 'Bit Manipulation', phase: 3 },

  // ── Phase 4: Graph Algorithms (301–400) ───────────────────────────
  // Graph BFS/DFS (301–325)
  { num: 301, title: 'Number of Islands', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-islands/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 302, title: 'Max Area of Island', difficulty: 'Medium', link: 'https://leetcode.com/problems/max-area-of-island/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 303, title: 'Flood Fill', difficulty: 'Easy', link: 'https://leetcode.com/problems/flood-fill/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 304, title: 'Clone Graph', difficulty: 'Medium', link: 'https://leetcode.com/problems/clone-graph/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 305, title: 'Course Schedule', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 306, title: 'Number of Connected Components in an Undirected Graph', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 307, title: 'Pacific Atlantic Water Flow', difficulty: 'Medium', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 308, title: 'Surrounded Regions', difficulty: 'Medium', link: 'https://leetcode.com/problems/surrounded-regions/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 309, title: 'Rotting Oranges', difficulty: 'Medium', link: 'https://leetcode.com/problems/rotting-oranges/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 310, title: 'Walls and Gates', difficulty: 'Medium', link: 'https://leetcode.com/problems/walls-and-gates/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 311, title: 'Word Ladder', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-ladder/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 312, title: 'Word Ladder II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-ladder-ii/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 313, title: 'Number of Provinces', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-provinces/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 314, title: 'Graph Valid Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/graph-valid-tree/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 315, title: 'Keys and Rooms', difficulty: 'Medium', link: 'https://leetcode.com/problems/keys-and-rooms/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 316, title: 'All Paths From Source to Target', difficulty: 'Medium', link: 'https://leetcode.com/problems/all-paths-from-source-to-target/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 317, title: 'Minimum Height Trees', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-height-trees/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 318, title: 'Snakes and Ladders', difficulty: 'Medium', link: 'https://leetcode.com/problems/snakes-and-ladders/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 319, title: 'Reachable Nodes In Subdivided Graph', difficulty: 'Hard', link: 'https://leetcode.com/problems/reachable-nodes-in-subdivided-graph/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 320, title: 'Is Graph Bipartite?', difficulty: 'Medium', link: 'https://leetcode.com/problems/is-graph-bipartite/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 321, title: '01 Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/01-matrix/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 322, title: 'Jump Game III', difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game-iii/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 323, title: 'Find Eventual Safe States', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-eventual-safe-states/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 324, title: 'Shortest Bridge', difficulty: 'Medium', link: 'https://leetcode.com/problems/shortest-bridge/', topic: 'Graph BFS/DFS', phase: 4 },
  { num: 325, title: 'Bus Routes', difficulty: 'Hard', link: 'https://leetcode.com/problems/bus-routes/', topic: 'Graph BFS/DFS', phase: 4 },
  // Union Find (326–340)
  { num: 326, title: 'Number of Islands (Union-Find approach)', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-islands/', topic: 'Union Find', phase: 4 },
  { num: 327, title: 'Redundant Connection', difficulty: 'Medium', link: 'https://leetcode.com/problems/redundant-connection/', topic: 'Union Find', phase: 4 },
  { num: 328, title: 'Redundant Connection II', difficulty: 'Hard', link: 'https://leetcode.com/problems/redundant-connection-ii/', topic: 'Union Find', phase: 4 },
  { num: 329, title: 'Friend Circles', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-provinces/', topic: 'Union Find', phase: 4 },
  { num: 330, title: 'Accounts Merge', difficulty: 'Medium', link: 'https://leetcode.com/problems/accounts-merge/', topic: 'Union Find', phase: 4 },
  { num: 331, title: 'Satisfiability of Equality Equations', difficulty: 'Medium', link: 'https://leetcode.com/problems/satisfiability-of-equality-equations/', topic: 'Union Find', phase: 4 },
  { num: 332, title: 'Number of Operations to Make Network Connected', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-operations-to-make-network-connected/', topic: 'Union Find', phase: 4 },
  { num: 333, title: 'Largest Component Size by Common Factor', difficulty: 'Hard', link: 'https://leetcode.com/problems/largest-component-size-by-common-factor/', topic: 'Union Find', phase: 4 },
  { num: 334, title: 'Most Stones Removed with Same Row or Column', difficulty: 'Medium', link: 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/', topic: 'Union Find', phase: 4 },
  { num: 335, title: 'Minimum Spanning Tree (Kruskal\'s)', difficulty: 'Medium', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', topic: 'Union Find', phase: 4 },
  { num: 336, title: 'Number of Good Paths', difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-good-paths/', topic: 'Union Find', phase: 4 },
  { num: 337, title: 'Checking Existence of Edge Length Limited Paths', difficulty: 'Hard', link: 'https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/', topic: 'Union Find', phase: 4 },
  { num: 338, title: 'Count Unreachable Pairs of Nodes', difficulty: 'Medium', link: 'https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph/', topic: 'Union Find', phase: 4 },
  { num: 339, title: 'Smallest String With Swaps', difficulty: 'Medium', link: 'https://leetcode.com/problems/smallest-string-with-swaps/', topic: 'Union Find', phase: 4 },
  { num: 340, title: 'Swim in Rising Water', difficulty: 'Hard', link: 'https://leetcode.com/problems/swim-in-rising-water/', topic: 'Union Find', phase: 4 },
  // Topological Sort (341–350)
  { num: 341, title: 'Course Schedule II', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule-ii/', topic: 'Topological Sort', phase: 4 },
  { num: 342, title: 'Alien Dictionary', difficulty: 'Hard', link: 'https://leetcode.com/problems/alien-dictionary/', topic: 'Topological Sort', phase: 4 },
  { num: 343, title: 'Sequence Reconstruction', difficulty: 'Medium', link: 'https://leetcode.com/problems/sequence-reconstruction/', topic: 'Topological Sort', phase: 4 },
  { num: 344, title: 'Minimum Height Trees (topo)', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-height-trees/', topic: 'Topological Sort', phase: 4 },
  { num: 345, title: 'Sort Items by Groups Respecting Dependencies', difficulty: 'Hard', link: 'https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies/', topic: 'Topological Sort', phase: 4 },
  { num: 346, title: 'Find All Possible Recipes from Given Supplies', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/', topic: 'Topological Sort', phase: 4 },
  { num: 347, title: 'Parallel Courses', difficulty: 'Medium', link: 'https://leetcode.com/problems/parallel-courses/', topic: 'Topological Sort', phase: 4 },
  { num: 348, title: 'Longest Increasing Path in a Matrix', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', topic: 'Topological Sort', phase: 4 },
  { num: 349, title: 'Build a Matrix With Conditions', difficulty: 'Hard', link: 'https://leetcode.com/problems/build-a-matrix-with-conditions/', topic: 'Topological Sort', phase: 4 },
  { num: 350, title: 'Find Eventual Safe States (topo)', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-eventual-safe-states/', topic: 'Topological Sort', phase: 4 },
  // Shortest Path (351–360)
  { num: 351, title: 'Network Delay Time', difficulty: 'Medium', link: 'https://leetcode.com/problems/network-delay-time/', topic: 'Shortest Path', phase: 4 },
  { num: 352, title: 'Path With Minimum Effort', difficulty: 'Medium', link: 'https://leetcode.com/problems/path-with-minimum-effort/', topic: 'Shortest Path', phase: 4 },
  { num: 353, title: 'Cheapest Flights Within K Stops', difficulty: 'Medium', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', topic: 'Shortest Path', phase: 4 },
  { num: 354, title: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/', topic: 'Shortest Path', phase: 4 },
  { num: 355, title: 'Minimum Cost to Reach City With Discounts', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-cost-to-reach-city-with-discounts/', topic: 'Shortest Path', phase: 4 },
  { num: 356, title: 'Path With Maximum Probability', difficulty: 'Medium', link: 'https://leetcode.com/problems/path-with-maximum-probability/', topic: 'Shortest Path', phase: 4 },
  { num: 357, title: 'The Maze', difficulty: 'Medium', link: 'https://leetcode.com/problems/the-maze/', topic: 'Shortest Path', phase: 4 },
  { num: 358, title: 'The Maze II', difficulty: 'Medium', link: 'https://leetcode.com/problems/the-maze-ii/', topic: 'Shortest Path', phase: 4 },
  { num: 359, title: 'Shortest Path in Binary Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', topic: 'Shortest Path', phase: 4 },
  { num: 360, title: 'Minimum Cost to Connect All Points', difficulty: 'Medium', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', topic: 'Shortest Path', phase: 4 },

  // ── Phase 5: Dynamic Programming (361–480) ────────────────────────
  // 1D DP (361–375)
  { num: 361, title: 'Climbing Stairs', difficulty: 'Easy', link: 'https://leetcode.com/problems/climbing-stairs/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 362, title: 'House Robber', difficulty: 'Medium', link: 'https://leetcode.com/problems/house-robber/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 363, title: 'House Robber II', difficulty: 'Medium', link: 'https://leetcode.com/problems/house-robber-ii/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 364, title: 'Decode Ways', difficulty: 'Medium', link: 'https://leetcode.com/problems/decode-ways/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 365, title: 'Word Break', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-break/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 366, title: 'Jump Game (DP)', difficulty: 'Medium', link: 'https://leetcode.com/problems/jump-game/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 367, title: 'Maximum Alternating Subsequence Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-alternating-subsequence-sum/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 368, title: 'Minimum Cost For Tickets', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-cost-for-tickets/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 369, title: 'Counting Bits (DP)', difficulty: 'Easy', link: 'https://leetcode.com/problems/counting-bits/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 370, title: 'Delete and Earn', difficulty: 'Medium', link: 'https://leetcode.com/problems/delete-and-earn/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 371, title: 'Fibonacci Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/fibonacci-number/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 372, title: 'N-th Tribonacci Number', difficulty: 'Easy', link: 'https://leetcode.com/problems/n-th-tribonacci-number/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 373, title: 'Minimum Number of Perfect Squares', difficulty: 'Medium', link: 'https://leetcode.com/problems/perfect-squares/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 374, title: 'Paint Fence', difficulty: 'Medium', link: 'https://leetcode.com/problems/paint-fence/', topic: '1D Dynamic Programming', phase: 5 },
  { num: 375, title: 'Length of Longest Fibonacci Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/length-of-longest-fibonacci-subsequence/', topic: '1D Dynamic Programming', phase: 5 },
  // 2D DP (376–390)
  { num: 376, title: 'Unique Paths', difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-paths/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 377, title: 'Unique Paths II', difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-paths-ii/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 378, title: 'Minimum Path Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-path-sum/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 379, title: 'Maximal Square', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximal-square/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 380, title: 'Triangle', difficulty: 'Medium', link: 'https://leetcode.com/problems/triangle/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 381, title: 'Dungeon Game', difficulty: 'Hard', link: 'https://leetcode.com/problems/dungeon-game/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 382, title: 'Cherry Pickup', difficulty: 'Hard', link: 'https://leetcode.com/problems/cherry-pickup/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 383, title: 'Cherry Pickup II', difficulty: 'Hard', link: 'https://leetcode.com/problems/cherry-pickup-ii/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 384, title: 'Number of Ways to Stay in the Same Place After Some Steps', difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-ways-to-stay-in-the-same-place-after-some-steps/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 385, title: 'Burst Balloons', difficulty: 'Hard', link: 'https://leetcode.com/problems/burst-balloons/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 386, title: 'Paint House', difficulty: 'Medium', link: 'https://leetcode.com/problems/paint-house/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 387, title: 'Paint House II', difficulty: 'Hard', link: 'https://leetcode.com/problems/paint-house-ii/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 388, title: 'Grid Unique Paths with Obstacles', difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-paths-ii/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 389, title: 'Out of Boundary Paths', difficulty: 'Medium', link: 'https://leetcode.com/problems/out-of-boundary-paths/', topic: '2D Dynamic Programming', phase: 5 },
  { num: 390, title: 'Number of Dice Rolls With Target Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-dice-rolls-with-target-sum/', topic: '2D Dynamic Programming', phase: 5 },
  // DP on Strings (391–405)
  { num: 391, title: 'Longest Common Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-common-subsequence/', topic: 'DP on Strings', phase: 5 },
  { num: 392, title: 'Longest Palindromic Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-subsequence/', topic: 'DP on Strings', phase: 5 },
  { num: 393, title: 'Edit Distance', difficulty: 'Medium', link: 'https://leetcode.com/problems/edit-distance/', topic: 'DP on Strings', phase: 5 },
  { num: 394, title: 'Distinct Subsequences', difficulty: 'Hard', link: 'https://leetcode.com/problems/distinct-subsequences/', topic: 'DP on Strings', phase: 5 },
  { num: 395, title: 'Interleaving String', difficulty: 'Medium', link: 'https://leetcode.com/problems/interleaving-string/', topic: 'DP on Strings', phase: 5 },
  { num: 396, title: 'Regular Expression Matching', difficulty: 'Hard', link: 'https://leetcode.com/problems/regular-expression-matching/', topic: 'DP on Strings', phase: 5 },
  { num: 397, title: 'Wildcard Matching', difficulty: 'Hard', link: 'https://leetcode.com/problems/wildcard-matching/', topic: 'DP on Strings', phase: 5 },
  { num: 398, title: 'Minimum ASCII Delete Sum for Two Strings', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings/', topic: 'DP on Strings', phase: 5 },
  { num: 399, title: 'Shortest Common Supersequence', difficulty: 'Hard', link: 'https://leetcode.com/problems/shortest-common-supersequence/', topic: 'DP on Strings', phase: 5 },
  { num: 400, title: 'Longest Palindromic Substring (DP)', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-palindromic-substring/', topic: 'DP on Strings', phase: 5 },
  { num: 401, title: 'Palindrome Partitioning II', difficulty: 'Hard', link: 'https://leetcode.com/problems/palindrome-partitioning-ii/', topic: 'DP on Strings', phase: 5 },
  { num: 402, title: 'Word Break II', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-break-ii/', topic: 'DP on Strings', phase: 5 },
  { num: 403, title: 'Count Different Palindromic Subsequences', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-different-palindromic-subsequences/', topic: 'DP on Strings', phase: 5 },
  { num: 404, title: 'Uncrossed Lines', difficulty: 'Medium', link: 'https://leetcode.com/problems/uncrossed-lines/', topic: 'DP on Strings', phase: 5 },
  { num: 405, title: 'Delete Operation for Two Strings', difficulty: 'Medium', link: 'https://leetcode.com/problems/delete-operation-for-two-strings/', topic: 'DP on Strings', phase: 5 },
  // DP on Trees (406–415)
  { num: 406, title: 'House Robber III', difficulty: 'Medium', link: 'https://leetcode.com/problems/house-robber-iii/', topic: 'DP on Trees', phase: 5 },
  { num: 407, title: 'Diameter of Binary Tree (DP)', difficulty: 'Easy', link: 'https://leetcode.com/problems/diameter-of-binary-tree/', topic: 'DP on Trees', phase: 5 },
  { num: 408, title: 'Binary Tree Maximum Path Sum (DP)', difficulty: 'Hard', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', topic: 'DP on Trees', phase: 5 },
  { num: 409, title: 'Unique Binary Search Trees (DP)', difficulty: 'Medium', link: 'https://leetcode.com/problems/unique-binary-search-trees/', topic: 'DP on Trees', phase: 5 },
  { num: 410, title: 'Count Complete Tree Nodes', difficulty: 'Easy', link: 'https://leetcode.com/problems/count-complete-tree-nodes/', topic: 'DP on Trees', phase: 5 },
  { num: 411, title: 'Maximum Sum BST in Binary Tree', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/', topic: 'DP on Trees', phase: 5 },
  { num: 412, title: 'Longest ZigZag Path in a Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-zigzag-path-in-a-binary-tree/', topic: 'DP on Trees', phase: 5 },
  { num: 413, title: 'Distribute Coins in Binary Tree', difficulty: 'Medium', link: 'https://leetcode.com/problems/distribute-coins-in-binary-tree/', topic: 'DP on Trees', phase: 5 },
  { num: 414, title: 'Number of Ways to Reorder Array to Get Same BST', difficulty: 'Hard', link: 'https://leetcode.com/problems/number-of-ways-to-reorder-array-to-get-same-bst/', topic: 'DP on Trees', phase: 5 },
  { num: 415, title: 'Binary Tree Coloring Game', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-coloring-game/', topic: 'DP on Trees', phase: 5 },
  // Knapsack Problems (416–425)
  { num: 416, title: 'Partition Equal Subset Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', topic: 'Knapsack Problems', phase: 5 },
  { num: 417, title: 'Target Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/target-sum/', topic: 'Knapsack Problems', phase: 5 },
  { num: 418, title: 'Coin Change', difficulty: 'Medium', link: 'https://leetcode.com/problems/coin-change/', topic: 'Knapsack Problems', phase: 5 },
  { num: 419, title: 'Coin Change II', difficulty: 'Medium', link: 'https://leetcode.com/problems/coin-change-ii/', topic: 'Knapsack Problems', phase: 5 },
  { num: 420, title: 'Last Stone Weight II', difficulty: 'Medium', link: 'https://leetcode.com/problems/last-stone-weight-ii/', topic: 'Knapsack Problems', phase: 5 },
  { num: 421, title: 'Ones and Zeroes', difficulty: 'Medium', link: 'https://leetcode.com/problems/ones-and-zeroes/', topic: 'Knapsack Problems', phase: 5 },
  { num: 422, title: 'Minimum Number of Elements to Remove to Make Mountain Array', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/', topic: 'Knapsack Problems', phase: 5 },
  { num: 423, title: 'Count of Subset with Given Difference', difficulty: 'Medium', link: 'https://leetcode.com/problems/target-sum/', topic: 'Knapsack Problems', phase: 5 },
  { num: 424, title: 'Maximum Profit in Job Scheduling', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-profit-in-job-scheduling/', topic: 'Knapsack Problems', phase: 5 },
  { num: 425, title: 'Profitable Schemes', difficulty: 'Hard', link: 'https://leetcode.com/problems/profitable-schemes/', topic: 'Knapsack Problems', phase: 5 },
  // Advanced DP (426–440)
  { num: 426, title: 'Longest Increasing Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', topic: 'Advanced DP', phase: 5 },
  { num: 427, title: 'Russian Doll Envelopes', difficulty: 'Hard', link: 'https://leetcode.com/problems/russian-doll-envelopes/', topic: 'Advanced DP', phase: 5 },
  { num: 428, title: 'Number of Longest Increasing Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/', topic: 'Advanced DP', phase: 5 },
  { num: 429, title: 'Maximum Length of Pair Chain', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-length-of-pair-chain/', topic: 'Advanced DP', phase: 5 },
  { num: 430, title: 'Stone Game', difficulty: 'Medium', link: 'https://leetcode.com/problems/stone-game/', topic: 'Advanced DP', phase: 5 },
  { num: 431, title: 'Stone Game II', difficulty: 'Medium', link: 'https://leetcode.com/problems/stone-game-ii/', topic: 'Advanced DP', phase: 5 },
  { num: 432, title: 'Stone Game III', difficulty: 'Hard', link: 'https://leetcode.com/problems/stone-game-iii/', topic: 'Advanced DP', phase: 5 },
  { num: 433, title: 'Predict the Winner', difficulty: 'Medium', link: 'https://leetcode.com/problems/predict-the-winner/', topic: 'Advanced DP', phase: 5 },
  { num: 434, title: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'Medium', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/', topic: 'Advanced DP', phase: 5 },
  { num: 435, title: 'Best Time to Buy and Sell Stock with Transaction Fee', difficulty: 'Medium', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/', topic: 'Advanced DP', phase: 5 },
  { num: 436, title: 'Best Time to Buy and Sell Stock III', difficulty: 'Hard', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', topic: 'Advanced DP', phase: 5 },
  { num: 437, title: 'Best Time to Buy and Sell Stock IV', difficulty: 'Hard', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/', topic: 'Advanced DP', phase: 5 },
  { num: 438, title: 'Strange Printer', difficulty: 'Hard', link: 'https://leetcode.com/problems/strange-printer/', topic: 'Advanced DP', phase: 5 },
  { num: 439, title: 'Minimum Cost to Cut a Stick', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-cut-a-stick/', topic: 'Advanced DP', phase: 5 },
  { num: 440, title: 'Integer Break', difficulty: 'Medium', link: 'https://leetcode.com/problems/integer-break/', topic: 'Advanced DP', phase: 5 },

  // ── Phase 6: Advanced Topics (441–500) ────────────────────────────
  // Trie (441–450)
  { num: 441, title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/', topic: 'Trie', phase: 6 },
  { num: 442, title: 'Add and Search Word - Data structure design', difficulty: 'Medium', link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', topic: 'Trie', phase: 6 },
  { num: 443, title: 'Replace Words', difficulty: 'Medium', link: 'https://leetcode.com/problems/replace-words/', topic: 'Trie', phase: 6 },
  { num: 444, title: 'Maximum XOR of Two Numbers in an Array (Trie)', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', topic: 'Trie', phase: 6 },
  { num: 445, title: 'Word Search II (Trie)', difficulty: 'Hard', link: 'https://leetcode.com/problems/word-search-ii/', topic: 'Trie', phase: 6 },
  { num: 446, title: 'Palindrome Pairs', difficulty: 'Hard', link: 'https://leetcode.com/problems/palindrome-pairs/', topic: 'Trie', phase: 6 },
  { num: 447, title: 'Search Suggestions System', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-suggestions-system/', topic: 'Trie', phase: 6 },
  { num: 448, title: 'Design Search Autocomplete System', difficulty: 'Hard', link: 'https://leetcode.com/problems/design-search-autocomplete-system/', topic: 'Trie', phase: 6 },
  { num: 449, title: 'Stream of Characters', difficulty: 'Hard', link: 'https://leetcode.com/problems/stream-of-characters/', topic: 'Trie', phase: 6 },
  { num: 450, title: 'Count Words Obtained After Adding a Letter', difficulty: 'Medium', link: 'https://leetcode.com/problems/count-words-obtained-after-adding-a-letter/', topic: 'Trie', phase: 6 },
  // Segment Tree / Binary Indexed Tree (451–460)
  { num: 451, title: 'Range Sum Query - Mutable', difficulty: 'Medium', link: 'https://leetcode.com/problems/range-sum-query-mutable/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 452, title: 'Range Sum Query 2D - Mutable', difficulty: 'Hard', link: 'https://leetcode.com/problems/range-sum-query-2d-mutable/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 453, title: 'Count of Smaller Numbers After Self (BIT)', difficulty: 'Hard', link: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 454, title: 'Queue Reconstruction by Height (BIT)', difficulty: 'Medium', link: 'https://leetcode.com/problems/queue-reconstruction-by-height/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 455, title: 'Number of Longest Increasing Subsequence (BIT)', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 456, title: 'Reverse Pairs (BIT/Merge Sort)', difficulty: 'Hard', link: 'https://leetcode.com/problems/reverse-pairs/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 457, title: 'Falling Squares', difficulty: 'Hard', link: 'https://leetcode.com/problems/falling-squares/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 458, title: 'My Calendar I', difficulty: 'Medium', link: 'https://leetcode.com/problems/my-calendar-i/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 459, title: 'My Calendar II', difficulty: 'Medium', link: 'https://leetcode.com/problems/my-calendar-ii/', topic: 'Segment Tree / BIT', phase: 6 },
  { num: 460, title: 'My Calendar III', difficulty: 'Hard', link: 'https://leetcode.com/problems/my-calendar-iii/', topic: 'Segment Tree / BIT', phase: 6 },
  // Advanced Graph Problems (461–470)
  { num: 461, title: 'Critical Connections in a Network', difficulty: 'Hard', link: 'https://leetcode.com/problems/critical-connections-in-a-network/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 462, title: 'Reconstruct Itinerary', difficulty: 'Hard', link: 'https://leetcode.com/problems/reconstruct-itinerary/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 463, title: 'Evaluate Division', difficulty: 'Medium', link: 'https://leetcode.com/problems/evaluate-division/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 464, title: 'Minimum Number of Vertices to Reach All Nodes', difficulty: 'Medium', link: 'https://leetcode.com/problems/minimum-number-of-vertices-to-reach-all-nodes/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 465, title: 'Count Sub Islands', difficulty: 'Medium', link: 'https://leetcode.com/problems/count-sub-islands/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 466, title: 'Making a Large Island', difficulty: 'Hard', link: 'https://leetcode.com/problems/making-a-large-island/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 467, title: 'Longest Cycle in a Graph', difficulty: 'Hard', link: 'https://leetcode.com/problems/longest-cycle-in-a-graph/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 468, title: 'Number of Ways to Arrive at Destination', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 469, title: 'Maximal Network Rank', difficulty: 'Medium', link: 'https://leetcode.com/problems/maximal-network-rank/', topic: 'Advanced Graph Problems', phase: 6 },
  { num: 470, title: 'Course Schedule IV', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule-iv/', topic: 'Advanced Graph Problems', phase: 6 },
  // Hard Mixed Review (471–500)
  { num: 471, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 472, title: 'LFU Cache', difficulty: 'Hard', link: 'https://leetcode.com/problems/lfu-cache/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 473, title: 'Design Twitter', difficulty: 'Medium', link: 'https://leetcode.com/problems/design-twitter/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 474, title: 'Serialize and Deserialize N-ary Tree', difficulty: 'Hard', link: 'https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 475, title: 'Scramble String', difficulty: 'Hard', link: 'https://leetcode.com/problems/scramble-string/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 476, title: 'Zuma Game', difficulty: 'Hard', link: 'https://leetcode.com/problems/zuma-game/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 477, title: 'Maximize Score After N Operations', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximize-score-after-n-operations/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 478, title: 'Minimum Number of Moves to Seat Everyone', difficulty: 'Easy', link: 'https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 479, title: 'Random Pick with Weight', difficulty: 'Medium', link: 'https://leetcode.com/problems/random-pick-with-weight/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 480, title: 'Couples Holding Hands', difficulty: 'Hard', link: 'https://leetcode.com/problems/couples-holding-hands/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 481, title: 'Stickers to Spell Word', difficulty: 'Hard', link: 'https://leetcode.com/problems/stickers-to-spell-word/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 482, title: 'Minimum Window Subsequence', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-window-subsequence/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 483, title: 'Race Car', difficulty: 'Hard', link: 'https://leetcode.com/problems/race-car/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 484, title: 'K-th Symbol in Grammar', difficulty: 'Medium', link: 'https://leetcode.com/problems/k-th-symbol-in-grammar/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 485, title: 'Sum of Distances in Tree', difficulty: 'Hard', link: 'https://leetcode.com/problems/sum-of-distances-in-tree/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 486, title: 'Maximum Gap', difficulty: 'Hard', link: 'https://leetcode.com/problems/maximum-gap/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 487, title: 'Find Minimum in Rotated Sorted Array II', difficulty: 'Hard', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 488, title: 'Substring with Concatenation of All Words', difficulty: 'Hard', link: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 489, title: 'Regular Expression Matching (revisit)', difficulty: 'Hard', link: 'https://leetcode.com/problems/regular-expression-matching/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 490, title: 'Sudoku Solver (revisit)', difficulty: 'Hard', link: 'https://leetcode.com/problems/sudoku-solver/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 491, title: 'Trapping Rain Water II', difficulty: 'Hard', link: 'https://leetcode.com/problems/trapping-rain-water-ii/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 492, title: 'Minimum Cost to Make at Least One Valid Path in a Grid', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 493, title: 'Verbal Arithmetic Puzzle', difficulty: 'Hard', link: 'https://leetcode.com/problems/verbal-arithmetic-puzzle/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 494, title: 'Allocate Mailboxes', difficulty: 'Hard', link: 'https://leetcode.com/problems/allocate-mailboxes/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 495, title: 'Max Dot Product of Two Subsequences', difficulty: 'Hard', link: 'https://leetcode.com/problems/max-dot-product-of-two-subsequences/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 496, title: 'Minimum Number of Removals to Make Mountain Array', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-number-of-removals-to-make-mountain-array/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 497, title: 'Cat and Mouse', difficulty: 'Hard', link: 'https://leetcode.com/problems/cat-and-mouse/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 498, title: 'Stamping The Sequence', difficulty: 'Hard', link: 'https://leetcode.com/problems/stamping-the-sequence/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 499, title: 'Palindrome Removal', difficulty: 'Hard', link: 'https://leetcode.com/problems/palindrome-removal/', topic: 'Hard Mixed Review', phase: 6 },
  { num: 500, title: 'Minimum Cost to Merge Stones', difficulty: 'Hard', link: 'https://leetcode.com/problems/minimum-cost-to-merge-stones/', topic: 'Hard Mixed Review', phase: 6 },
];

const PHASE_META = [
  { phase: 1, label: 'Foundations Warm-Up', range: '1–80',   color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)' },
  { phase: 2, label: 'Core Data Structures', range: '81–200',  color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)' },
  { phase: 3, label: 'Intermediate Algorithms', range: '201–320', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)' },
  { phase: 4, label: 'Graph Algorithms', range: '301–400', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.2)' },
  { phase: 5, label: 'Dynamic Programming', range: '361–480', color: '#f472b6', bg: 'rgba(244,114,182,0.08)',  border: 'rgba(244,114,182,0.2)' },
  { phase: 6, label: 'Advanced Topics', range: '441–500', color: '#fb923c', bg: 'rgba(251,146,60,0.08)',   border: 'rgba(251,146,60,0.2)' },
];

@Component({
  selector: 'app-lc',
  templateUrl: './lc.component.html',
  styleUrls: ['./lc.component.scss'],
})
export class LcComponent implements OnInit {
  phases: PhaseGroup[] = [];
  searchQuery = '';
  filteredQuestions: LCQuestion[] = [];
  isSearching = false;

  readonly phaseMeta = PHASE_META;
  readonly totalQuestions = ALL_QUESTIONS.length;
  readonly easyCount = ALL_QUESTIONS.filter(q => q.difficulty === 'Easy').length;
  readonly mediumCount = ALL_QUESTIONS.filter(q => q.difficulty === 'Medium').length;
  readonly hardCount = ALL_QUESTIONS.filter(q => q.difficulty === 'Hard').length;

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('LeetCode 500 | Nikhil Kumar Patra');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.buildPhases();
  }

  private buildPhases(): void {
    this.phases = PHASE_META.map(pm => ({
      phase: pm.phase,
      label: pm.label,
      range: pm.range,
      questions: ALL_QUESTIONS.filter(q => q.phase === pm.phase),
    }));
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    if (!query.trim()) {
      this.isSearching = false;
      this.filteredQuestions = [];
      return;
    }
    const q = query.toLowerCase();
    this.isSearching = true;
    this.filteredQuestions = ALL_QUESTIONS.filter(
      x =>
        x.title.toLowerCase().includes(q) ||
        x.topic.toLowerCase().includes(q) ||
        String(x.num).includes(q)
    );
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.isSearching = false;
    this.filteredQuestions = [];
  }

  phaseColor(phase: number): string {
    return PHASE_META.find(p => p.phase === phase)?.color ?? '#ffffff';
  }

  phaseBg(phase: number): string {
    return PHASE_META.find(p => p.phase === phase)?.bg ?? 'transparent';
  }

  phaseBorder(phase: number): string {
    return PHASE_META.find(p => p.phase === phase)?.border ?? 'transparent';
  }

  trackByNum(index: number, q: LCQuestion): number {
    return q.num;
  }

  trackByPhase(index: number, p: PhaseGroup): number {
    return p.phase;
  }
}
