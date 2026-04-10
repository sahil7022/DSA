import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Info, Layers, BookOpen } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

interface Pot {
  id: number;
  value: string;
}

const StackModule: React.FC = () => {
  const [stack, setStack] = useState<Pot[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('Welcome to the Potter\'s Workshop. Here, we stack clay pots following the ancient rule of LIFO.');
  const [counter, setCounter] = useState(0);

  const pushToStack = () => {
    if (!inputValue.trim()) return;
    
    const newPot = { id: counter, value: inputValue };
    setStack(prev => [...prev, newPot]);
    setInputValue('');
    setCounter(prev => prev + 1);
    setMessage(`Pushing "${inputValue}" to the top of the stack. It is now the first to be removed.`);
  };

  const popFromStack = () => {
    if (stack.length === 0) {
      setMessage('The stack is empty! No more pots to remove.');
      return;
    }
    
    const removedPot = stack[stack.length - 1];
    setStack(prev => prev.slice(0, -1));
    setMessage(`Popping "${removedPot.value}" from the top. The pot below it is now exposed.`);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Visualizer Stage */}
        <div className="flex-1 story-card p-6 md:p-8 flex flex-col relative overflow-hidden bg-earth-parchment/30 dark:bg-dark-wood/20 min-h-[500px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 z-20">
          <div className="max-w-md">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-wood dark:text-earth-parchment">The Potter's Stack</h2>
            <p className="text-earth-clay italic">A tale of clay and order (LIFO)</p>
          </div>
          <div className="bg-earth-clay/10 dark:bg-white/5 p-4 rounded-2xl w-full md:max-w-xs border border-earth-clay/20">
            <div className="flex items-center gap-2 mb-1 text-earth-wood dark:text-earth-parchment font-bold text-sm">
              <Info size={16} />
              <span>The Moral</span>
            </div>
            <p className="text-xs text-earth-wood/70 dark:text-earth-parchment/70 leading-relaxed">
              Just as the last pot placed on the kiln is the first one taken out, the last element added to a stack is the first one removed.
            </p>
          </div>
        </div>

        {/* The Stack Container */}
        <div className="flex-1 flex flex-col-reverse items-center justify-start gap-1 pb-10 relative overflow-y-auto scrollbar-hide">
          {/* Kiln Base */}
          <div className="w-48 h-4 bg-earth-wood dark:bg-earth-clay rounded-full shadow-md z-10 shrink-0" />
          
          <div className="w-full flex flex-col-reverse items-center gap-1 pt-20">
            <AnimatePresence mode="popLayout">
              {stack.map((pot, index) => (
                <motion.div
                  key={pot.id}
                  initial={{ y: -500, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ x: 200, opacity: 0, scale: 1.1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                  className="relative group shrink-0"
                >
                  {/* Pot Shape */}
                  <div className="w-32 md:w-48 h-16 bg-earth-terracotta rounded-t-3xl rounded-b-lg shadow-lg flex items-center justify-center border-t-4 border-white/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <span className="text-white font-bold text-lg md:text-xl drop-shadow-sm z-10">{pot.value}</span>
                    
                    {/* Pot Rim */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-24 h-2 bg-earth-terracotta border-b border-white/30 rounded-full" />
                  </div>
                  
                  {/* Index Label */}
                  <div className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 text-[10px] font-mono text-earth-clay font-bold uppercase tracking-tighter">
                    Idx {index}
                  </div>
                  
                  {index === stack.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 bg-earth-sage text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter"
                    >
                      Top
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {stack.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-earth-clay/40 font-serif italic text-xl">The kiln is empty...</p>
            </div>
          )}
        </div>
      </div>

      {/* Controls & Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:w-80 shrink-0">
        <div className="story-card p-6">
          <h3 className="text-lg font-serif font-bold text-earth-wood dark:text-earth-parchment mb-4">Potter's Tools</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-bold text-earth-clay uppercase tracking-widest mb-1 block">Pot Label</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && pushToStack()}
                placeholder="e.g. Grain"
                className="w-full bg-earth-parchment dark:bg-dark-ink border border-earth-clay/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-terracotta/20 transition-all text-earth-wood dark:text-earth-parchment"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <button
                onClick={pushToStack}
                className="btn-earth-primary flex items-center justify-center gap-2 py-3"
              >
                <Plus size={18} />
                Push
              </button>
              <button
                onClick={popFromStack}
                className="btn-earth-outline flex items-center justify-center gap-2 py-3"
              >
                <Trash2 size={18} />
                Pop
              </button>
            </div>
          </div>
        </div>

        <div className="story-card p-6 bg-earth-wood dark:bg-dark-ink text-earth-parchment flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-earth-terracotta">
              <BookOpen size={20} />
              <h3 className="text-lg font-serif font-bold">The Scribe's Log</h3>
            </div>
            
            {/* Log Animation */}
            <AnimatePresence mode="wait">
              {message.includes('Pushing') ? (
                <motion.div
                  key="push"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-earth-terracotta"
                >
                  <Layers size={20} />
                </motion.div>
              ) : message.includes('Popping') ? (
                <motion.div
                  key="pop"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -20, opacity: 0 }}
                  className="text-earth-clay"
                >
                  <Layers size={20} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="h-32 overflow-y-auto scrollbar-hide relative z-10">
            <AnimatePresence mode="wait">
              <motion.p 
                key={message}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm leading-relaxed text-earth-clay italic"
              >
                {message}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Layers size={120} />
            </motion.div>
          </div>

          <div className="mt-6 pt-6 border-t border-earth-parchment/10">
            <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-earth-clay">
              <span>Stack Size</span>
              <span className="text-earth-terracotta">{stack.length}</span>
            </div>
            <div className="w-full h-1 bg-earth-parchment/10 rounded-full mt-2 overflow-hidden">
              <motion.div 
                className="h-full bg-earth-terracotta"
                animate={{ width: `${Math.min(stack.length * 10, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CodeSnippet concept="Stack" />
  </div>
);
};

export default StackModule;
