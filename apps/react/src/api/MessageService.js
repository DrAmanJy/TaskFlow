import { apiClient } from "./apiClient";

export const MessageService = {
  /**
   * Fetch all messages for a specific task
   * Route: GET /messages/:taskId
   */
  getMessages: (taskId) => apiClient(`/chat/${taskId}`),

  /**
   * Send a new message to a specific task
   * Route: POST /messages/:taskId
   */
  sendMessage: (taskId, data) =>
    apiClient(`/chat/${taskId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /**
   * Edit an existing message
   * Route: PATCH /messages/:id
   */
  editMessage: (messageId, data) =>
    apiClient(`/chat/${messageId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  /**
   * Delete a specific message
   * Route: DELETE /messages/:id
   */
  deleteMessage: (messageId) =>
    apiClient(`/chat/${messageId}`, {
      method: "DELETE",
    }),
};
