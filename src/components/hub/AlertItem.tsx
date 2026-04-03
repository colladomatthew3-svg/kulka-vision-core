import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Severity = "critical" | "warning" | "healthy";

interface AlertItemProps {
  severity: Severity;
  title: string;
  project: string;
  time: string;
  className?: string;
}

export function AlertItem({ severity, title, project, time, className }: AlertItemProps) {
  return (
    <div className={cn("flex items-start gap-3 py-3 border-b border-border last:border-0", className)}>
      <span className={cn("status-dot mt-1.5 shrink-0", {
        "status-dot-critical": severity === "critical",
        "status-dot-warning": severity === "warning",
        "status-dot-healthy": severity === "healthy",
      })} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-snug">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{project}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Badge variant={severity}>{severity}</Badge>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  );
}
