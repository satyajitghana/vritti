'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useInspectorStore } from '@/lib/stores/inspector-store';
import { motion, AnimatePresence } from 'motion/react';

interface InspectorOverlayProps {
  containerRef: React.RefObject<HTMLElement | HTMLDivElement | null>;
}

export function InspectorOverlay({ containerRef }: InspectorOverlayProps) {
  const { isActive, hoveredElement, setHoveredElement, setSelectedElement, setMetadata } =
    useInspectorStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  const updateOverlayPosition = useCallback((element: HTMLElement) => {
    if (!overlayRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const top = elementRect.top - containerRect.top;
    const left = elementRect.left - containerRect.left;
    const width = elementRect.width;
    const height = elementRect.height;

    overlayRef.current.style.top = `${top}px`;
    overlayRef.current.style.left = `${left}px`;
    overlayRef.current.style.width = `${width}px`;
    overlayRef.current.style.height = `${height}px`;
  }, [containerRef]);

  const extractMetadata = (element: HTMLElement) => {
    const computedStyles = window.getComputedStyle(element);

    // Extract relevant computed styles
    const relevantStyles: Record<string, string> = {};
    const styleProps = [
      'color',
      'background-color',
      'border-color',
      'font-size',
      'font-family',
      'padding',
      'margin',
      'display',
      'position',
    ];

    styleProps.forEach((prop) => {
      const value = computedStyles.getPropertyValue(prop);
      if (value) {
        relevantStyles[prop] = value;
      }
    });

    // Extract colors
    const colors: string[] = [];
    ['color', 'background-color', 'border-color'].forEach((prop) => {
      const value = computedStyles.getPropertyValue(prop);
      if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
        colors.push(value);
      }
    });

    return {
      tagName: element.tagName,
      classList: Array.from(element.classList),
      computedStyles: relevantStyles,
      appliedColors: colors,
    };
  };

  const handleMouseMove = useCallback(
    (e: Event) => {
      if (!isActive || !containerRef.current) return;

      const mouseEvent = e as unknown as globalThis.MouseEvent;
      const target = mouseEvent.target as HTMLElement;
      if (target && containerRef.current.contains(target)) {
        setHoveredElement(target);
        updateOverlayPosition(target);
      }
    },
    [isActive, containerRef, setHoveredElement, updateOverlayPosition]
  );

  const handleClick = useCallback(
    (e: Event) => {
      if (!isActive || !hoveredElement) return;

      const mouseEvent = e as unknown as globalThis.MouseEvent;
      mouseEvent.preventDefault();
      mouseEvent.stopPropagation();

      setSelectedElement(hoveredElement);
      const metadata = extractMetadata(hoveredElement);
      setMetadata(metadata);
    },
    [isActive, hoveredElement, setSelectedElement, setMetadata]
  );

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick, true);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick, true);
    };
  }, [isActive, containerRef, handleMouseMove, handleClick]);

  if (!isActive || !hoveredElement) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute pointer-events-none border-2 border-primary bg-primary/10 z-50"
        style={{
          position: 'absolute',
          transition: 'all 0.1s ease-out',
        }}
      >
        <div className="absolute -top-6 left-0 bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-mono whitespace-nowrap">
          {hoveredElement.tagName.toLowerCase()}
          {hoveredElement.classList.length > 0 && `.${Array.from(hoveredElement.classList).join('.')}`}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
