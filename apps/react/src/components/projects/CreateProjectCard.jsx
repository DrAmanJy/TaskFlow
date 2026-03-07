import { Plus } from "lucide-react";

export const CreateProjectCard = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-full min-h-[300px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all group"
    >
      <div className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-indigo-300 transition-colors">
        <Plus className="w-6 h-6" />
      </div>
      <span className="font-bold">Create New Project</span>
    </button>
  );
};
