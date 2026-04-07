'use client';

import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';
import { Rocket, Globe, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="px-6 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Building the Future of <span className="text-gradient">Project Management</span>
          </h1>
          <p className="text-xl text-text-secondary">We believe AI can transform how agencies handle client projects.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-4xl mx-auto">
          {[
            { value: '10K+', label: 'Active Users' },
            { value: '50M+', label: 'Tasks Analyzed' },
            { value: '99.9%', label: 'Uptime' },
            { value: '4.9/5', label: 'User Rating' }
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
              <p className="text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
          <Card className="p-8">
            <Badge variant="outline" className="mb-4">Our Story</Badge>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Born from Real Agency Pain</h2>
            <p className="text-text-secondary">
              AI Client Assistant was born out of frustration. We were running an agency and saw the same problems repeat: 
              clients send lengthy requirement documents, we spend hours manually extracting tasks, risks slip through the cracks.
            </p>
            <p className="text-text-secondary mt-4">
              So we built one. Using advanced AI, we created a tool that instantly transforms client requirements into actionable project plans.
            </p>
          </Card>
          
          <div className="space-y-6">
            {[
              { icon: Rocket, title: 'Founded in 2024', subtitle: 'San Francisco, CA' },
              { icon: Globe, title: 'Global Team', subtitle: 'Remote-first company' },
              { icon: Award, title: 'Award Winning', subtitle: 'Best SaaS 2025' }
            ].map(item => (
              <div key={item.title} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-16">
          <h2 className="text-4xl font-bold text-text-primary mb-6">Join Thousands of Agencies</h2>
          <p className="text-xl text-text-secondary mb-8">Start your free trial today.</p>
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">Get Started</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}