import React from "react";

export const SecurityTab = () => {
  return (
    <div className="space-y-8 max-w-xl">
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          Change Password
        </h3>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
};
