import React from "react";
import { Cpu, Database } from "lucide-react";
import SystemDataFlow from "../components/sections/SystemDataFlow";
import CoreModules from "../components/sections/CoreModules";
import CodeBlock from "../components/ui-a/CodeBlock";
import { userJson, taskJson, messageJson } from "../constants/dataModels";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 pb-24">
      <div className="bg-white border-b border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium mb-6">
            <Cpu className="w-4 h-4" /> System Overview
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            Technical Architecture
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            A high-level view of the NexusWork platform's technical foundation.
            Designed for scalability, responsive user interactions, and robust
            state management across complex features like Kanban boards.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12 space-y-24">
        <SystemDataFlow />
        <CoreModules />

        {/* Data Schemas Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Database className="w-6 h-6 text-indigo-600" /> Data Models &
              Schemas
            </h2>
          </div>
          <p className="text-slate-600 mb-8 max-w-3xl">
            Strictly defined JSON structures ensure consistency across the
            application. These objects are managed globally in context and
            represent the core data payloads sent to and from the API.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <CodeBlock title="User_Model" code={userJson} />
            <CodeBlock title="Task_Model" code={taskJson} />
            <CodeBlock title="Message_Model" code={messageJson} />
          </div>
        </section>
      </div>
    </div>
  );
}
