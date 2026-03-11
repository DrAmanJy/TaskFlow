import Project from "../models/Project.js";
import * as projectService from "../services/projectService.js";
import AppError from "../utils/AppError.js";
import { sendResponse } from "../utils/sendResponse.js";
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const searchProjects = async (req, res) => {
  const { q } = req.query;
  const userId = req.user._id;

  if (!q) {
    throw new AppError("Search query is required", 400);
  }

  const searchRegex = new RegExp(escapeRegex(q), "i");
  const projects = await Project.find({
    $and: [
      {
        $or: [{ createdBy: userId }, { team: userId }],
      },
      {
        $or: [{ title: searchRegex }, { description: searchRegex }],
      },
    ],
  })
    .select("title description status icon createdAt createdBy team")
    .populate("createdBy", "fullName profile")
    .populate("team", "fullName profile")
    .sort({ updatedAt: -1 })
    .limit(20);

  return sendResponse(res, 200, projects);
};

export const readProjects = async (req, res) => {
  const projects = await projectService.getProjectsForUser(req.user._id);
  return sendResponse(res, 200, projects);
};

export const readProject = async (req, res) => {
  const { id } = req.params;
  const project = await projectService.getProjectById(id, req.user._id);
  return sendResponse(res, 200, project);
};

export const createProject = async (req, res) => {
  const project = await projectService.createNewProject(req.body, req.user._id);
  return sendResponse(res, 201, project, "Project created successfully");
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updatedProject = await projectService.updateProjectDetails(
    id,
    req.body,
    req.user._id,
  );
  return sendResponse(res, 200, updatedProject, "Project updated successfully");
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  const project = await projectService.removeProject(id, req.user._id, {
    cascadeDeleteTasks: true,
  });
  return sendResponse(res, 200, project, "Project deleted successfully");
};

export const addTeamMember = async (req, res) => {
  const { email } = req.body;
  const project = await projectService.addTeamMember(
    email,
    req.params.id,
    req.user._id,
  );
  return sendResponse(res, 200, project, "User successfully added to team");
};

export const removeTeamMember = async (req, res) => {
  const { email } = req.body;
  const project = await projectService.removeTeamMember(
    email,
    req.params.id,
    req.user._id,
  );
  return sendResponse(res, 200, project, "User successfully removed from team");
};

export const leaveProject = async (req, res) => {
  const project = await projectService.leaveProject(
    req.params.id,
    req.user._id,
  );
  return sendResponse(res, 200, project, "User successfully removed from team");
};
