'use client';

import Link from 'next/link';
import { Card, Button } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';
import { Brain, CheckCircle, Shield, BarChart3, Zap, Calendar, ArrowRight, Target, Lightbulb, Users, Heart } from 'lucide-react';

const features = [
  { icon: Brain, title: 'AI Requirement Analysis', desc: 'Paste requirements and get instant task extraction' },
  { icon: CheckCircle, title: 'Smart Task Breakdown', desc: 'Auto-generate tasks with priorities and dependencies' },
  { icon: Shield, title: 'Risk Identification', desc: 'Proactive risk detection with mitigation suggestions' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Beautiful dashboards with live project metrics' },
  { icon: Zap, title: 'Meeting Intelligence', desc: 'Organize notes and extract action items automatically' },
  { icon: Calendar, title: 'Smart Deadlines', desc: 'Intelligent timeline management and reminders' },
];

const values = [
  { icon: Lightbulb, title: 'Innovation First', desc: 'We constantly push AI boundaries' },
  { icon: Users, title: 'User-Centric', desc: 'Every feature designed with real users in mind' },
  { icon: Target, title: 'Results-Driven', desc: 'We measure success by your workflow improvements' },
  { icon: Heart, title: 'Customer Obsessed', desc: 'Your success is our success' },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Everything You Need to <span className="text-gradient">Deliver Excellence</span></h1>
          <p className="text-xl text-text-secondary">Complete suite of AI-powered tools for agencies.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-24">
          {features.map(f => (
            <Card key={f.title} hover className="h-full">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">{f.title}</h3>
              <p className="text-text-secondary">{f.desc}</p>
            </Card>
          ))}
        </div>
        
        <div className="py-24 bg-surface">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-text-primary mb-4">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map(v => (
              <Card key={v.title} className="text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{v.title}</h3>
                <p className="text-text-secondary">{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center py-16">
          <h2 className="text-4xl font-bold text-text-primary mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-text-secondary mb-8">Start your 14-day free trial today.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              Try It Free <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}