import { apiClient } from "./apiClient";

export const chatService = {
  getMessages: (taskId) => apiClient(`/chat${taskId}`),

  sendMessage: (taskId, data) =>
    apiClient(`/chat/${taskId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  editMessage: (messageId, data) =>
    apiClient(`/chat/${messageId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteMessage: (messageId) =>
    apiClient(`/chat/${messageId}`, {
      method: "DELETE",
    }),
};
