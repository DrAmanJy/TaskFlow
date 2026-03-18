import { sendResponse } from "../utils/sendResponse.js";
import * as userService from "../services/userService.js";

export const getUserInfo = (req, res) => {
  return sendResponse(res, 200, req.user);
};

export const getInvites = async (req, res) => {
  const invites = await userService.getPendingInvites(req.user._id);
  return sendResponse(res, 200, invites);
};

export const acceptInvite = async (req, res) => {
  const result = await userService.acceptInvite(req.params.inviteId, req.user._id);
  return sendResponse(res, 200, result);
};

export const declineInvite = async (req, res) => {
  const result = await userService.declineInvite(req.params.inviteId, req.user._id);
  return sendResponse(res, 200, result);
};

export const updateMe = async (req, res) => {
  const result = await userService.updateUser(req.user._id, req.body);
  return sendResponse(res, 200, result, "Profile updated successfully");
};
