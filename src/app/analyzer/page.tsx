'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { sampleAIAnalysis } from '@/data/mockData';
import { formatDate, getStatusColor } from '@/lib/utils';
import { 
  BrainCircuit, Upload, Wand2, Bot, AlertTriangle, 
  HelpCircle, ArrowRight, RefreshCw, Loader2, FileText,
  Calendar, CheckCircle2, XCircle
} from 'lucide-react';

export default function AnalyzerPage() {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<typeof sampleAIAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setAnalyzing(true);
    setAnalysis(null);
    await new Promise(r => setTimeout(r, 2500));
    setAnalysis({ ...sampleAIAnalysis, requirementText: text });
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-text-primary">AI Client Assistant</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary">Requirement Analyzer</h1>
          <p className="text-text-secondary">Transform client requirements into actionable insights with AI</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Client Requirements</h2>
                <p className="text-text-muted text-sm">Paste or type requirements</p>
              </div>
            </div>
            
            <textarea 
              placeholder="Paste your client requirements here. Include details about features, timelines, budget, and any specific needs..."
              value={text} 
              onChange={e => setText(e.target.value)} 
              rows={12}
              className="w-full p-4 bg-surface border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />Upload File
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setText(sampleAIAnalysis.requirementText)}>
                  <Bot className="w-4 h-4 mr-2" />Load Sample
                </Button>
              </div>
              <Button 
                onClick={handleAnalyze} 
                disabled={!text.trim() || analyzing}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/20"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Analyze Requirements
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Results Panel */}
          <div>
            <AnimatePresence mode="wait">
              {!analysis && !analyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="h-[480px] flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mx-auto mb-4">
                        <BrainCircuit className="w-8 h-8 text-text-muted" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">Ready to Analyze</h3>
                      <p className="text-text-muted max-w-xs mx-auto">Paste your client requirements in the input and click analyze to get AI insights.</p>
                    </div>
                  </Card>
                </motion.div>
              )}

              {analyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="h-[480px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-2 border-amber-500/20" />
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin" />
                        <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">Analyzing Requirements...</h3>
                      <p className="text-text-muted">AI is extracting tasks, risks, and insights</p>
                    </div>
                  </Card>
                </motion.div>
              )}

              {analysis && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-text-primary">Analysis Results</h2>
                          <p className="text-text-muted text-sm">AI-powered insights</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setAnalysis(null)}>
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>

                    <Tabs defaultValue="summary">
                      <TabsList className="mb-4 bg-surface border border-border">
                        <TabsTrigger value="summary" className="text-sm">Summary</TabsTrigger>
                        <TabsTrigger value="tasks" className="text-sm">Tasks</TabsTrigger>
                        <TabsTrigger value="deadlines" className="text-sm">Deadlines</TabsTrigger>
                        <TabsTrigger value="risks" className="text-sm">Risks</TabsTrigger>
                        <TabsTrigger value="questions" className="text-sm">Questions</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="summary">
                        <div className="space-y-5">
                          <div>
                            <h4 className="font-medium text-text-primary mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-amber-400" />Executive Summary
                            </h4>
                            <p className="text-text-secondary text-sm leading-relaxed">{analysis.summary}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-text-primary mb-3 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-amber-400" />Key Deliverables
                            </h4>
                            <ul className="space-y-2">
                              {analysis.keyDeliverables.map((d, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                                  <span className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-xs text-amber-400 flex-shrink-0 mt-0.5">{i+1}</span>
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="tasks">
                        <div className="space-y-2">
                          {analysis.tasks.length === 0 ? (
                            <p className="text-text-muted text-sm">No tasks extracted yet.</p>
                          ) : (
                            analysis.tasks.map((t, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-lg border border-border">
                                <div className="w-5 h-5 rounded border border-border flex items-center justify-center">
                                  <div className="w-3 h-3 rounded bg-amber-500/20" />
                                </div>
                                <span className="text-text-primary text-sm">{t.title}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="deadlines">
                        <div className="space-y-2">
                          {analysis.deadlines.map((d, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
                              <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-text-muted" />
                                <span className="text-text-primary text-sm">{d.title}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">{formatDate(d.date)}</Badge>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="risks">
                        <div className="space-y-2">
                          {analysis.risks.map((r, i) => (
                            <div key={i} className="p-3 bg-surface rounded-lg border border-border">
                              <div className="flex items-center gap-2 mb-2">
                                {r.severity === 'high' ? (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                ) : (
                                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                                )}
                                <span className="font-medium text-text-primary text-sm">{r.title}</span>
                                <Badge className={getStatusColor(r.severity)}>{r.severity}</Badge>
                              </div>
                              <p className="text-text-muted text-sm">{r.description}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="questions">
                        <div className="space-y-2">
                          {analysis.recommendedQuestions.map((q, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-surface rounded-lg border border-border">
                              <HelpCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-text-secondary text-sm">{q}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    <Button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/20">
                      Create Project from Analysis <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}