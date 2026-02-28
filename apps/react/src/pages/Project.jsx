import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Layout,
  Server,
  Store,
  Folder,
  Edit,
  Trash2,
  Calendar,
  Users,
  Plus,
} from "lucide-react";

import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/authContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProjectForm from "../components/ProjectForm";
import DeleteProject from "../components/DeleteProject";
import TaskForm from "../components/TaskForm";

const MOCK_TASKS = [
  {
    id: "t-001",
    title: "Design database schema for user roles",
    description:
      "Create the Mongoose models and define relationships for RBAC.",
    status: "done",
    priority: "High",
    commentsCount: 3,
    attachmentsCount: 1,
    assignee: { colorClass: "bg-indigo-500", initials: "JD" },
  },
];

const iconMap = {
  layout: { component: Layout, color: "text-blue-600", bg: "bg-blue-50" },
  server: { component: Server, color: "text-emerald-600", bg: "bg-emerald-50" },
  store: { component: Store, color: "text-orange-600", bg: "bg-orange-50" },
  folder: { component: Folder, color: "text-gray-600", bg: "bg-gray-50" },
};

const statusMap = {
  todo: {
    label: "To Do",
    classes: "bg-slate-100 text-slate-700 border-slate-200",
  },
  "in-progress": {
    label: "In Progress",
    classes: "bg-blue-50 text-blue-700 border-blue-200",
  },
  completed: {
    label: "Completed",
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

const formatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function Project() {
  const [project, setProject] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { isLogin } = useAuth();

  const refreshProject = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/project/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        toast.error("Failed to fetch project");
        return;
      }

      const data = await res.json();
      setProject(data.project);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!isLogin) {
      toast.error("Please login to see project");
      navigate("/login");
      return;
    }

    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/project/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          toast.error("Failed to fetch project");
          return;
        }

        const data = await res.json();
        setProject(data.project);
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchProject();
  }, [id, isLogin, navigate]);

  if (!project) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading project data...
      </div>
    );
  }

  const IconComponent = iconMap[project.icon]?.component || Folder;
  const iconStyles = iconMap[project.icon] || iconMap.folder;
  const statusStyles = statusMap[project.status];

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8 font-sans text-gray-800 relative">
      <div className="max-w-6xl mx-auto space-y-6">
        <Link
          to={"/projects"}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Projects
        </Link>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div
                className={`p-4 rounded-xl shrink-0 ${iconStyles.bg} ${iconStyles.color}`}
              >
                <IconComponent className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {project.title}
                  </h1>
                  <span
                    className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full border ${statusStyles.classes}`}
                  >
                    {statusStyles.label}
                  </span>
                </div>
                <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Edit className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Project Tasks</h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 px-3 py-1.5 rounded-md"
              >
                <Plus className="w-4 h-4" /> Add Task
              </button>
            </div>
            <div className="bg-slate-50 border border-slate-100/60 rounded-xl p-3 sm:p-4 flex flex-col gap-3">
              {MOCK_TASKS.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              {MOCK_TASKS.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                  No tasks assigned yet. Click "Add Task" to get started.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                Details
              </h3>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">Created On</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(project.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-sm pt-2">
                <img
                  src={project.createdBy.profile}
                  alt={project.createdBy.firstName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mr-3 border border-gray-200"
                />
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">Created By</span>
                  <span className="font-medium text-gray-900">
                    {project.createdBy.firstName} {project.createdBy.lastName}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" /> Team (
                  {project.team.length})
                </h3>
                <button className="text-indigo-600 hover:bg-indigo-50 p-1 rounded transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {project.team.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={member.profile}
                        alt={member.firstName}
                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {project.createdBy._id === member._id
                        ? "Owner"
                        : "Member"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
      {showDeleteModal && (
        <DeleteProject
          title={project.title}
          onclose={() => setShowDeleteModal(false)}
        />
      )}
      {showEditModal && (
        <ProjectForm
          onClose={() => setShowEditModal(false)}
          existingProject={project}
          refreshProject={refreshProject}
        />
      )}
    </div>
  );
}
