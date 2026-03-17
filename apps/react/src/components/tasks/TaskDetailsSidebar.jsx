import React, { useRef } from "react";
import {
  Calendar,
  Paperclip,
  FileText,
  Image as ImageIcon,
  Download,
  UserCircle2,
  Plus,
  Upload,
  Info,
} from "lucide-react";
import { StatusBadge } from "../ui-a/StatusBadge";
import { PriorityBadge } from "../ui-a/PriorityBadge";
import toast from "react-hot-toast";

export const TaskDetailsSidebar = ({ task }) => {
  const fileInputRef = useRef(null);

  const handleUploadTrigger = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      toast.promise(
        // Replace this Promise.resolve with your actual API call later
        Promise.resolve(file),
        {
          loading: "Uploading...",
          success: <b>File uploaded!</b>,
          error: <b>Upload failed.</b>,
        },
      );
    }
  };

  const assignedUser =
    Array.isArray(task.assignee) && task.assignee.length > 0
      ? task.assignee[0].userId
      : task.assignee?.userId || null;

  const userRole =
    Array.isArray(task.assignee) && task.assignee.length > 0
      ? task.assignee[0].role
      : "Member";

  const getFileIcon = (type) => {
    if (type?.includes("image"))
      return <ImageIcon className="w-4 h-4 text-indigo-500" />;
    if (type?.includes("pdf"))
      return <FileText className="w-4 h-4 text-rose-500" />;
    return <Paperclip className="w-4 h-4 text-slate-500" />;
  };

  return (
    <aside className="flex flex-col w-full h-full bg-white overflow-y-auto no-scrollbar">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="p-6 space-y-7">
        <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100/50 rounded-2xl border border-slate-100">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200/60">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Status
            </p>
            <StatusBadge status={task.status} />
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200/60">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Priority
            </p>
            <PriorityBadge priority={task.priority} />
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Assignee
            </h3>
          </div>
          {assignedUser ? (
            <div className="flex items-center gap-3 bg-white border border-slate-200 p-3 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
              <div className="relative">
                <img
                  src={
                    assignedUser.profile ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${assignedUser.fullName}`
                  }
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                  alt="Assignee"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {assignedUser.fullName}
                </p>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">
                  {userRole}
                </p>
              </div>
            </div>
          ) : (
            <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group">
              <UserCircle2 className="w-5 h-5 opacity-40 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">Assign Member</span>
            </button>
          )}
        </section>

        <section className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
              <Calendar size={14} /> Created
            </div>
            <span className="text-slate-900 font-bold">
              {new Date(task.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="pt-3 border-t border-slate-200/60">
            <div className="flex items-center gap-2 text-slate-500 font-bold text-[11px] uppercase tracking-wider mb-2">
              <Info size={14} /> Description
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {task.description || "No description provided."}
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Attachments{" "}
              <span className="text-slate-400 ml-1">
                ({task.attachments?.length || 0})
              </span>
            </h3>
            <button
              onClick={handleUploadTrigger}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-extrabold hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-sm"
            >
              <Plus size={14} /> Upload
            </button>
          </div>

          <div className="space-y-3">
            {task.attachments?.length > 0 ? (
              task.attachments.map((file) => (
                <div
                  key={file.id || file._id}
                  className="group flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 truncate w-32 group-hover:text-indigo-700">
                        {file.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        {file.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                onClick={handleUploadTrigger}
                className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30 hover:bg-indigo-50/20 hover:border-indigo-200 cursor-pointer transition-all group"
              >
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-indigo-600">
                  Click to upload files
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </aside>
  );
};
