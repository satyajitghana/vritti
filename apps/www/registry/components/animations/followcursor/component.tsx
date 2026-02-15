'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface FollowCursorProps {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  lineCount?: number;
  pointCount?: number;
  thickness?: number;
  spring?: number;
  friction?: number;
  bgColor?: string;
}

interface Line {
  points: { x: number; y: number }[];
  color: string;
  thickness: number;
  spring: number;
  friction: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
}

export default function FollowCursor({
  className = '',
  style = {},
  colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFBE0B',
    '#FB5607',
    '#8338EC',
    '#3A86FF',
    '#FF006E',
    '#A5FFD6',
    '#FF9E00',
  ],
  lineCount,
  pointCount = 20,
  thickness = 3,
  spring = 0.15,
  friction = 0.88,
  bgColor = 'rgba(26, 26, 38, 1)',
}: FollowCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const linesRef = useRef<Line[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const numLines = lineCount ?? colors.length;

  const initLines = useCallback(() => {
    const lines: Line[] = [];
    for (let i = 0; i < numLines; i++) {
      const points = Array.from({ length: pointCount }, () => ({ x: 0, y: 0 }));
      lines.push({
        points,
        color: colors[i % colors.length],
        thickness: thickness * (0.5 + Math.random() * 1.0),
        spring: spring + Math.random() * 0.1,
        friction: friction + Math.random() * 0.08,
        offsetX: (Math.random() - 0.5) * 20,
        offsetY: (Math.random() - 0.5) * 20,
        velocityX: 0,
        velocityY: 0,
      });
    }
    linesRef.current = lines;
  }, [numLines, pointCount, colors, thickness, spring, friction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isActive = true;

    const resize = () => {
      canvas.width = container.clientWidth * window.devicePixelRatio;
      canvas.height = container.clientHeight * window.devicePixelRatio;
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    initLines();

    // Center mouse initially
    mouseRef.current = {
      x: container.clientWidth / 2,
      y: container.clientHeight / 2,
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const event = 'touches' in e ? e.touches[0] : e;
      if (!event) return;
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const animate = () => {
      if (!isActive || !ctx || !canvas) return;

      const w = container.clientWidth;
      const h = container.clientHeight;

      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const line of linesRef.current) {
        const targetX = mx + line.offsetX;
        const targetY = my + line.offsetY;

        // Physics for head point
        const dx = targetX - line.points[0].x;
        const dy = targetY - line.points[0].y;
        line.velocityX += dx * line.spring;
        line.velocityY += dy * line.spring;
        line.velocityX *= line.friction;
        line.velocityY *= line.friction;
        line.points[0].x += line.velocityX;
        line.points[0].y += line.velocityY;

        // Trail points follow
        for (let i = 1; i < line.points.length; i++) {
          const lerpFactor = 0.4 + (i / line.points.length) * 0.3;
          line.points[i].x += (line.points[i - 1].x - line.points[i].x) * lerpFactor;
          line.points[i].y += (line.points[i - 1].y - line.points[i].y) * lerpFactor;
        }

        // Draw smooth curve
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.thickness;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.7;

        if (line.points.length > 2) {
          ctx.moveTo(line.points[0].x, line.points[0].y);
          for (let i = 1; i < line.points.length - 1; i++) {
            const xc = (line.points[i].x + line.points[i + 1].x) / 2;
            const yc = (line.points[i].y + line.points[i + 1].y) / 2;
            ctx.quadraticCurveTo(line.points[i].x, line.points[i].y, xc, yc);
          }
        }
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      ro.disconnect();
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initLines, bgColor]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
}
