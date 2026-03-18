import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Palette,
  Save,
  Loader2,
  CheckCircle2,
  UserPlus,
} from "lucide-react";

// Import our new components
import { SettingsSidebar } from "../components/settings/SettingsSidebar";
import { ProfileTab } from "../components/settings/ProfileTab";
import { SecurityTab } from "../components/settings/SecurityTab";
import { InvitationsTab } from "../components/settings/InvitationsTab";
import { NotificationsTab } from "../components/settings/NotificationsTab";
import { AppearanceTab } from "../components/settings/AppearanceTab";

import { useAuth } from "../context/authContext";
import { userService } from "../api/userService";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user: currentUser, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [theme, setTheme] = useState("system");

  // Form States
  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    title: currentUser?.jobTitle || "",
    profileImage: null,
  });

  const [invitations, setInvitations] = useState([
    {
      id: "inv_1",
      projectName: "Marketing Site",
      role: "Developer",
      invitedBy: {
        fullName: "Jyoti Dhull",
        profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jyoti",
      },
      date: "5 hours ago",
    },
    {
      id: "inv_2",
      projectName: "Backend API V2",
      role: "Admin",
      invitedBy: {
        fullName: "Sandeep R.",
        profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sandeep",
      },
      date: "2 days ago",
    },
  ]);

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyDigest: true,
    taskMentions: true,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setShowSuccess(false);

    try {
      await userService.updateProfile({
        ...profileData,
        jobTitle: profileData.title
      });
      await refreshProfile();
      toast.success("Profile updated successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      toast.error(err.message || "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    {
      id: "profile",
      label: "My Profile",
      icon: User,
      description: "Manage your personal information",
    },
    // {
    //   id: "security",
    //   label: "Security",
    //   icon: Lock,
    //   description: "Password and authentication",
    // },
    {
      id: "invitations",
      label: "Invitations",
      icon: UserPlus,
      description: "Manage project invites",
    },
    // {
    //   id: "notifications",
    //   label: "Notifications",
    //   icon: Bell,
    //   description: "Control your alert preferences",
    // },
    // {
    //   id: "appearance",
    //   label: "Appearance",
    //   icon: Palette,
    //   description: "Customize the workspace UI",
    // },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Page Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Account Settings
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your profile, security, and workspace preferences.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Extracted Navigation Sidebar */}
          <SettingsSidebar
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Settings Content Area */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
            {/* Header for Active Tab */}
            <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {tabs.find((t) => t.id === activeTab)?.description}
                </p>
              </div>

              {/* Success Toast / Indicator */}
              <div
                className={`flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${showSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Saved successfully
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSave}>
                {/* Dynamically Render the Active Tab Content */}
                {activeTab === "profile" && (
                  <ProfileTab
                    profileData={profileData}
                    setProfileData={setProfileData}
                    currentUser={currentUser}
                  />
                )}
                {activeTab === "security" && <SecurityTab />}
                {activeTab === "invitations" && (
                  <InvitationsTab
                    invitations={invitations}
                    setInvitations={setInvitations}
                  />
                )}
                {activeTab === "notifications" && (
                  <NotificationsTab
                    notifications={notifications}
                    setNotifications={setNotifications}
                  />
                )}
                {activeTab === "appearance" && (
                  <AppearanceTab theme={theme} setTheme={setTheme} />
                )}

                {/* Common Save Button (Hidden on Invitations) */}
                {activeTab !== "invitations" && (
                  <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-70"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
