import React from "react";
import StatsOverview from "../components/dashboard/StatsOverview";
import TaskList from "../components/dashboard/TaskList";
const currentUser = {
  firstName: "Aman",
  fullName: "Aman Lathar",
  profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
};

const tasks = [
  {
    id: "t1",
    title: "Configure Rust Server Plugins",
    description: "Install and configure Oxide and essential plugins.",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "t2",
    title: "Update Survival Map",
    description: "Generate new terrain for the testing server.",
    priority: "medium",
    status: "todo",
  },
];
const DashboardHome = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {currentUser.firstName}! 👋
        </h1>
        <p className="text-slate-500">
          Here's what's happening in your workspace today.
        </p>
      </header>

      <section aria-label="Workspace statistics">
        <StatsOverview />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2" aria-label="Recent tasks">
          <TaskList tasks={tasks} />
        </section>

        <aside
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          aria-label="Team information"
        >
          <h2 className="font-bold text-slate-900 mb-4">Team</h2>
          <p className="text-sm text-slate-500">No team members invited yet.</p>
        </aside>
      </section>
    </div>
  );
};

export default DashboardHome;
