import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, Settings, Folder, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ConfirmModal } from "../ui-a/ConfirmModal"; //

export const ProjectNavBar = ({ project, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  return (
    <>
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to={"/projects"}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-semibold hidden sm:inline">Back</span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 hidden sm:flex">
            <Folder className="w-4 h-4" />
            <span className="text-slate-900 font-bold">{project?.title}</span>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isMenuOpen
                ? "bg-slate-100 text-slate-900"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  onEdit();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3 transition-colors"
              >
                <Edit2 className="w-4 h-4 text-slate-400" /> Edit Details
              </button>

              <button
                onClick={() => {
                  setShowConfirm(true);
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete Project
              </button>
            </div>
          )}
        </div>
      </nav>

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          onDelete();
          setShowConfirm(false);
        }}
        title="Delete Project?"
        message={`Are you sure you want to delete "${project?.title}"? All associated tasks, project data, and settings will be permanently removed.`}
      />
    </>
  );
};
