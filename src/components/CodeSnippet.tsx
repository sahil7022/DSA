import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface CodeSnippetProps {
  concept: string;
}

const codeData: Record<string, { language: string; code: string }> = {
  'Stack': {
    language: 'TypeScript',
    code: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}`
  },
  'Binary Search': {
    language: 'TypeScript',
    code: `function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
  },
  'Linked List': {
    language: 'TypeScript',
    code: `class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

class LinkedList<T> {
  private head: Node<T> | null = null;

  addHead(value: T): void {
    const newNode = new Node(value, this.head);
    this.head = newNode;
  }
}`
  },
  'Binary Tree': {
    language: 'TypeScript',
    code: `class TreeNode {
  constructor(
    public value: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

function insert(root: TreeNode | null, val: number): TreeNode {
  if (!root) return new TreeNode(val);
  if (val < root.value) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}`
  }
};

const CodeSnippet: React.FC<CodeSnippetProps> = ({ concept }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const data = codeData[concept];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!data) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-earth-terracotta text-white rounded-lg">
            <Code2 size={18} />
          </div>
          <span className="font-serif font-bold text-earth-parchment">The Ancient Script (Code)</span>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-6 bg-earth-ink text-earth-parchment rounded-2xl relative group font-mono text-sm leading-relaxed shadow-2xl">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-earth-clay font-bold">{data.language}</span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Copy Script"
                >
                  {copied ? <Check size={14} className="text-earth-sage" /> : <Copy size={14} />}
                </button>
              </div>
              <pre className="overflow-x-auto scrollbar-hide pt-4">
                <code>{data.code}</code>
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeSnippet;
