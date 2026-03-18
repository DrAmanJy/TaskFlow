import { apiClient } from "./apiClient";

export const TaskService = {
  createTask: (data) =>
    apiClient("/tasks", { method: "POST", body: JSON.stringify(data) }),

  search: (query) => apiClient(`/tasks/search?q=${query}`),

  getUserTask: () => apiClient("/tasks"),

  getTaskById: (taskId) => apiClient(`/tasks/${taskId}`),

  getTaskByProjectId: (projectId) => apiClient(`/tasks/projects/${projectId}`),

  updateTask: (taskId, data) =>
    apiClient(`/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteTask: (taskId) =>
    apiClient(`/tasks/${taskId}`, {
      method: "DELETE",
    }),

  moveTask: (taskId, data) =>
    apiClient(`/tasks/${taskId}/status`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  assignTask: (taskId, assigneeId) =>
    apiClient(`/tasks/${taskId}/assign`, {
      method: "PATCH",
      body: JSON.stringify({ assigneeId }),
    }),
};
