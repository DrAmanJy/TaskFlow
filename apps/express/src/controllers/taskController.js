import Project from "../models/Project.js";
import Task from "../models/Task.js";
import * as taskService from "../services/taskService.js";
import AppError from "../utils/AppError.js";
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const searchTasks = async (req, res) => {
  const { q } = req.query;
  const userId = req.user._id;

  if (!q) {
    throw new AppError("Search query is required", 400);
  }

  const searchRegex = new RegExp(escapeRegex(q), "i");

  const myProjects = await Project.find({
    $or: [{ createdBy: userId }, { team: userId }],
  }).select("_id");

  const projectIds = myProjects.map((p) => p._id);

  const tasks = await Task.find({
    $and: [
      {
        project: { $in: projectIds },
      },
      {
        $or: [{ title: searchRegex }, { description: searchRegex }],
      },
    ],
  })
    .select("title description status priority createdAt project")
    .populate("project", "title icon")
    .sort({ updatedAt: -1 })
    .limit(20);

  return res.status(200).json({
    success: true,
    count: tasks.length,
    tasks,
  });
};

export const createTask = async (req, res) => {
  const { assignee, projectId, ...rest } = req.body;
  const task = await taskService.createNewTask(
    { ...rest, projectId, assigneeId: assignee },
    req.user._id,
  );

  res.status(201).json({ success: true, task });
};

export const getProjectTasks = async (req, res) => {
  const tasks = await taskService.getTasksByProject(
    req.params.projectId,
    req.user._id,
  );
  res.status(200).json({ success: true, tasks });
};

export const updateTask = async (req, res) => {
  const { assignee, ...rest } = req.body;
  const task = await taskService.updateTaskFields(
    req.params.id,
    { ...rest, assigneeId: assignee },
    req.user._id,
  );
  res.status(200).json({ success: true, task });
};

export const deleteTask = async (req, res) => {
  const result = await taskService.deleteTaskById(req.params.id, req.user._id);
  res.status(200).json({ success: true, ...result });
};

export const getAllTasks = async (req, res) => {
  const tasks = await taskService.getMyTasks(req.user._id);
  res.status(200).json({ success: true, tasks });
};

export const getTaskById = async (req, res) => {
  const task = await taskService.getSingleTask(req.params.id, req.user._id);
  res.status(200).json({ success: true, task });
};

export const updateTaskStatus = async (req, res) => {
  const task = await taskService.moveTask(
    req.params.id,
    req.body,
    req.user._id,
  );
  res.status(200).json({
    success: true,
    message: "Task moved successfully",
    task,
  });
};
