import { createBrowserRouter, Navigate } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/LandingPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import AboutPage from "./pages/AboutPage";

// Dashboard Pages

import GlobalTaskBoard from "./pages/TaskPage";
import SettingsPage from "./pages/SettingsPage";
import PublicLayout from "./components/layout/PublicLayout";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import ProjectsPage from "./pages/ProjectsPage";
import SingleProjectPage from "./pages/SingleProjectPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/architecture", element: <ArchitecturePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/auth", element: <AuthPage /> },
    ],
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <DashboardHome /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:projectId", element: <SingleProjectPage /> },
      { path: "/tasks", element: <GlobalTaskBoard /> },
      { path: "/tasks/:taskId", element: <TaskDetailsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

export default router;
