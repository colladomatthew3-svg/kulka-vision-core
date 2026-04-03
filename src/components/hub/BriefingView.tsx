import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/hub/StatusIndicator";

const updates = [
  { project: "The Plumber — Mixed Use", update: "MEP rough-in 72% complete. Electrical CO #47 pending approval ($180K). Concrete pour ahead by 3 days.", status: "healthy" as const },
  { project: "Smithtown Medical Office", update: "Permit resubmission filed. Foundation crew idle — estimated $25K/week hold cost. Town review expected within 2 weeks.", status: "critical" as const },
  { project: "Riverside Self-Storage", update: "Steel delivery rescheduled to April 10. Structural work paused on Building C. Interior framing continues on A & B.", status: "warning" as const },
  { project: "Hauppauge Industrial Campus", update: "Roof installation complete and under budget. Final MEP connections underway. On track for June handover.", status: "healthy" as const },
  { project: "Commack Retail Center", update: "Punch list approved. Final inspections scheduled for next week. Tenant move-in coordination started.", status: "healthy" as const },
];

const decisions = [
  { text: "Approve change order #47 for The Plumber electrical scope — $180K impact", priority: "high" },
  { text: "Decide on expedited permit review for Smithtown Medical — $2,500 fee", priority: "high" },
  { text: "Sign off on Commack Retail close-out documentation", priority: "medium" },
  { text: "Review revised Riverside Self-Storage timeline from PM", priority: "medium" },
];

export function BriefingView() {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Executive Briefing</h1>
          <p className="text-sm text-muted-foreground">Thursday, April 3, 2026</p>
        </div>
        <Badge variant="secondary" className="text-xs">Daily Brief</Badge>
      </div>

      {/* Summary */}
      <Card className="border-l-2 border-l-primary">
        <CardContent className="pt-4">
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-medium">Portfolio Summary:</span> 5 active projects totaling $67M. 
            One critical issue on Smithtown Medical (permit delay). Two warnings across Riverside and The Plumber. 
            Commack Retail nearing close-out. Overall portfolio health is stable with 66% average completion.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        {/* Project Updates */}
        <Card className="col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">Project Updates</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-0">
            {updates.map((u, i) => (
              <div key={i} className="py-3 border-b border-border last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{u.project}</p>
                  <StatusIndicator status={u.status} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{u.update}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Decisions Required */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">Decisions Required</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-0">
            {decisions.map((d, i) => (
              <div key={i} className="py-3 border-b border-border last:border-0 flex items-start gap-2">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  d.priority === "high" ? "bg-status-warning" : "bg-muted-foreground/40"
                }`} />
                <p className="text-sm text-foreground leading-snug">{d.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
