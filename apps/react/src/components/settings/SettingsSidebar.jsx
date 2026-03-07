import React from "react";

export const SettingsSidebar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap md:whitespace-normal text-left ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium"
              }`}
            >
              <tab.icon
                className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
