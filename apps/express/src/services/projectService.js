import mongoose from "mongoose";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";
import { validateIds } from "../utils/idValidator.js";
import { findUserByEmail, findUserById } from "./userService.js";

const idOf = (ref) => {
  if (!ref) return null;
  if (typeof ref === "string") return ref;
  if (ref._id) return ref._id.toString();
  return ref.toString();
};

export const getProjectsForUser = async (userId) => {
  validateIds({ User: userId });
  return await Project.find({ team: userId })
    .populate("createdBy", "firstName lastName profile")
    .populate("team", "firstName lastName profile")
    .sort({ createdAt: -1 });
};

export const getProjectById = async (projectId, userId) => {
  validateIds({ Project: projectId, User: userId });

  const project = await Project.findById(projectId)
    .populate("createdBy", "firstName lastName profile")
    .populate("team", "firstName lastName profile");

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isMember = project.team.some((member) => idOf(member) === idOf(userId));

  if (!isMember) {
    throw new AppError("Not authorized to read this project", 403);
  }

  return project;
};

export const createNewProject = async (projectData, userId) => {
  validateIds({ User: userId });
  const {
    title,
    description = "",
    status = "todo",
    icon = "folder",
  } = projectData;

  if (!title || String(title).trim() === "") {
    throw new AppError("Title is required", 400);
  }

  return await Project.create({
    title: String(title).trim(),
    description: String(description).trim(),
    status,
    icon,
    createdBy: userId,
    team: [userId],
  });
};

export const updateProjectDetails = async (projectId, updateData, userId) => {
  const project = await findProjectOrThrow(projectId);
  checkProjectOwnership(project, userId);

  const allowedUpdates = ["title", "description", "status", "icon"];
  const updates = {};

  for (const key of Object.keys(updateData || {})) {
    if (allowedUpdates.includes(key) && updateData[key] !== undefined) {
      updates[key] = updateData[key];
    }
  }

  const updated = await Project.findByIdAndUpdate(
    projectId,
    { $set: updates },
    { new: true, runValidators: true },
  )
    .populate("createdBy", "firstName lastName profile")
    .populate("team", "firstName lastName profile");

  if (!updated) {
    throw new AppError("Project not found after update", 404);
  }
  return updated;
};

export const removeProject = async (
  projectId,
  userId,
  { cascadeDeleteTasks = false } = {},
) => {
  validateIds({ User: userId });
  const project = await findProjectOrThrow(projectId);
  checkProjectOwnership(project, userId);

  if (cascadeDeleteTasks) {
    await Task.deleteMany({ project: projectId });
  }

  await project.deleteOne();
  return { message: "Project deleted successfully" };
};

export const addTeamMember = async (userEmail, projectId, requesterId) => {
  const project = await findProjectOrThrow(projectId);
  checkProjectOwnership(project, requesterId);

  const userToAdd = await findUserByEmail(userEmail);
  const userToAddId = userToAdd._id.toString();

  if (project.createdBy.toString() === userToAddId) {
    throw new AppError("You are already the owner of this project", 400);
  }

  const isAlreadyMember = project.team.some(
    (memberId) => memberId.toString() === userToAddId,
  );

  if (isAlreadyMember) {
    throw new AppError("User is already a member of this project", 400);
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $addToSet: { team: userToAdd._id } },
    { new: true },
  ).populate("team", "firstName lastName profile email");

  return updatedProject;
};

export const removeTeamMember = async (userEmail, projectId, requesterId) => {
  const project = await findProjectOrThrow(projectId);

  checkProjectOwnership(project, requesterId);

  const userToRemove = await findUserByEmail(userEmail);
  const userToRemoveId = userToRemove._id.toString();

  if (project.createdBy.toString() === userToRemoveId) {
    throw new AppError("Owner cannot be removed from the project", 400);
  }

  const isMember = project.team.some(
    (memberId) => memberId.toString() === userToRemoveId,
  );

  if (!isMember) {
    throw new AppError("User is not a member of this project", 400);
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $pull: { team: userToRemove._id } },
    { new: true },
  ).populate("team", "firstName lastName profile email");

  await Task.updateMany(
    { project: projectId },
    { $pull: { assignee: { userId: userToRemove._id } } },
  );
  return updatedProject;
};

export const leaveProject = async (projectId, userId) => {
  const project = await findProjectOrThrow(projectId);
  const userIdStr = userId.toString();

  if (project.createdBy.toString() === userIdStr) {
    throw new AppError("Owner cannot leave the project.", 400);
  }

  const isMember = project.team.some(
    (memberId) => memberId.toString() === userIdStr,
  );

  if (!isMember) {
    throw new AppError("You are not a member of this project", 400);
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $pull: { team: userId } },
    { new: true },
  ).populate("team", "firstName lastName profile email");

  await Task.updateMany(
    { project: projectId },
    { $pull: { assignee: { userId: userId } } },
  );

  return updatedProject;
};

const findProjectOrThrow = async (projectId) => {
  validateIds({ Project: projectId });
  const project = await Project.findById(projectId);
  if (!project) {
    throw new AppError("Project not found", 404);
  }
  return project;
};

const checkProjectOwnership = (project, userId) => {
  validateIds({ User: userId });
  const ownerId = idOf(project.createdBy);
  if (ownerId !== idOf(userId)) {
    throw new AppError("Not authorized to modify this project", 403);
  }
};
