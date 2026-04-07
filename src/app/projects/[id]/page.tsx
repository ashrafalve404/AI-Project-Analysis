'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, Badge, ProgressBar, Button, Avatar, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { projects, tasks, notes, risks } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { ArrowLeft, Clock, AlertTriangle, Users, Plus, Calendar, ListTodo, FileText, AlertCircle, X, Save } from 'lucide-react';

const taskColumns = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const projectTasks = tasks.filter(t => t.projectId === id);
  const projectNotes = notes.filter(n => n.projectId === id);
  const projectRisks = risks.filter(r => r.projectId === id);

  const [showModal, setShowModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
  });
  const [newRisk, setNewRisk] = useState({
    title: '',
    description: '',
    severity: 'medium',
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    console.log('Adding task to project:', id, newTask);
    setShowModal(false);
    setNewTask({ title: '', description: '', priority: 'medium', status: 'todo' });
  };

  const handleAddRisk = () => {
    if (!newRisk.title.trim()) return;
    console.log('Adding risk to project:', id, newRisk);
    setShowRiskModal(false);
    setNewRisk({ title: '', description: '', severity: 'medium' });
  };

  if (!project) return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-text-primary">Project not found</h2>
      <Link href="/projects">
        <Button variant="outline" className="mt-4">Back to Projects</Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/projects" className="text-text-muted hover:text-text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-px h-6 bg-border" />
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
              </div>
              <span className="font-semibold text-text-primary">AI Client Assistant</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center text-2xl font-bold text-amber-600">
              {project.name[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{project.name}</h1>
              <p className="text-text-secondary">{project.client}</p>
              <div className="flex gap-2 mt-2">
                <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                {project.riskLevel !== 'low' && (
                  <Badge className={getStatusColor(project.riskLevel)}>
                    <AlertTriangle className="w-3 h-3" />
                    {project.riskLevel}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="button" onClick={() => setShowModal(true)} className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />Add Task
            </Button>
            <Button type="button" onClick={() => setShowRiskModal(true)} variant="outline">
              <AlertTriangle className="w-4 h-4 mr-2" />Add Risk
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <p className="text-text-muted text-sm">Progress</p>
            <p className="text-3xl font-bold text-text-primary mt-1">{project.progress}%</p>
            <ProgressBar value={project.progress} className="mt-3" />
          </Card>
          <Card>
            <p className="text-text-muted text-sm">Tasks</p>
            <p className="text-3xl font-bold text-text-primary mt-1">{projectTasks.length}</p>
          </Card>
          <Card>
            <p className="text-text-muted text-sm">Risks</p>
            <p className="text-3xl font-bold text-text-primary mt-1">{projectRisks.length}</p>
          </Card>
          <Card>
            <p className="text-text-muted text-sm">Deadline</p>
            <p className="text-xl font-bold text-text-primary mt-1">{formatDate(project.deadline)}</p>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks ({projectTasks.length})</TabsTrigger>
            <TabsTrigger value="notes">Notes ({projectNotes.length})</TabsTrigger>
            <TabsTrigger value="risks">Risks ({projectRisks.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <p className="text-text-secondary">{project.description}</p>
              <div className="flex gap-2 mt-4">
                {project.tags.map(t => (
                  <Badge key={t} variant="outline">{t}</Badge>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-6">
            <div className="grid md:grid-cols-4 gap-4">
              {taskColumns.map(col => (
                <div key={col.id} className="bg-surface rounded-lg p-4 border border-border">
                  <h3 className="font-medium text-text-primary mb-3 capitalize">{col.label}</h3>
                  <div className="space-y-2">
                    {projectTasks.filter(t => t.status === col.id).map(t => (
                      <div key={t.id} className="p-3 bg-surface-elevated rounded-lg">
                        <p className="text-sm text-text-primary">{t.title}</p>
                        <div className="flex justify-between mt-2">
                          <Badge className={getStatusColor(t.priority)} size="sm">{t.priority}</Badge>
                          {t.assignee && <Avatar src={t.assignee.avatar} size="sm" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-6">
            <div className="space-y-4">
              {projectNotes.map(n => (
                <Card key={n.id}>
                  <h4 className="font-semibold text-text-primary">{n.title}</h4>
                  <p className="text-text-secondary mt-2">{n.content}</p>
                  {n.actionItems.length > 0 && (
                    <div className="mt-3 p-2 bg-surface-elevated rounded">
                      <p className="text-xs text-text-muted">Action items: {n.actionItems.join(', ')}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="risks" className="mt-6">
            <div className="space-y-4">
              {projectRisks.map(r => (
                <Card key={r.id}>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className={`w-5 h-5 ${r.severity === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                    <h4 className="font-semibold text-text-primary">{r.title}</h4>
                    <Badge className={getStatusColor(r.severity)}>{r.severity}</Badge>
                  </div>
                  <p className="text-text-secondary">{r.description}</p>
                  {r.mitigation && <p className="text-sm text-emerald-400 mt-2">Mitigation: {r.mitigation}</p>}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-background border border-border rounded-lg w-full max-w-lg p-6 m-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Add New Task</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter task title..."
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={e => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter task description..."
                    rows={3}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={e => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-amber-500/50"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-text-secondary mb-2">Status</label>
                  <select
                    value={newTask.status}
                    onChange={e => setNewTask(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-amber-500/50"
                  >
                    {taskColumns.map(col => (
                      <option key={col.id} value={col.id}>{col.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button onClick={handleAddTask} className="bg-gradient-to-r from-amber-500 to-orange-500">
                  <Save className="w-4 h-4 mr-2" />Save Task
                </Button>
              </div>
            </div>
          </div>
        )}

      {/* Add Risk Modal */}
      {showRiskModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setShowRiskModal(false)}>
          <div className="bg-background border border-border rounded-lg w-full max-w-lg p-6 m-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Add New Risk</h2>
              <button onClick={() => setShowRiskModal(false)} className="text-text-muted hover:text-text-primary">
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
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50"
                />
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-2">Description</label>
                <textarea
                  value={newRisk.description}
                  onChange={e => setNewRisk(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe this risk..."
                  rows={3}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50 resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-2">Severity</label>
                <select
                  value={newRisk.severity}
                  onChange={e => setNewRisk(prev => ({ ...prev, severity: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-amber-500/50"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowRiskModal(false)}>Cancel</Button>
              <Button onClick={handleAddRisk} className="bg-gradient-to-r from-amber-500 to-orange-500">
                <Save className="w-4 h-4 mr-2" />Save Risk
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}