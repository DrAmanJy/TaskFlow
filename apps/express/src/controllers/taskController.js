import mongoose from "mongoose";
import AppError from "../utils/AppError.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate, assignee, projectId } =
    req.body;
  if (!title || !assignee || !projectId) {
    throw new AppError("All fields are required", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(projectId))
    throw new AppError("Invalid project ID", 400);
  const project = await Project.findById(projectId)
    .select("createdBy team")
    .lean();

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const isCreator = project.createdBy.toString() === req.user._id.toString();
  const isTeamMember = project.team.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );
  if (!mongoose.Types.ObjectId.isValid(assignee)) {
    throw new AppError("Invalid assignee ID", 400);
  }
  const assigneeInProject =
    project.createdBy.toString() === assignee.toString() ||
    project.team.some(
      (memberId) => memberId.toString() === assignee.toString(),
    );
  if (!assigneeInProject) {
    throw new AppError("Assignee must belong to this project", 400);
  }

  if (!isCreator && !isTeamMember) {
    throw new AppError("Not authorized to create tasks in this project", 403);
  }
  const task = await Task.create({
    title,
    description,
    assignee: [{ userId: assignee }],
    status,
    priority,
    dueDate,
    project: projectId,
    createdBy: req.user._id,
  });
  if (!task) {
    throw new AppError("Failed to create task", 500);
  }
  await task.populate("assignee.userId", "firstName lastName profile");
  return res
    .status(201)
    .json({ success: true, message: "Task created successFully", task });
};

export const getProjectTasks = async (req, res) => {
  const projectId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new AppError("Invalid project Id", 400);
  }
  const project = await Project.findById(projectId)
    .select("createdBy team")
    .lean();
  if (!project) {
    throw new AppError("Project not found", 404);
  }
  const isCreator = req.user._id.toString() === project.createdBy.toString();
  const isTeamMember = project.team.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );
  if (!isCreator && !isTeamMember) {
    throw new AppError("Not authorized to read tasks in this project", 403);
  }
  const tasks = await Task.find({ project: projectId })
    .populate("assignee.userId", "firstName lastName profile")
    .sort({ createdAt: -1 });
  return res.status(200).json({ success: true, tasks });
};

export const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ "assignee.userId": req.user._id })
    .populate("project", "title icon")
    .sort({ dueDate: 1 });
  return res.status(200).json({ success: true, tasks });
};

export const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new AppError("Invalid task Id", 400);
  }
  const task = await Task.findById(taskId).populate("project", "title icon");
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  const isCreator = task.createdBy.toString() === req.user._id.toString();
  const isAssignee = task.assignee.some(
    ({ userId }) => userId && req.user._id.toString() === userId.toString(),
  );
  if (!isCreator && !isAssignee) {
    throw new AppError("Not authorized to read this tasks", 403);
  }
  return res.status(200).json({ success: true, task });
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new AppError("Invalid task Id", 400);
  }
  const task = await Task.findById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  const project = await Project.findById(task.project);
  const isOwner = project.createdBy.toString() === req.user._id.toString();
  const isCreator = task.createdBy.toString() === req.user._id.toString();
  if (!isOwner && !isCreator) {
    throw new AppError("Not authorized to delete this tasks", 403);
  }
  await task.deleteOne();
  return res
    .status(200)
    .json({ success: true, message: "Task deleted successfully" });
};

export const updateTask = async (req, res) => {
  const taskId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new AppError("Invalid task Id", 400);
  }

  const task = await Task.findById(taskId);
  if (!task) throw new AppError("Task not found", 404);

  const project = await Project.findById(task.project).select("team createdBy");

  const isCreator = task.createdBy.toString() === req.user._id.toString();
  const isTeamMember = project.team.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );

  if (!isCreator && !isTeamMember) {
    throw new AppError("Not authorized to update this task", 403);
  }

  const allowedUpdates = [
    "title",
    "description",
    "priority",
    "dueDate",
    "tags",
  ];
  allowedUpdates.forEach((field) => {
    if (req.body[field] !== undefined) {
      task[field] = req.body[field];
    }
  });

  if (req.body.assignee !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(req.body.assignee)) {
      throw new AppError("Invalid assignee ID", 400);
    }
    const assigneeInProject =
      project.createdBy.toString() === req.body.assignee.toString() ||
      project.team.some(
        (memberId) => memberId.toString() === req.body.assignee.toString(),
      );
    if (!assigneeInProject) {
      throw new AppError("Assignee must belong to this project", 400);
    }
    task.assignee = [{ userId: req.body.assignee }];
  }

  await task.save();
  await task.populate("assignee.userId", "firstName lastName profile");

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task,
  });
};

export const updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;
  const { status, position } = req.body;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new AppError("Invalid task Id", 400);
  }

  const validStatuses = ["todo", "in-progress", "review", "done"];
  if (status && !validStatuses.includes(status)) {
    throw new AppError("Invalid status value", 400);
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  const project = await Project.findById(task.project).select("team");
  const isCreator = task.createdBy.toString() === req.user._id.toString();
  const isTeamMember = project.team.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );

  if (!isCreator && !isTeamMember) {
    throw new AppError("Not authorized to move this task", 403);
  }

  if (status !== undefined) task.status = status;
  if (position !== undefined) task.position = position;

  await task.save();
  await task.populate("assignee.userId", "firstName lastName profile");

  return res.status(200).json({
    success: true,
    message: "Task moved successfully",
    task,
  });
};
