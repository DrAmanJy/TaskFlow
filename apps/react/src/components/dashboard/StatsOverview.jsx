import React, { useMemo } from "react";
import { KanbanSquare, Clock, Users, CheckCircle } from "lucide-react";

const StatsOverview = ({ tasks = [], projects = [] }) => {
  // Dynamically calculate stats based on the context data
  const statsData = useMemo(() => {
    const activeProjects = projects.length;
    const pendingTasks = tasks.filter((t) => t.status !== "done").length;
    const completedTasks = tasks.filter((t) => t.status === "done").length;

    // Calculate unique team members across all projects
    const uniqueMembers = new Set();
    projects.forEach((project) => {
      if (Array.isArray(project.team)) {
        project.team.forEach((member) => {
          const id = member.id || member._id || member.userId?._id;
          if (id) uniqueMembers.add(id);
        });
      }
    });

    return {
      activeProjects,
      pendingTasks,
      teamMembers: uniqueMembers.size,
      completedTasks,
    };
  }, [tasks, projects]);

  const stats = [
    {
      label: "Total Projects",
      value: statsData.activeProjects,
      icon: KanbanSquare,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Pending Tasks",
      value: statsData.pendingTasks,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Team Members",
      value: statsData.teamMembers,
      icon: Users,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Completed Tasks",
      value: statsData.completedTasks,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md hover:border-slate-300"
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
