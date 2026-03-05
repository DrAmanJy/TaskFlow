import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import TaskCard from "../components/TaskCard";
import TaskColumn from "../components/TaskColumn";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm"; // Make sure this is imported!
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import Hero from "../components/sections/Hero";
import FeatureSection from "../components/sections/FeatureSection";
import CTASection from "../components/sections/CTASection";

export default function Home() {
  // const { isLogin } = useAuth();
  // const [tasks, setTasks] = useState([]);
  // const [projects, setProjects] = useState([]); // NEW: State to hold projects
  // const [loading, setLoading] = useState(true);
  // const [showTaskFormModal, setShowTaskFormModal] = useState(false);

  // useEffect(() => {
  //   if (!isLogin) return;

  //   const fetchData = async () => {
  //     try {
  //       // Fetch both Tasks AND Projects at the same time for maximum speed!
  //       const [tasksRes, projectsRes] = await Promise.all([
  //         fetch("http://localhost:3000/api/tasks", { credentials: "include" }),
  //         fetch("http://localhost:3000/api/projects", {
  //           credentials: "include",
  //         }),
  //       ]);

  //       const tasksData = await tasksRes.json();
  //       const projectsData = await projectsRes.json();

  //       if (!tasksRes.ok)
  //         toast.error(tasksData.message || "Failed to fetch tasks");
  //       if (!projectsRes.ok)
  //         toast.error(projectsData.message || "Failed to fetch projects");

  //       if (tasksRes.ok) setTasks(tasksData.tasks);
  //       if (projectsRes.ok) setProjects(projectsData.projects); // Assuming your API sends { projects: [...] }
  //     } catch (error) {
  //       console.error("Network error:", error);
  //       toast.error("A network error occurred.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [isLogin]);

  // const todoTask = tasks.filter((task) => task.status === "todo");
  // const inProgressTask = tasks.filter((task) => task.status === "in-progress");
  // const completedTask = tasks.filter(
  //   (task) => task.status === "done" || task.status === "completed",
  // );

  return (
    <>
      <Hero />
      <FeatureSection />
      <CTASection />
    </>
  );
}
