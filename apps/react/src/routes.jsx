import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Project from "./pages/Project";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:id", element: <Project /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <SignupPage /> },
]);
export default router;
