import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertItem } from "@/components/hub/AlertItem";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

const allAlerts = [
  { severity: "critical" as const, title: "Permit delay on Smithtown Medical — estimated 2-week impact on foundation schedule", project: "Smithtown Medical Office", time: "2h ago" },
  { severity: "critical" as const, title: "Foundation crew idle — cost impact ~$25K/week while awaiting permit", project: "Smithtown Medical Office", time: "1d ago" },
  { severity: "warning" as const, title: "Steel delivery delayed 5 days — subcontractor rescheduling required", project: "Riverside Self-Storage", time: "4h ago" },
  { severity: "warning" as const, title: "Budget variance exceeding 8% threshold — review change orders", project: "The Plumber — Mixed Use", time: "6h ago" },
  { severity: "warning" as const, title: "Inspection rescheduled — new date pending confirmation", project: "Riverside Self-Storage", time: "1d ago" },
  { severity: "healthy" as const, title: "Concrete pour completed ahead of schedule", project: "The Plumber — Mixed Use", time: "8h ago" },
  { severity: "healthy" as const, title: "Final punch list approved — ready for close-out", project: "Commack Retail Center", time: "12h ago" },
  { severity: "healthy" as const, title: "Roof installation completed — under budget by 3%", project: "Hauppauge Industrial Campus", time: "1d ago" },
];

type Filter = "all" | "critical" | "warning" | "healthy";

export function AlertsView() {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered = filter === "all" ? allAlerts : allAlerts.filter(a => a.severity === filter);

  const counts = {
    all: allAlerts.length,
    critical: allAlerts.filter(a => a.severity === "critical").length,
    warning: allAlerts.filter(a => a.severity === "warning").length,
    healthy: allAlerts.filter(a => a.severity === "healthy").length,
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Alerts & Risks</h1>
        <p className="text-sm text-muted-foreground">Real-time issues across all projects</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2">
        {(["all", "critical", "warning", "healthy"] as Filter[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize",
              filter === f ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-4">
          {filtered.map((a, i) => (
            <AlertItem key={i} {...a} />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground py-8 text-center">No alerts in this category</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
