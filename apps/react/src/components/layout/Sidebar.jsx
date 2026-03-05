import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  KanbanSquare,
  CheckCircle2,
  MessageSquare,
  Settings,
  Zap,
} from "lucide-react";

const Sidebar = ({ isOpen, currentUser }) => {
  const navItems = [
    { name: "Dashboard", path: "/app", icon: LayoutDashboard },
    { name: "Projects", path: "/app/projects", icon: KanbanSquare },
    { name: "Tasks", path: "/app/tasks", icon: CheckCircle2 },
    { name: "Chat", path: "/app/chat", icon: MessageSquare },
    { name: "Settings", path: "/app/settings", icon: Settings },
  ];

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-20"} bg-slate-900 text-slate-300 transition-all duration-300 hidden md:flex flex-col z-30`}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-500 p-2 rounded-lg shrink-0">
          <Zap className="w-5 h-5 text-white" />
        </div>
        {isOpen && (
          <span className="font-bold text-xl text-white tracking-tight">
            NexusWork
          </span>
        )}
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/app"}
            className={({ isActive }) => `
              w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-colors group
              ${isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-800 hover:text-white"}
            `}
          >
            <item.icon className="w-5 h-5" />
            {isOpen && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 overflow-hidden ring-2 ring-slate-800">
            <img
              src={currentUser.profile}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.fullName}
              </p>
              <p className="text-xs text-slate-500 truncate">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
