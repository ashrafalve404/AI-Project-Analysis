'use client';

import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';
import { Code, Palette, TrendingUp, Briefcase, ShoppingCart, Building2, ArrowRight } from 'lucide-react';

const solutions = [
  { icon: Code, title: 'Software Agencies', desc: 'Streamline client project onboarding with AI-powered analysis', metrics: '40% faster kickoff' },
  { icon: Palette, title: 'Design Studios', desc: 'Transform client briefs into actionable design sprints', metrics: '60% less revisions' },
  { icon: TrendingUp, title: 'Marketing Agencies', desc: 'Manage campaign workflows from brief to delivery', metrics: '2x more campaigns' },
  { icon: Briefcase, title: 'Consulting Firms', desc: 'Organize client engagements with AI-generated notes', metrics: '95% action completion' },
  { icon: ShoppingCart, title: 'E-commerce', desc: 'Convert requirements into development sprints', metrics: '30% faster launch' },
  { icon: Building2, title: 'Enterprise', desc: 'Scale operations with enterprise-grade management', metrics: '50% better visibility' },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Built for <span className="text-gradient">Every Industry</span></h1>
          <p className="text-xl text-text-secondary">Tailored solutions for agencies and teams across all sectors.</p>
        </div>
        
        <div className="space-y-12 max-w-5xl mx-auto">
          {solutions.map((s, i) => (
            <div key={s.title} className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                  <s.icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">{s.title}</h2>
                <p className="text-lg text-text-secondary mb-4">{s.desc}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="text-emerald-600 font-medium">{s.metrics}</span>
                </div>
              </div>
              <Card className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(j => (
                    <div key={j} className="flex items-center gap-4 p-3 bg-surface rounded-lg border border-border">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <span className="text-amber-600 font-bold text-sm">{j}</span>
                      </div>
                      <span className="text-text-secondary">Key feature {j}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center py-16">
          <h2 className="text-4xl font-bold text-text-primary mb-6">Find Your Solution</h2>
          <p className="text-xl text-text-secondary mb-8">Book a demo to see how we can help.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              Schedule Demo <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}