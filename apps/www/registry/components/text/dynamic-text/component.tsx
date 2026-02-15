"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: "Hello", language: "English" },
  { text: "\u3053\u3093\u306B\u3061\u306F", language: "Japanese" },
  { text: "Bonjour", language: "French" },
  { text: "Hola", language: "Spanish" },
  { text: "\uC548\uB155\uD558\uC138\uC694", language: "Korean" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
  { text: "\u3053\u3093\u306B\u3061\u306F", language: "Japanese" },
];

const DynamicText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };

  return (
    <section
      aria-label="Rapid greetings in different languages"
      className="flex min-h-[200px] items-center justify-center gap-1 p-4"
    >
      <div className="relative flex h-16 w-60 items-center justify-center overflow-visible">
        {isAnimating ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              animate={textVariants.visible}
              aria-live="off"
              className="absolute flex items-center gap-2 font-medium text-2xl text-gray-800 dark:text-gray-200"
              exit={textVariants.exit}
              initial={textVariants.hidden}
              key={currentIndex}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-black dark:bg-white"
              />
              {greetings[currentIndex].text}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center gap-2 font-medium text-2xl text-gray-800 dark:text-gray-200">
            <div
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-black dark:bg-white"
            />
            {greetings[currentIndex].text}
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicText;
