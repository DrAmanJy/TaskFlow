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
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {currentUser.firstName}! 👋
        </h1>
        <p className="text-slate-500">
          Here's what's happening in your workspace today.
        </p>
      </div>

      <StatsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Passing the tasks list down to the component */}
          <TaskList tasks={tasks} />
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">Team</h2>
          <p className="text-sm text-slate-500">No team members invited yet.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
