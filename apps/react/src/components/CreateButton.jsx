import { Plus } from "lucide-react";
import React from "react";

export default function CreateButton({ label }) {
  return (
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
      <Plus className="w-4 h-4" />
      {label}
    </button>
  );
}
