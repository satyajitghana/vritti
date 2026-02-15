'use client';
import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { cn } from '@/lib/utils';

interface ScrollAreaProProps extends React.ComponentProps<
  typeof ScrollAreaPrimitive.Root
> {
  className?: string;
  children: React.ReactNode;
  crossDirectionalScroll?: boolean;
  autoHide?: boolean;
  showProgress?: 'horizontal' | 'vertical';
  onScrollChange?: (progress: { x: number; y: number }) => void;
}

interface ScrollBarProProps extends React.ComponentProps<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> {
  className?: string;
  show?: boolean;
  autoHide?: boolean;
  isScrolling?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

function ScrollBarPro({
  className,
  orientation = 'vertical',
  show = true,
  autoHide = false,
  isScrolling = false,
  ...props
}: ScrollBarProProps) {
  if (!autoHide && !isScrolling) {
    return (
      <ScrollAreaPrimitive.ScrollAreaScrollbar
        data-slot='scroll-area-scrollbar'
        orientation={orientation}
        className={cn(
          'flex touch-none p-px transition-colors select-none',
          orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
          orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
          className,
        )}
        {...props}
      >
        <ScrollAreaPrimitive.ScrollAreaThumb
          data-slot='scroll-area-thumb'
          className='bg-border relative flex-1 rounded-full'
        />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
    );
  }

  return (
    <AnimatePresence>
      {(!autoHide || show) && (
        <motion.div
          initial={{ opacity: autoHide ? 0 : 1 }}
          animate={{ opacity: show ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ScrollAreaPrimitive.ScrollAreaScrollbar
            data-slot='scroll-area-scrollbar'
            orientation={orientation}
            className={cn(
              'flex touch-none select-none transition-all duration-300',
              orientation === 'vertical' && 'h-full border-l border-l-transparent w-2.5',
              orientation === 'horizontal' && 'flex-col border-t border-t-transparent h-2.5',
              className,
            )}
            {...props}
          >
            <motion.div
              animate={{
                scale: isScrolling ? 1.1 : 1,
                backgroundColor: isScrolling ? '#3b82f6' : '#d1d5db',
              }}
              transition={{ duration: 0.2 }}
              className='relative flex-1 rounded-full'
            >
              <ScrollAreaPrimitive.ScrollAreaThumb
                data-slot='scroll-area-thumb'
                className='bg-current relative flex-1 rounded-full'
              />
            </motion.div>
          </ScrollAreaPrimitive.ScrollAreaScrollbar>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollAreaPro({
  className,
  children,
  crossDirectionalScroll = false,
  autoHide = false,
  showProgress,
  onScrollChange,
  ...props
}: ScrollAreaProProps) {
  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);
  const [showScrollbars, setShowScrollbars] = React.useState<boolean>(!autoHide);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const scrollX = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const progressBarScaleX = useTransform(scrollX, [0, 100], [0, 1]);

  const handleScroll = React.useCallback((): void => {
    if (!viewportRef.current) return;
    const element = viewportRef.current;
    const maxScrollX = element.scrollWidth - element.clientWidth;
    const maxScrollY = element.scrollHeight - element.clientHeight;
    const progressX = maxScrollX > 0 ? (element.scrollLeft / maxScrollX) * 100 : 0;
    const progressY = maxScrollY > 0 ? (element.scrollTop / maxScrollY) * 100 : 0;
    scrollX.set(progressX);
    scrollY.set(progressY);
    onScrollChange?.({ x: progressX, y: progressY });
    if (autoHide) {
      setIsScrolling(true);
      setShowScrollbars(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        setShowScrollbars(false);
      }, 1500);
    }
  }, [autoHide, onScrollChange, scrollX, scrollY]);

  React.useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    element.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      element.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <ScrollAreaPrimitive.Root
      ref={containerRef}
      data-slot='scroll-area'
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot='scroll-area-viewport'
        className='size-full rounded-[inherit] overflow-auto'
      >
        {children}
      </ScrollAreaPrimitive.Viewport>

      <ScrollBarPro
        orientation='vertical'
        show={showScrollbars}
        autoHide={autoHide}
        isScrolling={isScrolling}
      />
      <ScrollBarPro
        orientation='horizontal'
        show={showScrollbars}
        autoHide={autoHide}
        isScrolling={isScrolling}
      />
      <ScrollAreaPrimitive.Corner />

      <AnimatePresence>
        {showProgress === 'horizontal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 pointer-events-none'
          >
            <motion.div
              className='absolute bottom-0 left-0 right-0 bg-gray-200/50 dark:bg-gray-700/50'
              style={{ height: 'clamp(2px, 0.3vw, 6px)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className='h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left'
                style={{ scaleX: progressBarScaleX }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScrollAreaPrimitive.Root>
  );
}

export { ScrollAreaPro, ScrollBarPro };
