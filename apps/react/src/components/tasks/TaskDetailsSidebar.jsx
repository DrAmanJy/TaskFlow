import React, { useRef, useState } from "react";
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
import { useTask } from "../../context/TaskContext";
import { useProjects } from "../../context/ProjectContext";

export const TaskDetailsSidebar = ({ task }) => {
  const { assignTask, status: taskStatus } = useTask();
  const { projects } = useProjects();
  const fileInputRef = useRef(null);
  const [isAssignDropdownOpen, setIsAssignDropdownOpen] = useState(false);

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

  const assignedUsers = Array.isArray(task.assignee) ? task.assignee : [];
  const assignedIds = assignedUsers.map(u => u.userId?.id || u.userId);

  const projectId = task.project?._id || task.project?.id || task.project;
  const selectedProject = projects.find((p) => p.id === projectId);
  const activeTeam = selectedProject?.team || [];

  const isBusy = taskStatus.updating === task.id || taskStatus.updating === task._id;

  const handleAssigneeToggle = async (userId) => {
    let newIds;
    if (assignedIds.includes(userId)) {
      newIds = assignedIds.filter(id => id !== userId);
    } else {
      newIds = [...assignedIds, userId];
    }
    await assignTask(task.id, newIds);
  };

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
              Assignees
            </h3>
            <button
              onClick={() => setIsAssignDropdownOpen(!isAssignDropdownOpen)}
              className="text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 p-1.5 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="relative">
            {assignedUsers.length > 0 ? (
              <div
                className="flex items-center gap-2 cursor-pointer group bg-white border border-slate-200 p-3 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all"
                onClick={() => setIsAssignDropdownOpen(!isAssignDropdownOpen)}
              >
                <div className="flex -space-x-3">
                  {assignedUsers.map((assignee, i) => {
                    const profile = assignee.userId?.profile || `https://api.dicebear.com/7.x/initials/svg?seed=${assignee.userId?.fullName || 'User'}`;
                    const isOwner = assignee.role === "owner" || assignee.role === "Owner";
                    return (
                      <div key={i} className="relative z-10 hover:z-20 transition-all hover:scale-110" title={`${assignee.userId?.fullName} (${assignee.role})`}>
                        <img
                          src={profile}
                          className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover bg-white"
                          alt={assignee.userId?.fullName || "Assignee"}
                        />
                        {isOwner && (
                          <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white text-[8px] font-extrabold px-1 rounded shadow-sm border border-white">
                            OWNER
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex-1 overflow-hidden ml-2">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {assignedUsers.length === 1 ? assignedUsers[0].userId?.fullName : `${assignedUsers.length} members`}
                  </p>
                  <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tighter">
                    {assignedUsers.length === 1 ? assignedUsers[0].role : "Assigned"}
                  </p>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsAssignDropdownOpen(!isAssignDropdownOpen)}
                className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group cursor-pointer"
              >
                <UserCircle2 className="w-5 h-5 opacity-40 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-bold">Assign Members</span>
              </button>
            )}

            {isAssignDropdownOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsAssignDropdownOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 shadow-xl rounded-xl z-50 overflow-hidden flex flex-col max-h-64 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-slate-50/50">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Select Team Members</p>
                  </div>
                  <div className="overflow-y-auto w-full p-2 space-y-1">
                    {selectedProject?.createdBy && (
                      <label className="flex items-center gap-3 p-2 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg cursor-pointer transition-colors w-full group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          checked={assignedIds.includes(selectedProject.createdBy.id || selectedProject.createdBy._id)}
                          onChange={() => handleAssigneeToggle(selectedProject.createdBy.id || selectedProject.createdBy._id)}
                          disabled={isBusy}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">{selectedProject.createdBy.fullName}</span>
                          <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-tighter">Owner</span>
                        </div>
                      </label>
                    )}
                    {activeTeam.map(user => {
                      const id = user.id || user._id;
                      return (
                        <label key={id} className="flex items-center gap-3 p-2 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg cursor-pointer transition-colors w-full group">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            checked={assignedIds.includes(id)}
                            onChange={() => handleAssigneeToggle(id)}
                            disabled={isBusy}
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-700">{user.fullName}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Member</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
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
