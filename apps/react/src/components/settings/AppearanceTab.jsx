import React from "react";

export const AppearanceTab = ({ theme, setTheme }) => {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          Theme Preferences
        </h3>
        <p className="text-sm text-slate-600">
          Choose how NexusWork looks to you.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Light Theme Option */}
          <div
            onClick={() => setTheme("light")}
            className={`border-2 rounded-xl p-4 cursor-pointer relative overflow-hidden transition-colors ${theme === "light" ? "border-indigo-600" : "border-slate-200 hover:border-slate-300"}`}
          >
            {theme === "light" && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            )}
            <div className="h-20 bg-slate-50 rounded-lg border border-slate-200 p-2 mb-3">
              <div className="w-full h-3 bg-white rounded border border-slate-100 mb-2"></div>
              <div className="w-2/3 h-3 bg-white rounded border border-slate-100"></div>
            </div>
            <p className="font-semibold text-sm text-slate-800 text-center">
              Light Mode
            </p>
          </div>

          {/* Dark Theme Option */}
          <div
            onClick={() => setTheme("dark")}
            className={`border-2 rounded-xl p-4 cursor-pointer relative overflow-hidden transition-colors ${theme === "dark" ? "border-indigo-600" : "border-slate-200 hover:border-slate-300"}`}
          >
            {theme === "dark" && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            )}
            <div className="h-20 bg-slate-900 rounded-lg border border-slate-800 p-2 mb-3">
              <div className="w-full h-3 bg-slate-800 rounded border border-slate-700 mb-2"></div>
              <div className="w-2/3 h-3 bg-slate-800 rounded border border-slate-700"></div>
            </div>
            <p className="font-semibold text-sm text-slate-800 text-center">
              Dark Mode
            </p>
          </div>

          {/* System Theme Option */}
          <div
            onClick={() => setTheme("system")}
            className={`border-2 rounded-xl p-4 cursor-pointer relative overflow-hidden transition-colors ${theme === "system" ? "border-indigo-600" : "border-slate-200 hover:border-slate-300"}`}
          >
            {theme === "system" && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            )}
            <div className="h-20 flex rounded-lg border border-slate-200 overflow-hidden mb-3">
              <div className="w-1/2 bg-slate-50 p-2 border-r border-slate-200">
                <div className="w-full h-3 bg-white rounded border border-slate-100 mb-2"></div>
              </div>
              <div className="w-1/2 bg-slate-900 p-2">
                <div className="w-full h-3 bg-slate-800 rounded border border-slate-700 mb-2"></div>
              </div>
            </div>
            <p className="font-semibold text-sm text-slate-800 text-center">
              System Sync
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
