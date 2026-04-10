import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="relative w-16 h-8 rounded-full p-1 transition-colors duration-500 focus:outline-none overflow-hidden bg-earth-clay/20 dark:bg-dark-clay border border-earth-clay/30 dark:border-white/10 shadow-inner"
      aria-label="Toggle Theme"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="stars"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  animate={{ 
                    opacity: [0.2, 1, 0.2],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2, 
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  style={{ 
                    top: `${Math.random() * 100}%`, 
                    left: `${Math.random() * 100}%` 
                  }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="clouds"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute inset-0"
            >
              <div className="absolute top-1 left-2 w-4 h-2 bg-white/60 rounded-full blur-[1px]" />
              <div className="absolute bottom-2 left-6 w-3 h-1.5 bg-white/40 rounded-full blur-[1px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Slider Knob */}
      <motion.div
        className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shadow-md overflow-hidden"
        animate={{ 
          x: isDarkMode ? 32 : 0,
          backgroundColor: isDarkMode ? '#d2b48c' : '#c05a3d',
          rotate: isDarkMode ? 360 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {isDarkMode ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="relative"
            >
              <Moon size={12} className="text-earth-wood fill-earth-wood" />
              {/* Craters */}
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-earth-wood/20 rounded-full" />
              <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-earth-wood/20 rounded-full" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
            >
              <Sun size={12} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
