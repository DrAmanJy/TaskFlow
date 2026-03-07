import React from "react";
import { AlertCircle } from "lucide-react";

export const InputField = ({
  label,
  icon: Icon,
  error,
  register,
  name,
  rules,
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-sm font-medium text-slate-700 block ml-0.5">
        {label}
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon
            className={`h-5 w-5 transition-colors ${error ? "text-red-400" : "text-slate-400"}`}
          />
        </div>

        <input
          {...register(name, rules)}
          {...props}
          className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg text-sm transition-all focus:ring-2 outline-none
            ${
              error
                ? "border-red-300 bg-red-50/30 focus:ring-red-100 focus:border-red-400"
                : "border-slate-200 bg-slate-50 focus:bg-white focus:ring-indigo-100 focus:border-indigo-500"
            }`}
        />
      </div>

      {/* Stable Error Container */}
      <div className="min-h-[20px] ml-0.5 flex items-center gap-1.5">
        {error?.message && (
          <>
            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
            <p className="text-[11px] font-medium text-red-500 leading-none">
              {error.message}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
