import { isValidObjectId } from "mongoose";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { validateIds } from "../utils/idValidator.js";
import Project from "../models/Project.js";
import { uploadImage } from "../utils/cloudinary.js";

const findUserOrThrow = async (userId) => {
  validateIds({ User: userId });
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found with the provided ID", 404);
  }
  return user;
};

// Auth functions migrated to authService.js

export const updateUser = async (userId, updateData) => {
  validateIds({ User: userId });
  const user = await findUserOrThrow(userId);

  if (updateData.email) {
    const emailExists = await User.findOne({
      email: updateData.email.toLowerCase(),
      _id: { $ne: userId },
    });
    if (emailExists) throw new AppError("Email is already taken", 400);
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "jobTitle",
    "email",
  ];
  const filteredData = {};

  Object.keys(updateData).forEach((key) => {
    if (allowedFields.includes(key)) filteredData[key] = updateData[key];
  });

  if (updateData.profileImage && updateData.profileImage.startsWith("data:image")) {
    filteredData.profile = await uploadImage(updateData.profileImage);
  }

  Object.assign(user, filteredData);

  await user.save();
  return user;
};

export const deleteUser = async (userId) => {
  validateIds({ User: userId });
  const user = await findUserOrThrow(userId);
  await User.findByIdAndDelete(userId);
  await Project.updateMany({ team: userId }, { $pull: { team: userId } });
  return { message: "User deleted successfully" };
};

export const findUserById = async (userId) => {
  return await findUserOrThrow(userId);
};

export const findUserByEmail = async (userEmail) => {
  if (!userEmail) throw new AppError("Email is required for search", 400);

  const user = await User.findOne({ email: userEmail.toLowerCase() });

  if (!user) {
    throw new AppError("No user found with this email address", 404);
  }

  return user;
};

export const getPendingInvites = async (userId) => {
  const user = await User.findById(userId)
    .populate("invites.project", "title icon status")
    .populate("invites.invitedBy", "firstName lastName profile");
  
  if (!user) throw new AppError("User not found", 404);

  return user.invites.filter(invite => invite.status === "pending");
};

export const acceptInvite = async (inviteId, userId) => {
  const user = await findUserOrThrow(userId);
  const invite = user.invites.id(inviteId);
  if (!invite) throw new AppError("Invite not found", 404);

  if (invite.status !== "pending") {
    throw new AppError("Invite is no longer pending", 400);
  }

  await Project.findByIdAndUpdate(invite.project, {
    $addToSet: { team: userId }
  });

  invite.status = "accepted";
  await user.save();
  
  return { message: "Invitation accepted successfully" };
};

export const declineInvite = async (inviteId, userId) => {
  const user = await findUserOrThrow(userId);
  const invite = user.invites.id(inviteId);
  if (!invite) throw new AppError("Invite not found", 404);

  if (invite.status !== "pending") {
    throw new AppError("Invite is no longer pending", 400);
  }

  invite.status = "declined";
  await user.save();
  
  return { message: "Invitation declined" };
};
