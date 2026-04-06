import { cn } from "@/lib/utils";
import { LayoutDashboard, FolderKanban, AlertTriangle, Calendar, Command, BrainCircuit } from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "agents", label: "Jack", icon: BrainCircuit },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "alerts", label: "Alerts & Risks", icon: AlertTriangle },
  { id: "briefing", label: "Briefing", icon: Calendar },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-56 h-screen bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
            <Command className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground tracking-tight">Kulka</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Operating System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeView === item.id
                ? "bg-sidebar-accent text-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
            DK
          </div>
          <div>
            <p className="text-xs font-medium text-foreground">Devin Kulka</p>
            <p className="text-[10px] text-muted-foreground">CEO</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
