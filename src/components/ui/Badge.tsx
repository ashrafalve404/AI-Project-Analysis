'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-surface border border-border text-text-secondary',
      success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
      warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
      error: 'bg-red-500/15 text-red-400 border border-red-500/20',
      info: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
      outline: 'bg-transparent border border-border text-text-secondary',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };