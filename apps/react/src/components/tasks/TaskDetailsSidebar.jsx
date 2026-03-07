import React from "react";
import {
  Calendar,
  Paperclip,
  FileText,
  Image as ImageIcon,
  Download,
} from "lucide-react";
import { StatusBadge } from "../ui/StatusBadge";
import { PriorityBadge } from "../ui/PriorityBadge";

export const TaskDetailsSidebar = ({ task }) => {
  const getFileIcon = (type) => {
    if (type === "image")
      return <ImageIcon className="w-4 h-4 text-blue-500" />;
    if (type === "pdf") return <FileText className="w-4 h-4 text-red-500" />;
    return <Paperclip className="w-4 h-4 text-slate-500" />;
  };

  return (
    <aside className="hidden lg:flex flex-col w-[380px] border-r border-slate-200 bg-white overflow-y-auto shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-0">
      <div className="p-6 space-y-8">
        {/* Quick Status Bar */}
        <div className="flex gap-3 pb-6 border-b border-slate-100">
          <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Status
            </p>
            <StatusBadge status={task.status} />
          </div>
          <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Priority
            </p>
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        <section>
          <h3 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
            Assignee
          </h3>
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-3 rounded-xl hover:border-indigo-100 transition-colors cursor-pointer group">
            <img
              src={task.assignedTo.profile}
              className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm group-hover:ring-indigo-50 transition-all"
              alt="Assignee"
            />
            <div>
              <span className="text-sm font-bold text-slate-900 block">
                {task.assignedTo.fullName}
              </span>
              <span className="text-xs text-slate-500">Lead Developer</span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
            Dates
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-700 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
            <Calendar size={16} className="text-slate-400" />
            <span className="font-medium">Created:</span>{" "}
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
            Description
          </h3>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-sm text-slate-600 leading-relaxed">
            {task.description}
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">
            Attachments ({task.attachments.length})
          </h3>
          <div className="space-y-2">
            {task.attachments.map((file) => (
              <div
                key={file.id}
                className="group flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">
                      {file.name}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400">
                      {file.size} • Uploaded today
                    </p>
                  </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};
