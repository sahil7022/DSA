import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Wind, Box } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-earth-wood flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20"
        >
          <Wind size={400} className="text-earth-parchment" />
        </motion.div>
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40"
        >
          <Box size={500} className="text-earth-parchment" />
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-24 h-24 bg-earth-terracotta rounded-[2rem] flex items-center justify-center shadow-2xl mb-8"
        >
          <BookOpen size={48} className="text-white" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl font-serif font-bold text-earth-parchment mb-4 tracking-tight"
        >
          Panchatantra DSA
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 0.8, delay: 1 }}
          className="h-1 bg-earth-terracotta rounded-full mb-8"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-earth-clay uppercase tracking-[0.3em] text-sm font-bold">Crafted by</p>
          <h2 className="text-3xl font-serif text-white font-medium">Vayu Voxels</h2>
          <div className="px-4 py-1 bg-earth-parchment/10 rounded-full border border-earth-parchment/20 mt-2">
            <span className="text-earth-terracotta font-bold tracking-widest text-xs uppercase">Team 4</span>
          </div>
        </motion.div>
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-64 h-1 bg-earth-parchment/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-full bg-earth-terracotta"
        />
      </div>
    </motion.div>
  );
};

export default SplashScreen;
