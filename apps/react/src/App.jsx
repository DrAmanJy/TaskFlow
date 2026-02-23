import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthProvider from "./context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}
