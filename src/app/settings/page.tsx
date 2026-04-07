'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, Button, Avatar } from '@/components/ui';
import { currentUser } from '@/data/mockData';
import { lightColors, darkColors, accentColorMap } from '@/lib/appInit';
import { 
  User, Bell, Shield, Palette, Plug, Key, Save, Camera, 
  ChevronLeft, Moon, Sun, Monitor, Check,
  MessageSquare, FolderKanban, Github
} from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'integrations', label: 'Integrations', icon: Plug },
  { id: 'api', label: 'API Keys', icon: Key },
];

const themeOptions = [
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'system', label: 'System', icon: Monitor },
];

const accentColors = [
  { id: '#f59e0b', name: 'Amber' },
  { id: '#ef4444', name: 'Red' },
  { id: '#10b981', name: 'Emerald' },
  { id: '#06b6d4', name: 'Cyan' },
  { id: '#8b5cf6', name: 'Violet' },
  { id: '#ec4899', name: 'Pink' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    taskAssignments: true,
    deadlineReminders: true,
    riskAlerts: false,
    aiInsights: true,
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [accentColor, setAccentColor] = useState('#f59e0b');
  const [integrations, setIntegrations] = useState({
    slack: true,
    jira: false,
    github: true,
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const savedAccent = localStorage.getItem('accentColor');
      
      setTheme((savedTheme as 'light' | 'dark') || 'light');
      setAccentColor(savedAccent || '#f59e0b');
    } catch {
      setTheme('light');
      setAccentColor('#f59e0b');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    
    try {
      localStorage.setItem('theme', theme);
      localStorage.setItem('accentColor', accentColor);
    } catch {
      // localStorage not available
    }
    
    const colors = theme === 'dark' ? darkColors : lightColors;
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    root.style.setProperty('--color-primary', accentColor);
    root.style.setProperty('--color-primary-hover', accentColorMap[accentColor] || '#b45309');
    root.style.setProperty('--color-secondary', '#ea580c');
    root.style.setProperty('--color-secondary-hover', '#f97316');
    root.style.setProperty('--color-accent', accentColor);
  }, [theme, accentColor, loading]);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    saveSettings();
  };

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations(prev => ({ ...prev, [key]: !prev[key] }));
    saveSettings();
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('notifications', JSON.stringify(notifications));
      localStorage.setItem('integrations', JSON.stringify(integrations));
    } catch {
      // localStorage not available
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSave = () => {
    saveSettings();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="w-px h-6 bg-border" />
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-text-primary">AI Client Assistant</span>
            </Link>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">Save & Exit</Button>
          </Link>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <Card className="p-2 h-fit">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id 
                      ? 'bg-amber-500/10 text-amber-600' 
                      : 'text-text-muted hover:text-text-primary hover:bg-surface'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {activeTab === 'profile' && (
                <Card>
                  <h2 className="text-lg font-semibold text-text-primary mb-6">Profile Information</h2>
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <Avatar src={currentUser.avatar} size="xl" />
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                        <Camera className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-text-primary">{currentUser.name}</h3>
                      <p className="text-text-muted capitalize">{currentUser.role}</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">First Name</label>
                        <input 
                          type="text" 
                          defaultValue="Alex"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-amber-500/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">Last Name</label>
                        <input 
                          type="text" 
                          defaultValue="Morgan"
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-amber-500/50 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">Email</label>
                      <input 
                        type="email" 
                        defaultValue={currentUser.email}
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-amber-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-text-secondary mb-2">Company</label>
                      <input 
                        type="text" 
                        defaultValue="Tech Agency"
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-amber-500/50 transition-all"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-sm text-text-muted">Member since January 2026</span>
                      <Button onClick={handleSave} className="bg-gradient-to-r from-amber-500 to-orange-500">
                        <Save className="w-4 h-4 mr-2" />
                        {saved ? 'Saved!' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card>
                  <h2 className="text-lg font-semibold text-text-primary mb-6">Notification Preferences</h2>
                  <div className="space-y-3">
                    {[
                      { key: 'projectUpdates', label: 'Project Updates', desc: 'Get notified when projects are updated' },
                      { key: 'taskAssignments', label: 'Task Assignments', desc: 'Receive notifications when tasks are assigned to you' },
                      { key: 'deadlineReminders', label: 'Deadline Reminders', desc: 'Get reminders before project deadlines' },
                      { key: 'riskAlerts', label: 'Risk Alerts', desc: 'Immediate alerts for project risks' },
                      { key: 'aiInsights', label: 'AI Insights', desc: 'Weekly AI-generated insights and recommendations' },
                    ].map(item => (
                      <div 
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border"
                      >
                        <div>
                          <h4 className="font-medium text-text-primary">{item.label}</h4>
                          <p className="text-sm text-text-muted">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                          className={`w-12 h-7 rounded-full transition-all ${
                            notifications[item.key as keyof typeof notifications] 
                              ? 'bg-amber-500' 
                              : 'bg-surface border border-border'
                          }`}
                        >
                          <div 
                            className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                              notifications[item.key as keyof typeof notifications] 
                                ? 'translate-x-5' 
                                : 'translate-x-1'
                            }`} 
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button onClick={saveSettings} className="bg-gradient-to-r from-amber-500 to-orange-500">
                      <Save className="w-4 h-4 mr-2" />
                      {saved ? 'Saved!' : 'Save Preferences'}
                    </Button>
                  </div>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card>
                  <h2 className="text-lg font-semibold text-text-primary mb-6">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-text-primary">Password</h4>
                        <p className="text-sm text-text-muted">Last changed 30 days ago</p>
                      </div>
                      <Button variant="outline" size="sm">Change</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-text-primary">Two-Factor Authentication</h4>
                        <p className="text-sm text-text-muted">Add an extra layer of security</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border">
                      <div>
                        <h4 className="font-medium text-text-primary">Active Sessions</h4>
                        <p className="text-sm text-text-muted">Manage your active sessions</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === 'appearance' && (
                <Card>
                  <h2 className="text-lg font-semibold text-text-primary mb-6">Appearance</h2>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-medium text-text-primary mb-4">Theme</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {themeOptions.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setTheme(t.id as 'light' | 'dark')}
                            className={`p-4 rounded-lg border transition-all ${
                              theme === t.id
                                ? 'border-amber-500 bg-amber-500/10'
                                : 'border-border hover:border-amber-500/30'
                            }`}
                          >
                            <t.icon className={`w-6 h-6 mx-auto mb-2 ${theme === t.id ? 'text-amber-600' : 'text-text-muted'}`} />
                            <span className="text-sm font-medium text-text-primary">{t.label}</span>
                            {theme === t.id && (
                              <Check className="w-4 h-4 mx-auto mt-2 text-amber-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary mb-4">Accent Color</h4>
                      <div className="flex gap-3">
                        {accentColors.map(c => (
                          <button
                            key={c.id}
                            onClick={() => setAccentColor(c.id)}
                            className={`w-10 h-10 rounded-full transition-all ${
                              accentColor === c.id 
                                ? 'ring-2 ring-white ring-offset-2 ring-offset-background' 
                                : 'hover:scale-110'
                            }`}
                            style={{ backgroundColor: c.id }}
                            title={c.name}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-text-muted mt-2">
                        Current: {accentColors.find(c => c.id === accentColor)?.name} accent color
                      </p>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-text-muted">
                        Theme changes apply immediately. Your preferences are saved automatically.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === 'integrations' && (
                <Card>
                  <h2 className="text-lg font-semibold text-text-primary mb-6">Integrations</h2>
                  <div className="space-y-3">
                    {[
                      { key: 'slack', name: 'Slack', desc: 'Team communication and notifications' },
                      { key: 'jira', name: 'Jira', desc: 'Project and issue tracking' },
                      { key: 'github', name: 'GitHub', desc: 'Code repository and CI/CD' },
                    ].map(item => (
                      <div 
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg border border-border flex items-center justify-center">
                            {item.key === 'slack' && <MessageSquare className="w-6 h-6 text-text-secondary" />}
                            {item.key === 'jira' && <FolderKanban className="w-6 h-6 text-text-secondary" />}
                            {item.key === 'github' && <Github className="w-6 h-6 text-text-secondary" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-text-primary">{item.name}</h4>
                            <p className="text-sm text-text-muted">{item.desc}</p>
                          </div>
                        </div>
                        <Button
                          variant={integrations[item.key as keyof typeof integrations] ? 'outline' : 'primary'}
                          size="sm"
                          onClick={() => toggleIntegration(item.key as keyof typeof integrations)}
                          className={!integrations[item.key as keyof typeof integrations] 
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg' 
                            : ''
                          }
                        >
                          {integrations[item.key as keyof typeof integrations] ? 'Disconnect' : 'Connect'}
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button onClick={saveSettings} className="bg-gradient-to-r from-amber-500 to-orange-500">
                      <Save className="w-4 h-4 mr-2" />
                      {saved ? 'Saved!' : 'Save Integrations'}
                    </Button>
                  </div>
                </Card>
              )}

              {activeTab === 'api' && (
                <Card>
                  <h2 className="text-lg font-semibold text-text-primary mb-6">API Keys</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-surface rounded-lg border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-text-primary">Production API Key</h4>
                        <span className="px-2 py-1 text-xs rounded bg-emerald-500/10 text-emerald-600">Active</span>
                      </div>
                      <code className="block p-3 bg-background rounded text-sm text-text-muted font-mono">
                        pk_live_•••••••••••••••
                      </code>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Key className="w-4 h-4 mr-2" />
                      Generate New Key
                    </Button>
                    <p className="text-xs text-text-muted">
                      Keep your API keys secure. Never share them in public repositories or client-side code.
                    </p>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}