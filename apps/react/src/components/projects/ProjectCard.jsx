import React, { useState, useRef, useEffect } from "react";
import {
  Folder,
  MoreVertical,
  Calendar,
  ArrowRight,
  Trash2,
  Edit2,
} from "lucide-react";
import { useProjects } from "../../context/ProjectContext";
import { ConfirmModal } from "../ui/ConfirmModal";
import { Link } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const styles = {
    todo: "bg-slate-100 text-slate-700",
    "in-progress": "bg-blue-100 text-blue-700",
    done: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${styles[status] || styles.todo}`}
    >
      {status.replace("-", " ")}
    </span>
  );
};

export const ProjectCard = ({ project, onEdit }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { deleteProject, status } = useProjects();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const isDeleting = status?.deleting === project.id;

  return (
    <>
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          deleteProject(project.id);
          setShowConfirm(false);
        }}
        isLoading={isDeleting}
        title="Delete Project?"
        message={`Are you sure you want to delete "${project.title}"? All associated tasks and project data will be permanently removed.`}
      />
      <Link
        to={`/projects/${project.id}`}
        className={`group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden relative ${isDeleting ? "opacity-50 grayscale" : ""}`}
      >
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <Folder className="w-6 h-6" />
            </div>

            {/* 3-Dot Dropdown Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in duration-200">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onEdit(project);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                  >
                    <Edit2 className="w-4 h-4 text-slate-400" /> Update
                  </button>

                  <div className="h-px bg-slate-100 mx-2 my-1" />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowConfirm(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Project
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                {project.title}
              </h3>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {project.description || "No description provided."}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <img
                  src={project.createdBy.profile}
                  alt={project.createdBy.fullName}
                  className="w-8 h-8 rounded-full border-2 border-white bg-slate-100"
                />
                {project.team?.map((member, i) => (
                  <img
                    key={i}
                    src={member.profile}
                    alt={member.fullName}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-100"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {(project.team?.length || 0) + 1} Members
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium">
              Created {formatDate(project.createdAt)}
            </span>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            Open Project <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Link>
    </>
  );
};
