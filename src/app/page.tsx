'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Bot, ArrowRight, Zap, Shield, Brain, Users, BarChart3, Clock, CheckCircle2, Star, Play } from 'lucide-react';
import { Button, Card, Badge } from '@/components/ui';
import { Header, Footer } from '@/components/layout/MainLayout';
import { useEffect, useState } from 'react';

const features = [
  { icon: Brain, title: 'AI Analysis', desc: 'Instantly parse requirements and extract actionable tasks with priority levels.', color: 'from-amber-500 to-orange-500' },
  { icon: Shield, title: 'Risk Detection', desc: 'Proactively identify project risks before they become problems.', color: 'from-emerald-500 to-teal-500' },
  { icon: BarChart3, title: 'Smart Insights', desc: 'Get AI-powered recommendations to improve project outcomes.', color: 'from-blue-500 to-cyan-500' },
  { icon: Clock, title: 'Timeline Management', desc: 'Intelligent deadline tracking and milestone planning.', color: 'from-purple-500 to-pink-500' },
  { icon: Users, title: 'Team Collaboration', desc: 'Share insights and coordinate with your team seamlessly.', color: 'from-rose-500 to-red-500' },
  { icon: CheckCircle2, title: 'Task Automation', desc: 'Auto-generate tasks with assignments and due dates.', color: 'from-indigo-500 to-violet-500' },
];

const stats = [
  { value: '500+', label: 'Active Projects', suffix: '' },
  { value: '10K+', label: 'Tasks Generated', suffix: '' },
  { value: '99.9%', label: 'Uptime', suffix: '' },
  { value: '4.9/5', label: 'User Rating', suffix: '' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'PM at TechFlow', text: 'This tool cut our project planning time by 70%. The AI analysis is incredibly accurate.', avatar: 'SC' },
  { name: 'Marcus Johnson', role: 'Director at AgencyX', text: 'Best investment we made this year. Our clients love the detailed breakdowns.', avatar: 'MJ' },
  { name: 'Emily Davis', role: 'Founder at StartupLab', text: 'The risk detection alone is worth it. We caught issues before they became problems.', avatar: 'ED' },
];

function FloatingShape({ className, delay }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay || 0,
        ease: 'easeInOut',
      }}
    />
  );
}

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count.toFixed(value.includes('.') ? 1 : 0)}{suffix}</span>;
}

export default function HomePage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden min-h-[90vh] flex items-center">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-full blur-3xl" />
          
          {/* Floating shapes */}
          <motion.div className="absolute top-1/3 left-10 w-20 h-20" style={{ y: smoothY1 }}>
            <FloatingShape className="w-full h-full bg-amber-500/20" delay={0} />
          </motion.div>
          <motion.div className="absolute top-1/2 right-20" style={{ y: smoothY2 }}>
            <FloatingShape className="w-16 h-16 bg-purple-500/15" delay={2} />
          </motion.div>
          <motion.div className="absolute bottom-1/3 left-1/3">
            <FloatingShape className="w-12 h-12 bg-blue-500/15" delay={1} />
          </motion.div>
          
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div 
              style={{ opacity: heroOpacity, scale: heroScale }}
              className="text-center max-w-5xl mx-auto"
            >
              {/* Badge with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm text-text-secondary">AI-Powered Project Management</span>
                </motion.div>
              </motion.div>

              {/* Main heading with text reveal */}
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-8 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Transform Client{' '}
                <span className="relative">
                  <span className="relative z-10">Requirements</span>
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-orange-500/30 blur-xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </span>
                {' '}into <span className="text-gradient">Action</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Paste your client requirements and get instant AI-powered analysis with tasks, risks, deadlines, and actionable insights.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-5 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href="/signup">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-xl px-10 text-lg">
                      Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/features">
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button variant="outline" size="lg" className="px-10 text-lg">
                      <Play className="w-4 h-4 mr-2" />Watch Demo
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div 
                className="flex flex-wrap items-center justify-center gap-8 mt-16 text-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 border-2 border-background" />
                    ))}
                  </div>
                  <span className="text-sm">500+ teams</span>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="flex items-center gap-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                  <span className="text-sm">4.9 rating</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-2">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-text-muted"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-surface relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <Badge className="mb-6 bg-orange-500/10 text-orange-500 border-orange-500/20 px-6 py-2">Features</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Powerful AI Features</h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">Everything you need to manage client projects smarter and faster.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <Card hover className="h-full group relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <feature.icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="mb-6 bg-blue-500/10 text-blue-500 border-blue-500/20 px-6 py-2">How It Works</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Three Simple Steps</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', title: 'Paste Requirements', desc: 'Copy and paste your client requirements, briefs, or project specifications.' },
                { step: '02', title: 'AI Analysis', desc: 'Our AI instantly analyzes the content and extracts tasks, risks, and insights.' },
                { step: '03', title: 'Take Action', desc: 'Review, edit, and export your organized project plan.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="relative"
                >
                  <div className="text-6xl md:text-7xl font-bold text-border/50 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-3">{item.title}</h3>
                  <p className="text-text-secondary text-lg">{item.desc}</p>
                  {i < 2 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 border-y border-border bg-surface/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="text-center"
                >
                  <p className="text-5xl md:text-6xl font-bold text-gradient mb-3">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-text-muted text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <Badge className="mb-6 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-6 py-2">Testimonials</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Loved by Teams</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <Card className="h-full">
                    <div className="flex gap-1 mb-4">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className="w-5 h-5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-text-secondary text-lg mb-6">"{testimonial.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary">{testimonial.name}</p>
                        <p className="text-sm text-text-muted">{testimonial.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-3xl" />
          
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">Ready to get started?</h2>
              <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">Join hundreds of agencies delivering projects faster with AI.</p>
              <Link href="/signup">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(245, 158, 11, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block"
                >
                  <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-2xl px-12 text-xl">
                    Start Your Free Trial <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </motion.div>
              </Link>
              <p className="text-text-muted mt-6">No credit card required • 14-day free trial</p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}