import React, { useState } from "react";
import { Search, Plus, X, Menu } from "lucide-react";

export const PageHeader = ({
  title,
  placeholder,
  buttonText,
  onButtonClick,
  onSearchChange,
  toggleSidebar,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 relative">
        {isMobileSearchOpen && (
          <div className="absolute inset-0 bg-white  flex items-center px-4 gap-2 md:hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder={placeholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button
              onClick={() => {
                setIsMobileSearchOpen(false);
                onSearchChange?.("");
              }}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 md:box shrink-0 rounded-xl bg-indigo-600  md:hidden flex  items-center justify-center text-white shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-slate-900 truncate">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={placeholder}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-64 pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="md:hidden p-2.5 text-slate-500 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onButtonClick}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden md:block">{buttonText}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
