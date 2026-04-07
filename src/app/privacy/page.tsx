'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Header, Footer } from '@/components/layout/MainLayout';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header showNav={false} />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </Link>
        
        <h1 className="text-3xl font-bold text-text-primary mb-8">Privacy Policy</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Introduction</h2>
            <p className="text-text-secondary">
              At AI Client Assistant, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Information We Collect</h2>
            <ul className="list-disc pl-6 text-text-secondary space-y-2">
              <li>Account information (name, email, company name)</li>
              <li>Project and task data you enter</li>
              <li>Client requirements and notes you upload</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">How We Use Your Information</h2>
            <p className="text-text-secondary">
              We use the information we collect to provide, maintain, and improve our services, process transactions, and respond to your comments and questions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Data Security</h2>
            <p className="text-text-secondary">
              We implement appropriate technical and organizational security measures to protect your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-text-primary mb-4">Contact Us</h2>
            <p className="text-text-secondary">
              If you have any questions about this Privacy Policy, please contact us at support@aiclientassistant.com
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