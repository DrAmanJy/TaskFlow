import React from "react";
import {
  Layers,
  Layout,
  Code2,
  Server,
  Database,
  ArrowDown,
} from "lucide-react";
import ArchitectureNode from "../ui/ArchitectureNode";

const SystemDataFlow = () => (
  <section>
    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
      <Layers className="w-6 h-6 text-indigo-600" /> System Data Flow
    </h2>

    <div className="relative">
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        <ArchitectureNode
          icon={Layout}
          title="React Client"
          description="Tailwind CSS UI, responsive layouts, optimistic UI updates with targeted component spinners."
          colorClass="border-indigo-200"
        />
        <div className="md:hidden flex justify-center py-2 text-slate-300">
          <ArrowDown />
        </div>
        <ArchitectureNode
          icon={Code2}
          title="State & Context"
          description="React Context API managing User Profile, active Project state, and cached Task data."
          colorClass="border-blue-200"
        />
        <div className="md:hidden flex justify-center py-2 text-slate-300">
          <ArrowDown />
        </div>
        <ArchitectureNode
          icon={Server}
          title="Express API Layer"
          description="RESTful endpoints for CRUD operations powering the MERN stack SaaS infrastructure."
          colorClass="border-emerald-200"
        />
        <div className="md:hidden flex justify-center py-2 text-slate-300">
          <ArrowDown />
        </div>
        <ArchitectureNode
          icon={Database}
          title="MongoDB"
          description="Document-based storage ensuring flexible schemas for Tasks, Projects, and Chat histories."
          colorClass="border-amber-200"
        />
      </div>
    </div>
  </section>
);

export default SystemDataFlow;
