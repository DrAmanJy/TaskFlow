export const ProjectStats = ({ stats }) => {
  // Default data so your UI doesn't break while you're building
  const defaultStats = [
    { label: "Total", count: 12, color: "bg-slate-900" },
    { label: "To Do", count: 4, color: "bg-slate-400" },
    { label: "In Progress", count: 6, color: "bg-indigo-600" },
    { label: "Completed", count: 2, color: "bg-emerald-500" },
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className="flex gap-8 mb-8 overflow-x-auto pb-4 no-scrollbar">
      {displayStats.map((stat, i) => (
        <div key={i} className="flex items-center gap-3 shrink-0">
          <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
          <span className="text-sm font-bold text-slate-700">{stat.count}</span>
          <span className="text-sm text-slate-500">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};
