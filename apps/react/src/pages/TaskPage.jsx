import React, { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { TaskColumn } from "../components/tasks/TaskColumn";
import { useTask } from "../context/TaskContext";
import TaskForm from "../components/ui/TaskForm";

export default function GlobalTaskBoard() {
  const { tasks, moveTask, searchTasks } = useTask();
  console.log("tasks", tasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const columns = [
    { id: "todo", title: "To Do", color: "border-slate-300" },
    { id: "in-progress", title: "In Progress", color: "border-indigo-400" },
    { id: "done", title: "Done", color: "border-emerald-400" },
  ];

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

  const handleDrop = async (e, columnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);

    if (task && task.status !== columnId) {
      await moveTask(taskId, { status: columnId });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
      <PageHeader
        title="All Tasks"
        placeholder="Search tasks..."
        buttonText="Create Task"
        onSearch={searchTasks}
        onAction={() => setShowTaskForm(true)}
      />

      <main className="flex-1 overflow-y-auto lg:overflow-x-auto lg:overflow-y-hidden p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-full items-start lg:min-w-max pb-8 lg:pb-0">
          {columns.map((column) => {
            const columnTasks = tasks.filter((t) => t.status === column.id);

            return (
              <TaskColumn
                key={column.id}
                column={column}
                columnTasks={columnTasks}
                draggedTaskId={draggedTaskId}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
