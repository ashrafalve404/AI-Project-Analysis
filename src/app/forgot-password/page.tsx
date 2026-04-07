'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Mail, ArrowRight, CheckCircle, ChevronLeft } from 'lucide-react';
import { Button, Input, Card } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

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
            {!sent ? (
              <>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Forgot password?</h1>
                <p className="text-text-secondary mb-8">No worries, we'll send you reset instructions.</p>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                  <Input label="Email" type="email" placeholder="Enter your email" icon={<Mail className="w-4 h-4" />} />
                  <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">Reset Password <ArrowRight className="w-4 h-4" /></Button>
                </form>
                <p className="mt-8 text-center text-text-secondary">
                  <Link href="/login" className="text-amber-400 font-medium">← Back to sign in</Link>
                </p>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-500" />
                </div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Check your email</h1>
                <p className="text-text-secondary">We sent a password reset link to your email.</p>
              </div>
            )}
          </motion.div>
        </div>
        <div className="hidden lg:flex flex-1 bg-surface items-center justify-center p-12 bg-grid">
          <Card className="max-w-md p-8 text-center">
            <Bot className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">Secure Password Reset</h3>
            <p className="text-text-secondary">Your account security is our priority.</p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}