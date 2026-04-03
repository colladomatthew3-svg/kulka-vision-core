import { cn } from "@/lib/utils";

interface MiniChartProps {
  data: number[];
  color?: string;
  className?: string;
}

export function MiniChart({ data, color = "text-primary", className }: MiniChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 80 - 10;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox="0 0 100 100" className={cn("w-full h-12", className)} preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
