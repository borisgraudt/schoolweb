'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  delay?: number;
}

export default function FAQItem({ question, answer, delay = 0 }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="border-2 border-black overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-bold text-lg pr-4">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="text-2xl flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: 'easeInOut' },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: 'easeInOut' },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-700 leading-relaxed" style={{ lineHeight: '1.7' }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

