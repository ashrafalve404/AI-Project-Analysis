import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return formatDate(date);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-emerald-500/20 text-emerald-400',
    completed: 'bg-blue-500/20 text-blue-400',
    'on-hold': 'bg-amber-500/20 text-amber-400',
    'at-risk': 'bg-red-500/20 text-red-400',
    todo: 'bg-slate-500/20 text-slate-400',
    'in-progress': 'bg-indigo-500/20 text-indigo-400',
    review: 'bg-amber-500/20 text-amber-400',
    done: 'bg-emerald-500/20 text-emerald-400',
    low: 'bg-slate-500/20 text-slate-400',
    medium: 'bg-blue-500/20 text-blue-400',
    high: 'bg-amber-500/20 text-amber-400',
    urgent: 'bg-red-500/20 text-red-400',
    critical: 'bg-red-500/20 text-red-400',
  };
  return colors[status] || 'bg-slate-500/20 text-slate-400';
}

export function getPriorityIcon(priority: string): string {
  const icons: Record<string, string> = {
    urgent: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢',
  };
  return icons[priority] || '⚪';
}