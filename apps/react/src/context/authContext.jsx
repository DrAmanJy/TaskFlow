import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../api/authService";
import toast from "react-hot-toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
    window.location.href = "/login";
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const result = await authService.getProfile();
          setUser(result.data);
        } catch (err) {
          // localStorage.removeItem("accessToken");
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
};
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
