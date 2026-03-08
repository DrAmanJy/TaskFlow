import React from "react";
import { Users } from "lucide-react";

export const TeamSidebar = ({ projectData }) => {
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
              className="w-9 h-9 rounded-full bg-slate-100"
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
                className="w-9 h-9 rounded-full bg-slate-100"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {member.fullName}
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition-colors">
          + Invite Member
        </button>
      </div>
    </div>
  );
};
