'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge, Avatar, Button } from '@/components/ui';
import { tasks, projects } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { Plus, MoreHorizontal, Clock, X, Save } from 'lucide-react';

const columns = [
  { id: 'todo', label: 'To Do', color: 'slate' },
  { id: 'in-progress', label: 'In Progress', color: 'primary' },
  { id: 'review', label: 'Review', color: 'amber' },
  { id: 'done', label: 'Done', color: 'emerald' },
];

export default function TasksPage() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
  });

  const filtered = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    console.log('Adding task:', newTask);
    setShowModal(false);
    setNewTask({ title: '', description: '', priority: 'medium', status: 'todo' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            </div>
            <span className="font-semibold text-text-primary">AI Client Assistant</span>
          </Link>
        </div>
      </header>

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Tasks</h1>
            <p className="text-text-secondary">Manage all your tasks</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
            <Plus className="w-4 h-4 mr-2" />Add Task
          </Button>
        </div>
        
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className="w-full max-w-md h-10 px-4 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {columns.map(col => (
            <div key={col.id}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${col.color}-500`} />
                  <h3 className="font-semibold text-text-primary">{col.label}</h3>
                </div>
                <Badge variant="outline">{filtered.filter(t => t.status === col.id).length}</Badge>
              </div>
              <div className="space-y-3 min-h-[200px] p-3 bg-surface rounded-lg border border-border">
                {filtered.filter(t => t.status === col.id).map(task => (
                    <div key={task.id} className="bg-surface p-4 rounded-lg border border-border hover:border-amber-500/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-text-primary">{task.title}</h4>
                        <button className="text-text-muted hover:text-text-primary">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-text-muted line-clamp-2 mb-3">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(task.priority)} size="sm">{task.priority}</Badge>
                          {task.aiGenerated && (
                            <span className="text-xs text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded">AI</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        {task.assignee ? (
                          <Avatar src={task.assignee.avatar} size="sm" />
                        ) : (
                          <span className="text-xs text-text-muted">Unassigned</span>
                        )}
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
</div>
                ))}
                <button 
                  onClick={() => {
                    setNewTask(prev => ({ ...prev, status: col.id }));
                    setShowModal(true);
                  }}
                  className="w-full p-3 border-2 border-dashed border-border rounded-lg text-text-muted hover:text-text-primary hover:border-amber-500/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />Add task
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background border border-border rounded-lg p-6 z-50"
            >
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
                    {columns.map(col => (
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}