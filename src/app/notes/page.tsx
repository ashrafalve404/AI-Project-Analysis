'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, Badge, Button } from '@/components/ui';
import { notes, projects } from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import { Plus, FileText, Calendar, MessageSquare, Pin } from 'lucide-react';

export default function NotesPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const filtered = notes.filter(n => (n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())) && (typeFilter === 'all' || n.type === typeFilter));

  const icons = { meeting: Calendar, general: FileText, transcript: MessageSquare };
  const colors = { meeting: 'primary', general: 'secondary', transcript: 'warning' };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-surface">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><FileText className="w-4 h-4 text-white" /></div>
          <span className="font-bold text-text-primary">AI Client</span>
        </Link>
      </header>
      <main className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div><h1 className="text-3xl font-bold text-text-primary">Notes & Meeting Logs</h1><p className="text-text-secondary">Organize meeting notes and project documentation.</p></div>
          <Button className="glow-primary"><Plus className="w-4 h-4" />Add Note</Button>
        </div>
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1"><input type="text" placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)} className="w-full h-10 px-4 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary" /></div>
            <div className="flex gap-2">{['all', 'meeting', 'general', 'transcript'].map(t => <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 text-sm rounded-lg ${typeFilter === t ? 'bg-primary text-white' : 'bg-surface-elevated text-text-muted'}`}>{t === 'all' ? 'All' : t}</button>)}</div>
          </div>
        </Card>
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map(note => {
            const Icon = icons[note.type];
            const project = projects.find(p => p.id === note.projectId);
            return (
              <Card key={note.id} hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-${colors[note.type]}/20 flex items-center justify-center`}><Icon className={`w-5 h-5 text-${colors[note.type]}`} /></div>
                    <div><h3 className="font-semibold text-text-primary">{note.title}</h3><p className="text-xs text-text-muted">{project?.name}</p></div>
                  </div>
                  {note.pinned && <Pin className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-sm text-text-secondary line-clamp-3 mb-4">{note.content}</p>
                {note.actionItems.length > 0 && <div className="p-2 bg-surface-elevated rounded mb-3"><p className="text-xs text-text-muted">Action items: {note.actionItems.join(', ')}</p></div>}
                <div className="flex justify-between pt-3 border-t border-border"><Badge variant="outline" size="sm">{note.type}</Badge><span className="text-xs text-text-muted">{formatDate(note.createdAt)}</span></div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}