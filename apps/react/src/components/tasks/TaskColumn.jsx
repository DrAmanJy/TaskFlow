import React from "react";
import { MoreHorizontal } from "lucide-react";
import { TaskCard } from "./TaskCard";

export const TaskColumn = ({
  column,
  columnTasks,
  draggedTaskId,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd,
}) => {
  return (
    <div
      className="w-full lg:w-80 shrink-0 flex flex-col max-h-[80vh] lg:max-h-full bg-slate-100/50 rounded-2xl border border-slate-200"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
    >
      {/* Column Header */}
      <div
        className={`px-4 py-3 border-t-4 ${column.color} rounded-t-2xl flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-800">{column.title}</h3>
          <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {columnTasks.length}
          </span>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar min-h-[150px]">
        {columnTasks.map((task) => (
          <TaskCard
            key={task.id} // Strictly using .id as requested
            task={task}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        ))}

        {/* Visual Drop Indicator */}
        {draggedTaskId && !columnTasks.find((t) => t.id === draggedTaskId) && (
          <div className="h-24 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 flex items-center justify-center text-slate-400 text-sm font-bold animate-in fade-in duration-200">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
};
