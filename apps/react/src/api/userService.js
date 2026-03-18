import { apiClient } from "./apiClient";

export const userService = {
  getInvites: () => apiClient("/user/invites"),
  
  acceptInvite: (inviteId) =>
    apiClient(`/user/invites/${inviteId}/accept`, {
      method: "POST",
    }),

  declineInvite: (inviteId) =>
    apiClient(`/user/invites/${inviteId}/decline`, {
      method: "POST",
    }),
    
  updateProfile: (data) =>
    apiClient("/user/update-me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
