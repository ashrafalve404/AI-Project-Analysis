'use client';

import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { pricingPlans } from '@/data/mockData';
import { Header, Footer } from '@/components/layout/MainLayout';
import { Check, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-xl text-text-secondary">Choose the plan that fits your agency.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {pricingPlans.map(plan => (
            <Card key={plan.id} className={plan.popular ? 'border-amber-500 shadow-lg shadow-amber-500/10' : ''}>
              {plan.popular && <Badge className="mb-4 bg-amber-500/10 text-amber-600">Most Popular</Badge>}
              <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-text-primary">${plan.price}</span>
                <span className="text-text-muted">/{plan.interval}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-text-secondary">
                    <Check className="w-4 h-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button variant={plan.popular ? 'primary' : 'outline'} className={`w-full ${plan.popular ? 'bg-gradient-to-r from-amber-500 to-orange-500' : ''}`}>
                  Get Started
                </Button>
              </Link>
            </Card>
          ))}
        </div>
        
        <Card variant="gradient" className="max-w-3xl mx-auto p-8 text-center">
          <h3 className="text-2xl font-bold text-text-primary mb-4">Need Custom Pricing?</h3>
          <p className="text-text-secondary mb-6">For enterprises, we offer custom pricing with dedicated support.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              Contact Sales <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </Card>
      </main>

      <Footer />
    </div>
  );
}