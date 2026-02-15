'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollxTypeAnimationProps {
  words?: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

const ScrollxTypeAnimation = ({
  words = [' existence', ' reality', ' the Internet'],
  className,
  typingSpeed = 50,
  deletingSpeed = 50,
  pauseDuration = 1000,
  gradientFrom = 'blue-500',
  gradientTo = 'purple-600',
}: ScrollxTypeAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex] || '';

    if (!isDeleting) {
      if (displayText.length < currentWord.length) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        timeoutRef.current = setTimeout(tick, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          tick();
        }, pauseDuration);
        return;
      }
    } else {
      if (displayText.length > 0) {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick, isDeleting, deletingSpeed, typingSpeed]);

  return (
    <motion.span
      className={cn(
        `bg-clip-text text-transparent bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`,
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {displayText}
      <span className='animate-pulse'>|</span>
    </motion.span>
  );
};

export default ScrollxTypeAnimation;
export { ScrollxTypeAnimation };
