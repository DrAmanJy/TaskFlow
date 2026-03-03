import * as taskService from "../services/taskService.js";

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
