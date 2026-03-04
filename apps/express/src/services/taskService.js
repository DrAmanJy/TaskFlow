import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";
import { validateIds } from "../utils/idValidator.js";

export const createNewTask = async (taskData, creatorId) => {
  const { title, projectId, assigneeId, position, ...otherData } = taskData;

  if (!title || !projectId || !assigneeId) {
    throw new AppError("Title, Project, and Assignee are required", 400);
  }

  const project = await verifyProjectAccess(projectId, creatorId);

  // Verify assignee belongs to project
  const isAssigneeValid =
    idOf(project.createdBy) === idOf(assigneeId) ||
    project.team.some((mId) => idOf(mId) === idOf(assigneeId));

  if (!isAssigneeValid) {
    throw new AppError("Assignee must be a member of this project", 400);
  }

  const task = await Task.create({
    ...otherData,
    title,
    project: projectId,
    createdBy: creatorId,
    assignee: [{ userId: assigneeId }],
    position: position || Date.now(), // Default to end of list
  });

  return await task.populate("assignee.userId", "firstName lastName profile");
};

export const getTasksByProject = async (projectId, userId) => {
  await verifyProjectAccess(projectId, userId);

  return await Task.find({ project: projectId })
    .populate("assignee.userId", "firstName lastName profile")
    .sort({ position: 1 }); // Sorted by position for Kanban flow
};

export const updateTaskFields = async (taskId, updateData, userId) => {
  const task = await findTaskOrThrow(taskId);
  const project = await verifyProjectAccess(task.project, userId);

  const allowedUpdates = [
    "title",
    "description",
    "priority",
    "dueDate",
    "tags",
    "status",
    "position",
  ];

  // Handle complex assignee update logic
  if (updateData.assigneeId) {
    const isAssigneeValid =
      idOf(project.createdBy) === idOf(updateData.assigneeId) ||
      project.team.some((mId) => idOf(mId) === idOf(updateData.assigneeId));
    if (!isAssigneeValid) throw new AppError("Assignee not in project", 400);
    task.assignee = [{ userId: updateData.assigneeId }];
  }

  allowedUpdates.forEach((field) => {
    if (updateData[field] !== undefined) task[field] = updateData[field];
  });

  await task.save();
  return await task.populate("assignee.userId", "firstName lastName profile");
};

export const deleteTaskById = async (taskId, userId) => {
  const task = await findTaskOrThrow(taskId);
  const project = await Project.findById(task.project).select("createdBy");

  const isTaskCreator = idOf(task.createdBy) === idOf(userId);
  const isProjectOwner = idOf(project.createdBy) === idOf(userId);

  if (!isTaskCreator && !isProjectOwner) {
    throw new AppError("Not authorized to delete this task", 403);
  }

  await task.deleteOne();
  return { message: "Task deleted successfully" };
};

export const getMyTasks = async (userId) => {
  return await Task.find({ "assignee.userId": userId })
    .populate("project", "title icon")
    .sort({ dueDate: 1 });
};

export const getSingleTask = async (taskId, userId) => {
  const task = await findTaskOrThrow(taskId);
  await task.populate("project", "title icon");

  const project = await Project.findById(task.project._id || task.project)
    .select("createdBy")
    .lean();

  const isCreator = idOf(task.createdBy) === idOf(userId);
  const isAssignee = task.assignee.some(
    ({ userId: aId }) => idOf(aId) === idOf(userId),
  );
  const isProjectOwner = project && idOf(project.createdBy) === idOf(userId);

  if (!isCreator && !isAssignee && !isProjectOwner) {
    throw new AppError("Not authorized to read this task", 403);
  }

  return task;
};

export const moveTask = async (taskId, { status, position }, userId) => {
  const task = await findTaskOrThrow(taskId);
  await verifyProjectAccess(task.project, userId);

  if (status) {
    const validStatuses = ["todo", "in-progress", "review", "done"];
    if (!validStatuses.includes(status))
      throw new AppError("Invalid status", 400);
    task.status = status;
  }

  if (position !== undefined) {
    task.position = position;
  }

  await task.save();
  return await task.populate("assignee.userId", "firstName lastName profile");
};

const idOf = (ref) => {
  if (!ref) return null;
  return ref._id ? ref._id.toString() : ref.toString();
};

const findTaskOrThrow = async (taskId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new AppError("Invalid task ID format", 400);
  }
  const task = await Task.findById(taskId);
  if (!task) throw new AppError("Task not found", 404);
  return task;
};

const verifyProjectAccess = async (projectId, userId) => {
  validateIds({ Project: projectId });
  const project = await Project.findById(projectId)
    .select("createdBy team")
    .lean();
  if (!project) throw new AppError("Project not found", 404);

  const isOwner = idOf(project.createdBy) === idOf(userId);
  const isMember = project.team.some((mId) => idOf(mId) === idOf(userId));

  if (!isOwner && !isMember) {
    throw new AppError("Not authorized to access tasks in this project", 403);
  }
  return project;
};
