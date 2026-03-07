import React from "react";
import { ArrowLeft, Folder, Check, CheckCircle2, Settings } from "lucide-react";

export const TaskHeader = ({ task, onEditClick }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shadow-sm shrink-0 z-10">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col">
          <h1 className="text-base font-bold text-slate-900 leading-tight">
            {task.title}
          </h1>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-0.5">
            <Folder size={12} className="text-slate-400" />
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">
              {task.projectName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center gap-2 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all">
          <Check size={16} /> Mark Done
        </button>
        <button className="sm:hidden p-2 text-slate-400 hover:text-emerald-600 transition-colors">
          <CheckCircle2 size={20} />
        </button>
        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
        <button
          onClick={onEditClick}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};
