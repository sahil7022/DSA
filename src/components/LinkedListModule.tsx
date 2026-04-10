import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Info, ArrowRight, Link as LinkIcon } from 'lucide-react';
import CodeSnippet from './CodeSnippet';

interface Camel {
  id: number;
  value: string;
}

const LinkedListModule: React.FC = () => {
  const [list, setList] = useState<Camel[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('A caravan is formed when camels are tied together. Each camel knows only the one that follows.');
  const [counter, setCounter] = useState(0);

  const addToHead = () => {
    if (!inputValue.trim()) return;
    const newCamel = { id: counter, value: inputValue };
    setList(prev => [newCamel, ...prev]);
    setInputValue('');
    setCounter(prev => prev + 1);
    setMessage(`A new camel "${inputValue}" joins the front of the caravan. It now leads the way.`);
  };

  const addToTail = () => {
    if (!inputValue.trim()) return;
    const newCamel = { id: counter, value: inputValue };
    setList(prev => [...prev, newCamel]);
    setInputValue('');
    setCounter(prev => prev + 1);
    setMessage(`The camel "${inputValue}" joins the end of the caravan, tied to the one before it.`);
  };

  const removeFromHead = () => {
    if (list.length === 0) return;
    const removed = list[0];
    setList(prev => prev.slice(1));
    setMessage(`The lead camel "${removed.value}" unties itself and leaves. The second camel is now the leader.`);
  };

  const removeFromTail = () => {
    if (list.length === 0) return;
    const removed = list[list.length - 1];
    setList(prev => prev.slice(0, -1));
    setMessage(`The last camel "${removed.value}" unties itself and stays behind.`);
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 story-card p-6 md:p-8 flex flex-col relative overflow-hidden bg-earth-parchment/30 dark:bg-dark-wood/20 min-h-[500px]">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 z-20">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-earth-wood dark:text-earth-parchment">The Caravan of Camels</h2>
              <p className="text-earth-clay italic">A tale of linked nodes (Linked List)</p>
            </div>
            <div className="bg-earth-clay/10 dark:bg-white/5 p-4 rounded-2xl w-full md:max-w-xs border border-earth-clay/20">
              <div className="flex items-center gap-2 mb-1 text-earth-wood dark:text-earth-parchment font-bold text-sm">
                <Info size={16} />
                <span>The Moral</span>
              </div>
              <p className="text-xs text-earth-wood/70 dark:text-earth-parchment/70 leading-relaxed">
                In a caravan, you don't need to know everyone, just the one you are tied to. This is the strength of the chain.
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-start gap-4 overflow-x-auto pb-10 px-4 scrollbar-hide">
            <AnimatePresence mode="popLayout">
              {list.map((camel, index) => (
                <motion.div 
                  key={camel.id} 
                  className="flex items-center shrink-0 gap-4"
                  layout
                >
                  <motion.div
                    initial={{ x: -100, opacity: 0, scale: 0.5 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 100, opacity: 0, scale: 0.5 }}
                    className="flex flex-col items-center shrink-0"
                  >
                    <div className="w-24 h-24 bg-earth-clay/30 dark:bg-white/5 rounded-2xl flex flex-col items-center justify-center border-2 border-earth-clay/50 dark:border-white/10 relative group">
                      <div className="absolute -top-3 bg-earth-wood dark:bg-earth-clay text-white dark:text-earth-wood text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                        {index === 0 ? 'Head' : index === list.length - 1 ? 'Tail' : `Node ${index}`}
                      </div>
                      
                      {/* Camel Icon Placeholder */}
                      <div className="w-12 h-12 text-earth-wood dark:text-earth-parchment mb-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M17 11c.7-1.2 1.8-2 3-2h1l-2 2h-2zM4 11c-.7-1.2-1.8-2-3-2H0l2 2h2zM7 15h10M7 19h2M15 19h2M12 11V5M9 5h6" />
                          <circle cx="12" cy="11" r="3" />
                        </svg>
                      </div>
                      
                      <span className="text-earth-wood dark:text-earth-parchment font-bold text-sm truncate w-20 text-center">{camel.value}</span>
                    </div>
                    
                    <div className="mt-2 text-[10px] font-mono text-earth-clay font-bold">
                      Next: {index === list.length - 1 ? 'NULL' : 'Node ' + (index + 1)}
                    </div>
                  </motion.div>

                  {index < list.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="flex items-center text-earth-terracotta shrink-0"
                    >
                      <div className="w-8 h-0.5 bg-earth-terracotta/30 relative">
                        <ArrowRight size={16} className="absolute -right-2 -top-2" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {list.length === 0 && (
              <div className="w-full flex items-center justify-center pointer-events-none">
                <p className="text-earth-clay/40 font-serif italic text-xl">The desert is empty...</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:w-80 shrink-0">
          <div className="story-card p-6">
            <h3 className="text-lg font-serif font-bold text-earth-wood dark:text-earth-parchment mb-4">Caravan Master</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-earth-clay uppercase tracking-widest mb-1 block">Camel Name</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addToHead()}
                  placeholder="e.g. Hira"
                  className="w-full bg-earth-parchment dark:bg-dark-ink border border-earth-clay/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-earth-terracotta/20 transition-all text-earth-wood dark:text-earth-parchment"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={addToHead} className="btn-earth-primary text-[10px] py-3">Add Head</button>
                <button onClick={addToTail} className="btn-earth-primary text-[10px] py-3">Add Tail</button>
                <button onClick={removeFromHead} className="btn-earth-outline text-[10px] py-3">Pop Head</button>
                <button onClick={removeFromTail} className="btn-earth-outline text-[10px] py-3">Pop Tail</button>
              </div>
            </div>
          </div>

          <div className="story-card p-6 bg-earth-wood dark:bg-dark-ink text-earth-parchment flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-earth-terracotta">
                <LinkIcon size={20} />
                <h3 className="text-lg font-serif font-bold">The Scribe's Log</h3>
              </div>
              
              {/* Log Animation */}
              <AnimatePresence mode="wait">
                {message.includes('joins') ? (
                  <motion.div
                    key="join"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-earth-sage"
                  >
                    <LinkIcon size={20} />
                  </motion.div>
                ) : message.includes('leaves') || message.includes('stays') ? (
                  <motion.div
                    key="leave"
                    initial={{ scale: 1 }}
                    animate={{ scale: 0 }}
                    className="text-earth-terracotta"
                  >
                    <LinkIcon size={20} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            <div className="h-32 overflow-y-auto scrollbar-hide relative z-10">
              <AnimatePresence mode="wait">
                <motion.p 
                  key={message}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm leading-relaxed text-earth-clay italic"
                >
                  {message}
                </motion.p>
              </AnimatePresence>
            </div>
            
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                <LinkIcon size={120} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <CodeSnippet concept="Linked List" />
    </div>
  );
};

export default LinkedListModule;
