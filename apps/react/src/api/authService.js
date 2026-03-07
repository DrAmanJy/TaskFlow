import { apiClient } from "./apiClient";

export const authService = {
  login: (credentials) =>
    apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      credentials: "include",
    }),

  register: (userData) =>
    apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
    }),

  logout: (userData) =>
    apiClient("/auth/logout", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  getProfile: () => apiClient("/user/me"),
};
