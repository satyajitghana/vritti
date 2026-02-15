import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusVariants = cva('border-transparent hover:opacity-100', {
  variants: {
    status: {
      online: 'bg-green-500 text-white',
      offline: 'bg-gray-500 text-white',
      away: 'bg-yellow-500 text-white',
      busy: 'bg-red-500 text-white',
      idle: 'bg-blue-500 text-white',
      pending: 'bg-orange-500 text-white',
      success: 'bg-green-600 text-white',
      error: 'bg-red-600 text-white',
      warning: 'bg-amber-500 text-white',
      info: 'bg-blue-600 text-white',
    },
  },
  defaultVariants: {
    status: 'offline',
  },
});

export interface StatusProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    VariantProps<typeof statusVariants> {
  status?:
    | 'online'
    | 'offline'
    | 'away'
    | 'busy'
    | 'idle'
    | 'pending'
    | 'success'
    | 'error'
    | 'warning'
    | 'info';
  statusindicator?: boolean;
  indicatorClassName?: string;
  children?: React.ReactNode;
}

const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  (
    {
      className,
      status = 'offline',
      statusindicator = false,
      indicatorClassName,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref}>
        <span
          className={cn(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            statusVariants({ status }),
            className,
          )}
          {...props}
        >
          <span className='inline-flex items-center gap-2'>
            {statusindicator && (
              <span
                className={cn(
                  'shrink-0 rounded-full bg-white',
                  indicatorClassName,
                )}
                style={{
                  width: indicatorClassName?.includes('w-') ? undefined : '0.375rem',
                  height: indicatorClassName?.includes('h-') ? undefined : '0.375rem',
                }}
              />
            )}
            {children}
          </span>
        </span>
      </div>
    );
  },
);

Status.displayName = 'Status';

export { Status, statusVariants };
