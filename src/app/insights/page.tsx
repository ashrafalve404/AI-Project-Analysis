'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, Badge, Button } from '@/components/ui';
import { insights, projects } from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import { Lightbulb, AlertTriangle, TrendingUp, Zap, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';

export default function InsightsPage() {
  const icons = { recommendation: TrendingUp, bottleneck: AlertTriangle, warning: AlertTriangle, suggestion: Lightbulb };
  const colors = { recommendation: 'primary', bottleneck: 'error', warning: 'warning', suggestion: 'secondary' };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-surface">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><Lightbulb className="w-4 h-4 text-white" /></div>
          <span className="font-bold text-text-primary">AI Client</span>
        </Link>
      </header>
      <main className="p-8">
        <div className="mb-8"><h1 className="text-3xl font-bold text-text-primary">AI Insights</h1><p className="text-text-secondary">Smart recommendations and intelligent alerts.</p></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[{ t: 'Total', c: insights.length, icon: Zap }, { t: 'Recommendations', c: insights.filter(i => i.type === 'recommendation').length, icon: TrendingUp }, { t: 'Warnings', c: insights.filter(i => i.type === 'warning').length, icon: AlertTriangle }, { t: 'Suggestions', c: insights.filter(i => i.type === 'suggestion').length, icon: Lightbulb }].map(s => <Card key={s.t}><div className="flex items-center justify-between"><div><p className="text-text-muted text-sm">{s.t}</p><p className="text-3xl font-bold text-text-primary mt-1">{s.c}</p></div><div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center"><s.icon className="w-6 h-6 text-primary" /></div></div></Card>)}
        </div>
        <Card variant="gradient" className="mb-8 p-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><Zap className="w-7 h-7 text-white" /></div>
            <div className="flex-1"><h3 className="text-xl font-bold text-text-primary mb-2">AI Analysis Complete</h3><p className="text-text-secondary">Based on your project data, I've identified {insights.filter(i => i.actionable).length} actionable insights.</p><div className="flex gap-2 mt-4"><Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" />{insights.filter(i => i.actionable).length} actionable</Badge></div></div>
          </div>
        </Card>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Actionable Insights</h2>
        <div className="space-y-4">
          {insights.map(i => {
            const Icon = icons[i.type];
            const project = i.projectId ? projects.find(p => p.id === i.projectId) : null;
            return (
              <Card key={i.id} hover>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${colors[i.type]}/20 flex items-center justify-center`}><Icon className={`w-6 h-6 text-${colors[i.type]}`} /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2"><h3 className="text-lg font-semibold text-text-primary">{i.title}</h3><Badge className={`bg-${colors[i.type]}/20 text-${colors[i.type]}`} size="sm">{i.type}</Badge>{project && <Link href={`/projects/${project.id}`} className="text-sm text-text-muted hover:text-primary flex items-center gap-1">{project.name}<ExternalLink className="w-3 h-3" /></Link>}</div>
                    <p className="text-text-secondary mb-3">{i.description}</p>
                    {i.actionable && <Button variant="outline" size="sm">Take Action <ArrowRight className="w-4 h-4" /></Button>}
                  </div>
                  <span className="text-sm text-text-muted">{formatDate(i.createdAt)}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}