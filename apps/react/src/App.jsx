import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthProvider from "./context/authContext";
import { ProjectProvider } from "./context/ProjectContext"; //
import { TaskProvider } from "./context/TaskContext";

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <TaskProvider>
          <Toaster position="top-right" />
          <RouterProvider router={router} />
        </TaskProvider>
      </ProjectProvider>
    </AuthProvider>
  );
}
