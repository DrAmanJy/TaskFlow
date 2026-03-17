import React from "react";
import { Toggle } from "../ui-a/Toggle";

export const NotificationsTab = ({ notifications, setNotifications }) => {
  return (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          Email Notifications
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">Email Alerts</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Receive an email when you are assigned a new task.
            </p>
          </div>
          <Toggle
            enabled={notifications.emailAlerts}
            onChange={() =>
              setNotifications({
                ...notifications,
                emailAlerts: !notifications.emailAlerts,
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">Weekly Digest</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Receive a weekly summary of workspace activity.
            </p>
          </div>
          <Toggle
            enabled={notifications.weeklyDigest}
            onChange={() =>
              setNotifications({
                ...notifications,
                weeklyDigest: !notifications.weeklyDigest,
              })
            }
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
          In-App Notifications
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">Push Notifications</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Receive browser push notifications for important updates.
            </p>
          </div>
          <Toggle
            enabled={notifications.pushNotifications}
            onChange={() =>
              setNotifications({
                ...notifications,
                pushNotifications: !notifications.pushNotifications,
              })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800">Mentions & Replies</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Notify me when someone tags me in a chat or comment.
            </p>
          </div>
          <Toggle
            enabled={notifications.taskMentions}
            onChange={() =>
              setNotifications({
                ...notifications,
                taskMentions: !notifications.taskMentions,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
