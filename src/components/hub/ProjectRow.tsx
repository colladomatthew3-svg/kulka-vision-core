import { StatusIndicator } from "./StatusIndicator";
import { cn } from "@/lib/utils";

interface ProjectRowProps {
  name: string;
  type: string;
  status: "healthy" | "warning" | "critical";
  budget: string;
  completion: number;
  onClick?: () => void;
  className?: string;
}

export function ProjectRow({ name, type, status, budget, completion, onClick, className }: ProjectRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 py-3 px-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer rounded-md",
        className
      )}
      onClick={onClick}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{type}</p>
      </div>
      <StatusIndicator status={status} />
      <div className="text-right w-20">
        <p className="text-sm font-medium text-foreground">{budget}</p>
        <p className="text-xs text-muted-foreground">budget</p>
      </div>
      <div className="w-24">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", {
                "bg-status-healthy": status === "healthy",
                "bg-status-warning": status === "warning",
                "bg-status-critical": status === "critical",
              })}
              style={{ width: `${completion}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground w-8 text-right">{completion}%</span>
        </div>
      </div>
    </div>
  );
}
