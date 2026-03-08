import React, { useState } from "react";
import { ProjectOverview } from "./ProjectOverview";
import { ProjectTaskList } from "./ProjectTaskList";
import { TeamSidebar } from "./TeamSidebar";

export const ProjectWorkspace = ({
  tasks,
  project,
  doneTasksCount,
  activeTasksCount,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <div className="flex items-center gap-6 border-b border-slate-200 mb-8">
        {[
          { id: "overview", label: "Overview" },
          { id: "tasks", label: `Tasks (${tasks.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-bold capitalize relative transition-colors ${
              activeTab === tab.id
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === "overview" ? (
            <ProjectOverview
              tasks={tasks}
              project={project}
              doneTasksCount={doneTasksCount}
              activeTasksCount={activeTasksCount}
            />
          ) : (
            <ProjectTaskList tasks={tasks} />
          )}
        </div>

        <TeamSidebar projectData={project} />
      </div>
    </>
  );
};
