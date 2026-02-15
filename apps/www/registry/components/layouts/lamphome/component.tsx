'use client';

import { motion, AnimatePresence, PanInfo } from 'motion/react';
import React, { useState, useRef, useMemo } from 'react';

interface NavItem {
  href: string;
  label: string;
}

interface LamphomeProps {
  title?: string;
  description?: string;
  logoSrc?: string;
  logoAlt?: string;
  navItems?: NavItem[];
  children?: React.ReactNode;
  className?: string;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export function Lamphome({
  title,
  description,
  logoSrc,
  logoAlt,
  navItems = [],
  children,
  className = '',
  isDarkMode = false,
  onToggleTheme,
}: LamphomeProps) {
  const chainPulled = useMemo(() => isDarkMode, [isDarkMode]);
  const chainLength = useMemo(() => (isDarkMode ? 72 : 48), [isDarkMode]);
  const showGlow = useMemo(() => isDarkMode, [isDarkMode]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsDragging(false);
    const finalDragY = Math.max(0, info.offset.y);
    if (finalDragY > 8) {
      onToggleTheme?.();
    }
    setTimeout(() => {
      setDragY(0);
    }, 100);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div
      className={`min-h-full w-full flex flex-col items-center justify-start pt-2 sm:pt-4 md:pt-6 lg:pt-8 transition-all duration-500 text-gray-900 dark:text-white ${className}`}
    >
      <motion.div
        ref={navBarRef}
        initial={{ width: '95%' }}
        animate={{ width: '95%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='relative flex items-center justify-between w-full max-w-4xl h-auto py-3 px-3 md:px-6 bg-white/80 dark:bg-neutral-950 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300'
      >
        {logoSrc && (
          <div className='shrink-0'>
            <img
              src={logoSrc}
              alt={logoAlt || 'Logo'}
              width={28}
              height={28}
              className='cursor-pointer hover:scale-110 transition-transform duration-200'
            />
          </div>
        )}

        <nav className='hidden sm:flex items-center space-x-4 md:space-x-6'>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className='text-sm md:text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative group'
            >
              {item.label}
              <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300'></span>
            </a>
          ))}
        </nav>

        <div className='flex items-center space-x-2'>
          <button
            onClick={toggleMobileMenu}
            className='sm:hidden flex justify-center items-center p-2 bg-gray-100 dark:bg-neutral-900 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-200'
          >
            <motion.svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1='3' y1='6' x2='21' y2='6' />
              <line x1='3' y1='12' x2='21' y2='12' />
              <line x1='3' y1='18' x2='21' y2='18' />
            </motion.svg>
          </button>
        </div>

        <div className='absolute right-3 top-full mt-2 flex flex-col items-center group z-10'>
          <motion.div
            className='w-1 bg-gradient-to-b from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-300 rounded-full shadow-sm relative'
            animate={{ height: chainLength + dragY, scaleY: 1 }}
            transition={{
              duration: isDragging ? 0.05 : 0.6,
              ease: isDragging ? 'linear' : 'easeOut',
            }}
            style={{ height: `${chainLength + dragY}px`, transformOrigin: 'top center' }}
          >
            {dragY > 4 && (
              <div className='absolute inset-0 flex flex-col justify-evenly'>
                {Array.from({ length: Math.floor((chainLength + dragY) / 8) }).map((_, i) => (
                  <div key={i} className='w-full h-0.5 bg-gray-500 dark:bg-gray-400 rounded-full opacity-40' />
                ))}
              </div>
            )}
          </motion.div>
          <motion.div
            drag='y'
            dragConstraints={{ top: 0, bottom: 12 }}
            dragElastic={0}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
              const newDragY = Math.max(0, info.offset.y);
              setDragY(newDragY);
            }}
            whileHover={{ scale: 1.05 }}
            className='w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 dark:from-yellow-300 dark:to-yellow-500 rounded-full shadow-lg border-2 border-yellow-500 dark:border-yellow-400 transition-shadow duration-200 relative overflow-hidden cursor-grab active:cursor-grabbing'
            animate={{ rotateZ: chainPulled ? 180 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'relative', top: -20, y: 0 }}
          >
            <div className='w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-transparent opacity-60'></div>
          </motion.div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className='absolute top-full left-0 right-0 mt-2 sm:hidden bg-white dark:bg-neutral-950 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg backdrop-blur-sm z-50'
            >
              <nav className='flex flex-col py-2'>
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className='px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200'
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {isDarkMode && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: showGlow ? '80%' : 0, opacity: showGlow ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='relative max-w-3xl mt-6 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent'
          style={{
            boxShadow: showGlow
              ? '0 0 20px #A855F7, 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)'
              : 'none',
          }}
        />
      )}
      {title && (
        <motion.h1
          ref={titleRef}
          className='mt-6 sm:mt-8 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent text-center px-4 max-w-4xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {title}
        </motion.h1>
      )}
      {!isDarkMode && (
        <motion.div
          initial={{ width: '60%', opacity: 1 }}
          animate={{ width: '60%', opacity: 1 }}
          transition={{ duration: 0.8 }}
          className='border-t mt-4 max-w-2xl border-gray-300'
        />
      )}
      {description && (
        <motion.p
          className='mt-4 sm:mt-6 text-center text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl px-4 leading-relaxed'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {description}
        </motion.p>
      )}
      {children && (
        <motion.div
          className='mt-6 sm:mt-8 w-full flex justify-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
