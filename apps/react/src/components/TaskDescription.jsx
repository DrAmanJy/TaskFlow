export default function TaskDescription({ description }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
        Description
      </h3>
      {description ? (
        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      ) : (
        <p className="text-gray-400 italic">
          No description provided for this task.
        </p>
      )}
    </div>
  );
}
