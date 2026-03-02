import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import TaskCard from "../components/TaskCard";
import TaskColumn from "../components/TaskColumn";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm"; // Make sure this is imported!
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

export default function Home() {
  const { isLogin } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]); // NEW: State to hold projects
  const [loading, setLoading] = useState(true);
  const [showTaskFormModal, setShowTaskFormModal] = useState(false);

  useEffect(() => {
    if (!isLogin) return;

    const fetchData = async () => {
      try {
        // Fetch both Tasks AND Projects at the same time for maximum speed!
        const [tasksRes, projectsRes] = await Promise.all([
          fetch("http://localhost:3000/api/tasks", { credentials: "include" }),
          fetch("http://localhost:3000/api/projects", {
            credentials: "include",
          }),
        ]);

        const tasksData = await tasksRes.json();
        const projectsData = await projectsRes.json();

        if (!tasksRes.ok)
          toast.error(tasksData.message || "Failed to fetch tasks");
        if (!projectsRes.ok)
          toast.error(projectsData.message || "Failed to fetch projects");

        if (tasksRes.ok) setTasks(tasksData.tasks);
        if (projectsRes.ok) setProjects(projectsData.projects); // Assuming your API sends { projects: [...] }
      } catch (error) {
        console.error("Network error:", error);
        toast.error("A network error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLogin]);

  const todoTask = tasks.filter((task) => task.status === "todo");
  const inProgressTask = tasks.filter((task) => task.status === "in-progress");
  const completedTask = tasks.filter(
    (task) => task.status === "done" || task.status === "completed",
  );

  return (
    <main className="flex-1 flex flex-col h-full">
      <Header
        title={"All Tasks"}
        btnLabel={"Create Task"}
        btnAction={() => setShowTaskFormModal(true)}
      >
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-64 py-2 pl-9 pr-4 text-sm bg-gray-100 border-transparent rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
          />
        </div>
      </Header>

      {showTaskFormModal && (
        <TaskForm
          projects={projects}
          onClose={() => setShowTaskFormModal(false)}
          onSuccess={(newTask) => setTasks([newTask, ...tasks])}
        />
      )}

      <div className="p-6 flex-1 overflow-x-auto flex items-start gap-6">
        {loading ? (
          <div className="w-full text-center text-gray-500 py-10">
            Loading tasks...
          </div>
        ) : (
          <>
            <TaskColumn
              taskLength={todoTask.length}
              btnLabel={"Add Task"}
              label={"To Do"}
              dotColor={"bg-gray-400"}
            >
              {todoTask.map((task) => (
                <TaskCard key={task._id || task.id} task={task} />
              ))}
            </TaskColumn>

            <TaskColumn
              taskLength={inProgressTask.length}
              btnLabel={"Add Task"}
              label={"In Progress"}
              dotColor={"bg-blue-500"}
            >
              {inProgressTask.map((task) => (
                <TaskCard key={task._id || task.id} task={task} />
              ))}
            </TaskColumn>

            <TaskColumn
              taskLength={completedTask.length}
              label={"Done"}
              dotColor={"bg-green-400"}
            >
              {completedTask.map((task) => (
                <TaskCard key={task._id || task.id} task={task} />
              ))}
            </TaskColumn>
          </>
        )}
      </div>
    </main>
  );
}
