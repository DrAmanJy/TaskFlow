import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";
import { Loader2, AlertCircle } from "lucide-react";

import { ProjectDetailHeader } from "../components/project/ProjectDetailHeader";
import { ProjectWorkspace } from "../components/project/ProjectWorkspace";
import { ProjectNavBar } from "../components/project/ProjectNavBar";

import ProjectForm from "../components/ui/ProjectForm";
import TaskForm from "../components/ui/TaskForm";

export default function SingleProjectPage() {
  const { projectId } = useParams();
  const {
    projects,
    status: projectStatus,
    deleteProject,
    findProjectById,
  } = useProjects();
  const { tasks, findProjectTask } = useTask();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // 1. DERIVED STATE: Always sync with the global 'cache'
  const project = projects.find((p) => p.id === projectId);

  // 2. SMART INITIALIZATION LOGIC
  useEffect(() => {
    const initialize = async () => {
      // If global projects are loading for the first time, wait for them.
      if (projectStatus.loading && projects.length === 0) return;

      if (project) {
        // Project exists in state -> Sync tasks only
        findProjectTask(projectId);
      } else if (!projectStatus.loading && projectId) {
        // Global load finished and project is STILL missing -> Fetch specific project
        await findProjectById(projectId);
      }
    };

    initialize();
  }, [projectId, project?.id, projectStatus.loading]);

  // 3. UI LOADING & ERROR STATES
  if (projectStatus.loading && !project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
          Syncing MythCraft Data...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500 px-6 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Project Not Found
        </h2>
        <p className="max-w-xs text-sm text-slate-500">
          This project doesn't exist or you don't have access to it anymore.
        </p>
        <Link
          to="/projects"
          className="mt-8 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Helper Logic
  const doneTasksCount = tasks.filter((t) => t.status === "done").length;
  const activeTasksCount = tasks.filter((t) => t.status !== "done").length;
  const progress =
    tasks.length > 0 ? Math.round((doneTasksCount / tasks.length) * 100) : 0;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleCloseTaskForm = () => {
    setEditingTask(null);
    setShowTaskForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 text-slate-900 animate-in fade-in duration-500">
      {/* Modals */}
      {showProjectForm && (
        <ProjectForm
          onClose={() => setShowProjectForm(false)}
          existingProject={project}
        />
      )}
      {showTaskForm && (
        <TaskForm
          onClose={handleCloseTaskForm}
          projectId={project.id}
          existingTask={editingTask}
        />
      )}

      <ProjectNavBar
        project={project}
        onEdit={() => setShowProjectForm(true)}
        onDelete={() => deleteProject(project.id)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectDetailHeader
          projectData={project}
          formatDate={formatDate}
          calculateProgress={() => progress}
          projectTasks={tasks}
          onAddTask={() => setShowTaskForm(true)}
        />

        <ProjectWorkspace
          tasks={tasks}
          project={project}
          doneTasksCount={doneTasksCount}
          activeTasksCount={activeTasksCount}
        />
      </main>
    </div>
  );
}
