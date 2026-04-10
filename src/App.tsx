/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Trophy } from 'lucide-react';
import Sidebar, { Concept } from './components/Sidebar';
import StackModule from './components/StackModule';
import BinarySearchModule from './components/BinarySearchModule';
import LinkedListModule from './components/LinkedListModule';
import BinaryTreeModule from './components/BinaryTreeModule';
import SplashScreen from './components/SplashScreen';
import ScribesChallenge from './components/ScribesChallenge';

export default function App() {
  const [activeConcept, setActiveConcept] = useState<Concept>('Stack');
  const [showSplash, setShowSplash] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeConcept}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          {(() => {
            switch (activeConcept) {
              case 'Stack': return <StackModule />;
              case 'Binary Search': return <BinarySearchModule />;
              case 'Linked List': return <LinkedListModule />;
              case 'Binary Tree': return <BinaryTreeModule />;
              default: return <StackModule />;
            }
          })()}

          {/* Scribe's Challenge Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-earth-wood dark:text-earth-parchment">The Scribe's Trial</h2>
              <button 
                onClick={() => setShowChallenge(!showChallenge)}
                className="text-sm font-bold text-earth-terracotta uppercase tracking-widest hover:underline"
              >
                {showChallenge ? 'Hide Challenge' : 'Take the Trial'}
              </button>
            </div>
            <AnimatePresence>
              {showChallenge && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ScribesChallenge concept={activeConcept} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      <div className="flex h-screen w-full overflow-hidden bg-earth-parchment dark:bg-dark-ink transition-colors duration-500">
        <Sidebar activeConcept={activeConcept} onSelect={setActiveConcept} />
        
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Header */}
          <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-earth-clay/10 bg-white/50 dark:bg-dark-wood/50 backdrop-blur-md z-40">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-earth-clay font-medium hidden sm:inline">Concepts</span>
              <span className="text-earth-clay/40 hidden sm:inline">/</span>
              <span className="text-earth-terracotta font-bold uppercase tracking-widest text-[10px]">{activeConcept}</span>
            </div>
            
            <div className="flex items-center gap-3 md:gap-6">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-xl bg-earth-clay/10 text-earth-wood dark:text-earth-parchment hover:bg-earth-clay/20 transition-all"
                title="Toggle Moonlit Fable"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex flex-col items-end hidden xs:flex">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-earth-clay font-bold">Vayu Voxels</span>
                  <span className="text-xs font-serif text-earth-wood dark:text-earth-parchment font-semibold italic">Team 4</span>
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-earth-terracotta flex items-center justify-center text-white font-bold shadow-lg shadow-earth-terracotta/20">
                  4
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-hide">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
