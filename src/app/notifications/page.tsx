'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardTitle, Badge, Button } from '@/components/ui';
import { notifications } from '@/data/mockData';
import { formatDate } from '@/lib/utils';
import { Bell, Check, Trash2, Filter, Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifs, setNotifs] = useState(notifications);
  const filtered = filter === 'all' ? notifs : notifs.filter(n => !n.read);
  const unread = notifs.filter(n => !n.read).length;

  const markRead = (id: string) => setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  const markAll = () => setNotifs(notifs.map(n => ({ ...n, read: true })));
  const remove = (id: string) => setNotifs(notifs.filter(n => n.id !== id));

  const icons = { info: Info, success: CheckCircle, warning: AlertCircle, error: XCircle };
  const colors = { info: 'primary', success: 'emerald', warning: 'amber', error: 'red' };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-8 py-4 border-b border-border bg-surface">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><Bell className="w-4 h-4 text-white" /></div>
          <span className="font-bold text-text-primary">AI Client</span>
        </Link>
      </header>
      <main className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div><h1 className="text-3xl font-bold text-text-primary">Notifications</h1><p className="text-text-secondary">Stay updated with your project activity.</p></div>
          {unread > 0 && <Button variant="outline" onClick={markAll}><Check className="w-4 h-4" />Mark all read</Button>}
        </div>
        <Card className="mb-6"><div className="flex items-center gap-4"><Filter className="w-5 h-5 text-text-muted" /><button onClick={() => setFilter('all')} className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'all' ? 'bg-primary text-white' : 'bg-surface-elevated text-text-muted'}`}>All ({notifs.length})</button><button onClick={() => setFilter('unread')} className={`px-3 py-1.5 text-sm rounded-lg ${filter === 'unread' ? 'bg-primary text-white' : 'bg-surface-elevated text-text-muted'}`}>Unread ({unread})</button></div></Card>
        <div className="space-y-3">
          {filtered.map(n => {
            const Icon = icons[n.type];
            return (
              <Card key={n.id} className={!n.read ? 'border-l-4 border-l-primary' : ''}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${colors[n.type]}/20`}><Icon className={`w-5 h-5 text-${colors[n.type]}`} /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><h3 className="font-semibold text-text-primary">{n.title}</h3>{!n.read && <span className="w-2 h-2 rounded-full bg-primary" />}</div>
                    <p className="text-sm text-text-secondary">{n.message}</p>
                    <p className="text-xs text-text-muted mt-2">{formatDate(n.createdAt)}</p>
                  </div>
                  <div className="flex gap-2">{!n.read && <Button variant="ghost" size="sm" onClick={() => markRead(n.id)}><Check className="w-4 h-4" /></Button>}<Button variant="ghost" size="sm" onClick={() => remove(n.id)}><Trash2 className="w-4 h-4" /></Button></div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}