import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Loader2,
  AlertCircle,
  MessageSquare,
  Info,
  Layout,
} from "lucide-react";

import { TaskHeader } from "../components/tasks/TaskHeader";
import { TaskDetailsSidebar } from "../components/tasks/TaskDetailsSidebar";
import { ChatArea } from "../components/tasks/ChatArea";
import { useTask } from "../context/TaskContext";
import TaskForm from "../components/ui-a/TaskForm";

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { tasks, status: taskStatus } = useTask();

  // Support both 'id' and '_id' for MongoDB compatibility
  const task = tasks.find((t) => (t.id || t._id) === taskId);

  const [viewMode, setViewMode] = useState("details");
  const [isEditing, setIsEditing] = useState(false);

  if (!task && taskStatus.loading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600 w-8 h-8" />
      </div>
    );

  if (!task)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-slate-50">
        <AlertCircle className="text-slate-300 w-12 h-12" />
        <h2 className="font-bold text-slate-800">Task Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 font-bold hover:underline"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-900 overflow-hidden font-sans">
      <TaskHeader task={task} onEditClick={() => setIsEditing(true)} />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden bg-white border-b border-slate-200 p-1.5 flex gap-1">
        <button
          onClick={() => setViewMode("details")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all ${
            viewMode === "details"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:bg-slate-50"
          }`}
        >
          <Info size={14} /> Details
        </button>

        <button
          onClick={() => setViewMode("chat")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all ${
            viewMode === "chat"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:bg-slate-50"
          }`}
        >
          <MessageSquare size={14} /> Chat
        </button>

        <button
          onClick={() => setViewMode("both")}
          className={`hidden md:flex flex-1 py-2.5 items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all ${
            viewMode === "both"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-slate-400 hover:bg-slate-50"
          }`}
        >
          <Layout size={14} /> Split View
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar / Details View */}
        <div
          className={`
          h-full border-r border-slate-200 shrink-0 transition-all duration-300
          ${viewMode === "details" || viewMode === "both" ? "flex" : "hidden"} 
          ${viewMode === "both" ? "w-1/2" : "w-full"}
          lg:flex lg:w-[380px] 
        `}
        >
          <TaskDetailsSidebar task={task} />
        </div>

        {/* Chat Area View */}
        <div
          className={`
          h-full flex-1 transition-all duration-300 relative
          ${viewMode === "chat" || viewMode === "both" ? "flex" : "hidden"} 
          ${viewMode === "both" ? "w-1/2" : "w-full"}
          lg:flex
        `}
        >
          <ChatArea taskId={taskId} currentUserId="current_user_id" />
        </div>
      </div>

      {isEditing && (
        <TaskForm onClose={() => setIsEditing(false)} existingTask={task} />
      )}
    </div>
  );
}
