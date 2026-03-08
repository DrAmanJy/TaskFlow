import { Link } from "react-router-dom";

export const ProjectTaskList = ({ tasks }) => {
  const sections = [
    { id: "todo", label: "To Do", color: "bg-slate-200 text-slate-700" },
    {
      id: "in-progress",
      label: "In Progress",
      color: "bg-blue-100 text-blue-700",
    },
    { id: "done", label: "Done", color: "bg-emerald-100 text-emerald-700" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-4">
      {sections.map((section) => {
        const sectionTasks = tasks.filter((t) => t.status === section.id);
        if (sectionTasks.length === 0) return null;

        return (
          <div
            key={section.id}
            className="w-full bg-slate-50/50 rounded-2xl p-5 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                {section.label}
              </h3>
              <span className="bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
                {sectionTasks.length}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {sectionTasks.map((task) => (
                // Swapped div for Link and added the "to" prop
                <Link
                  key={task.id}
                  to={`/tasks/${task.id}`}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div
                      className={`font-bold text-sm mb-1 ${
                        task.status === "done"
                          ? "text-slate-400 line-through"
                          : "text-slate-800"
                      }`}
                    >
                      {task.title}
                    </div>
                    {task.description && (
                      <div className="text-xs text-slate-500 line-clamp-1">
                        {task.description}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${
                        task.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : task.priority === "Medium"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {task.priority} Priority
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
