import React from "react";
import { KanbanSquare, Clock, Users, MessageSquare } from "lucide-react";

const StatsOverview = () => {
  const stats = [
    {
      label: "Active Projects",
      value: "4",
      icon: KanbanSquare,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending Tasks",
      value: "12",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Team Members",
      value: "8",
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Chat Messages",
      value: "42",
      icon: MessageSquare,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
          <div className={`p-3 rounded-xl ${stat.bg}`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
