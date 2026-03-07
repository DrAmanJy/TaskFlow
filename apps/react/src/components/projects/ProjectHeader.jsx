import { Search, Filter, ChevronDown, Plus } from "lucide-react";

export const ProjectHeader = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="sticky top-0 z-50 w-full bg-slate-900 pt-4 pb-6 shadow-md shadow-slate-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-slate-400">
              Manage and track your active workspace initiatives.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 active:translate-y-0">
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by project title or description..."
              className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-sm outline-none"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-semibold">Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
              <span className="text-sm font-semibold">Status: All</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
