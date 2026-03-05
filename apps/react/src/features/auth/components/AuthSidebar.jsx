import React from "react";
import { Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom"; // Added Link import

const AuthSidebar = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
        <div className="w-96 h-96 rounded-full bg-blue-600/20 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* LOGIC FIX: Wrapped logo in a Link to go home */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity w-fit"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            NexusWork
          </span>
        </Link>

        <div className="max-w-md">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Manage your tasks, <br />
            <span className="text-indigo-400">empower your team.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join thousands of developers and project managers who use NexusWork
            to ship products faster and communicate seamlessly.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span>Interactive Kanban Boards</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span>Real-time Team Chat</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span>Comprehensive Dashboards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-slate-500 text-sm">
        © {new Date().getFullYear()} NexusWork. All rights reserved.
      </div>
    </div>
  );
};

export default AuthSidebar;
