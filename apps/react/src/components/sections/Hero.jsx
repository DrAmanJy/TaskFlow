import React from "react";
import {
  ArrowRight,
  LayoutDashboard,
  KanbanSquare,
  CheckCircle2,
  MessageSquare,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";

const Hero = ({ navigateTo }) => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-white pt-16 sm:pt-24 lg:pt-32 pb-16">
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-indigo-50 blur-3xl opacity-50"></div>
        <div className="absolute top-32 -left-24 w-72 h-72 rounded-full bg-blue-50 blur-3xl opacity-50"></div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Unify your team's workflow in{" "}
            <span className="text-indigo-600">one seamless space.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            From intuitive Kanban boards to real-time team chat, NexusWork
            provides everything your team needs to plan, track, and deliver
            projects faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="xl" onClick={() => navigate(navigateTo)}>
              Start for free <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-slate-500 pt-2">
            Completely free to use. No hidden charges.
          </p>
        </div>

        {/* Hero Mockup Graphic */}
        <div className="mt-16 sm:mt-24 relative mx-auto max-w-5xl">
          <div className="rounded-2xl border border-slate-200/50 bg-white/50 p-2 shadow-2xl shadow-indigo-100/50 backdrop-blur-sm">
            <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden flex flex-col md:flex-row h-[400px]">
              {/* Mockup Sidebar */}
              <div className="hidden md:flex w-64 bg-slate-50 border-r border-slate-100 p-4 flex-col gap-2">
                <div className="flex items-center gap-2 px-2 pb-4 border-b border-slate-200 mb-2">
                  <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Aman Lathar</div>
                    <div className="text-xs text-slate-500">
                      Workspace Admin
                    </div>
                  </div>
                </div>
                {["Dashboard", "Projects", "Tasks", "Chat", "Settings"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-3 ${i === 2 ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"}`}
                    >
                      {i === 0 && <LayoutDashboard className="w-4 h-4" />}
                      {i === 1 && <KanbanSquare className="w-4 h-4" />}
                      {i === 2 && <CheckCircle2 className="w-4 h-4" />}
                      {i === 3 && <MessageSquare className="w-4 h-4" />}
                      {i === 4 && <UserCircle className="w-4 h-4" />}
                      {item}
                    </div>
                  ),
                )}
              </div>

              {/* Mockup Main Content */}
              <div className="flex-1 p-6 bg-slate-50/50">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">
                    Sprint Board
                  </h3>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">
                      AL
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-xs">
                      JD
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1 */}
                  <div className="bg-slate-100/50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                      To Do (2)
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm border border-slate-200 mb-2">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
                          Medium
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-800 mb-1">
                        Update Auth Flow
                      </h4>
                    </div>
                  </div>
                  {/* Column 2 */}
                  <div className="bg-slate-100/50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                      In Progress (1)
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm border border-indigo-200 ring-1 ring-indigo-50 mb-2 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                      <div className="flex justify-between items-start mb-2 pl-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 font-medium">
                          High
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-slate-800 mb-1 pl-2">
                        Configure Rust Server Plugins
                      </h4>
                      <p className="text-xs text-slate-500 mb-3 pl-2">
                        Install and configure Oxide...
                      </p>
                      <div className="flex justify-between items-center pl-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                          JD
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Mar 5
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Column 3 */}
                  <div className="bg-slate-100/50 rounded-lg p-3">
                    <div className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                      Done (12)
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm border border-slate-200 mb-2 opacity-60">
                      <h4 className="text-sm font-medium text-slate-800 line-through">
                        Setup Repo
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
