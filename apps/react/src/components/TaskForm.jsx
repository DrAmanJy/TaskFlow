import { useState } from "react";
import {
  X,
  Flag,
  AlertCircle,
  CheckCircle2,
  Clock,
  Circle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TaskForm({
  onClose,
  onSuccess,
  team = [],
  projects = [],
  projectId,
  existingTask = null,
}) {
  const isEditMode = Boolean(existingTask);

  const initialAssignee = existingTask?.assignee?.[0]?.userId || "";
  const [formData, setFormData] = useState({
    projectId: projectId || existingTask?.project || "",
    title: existingTask?.title || "",
    description: existingTask?.description || "",
    status: existingTask?.status || "todo",
    priority: existingTask?.priority || "Low",
    assignee: initialAssignee,
  });

  const activeTeam =
    team.length > 0
      ? team
      : projects.find((p) => p.id === formData.projectId)?.team || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrioritySelect = (priority) => {
    setFormData((prev) => ({ ...prev, priority }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditMode
      ? `http://localhost:3000/api/tasks/${existingTask._id || existingTask.id}`
      : "http://localhost:3000/api/tasks";

    const method = isEditMode ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data.message || `Failed to ${isEditMode ? "update" : "create"} task`,
        );
        return;
      }

      toast.success(
        isEditMode
          ? "Task updated successfully!"
          : "Task created successfully!",
      );

      if (onSuccess && data.task) {
        onSuccess(data.task);
      }
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Network error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {isEditMode ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {!projectId && !isEditMode && (
            <div>
              <label
                htmlFor="projectId"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Select Project <span className="text-red-500">*</span>
              </label>
              <select
                id="projectId"
                name="projectId"
                required
                value={formData.projectId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm cursor-pointer"
              >
                <option value="" disabled>
                  -- Choose a Project --
                </option>
                {projects.map((proj) => (
                  <option key={proj.id} value={proj.id}>
                    {proj.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. Design database schema"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Add details, steps, or requirements..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                {isEditMode ? "Status" : "Initial Status"}
              </label>
              <div className="relative">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm appearance-none cursor-pointer"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {formData.status === "todo" && (
                    <Circle className="w-4 h-4 text-gray-400" />
                  )}
                  {formData.status === "in-progress" && (
                    <Clock className="w-4 h-4 text-blue-500" />
                  )}
                  {formData.status === "done" && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="assignee"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Assign To
              </label>
              <select
                id="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select team member
                </option>
                {activeTeam.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName + " " + user.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button
                type="button"
                onClick={() => handlePrioritySelect("Low")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-md transition-all ${
                  formData.priority === "Low"
                    ? "bg-white text-gray-800 shadow-sm border border-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Flag
                  className={`w-3.5 h-3.5 ${formData.priority === "Low" ? "text-gray-400" : ""}`}
                />
                Low
              </button>

              <button
                type="button"
                onClick={() => handlePrioritySelect("Medium")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-md transition-all ${
                  formData.priority === "Medium"
                    ? "bg-orange-50 text-orange-700 shadow-sm border border-orange-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <AlertCircle
                  className={`w-3.5 h-3.5 ${formData.priority === "Medium" ? "text-orange-500" : ""}`}
                />
                Medium
              </button>

              <button
                type="button"
                onClick={() => handlePrioritySelect("High")}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-sm font-medium rounded-md transition-all ${
                  formData.priority === "High"
                    ? "bg-red-50 text-red-700 shadow-sm border border-red-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <AlertCircle
                  className={`w-3.5 h-3.5 ${formData.priority === "High" ? "text-red-500" : ""}`}
                />
                High
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
            >
              {isEditMode ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
