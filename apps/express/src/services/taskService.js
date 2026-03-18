import mongoose from "mongoose";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import AppError from "../utils/AppError.js";
import { validateIds } from "../utils/idValidator.js";

export const createNewTask = async (taskData, creatorId) => {
  const { title, projectId, assigneeId, position, ...otherData } = taskData;

  if (!title || !projectId) {
    throw new AppError("Title and Project are required", 400);
  }

  const project = await verifyProjectAccess(projectId, creatorId);
  const assigneeArray = parseAssignees(assigneeId, project);

  const task = await Task.create({
    ...otherData,
    title,
    project: projectId,
    createdBy: creatorId,
    assignee: assigneeArray,
    position: position || Date.now(),
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
  if (updateData.assigneeId !== undefined) {
    task.assignee = parseAssignees(updateData.assigneeId, project);
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
  return task;
};

export const getMyTasks = async (userId) => {
  const ownedProjects = await Project.find({ createdBy: userId }).select("_id");
  const ownedProjectIds = ownedProjects.map((p) => p._id);

  return await Task.find({
    $or: [
      { "assignee.userId": userId },
      { project: { $in: ownedProjectIds }, "assignee.0": { $exists: false } },
    ],
  })
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

export const assignTaskUser = async (taskId, assigneeIds, userId) => {
  const task = await findTaskOrThrow(taskId);
  const project = await verifyProjectAccess(task.project, userId);

  task.assignee = parseAssignees(assigneeIds, project);

  await task.save();
  return await task.populate("assignee.userId", "firstName lastName profile");
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const searchTasksQuery = async (q, userId) => {
  const searchRegex = new RegExp(escapeRegex(q), "i");

  const myProjects = await Project.find({
    $or: [{ createdBy: userId }, { team: userId }],
  }).select("_id");

  const projectIds = myProjects.map((p) => p._id);

  return await Task.find({
    $and: [
      { project: { $in: projectIds } },
      { $or: [{ title: searchRegex }, { description: searchRegex }] },
    ],
  })
    .select("title description status priority createdAt project")
    .populate("project", "title icon")
    .sort({ updatedAt: -1 })
    .limit(20);
};

const idOf = (ref) => {
  if (!ref) return null;
  return ref._id ? ref._id.toString() : ref.toString();
};

const parseAssignees = (assigneeInput, project) => {
  if (!assigneeInput) return [];
  const ids = Array.isArray(assigneeInput) ? assigneeInput : (assigneeInput === "" ? [] : [assigneeInput]);
  if (ids.length === 0) return [];

  console.log("ids", ids);
  ids.forEach(id => validateIds({ User: id }));

  return ids.map(id => {
    const isOwner = idOf(project.createdBy) === idOf(id);
    const isMember = project.team.some((mId) => idOf(mId) === idOf(id));
    if (!isOwner && !isMember) throw new AppError(`Assignee ${id} not in project`, 400);
    return { userId: id, role: isOwner ? "owner" : "team" };
  });
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
