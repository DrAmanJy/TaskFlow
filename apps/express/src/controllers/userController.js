import { sendResponse } from "../utils/sendResponse.js";
import * as userService from "../services/userService.js";

export const getUserInfo = (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get user profile'
    #swagger.description = 'Retrieves the currently authenticated user profile.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'User profile retrieved successfully',
      schema: {
        status: 'success',
        data: {
          _id: '...',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          role: 'user',
          profile: 'https://...',
          jobTitle: 'Developer'
        }
      }
    }
  */
  return sendResponse(res, 200, req.user);
};

export const getInvites = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Get project invites'
    #swagger.description = 'Retrieves all pending project invitations for the user.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'List of pending invites',
      schema: {
        status: 'success',
        data: [{
          _id: '...',
          project: { _id: '...', title: 'New Project' },
          invitedBy: { _id: '...', fullName: 'Admin User' },
          role: 'team',
          status: 'pending',
          date: '2023-01-01T00:00:00.000Z'
        }]
      }
    }
  */
  const invites = await userService.getPendingInvites(req.user._id);
  return sendResponse(res, 200, invites);
};

export const acceptInvite = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Accept project invite'
    #swagger.description = 'Accepts a pending project invitation.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['inviteId'] = { description: 'Invitation ID' }
    #swagger.responses[200] = {
      description: 'Invite accepted successfully',
      schema: {
        status: 'success',
        message: 'Invite accepted successfully',
        data: { _id: '...', title: 'New Project' }
      }
    }
  */
  const result = await userService.acceptInvite(req.params.inviteId, req.user._id);
  return sendResponse(res, 200, result);
};

export const declineInvite = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Decline project invite'
    #swagger.description = 'Declines a pending project invitation.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['inviteId'] = { description: 'Invitation ID' }
    #swagger.responses[200] = {
      description: 'Invite declined successfully',
      schema: {
        status: 'success',
        message: 'Invite declined successfully',
        data: { _id: '...' }
      }
    }
  */
  const result = await userService.declineInvite(req.params.inviteId, req.user._id);
  return sendResponse(res, 200, result);
};

export const updateMe = async (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.summary = 'Update user profile'
    #swagger.description = 'Updates the details of the currently authenticated user.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Profile fields to update',
      schema: {
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Developer',
        profile: 'https://...'
      }
    }
    #swagger.responses[200] = {
      description: 'Profile updated successfully',
      schema: {
        status: 'success',
        message: 'Profile updated successfully',
        data: {
          _id: '...',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          jobTitle: 'Developer'
        }
      }
    }
  */
  const result = await userService.updateUser(req.user._id, req.body);
  return sendResponse(res, 200, result, "Profile updated successfully");
};
