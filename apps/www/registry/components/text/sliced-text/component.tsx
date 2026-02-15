"use client";

import { motion } from "motion/react";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface SlicedTextProps {
  text?: string;
  className?: string;
  containerClassName?: string;
  splitSpacing?: number;
}

const SlicedText: React.FC<SlicedTextProps> = ({
  text = "Sliced Text",
  className = "",
  containerClassName = "",
  splitSpacing = 2,
}) => (
  <motion.div
    className={cn(
      "relative inline-block w-full text-center",
      containerClassName
    )}
    initial="default"
    whileHover="hover"
  >
    <motion.div
      className={cn("-ml-0.5 absolute w-full text-4xl", className)}
      transition={{ duration: 0.1 }}
      variants={{
        default: {
          clipPath: "inset(0 0 50% 0)",
          y: -splitSpacing / 2,
          opacity: 1,
        },
        hover: {
          clipPath: "inset(0 0 0 0)",
          y: 0,
          opacity: 0,
        },
      }}
    >
      {text}
    </motion.div>
    <motion.div
      className={cn("absolute w-full text-4xl", className)}
      transition={{ duration: 0.1 }}
      variants={{
        default: {
          clipPath: "inset(50% 0 0 0)",
          y: splitSpacing / 2,
          opacity: 1,
        },
        hover: {
          clipPath: "inset(0 0 0 0)",
          y: 0,
          opacity: 1,
        },
      }}
    >
      {text}
    </motion.div>

    <div className={cn("invisible text-4xl", className)}>{text}</div>
  </motion.div>
);

export default SlicedText;
