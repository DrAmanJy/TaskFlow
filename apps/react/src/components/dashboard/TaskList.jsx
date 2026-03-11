import React from "react";
import { CheckCircle2, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom"; // Assuming you use react-router for the "View All" link

const TaskList = ({ tasks = [] }) => {
  // Only show tasks that are not done, and limit to the 5 most recent/urgent
  const pendingTasks = tasks
    .filter((task) => task.status !== "done")
    .slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          Recent Pending Tasks{" "}
          <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
            {pendingTasks.length}
          </span>
        </h2>
        <Link
          to="/tasks"
          className="text-indigo-600 text-sm font-semibold hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {pendingTasks.length > 0 ? (
          pendingTasks.map((task) => (
            <div
              key={task.id || task._id}
              className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center hover:border-indigo-200 transition-colors"
            >
              <div className="flex-1">
                <Link
                  to={`/tasks/${task.id || task._id}`}
                  className="hover:text-indigo-600 transition-colors"
                >
                  <h3 className="font-semibold text-slate-800">{task.title}</h3>
                </Link>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                  {task.description || "No description provided."}
                </p>
              </div>
              <button
                // You can wire this up to your moveTask logic to instantly mark it done from the dashboard
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl hover:bg-emerald-600 hover:text-white transition-all shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" /> Mark Done
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <ClipboardList className="w-12 h-12 text-slate-300 mb-3" />
            <h3 className="text-slate-700 font-bold">All caught up!</h3>
            <p className="text-slate-500 text-sm mt-1">
              You have no pending tasks right now.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
