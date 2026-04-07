'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, tasks, notes, risks, dashboardStats } from '@/data/mockData';
import { formatDate } from '@/lib/utils';

function getProjectName(projectId: string) {
  const project = projects.find(p => p.id === projectId);
  return project?.name || 'Unknown Project';
}
import { Button, Card, Badge, Avatar, ProgressBar } from '@/components/ui';
import { 
  Plus, FolderKanban, ListTodo, Calendar, AlertTriangle, 
  BrainCircuit, Clock, TrendingUp,
  ChevronRight, Search, Bell, Settings, X
} from 'lucide-react';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const searchResults = searchQuery.trim() 
    ? [...projects, ...tasks, ...notes].filter(item => 
        'name' in item ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) :
        'title' in item ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) :
        false
      ).slice(0, 8)
    : [];

  const activeProjects = projects.filter(p => p.status === 'active').slice(0, 4);
  const pendingTasks = tasks.filter(t => t.status === 'todo').slice(0, 5);
  const recentNotes = notes.slice(0, 3);
  const criticalRisks = risks.filter(r => r.severity === 'critical').slice(0, 3);

  const stats = [
    { label: 'Active Projects', value: dashboardStats.activeProjects, icon: FolderKanban, change: '+2 this week', color: 'amber' },
    { label: 'Pending Tasks', value: dashboardStats.pendingTasks, icon: ListTodo, change: '12 due today', color: 'orange' },
    { label: 'Deadlines', value: dashboardStats.deadlinesThisWeek, icon: Calendar, change: '3 this week', color: 'yellow' },
    { label: 'Risk Alerts', value: dashboardStats.riskAlerts, icon: AlertTriangle, change: '2 critical', color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-text-primary">AI Client Assistant</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border">
                <Search className="w-4 h-4 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search projects, tasks..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(e.target.value.trim().length > 0);
                  }}
                  onFocus={() => setShowResults(searchQuery.trim().length > 0)}
                  className="bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted w-40"
                />
                {searchQuery && (
                  <button onClick={() => { setSearchQuery(''); setShowResults(false); }}>
                    <X className="w-4 h-4 text-text-muted hover:text-text-primary" />
                  </button>
                )}
              </div>
              
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searchResults.map((item, i) => {
                    const type = 'name' in item ? 'project' : 'title' in item ? 'task' : 'note';
                    return (
                      <Link
                        key={i}
                        href={type === 'project' ? `/projects/${item.id}` : type === 'task' ? '/tasks' : '/notes'}
                        onClick={() => setShowResults(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-surface-elevated border-b border-border last:border-b-0"
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          type === 'project' ? 'bg-amber-500/20 text-amber-500' :
                          type === 'task' ? 'bg-orange-500/20 text-orange-500' :
                          'bg-emerald-500/20 text-emerald-500'
                        }`}>
                          {type === 'project' ? <FolderKanban className="w-4 h-4" /> :
                           type === 'task' ? <ListTodo className="w-4 h-4" /> :
                           <ChevronRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm text-text-primary font-medium truncate max-w-48">
                            {'name' in item ? item.name : 'title' in item ? item.title : ''}
                          </p>
                          <p className="text-xs text-text-muted capitalize">{type}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
              
              {showResults && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg p-4 text-center">
                  <p className="text-sm text-text-muted">No results found</p>
                </div>
              )}
              
              {showResults && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowResults(false)}
                />
              )}
            </div>
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-text-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5 text-text-secondary" />
              </Button>
            </Link>
            <Link href="/settings">
              <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" size="sm" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
            <p className="text-text-secondary">Welcome back! Here&apos;s your project overview.</p>
          </div>
          <Link href="/analyzer">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/20">
              <Plus className="w-4 h-4 mr-2" />New Analysis
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:border-amber-500/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-muted text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-text-primary mt-1">{stat.value}</p>
                    <p className="text-text-muted text-xs mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />{stat.change}
                    </p>
                  </div>
                  <div className={`w-11 h-11 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">Active Projects</h2>
                <Link href="/projects" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-3">
                {activeProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/projects/${project.id}`}>
                      <div className="p-4 bg-surface rounded-xl border border-border hover:border-amber-500/30 transition-all group">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-text-primary group-hover:text-amber-400 transition-colors">{project.name}</h3>
                            <p className="text-text-muted text-sm">{project.client}</p>
                          </div>
                          <Badge className={
                            project.status === 'active' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                          }>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-text-muted text-xs">Progress</span>
                              <span className="text-text-muted text-xs">{project.progress}%</span>
                            </div>
                            <ProgressBar value={project.progress} size="sm" />
                          </div>
                          <span className="text-text-muted text-sm flex items-center gap-1 whitespace-nowrap">
                            <Clock className="w-3 h-3" />{formatDate(project.deadline)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Tasks */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-text-primary">Pending Tasks</h2>
                <Link href="/tasks" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-2">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border-2 ${
                        task.priority === 'high' ? 'border-red-500 bg-red-500/20' :
                        task.priority === 'medium' ? 'border-yellow-500 bg-yellow-500/20' :
                        'border-slate-500 bg-slate-500/20'
                      }`} />
                      <div>
                        <p className="text-text-primary text-sm">{task.title}</p>
                        <p className="text-text-muted text-xs">{getProjectName(task.projectId)} · {formatDate(task.dueDate)}</p>
                      </div>
                    </div>
                    <Badge variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'} className="text-xs">
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link href="/analyzer" className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-amber-500/5 border border-border hover:border-amber-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                    <BrainCircuit className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-primary text-sm font-medium">Analyze Requirements</p>
                    <p className="text-text-muted text-xs">AI-powered analysis</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-amber-400 transition-colors" />
                </Link>
                <Link href="/projects" className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-amber-5/5 border border-border hover:border-amber-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <FolderKanban className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-text-primary text-sm font-medium">View Projects</p>
                    <p className="text-text-muted text-xs">Browse all projects</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-amber-400 transition-colors" />
                </Link>
              </div>
            </Card>

            {/* Risk Alerts */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Risk Alerts</h2>
                <Link href="/risks" className="text-sm text-amber-400 hover:text-amber-300">View all</Link>
              </div>
              <div className="space-y-2">
                {criticalRisks.map((risk, i) => (
                  <div key={risk.id} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                      <div>
                        <p className="text-text-primary text-sm">{risk.title}</p>
                        <p className="text-text-muted text-xs">{getProjectName(risk.projectId)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Notes */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Recent Notes</h2>
                <Link href="/notes" className="text-sm text-amber-400 hover:text-amber-300">View all</Link>
              </div>
              <div className="space-y-2">
                {recentNotes.map((note, i) => (
                  <div key={note.id} className="p-3 bg-surface rounded-lg border border-border">
                    <p className="text-text-primary text-sm line-clamp-2">{note.content}</p>
                    <p className="text-text-muted text-xs mt-2">{getProjectName(note.projectId)} · {formatDate(note.createdAt)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}