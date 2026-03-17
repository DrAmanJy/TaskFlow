import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  KanbanSquare,
  CheckCircle2,
  Settings,
  Zap,
} from "lucide-react";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const Sidebar = ({ user }) => {
  const { pathname } = useLocation();
  const { isMobile, setOpenMobile, toggleSidebar } = useSidebar();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/projects", icon: KanbanSquare },
    { name: "Tasks", path: "/tasks", icon: CheckCircle2 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const isPathActive = (path) => {
    if (pathname === path) return true;
    if (path !== "/" && pathname.startsWith(`${path}/`)) return true;
    return false;
  };

  const handleLinkClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <UISidebar
      collapsible="icon"
      // 1. FIXED BACKGROUND: Using a reliable descendant selector that works across all Tailwind versions
      className="border-r border-slate-800 [&_[data-sidebar=sidebar-inner]]:bg-slate-900 [&_[data-sidebar=sidebar-inner]]:text-slate-300"
    >
      <SidebarHeader className="p-4">
        {/* 2. FIXED LAYOUT: Using standard flexbox and relying on shadcn's native hide classes */}
        <div className="flex items-center gap-3 overflow-hidden">
          <button
            onClick={toggleSidebar}
            className="bg-indigo-500 p-2 rounded-lg hover:bg-indigo-400 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            aria-label="Toggle Sidebar"
            type="button"
          >
            <Zap className="w-5 h-5 text-white" />
          </button>

          <span className="text-xl font-bold text-black whitespace-nowrap group-data-[collapsible=icon]:hidden transition-opacity duration-200">
            NexusWork
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <nav aria-label="Main navigation">
          <SidebarMenu className="gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isPathActive(item.path);

              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    tooltip={item.name}
                    // 3. FIXED BUTTONS: Removed the manual padding/justify ternaries that break shadcn's layout
                    className="h-12 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 data-[active=true]:bg-indigo-600 data-[active=true]:text-white hover:bg-slate-800 hover:text-white"
                  >
                    <Link
                      to={item.path}
                      onClick={handleLinkClick}
                      className="flex items-center gap-3"
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">
                        {item.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </nav>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-800">
        <div
          className="flex items-center gap-3 overflow-hidden"
          title={user?.fullName}
        >
          <div className="w-8 h-8 shrink-0 rounded-full overflow-hidden ring-2 ring-slate-800 bg-slate-800">
            {user?.profile ? (
              <img
                src={user.profile}
                alt={`${user?.fullName ?? "User"} avatar`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : null}
          </div>

          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-medium text-white truncate">
              {user?.fullName}
            </p>
            <p className="text-xs text-slate-500 truncate">@{user?.role}</p>
          </div>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </UISidebar>
  );
};

export default Sidebar;
