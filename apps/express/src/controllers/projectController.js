import mongoose from "mongoose";
import Project from "../models/Project.js";
import User from "../models/User.js";

export const readProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID format" });
    }

    const project = await Project.findById(id)
      .populate("createdBy", "firstName lastName profile")
      .populate("team", "firstName lastName profile");

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, project });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const createProject = async (req, res) => {
  try {
    const { title, description, status, icon } = req.body;
    const user = req.user;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const project = await Project.create({
      title,
      description,
      status,
      icon,
      createdBy: user._id,
      team: [user._id],
    });

    await User.updateOne(
      { _id: user._id },
      { $push: { projects: project._id } },
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID format" });
    }
    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    if (userId.toString() !== project.createdBy.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this project",
      });
    }
    const { title, description, status, icon } = req.body;
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;
    if (icon) updateData.icon = icon;
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID format" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    if (project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this project",
      });
    }

    await project.deleteOne();

    await User.updateMany({ projects: id }, { $pull: { projects: id } });

    return res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
