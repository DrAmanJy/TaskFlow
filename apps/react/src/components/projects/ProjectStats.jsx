import React from "react";

export const ProjectStats = ({ projects = [] }) => {
  const stats = [
    {
      label: "Total",
      count: projects.length,
      color: "bg-slate-900",
    },
    {
      label: "To Do",
      count: projects.filter((p) => p.status === "todo").length,
      color: "bg-slate-400",
    },
    {
      label: "In Progress",
      count: projects.filter((p) => p.status === "in-progress").length,
      color: "bg-indigo-600",
    },
    {
      label: "Completed",
      count: projects.filter(
        (p) => p.status === "completed" || p.status === "done",
      ).length,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="flex gap-8 mb-8 overflow-x-auto pb-4 no-scrollbar">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-3 shrink-0">
          <div
            className={`w-2.5 h-2.5 rounded-full ${stat.color} shadow-sm`}
          ></div>
          <span className="text-sm font-extrabold text-slate-900">
            {stat.count}
          </span>
          <span className="text-sm font-medium text-slate-500">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};
