import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
// import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  // Sidebar state to handle expansion/collapse
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock user data based on your profile
  const currentUser = {
    fullName: "Aman Lathar",
    profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
  };

  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Receives state and user info */}
      <Sidebar isOpen={isSidebarOpen} currentUser={currentUser} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - Receives toggle function */}
        {/* <DashboardHeader onToggleSidebar={toggleSidebar} /> */}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
