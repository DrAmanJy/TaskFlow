import React from "react";
import { X, Loader2 } from "lucide-react";
import { useTask } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";

const taskSchema = z.object({
  projectId: z.string().min(1, "Project is required"),

  title: z
    .string()
    .refine((val) => val !== "", { error: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .max(30, "Title cannot exceed 30 characters"),

  description: z
    .string()
    .refine((val) => val !== "", { error: "Description is required" })
    .min(3, "Description must be at least 3 characters")
    .max(128, "Description cannot exceed 128 characters"),

  status: z.enum(["todo", "in-progress", "done"], {
    error: "Status is required",
  }),

  priority: z.enum(["Low", "Medium", "High"], {
    error: "Priority is required",
  }),

  assignee: z
    .uuid("Invalid id")
    .refine((val) => val !== "", { error: "assignee is required" }),
});

export default function TaskForm({ onClose, projectId, existingTask = null }) {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      projectId: projectId || existingTask?.project?.id || "",
      title: existingTask?.title || "",
      description: existingTask?.description || "",
      status: existingTask?.status || "todo",
      priority: existingTask?.priority || "Low",
      assignee: existingTask?.assignee?.id || "",
    },
  });
  console.log(errors);
  const { createTask, updateTask, status: taskStatus } = useTask();
  const { projects } = useProjects();

  const isEditMode = Boolean(existingTask);
  const isBusy = isEditMode
    ? taskStatus.updating === existingTask.id
    : taskStatus.submitting;

  const priority = useWatch({ control, name: "priority" });
  const selectedProjectId = useWatch({ control, name: "projectId" });

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const activeTeam = selectedProject?.team || [];

  const onSubmit = async (data) => {
    let success = false;
    if (isEditMode) {
      success = await updateTask(existingTask.id, data);
    } else {
      success = await createTask(data);
    }

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {isEditMode ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors"
            type="button"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 flex flex-col gap-5"
        >
          {/* Project Selection */}
          {!projectId && !isEditMode && (
            <div>
              <label
                htmlFor="projectId"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Project
              </label>
              <select
                id="projectId"
                {...register("projectId")}
                disabled={isBusy}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              >
                <option value="">-- Select Project --</option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.projectId.message}
                </p>
              )}
            </div>
          )}

          {/* Task Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-bold text-slate-700 mb-1.5"
            >
              Task Title
            </label>
            <input
              id="title"
              autoFocus
              {...register("title")}
              disabled={isBusy}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
              placeholder="e.g., Update server icons"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Task Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-bold text-slate-700 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={3}
              disabled={isBusy}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
              placeholder="Add details about this task..."
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* Status Selector */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                disabled={isBusy}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Assignee Selector */}
            <div>
              <label
                htmlFor="assignee"
                className="block text-sm font-bold text-slate-700 mb-1.5"
              >
                Assign To
              </label>
              <select
                id="assignee"
                {...register("assignee")}
                disabled={isBusy}
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
            <div
              className="flex bg-slate-50 border border-slate-200 rounded-lg p-1"
              role="radiogroup"
            >
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  type="button"
                  role="radio"
                  aria-checked={priority === p}
                  disabled={isBusy}
                  onClick={() =>
                    setValue("priority", p, { shouldValidate: true })
                  }
                  className={`flex-1 py-1.5 text-xs font-extrabold rounded-md transition-all border ${
                    priority === p
                      ? "bg-white shadow-sm border-slate-200 text-indigo-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            {errors.priority && (
              <p className="text-xs text-red-500 mt-1">
                {errors.priority.message}
              </p>
            )}
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
