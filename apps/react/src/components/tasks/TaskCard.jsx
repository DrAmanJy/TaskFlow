import React from "react";
import { MessageSquare, Paperclip, Clock, FolderDot } from "lucide-react";
import { PriorityBadge } from "../ui-a/PriorityBadge";
import { Link } from "react-router-dom"; //

export const TaskCard = ({ task, onDragStart, onDragEnd }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // 1. EXTRACT USER (Updated to match populated Mongoose schema)
  const assignedUser =
    Array.isArray(task.assignee) && task.assignee.length > 0
      ? task.assignee[0].userId
      : task.assignee?.userId || task.assignedTo;

  // 2. EXTRACT PROJECT
  const displayProjectName = task.project?.title || task.projectName;

  // 3. EXTRACT COUNTS
  const commentsCount = Array.isArray(task.comments)
    ? task.comments.length
    : task.comments || 0;
  const attachmentsCount = Array.isArray(task.attachments)
    ? task.attachments.length
    : task.attachments || 0;

  return (
    <Link
      to={`/tasks/${task.id}`} //
      id={`task-${task.id}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={(e) => onDragEnd(e, task.id)}
      className="block relative group bg-white p-4 rounded-xl border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md hover:border-indigo-200 transition-all no-underline"
    >
      <div className="flex justify-between items-start mb-2">
        <PriorityBadge priority={task.priority} />

        {displayProjectName && (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-[10px] font-semibold text-slate-600 truncate max-w-[120px] group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors">
            <FolderDot className="w-3 h-3 shrink-0" />
            <span className="truncate">{displayProjectName}</span>
          </div>
        )}
      </div>

      <h4 className="font-bold text-slate-800 mb-1 leading-snug">
        {task.title}
      </h4>

      {task.description && (
        <p className="text-xs text-slate-500 mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
        <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
          {commentsCount > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> {commentsCount}
            </div>
          )}
          {attachmentsCount > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3.5 h-3.5" /> {attachmentsCount}
            </div>
          )}
          {task.createdAt && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {formatDate(task.createdAt)}
            </div>
          )}
        </div>

        {/* Render Avatar using the correctly mapped assignedUser */}
        {assignedUser ? (
          <img
            src={assignedUser?.profile}
            alt={assignedUser.fullName || "User"}
            title={`Assigned to ${assignedUser.fullName || "User"}`}
            className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white object-cover shrink-0"
          />
        ) : (
          <div
            className="w-6 h-6 rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-[10px] text-slate-400 font-bold shrink-0"
            title="Unassigned"
          >
            ?
          </div>
        )}
      </div>
    </Link>
  );
};
