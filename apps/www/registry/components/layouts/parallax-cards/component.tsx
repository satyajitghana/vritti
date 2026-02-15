'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ParallaxCard {
  lightBg: string;
  darkBg: string;
  content: React.ReactNode;
}

interface ParallaxCardsProps {
  cards?: ParallaxCard[];
  height?: number | string;
  className?: string;
}

export default function ParallaxCards({
  cards,
  height = '100vh',
  className,
}: ParallaxCardsProps) {
  const cardCount = cards?.length || 0;

  return (
    <section className={cn('relative w-full', className)} style={{ height }}>
      <div style={{ height: `${cardCount * 70}vh` }} className='relative'>
        {cards?.map((card, index) => (
          <div key={index} className='sticky top-0 h-[70vh] z-[1]'>
            <div
              className={cn(
                'w-full h-full flex items-center justify-center text-center p-8 rounded-none border',
                card.lightBg,
                card.darkBg,
              )}
            >
              {card.content}
            </div>
          </div>
        ))}
      </div>
      <div className='h-screen bg-white dark:bg-black' />
    </section>
  );
}
