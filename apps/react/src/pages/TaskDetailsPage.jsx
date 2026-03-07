import React, { useState, useEffect, useRef } from "react";
import { Edit2, Save } from "lucide-react";

import { TaskHeader } from "../components/tasks/TaskHeader";
import { TaskDetailsSidebar } from "../components/tasks/TaskDetailsSidebar";
import { ChatArea } from "../components/tasks/ChatArea";

// Mock Data
const initialTask = {
  id: "task_88b2c1",
  projectId: "69a7d9e5b8ab5190818cc17d",
  projectName: "Rust Plugin Engine",
  title: "Configure Rust Server Plugins",
  description:
    "Install and configure Oxide and essential plugins for the game server. Ensure all permissions are set correctly for the admin group and testing kits are available.",
  status: "in-progress",
  priority: "high",
  assignedTo: {
    id: "69a7d90bb2",
    fullName: "Jyoti Dhull",
    profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jyoti",
  },
  createdAt: "2026-03-05T10:00:00.000Z",
  attachments: [
    { id: "att_1", name: "oxide_config.pdf", size: "1.2 MB", type: "pdf" },
    { id: "att_2", name: "manifest.json", size: "45 KB", type: "code" },
  ],
};

const initialMessages = [
  {
    id: "msg_1",
    sender: {
      id: "69a7d90bb1",
      fullName: "Aman Lathar",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
    },
    content: "The new survival map is generated and ready for testing.",
    timestamp: "2026-03-05T14:30:22.000Z",
  },
  {
    id: "msg_2",
    sender: {
      id: "69a7d90bb2",
      fullName: "Jyoti Dhull",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jyoti",
    },
    content: "Great! Working on the plugins now.",
    timestamp: "2026-03-05T14:45:10.000Z",
  },
];

const currentUserId = "69a7d90bb1";

export default function TaskDetailsPage() {
  const [task, setTask] = useState(initialTask);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    title: initialTask.title,
    description: initialTask.description,
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now().toString(),
      sender: {
        id: currentUserId,
        fullName: "Aman Lathar",
        profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
      },
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const handleSaveEdit = () => {
    setTask({
      ...task,
      title: editForm.title,
      description: editForm.description,
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-900 overflow-hidden font-sans">
      <TaskHeader task={task} onEditClick={() => setIsEditing(true)} />

      <div className="flex flex-1 overflow-hidden">
        <TaskDetailsSidebar task={task} />

        <ChatArea
          messages={messages}
          currentUserId={currentUserId}
          chatEndRef={chatEndRef}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl border border-slate-100 m-4">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900">
              <Edit2 size={18} className="text-indigo-600" /> Edit Task Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Task Title
                </label>
                <input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 rounded-xl px-4 py-2.5 text-sm outline-none transition-all font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="w-full border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none text-slate-600 leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center gap-2 text-sm shadow-sm transition-colors"
              >
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
