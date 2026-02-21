export default function TaskColumn({
  children,
  taskLength,
  label,
  btnLabel,
  dotColor = "bg-gray-400",
}) {
  return (
    <div className="w-80 shrink-0 bg-gray-100 rounded-xl p-4 flex flex-col max-h-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
          {label}
        </h2>
        <span className="text-sm text-gray-500 font-medium">{taskLength}</span>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto pb-2">
        {/* Task Card */}

        {children}
        {/* Empty State */}
        {taskLength <= 0 && (
          <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
            No completed tasks yet.
          </div>
        )}
      </div>
      {btnLabel && (
        <button className="mt-3 py-2 text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2">
          <span>+ {btnLabel}</span>
        </button>
      )}
    </div>
  );
}
