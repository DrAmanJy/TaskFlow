import mongoose from "mongoose";
import Project from "../models/Project.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
export const readProjects = async (req, res) => {
  const { projects: projectIds } = req.user;

  const projects = await Project.find({ _id: { $in: projectIds } })
    .populate("createdBy", "firstName lastName profile")
    .populate("team", "firstName lastName profile")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    projects: projects,
  });
};

export const readProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid project ID format", 400);
  }

  const project = await Project.findById(id)
    .populate("createdBy", "firstName lastName profile")
    .populate("team", "firstName lastName profile");

  if (!project) {
    throw new AppError("Project not found", 404);
  }
  const userId = req.user._id.toString();
  const isCreator =
    (project.createdBy?._id || project.createdBy).toString() === userId;
  const isTeamMember = project.team.some(
    (member) => (member?._id || member).toString() === userId,
  );
  if (!isCreator && !isTeamMember) {
    throw new AppError("Not authorized to read this project", 403);
  }

  return res.status(200).json({ success: true, project });
};
export const createProject = async (req, res) => {
  const { title, description, status, icon } = req.body;
  const user = req.user;

  if (!title) {
    throw new AppError("Title is required", 400);
  }

  const project = await Project.create({
    title,
    description,
    status,
    icon,
    createdBy: user._id,
    team: [user._id],
  });

  await User.updateOne({ _id: user._id }, { $push: { projects: project._id } });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project,
  });
};
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid project ID format", 400);
  }
  const project = await Project.findById(id);
  if (!project) {
    throw new AppError("Project not found", 404);
  }
  if (userId.toString() !== project.createdBy.toString()) {
    throw new AppError("Not authorized to edit this project", 403);
  }
  const { title, description, status, icon } = req.body;
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;
  if (icon !== undefined) updateData.icon = icon;
  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  )
    .populate("createdBy", "firstName lastName profile")
    .populate("team", "firstName lastName profile");

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project: updatedProject,
  });
};
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid project ID format", 400);
  }

  const project = await Project.findById(id);

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (project.createdBy.toString() !== req.user._id.toString()) {
    throw new AppError("Not authorized to delete this project", 403);
  }

  await project.deleteOne();

  await User.updateMany({ projects: id }, { $pull: { projects: id } });

  return res
    .status(200)
    .json({ success: true, message: "Project deleted successfully" });
};
