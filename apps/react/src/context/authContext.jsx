import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../api/authService";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (credentials) => {
    try {
      const result = await authService.login(credentials);
      localStorage.setItem("accessToken", result.accessToken);
      setUser(result.data);
      toast.success(`Welcome ${result.data?.fullName}`);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const register = async (credentials) => {
    try {
      const result = await authService.register(credentials);
      localStorage.setItem("accessToken", result.accessToken);
      setUser(result.data);
      toast.success(`Welcome ${result.data?.fullName}`);
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    window.location.href = "/auth?mode=login";
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const result = await authService.getProfile();
          setUser(result.data);
        } catch {
          localStorage.removeItem("accessToken");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
