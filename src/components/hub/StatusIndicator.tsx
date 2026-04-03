import { cn } from "@/lib/utils";

type Status = "healthy" | "warning" | "critical";

interface StatusIndicatorProps {
  status: Status;
  label?: string;
  className?: string;
}

const statusConfig: Record<Status, { dot: string; text: string; label: string }> = {
  healthy: { dot: "status-dot-healthy", text: "text-status-healthy", label: "On Track" },
  warning: { dot: "status-dot-warning", text: "text-status-warning", label: "At Risk" },
  critical: { dot: "status-dot-critical", text: "text-status-critical", label: "Critical" },
};

export function StatusIndicator({ status, label, className }: StatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("status-dot", config.dot)} />
      <span className={cn("text-xs font-medium", config.text)}>
        {label || config.label}
      </span>
    </div>
  );
}
