import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/authContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const DashboardLayout = () => {
  const { isLoading, user, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen bg-slate-50 w-full overflow-hidden font-sans">
          <Sidebar user={user} />

          <div className="flex flex-col flex-1 min-w-0 relative">
            <div className="md:hidden p-4 border-b border-slate-200 bg-white sticky top-0 z-20">
              <SidebarTrigger className="text-slate-700" />
            </div>

            <main className="flex-1 overflow-y-auto scroll-smooth">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default DashboardLayout;
