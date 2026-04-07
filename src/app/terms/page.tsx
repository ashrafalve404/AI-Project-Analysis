'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showNav={false} />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
        
        <h1 className="text-3xl font-bold text-text-primary mb-8">Terms of Service</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Acceptance of Terms</h2>
            <p className="text-text-secondary">
              By accessing and using AI Client Assistant, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Use License</h2>
            <p className="text-text-secondary">
              Permission is granted to temporarily use AI Client Assistant for personal or business use. This is the grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">User Account</h2>
            <p className="text-text-secondary">
              You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Prohibited Uses</h2>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Submit false or misleading information</li>
              <li>Distribute malware or other harmful content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Limitation of Liability</h2>
            <p className="text-text-secondary">
              AI Client Assistant shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
          </section>

          <p className="text-text-muted text-sm pt-8 border-t border-border">
            Last updated: April 2026
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}