import { useState } from "react";
import { Sidebar } from "@/components/hub/Sidebar";
import { DashboardView } from "@/components/hub/DashboardView";
import { ProjectView } from "@/components/hub/ProjectView";
import { AlertsView } from "@/components/hub/AlertsView";
import { BriefingView } from "@/components/hub/BriefingView";
import { AgentsView } from "@/components/hub/AgentsView";
import { JackChat } from "@/components/hub/JackChat";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const handleNavigate = (view: string) => {
    setActiveView(view);
    setSelectedProject(null);
  };

  const handleProjectClick = (id: string) => {
    setSelectedProject(id);
    setActiveView("projects");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          {activeView === "dashboard" && (
            <DashboardView onProjectClick={handleProjectClick} />
          )}
          {activeView === "agents" && <AgentsView />}
          {activeView === "projects" && selectedProject && (
            <ProjectView projectId={selectedProject} onBack={() => handleNavigate("dashboard")} />
          )}
          {activeView === "projects" && !selectedProject && (
            <DashboardView onProjectClick={handleProjectClick} />
          )}
          {activeView === "alerts" && <AlertsView />}
          {activeView === "briefing" && <BriefingView />}
        </div>
      </main>
      <JackChat />
    </div>
  );
};

export default Index;
