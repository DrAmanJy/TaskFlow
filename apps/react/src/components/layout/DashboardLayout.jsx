import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { isLoading, user, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth?type=login" replace />;
  }
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={user}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 relative">
        {/* Floating Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="fixed top-4 left-4 z-20 p-2 bg-white/90 backdrop-blur-sm shadow-sm border border-slate-200 rounded-md hover:bg-slate-50 md:hidden"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

        {/* The Outlet now takes up the entire space and renders its own headers */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
