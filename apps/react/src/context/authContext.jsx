import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const register = async (userInfo) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }

      setUser(data.user);
      return { success: true, message: data.message };
    } catch (e) {
      return { success: false, message: "Network error, please try again" };
    }
  };

  const login = async (userInfo) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }

      setUser(data.user);
      return { success: true, message: data.message };
    } catch (e) {
      return { success: false, message: "Network error, please try again" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
