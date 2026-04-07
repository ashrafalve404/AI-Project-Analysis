'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, Mail, Lock, ArrowRight, Eye, EyeOff, ChevronLeft, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';
import { useState } from 'react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header showNav={false} />
      
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <h1 className="text-3xl font-bold text-text-primary mb-2">Create your account</h1>
            <p className="text-text-secondary mb-8">Start your 14-day free trial today</p>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">First Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input 
                      type="text" 
                      placeholder="John"
                      className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-2">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input 
                    type="email" 
                    placeholder="you@company.com"
                    className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-2">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input 
                    type="text" 
                    placeholder="Your company"
                    className="w-full pl-12 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Create a password"
                    className="w-full pl-12 pr-12 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <label className="flex items-start gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mt-1 rounded border-border bg-surface" />
                I agree to the{' '}
                <Link href="/terms" className="text-amber-400 hover:text-amber-300">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-amber-400 hover:text-amber-300">Privacy Policy</Link>
              </label>
              
              <Link href="/dashboard">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 py-3">
                  Create Account <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </form>
            
            <p className="mt-8 text-center text-text-secondary">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-400 font-medium">Sign in</Link>
            </p>
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-1 bg-surface relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative flex items-center justify-center p-12">
            <div className="max-w-md p-10 bg-background/80 backdrop-blur-xl border border-amber-500/20 rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Start your free trial</h3>
              <ul className="space-y-4 text-text-secondary">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 text-sm">✓</span>
                  </div>
                  14-day free trial
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 text-sm">✓</span>
                  </div>
                  No credit card required
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 text-sm">✓</span>
                  </div>
                  Cancel anytime
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-400 text-sm">✓</span>
                  </div>
                  24/7 support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}