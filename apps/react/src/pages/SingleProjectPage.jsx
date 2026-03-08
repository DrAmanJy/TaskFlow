import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";

import { ProjectDetailHeader } from "../components/project/ProjectDetailHeader";
import { ProjectWorkspace } from "../components/project/ProjectWorkspace";
import { ProjectNavBar } from "../components/project/ProjectNavBar";

import ProjectForm from "../components/ui/ProjectForm";
import TaskForm from "../components/ui/TaskForm";

export default function SingleProjectPage() {
  const { projectId } = useParams();
  const { projects, status: projectStatus, deleteProject } = useProjects();
  const { tasks, findProjectTask } = useTask();

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const project = projects.find((p) => p.id === projectId);

  useEffect(() => {
    if (project?.id) {
      findProjectTask(project.id);
    }
  }, [project?.id]);

  if (projectStatus.loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Project Not Found
        </h2>
        <p>This project may have been deleted or does not exist.</p>
      </div>
    );
  }

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
    <div className="min-h-screen bg-slate-50 font-sans pb-20 text-slate-900">
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
