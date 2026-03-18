import { apiClient } from "./apiClient";

export const projectService = {
  create: (data) =>
    apiClient("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  search: (query) => apiClient(`/projects/search?q=${query}`),

  getAll: () => apiClient("/projects"),

  getById: (id) => apiClient(`/projects/${id}`),

  updateById: (id, data) =>
    apiClient(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteById: (id) => apiClient(`/projects/${id}`, { method: "DELETE" }),

  inviteTeam: (id, email) =>
    apiClient(`/projects/${id}/members/invite`, {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  removeTeam: (id, email) =>
    apiClient(`/projects/${id}/members/remove`, {
      method: "PATCH",
      body: JSON.stringify({ email }),
    }),

  leaveTeam: (id) =>
    apiClient(`/projects/${id}/members/leave`, {
      method: "PATCH",
    }),
};
