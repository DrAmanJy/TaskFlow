import React from "react";
import {
  KanbanSquare,
  MessageSquare,
  LayoutDashboard,
  UserCircle,
} from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <KanbanSquare className="h-6 w-6 text-indigo-600" />,
      title: "Interactive Kanban Boards",
      description:
        "Organize tasks visually. Drag and drop items between To Do, In Progress, and Done. Assign team members, set priorities, and track progress effortlessly.",
      mockup: (
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-100 text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-800">Task Card</span>
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
              High Priority
            </span>
          </div>
          <p className="text-slate-600 text-xs mb-3">
            Configure Rust Server Plugins
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
              JD
            </div>
            <span className="text-xs text-slate-500">
              Assigned to Jyoti Dhull
            </span>
          </div>
        </div>
      ),
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-indigo-600" />,
      title: "Real-time Team Chat",
      description:
        "Keep communication contextual. Chat globally or directly inside task cards. Distinct message bubbles make it easy to follow conversations.",
      mockup: (
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-100 flex flex-col gap-3">
          <div className="flex gap-3 justify-end">
            <div className="bg-indigo-600 text-white text-xs p-2 rounded-lg rounded-tr-none max-w-[80%]">
              The new survival map is generated and ready for testing.
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex-shrink-0 text-white flex items-center justify-center text-[10px]">
              JD
            </div>
            <div className="bg-white border border-slate-200 text-slate-700 text-xs p-2 rounded-lg rounded-tl-none max-w-[80%]">
              Awesome, Aman! I'll jump on the server now.
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <LayoutDashboard className="h-6 w-6 text-indigo-600" />,
      title: "Powerful Dashboard Overview",
      description:
        "Get a high-level view of your entire workspace. See active projects, your pending tasks, and a recent activity feed all in one glance.",
      mockup: (
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-white p-2 rounded border border-slate-200">
              <div className="text-[10px] text-slate-500">Active Projects</div>
              <div className="font-bold text-lg">4</div>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200">
              <div className="text-[10px] text-slate-500">My Pending Tasks</div>
              <div className="font-bold text-lg text-amber-600">7</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium mb-1">
            Recent Activity
          </div>
          <div className="text-[10px] text-slate-600 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
            Aman completed "Survival Map Gen"
          </div>
        </div>
      ),
    },
    {
      icon: <UserCircle className="h-6 w-6 text-indigo-600" />,
      title: "Seamless Authentication & Profiles",
      description:
        "Secure login, registration, and comprehensive user profiles. Manage your avatar, update details, and handle security settings with ease.",
      mockup: (
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aman"
              alt="Avatar"
              className="w-10 h-10"
            />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">Aman Lathar</div>
            <div className="text-xs text-slate-500">aman@example.com</div>
            <button className="mt-1 text-[10px] bg-white border border-slate-200 px-2 py-1 rounded hover:bg-slate-50">
              Edit Profile
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Everything you need to ship faster
          </h2>
          <p className="text-lg text-slate-600">
            NexusWork combines all the essential tools for project management
            into one unified, lightning-fast application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 mb-6">{feature.description}</p>

              {/* Feature specific visual/mockup */}
              <div className="mt-auto">{feature.mockup}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
