'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

const FormInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300 border',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
FormInput.displayName = 'FormInput';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className='bg-muted flex min-h-[500px] flex-col items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <div
          className={cn('flex flex-col gap-6 overflow-hidden', className)}
          {...props}
        >
          <div className='overflow-hidden rounded-xl border-0 backdrop-blur-sm shadow-lg'>
            <div className='grid p-0 md:grid-cols-2 bg-card'>
              <div className='p-6 md:p-8 relative'>
                <div className='flex flex-col gap-6 relative z-10'>
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent'>
                      Welcome back
                    </h1>
                    <p className='text-muted-foreground text-balance mt-2'>
                      Login to your account
                    </p>
                  </div>

                  <div className='grid gap-4'>
                    <div className='space-y-2'>
                      <label htmlFor='login-email' className='text-sm font-medium'>
                        Email
                      </label>
                      <FormInput
                        id='login-email'
                        type='email'
                        placeholder='you@example.com'
                        className='h-12 focus:border-purple-500 focus:ring-purple-500/20'
                      />
                    </div>
                    <div className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <label htmlFor='login-password' className='text-sm font-medium'>
                          Password
                        </label>
                        <a
                          href='#'
                          className='text-sm text-purple-600 hover:text-purple-700 underline-offset-2 hover:underline transition-colors'
                        >
                          Forgot password?
                        </a>
                      </div>
                      <FormInput
                        id='login-password'
                        type='password'
                        className='h-12 focus:border-purple-500 focus:ring-purple-500/20'
                      />
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5'
                  >
                    Sign In
                  </button>

                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <span className='w-full border-t' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                      <span className='bg-card px-3 text-muted-foreground font-medium'>
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-3'>
                    {['Apple', 'Google', 'GitHub'].map((provider) => (
                      <button
                        key={provider}
                        type='button'
                        className='h-12 border rounded-md hover:bg-accent transition-all duration-200 hover:shadow-md text-sm'
                      >
                        {provider}
                      </button>
                    ))}
                  </div>

                  <div className='text-center text-sm text-muted-foreground'>
                    Don&apos;t have an account?{' '}
                    <a href='#' className='text-purple-600 hover:text-purple-700 underline underline-offset-4 transition-colors'>
                      Sign up
                    </a>
                  </div>
                </div>
              </div>

              <div className='relative hidden md:flex overflow-hidden w-full h-full min-h-[400px]'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
