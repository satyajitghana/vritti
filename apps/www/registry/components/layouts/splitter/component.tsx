'use client';

import * as React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';
import { PanelLeftClose, PanelRightClose } from 'lucide-react';

interface SplitterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onResize'> {
  onResize?: (leftSize: number, rightSize: number) => void;
  allowFullCollapse?: boolean;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  snapThreshold?: number;
  smoothTransition?: boolean;
}

type SplitterPanelProps = React.HTMLAttributes<HTMLDivElement>;

interface SplitterHandleProps {
  className?: string;
  withHandle?: boolean;
  onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  isDragging?: boolean;
  isLeftCollapsed?: boolean;
  isRightCollapsed?: boolean;
  isLeftNearCollapse?: boolean;
  isRightNearCollapse?: boolean;
}

function Splitter({
  className,
  children,
  onResize,
  style,
  allowFullCollapse = true,
  minSize = 0,
  maxSize = 100,
  defaultSize = 50,
  snapThreshold = 5,
  smoothTransition = true,
  ...props
}: SplitterProps) {
  const [leftWidth, setLeftWidth] = React.useState<number>(defaultSize);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [startPosition, setStartPosition] = React.useState<number>(0);
  const [startWidth, setStartWidth] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const animationFrameRef = React.useRef<number | undefined>(undefined);

  const handleInteractionStart = React.useCallback(
    (clientX: number): void => {
      if (!containerRef.current) return;
      setIsDragging(true);
      setStartPosition(clientX);
      setStartWidth(leftWidth);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    },
    [leftWidth],
  );

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      handleInteractionStart(e.clientX);
    },
    [handleInteractionStart],
  );

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();
      if (e.touches.length === 1) {
        handleInteractionStart(e.touches[0].clientX);
      }
    },
    [handleInteractionStart],
  );

  const handleMove = React.useCallback(
    (clientX: number): void => {
      if (!isDragging || !containerRef.current) return;
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const deltaX = clientX - startPosition;
        const deltaPercent = (deltaX / rect.width) * 100;
        const newLeftWidth = startWidth + deltaPercent;
        const effectiveMinSize = allowFullCollapse ? 0 : minSize;
        const effectiveMaxSize = allowFullCollapse ? 100 : maxSize;
        let clampedWidth = Math.min(Math.max(newLeftWidth, effectiveMinSize), effectiveMaxSize);
        if (allowFullCollapse) {
          if (clampedWidth <= snapThreshold) clampedWidth = 0;
          else if (clampedWidth >= 100 - snapThreshold) clampedWidth = 100;
        }
        setLeftWidth(clampedWidth);
        onResize?.(clampedWidth, 100 - clampedWidth);
      });
    },
    [isDragging, startPosition, startWidth, onResize, allowFullCollapse, minSize, maxSize, snapThreshold],
  );

  const handleInteractionEnd = React.useCallback((): void => {
    setIsDragging(false);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    if (animationFrameRef.current !== undefined) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
      const handleMouseUp = () => handleInteractionEnd();
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        if (e.touches.length === 1) handleMove(e.touches[0].clientX);
      };
      const handleTouchEnd = () => handleInteractionEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMove, handleInteractionEnd]);

  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const childrenArray = React.Children.toArray(children);
  const panels = childrenArray.filter(
    (child): child is React.ReactElement =>
      React.isValidElement(child) && typeof child.type !== 'string',
  );

  const leftPanel = panels[0];
  const rightPanel = panels[1];
  const handle = panels.find(
    (child) => React.isValidElement(child) && child.type === SplitterHandle,
  );

  const isLeftCollapsed = leftWidth <= 0.1;
  const isRightCollapsed = leftWidth >= 99.9;
  const isLeftNearCollapse = leftWidth <= snapThreshold && leftWidth > 0.1;
  const isRightNearCollapse = leftWidth >= 100 - snapThreshold && leftWidth < 99.9;

  const handleProps = React.useMemo(
    () => ({
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      isDragging,
      isLeftCollapsed,
      isRightCollapsed,
      isLeftNearCollapse,
      isRightNearCollapse,
    }),
    [handleMouseDown, handleTouchStart, isDragging, isLeftCollapsed, isRightCollapsed, isLeftNearCollapse, isRightNearCollapse],
  );

  return (
    <div
      data-slot='splitter-root'
      ref={containerRef}
      className={cn(
        'flex h-full w-full overflow-hidden relative',
        smoothTransition && !isDragging && 'transition-all duration-200 ease-out',
        className,
      )}
      style={{ ...style, touchAction: 'none' }}
      {...props}
    >
      <motion.div
        style={{ width: `${leftWidth}%` }}
        className={cn('overflow-hidden relative', isLeftCollapsed && 'pointer-events-none')}
        animate={{ opacity: isLeftCollapsed ? 0 : 1, scale: isLeftCollapsed ? 0.98 : 1 }}
        transition={{ duration: smoothTransition ? 0.2 : 0, ease: 'easeOut' }}
      >
        <div className={cn('w-full h-full', (isLeftNearCollapse || isLeftCollapsed) && 'blur-[1px]', smoothTransition && 'transition-all duration-200')}>
          {leftPanel}
        </div>
      </motion.div>

      {handle ? (
        React.cloneElement(handle as React.ReactElement<SplitterHandleProps>, handleProps)
      ) : (
        <SplitterHandle {...handleProps} />
      )}

      <motion.div
        style={{ width: `${100 - leftWidth}%` }}
        className={cn('overflow-hidden relative', isRightCollapsed && 'pointer-events-none')}
        animate={{ opacity: isRightCollapsed ? 0 : 1, scale: isRightCollapsed ? 0.98 : 1 }}
        transition={{ duration: smoothTransition ? 0.2 : 0, ease: 'easeOut' }}
      >
        <div className={cn('w-full h-full', (isRightNearCollapse || isRightCollapsed) && 'blur-[1px]', smoothTransition && 'transition-all duration-200')}>
          {rightPanel}
        </div>
      </motion.div>
    </div>
  );
}

function SplitterPanel({ className, children, ...props }: SplitterPanelProps) {
  return (
    <div data-slot='splitter-panel' className={cn('h-full w-full', className)} {...props}>
      {children}
    </div>
  );
}

function SplitterHandle({
  className,
  withHandle = true,
  onMouseDown,
  onTouchStart,
  isDragging,
  isLeftCollapsed,
  isRightCollapsed,
}: SplitterHandleProps) {
  return (
    <motion.div
      data-slot='splitter-handle'
      className={cn(
        'relative flex items-center justify-center cursor-col-resize select-none z-20',
        'bg-border/80 backdrop-blur-sm hover:bg-accent/80 active:bg-accent',
        isDragging && 'bg-accent shadow-lg scale-110',
        'transition-all duration-200 ease-out touch-manipulation',
        className,
      )}
      style={{ width: isDragging ? '10px' : '8px', minWidth: '8px', cursor: 'col-resize' }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      whileHover={{ width: '10px' }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {withHandle && !isLeftCollapsed && !isRightCollapsed && (
        <div className='flex flex-col gap-1'>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={cn('w-1 h-1 rounded-full bg-muted-foreground/60', isDragging && 'bg-muted-foreground')}
              animate={{ scale: isDragging ? 1.2 : 1, opacity: isDragging ? 1 : 0.6 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {isLeftCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='absolute inset-0 flex items-center justify-center pointer-events-none'
          >
            <div className='bg-accent rounded-full w-6 h-6 flex items-center justify-center shadow-lg'>
              <PanelRightClose className='w-4 h-4' />
            </div>
          </motion.div>
        )}
        {isRightCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className='absolute inset-0 flex items-center justify-center pointer-events-none'
          >
            <div className='bg-accent rounded-full w-6 h-6 flex items-center justify-center shadow-lg'>
              <PanelLeftClose className='w-4 h-4' />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

Splitter.displayName = 'Splitter';
SplitterPanel.displayName = 'SplitterPanel';
SplitterHandle.displayName = 'SplitterHandle';

export { Splitter, SplitterPanel, SplitterHandle };
