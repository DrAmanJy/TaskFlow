import Project from "../models/Project.js";
import Task from "../models/Task.js";
import * as taskService from "../services/taskService.js";
import AppError from "../utils/AppError.js";
import { sendResponse } from "../utils/sendResponse.js";

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const searchTasks = async (req, res) => {
  const { q } = req.query;
  const userId = req.user._id;

  if (!q) throw new AppError("Search query is required", 400);

  const searchRegex = new RegExp(escapeRegex(q), "i");

  const myProjects = await Project.find({
    $or: [{ createdBy: userId }, { team: userId }],
  }).select("_id");

  const projectIds = myProjects.map((p) => p._id);

  const tasks = await Task.find({
    $and: [
      { project: { $in: projectIds } },
      { $or: [{ title: searchRegex }, { description: searchRegex }] },
    ],
  })
    .select("title description status priority createdAt project")
    .populate("project", "title icon")
    .sort({ updatedAt: -1 })
    .limit(20);

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: tasks,
  });
};

export const createTask = async (req, res) => {
  const { assignee, projectId, ...rest } = req.body;
  console.log(req.body);
  const task = await taskService.createNewTask(
    { ...rest, projectId, assigneeId: assignee },
    req.user._id,
  );

  sendResponse(res, 201, task, "Task created successfully");
};

export const getProjectTasks = async (req, res) => {
  const tasks = await taskService.getTasksByProject(
    req.params.projectId,
    req.user._id,
  );
  sendResponse(res, 200, tasks);
};

export const updateTask = async (req, res) => {
  const { assignee, ...rest } = req.body;
  const task = await taskService.updateTaskFields(
    req.params.id,
    { ...rest, assigneeId: assignee },
    req.user._id,
  );
  sendResponse(res, 200, task, "Task updated successfully");
};

export const deleteTask = async (req, res) => {
  const task = await taskService.deleteTaskById(req.params.id, req.user._id);
  sendResponse(res, 200, task, "Task deleted successfully");
};

export const getAllTasks = async (req, res) => {
  const tasks = await taskService.getMyTasks(req.user._id);
  sendResponse(res, 200, tasks);
};

export const getTaskById = async (req, res) => {
  const task = await taskService.getSingleTask(req.params.id, req.user._id);

  if (!task) throw new AppError("Task not found", 404);

  sendResponse(res, 200, task);
};

export const updateTaskStatus = async (req, res) => {
  const task = await taskService.moveTask(
    req.params.id,
    req.body,
    req.user._id,
  );
  sendResponse(res, 200, task, "Task moved successfully");
};
