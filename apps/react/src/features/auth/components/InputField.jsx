import React from "react";

const InputField = ({ label, icon: Icon, rightElement, ...props }) => {
  return (
    <div className="space-y-2 flex-1">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {rightElement}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-slate-400" />
        </div>
        <input
          className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 focus:bg-white transition-colors text-sm"
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;
