import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MessageTypingProps {
  text: string;
  className?: string;
}

export default function MessageTyping({ text, className = '' }: MessageTypingProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30); // Speed of typing

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="whitespace-pre-line"
      >
        {displayedText}
        {showCursor && currentIndex < text.length && (
          <span className="inline-block w-[2px] h-[1em] bg-current ml-[2px] animate-pulse" />
        )}
      </motion.div>
    </div>
  );
} 