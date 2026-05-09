import * as taskService from "../services/taskService.js";
import AppError from "../utils/AppError.js";
import { sendResponse } from "../utils/sendResponse.js";

export const searchTasks = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Search tasks'
    #swagger.description = 'Searches tasks by title or description. Returns a list of tasks that match the query and are accessible to the authenticated user.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['q'] = {
      in: 'query',
      description: 'Search query string',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'List of matching tasks',
      schema: {
        status: 'success',
        results: 1,
        data: [{
          _id: '...',
          title: 'Design API',
          description: 'Design the backend API',
          status: 'todo',
          priority: 'High',
          project: 'projectId',
          assignee: [{ userId: '...', role: 'team' }]
        }]
      }
    }
    #swagger.responses[400] = { description: 'Search query is required' }
  */
  const { q } = req.query;
  const userId = req.user._id;

  if (!q) throw new AppError("Search query is required", 400);

  const tasks = await taskService.searchTasksQuery(q, userId);

  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: tasks,
  });
};

export const createTask = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Create a task'
    #swagger.description = 'Creates a new task in a specified project.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Task details',
      required: true,
      schema: {
        $title: 'New Task',
        $projectId: '...',
        description: 'Task description',
        priority: 'Low',
        assignee: 'userId'
      }
    }
    #swagger.responses[201] = {
      description: 'Task created successfully',
      schema: {
        status: 'success',
        message: 'Task created successfully',
        data: {
          _id: '...',
          title: 'New Task',
          description: 'Task description',
          status: 'todo',
          priority: 'Low',
          project: '...',
          createdBy: '...',
          assignee: [{ userId: '...', role: 'team' }]
        }
      }
    }
  */
  const { assignee, projectId, ...rest } = req.body;
  console.log(req.body);
  const task = await taskService.createNewTask(
    { ...rest, projectId, assigneeId: assignee },
    req.user._id,
  );

  sendResponse(res, 201, task, "Task created successfully");
};

export const getProjectTasks = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Get project tasks'
    #swagger.description = 'Retrieves all tasks for a specific project. User must have access to the project.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['projectId'] = { description: 'Project ID' }
    #swagger.responses[200] = {
      description: 'List of tasks',
      schema: {
        status: 'success',
        data: [{
          _id: '...',
          title: 'Task 1',
          status: 'todo',
          priority: 'Medium'
        }]
      }
    }
  */
  const tasks = await taskService.getTasksByProject(
    req.params.projectId,
    req.user._id,
  );
  sendResponse(res, 200, tasks);
};

export const updateTask = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Update a task'
    #swagger.description = 'Updates multiple fields of a specific task.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Task ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Fields to update',
      schema: {
        title: 'Updated Task',
        description: 'Updated details',
        priority: 'High',
        status: 'in-progress',
        assignee: 'userId'
      }
    }
    #swagger.responses[200] = {
      description: 'Task updated successfully',
      schema: {
        status: 'success',
        message: 'Task updated successfully',
        data: {
          _id: '...',
          title: 'Updated Task',
          status: 'in-progress'
        }
      }
    }
  */
  const { assignee, ...rest } = req.body;
  const task = await taskService.updateTaskFields(
    req.params.id,
    { ...rest, assigneeId: assignee },
    req.user._id,
  );
  sendResponse(res, 200, task, "Task updated successfully");
};

export const deleteTask = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Delete a task'
    #swagger.description = 'Permanently deletes a task. Only authorized users can delete.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Task ID' }
    #swagger.responses[200] = {
      description: 'Task deleted successfully',
      schema: {
        status: 'success',
        message: 'Task deleted successfully',
        data: { _id: '...' }
      }
    }
  */
  const task = await taskService.deleteTaskById(req.params.id, req.user._id);
  sendResponse(res, 200, task, "Task deleted successfully");
};

export const getAllTasks = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Get all my tasks'
    #swagger.description = 'Retrieves all tasks assigned to the authenticated user across all projects.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'List of assigned tasks',
      schema: {
        status: 'success',
        data: [{
          _id: '...',
          title: 'My Task',
          project: { _id: '...', title: 'Project Name' }
        }]
      }
    }
  */
  const tasks = await taskService.getMyTasks(req.user._id);
  sendResponse(res, 200, tasks);
};

export const getTaskById = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Get task details'
    #swagger.description = 'Retrieves a single task by its ID with populated project and assignee details.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Task ID' }
    #swagger.responses[200] = {
      description: 'Task details',
      schema: {
        status: 'success',
        data: {
          _id: '...',
          title: 'Task Title',
          description: 'Desc',
          status: 'todo',
          project: '...',
          assignee: []
        }
      }
    }
    #swagger.responses[404] = { description: 'Task not found' }
  */
  const task = await taskService.getSingleTask(req.params.id, req.user._id);

  if (!task) throw new AppError("Task not found", 404);

  sendResponse(res, 200, task);
};

export const updateTaskStatus = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Update task status'
    #swagger.description = 'Updates just the status of a task (e.g., todo -> in-progress).'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Task ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'New status payload',
      required: true,
      schema: { $status: 'done' }
    }
    #swagger.responses[200] = {
      description: 'Task moved successfully',
      schema: {
        status: 'success',
        message: 'Task moved successfully',
        data: { _id: '...', status: 'done' }
      }
    }
  */
  const task = await taskService.moveTask(
    req.params.id,
    req.body,
    req.user._id,
  );
  sendResponse(res, 200, task, "Task moved successfully");
};

export const assignTask = async (req, res) => {
  /*
    #swagger.tags = ['Tasks']
    #swagger.summary = 'Assign task'
    #swagger.description = 'Assigns a task to a specific user.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'Task ID' }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User to assign',
      required: true,
      schema: { $assigneeId: 'userId' }
    }
    #swagger.responses[200] = {
      description: 'Task assignment updated successfully',
      schema: {
        status: 'success',
        message: 'Task assignment updated successfully',
        data: { _id: '...', assignee: [{ userId: '...', role: 'team' }] }
      }
    }
  */
  const { assigneeId } = req.body;
  const task = await taskService.assignTaskUser(
    req.params.id,
    assigneeId,
    req.user._id,
  );
  sendResponse(res, 200, task, "Task assignment updated successfully");
};
