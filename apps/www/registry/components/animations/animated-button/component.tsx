'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
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

const buttonVariants = cva(
  'group relative z-0 bg-background flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap  transform-gpu transition-all duration-300 ease-in-out active:translate-y-px',
  {
    variants: {
      variant: {
        default: 'text-primary border border-primary/20 hover:text-primary/80',
        outline:
          'bg-transparent text-primary border border-primary hover:text-primary/80',
        ghost: 'bg-transparent text-primary hover:bg-primary/10',
        glow: 'text-primary border border-primary/30 hover:text-primary/80 hover:shadow-glow',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 py-1 text-xs',
        lg: 'h-12 px-8 py-3 text-base',
        icon: 'h-10 w-10',
      },
      glow: {
        true: 'hover:shadow-[0_0_5px_var(--shimmer-color),0_0_25px_var(--shimmer-color)]',
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
      size: 'default',
      glow: false,
      textEffect: 'normal',
      uppercase: true,
      rounded: 'custom',
    },
  },
);

export interface AnimatedButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  hideAnimations?: boolean;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  style?: CustomCSSProperties;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      textEffect,
      uppercase,
      rounded,
      asChild = false,
      hideAnimations = false,
      shimmerColor = 'var(--primary)',
      shimmerSize = '0.05em',
      shimmerDuration = '3s',
      borderRadius = '100px',
      background = 'var(--background)',
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

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

    const buttonStyle = `
      @keyframes animatedButton-shimmer-slide {
        to {
          transform: translate(calc(100cqw - 100%), 0);
        }
      }

      @keyframes animatedButton-spin-around {
        0% {
          transform: translateZ(0) rotate(0);
        }
        15%, 35% {
          transform: translateZ(0) rotate(90deg);
        }
        65%, 85% {
          transform: translateZ(0) rotate(270deg);
        }
        100% {
          transform: translateZ(0) rotate(360deg);
        }
      }

      @keyframes animatedButton-spread {
        0% {
          letter-spacing: normal;
          transform: perspective(var(--radius)) rotateY(0deg);
        }
        50% {
          letter-spacing: var(--cut);
          transform: perspective(var(--radius)) rotateY(var(--spread));
        }
        100% {
          letter-spacing: normal;
          transform: perspective(var(--radius)) rotateY(0deg);
        }
      }

      .animate-shimmer-slide-scoped {
        animation: animatedButton-shimmer-slide var(--speed) ease-in-out infinite alternate;
      }

      .animate-spin-around-scoped {
        animation: animatedButton-spin-around calc(var(--speed) * 2) infinite linear;
      }

      .has-animate-spread > span {
        animation: animatedButton-spread calc(var(--speed) * 3) ease-in-out infinite;
      }

      .shadow-glow-scoped {
        box-shadow: 0 0 5px var(--shimmer-color),
                    0 0 25px var(--shimmer-color),
                    0 0 50px var(--shimmer-color);
      }

      @media (max-width: 768px) {
        .animated-button-mobile {
          --radius: 60px;
          --speed: 2.5s;
          --cut: 0.03em;
        }
      }
    `;

    return (
      <Comp
        className={cn(
          'animated-button animated-button-mobile',
          buttonVariants({
            variant,
            size,
            glow,
            textEffect,
            uppercase,
            rounded,
            className,
          }),
          glow && 'shadow-glow-scoped',
        )}
        style={combinedStyle}
        ref={ref}
        {...props}
      >
        <style>{buttonStyle}</style>

        {!hideAnimations && (
          <div className='absolute inset-0 overflow-visible -z-30 blur-[2px] @container-[size]'>
            <div className='absolute inset-0 h-[100cqh] animate-shimmer-slide-scoped aspect-[1]'>
              <div className='absolute -inset-full w-auto rotate-0 animate-spin-around-scoped [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]' />
            </div>
          </div>
        )}

        <div className='absolute size-full rounded-2xl px-4 py-1.5 text-sm font-medium' />

        <div
          className='absolute -z-20 [background:var(--bg)]'
          style={{ inset: shimmerSize, borderRadius }}
        />

        <span
          className={cn(
            'relative z-10 transition-all duration-300 flex items-center justify-center',
            textEffect === 'spread' && 'group-hover:tracking-wider',
          )}
        >
          {children}
        </span>
      </Comp>
    );
  },
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton, buttonVariants };
