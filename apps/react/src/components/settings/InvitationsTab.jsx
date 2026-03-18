import React, { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { userService } from "../../api/userService";
import toast from "react-hot-toast";

export const InvitationsTab = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvites = async () => {
    try {
      const data = await userService.getInvites();
      setInvitations(data.data || data);
    } catch (error) {
      console.error("Failed to fetch invites", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
    const intervalId = setInterval(fetchInvites, 15000); // 15s polling
    return () => clearInterval(intervalId);
  }, []);

  const handleAccept = async (id) => {
    try {
      await userService.acceptInvite(id);
      setInvitations((prev) => prev.filter((i) => i._id !== id));
      toast.success("Project invitation accepted!");
      // Optionally trigger a global refetch of projects here if there's a projects context
    } catch (error) {
      toast.error(error.message || "Failed to accept invite");
    }
  };

  const handleDecline = async (id) => {
    try {
      await userService.declineInvite(id);
      setInvitations((prev) => prev.filter((i) => i._id !== id));
      toast.success("Project invitation declined.");
    } catch (error) {
      toast.error(error.message || "Failed to decline invite");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-3xl flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

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
              key={inv._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-slate-200 bg-white shadow-sm gap-4 hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={inv.invitedBy?.profile || "https://res.cloudinary.com/ddhjov3eb/image/upload/v1771834493/default-profile_bag8or.png"}
                  alt={inv.invitedBy?.fullName || "User"}
                  className="w-12 h-12 rounded-full bg-slate-100 ring-4 ring-slate-50 object-cover"
                />
                <div>
                  <p className="text-sm text-slate-600">
                    <span className="font-bold text-slate-900">
                      {inv.invitedBy?.fullName || "A team member"}
                    </span>{" "}
                    invited you to join
                  </p>
                  <p className="text-lg font-bold text-indigo-600 leading-tight mt-0.5">
                    {inv.project?.title || "a project"}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs font-medium">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      Role: {inv.role || "team"}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">
                      {new Date(inv.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:shrink-0 pt-2 border-t border-slate-100 sm:border-0 sm:pt-0 mt-2 sm:mt-0">
                <button
                  type="button"
                  onClick={() => handleDecline(inv._id)}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => handleAccept(inv._id)}
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
