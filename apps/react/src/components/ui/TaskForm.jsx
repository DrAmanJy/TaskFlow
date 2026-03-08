import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useTask } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

export default function TaskForm({ onClose, projectId, existingTask = null }) {
  const { createTask, updateTask, status: taskStatus } = useTask();
  const { projects } = useProjects();

  const isEditMode = Boolean(existingTask);

  const isBusy = isEditMode
    ? taskStatus.updating === existingTask.id
    : taskStatus.submitting;

  const [formData, setFormData] = useState({
    projectId: projectId || existingTask?.project?.id || "",
    title: existingTask?.title || "",
    description: existingTask?.description || "",
    status: existingTask?.status || "todo",
    priority: existingTask?.priority || "Low",
    assignee: existingTask?.assignee?.id || "",
  });

  const selectedProject = projects.find((p) => p.id === formData.projectId);
  const activeTeam = selectedProject?.team || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return;

    let success = false;
    if (isEditMode) {
      success = await updateTask(existingTask.id, formData);
    } else {
      success = await createTask(formData);
    }

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {isEditMode ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Project Selection (Visible only when creating a task globally) */}
          {!projectId && !isEditMode && (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Project
              </label>
              <select
                name="projectId"
                required
                disabled={isBusy}
                value={formData.projectId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="">-- Select Project --</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Task Title */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Task Title
            </label>
            <input
              name="title"
              required
              disabled={isBusy}
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
              placeholder="e.g., Update Minecraft server icons"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              disabled={isBusy}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
              placeholder="Add details about this task..."
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Status Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Status
              </label>
              <select
                name="status"
                disabled={isBusy}
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Assignee Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Assign To
              </label>
              <select
                name="assignee"
                disabled={isBusy}
                value={formData.assignee}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              >
                <option value="">Unassigned</option>
                {selectedProject?.createdBy && (
                  <option value={selectedProject.createdBy.id}>
                    {selectedProject.createdBy.fullName} (Owner)
                  </option>
                )}
                {activeTeam.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority Toggle */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Priority
            </label>
            <div className="flex bg-slate-50 border border-slate-200 rounded-lg p-1">
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  type="button"
                  disabled={isBusy}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, priority: p }))
                  }
                  className={`flex-1 py-1.5 text-xs font-extrabold rounded-md transition-all ${
                    formData.priority === p
                      ? "bg-white shadow-sm border border-slate-200 text-indigo-600"
                      : "text-slate-500"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isBusy}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isBusy}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-70 transition-all active:scale-95"
            >
              {isBusy ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : isEditMode ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
