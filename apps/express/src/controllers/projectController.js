import Project from "../models/Project.js";
import * as projectService from "../services/projectService.js";
import AppError from "../utils/AppError.js";
import { sendResponse } from "../utils/sendResponse.js";
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const searchProjects = async (req, res) => {
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Search projects'
    #swagger.description = 'Searches projects by title or description where the authenticated user is either the creator or a team member. Results are limited to 20 and sorted by latest update.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['q'] = {
      in: 'query',
      description: 'Search query string',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'List of matching projects',
      schema: {
        status: 'success',
        data: [{
          _id: '...',
          title: 'Project Alpha',
          description: 'A test project',
          status: 'todo',
          icon: 'folder',
          createdAt: '2023-01-01T00:00:00.000Z',
          createdBy: { _id: '...', fullName: 'John Doe', profile: 'url...' },
          team: [{ _id: '...', fullName: 'Jane Doe', profile: 'url...' }]
        }]
      }
    }
    #swagger.responses[400] = { description: 'Search query is required' }
  */
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
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Get all user projects'
    #swagger.description = 'Retrieves a list of all projects where the authenticated user is the creator or a team member.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'List of projects',
      schema: {
        status: 'success',
        data: [{
          _id: '...',
          title: 'Project Alpha',
          description: 'A test project',
          status: 'todo',
          icon: 'folder',
          createdAt: '2023-01-01T00:00:00.000Z',
          createdBy: '...',
          team: ['...']
        }]
      }
    }
  */
  const projects = await projectService.getProjectsForUser(req.user._id);
  return sendResponse(res, 200, projects);
};

export const readProject = async (req, res) => {
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Get project details'
    #swagger.description = 'Retrieves a single project by its ID, ensuring the user has access.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Project ID' }
    #swagger.responses[200] = {
      description: 'Project details retrieved successfully',
      schema: {
        status: 'success',
        data: {
          _id: '...',
          title: 'Project Alpha',
          description: 'A test project',
          status: 'todo',
          icon: 'folder',
          createdBy: { _id: '...', fullName: 'John Doe', profile: 'url...' },
          team: [{ _id: '...', fullName: 'Jane Doe', profile: 'url...' }]
        }
      }
    }
    #swagger.responses[404] = { description: 'Project not found' }
  */
  const { id } = req.params;
  const project = await projectService.getProjectById(id, req.user._id);
  return sendResponse(res, 200, project);
};

export const createProject = async (req, res) => {
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Create a new project'
    #swagger.description = 'Creates a new project workspace. The authenticated user is automatically set as the creator.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Project details',
      required: true,
      schema: {
        $title: 'My Project',
        description: 'Detailed description of the project goals',
        status: 'todo',
        icon: 'folder'
      }
    }
    #swagger.responses[201] = {
      description: 'Project created successfully',
      schema: {
        status: 'success',
        message: 'Project created successfully',
        data: {
          _id: '...',
          title: 'My Project',
          description: 'Detailed description of the project goals',
          status: 'todo',
          icon: 'folder',
          createdBy: '...',
          team: [],
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z'
        }
      }
    }
  */
  const project = await projectService.createNewProject(req.body, req.user._id);
  return sendResponse(res, 201, project, "Project created successfully");
};

export const updateProject = async (req, res) => {
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Update a project'
    #swagger.description = 'Updates details of an existing project. Only the project creator or an authorized team member can update it.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Project ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Project fields to update',
      schema: {
        title: 'Updated Project Name',
        description: 'Updated description',
        status: 'in-progress',
        icon: 'layout'
      }
    }
    #swagger.responses[200] = {
      description: 'Project updated successfully',
      schema: {
        status: 'success',
        message: 'Project updated successfully',
        data: {
          _id: '...',
          title: 'Updated Project Name',
          description: 'Updated description',
          status: 'in-progress',
          icon: 'layout',
          createdBy: '...',
          team: [],
          updatedAt: '2023-01-01T00:00:00.000Z'
        }
      }
    }
    #swagger.responses[403] = { description: 'Not authorized to update project' }
    #swagger.responses[404] = { description: 'Project not found' }
  */
  const { id } = req.params;
  const updatedProject = await projectService.updateProjectDetails(
    id,
    req.body,
    req.user._id,
  );
  return sendResponse(res, 200, updatedProject, "Project updated successfully");
};

export const deleteProject = async (req, res) => {
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Delete a project'
    #swagger.description = 'Permanently deletes a project and cascades deletion to all associated tasks. Only the creator can delete the project.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Project ID' }
    #swagger.responses[200] = {
      description: 'Project deleted successfully',
      schema: {
        status: 'success',
        message: 'Project deleted successfully',
        data: { _id: '...', title: 'Deleted Project' }
      }
    }
    #swagger.responses[403] = { description: 'Only project creator can delete' }
    #swagger.responses[404] = { description: 'Project not found' }
  */
  const { id } = req.params;

  const project = await projectService.removeProject(id, req.user._id, {
    cascadeDeleteTasks: true,
  });
  return sendResponse(res, 200, project, "Project deleted successfully");
};

export const inviteMember = async (req, res) => {
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Invite a team member'
    #swagger.description = 'Invites an existing user to the project by their email address.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Project ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Invitation details',
      required: true,
      schema: {
        $email: 'user@example.com',
        role: 'team'
      }
    }
    #swagger.responses[200] = {
      description: 'User successfully invited to team',
      schema: {
        status: 'success',
        message: 'User successfully invited to team',
        data: {
          project: '...',
          invitedBy: '...',
          role: 'team',
          status: 'pending'
        }
      }
    }
    #swagger.responses[404] = { description: 'User or Project not found' }
  */
  const { email, role } = req.body;
  const result = await projectService.inviteTeamMember(
    email,
    req.params.id,
    req.user._id,
    role
  );
  return sendResponse(res, 200, result, "User successfully invited to team");
};



export const removeTeamMember = async (req, res) => {
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Remove a team member'
    #swagger.description = 'Removes a user from the project team. Only the creator can remove members.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Project ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Email of the member to remove',
      required: true,
      schema: { $email: 'user@example.com' }
    }
    #swagger.responses[200] = {
      description: 'User successfully removed from team',
      schema: {
        status: 'success',
        message: 'User successfully removed from team',
        data: { _id: '...', title: 'Project Name', team: ['...'] }
      }
    }
    #swagger.responses[404] = { description: 'User or Project not found' }
  */
  const { email } = req.body;
  const project = await projectService.removeTeamMember(
    email,
    req.params.id,
    req.user._id,
  );
  return sendResponse(res, 200, project, "User successfully removed from team");
};

export const leaveProject = async (req, res) => {
  /*
    #swagger.tags = ['Projects']
    #swagger.summary = 'Leave a project'
    #swagger.description = 'Removes the authenticated user from the project team. The creator cannot leave their own project.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Project ID' }
    #swagger.responses[200] = {
      description: 'User successfully left the team',
      schema: {
        status: 'success',
        message: 'User successfully removed from team',
        data: { _id: '...', title: 'Project Name', team: ['...'] }
      }
    }
    #swagger.responses[400] = { description: 'Project creator cannot leave project' }
  */
  const project = await projectService.leaveProject(
    req.params.id,
    req.user._id,
  );
  return sendResponse(res, 200, project, "User successfully removed from team");
};
