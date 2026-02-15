'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface CustomCSSProperties extends React.CSSProperties {
  '--shimmer-color'?: string;
  '--radius'?: string;
  '--speed'?: string;
  '--cut'?: string;
  '--bg'?: string;
  '--spread'?: string;
  '--border-width'?: string;
  '--border-segment'?: string;
}

const inputVariants = cva(
  'group relative z-0 bg-white dark:bg-[rgba(0,0,0,1)] flex items-center overflow-hidden whitespace-nowrap transform-gpu transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'text-cyan-400 border border-cyan-400/20 hover:text-cyan-300',
        outline:
          'bg-transparent text-cyan-400 border border-cyan-400 hover:text-cyan-300',
        ghost: 'bg-transparent text-cyan-400 hover:bg-cyan-950/30',
        glow: 'text-cyan-400 border border-cyan-400/30 hover:text-cyan-300 hover:shadow-[0_0_5px_#03e9f4,0_0_25px_#03e9f4]',
      },
      inputSize: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 py-1 text-xs',
        lg: 'h-12 px-8 py-3 text-base',
        icon: 'h-10 w-10',
      },
      glow: {
        true: 'hover:shadow-[0_0_5px_#03e9f4,0_0_25px_#03e9f4]',
        false: '',
      },
      textEffect: {
        normal: 'group-hover:tracking-normal',
        spread: 'group-hover:tracking-wider',
      },
      uppercase: {
        true: '',
        false: '',
      },
      rounded: {
        default: 'rounded-md',
        full: 'rounded-full',
        none: 'rounded-none',
        custom: 'rounded-[0.95rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
      glow: false,
      textEffect: 'normal',
      uppercase: true,
      rounded: 'custom',
    },
  },
);

export interface InteractiveInputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
  hideAnimations?: boolean;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  style?: CustomCSSProperties;
}

const InteractiveInput = React.forwardRef<
  HTMLInputElement,
  InteractiveInputProps
>(
  (
    {
      className,
      variant,
      inputSize,
      glow,
      textEffect,
      uppercase,
      rounded,
      asChild = false,
      hideAnimations = false,
      shimmerColor = '#03e9f4',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      style,
      ...props
    },
    ref,
  ) => {
    const combinedStyle: CustomCSSProperties = {
      ...style,
      '--shimmer-color': shimmerColor,
      '--radius': borderRadius,
      '--speed': shimmerDuration,
      '--cut': shimmerSize,
      '--bg': background,
      '--spread': '90deg',
      borderRadius: rounded === 'custom' ? borderRadius : undefined,
    };

    return (
      <div
        className={cn(
          inputVariants({
            variant,
            inputSize,
            glow,
            textEffect,
            uppercase,
            rounded,
            className,
          }),
        )}
        style={combinedStyle}
      >
        {!hideAnimations && (
          <div className='absolute inset-0 overflow-visible -z-30 blur-[2px]'>
            <div className='absolute inset-0 h-full animate-[interactive-input-shimmer_var(--speed)_ease-in-out_infinite_alternate]'>
              <div className='absolute -inset-full w-auto rotate-0 animate-[interactive-input-spin_calc(var(--speed)*2)_linear_infinite] [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]' />
            </div>
          </div>
        )}

        <div
          className='absolute -z-20 [background:var(--bg)]'
          style={{ inset: shimmerSize, borderRadius }}
        />

        <input
          className='w-full h-full bg-transparent outline-none border-none relative z-10 text-inherit placeholder:text-cyan-400/50'
          ref={ref}
          {...props}
        />

        <style>{`
          @keyframes interactive-input-shimmer {
            to { transform: translate(calc(100% - 100%), 0); }
          }
          @keyframes interactive-input-spin {
            0% { transform: translateZ(0) rotate(0); }
            15%, 35% { transform: translateZ(0) rotate(90deg); }
            65%, 85% { transform: translateZ(0) rotate(270deg); }
            100% { transform: translateZ(0) rotate(360deg); }
          }
        `}</style>
      </div>
    );
  },
);

InteractiveInput.displayName = 'InteractiveInput';

export { InteractiveInput, inputVariants };
