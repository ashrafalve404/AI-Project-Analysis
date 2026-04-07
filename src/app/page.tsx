'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, Zap, Shield, Brain, Users, BarChart3, Clock, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight">
                Transform Client Requirements into <span className="text-gradient">Action</span>
              </h1>
              <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
                Paste your client requirements and get instant AI-powered analysis with tasks, risks, deadlines, and actionable insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-xl px-8">
                    Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="outline" size="lg" className="px-8">Explore Features</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-orange-500/10 text-orange-500 border-orange-500/20">Features</Badge>
              <h2 className="text-4xl font-bold text-text-primary mb-4">Powerful AI Features</h2>
              <p className="text-text-secondary max-w-2xl mx-auto">Everything you need to manage client projects smarter and faster.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Brain, title: 'AI Analysis', desc: 'Instantly parse requirements and extract actionable tasks with priority levels.' },
                { icon: Shield, title: 'Risk Detection', desc: 'Proactively identify project risks before they become problems.' },
                { icon: BarChart3, title: 'Smart Insights', desc: 'Get AI-powered recommendations to improve project outcomes.' },
                { icon: Clock, title: 'Timeline Management', desc: 'Intelligent deadline tracking and milestone planning.' },
                { icon: Users, title: 'Team Collaboration', desc: 'Share insights and coordinate with your team seamlessly.' },
                { icon: CheckCircle2, title: 'Task Automation', desc: 'Auto-generate tasks with assignments and due dates.' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card hover className="h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                    <p className="text-text-secondary">{feature.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '500+', label: 'Active Projects' },
                { value: '10K+', label: 'Tasks Generated' },
                { value: '99.9%', label: 'Uptime' },
                { value: '4.9/5', label: 'User Rating' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</p>
                  <p className="text-text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-text-primary mb-4">Ready to get started?</h2>
              <p className="text-xl text-text-secondary mb-10">Join hundreds of agencies delivering projects faster with AI.</p>
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-xl px-10">
                  Start Your Free Trial <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}