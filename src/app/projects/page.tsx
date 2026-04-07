'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, ProgressBar, Button, Input } from '@/components/ui';
import { projects } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Search, Plus, Grid3X3, List, FolderKanban, Clock, AlertTriangle, BrainCircuit, Bell, Settings } from 'lucide-react';

export default function ProjectsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-text-primary">AI Client Assistant</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/analyzer">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />New Project
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Projects</h1>
            <p className="text-text-secondary">Manage all client projects</p>
          </div>
        </div>

        <Card className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} icon={<Search className="w-4 h-4" />} />
            </div>
            <div className="flex gap-1 bg-surface-elevated rounded-lg p-1">
              <button onClick={() => setView('grid')} className={`p-2 rounded ${view === 'grid' ? 'bg-surface text-text-primary' : 'text-text-muted'}`}><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setView('list')} className={`p-2 rounded ${view === 'list' ? 'bg-surface text-text-primary' : 'text-text-muted'}`}><List className="w-4 h-4" /></button>
            </div>
          </div>
        </Card>

        {view === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(project => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card hover className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-xl font-bold text-amber-500">
                      {project.name[0]}
                    </div>
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{project.name}</h3>
                  <p className="text-sm text-text-muted mb-4">{project.client}</p>
                  <ProgressBar value={project.progress} className="mb-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{project.progress}%</span>
                    <span className="text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(project.deadline)}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(project => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card hover>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center text-lg font-bold text-amber-500">
                        {project.name[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-text-primary">{project.name}</h3>
                        <p className="text-sm text-text-muted">{project.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      <span className="text-text-muted">{project.progress}%</span>
                      <span className="text-text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(project.deadline)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}