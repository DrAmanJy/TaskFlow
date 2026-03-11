import Message from "../models/Message.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";
import { validateIds } from "../utils/idValidator.js";
import { sendResponse } from "../utils/sendResponse.js";

export const syncMessages = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  validateIds({ Task: taskId });

  const task = await Task.findById(taskId).populate(
    "project",
    "team createdBy",
  );

  if (
    !task ||
    (!task.project.team.some(
      (member) => member.toString() === userId.toString(),
    ) &&
      task.project.createdBy.toString() !== userId.toString())
  ) {
    throw new AppError("Not authorized to view this chat", 403);
  }

  const messages = await Message.find({ task: taskId })
    .populate("user", "firstName lastName profile")
    .sort({ createdAt: 1 })
    .limit(50);
  return sendResponse(res, 200, messages);
};
export const sendMessage = async (req, res) => {
  const { text } = req.body;
  const { taskId } = req.params;
  const userId = req.user._id;

  if (!text || text.trim() === "") {
    throw new AppError("Message content is required", 400);
  }

  validateIds({ Task: taskId });

  const task = await Task.findById(taskId).populate(
    "project",
    "createdBy team",
  );

  if (!task || !task.project) {
    throw new AppError("Task or associated Project not found", 404);
  }

  const project = task.project;

  const isOwner = project.createdBy.toString() === userId.toString();
  const isTeamMember = project.team.some(
    (id) => id.toString() === userId.toString(),
  );

  if (!isOwner && !isTeamMember) {
    throw new AppError(
      "You are not authorized to participate in this chat",
      403,
    );
  }

  const message = await Message.create({
    task: taskId,
    text: text.trim(),
    user: userId,
  });

  await message.populate("user", "firstName lastName profile");

  return sendResponse(res, 201, message);
};

export const editMessage = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  const userId = req.user._id;

  if (!text || text.trim() === "") {
    throw new AppError("Message content is required", 400);
  }

  validateIds({ Message: id });

  const message = await Message.findById(id);

  if (!message) {
    throw new AppError("Message not found", 404);
  }

  if (message.user.toString() !== userId.toString()) {
    throw new AppError("You are not authorized to edit this message", 403);
  }

  const updatedMessage = await Message.findByIdAndUpdate(
    id,
    {
      $set: {
        text: text.trim(),
        isEdited: true,
      },
    },
    { new: true, runValidators: true },
  ).populate("user", "firstName lastName profile");

  return sendResponse(res, 200, updatedMessage, "Message successfully edited");
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  validateIds({ Message: id });

  const deletedMessage = await Message.findOneAndDelete({
    _id: id,
    user: userId,
  }).populate("user", "firstName lastName profile");

  if (!deletedMessage) {
    throw new AppError(
      "Message not found or you are not authorized to delete it",
      404,
    );
  }

  return sendResponse(res, 200, deletedMessage, "Message successfully deleted");
};
