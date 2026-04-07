'use client';

import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui';

interface HeaderProps {
  showNav?: boolean;
}

export function Header({ showNav = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-text-primary">AI Client Assistant</span>
          </Link>
          {showNav && (
            <div className="flex items-center gap-4">
              <Link href="/features" className="text-text-secondary hover:text-text-primary text-sm hidden md:block">Features</Link>
              <Link href="/pricing" className="text-text-secondary hover:text-text-primary text-sm hidden md:block">Pricing</Link>
              <Link href="/solutions" className="text-text-secondary hover:text-text-primary text-sm hidden md:block">Solutions</Link>
              <Link href="/about" className="text-text-secondary hover:text-text-primary text-sm hidden md:block">About</Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-text-primary">AI Client Assistant</span>
            </div>
            <p className="text-text-secondary text-sm max-w-xs">
              Transform client requirements into actionable tasks, risks, and insights with AI-powered analysis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/features" className="hover:text-text-primary">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-text-primary">Pricing</Link></li>
              <li><Link href="/solutions" className="hover:text-text-primary">Solutions</Link></li>
              <li><Link href="/about" className="hover:text-text-primary">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/contact" className="hover:text-text-primary">Contact</Link></li>
              <li><Link href="/login" className="hover:text-text-primary">Login</Link></li>
              <li><Link href="/signup" className="hover:text-text-primary">Sign Up</Link></li>
              <li><Link href="/dashboard" className="hover:text-text-primary">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/privacy" className="hover:text-text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">© 2026 AI Client Assistant. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-text-muted hover:text-text-primary text-sm">Privacy</Link>
            <Link href="/terms" className="text-text-muted hover:text-text-primary text-sm">Terms</Link>
            <Link href="/contact" className="text-text-muted hover:text-text-primary text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}