'use client';
import { useState, useRef } from 'react';
import { motion, useTransform, useScroll, Variants } from 'motion/react';
import { cn } from '@/lib/utils';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
      duration: 0.8,
    },
  },
};

const textVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 15,
    },
  },
};

interface HeroUIProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  features?: string[];
  className?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function HeroUI({
  title = 'Your Product',
  subtitle = 'Build Something Amazing',
  badgeText = 'Now Available',
  primaryCTA = 'Get Started',
  secondaryCTA = 'Documentation',
  features = [
    'TypeScript First',
    'Dark Mode',
    '100% Customizable',
    'MIT Licensed',
  ],
  className = '',
  onPrimaryClick,
  onSecondaryClick,
}: HeroUIProps) {
  const [mounted] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  if (!mounted) return null;

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden min-h-[90vh] flex items-center',
        className,
      )}
    >
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]' />
        <motion.div
          className='absolute top-20 left-1/4 w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px]'
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className='container relative z-10 mx-auto px-4 py-6 sm:py-8 md:py-16 lg:py-24'>
        <div className='relative min-h-[60vh] md:min-h-[70vh]'>
          <motion.div
            className='relative z-20 w-full md:w-7/12 lg:w-1/2 pt-6 sm:pt-8 md:pt-16 lg:pt-24 md:ml-8 lg:ml-16 md:-mt-6'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            <span className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-destructive text-destructive-foreground w-fit mb-4'>
              {badgeText}
            </span>

            <motion.h1
              className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight'
              variants={textVariants}
            >
              <span className='block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-400 bg-clip-text text-transparent'>
                {title}
              </span>
              <span className='text-foreground mt-2 block'>
                {subtitle}
              </span>
            </motion.h1>

            <motion.div
              className='text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mt-4'
              variants={textVariants}
            >
              Animated, accessible, and customizable components built with
              modern tools
            </motion.div>

            <motion.div
              className='flex gap-4 mt-6 max-[375px]:flex-col max-[375px]:w-full max-[375px]:gap-3'
              variants={textVariants}
            >
              <button
                onClick={onPrimaryClick}
                className='group relative overflow-hidden rounded-xl px-8 py-3 text-lg font-semibold shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors'
              >
                {primaryCTA}
              </button>

              <button
                onClick={onSecondaryClick}
                className='rounded-xl px-8 py-3 text-lg font-semibold border-2 backdrop-blur-sm bg-background/50 hover:bg-accent transition-colors'
              >
                <span className='bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent'>
                  {secondaryCTA}
                </span>
              </button>
            </motion.div>

            <motion.div
              className='flex items-center gap-8 mt-12 opacity-70'
              variants={textVariants}
            >
              <div className='flex gap-4 flex-wrap'>
                {features.map((text) => (
                  <span
                    key={text}
                    className='inline-flex items-center rounded-full border px-3 py-1.5 text-sm border-muted-foreground/30 bg-background/50'
                  >
                    {text}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
