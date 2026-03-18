import React, { useState } from "react";
import { Users, Mail } from "lucide-react";
import { projectService } from "../../api/projectService";
import toast from "react-hot-toast";

export const TeamSidebar = ({ projectData }) => {
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setSubmitting(true);
    try {
      await projectService.inviteTeam(projectData.id || projectData._id, inviteEmail);
      toast.success("Invitation sent successfully!");
      setInviteEmail("");
      setIsInviting(false);
    } catch (error) {
      toast.error(error.message || "Failed to send invitation");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" /> Team
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={projectData.createdBy?.profile}
              alt="Creator"
              className="w-9 h-9 rounded-full bg-slate-100 object-cover"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">
                {projectData.createdBy?.fullName}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">
                Admin
              </p>
            </div>
          </div>

          {projectData?.team?.map((member, i) => (
            <div key={i} className="flex items-center gap-3">
              <img
                src={member.profile}
                alt="Avatar"
                className="w-9 h-9 rounded-full bg-slate-100 object-cover"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {member.fullName}
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">
                  {member.role || "Team"}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {isInviting ? (
          <form onSubmit={handleInvite} className="mt-6 flex flex-col gap-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="Email address..."
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-700 placeholder:font-medium outline-none"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send"}
              </button>
              <button
                type="button"
                onClick={() => setIsInviting(false)}
                className="px-4 py-2 border border-slate-200 text-slate-500 rounded-xl hover:bg-slate-50 font-bold text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button 
            onClick={() => setIsInviting(true)}
            className="w-full mt-6 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors"
          >
            + Invite Member
          </button>
        )}
      </div>
    </div>
  );
};
