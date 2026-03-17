import React from "react";
import { Calendar, Plus } from "lucide-react";
import { StatusBadge } from "../ui-a/StatusBadge";

export const ProjectDetailHeader = ({
  projectData,
  formatDate,
  progress = 0,
  completedTasks = 0,
  totalTasks = 0,
  onAddTask,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-extrabold text-slate-900">
              {projectData.title}
            </h1>
            <StatusBadge status={projectData.status} />
          </div>

          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed mb-6">
            {projectData.description || "No description provided."}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Created {formatDate(projectData.createdAt)}</span>
            </div>

            {projectData.createdBy && (
              <div className="flex items-center gap-2">
                <img
                  src={projectData.createdBy.profile}
                  alt="Creator"
                  className="w-5 h-5 rounded-full bg-slate-100"
                />
                <span>
                  By{" "}
                  <span className="font-semibold text-slate-700">
                    {projectData.createdBy.fullName}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-64 shrink-0 bg-slate-50 rounded-xl p-5 border border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-2">
            Project Progress
          </h3>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>{progress}% Completed</span>
            <span>
              {completedTasks}/{totalTasks}
            </span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <button
            onClick={onAddTask}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-colors active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};
