import React from "react";
import { CheckCircle2 } from "lucide-react";

const TaskList = ({ tasks }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
        My Tasks{" "}
        <span className="text-sm font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </h2>
      <button className="text-indigo-600 text-sm font-semibold hover:underline">
        View All
      </button>
    </div>

    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center"
        >
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800">{task.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{task.description}</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 text-sm font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all">
            <CheckCircle2 className="w-4 h-4" /> Done
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default TaskList;
