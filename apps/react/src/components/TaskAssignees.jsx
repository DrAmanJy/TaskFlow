export default function TaskAssignees({ assignees = [] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
        Assignees
      </h3>
      <div className="space-y-3">
        {assignees && assignees.length > 0 ? (
          assignees.map(
            (member) =>
              member.userId && (
                <div
                  key={member.userId._id || member.userId.id}
                  className="flex items-center gap-3"
                >
                  <img
                    src={member.userId.profile}
                    alt={member.userId.firstName}
                    className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {member.userId.firstName} {member.userId.lastName}
                  </span>
                </div>
              ),
          )
        ) : (
          <p className="text-sm text-gray-500 italic">Unassigned</p>
        )}
      </div>
    </div>
  );
}
