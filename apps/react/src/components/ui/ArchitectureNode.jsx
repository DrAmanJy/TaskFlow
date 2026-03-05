import React from "react";

const ArchitectureNode = ({ icon: Icon, title, description, colorClass }) => (
  <div
    className={`p-6 rounded-2xl border bg-white shadow-sm relative z-10 ${colorClass}`}
  >
    <div className="flex items-center gap-4 mb-3">
      <div
        className={`p-3 rounded-xl ${colorClass.replace("border-", "bg-").replace("200", "50").replace("500", "100")}`}
      >
        <Icon
          className={`w-6 h-6 ${colorClass.replace("border-", "text-").replace("200", "600")}`}
        />
      </div>
      <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
    </div>
    <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
  </div>
);

export default ArchitectureNode;
