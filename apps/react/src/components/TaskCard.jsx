import { Link } from "react-router-dom";

export default function TaskCard({ task }) {
  const {
    id,
    title,
    description,
    priority,
    comments = [],
    attachments = [],
    assignee = [],
  } = task;

  const commentsCount = comments.length;
  const attachmentsCount = attachments.length;

  let priorityStyles = "";
  switch (priority) {
    case "High":
    case "Urgent":
      priorityStyles = "bg-red-100 text-red-700";
      break;
    case "Medium":
      priorityStyles = "bg-yellow-100 text-yellow-700";
      break;
    case "Low":
      priorityStyles = "bg-blue-100 text-blue-700";
      break;
    default:
      priorityStyles = "bg-gray-100 text-gray-700";
      break;
  }

  return (
    <Link
      to={`/tasks/${id}`}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab hover:border-indigo-300 transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-md ${priorityStyles}`}
        >
          {priority}
        </span>
        <button className="text-gray-400 hover:text-gray-600">...</button>
      </div>

      <h3 className="font-medium text-gray-800 mb-1">{title}</h3>

      {description && (
        <p className="text-sm text-gray-500 line-clamp-2 mb-3">{description}</p>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {commentsCount !== 0 && (
            <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {commentsCount}
            </span>
          )}

          {attachmentsCount !== 0 && (
            <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              {attachmentsCount}
            </span>
          )}
        </div>

        <div className="flex -space-x-1.5 overflow-hidden">
          {assignee.slice(0, 3).map((member, index) => {
            if (!member.userId || !member.userId.profile) return null;

            return (
              <img
                key={member._id || index}
                src={member.userId.profile}
                alt={`${member.userId.firstName} ${member.userId.lastName}`}
                title={`${member.userId.firstName} ${member.userId.lastName}`} // Shows name on hover!
                className="w-6 h-6 rounded-full border border-white shadow-sm shrink-0 object-cover bg-gray-100"
                style={{ zIndex: 10 - index }}
              />
            );
          })}
        </div>
      </div>
    </Link>
  );
}
