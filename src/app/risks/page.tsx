'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button, Input } from '@/components/ui';
import { risks, projects } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Search, Plus, AlertTriangle, AlertCircle, Shield, Clock, ExternalLink, X, Save } from 'lucide-react';

export default function RisksPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newRisk, setNewRisk] = useState({ title: '', description: '', severity: 'medium', mitigation: '' });
  const filtered = risks.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()));
  const counts = { critical: filtered.filter(r => r.severity === 'critical').length, high: filtered.filter(r => r.severity === 'high').length, medium: filtered.filter(r => r.severity === 'medium').length, low: filtered.filter(r => r.severity === 'low').length };

  const handleAddRisk = () => {
    if (!newRisk.title.trim()) return;
    console.log('Adding risk:', newRisk);
    setShowModal(false);
    setNewRisk({ title: '', description: '', severity: 'medium', mitigation: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-surface">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-white" /></div>
          <span className="font-bold text-text-primary">AI Client</span>
        </Link>
      </header>
      <main className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div><h1 className="text-3xl font-bold text-text-primary">Risks & Deadlines</h1><p className="text-text-secondary">Track project risks and upcoming deadlines.</p></div>
          <Button onClick={() => setShowModal(true)} className="glow-primary"><Plus className="w-4 h-4" />Add Risk</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[{ s: 'critical', l: 'Critical', c: 'red' }, { s: 'high', l: 'High', c: 'amber' }, { s: 'medium', l: 'Medium', c: 'blue' }, { s: 'low', l: 'Low', c: 'slate' }].map(i => <Card key={i.s} className="text-center"><div className={`w-12 h-12 rounded-xl bg-${i.c}-500/20 flex items-center justify-center mx-auto mb-3`}><AlertTriangle className={`w-6 h-6 text-${i.c}-500`} /></div><p className="text-3xl font-bold text-text-primary">{counts[i.s as keyof typeof counts]}</p><p className="text-sm text-text-muted">{i.l}</p></Card>)}
        </div>
        <Card className="mb-6"><Input placeholder="Search risks..." value={search} onChange={e => setSearch(e.target.value)} icon={<Search className="w-4 h-4" />} /></Card>
        <div className="space-y-4">
          {filtered.map(r => {
            const project = projects.find(p => p.id === r.projectId);
            const Icon = r.severity === 'critical' ? AlertCircle : r.severity === 'high' ? AlertTriangle : Shield;
            return (
              <Card key={r.id} className={r.severity === 'critical' ? 'border-red-500/30' : r.severity === 'high' ? 'border-amber-500/30' : ''}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${r.severity === 'critical' ? 'bg-red-500/20' : r.severity === 'high' ? 'bg-amber-500/20' : 'bg-slate-500/20'}`}><Icon className={`w-6 h-6 ${r.severity === 'critical' ? 'text-red-500' : r.severity === 'high' ? 'text-amber-500' : 'text-slate-400'}`} /></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1"><h3 className="text-lg font-semibold text-text-primary">{r.title}</h3><Badge className={getStatusColor(r.severity)}>{r.severity}</Badge>{project && <Link href={`/projects/${project.id}`} className="text-sm text-text-muted hover:text-primary flex items-center gap-1">{project.name}<ExternalLink className="w-3 h-3" /></Link>}</div>
                      <p className="text-text-secondary">{r.description}</p>
                      {r.mitigation && <div className={`mt-3 p-3 rounded-lg ${r.severity === 'critical' ? 'bg-red-500/10' : r.severity === 'high' ? 'bg-amber-500/10' : 'bg-surface-elevated'}`}><p className="text-sm"><span className="font-medium text-text-primary">Mitigation: </span><span className="text-text-secondary">{r.mitigation}</span></p></div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-muted flex items-center gap-1"><Clock className="w-4 h-4" />{formatDate(r.deadline)}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Add Risk Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-background border border-border rounded-lg w-full max-w-lg p-6 m-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Add New Risk</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Risk Title</label>
                <input
                  type="text"
                  value={newRisk.title}
                  onChange={e => setNewRisk(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter risk title..."
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Description</label>
                <textarea
                  value={newRisk.description}
                  onChange={e => setNewRisk(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this risk..."
                  rows={3}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Severity</label>
                <select
                  value={newRisk.severity}
                  onChange={e => setNewRisk(prev => ({ ...prev, severity: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Mitigation (optional)</label>
                <textarea
                  value={newRisk.mitigation}
                  onChange={e => setNewRisk(prev => ({ ...prev, mitigation: e.target.value }))}
                  placeholder="How can this risk be mitigated?"
                  rows={2}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleAddRisk} className="bg-gradient-to-r from-primary to-secondary">
                <Save className="w-4 h-4 mr-2" />Save Risk
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}