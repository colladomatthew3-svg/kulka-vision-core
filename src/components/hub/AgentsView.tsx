import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Bot, DollarSign, HardHat, FileText, ShieldCheck, Truck, BrainCircuit,
  RotateCw, CheckCircle2, AlertTriangle, Clock, Zap, ArrowRight,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  domain: string;
  icon: typeof Bot;
  status: "running" | "idle" | "alert";
  lastRun: string;
  cycleTime: string;
  tasksCompleted: number;
  tasksQueued: number;
  accuracy: string;
  description: string;
  recentActions: { action: string; time: string; result: "success" | "warning" | "info" }[];
  workflows: { name: string; frequency: string; status: "active" | "paused" }[];
}

const agents: Agent[] = [
  {
    id: "finance", name: "Finance Agent", domain: "Budget & Cost Control",
    icon: DollarSign, status: "running", lastRun: "12s ago", cycleTime: "5 min",
    tasksCompleted: 847, tasksQueued: 3, accuracy: "99.2%",
    description: "Monitors budget variance, flags cost overruns, reconciles invoices against contracts, and generates financial forecasts across all active projects.",
    recentActions: [
      { action: "Flagged 8.2% budget variance on The Plumber — CO #47 pending", time: "6m ago", result: "warning" },
      { action: "Reconciled 14 invoices against Hauppauge contracts", time: "18m ago", result: "success" },
      { action: "Updated Q2 cash flow forecast — $4.2M projected", time: "1h ago", result: "info" },
      { action: "Detected duplicate billing from Allied Electric — $12K", time: "2h ago", result: "warning" },
    ],
    workflows: [
      { name: "Invoice Reconciliation", frequency: "Every 30 min", status: "active" },
      { name: "Budget Variance Scan", frequency: "Every 5 min", status: "active" },
      { name: "Cash Flow Projection", frequency: "Daily 6:00 AM", status: "active" },
      { name: "Vendor Payment Verification", frequency: "Every 2 hours", status: "active" },
    ],
  },
  {
    id: "construction", name: "Construction Agent", domain: "Site Operations",
    icon: HardHat, status: "running", lastRun: "45s ago", cycleTime: "10 min",
    tasksCompleted: 1203, tasksQueued: 7, accuracy: "97.8%",
    description: "Tracks construction progress, monitors schedule adherence, coordinates subcontractor activities, and identifies potential delays before they impact timelines.",
    recentActions: [
      { action: "Detected steel delivery delay — auto-notified PM on Riverside", time: "4h ago", result: "warning" },
      { action: "Updated completion % for Hauppauge roof installation", time: "5h ago", result: "success" },
      { action: "Flagged weather risk for next week — 3 exterior projects affected", time: "6h ago", result: "info" },
      { action: "Verified Commack punch list completion — 47/47 items resolved", time: "8h ago", result: "success" },
    ],
    workflows: [
      { name: "Progress Tracking Sync", frequency: "Every 10 min", status: "active" },
      { name: "Schedule Deviation Alert", frequency: "Every 15 min", status: "active" },
      { name: "Weather Impact Analysis", frequency: "Daily 5:00 AM", status: "active" },
      { name: "Subcontractor Performance Score", frequency: "Weekly", status: "active" },
    ],
  },
  {
    id: "compliance", name: "Compliance Agent", domain: "Permits & Regulatory",
    icon: FileText, status: "alert", lastRun: "2m ago", cycleTime: "15 min",
    tasksCompleted: 312, tasksQueued: 2, accuracy: "99.6%",
    description: "Monitors permit status, tracks regulatory deadlines, ensures code compliance, and flags potential violations before they cause project delays.",
    recentActions: [
      { action: "ALERT: Smithtown Medical permit resubmission required — 2-week delay risk", time: "2h ago", result: "warning" },
      { action: "Verified Commack Retail CO compliance — passed all checks", time: "6h ago", result: "success" },
      { action: "Pre-scanned Riverside zoning requirements — no issues found", time: "1d ago", result: "success" },
      { action: "Updated permit tracking board — 3 active, 2 pending, 8 approved", time: "1d ago", result: "info" },
    ],
    workflows: [
      { name: "Permit Status Monitor", frequency: "Every 15 min", status: "active" },
      { name: "Code Compliance Scan", frequency: "Daily 7:00 AM", status: "active" },
      { name: "Regulatory Deadline Tracker", frequency: "Every 6 hours", status: "active" },
      { name: "Inspection Scheduling", frequency: "Daily 8:00 AM", status: "active" },
    ],
  },
  {
    id: "risk", name: "Risk Agent", domain: "Risk Assessment",
    icon: ShieldCheck, status: "running", lastRun: "30s ago", cycleTime: "3 min",
    tasksCompleted: 2156, tasksQueued: 1, accuracy: "98.4%",
    description: "Continuously evaluates portfolio risk across all dimensions — financial, operational, regulatory, and environmental — using predictive models to surface issues early.",
    recentActions: [
      { action: "Elevated Smithtown Medical risk score from 6.2 → 8.7 (permit delay)", time: "2h ago", result: "warning" },
      { action: "Reduced Commack risk score from 3.1 → 1.4 (close-out imminent)", time: "8h ago", result: "success" },
      { action: "Generated weekly portfolio risk report — emailed to COO", time: "1d ago", result: "info" },
      { action: "Identified correlated risk: supply chain + weather on 2 projects", time: "1d ago", result: "warning" },
    ],
    workflows: [
      { name: "Portfolio Risk Scoring", frequency: "Every 3 min", status: "active" },
      { name: "Predictive Delay Analysis", frequency: "Every 30 min", status: "active" },
      { name: "Cross-Project Correlation", frequency: "Every 2 hours", status: "active" },
      { name: "Weekly Risk Report", frequency: "Monday 6:00 AM", status: "active" },
    ],
  },
  {
    id: "procurement", name: "Procurement Agent", domain: "Supply Chain",
    icon: Truck, status: "idle", lastRun: "8m ago", cycleTime: "20 min",
    tasksCompleted: 589, tasksQueued: 0, accuracy: "98.9%",
    description: "Tracks material orders, monitors vendor performance, detects supply chain disruptions, and optimizes procurement timing to avoid project delays.",
    recentActions: [
      { action: "Tracked steel shipment for Riverside — ETA April 10 (5-day delay)", time: "4h ago", result: "warning" },
      { action: "Verified concrete delivery schedule for The Plumber — on track", time: "12h ago", result: "success" },
      { action: "Scored vendor performance: Top 3 rated, 1 flagged for review", time: "1d ago", result: "info" },
      { action: "Pre-ordered MEP materials for Hauppauge — locked pricing", time: "2d ago", result: "success" },
    ],
    workflows: [
      { name: "Order Tracking Sync", frequency: "Every 20 min", status: "active" },
      { name: "Vendor Performance Rating", frequency: "Weekly", status: "active" },
      { name: "Price Lock Alerts", frequency: "Daily 9:00 AM", status: "active" },
      { name: "Supply Chain Risk Monitor", frequency: "Every 4 hours", status: "paused" },
    ],
  },
];

function AgentStatusPulse({ status }: { status: Agent["status"] }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === "running" && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-healthy opacity-50" />
      )}
      <span className={cn("relative inline-flex rounded-full h-2.5 w-2.5", {
        "bg-status-healthy": status === "running",
        "bg-muted-foreground/40": status === "idle",
        "bg-status-warning": status === "alert",
      })} />
    </span>
  );
}

function CycleIndicator() {
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setRotation(r => r + 3), 50);
    return () => clearInterval(interval);
  }, []);
  return (
    <RotateCw className="w-3 h-3 text-primary" style={{ transform: `rotate(${rotation}deg)` }} />
  );
}

export function AgentsView() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [liveTicks, setLiveTicks] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setLiveTicks(t => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  const selected = agents.find(a => a.id === selectedAgent);

  const totalTasks = agents.reduce((s, a) => s + a.tasksCompleted, 0);
  const activeCount = agents.filter(a => a.status === "running").length;
  const totalWorkflows = agents.reduce((s, a) => s + a.workflows.filter(w => w.status === "active").length, 0);

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" />
            AI Agents
          </h1>
          <p className="text-sm text-muted-foreground">Autonomous agents running organizational workflows in continuous loops</p>
        </div>
        <div className="flex items-center gap-2">
          <CycleIndicator />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Agent metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="metric-label">Active Agents</p>
          <p className="metric-value mt-1">{activeCount}<span className="text-sm text-muted-foreground font-normal">/{agents.length}</span></p>
        </Card>
        <Card className="p-4">
          <p className="metric-label">Tasks Completed</p>
          <p className="metric-value mt-1">{totalTasks.toLocaleString()}</p>
          <p className="text-xs text-status-healthy mt-1">+{12 + (liveTicks % 5)} today</p>
        </Card>
        <Card className="p-4">
          <p className="metric-label">Active Workflows</p>
          <p className="metric-value mt-1">{totalWorkflows}</p>
          <p className="text-xs text-muted-foreground mt-1">across all agents</p>
        </Card>
        <Card className="p-4">
          <p className="metric-label">Avg Accuracy</p>
          <p className="metric-value mt-1">98.8%</p>
          <p className="text-xs text-status-healthy mt-1">↑ 0.3% this week</p>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Agent list */}
        <div className="space-y-2">
          {agents.map(agent => (
            <Card
              key={agent.id}
              className={cn(
                "p-4 cursor-pointer transition-all hover:border-primary/30",
                selectedAgent === agent.id && "border-primary/50 bg-accent/50"
              )}
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                  agent.status === "running" ? "bg-primary/10" :
                  agent.status === "alert" ? "bg-status-warning/10" : "bg-muted"
                )}>
                  <agent.icon className={cn("w-4 h-4", {
                    "text-primary": agent.status === "running",
                    "text-status-warning": agent.status === "alert",
                    "text-muted-foreground": agent.status === "idle",
                  })} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{agent.name}</p>
                    <AgentStatusPulse status={agent.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.domain}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <RotateCw className="w-2.5 h-2.5" /> {agent.cycleTime}
                    </span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5" /> {agent.tasksCompleted} tasks
                    </span>
                    {agent.tasksQueued > 0 && (
                      <span className="text-[10px] text-status-info flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {agent.tasksQueued} queued
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Agent detail */}
        <div className="col-span-2 space-y-4">
          {selected ? (
            <>
              {/* Agent overview */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                      <selected.icon className="w-4 h-4 text-primary" />
                      {selected.name}
                      <Badge variant={selected.status === "running" ? "healthy" : selected.status === "alert" ? "warning" : "secondary"} className="text-[10px]">
                        {selected.status === "running" ? "Running" : selected.status === "alert" ? "Attention" : "Idle"}
                      </Badge>
                    </CardTitle>
                    <span className="text-xs text-muted-foreground">Last cycle: {selected.lastRun}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Cycle Time</p>
                      <p className="text-sm font-medium text-foreground mt-0.5 flex items-center gap-1">
                        <CycleIndicator /> {selected.cycleTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Accuracy</p>
                      <p className="text-sm font-medium text-status-healthy mt-0.5">{selected.accuracy}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tasks Today</p>
                      <p className="text-sm font-medium text-foreground mt-0.5">{selected.tasksCompleted.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Automated Workflows */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                    <RotateCw className="w-3.5 h-3.5 text-primary" />
                    Automated Workflows
                    <span className="text-xs text-muted-foreground font-normal">· running in loop</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-0">
                  {selected.workflows.map((w, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                      <div className="flex items-center gap-2">
                        <span className={cn("w-1.5 h-1.5 rounded-full", w.status === "active" ? "bg-status-healthy" : "bg-muted-foreground/30")} />
                        <span className="text-sm text-foreground">{w.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{w.frequency}</span>
                        {w.status === "active" && <CycleIndicator />}
                        {w.status === "paused" && <Badge variant="secondary" className="text-[10px]">Paused</Badge>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    Recent Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-0">
                  {selected.recentActions.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
                      {a.result === "success" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-status-healthy mt-0.5 shrink-0" />
                      ) : a.result === "warning" ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-status-warning mt-0.5 shrink-0" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground leading-snug">{a.action}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="p-12 flex flex-col items-center justify-center text-center">
              <BrainCircuit className="w-10 h-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">Select a Jack agent to view its workflows, actions, and performance</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
