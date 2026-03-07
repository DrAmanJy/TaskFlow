import React from "react";
import { Camera } from "lucide-react";

export const ProfileTab = ({ profileData, setProfileData, currentUser }) => {
  return (
    <div className="space-y-8 max-w-2xl">
      {/* Avatar Upload Section */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden ring-1 ring-slate-200">
            <img
              src={currentUser.profile}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-colors border-2 border-white"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Profile Picture</h3>
          <p className="text-xs text-slate-500 mb-3 max-w-xs mt-1">
            PNG, JPG or GIF. Maximum file size 2MB. Recommended 256x256px.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg"
            >
              Upload New
            </button>
            <button
              type="button"
              className="text-sm font-medium text-slate-500 hover:text-red-600 px-3 py-1.5 rounded-lg"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-100 w-full"></div>

      {/* Personal Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            First Name
          </label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData({ ...profileData, firstName: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Last Name
          </label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData({ ...profileData, lastName: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold text-slate-700">
            Job Title
          </label>
          <input
            type="text"
            value={profileData.title}
            onChange={(e) =>
              setProfileData({ ...profileData, title: e.target.value })
            }
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
};
