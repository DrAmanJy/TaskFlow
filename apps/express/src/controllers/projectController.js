import * as projectService from "../services/projectService.js";
import AppError from "../utils/AppError.js";

export const readProjects = async (req, res) => {
  const projects = await projectService.getProjectsForUser(req.user._id);

  return res.status(200).json({
    success: true,
    projects: projects,
  });
};

export const readProject = async (req, res) => {
  const { id } = req.params;
  const project = await projectService.getProjectById(id, req.user._id);

  return res.status(200).json({
    success: true,
    project,
  });
};

export const createProject = async (req, res) => {
  const project = await projectService.createNewProject(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project,
  });
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updatedProject = await projectService.updateProjectDetails(
    id,
    req.body,
    req.user._id,
  );

  return res.status(200).json({
    success: true,
    message: "Project updated successfully",
    project: updatedProject,
  });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  const result = await projectService.removeProject(id, req.user._id, {
    cascadeDeleteTasks: true,
  });

  return res.status(200).json({
    success: true,
    message: result.message,
  });
};

export const addTeamMember = async (req, res) => {
  const { email } = req.body;
  const project = await projectService.addTeamMember(
    email,
    req.params.id,
    req.user._id,
  );
  return res.status(200).json({
    success: true,
    message: "User successfully added to team",
  });
};
export const removeTeamMember = async (req, res) => {
  const { email } = req.body;
  const project = await projectService.removeTeamMember(
    email,
    req.params.id,
    req.user._id,
  );
  return res.status(200).json({
    success: true,
    message: "User successfully removed from team",
  });
};
export const leaveProject = async (req, res) => {
  const { email } = req.body;
  const project = await projectService.leaveProject(
    req.params.id,
    req.user._id,
  );
  return res.status(200).json({
    success: true,
    message: "User successfully removed from team",
  });
};
