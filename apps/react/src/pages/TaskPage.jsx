import React, { useState, useEffect, useRef } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { TaskColumn } from "../components/tasks/TaskColumn";
import { useTask } from "../context/TaskContext";
import TaskForm from "../components/ui/TaskForm";
import { Loader2 } from "lucide-react";

export default function GlobalTaskBoard() {
  const { tasks, moveTask, searchTasks, status } = useTask();
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      searchTasks(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchTasks]);

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

  const handleDrop = async (e, columnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const targetColumnTasks = tasks
      .filter((t) => t.status === columnId)
      .sort((a, b) => (a.position || 0) - (b.position || 0));

    const maxPosition =
      targetColumnTasks.length > 0
        ? Math.max(...targetColumnTasks.map((t) => t.position || 0))
        : -1;

    const newPosition = maxPosition + 1;

    if (task.status !== columnId) {
      await moveTask(taskId, { status: columnId, position: newPosition });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
      <PageHeader
        title="All Tasks"
        placeholder="Search tasks..."
        buttonText="Create Task"
        onButtonClick={() => setShowTaskForm(true)}
        onSearchChange={setSearchTerm}
        searching={status?.searching}
      />
      <main className="flex-1 relative overflow-y-auto lg:overflow-x-auto lg:overflow-y-hidden p-4 sm:p-6">
        {status?.searching && (
          <div className="absolute inset-0 z-20 bg-slate-50/40 backdrop-blur-[1px] flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600 w-10 h-10" />
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-6 lg:h-full items-start lg:min-w-max pb-8 lg:pb-0">
          {columns.map((column) => {
            const columnTasks = tasks
              .filter((t) => t.status === column.id)
              .sort((a, b) => (a.position || 0) - (b.position || 0));

            return (
              <TaskColumn
                key={column.id}
                column={column}
                columnTasks={columnTasks}
                draggedTaskId={draggedTaskId}
                onDragOver={(e) => e.preventDefault()}
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
