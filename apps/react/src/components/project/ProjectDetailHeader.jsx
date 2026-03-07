import React from "react";
import { Calendar, Save, X, Plus } from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";

export const ProjectDetailHeader = ({
  projectData,
  isEditing,
  editForm,
  setEditForm,
  handleSaveEdit,
  setIsEditing,
  formatDate,
  calculateProgress,
  projectTasks,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
      {isEditing && (
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-pulse"></div>
      )}

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {isEditing ? (
              <input
                type="text"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm({ ...editForm, title: e.target.value })
                }
                className="text-3xl font-extrabold text-slate-900 border-b-2 border-indigo-500 focus:outline-none bg-transparent w-full"
                autoFocus
              />
            ) : (
              <h1 className="text-3xl font-extrabold text-slate-900">
                {projectData.title}
              </h1>
            )}
            {!isEditing && <StatusBadge status={projectData.status} />}
          </div>

          {isEditing ? (
            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              className="text-slate-600 text-lg w-full leading-relaxed mb-6 border-b border-slate-200 focus:outline-none bg-slate-50 p-2 rounded-lg"
              rows="3"
            />
          ) : (
            <p className="text-slate-600 text-lg max-w-3xl leading-relaxed mb-6">
              {projectData.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Created {formatDate(projectData.createdAt)}</span>
            </div>
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
          </div>

          {isEditing && (
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-indigo-700"
              >
                <Save className="w-4 h-4" /> Save Updates
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm({ ...projectData });
                }}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-slate-200"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="w-full md:w-64 shrink-0 bg-slate-50 rounded-xl p-5 border border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 mb-2">
            Project Progress
          </h3>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>{calculateProgress()}% Completed</span>
            <span>
              {projectTasks.filter((t) => t.status === "done").length}/
              {projectTasks.length}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-sm hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" /> Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};
