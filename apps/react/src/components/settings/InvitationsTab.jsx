import React from "react";
import { UserPlus } from "lucide-react";

export const InvitationsTab = ({ invitations, setInvitations }) => {
  return (
    <div className="space-y-6 max-w-3xl">
      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
        Project Invitations
      </h3>

      {invitations.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
            <UserPlus className="w-8 h-8 text-slate-400" />
          </div>
          <h4 className="text-slate-900 font-bold text-lg">
            No pending invitations
          </h4>
          <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
            You're all caught up! When someone invites you to collaborate on a
            project, it will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-200 bg-white shadow-sm gap-4 hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={inv.invitedBy.profile}
                  alt={inv.invitedBy.fullName}
                  className="w-12 h-12 rounded-full bg-slate-100 ring-4 ring-slate-50"
                />
                <div>
                  <p className="text-sm text-slate-600">
                    <span className="font-bold text-slate-900">
                      {inv.invitedBy.fullName}
                    </span>{" "}
                    invited you to join
                  </p>
                  <p className="text-lg font-bold text-indigo-600 leading-tight mt-0.5">
                    {inv.projectName}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs font-medium">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      Role: {inv.role}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{inv.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:shrink-0 pt-2 border-t border-slate-100 sm:border-0 sm:pt-0 mt-2 sm:mt-0">
                <button
                  type="button"
                  onClick={() =>
                    setInvitations(invitations.filter((i) => i.id !== inv.id))
                  }
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setInvitations(invitations.filter((i) => i.id !== inv.id))
                  }
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm shadow-indigo-200"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
