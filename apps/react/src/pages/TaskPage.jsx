import React, { useState } from "react";
import { TaskBoardHeader } from "../components/tasks/TaskBoardHeader";
import { TaskColumn } from "../components/tasks/TaskColumn";

// Mock Data
const initialTasks = [
  {
    id: "task_88b2c1",
    projectId: "proj_1",
    projectName: "Rust Plugin Engine",
    title: "Configure Rust Server Plugins",
    description:
      "Install and configure Oxide and essential plugins for the game server.",
    status: "in-progress",
    priority: "high",
    assignedTo: {
      id: "69a7d90bb1",
      fullName: "Jyoti Dhull",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jyoti",
    },
    createdAt: "2026-03-05T10:00:00.000Z",
    comments: 3,
    attachments: 1,
  },
  {
    id: "task_99x3d4",
    projectId: "proj_2",
    projectName: "Testing 1",
    title: "Design Database Schema",
    description:
      "Draft the initial MongoDB collections for Users, Tasks, and Projects.",
    status: "todo",
    priority: "medium",
    assignedTo: {
      id: "69a7d90bb2",
      fullName: "Aman Lathar",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
    },
    createdAt: "2026-03-04T14:30:00.000Z",
    comments: 5,
    attachments: 0,
  },
  {
    id: "task_77y2b1",
    projectId: "proj_2",
    projectName: "Testing 1",
    title: "Setup CI/CD Pipeline",
    description:
      "Configure GitHub actions for automated testing and deployment.",
    status: "todo",
    priority: "high",
    assignedTo: {
      id: "69a7d90bb3",
      fullName: "Sandeep R.",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sandeep",
    },
    createdAt: "2026-03-06T09:15:00.000Z",
    comments: 0,
    attachments: 2,
  },
  {
    id: "task_11a4c9",
    projectId: "proj_3",
    projectName: "Marketing Site",
    title: "Initialize React Repository",
    description:
      "Scaffold the Vite React app with TailwindCSS and Lucide Icons.",
    status: "done",
    priority: "low",
    assignedTo: {
      id: "69a7d90bb2",
      fullName: "Aman Lathar",
      profile: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
    },
    createdAt: "2026-03-01T11:00:00.000Z",
    comments: 1,
    attachments: 0,
  },
];

export default function GlobalTaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [loadingTasks, setLoadingTasks] = useState({});
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const columns = [
    { id: "todo", title: "To Do", color: "border-slate-300" },
    { id: "in-progress", title: "In Progress", color: "border-indigo-400" },
    { id: "done", title: "Done", color: "border-emerald-400" },
  ];

  // --- HTML5 Drag and Drop Handlers ---
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
      const el = document.getElementById(`task-${taskId}`);
      if (el) el.classList.add("opacity-50");
    }, 0);
  };

  const handleDragEnd = (e, taskId) => {
    setDraggedTaskId(null);
    const el = document.getElementById(`task-${taskId}`);
    if (el) el.classList.remove("opacity-50");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);

    if (task && task.status !== columnId) {
      setLoadingTasks((prev) => ({ ...prev, [taskId]: true }));
      setTimeout(() => {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, status: columnId } : t)),
        );
        setLoadingTasks((prev) => ({ ...prev, [taskId]: false }));
      }, 1000);
    }
  };

  const activeProjectsCount = new Set(tasks.map((t) => t.projectId)).size;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <TaskBoardHeader />

      <main className="flex-1 overflow-y-auto lg:overflow-x-auto lg:overflow-y-hidden p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-full items-start lg:min-w-max pb-8 lg:pb-0">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              columnTasks={tasks.filter((t) => t.status === column.id)}
              loadingTasks={loadingTasks}
              draggedTaskId={draggedTaskId}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
