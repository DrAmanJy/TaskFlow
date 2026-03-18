import React, { useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Search, Plus, X, Menu, Loader2 } from "lucide-react";

export const PageHeader = ({
  title,
  placeholder,
  buttonText,
  onButtonClick,
  onSearchChange,
  searching,
  toggleSidebar,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const handleInputChange = (val) => {
    setLocalSearch(val);
    onSearchChange?.(val);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 relative">
        {placeholder && isMobileSearchOpen && (
          <div className="absolute inset-0 bg-white flex items-center px-4 gap-2 md:hidden z-30 animate-in slide-in-from-top duration-200">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {searching ? (
                  <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <input
                autoFocus
                type="text"
                value={localSearch}
                placeholder={placeholder}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
            </div>
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                handleInputChange("");
              }}
              className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <SidebarTrigger className="w-10 h-10 shrink-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 md:hidden flex items-center justify-center text-white hover:text-white shadow-lg shadow-indigo-100 active:scale-95 transition-all" />
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold text-slate-900 truncate tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {placeholder && (
            <div className="relative hidden md:block">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                {searching ? (
                  <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <input
                type="text"
                value={localSearch}
                placeholder={placeholder}
                onChange={(e) => handleInputChange(e.target.value)}
                className="w-72 pl-10 pr-4 py-2.5 bg-slate-100 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          )}

          {placeholder && (
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="md:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {buttonText && (
            <button
              onClick={onButtonClick}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              <span className="hidden sm:block">{buttonText}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
