import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  KanbanSquare,
  CheckCircle2,
  MessageSquare,
  Settings,
  Zap,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, user }) => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/projects", icon: KanbanSquare },
    { name: "Tasks", path: "/tasks", icon: CheckCircle2 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  // Only auto-close the sidebar when clicking a link on mobile screens
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300"
        />
      )}

      <aside
        aria-label="Primary"
        className={`
          fixed md:relative z-40 h-full
          bg-slate-900 text-slate-300
          transition-all duration-300 ease-in-out
          flex flex-col overflow-hidden
          
          /* Mobile: Always w-64, slide in/out */
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-64
          
          /* Desktop: Always visible, adjust width based on state */
          md:translate-x-0
          ${isOpen ? "md:w-64" : "md:w-20"}
        `}
      >
        {/* Logo */}
        <header className="flex items-center gap-3 p-6 whitespace-nowrap">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-indigo-500 p-2 rounded-lg hover:bg-indigo-400 transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Sidebar"
          >
            <Zap className="w-5 h-5 text-white" />
          </button>

          {isOpen && (
            <span className="text-xl font-bold text-white transition-opacity duration-300">
              NexusWork
            </span>
          )}
        </header>

        {/* Navigation */}
        <nav className="flex-1 px-3" aria-label="Main navigation">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={handleLinkClick}
                    title={!isOpen ? item.name : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-3 py-3 rounded-xl transition-colors whitespace-nowrap
                      ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-slate-800 hover:text-white"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {isOpen && <span className="font-medium">{item.name}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User */}
        <footer className="p-4 border-t border-slate-800 whitespace-nowrap overflow-hidden">
          <section className="flex items-center gap-3">
            <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden ring-2 ring-slate-800">
              <img
                src={user?.profile}
                alt={`${user?.fullName} avatar`}
                className="w-full h-full object-cover"
              />
            </div>

            {isOpen && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.fullName}
                </p>
                <p className="text-xs text-slate-500 truncate">@{user?.role}</p>
              </div>
            )}
          </section>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
