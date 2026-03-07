import React from "react";
import {
  MessageSquare,
  Paperclip,
  Clock,
  Loader2,
  FolderDot,
} from "lucide-react";
import { PriorityBadge } from "../ui/PriorityBadge";

export const TaskCard = ({ task, isLoading, onDragStart, onDragEnd }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      id={`task-${task.id}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={(e) => onDragEnd(e, task.id)}
      className="relative group bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md hover:border-indigo-200 transition-all"
    >
      {/* Targeted Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] rounded-xl flex items-center justify-center z-10 border border-indigo-200">
          <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <PriorityBadge priority={task.priority} />
        {/* Project Tag */}
        <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-600 truncate max-w-[120px] group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
          <FolderDot className="w-3 h-3" />
          <span className="truncate">{task.projectName}</span>
        </div>
      </div>

      <h4 className="font-bold text-slate-800 mb-1 leading-snug">
        {task.title}
      </h4>
      <p className="text-xs text-slate-500 mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
        <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> {task.comments}
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3.5 h-3.5" /> {task.attachments}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {formatDate(task.createdAt)}
          </div>
        </div>

        <img
          src={task.assignedTo.profile}
          alt={task.assignedTo.fullName}
          title={`Assigned to ${task.assignedTo.fullName}`}
          className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white"
        />
      </div>
    </div>
  );
};
