import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/hub/MetricCard";
import { ProjectRow } from "@/components/hub/ProjectRow";
import { AlertItem } from "@/components/hub/AlertItem";
import { MiniChart } from "@/components/hub/MiniChart";
import { Badge } from "@/components/ui/badge";

interface DashboardViewProps {
  onProjectClick: (id: string) => void;
}

const projects = [
  { id: "1", name: "The Plumber — Mixed Use", type: "Commercial / Retail", status: "healthy" as const, budget: "$24.5M", completion: 72 },
  { id: "2", name: "Riverside Self-Storage", type: "Self-Storage", status: "warning" as const, budget: "$8.2M", completion: 45 },
  { id: "3", name: "Hauppauge Industrial Campus", type: "Industrial", status: "healthy" as const, budget: "$15.8M", completion: 88 },
  { id: "4", name: "Smithtown Medical Office", type: "Healthcare", status: "critical" as const, budget: "$12.1M", completion: 31 },
  { id: "5", name: "Commack Retail Center", type: "Retail", status: "healthy" as const, budget: "$6.4M", completion: 95 },
];

const alerts = [
  { severity: "critical" as const, title: "Permit delay on Smithtown Medical — estimated 2-week impact", project: "Smithtown Medical Office", time: "2h ago" },
  { severity: "warning" as const, title: "Steel delivery delayed — subcontractor rescheduling", project: "Riverside Self-Storage", time: "4h ago" },
  { severity: "warning" as const, title: "Budget variance exceeding 8% threshold", project: "The Plumber — Mixed Use", time: "6h ago" },
];

const priorities = [
  "Review revised timeline for Smithtown Medical permit resubmission",
  "Approve change order #47 for The Plumber electrical scope",
  "Sign off on Commack Retail punch list for close-out",
];

export function DashboardView({ onProjectClick }: DashboardViewProps) {
  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Good morning, Devin</h1>
          <p className="text-sm text-muted-foreground">Thursday, April 3, 2026 — 5 active projects</p>
        </div>
        <Badge variant="warning" className="text-xs">2 items need attention</Badge>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="Active Projects" value="5" change="1 closing this month" trend="neutral" />
        <MetricCard label="Total Portfolio" value="$67.0M" change="+12% YoY" trend="up" />
        <MetricCard label="Avg. Completion" value="66%" change="+4% this week" trend="up" />
        <MetricCard label="Open Risks" value="3" change="+1 from yesterday" trend="down" />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Projects list - 2 columns */}
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-foreground">Active Projects</CardTitle>
              <span className="text-xs text-muted-foreground">5 projects · ~1M sqft</span>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {projects.map((p) => (
              <ProjectRow
                key={p.id}
                {...p}
                onClick={() => onProjectClick(p.id)}
              />
            ))}
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="space-y-4">
          {/* Alerts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground">Active Risks</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {alerts.map((a, i) => (
                <AlertItem key={i} {...a} />
              ))}
            </CardContent>
          </Card>

          {/* Today's Priorities */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground">Today's Priorities</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {priorities.map((p, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5">
                  <span className="w-5 h-5 rounded bg-accent flex items-center justify-center text-[10px] font-medium text-muted-foreground shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground leading-snug">{p}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Revenue trend */}
          <Card className="p-4">
            <p className="metric-label">Monthly Revenue Trend</p>
            <MiniChart data={[2.1, 2.4, 2.2, 3.1, 2.8, 3.5, 3.2, 4.1, 3.8, 4.5, 4.2, 4.8]} className="mt-2" />
          </Card>
        </div>
      </div>
    </div>
  );
}
