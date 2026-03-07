import React, { useState } from "react";
import {
  ArrowLeft,
  Settings,
  Folder,
  Edit2,
  Trash2,
  BarChart3,
  CheckCircle2,
  Search,
  Filter,
  MessageSquare,
} from "lucide-react";
import { StatusBadge } from "../components/ui/StatusBadge";
import { ProjectDetailHeader } from "../components/project/ProjectDetailHeader";
import { TeamSidebar } from "../components/project/TeamSidebar";

// Mock Data
const initialProjectData = {
  id: "69a7da43e20b4945fe956ad3",
  title: "Project MythCraft SaaS",
  description: "Comprehensive management platform for Minecraft server owners.",
  status: "in-progress",
  createdBy: {
    fullName: "Jyoti Dhull",
    profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jyoti",
  },
  team: [
    {
      fullName: "Aman Lathar",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
      role: "Developer",
    },
    {
      fullName: "Sandeep R.",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sandeep",
      role: "Designer",
    },
  ],
  createdAt: "2026-03-04T07:07:47.991Z",
};

const projectTasks = [
  {
    id: 1,
    title: "Design Database Schema",
    status: "done",
    assignedTo: { profile: "" },
  },
  {
    id: 2,
    title: "Configure Auth Flow",
    status: "in-progress",
    assignedTo: { profile: "" },
  },
];

export default function SingleProjectPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState(initialProjectData);
  const [editForm, setEditForm] = useState({ ...initialProjectData });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const calculateProgress = () => {
    const tasks = projectTasks || [];
    if (tasks.length === 0) return 0;
    const doneTasks = tasks.filter((t) => t.status === "done").length;
    return Math.round((doneTasks / tasks.length) * 100);
  };

  const handleSaveEdit = () => {
    setProjectData({ ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 text-slate-900">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold hidden sm:inline">
              Back to Projects
            </span>
          </button>
          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 hidden sm:flex">
            <Folder className="w-4 h-4" />
            <span>Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold">
              {projectData.title}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsHeaderMenuOpen(!isHeaderMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${isHeaderMenuOpen ? "bg-indigo-50 text-indigo-600" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}
          >
            <Settings className="w-5 h-5" />
          </button>
          {isHeaderMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 overflow-hidden">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setIsHeaderMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 transition-colors"
              >
                <Edit2 className="w-4 h-4" /> Edit Details
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                <Trash2 className="w-4 h-4" /> Delete Project
              </button>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectDetailHeader
          projectData={projectData}
          isEditing={isEditing}
          editForm={editForm}
          setEditForm={setEditForm}
          handleSaveEdit={handleSaveEdit}
          setIsEditing={setIsEditing}
          formatDate={formatDate}
          calculateProgress={calculateProgress}
          projectTasks={projectTasks || []}
        />

        <div className="flex items-center gap-6 border-b border-slate-200 mb-8">
          {["overview", "tasks"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold capitalize transition-colors relative ${activeTab === tab ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"}`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "overview" ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    ["Total", projectTasks?.length || 0, "text-slate-900"],
                    [
                      "Done",
                      projectTasks?.filter((t) => t.status === "done").length ||
                        0,
                      "text-emerald-600",
                    ],
                    [
                      "Active",
                      projectTasks?.filter((t) => t.status === "in-progress")
                        .length || 0,
                      "text-indigo-600",
                    ],
                    [
                      "Team",
                      (projectData?.team?.length || 0) + 1,
                      "text-slate-900",
                    ],
                  ].map(([label, val, color]) => (
                    <div
                      key={label}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center"
                    >
                      <div className="text-slate-500 text-xs font-bold uppercase mb-1">
                        {label}
                      </div>
                      <div className={`text-2xl font-bold ${color}`}>{val}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-indigo-500" /> Task
                      Summary
                    </h2>
                    <button
                      onClick={() => setActiveTab("tasks")}
                      className="text-sm font-bold text-indigo-600 hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {projectTasks?.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="p-4 sm:p-6 flex items-center gap-4"
                      >
                        <h3
                          className={`flex-1 font-semibold text-slate-900 truncate ${task.status === "done" ? "line-through text-slate-400" : ""}`}
                        >
                          {task.title}
                        </h3>
                        <StatusBadge status={task.status} />
                        <img
                          src={task.assignedTo?.profile}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full bg-slate-100"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 text-center text-slate-500">
                Task List Component goes here.
              </div>
            )}
          </div>
          <TeamSidebar projectData={projectData} />
        </div>
      </main>
    </div>
  );
}
