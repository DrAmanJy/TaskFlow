import React, { useState } from "react";
import { Layout, Server, Store, Folder, X, Loader2 } from "lucide-react";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";

export default function ProjectForm({ onClose, existingProject = null }) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { createProject, updateProject, status } = useProjects();
  const isEditMode = Boolean(existingProject);

  const isBusy = isEditMode
    ? status.updating === existingProject.id
    : status.submitting;

  const [formData, setFormData] = useState({
    title: existingProject?.title || "",
    description: existingProject?.description || "",
    status: existingProject?.status || "todo",
    icon: existingProject?.icon || "layout",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIconSelect = (iconName) => {
    setFormData((prev) => ({ ...prev, icon: iconName }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isBusy) return;

    const success = isEditMode
      ? await updateProject(existingProject.id, formData)
      : await createProject(formData);

    if (success) {
      onClose();
    }
  };

  const iconOptions = [
    {
      id: "layout",
      icon: Layout,
      label: "UI / Web",
      activeClass: "border-indigo-500 bg-indigo-50 text-indigo-600",
    },
    {
      id: "server",
      icon: Server,
      label: "Backend",
      activeClass: "border-emerald-500 bg-emerald-50 text-emerald-600",
    },
    {
      id: "store",
      icon: Store,
      label: "Commerce",
      activeClass: "border-orange-500 bg-orange-50 text-orange-600",
    },
    {
      id: "folder",
      icon: Folder,
      label: "Other",
      activeClass: "border-slate-500 bg-slate-100 text-slate-700",
    },
  ];

  if (isAuthLoading) return null;

  if (!isAuthenticated) {
    toast.error("Please login before saving the project");
    return <Navigate to={"/auth?mode=login"} replace />;
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {isEditMode ? "Edit Project" : "Create New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          {/* Project Name */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-bold text-slate-700 mb-1.5"
            >
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              disabled={isBusy}
              placeholder="e.g. NexusWork Redesign"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-800 disabled:opacity-50"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-bold text-slate-700 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              disabled={isBusy}
              placeholder="Briefly describe the goal..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-800 resize-none disabled:opacity-50"
            ></textarea>
          </div>

          {/* Status Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                {isEditMode ? "Status" : "Initial Status"}
              </label>
              <select
                id="status"
                name="status"
                disabled={isBusy}
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-800 cursor-pointer disabled:opacity-50"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Project Icon
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {iconOptions.map((option) => {
                const IconComponent = option.icon;
                const isActive = formData.icon === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleIconSelect(option.id)}
                    className={`flex flex-col items-center justify-center gap-2 py-3 px-2 border-2 rounded-xl transition-all ${
                      isActive
                        ? option.activeClass
                        : "border-slate-100 bg-white text-slate-500 hover:bg-slate-50"
                    } disabled:opacity-50`}
                  >
                    <IconComponent
                      className="w-6 h-6"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="text-xs font-bold">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isBusy}
              className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isBusy}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-70 transition-all active:scale-95"
            >
              {isBusy ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
