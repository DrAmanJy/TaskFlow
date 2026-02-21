import { Outlet } from "react-router-dom";
import ActiveNav from "./ActiveNav";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-indigo-600">TaskFlow</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <ActiveNav path={"/"} label={"Dashboard"}></ActiveNav>
          <ActiveNav path={"/projects"} label={"Projects"}></ActiveNav>
          <ActiveNav path={"/settings"} label={"Settings"}></ActiveNav>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col h-full">
        <Outlet />
      </main>
    </div>
  );
}
