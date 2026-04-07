export type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'at-risk';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type RiskSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
}

export interface Project {
  id: string;
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  deadline: string;
  startDate: string;
  riskLevel: RiskSeverity;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  dueDate: string;
  tags: string[];
  aiGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  projectId: string;
  title: string;
  content: string;
  type: 'meeting' | 'general' | 'transcript';
  pinned: boolean;
  actionItems: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Risk {
  id: string;
  projectId: string;
  title: string;
  description: string;
  severity: RiskSeverity;
  mitigation?: string;
  deadline: string;
  createdAt: string;
}

export interface Deadline {
  id: string;
  projectId: string;
  title: string;
  date: string;
  type: 'milestone' | 'delivery' | 'review' | 'meeting';
  completed: boolean;
}

export interface AIAnalysis {
  id: string;
  requirementText: string;
  summary: string;
  keyDeliverables: string[];
  tasks: Task[];
  deadlines: Deadline[];
  risks: Risk[];
  recommendedQuestions: string[];
  suggestedScope: string;
  createdAt: string;
}

export interface Insight {
  id: string;
  type: 'recommendation' | 'bottleneck' | 'warning' | 'suggestion';
  title: string;
  description: string;
  projectId?: string;
  actionable: boolean;
  createdAt: string;
}

export interface DashboardStats {
  activeProjects: number;
  pendingTasks: number;
  deadlinesThisWeek: number;
  riskAlerts: number;
}

export interface Activity {
  id: string;
  type: 'task' | 'note' | 'project' | 'risk' | 'deadline';
  action: string;
  description: string;
  userId: string;
  projectId?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
}