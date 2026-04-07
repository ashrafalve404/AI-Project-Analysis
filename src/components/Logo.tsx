'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-10 h-10',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <Link href="/" className="flex items-center gap-2">
      <div className={`${sizes[size]} rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg`}>
        <Bot className={`${iconSizes[size]} text-white`} />
      </div>
      {showText && <span className={`${textSizes[size]} font-semibold text-text-primary`}>AI Client Assistant</span>}
    </Link>
  );
}