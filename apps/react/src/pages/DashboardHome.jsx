import React, { useMemo } from "react";
import StatsOverview from "../components/dashboard/StatsOverview";
import TaskList from "../components/dashboard/TaskList";
import { PageHeader } from "../components/ui-a/PageHeader";
import { useTask } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";
import { Loader2, Users } from "lucide-react";

const DashboardHome = () => {
  const { tasks, status: taskStatus } = useTask();
  const { projects, status: projectStatus } = useProjects();

  const teamMembers = useMemo(() => {
    const membersMap = new Map();
    projects.forEach((project) => {
      if (Array.isArray(project.team)) {
        project.team.forEach((member) => {
          const id = member.id || member.userId?.id;
          if (id && !membersMap.has(id)) {
            membersMap.set(id, member.userId || member);
          }
        });
      }
    });
    return Array.from(membersMap.values());
  }, [projects]);

  if (
    (taskStatus?.loading && tasks.length === 0) ||
    (projectStatus?.loading && projects.length === 0)
  ) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-600 w-10 h-10 mb-4" />
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <PageHeader title="Dashboard" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        <section aria-label="Workspace statistics">
          <StatsOverview tasks={tasks} projects={projects} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2" aria-label="Recent tasks">
            <TaskList tasks={tasks} />
          </section>

          <aside
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit"
            aria-label="Team information"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                Team Members
              </h2>
              <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-lg">
                {teamMembers.length}
              </span>
            </div>

            {teamMembers.length > 0 ? (
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <img
                      src={
                        member.profile ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${member.firstName || "User"}`
                      }
                      alt={member.firstName || "Team Member"}
                      className="w-10 h-10 rounded-full border border-slate-200 object-cover shadow-sm"
                    />
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">
                        {member.role || "Member"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm font-medium text-slate-500">
                  No team members joined yet.
                </p>
              </div>
            )}
          </aside>
        </section>
      </main>
    </div>
  );
};

export default DashboardHome;
