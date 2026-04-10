import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, RotateCcw, Info, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

interface Scroll {
  id: number;
  value: number;
}

const BinarySearchModule: React.FC = () => {
  const [array, setArray] = useState<Scroll[]>([]);
  const [customInput, setCustomInput] = useState<string>('');
  const [target, setTarget] = useState<number | ''>('');
  const [low, setLow] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [mid, setMid] = useState<number | null>(null);
  const [found, setFound] = useState<boolean | null>(null);
  const [message, setMessage] = useState('The Library of Scrolls is sorted. The Wise King seeks a specific number among them.');
  const [steps, setSteps] = useState<number>(0);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      value: Math.floor(Math.random() * 100) + 1
    })).sort((a, b) => a.value - b.value);
    
    setArray(newArray);
    setCustomInput(newArray.map(s => s.value).join(', '));
    resetSearch();
  };

  const handleCustomArray = () => {
    const values = customInput.split(',')
      .map(v => parseInt(v.trim()))
      .filter(v => !isNaN(v))
      .sort((a, b) => a - b);
    
    if (values.length === 0) return;
    
    const newArray = values.map((v, i) => ({ id: i, value: v }));
    setArray(newArray);
    resetSearch();
    setMessage('The King has organized the library with your chosen scrolls.');
  };

  const resetSearch = () => {
    setLow(null);
    setHigh(null);
    setMid(null);
    setFound(null);
    setSteps(0);
    setMessage('The Library of Scrolls is sorted. The Wise King seeks a specific number among them.');
  };

  const startSearch = () => {
    if (target === '') return;
    setLow(0);
    setHigh(array.length - 1);
    setMid(Math.floor((0 + array.length - 1) / 2));
    setFound(null);
    setSteps(1);
    setMessage(`The King begins his search for ${target}. He looks at the middle scroll first.`);
  };

  const nextStep = () => {
    if (low === null || high === null || mid === null || found !== null) return;

    const midValue = array[mid].value;
    
    if (midValue === target) {
      setFound(true);
      setMessage(`Success! The scroll with value ${target} has been found in ${steps} steps.`);
      return;
    }

    if (low >= high) {
      setFound(false);
      setMessage(`Alas, the scroll with value ${target} is not in this library.`);
      return;
    }

    let newLow = low;
    let newHigh = high;

    if (midValue < target) {
      newLow = mid + 1;
      setMessage(`The middle scroll (${midValue}) is too small. The King discards the left half.`);
    } else {
      newHigh = mid - 1;
      setMessage(`The middle scroll (${midValue}) is too large. The King discards the right half.`);
    }

    if (newLow > newHigh) {
      setFound(false);
      setLow(newLow);
      setHigh(newHigh);
      setMessage(`The search area has vanished. The scroll ${target} does not exist here.`);
    } else {
      const newMid = Math.floor((newLow + newHigh) / 2);
      setLow(newLow);
      setHigh(newHigh);
      setMid(newMid);
      setSteps(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 story-card p-6 md:p-8 flex flex-col relative overflow-hidden min-h-[500px]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 z-20">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-parchment">The Wise King's Guess</h2>
              <p className="text-earth-clay italic">A tale of sorted scrolls (Binary Search)</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl w-full md:max-w-xs border border-earth-clay/20">
              <div className="flex items-center gap-2 mb-1 text-earth-parchment font-bold text-sm">
                <Info size={16} />
                <span>The Moral</span>
              </div>
              <p className="text-xs text-earth-parchment/70 leading-relaxed">
                By always looking in the middle, the King halves his labor with every step. Order is the key to swiftness.
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-center gap-2 md:gap-3 content-center overflow-y-auto scrollbar-hide py-10">
            {array.map((scroll, index) => {
              const isExcluded = low !== null && high !== null && (index < low || index > high);
              const isMid = index === mid;
              const isTarget = found && isMid;

              return (
                <motion.div
                  key={scroll.id}
                  animate={{ 
                    opacity: isExcluded ? 0.2 : 1,
                    scale: isTarget ? [1.1, 1.15, 1.1] : isMid ? 1.1 : 1,
                    y: isMid ? -15 : 0,
                    boxShadow: isTarget 
                      ? "0 0 30px rgba(138, 154, 91, 0.6)" 
                      : isMid 
                        ? "0 0 20px rgba(192, 90, 61, 0.4)" 
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{
                    scale: isTarget ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : { type: "spring", stiffness: 300, damping: 20 },
                    boxShadow: { duration: 0.3 },
                    default: { duration: 0.5 }
                  }}
                  className={`relative w-12 h-20 md:w-14 md:h-24 flex flex-col items-center justify-center rounded-lg border-2 transition-colors duration-500 ${
                    isTarget 
                      ? 'bg-earth-sage border-earth-sage text-white' 
                      : isMid 
                        ? 'bg-earth-terracotta border-earth-terracotta text-white'
                        : 'bg-earth-clay/20 border-earth-clay/40 text-earth-parchment'
                  }`}
                >
                  <div className="absolute top-0 w-full h-2 bg-black/10 rounded-t-lg" />
                  <span className="font-serif font-bold text-lg md:text-xl">{scroll.value}</span>
                  <div className="absolute bottom-0 w-full h-2 bg-black/10 rounded-b-lg" />
                  
                  {index === low && (
                    <div className="absolute -top-8 text-[10px] font-bold text-earth-terracotta uppercase">Low</div>
                  )}
                  {index === high && (
                    <div className="absolute -bottom-8 text-[10px] font-bold text-earth-terracotta uppercase">High</div>
                  )}
                  {isMid && (
                    <motion.div 
                      layoutId="mid-pointer"
                      className="absolute -top-12 text-earth-terracotta"
                    >
                      <ChevronLeft size={16} className="rotate-90" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:w-80 shrink-0">
          <div className="story-card p-6">
            <h3 className="text-lg font-serif font-bold text-earth-parchment mb-4">Search Tools</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-earth-clay uppercase tracking-widest mb-1 block">Target Value</label>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value === '' ? '' : parseInt(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && startSearch()}
                  placeholder="1-100"
                  className="w-full bg-dark-ink border border-earth-clay/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-terracotta/20 transition-all text-earth-parchment"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="text-[10px] font-bold text-earth-clay uppercase tracking-widest mb-1 block">Custom Library</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="10, 20, 30..."
                      className="flex-1 bg-dark-ink border border-earth-clay/30 rounded-lg px-3 py-2 text-xs focus:outline-none text-earth-parchment"
                    />
                    <button 
                      onClick={handleCustomArray}
                      className="bg-earth-clay/20 p-2 rounded-lg hover:bg-earth-clay/30 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {low === null ? (
                  <button
                    onClick={startSearch}
                    className="btn-earth-primary flex items-center justify-center gap-2 py-3"
                  >
                    <Search size={18} />
                    Find Scroll
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={found !== null}
                    className="btn-earth-primary flex items-center justify-center gap-2 py-3"
                  >
                    <ChevronRight size={18} />
                    Next Step
                  </button>
                )}
                <button
                  onClick={generateArray}
                  className="btn-earth-outline flex items-center justify-center gap-2 py-3"
                >
                  <RotateCcw size={18} />
                  New Library
                </button>
              </div>
            </div>
          </div>

          <div className="story-card p-6 bg-dark-ink text-earth-parchment flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-earth-terracotta">
                <Search size={20} />
                <h3 className="text-lg font-serif font-bold">The Scribe's Log</h3>
              </div>
              
              {/* Log Animation */}
              <AnimatePresence mode="wait">
                {found === true ? (
                  <motion.div
                    key="found"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="text-earth-sage"
                  >
                    <Check size={20} />
                  </motion.div>
                ) : low !== null ? (
                  <motion.div
                    key="searching"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-earth-terracotta"
                  >
                    <Search size={20} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="h-32 overflow-y-auto scrollbar-hide relative z-10">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={message}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm leading-relaxed text-earth-clay italic"
                >
                  {message}
                </motion.p>
              </AnimatePresence>
            </div>
            
            {/* Subtle background scroll animation */}
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <motion.div
                animate={{ 
                  rotate: found === true ? 360 : 0,
                  scale: low !== null ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Search size={120} />
              </motion.div>
            </div>

            <div className="mt-6 pt-6 border-t border-earth-parchment/10">
              <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-earth-clay">
                <span>Steps Taken</span>
                <span className="text-earth-terracotta">{steps}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CodeSnippet concept="Binary Search" />
    </div>
  );
};

export default BinarySearchModule;
