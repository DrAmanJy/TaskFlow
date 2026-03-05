import React from "react";

const CodeBlock = ({ title, code }) => (
  <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-xl">
    <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
      </div>
      <span className="ml-4 text-xs font-mono text-slate-400">
        {title}.json
      </span>
    </div>
    <div className="p-4 overflow-x-auto">
      <pre className="text-sm font-mono text-emerald-400">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

export default CodeBlock;
