import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Info } from 'lucide-react';

interface ConceptGuideProps {
  concept: string;
}

const ConceptGuide: React.FC<ConceptGuideProps> = ({ concept }) => {
  const [isOpen, setIsOpen] = useState(false);

  const guides: Record<string, { summary: string; steps: string[]; warning: string }> = {
    'Stack': {
      summary: "Imagine a stack of clay pots. You can only touch the one on top unless you want to break everything.",
      steps: [
        "Type a name for your pot (don't call it 'Fragile').",
        "Click 'Push' to drop it from the sky. Gravity does the rest.",
        "Click 'Pop' to throw the top pot away. It's gone forever, like my motivation on Mondays."
      ],
      warning: "If you try to Pop an empty stack, the Scribe will judge you silently."
    },
    'Binary Search': {
      summary: "The King is lazy. Instead of checking every scroll, he just cuts the library in half until he finds what he wants.",
      steps: [
        "Pick a target number (or enter your own scrolls if you're feeling picky).",
        "Click 'Next Step' to watch the King discard half the library like yesterday's news.",
        "Repeat until the scroll is found or the King gives up."
      ],
      warning: "Searching for a number that isn't there is a great way to waste the King's time."
    },
    'Linked List': {
      summary: "A caravan of camels tied together. If the middle camel gets lost, the chain breaks. Dramatic, right?",
      steps: [
        "Add a camel to the 'Head' (the leader) or 'Tail' (the one who sees everyone's back).",
        "Watch them tie themselves together. It's a commitment.",
        "Remove them from either end when they get tired of the desert."
      ],
      warning: "Don't ask the camels where they're going. They only know who's in front of them."
    },
    'Binary Tree': {
      summary: "A Banyan tree that grows upside down because computer scientists are weird.",
      steps: [
        "Plant a seed (a number). The first one is the 'Root'.",
        "Add more seeds. Smaller ones go left, bigger ones go right. It's very judgmental.",
        "Watch the branches grow. If it looks messy, just 'Clear Forest' and start over."
      ],
      warning: "If you add the same number twice, the tree will ignore you. It hates duplicates."
    }
  };

  const guide = guides[concept] || guides['Stack'];

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-earth-clay/10 hover:bg-earth-clay/20 dark:bg-white/5 dark:hover:bg-white/10 rounded-2xl transition-all duration-200 border border-earth-clay/20 dark:border-white/10 group"
      >
        <div className="flex items-center gap-3 text-earth-wood dark:text-earth-parchment font-bold text-sm">
          <div className="bg-earth-terracotta/10 p-2 rounded-lg group-hover:bg-earth-terracotta/20 transition-colors">
            <Info size={18} className="text-earth-terracotta" />
          </div>
          <span>How does this fable work?</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-earth-clay"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-white/50 dark:bg-dark-wood/50 backdrop-blur-sm rounded-2xl mt-2 border border-earth-clay/10 dark:border-white/5 space-y-4 shadow-inner">
              <p className="text-earth-wood dark:text-earth-parchment font-medium italic text-sm leading-relaxed">
                "{guide.summary}"
              </p>
              
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-earth-terracotta">The Ritual:</p>
                <ul className="space-y-2">
                  {guide.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-xs text-earth-wood/80 dark:text-earth-parchment/70 leading-relaxed">
                      <span className="text-earth-sage font-bold">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-earth-clay/10 dark:border-white/10">
                <p className="text-[10px] uppercase tracking-widest font-bold text-earth-terracotta mb-1">Warning:</p>
                <p className="text-xs text-earth-wood/60 dark:text-earth-parchment/50 italic">
                  {guide.warning}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConceptGuide;
