import React from "react";
import { BarChart3 } from "lucide-react";
import { StatusBadge } from "../ui-a/StatusBadge";
import { Link } from "react-router-dom"; // Added Link import

export const ProjectOverview = ({
  tasks,
  project,
  doneTasksCount,
  activeTasksCount,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          ["Total", tasks.length, "text-slate-900"],
          ["Done", doneTasksCount, "text-emerald-600"],
          ["Active", activeTasksCount, "text-indigo-600"],
          ["Team", (project?.team?.length || 0) + 1, "text-slate-900"],
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
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-500" /> Recent Tasks
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {tasks.slice(0, 5).map((t) => (
            <Link
              key={t.id}
              to={`/tasks/${t.id}`}
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span
                className={`font-medium ${t.status === "done" ? "line-through text-slate-400" : ""}`}
              >
                {t.title}
              </span>
              <StatusBadge status={t.status} />
            </Link>
          ))}
          {tasks.length === 0 && (
            <div className="p-10 text-center text-slate-400">
              No tasks created yet. Click 'Add New Task' to begin.
            </div>
          )}
        </div>
      </div>
    </>
  );
};
