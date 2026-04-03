import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIndicator } from "@/components/hub/StatusIndicator";
import { Badge } from "@/components/ui/badge";
import { MiniChart } from "@/components/hub/MiniChart";
import { AlertItem } from "@/components/hub/AlertItem";
import { ArrowLeft } from "lucide-react";

interface ProjectViewProps {
  projectId: string;
  onBack: () => void;
}

const projectData: Record<string, {
  name: string; type: string; status: "healthy" | "warning" | "critical";
  budget: string; spent: string; completion: number; startDate: string; endDate: string;
  sqft: string; insights: string[]; risks: { severity: "critical" | "warning" | "healthy"; title: string; time: string }[];
  milestones: { name: string; status: "done" | "active" | "upcoming" }[];
}> = {
  "1": {
    name: "The Plumber — Mixed Use", type: "Commercial / Retail", status: "healthy",
    budget: "$24.5M", spent: "$17.6M", completion: 72, startDate: "Mar 2025", endDate: "Nov 2026",
    sqft: "185,000", insights: [
      "Electrical scope change may add $180K — review CO #47",
      "Concrete pour ahead of schedule by 3 days",
      "Tenant fit-out timeline aligns with projected delivery",
    ],
    risks: [
      { severity: "warning", title: "Budget variance at 8.2% — approaching threshold", time: "6h ago" },
    ],
    milestones: [
      { name: "Foundation", status: "done" }, { name: "Structural", status: "done" },
      { name: "MEP Rough-in", status: "active" }, { name: "Enclosure", status: "upcoming" },
      { name: "Fit-out", status: "upcoming" }, { name: "Close-out", status: "upcoming" },
    ],
  },
  "4": {
    name: "Smithtown Medical Office", type: "Healthcare", status: "critical",
    budget: "$12.1M", spent: "$3.8M", completion: 31, startDate: "Jan 2026", endDate: "Feb 2027",
    sqft: "45,000", insights: [
      "Permit resubmission required — estimated 2-week delay",
      "Foundation work paused pending approval",
      "Consider expedited review process to recover timeline",
    ],
    risks: [
      { severity: "critical", title: "Permit delay — resubmission pending town review", time: "2h ago" },
      { severity: "warning", title: "Foundation crew idle — cost impact ~$25K/week", time: "1d ago" },
    ],
    milestones: [
      { name: "Site Prep", status: "done" }, { name: "Foundation", status: "active" },
      { name: "Structural", status: "upcoming" }, { name: "MEP", status: "upcoming" },
      { name: "Interior", status: "upcoming" }, { name: "Close-out", status: "upcoming" },
    ],
  },
};

const defaultProject = {
  name: "Project", type: "Construction", status: "healthy" as const,
  budget: "$10M", spent: "$5M", completion: 50, startDate: "2025", endDate: "2026",
  sqft: "50,000", insights: ["No new insights"], risks: [], milestones: [],
};

export function ProjectView({ projectId, onBack }: ProjectViewProps) {
  const project = projectData[projectId] || defaultProject;
  const budgetPct = Math.round((parseFloat(project.spent.replace(/[$M,]/g, '')) / parseFloat(project.budget.replace(/[$M,]/g, ''))) * 100);

  return (
    <div className="space-y-6 fade-in">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">{project.name}</h1>
          <p className="text-sm text-muted-foreground">{project.type} · {project.sqft} sqft</p>
        </div>
        <StatusIndicator status={project.status} />
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="metric-label">Budget</p>
          <p className="metric-value mt-1">{project.budget}</p>
          <p className="text-xs text-muted-foreground mt-1">{project.spent} spent ({budgetPct}%)</p>
        </Card>
        <Card className="p-4">
          <p className="metric-label">Completion</p>
          <p className="metric-value mt-1">{project.completion}%</p>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${project.completion}%` }} />
          </div>
        </Card>
        <Card className="p-4">
          <p className="metric-label">Timeline</p>
          <p className="text-sm font-medium text-foreground mt-1">{project.startDate}</p>
          <p className="text-xs text-muted-foreground">→ {project.endDate}</p>
        </Card>
        <Card className="p-4">
          <p className="metric-label">Cost Trend</p>
          <MiniChart data={[1.2, 1.8, 2.5, 3.1, 3.8, 4.2, 5.1]} className="mt-1" />
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* AI Insights */}
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-glow" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {project.insights.map((insight, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <span className="text-xs text-muted-foreground mt-0.5 shrink-0">#{i + 1}</span>
                <p className="text-sm text-foreground leading-relaxed">{insight}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Milestones */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">Milestones</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {project.milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  m.status === "done" ? "bg-status-healthy" :
                  m.status === "active" ? "bg-primary pulse-glow" :
                  "bg-muted-foreground/30"
                }`} />
                <span className={`text-sm ${
                  m.status === "done" ? "text-muted-foreground line-through" :
                  m.status === "active" ? "text-foreground font-medium" :
                  "text-muted-foreground"
                }`}>{m.name}</span>
                {m.status === "active" && <Badge variant="default" className="text-[10px] ml-auto">In Progress</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Risks */}
      {project.risks.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">Active Risks</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {project.risks.map((r, i) => (
              <AlertItem key={i} severity={r.severity} title={r.title} project={project.name} time={r.time} />
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
