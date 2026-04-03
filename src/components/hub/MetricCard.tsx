import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({ label, value, change, trend, className }: MetricCardProps) {
  return (
    <Card className={cn("p-4 fade-in", className)}>
      <p className="metric-label">{label}</p>
      <p className="metric-value mt-1">{value}</p>
      {change && (
        <p className={cn("text-xs mt-1 font-medium", {
          "text-status-healthy": trend === "up",
          "text-status-critical": trend === "down",
          "text-muted-foreground": trend === "neutral",
        })}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
        </p>
      )}
    </Card>
  );
}
