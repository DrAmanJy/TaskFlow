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

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", path: "/projects", icon: KanbanSquare },
  { name: "Tasks", path: "/tasks", icon: CheckCircle2 },
  { name: "Settings", path: "/settings", icon: Settings },
];

const SidebarLinkItem = ({ item, isMobile, setOpenMobile }) => {
  const { pathname } = useLocation();
  const Icon = item.icon;

  const isPathActive = (path) => {
    if (pathname === path) return true;
    if (path !== "/" && pathname.startsWith(`${path}/`)) return true;
    return false;
  };

  const active = isPathActive(item.path);

  const handleLinkClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={active}
        tooltip={item.name}
        className="h-12 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40 data-[active=true]:bg-indigo-600 data-[active=true]:text-white hover:bg-slate-800 hover:text-white group-data-[collapsible=icon]:justify-center"
      >
        <Link
          to={item.path}
          onClick={handleLinkClick}
          className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center"
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span className="font-medium group-data-[collapsible=icon]:hidden">
            {item.name}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const Sidebar = ({ user }) => {
  console.log("sidebar render")

  const { isMobile, setOpenMobile, toggleSidebar } = useSidebar();

  return (
    <UISidebar
      collapsible="icon"
      className="border-r  [&_[data-sidebar=sidebar-inner]]:bg-slate-900 [&_[data-sidebar=sidebar-inner]]:text-slate-300"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 overflow-hidden group-data-[collapsible=icon]:justify-center">
          <button
            onClick={toggleSidebar}
            className="bg-indigo-500 p-2 rounded-lg hover:bg-indigo-400 transition-colors cursor-pointer shrink-0 "
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
            {navItems.map((item) => (
              <SidebarLinkItem
                key={item.name}
                item={item}
                isMobile={isMobile}
                setOpenMobile={setOpenMobile}
              />
            ))}
          </SidebarMenu>
        </nav>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-800">
        <div
          className="flex items-center gap-3  group-data-[collapsible=icon]:justify-center"
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
            <p className="text-sm font-medium  truncate">
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
