import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, RotateCcw, Info, GitBranch, MoveHorizontal } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
  level: number;
}

const BinaryTreeModule: React.FC = () => {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [inputValue, setInputValue] = useState<number | ''>('');
  const [message, setMessage] = useState('The Banyan tree grows from a single seed. Each branch can split into two, left and right.');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (root && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      container.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, [root]);

  const insert = (node: TreeNode | null, value: number, x: number, y: number, level: number, offset: number): TreeNode => {
    if (!node) {
      return { value, x, y, level };
    }

    if (value < node.value) {
      return {
        ...node,
        left: insert(node.left || null, value, x - offset, y + 80, level + 1, offset / 2)
      };
    } else if (value > node.value) {
      return {
        ...node,
        right: insert(node.right || null, value, x + offset, y + 80, level + 1, offset / 2)
      };
    }

    return node;
  };

  const handleInsert = () => {
    if (inputValue === '') return;
    const val = Number(inputValue);
    setRoot(prev => insert(prev, val, 0, 0, 0, 120));
    setInputValue('');
    setMessage(`The seed of value ${val} has found its place in the Banyan tree.`);
  };

  const renderTreeNodes = (node: TreeNode | null): React.ReactNode => {
    if (!node) return null;

    return (
      <React.Fragment key={`${node.value}-${node.x}-${node.y}`}>
        {/* The Node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute w-12 h-12 bg-earth-sage rounded-full flex items-center justify-center text-white font-bold shadow-md border-2 border-white/20 z-10"
          style={{ 
            left: `${400 + node.x - 24}px`, 
            top: `${node.y + 20}px` 
          }}
        >
          {node.value}
        </motion.div>

        {renderTreeNodes(node.left || null)}
        {renderTreeNodes(node.right || null)}
      </React.Fragment>
    );
  };

  const renderTreeLines = (node: TreeNode | null): React.ReactNode => {
    if (!node) return null;

    return (
      <React.Fragment key={`lines-${node.value}`}>
        {node.left && (
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            x1={400 + node.x}
            y1={node.y + 44}
            x2={400 + node.left.x}
            y2={node.left.y + 44}
            stroke="#d2b48c"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <motion.line
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            x1={400 + node.x}
            y1={node.y + 44}
            x2={400 + node.right.x}
            y2={node.right.y + 44}
            stroke="#d2b48c"
            strokeWidth="2"
          />
        )}
        {renderTreeLines(node.left || null)}
        {renderTreeLines(node.right || null)}
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 story-card p-6 md:p-8 flex flex-col relative overflow-hidden min-h-[500px]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 z-20">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-wood dark:text-earth-parchment">The Banyan of Ancestors</h2>
              <p className="text-earth-clay italic">A tale of branching paths (Binary Search Tree)</p>
            </div>
            <div className="bg-earth-clay/10 dark:bg-white/5 p-4 rounded-2xl w-full md:max-w-xs border border-earth-clay/20">
              <div className="flex items-center gap-2 mb-1 text-earth-wood dark:text-earth-parchment font-bold text-sm">
                <Info size={16} />
                <span>The Moral</span>
              </div>
              <p className="text-xs text-earth-wood/70 dark:text-earth-parchment/70 leading-relaxed">
                Every branch is a choice. To find your way, you must know if you belong to the left or the right.
              </p>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex-1 relative mt-10 overflow-x-auto scrollbar-hide min-h-[400px] cursor-grab active:cursor-grabbing"
          >
            <div className="w-[800px] h-full relative mx-auto">
              {root ? (
                <>
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                    {renderTreeLines(root)}
                  </svg>
                  {renderTreeNodes(root)}
                  
                  {/* Mobile Hint */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-earth-clay/40 lg:hidden pointer-events-none"
                  >
                    <MoveHorizontal size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Swipe to explore</span>
                  </motion.div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-earth-clay/40 font-serif italic text-xl">Plant the first seed...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:w-80 shrink-0">
          <div className="story-card p-6">
            <h3 className="text-lg font-serif font-bold text-earth-wood dark:text-earth-parchment mb-4">Tree Planter</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-earth-clay uppercase tracking-widest mb-1 block">Seed Value</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value === '' ? '' : parseInt(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                  placeholder="e.g. 50"
                  className="w-full bg-earth-parchment dark:bg-dark-ink border border-earth-clay/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-terracotta/20 transition-all text-earth-wood dark:text-earth-parchment"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <button
                  onClick={handleInsert}
                  className="btn-earth-primary flex items-center justify-center gap-2 py-3"
                >
                  <Plus size={18} />
                  Plant Seed
                </button>
                <button
                  onClick={() => { setRoot(null); setMessage('The tree has been cleared. A new forest awaits.'); }}
                  className="btn-earth-outline flex items-center justify-center gap-2 py-3"
                >
                  <RotateCcw size={18} />
                  Clear Forest
                </button>
              </div>
            </div>
          </div>

          <div className="story-card p-6 bg-earth-wood dark:bg-dark-ink text-earth-parchment flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-earth-terracotta">
                <GitBranch size={20} />
                <h3 className="text-lg font-serif font-bold">The Scribe's Log</h3>
              </div>
              
              {/* Log Animation */}
              <AnimatePresence mode="wait">
                {message.includes('seed') ? (
                  <motion.div
                    key="grow"
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    className="text-earth-sage"
                  >
                    <GitBranch size={20} />
                  </motion.div>
                ) : message.includes('cleared') ? (
                  <motion.div
                    key="clear"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    className="text-earth-terracotta"
                  >
                    <GitBranch size={20} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="h-32 overflow-y-auto scrollbar-hide relative z-10">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={message}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  className="text-sm leading-relaxed text-earth-clay italic"
                >
                  {message}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <GitBranch size={120} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <CodeSnippet concept="Binary Tree" />
    </div>
  );
};

export default BinaryTreeModule;
