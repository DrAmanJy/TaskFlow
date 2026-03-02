import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
  CheckCircle2,
  Circle,
} from "lucide-react";

import TaskDescription from "../components/TaskDescription";
import TaskAssignees from "../components/TaskAssignees";
import TaskDetails from "../components/TaskDetails";
import DeleteTask from "../components/DeleteTask";
import TaskForm from "../components/TaskForm";

const priorityConfig = {
  High: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  Urgent: { color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  Medium: {
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  Low: { color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
};

const statusConfig = {
  todo: {
    label: "To Do",
    icon: Circle,
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  review: {
    label: "In Review",
    icon: Clock,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  done: {
    label: "Done",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
};

const formatDate = (dateString) => {
  if (!dateString) return "None";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function TaskPage() {
  const { id } = useParams();
  const { isLogin } = useAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (!isLogin) return;

    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to load task");
          return;
        }
        setTask(data.task);
      } catch (error) {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, isLogin]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading task details...
      </div>
    );
  }

  if (!task) return null;

  const StatusIcon = statusConfig[task.status]?.icon || Circle;
  const statusStyle = statusConfig[task.status] || statusConfig.todo;
  const priorityStyle = priorityConfig[task.priority] || priorityConfig.Low;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8 font-sans text-gray-800 relative">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to={`/projects/${task.project._id || task.project.id || task.project}`}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Project
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Edit className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors shadow-sm"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {task.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium ${statusStyle.bg} ${statusStyle.color}`}
              >
                <StatusIcon className="w-4 h-4" />
                {statusStyle.label}
              </span>
              <span
                className={`px-2.5 py-1 rounded-md font-medium border ${priorityStyle.bg} ${priorityStyle.color} ${priorityStyle.border}`}
              >
                {task.priority} Priority
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TaskDescription description={task.description} />
          </div>

          <div className="space-y-6">
            <TaskAssignees assignees={task.assignee} />
            <TaskDetails
              dueDate={task.dueDate}
              createdAt={task.createdAt}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteTask
          onClose={() => setShowDeleteModal(false)}
          title={task.title}
          taskId={task.id}
          projectId={task.project.id}
        />
      )}
      {showEditModal && (
        <TaskForm
          existingTask={task}
          team={task.project.team}
          onClose={() => setShowEditModal(false)}
          onSuccess={(updatedTask) => setTask(updatedTask)}
        />
      )}
    </div>
  );
}
