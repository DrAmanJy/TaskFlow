import React from "react";
import {
  ShieldCheck,
  KanbanSquare,
  MessageSquare,
  LineChart,
} from "lucide-react";

const CoreModules = () => (
  <section>
    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
      <LineChart className="w-6 h-6 text-indigo-600" /> Core Modules
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Module Card 1 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-6 h-6 text-slate-700" />
          <h3 className="text-xl font-bold">Authentication & Profile</h3>
        </div>
        <ul className="space-y-3 text-slate-600 text-sm">
          <li className="flex gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>{" "}
            JWT-based authentication flow.
          </li>
          <li className="flex gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>{" "}
            Global User Object injected via React Context.
          </li>
        </ul>
      </div>

      {/* Module Card 2 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <KanbanSquare className="w-6 h-6 text-slate-700" />
          <h3 className="text-xl font-bold">Task Management</h3>
        </div>
        <ul className="space-y-3 text-slate-600 text-sm">
          <li className="flex gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>{" "}
            Drag-and-drop state calculation between columns.
          </li>
          <li className="flex gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>{" "}
            <strong>Targeted Loading:</strong> Spinners isolate to the specific
            task card being moved.
          </li>
        </ul>
      </div>

      {/* Module Card 3 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-6 h-6 text-slate-700" />
          <h3 className="text-xl font-bold">Team Communication</h3>
        </div>
        <ul className="space-y-3 text-slate-600 text-sm">
          <li className="flex gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>{" "}
            Conditional rendering logic for "My Messages" vs "Team Messages".
          </li>
          <li className="flex gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>{" "}
            Contextual threading linked to specific Task IDs.
          </li>
        </ul>
      </div>

      {/* Module Card 4 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <LineChart className="w-6 h-6 text-slate-700" />
          <h3 className="text-xl font-bold">Dashboard Aggregation</h3>
        </div>
        <ul className="space-y-3 text-slate-600 text-sm">
          <li className="flex gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>{" "}
            Data reduction to calculate pending tasks and active projects.
          </li>
          <li className="flex gap-2">
            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>{" "}
            High-level overview components for fast initial load times.
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default CoreModules;
