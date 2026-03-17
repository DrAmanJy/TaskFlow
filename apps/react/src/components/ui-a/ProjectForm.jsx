import React from "react";
import { Layout, Server, Store, Folder, X, Loader2, Save } from "lucide-react";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectContext";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { iconOptions } from "../../constants/iconOptions";

const projectSchema = z.object({
  title: z
    .string()
    .refine((val) => val !== "", { error: "Title is required" })
    .min(3, { error: "Title must be at least 3 characters" }),
  description: z
    .string()
    .max(128, { error: "Description cannot exceed 128 characters" })
    .optional(),
  status: z.enum(["todo", "in-progress", "completed"], {
    error: "Status is required",
  }),
  icon: z.string().refine((val) => val !== "", { error: "Icon is required" }),
});

export default function ProjectForm({ onClose, existingProject = null }) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { createProject, updateProject, status } = useProjects();
  const isEditMode = Boolean(existingProject);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: existingProject?.title || "",
      description: existingProject?.description || "",
      status: existingProject?.status || "todo",
      icon: existingProject?.icon || "layout",
    },
  });

  const isBusy = isEditMode
    ? status.updating === existingProject.id
    : status.submitting;

  const isActiveIcon = useWatch({ control, name: "icon" });

  const onSubmit = async (data) => {
    const success = isEditMode
      ? await updateProject(existingProject.id, data)
      : await createProject(data);

    if (success) {
      onClose();
      return;
    }
    toast.error(
      isEditMode
        ? "Failed to save project changes"
        : "Failed to create project",
    );
  };

  if (isAuthLoading) return null;

  if (!isAuthenticated) {
    toast.error("Please login before saving the project");
    return <Navigate to={"/auth?mode=login"} replace />;
  }
  console.log(errors);
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 flex flex-col gap-6"
        >
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
              disabled={isBusy}
              placeholder="e.g. NexusWork Redesign"
              {...register("title")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-800 disabled:opacity-50"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
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
              {...register("description")}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-slate-800 resize-none disabled:opacity-50"
            ></textarea>
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
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
                {...register("status")}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-slate-800 cursor-pointer disabled:opacity-50"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              {errors.status && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.status.message}
                </p>
              )}
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
                isActiveIcon === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isBusy}
                    onClick={() => setValue("icon", option.id)}
                    className={`flex flex-col items-center justify-center gap-2 py-3 px-2 border-2 rounded-xl transition-all ${
                      isActiveIcon === option.id
                        ? option.activeClass
                        : "border-slate-100 bg-white text-slate-500 hover:bg-slate-50"
                    } disabled:opacity-50`}
                  >
                    <IconComponent
                      className="w-6 h-6"
                      strokeWidth={isActiveIcon === option.id ? 2.5 : 2}
                    />
                    <span className="text-xs font-bold">{option.label}</span>
                  </button>
                );
              })}
            </div>
            {errors.icon && (
              <p className="text-xs text-red-500 mt-1">{errors.icon.message}</p>
            )}
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
              disabled={isBusy || isSubmitting}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-70 transition-all active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {isEditMode ? "Saving Changes" : "Creating Project"}
                  </span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditMode ? "Save Changes" : "Create Project"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
