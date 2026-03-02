import { Calendar, Clock } from "lucide-react";

export default function TaskDetails({ dueDate, createdAt, formatDate }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
        Details
      </h3>
      <div className="flex items-start text-sm">
        <Calendar className="w-4 h-4 text-gray-400 mr-3 mt-0.5 shrink-0" />
        <div>
          <div className="text-gray-500 text-xs mb-0.5">Due Date</div>
          <div
            className={`font-medium ${!dueDate ? "text-gray-400 italic" : "text-gray-900"}`}
          >
            {formatDate(dueDate)}
          </div>
        </div>
      </div>
      <div className="flex items-start text-sm pt-2">
        <Clock className="w-4 h-4 text-gray-400 mr-3 mt-0.5 shrink-0" />
        <div>
          <div className="text-gray-500 text-xs mb-0.5">Created</div>
          <div className="font-medium text-gray-900">
            {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
