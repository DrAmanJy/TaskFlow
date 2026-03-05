import { createBrowserRouter, Navigate } from "react-router-dom";

// Public Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ArchitecturePage from "./pages/ArchitecturePage";

// Dashboard Pages
// import DashboardLayout from "./components/DashboardLayout";
// import DashboardHome from "./pages/DashboardHome";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import TaskPage from "./pages/TaskPage";
import Settings from "./pages/Settings";
import PublicLayout from "./components/layout/PublicLayout";
import AuthPage from "./pages/AuthPage";
import DashboardLayout from "./components/layout/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
// import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/architecture", element: <ArchitecturePage /> },
      { path: "/login", element: <AuthPage /> },
      { path: "/register", element: <AuthPage /> },
    ],
  },

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <DashboardHome /> },
      // { path: "/projects", element: <Projects /> },
      // { path: "projects/:id", element: <Project /> },
      // { path: "tasks/:id", element: <TaskPage /> },
      // { path: "settings", element: <Settings /> },
    ],
  },
]);

export default router;
