import React, { useState } from "react";
import { Layout, Server, Store, Folder, X } from "lucide-react";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProjectForm({
  onClose,
  onSuccess,
  existingProject = null,
}) {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const isEditMode = Boolean(existingProject);

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

    if (!isLogin) {
      navigate("/login");
      toast.error("Please login before saving the project");
      return;
    }
    const url = isEditMode
      ? `http://localhost:3000/api/project/${existingProject._id || existingProject.id}`
      : "http://localhost:3000/api/project";

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
        toast.error(data.message || "Failed to save project");
        return;
      }

      toast.success(data.message);

      if (onSuccess && data.project) {
        onSuccess(data.project);
      }

      onClose();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Network error occurred");
    }
  };

  const iconOptions = [
    {
      id: "layout",
      icon: Layout,
      label: "UI / Web",
      activeClass: "border-blue-500 bg-blue-50 text-blue-600",
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
      activeClass: "border-gray-500 bg-gray-100 text-gray-700",
    },
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            {isEditMode ? "Edit Project" : "Create New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              placeholder="e.g. MythCraft API Redesign"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800"
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
              placeholder="Briefly describe the goal of this project..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800 resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                {isEditMode ? "Status" : "Initial Status"}
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 outline-none transition-all text-gray-800 appearance-none cursor-pointer"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    onClick={() => handleIconSelect(option.id)}
                    className={`flex flex-col items-center justify-center gap-2 py-3 px-2 border-2 rounded-xl transition-all ${
                      isActive
                        ? option.activeClass
                        : "border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <IconComponent
                      className="w-6 h-6"
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                    <span className="text-xs font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
            >
              {isEditMode ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
