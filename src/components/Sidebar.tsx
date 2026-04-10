import React, { useState } from 'react';
import { BookOpen, Layers, GitBranch, Search, Layout, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ConceptGuide from './ConceptGuide';

export type Concept = 'Binary Search' | 'Stack' | 'Linked List' | 'Binary Tree';

interface SidebarProps {
  activeConcept: Concept;
  onSelect: (concept: Concept) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeConcept, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const items: { name: Concept; icon: React.ReactNode }[] = [
    { name: 'Binary Search', icon: <Search size={20} /> },
    { name: 'Stack', icon: <Layers size={20} /> },
    { name: 'Linked List', icon: <Layout size={20} /> },
    { name: 'Binary Tree', icon: <GitBranch size={20} /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full gap-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-earth-terracotta p-2 rounded-lg">
          <BookOpen size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-serif font-bold tracking-tight">Panchatantra DSA</h1>
      </div>

      <nav className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-widest text-earth-clay/60 font-semibold mb-2 ml-2">The Fables</p>
        {items.map((item) => (
          <div key={item.name} className="flex flex-col">
            <button
              onClick={() => {
                onSelect(item.name);
                if (window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeConcept === item.name
                  ? 'bg-earth-terracotta text-white shadow-lg shadow-earth-terracotta/20'
                  : 'hover:bg-earth-parchment/10 text-earth-clay hover:text-earth-parchment'
              }`}
            >
              <span className={`${activeConcept === item.name ? 'text-white' : 'text-earth-clay group-hover:text-earth-parchment'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </button>
            
            {activeConcept === item.name && (
              <div className="px-2">
                <ConceptGuide concept={item.name} />
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-earth-parchment/10">
        <div className="bg-earth-parchment/5 rounded-2xl p-4 border border-earth-parchment/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-earth-terracotta text-white rounded-lg flex items-center justify-center font-bold">
              4
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-earth-clay">Developed By</p>
              <p className="text-sm font-serif font-bold text-earth-parchment">Vayu Voxels</p>
            </div>
          </div>
          <p className="text-[10px] text-earth-clay italic leading-tight">
            "Crafting digital fables for the modern scholar."
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] w-14 h-14 bg-earth-terracotta text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 h-full bg-dark-wood text-earth-parchment p-6 flex-col border-r border-white/5 shrink-0 overflow-y-auto scrollbar-hide">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-[85%] max-w-sm bg-dark-wood text-earth-parchment p-6 z-[55] shadow-2xl overflow-y-auto scrollbar-hide"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
