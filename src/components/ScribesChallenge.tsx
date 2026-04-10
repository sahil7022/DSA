import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

interface Challenge {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const challenges: Record<string, Challenge> = {
  'Stack': {
    question: "If I push 'A', then 'B', then 'C' onto the Potter's Stack, which pot must I remove first to avoid a disaster?",
    options: ["Pot A (The base)", "Pot B (The middle)", "Pot C (The top)", "None, just break them all"],
    correct: 2,
    explanation: "Correct! Stack follows LIFO (Last-In, First-Out). Pot C was the last one added, so it's the first one out."
  },
  'Binary Search': {
    question: "The King wants to find scroll 42 in a sorted library of 100 scrolls. What is his first move?",
    options: ["Check scroll 1", "Check scroll 100", "Check scroll 50", "Ask the Scribe to find it"],
    correct: 2,
    explanation: "Exactly! Binary Search always starts in the middle (50) to eliminate half the possibilities instantly."
  },
  'Linked List': {
    question: "In our Camel Caravan, if Camel B is tied to Camel C, how does Camel B find Camel C?",
    options: ["By looking at its 'Next' link", "By shouting loudly", "By checking its own ID", "It doesn't, it's lost"],
    correct: 0,
    explanation: "Spot on! Each node in a Linked List stores a reference (link) to the next node in the sequence."
  },
  'Binary Tree': {
    question: "Where would a seed with value 25 be planted if the Root seed has a value of 50?",
    options: ["On the Right branch", "On the Left branch", "It becomes the new Root", "In a different forest"],
    correct: 1,
    explanation: "Right! In a Binary Search Tree, values smaller than the parent always go to the Left branch."
  }
};

interface ScribesChallengeProps {
  concept: string;
}

const ScribesChallenge: React.FC<ScribesChallengeProps> = ({ concept }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const challenge = challenges[concept];

  if (!challenge) return null;

  const handleSelect = (index: number) => {
    if (isCorrect !== null) return;
    setSelected(index);
    setIsCorrect(index === challenge.correct);
  };

  const reset = () => {
    setSelected(null);
    setIsCorrect(null);
  };

  return (
    <div className="story-card p-6 bg-gradient-to-br from-earth-terracotta/5 to-earth-sage/5 dark:from-earth-terracotta/10 dark:to-earth-sage/10 border-earth-terracotta/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-earth-terracotta p-2 rounded-xl text-white">
          <Trophy size={20} />
        </div>
        <h3 className="text-xl font-serif font-bold text-earth-wood dark:text-earth-parchment">The Scribe's Challenge</h3>
      </div>

      <p className="text-earth-wood dark:text-earth-parchment font-medium mb-6 leading-relaxed">
        {challenge.question}
      </p>

      <div className="grid grid-cols-1 gap-3">
        {challenge.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={isCorrect !== null}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
              selected === i
                ? isCorrect
                  ? 'border-earth-sage bg-earth-sage/10 text-earth-sage'
                  : 'border-earth-terracotta bg-earth-terracotta/10 text-earth-terracotta'
                : 'border-earth-clay/20 dark:border-white/10 hover:border-earth-terracotta/40 dark:hover:border-earth-terracotta/40 text-earth-wood/70 dark:text-earth-parchment/70'
            }`}
          >
            <span className="text-sm font-medium">{option}</span>
            {selected === i && (
              isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-6 overflow-hidden"
          >
            <div className={`p-4 rounded-2xl text-sm italic leading-relaxed ${isCorrect ? 'bg-earth-sage/10 text-earth-sage' : 'bg-earth-terracotta/10 text-earth-terracotta'}`}>
              {isCorrect ? challenge.explanation : "Alas! That is not the way of the ancients. Try again, seeker."}
            </div>
            <button
              onClick={reset}
              className="mt-4 text-xs font-bold uppercase tracking-widest text-earth-clay hover:text-earth-terracotta transition-colors"
            >
              Try Another Path
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScribesChallenge;
