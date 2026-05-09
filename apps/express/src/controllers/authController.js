import * as authService from "../services/authService.js";
import { cookieOptions } from "../../constants.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";

export const register = async (req, res) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Register a new user'
    #swagger.description = 'Creates a new user account and returns access and refresh tokens.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User registration details',
      required: true,
      schema: {
        $firstName: 'John',
        $lastName: 'Doe',
        $email: 'john.doe@example.com',
        $password: 'StrongP@ssw0rd'
      }
    }
    #swagger.responses[201] = {
      description: 'User successfully registered',
      schema: {
        status: 'success',
        data: { _id: '...', email: 'john.doe@example.com', role: 'user' },
        accessToken: 'eyJhbGci...'
      }
    }
  */
  const newUser = await authService.createUser(req.body);

  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  newUser.hashRefreshToken(refreshToken);
  await newUser.save();

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      status: "success",
      data: newUser,
      accessToken,
    });
};

export const login = async (req, res) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Login a user'
    #swagger.description = 'Authenticates a user and returns access and refresh tokens.'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User login credentials',
      required: true,
      schema: {
        $email: 'john.doe@example.com',
        $password: 'StrongP@ssw0rd'
      }
    }
    #swagger.responses[200] = {
      description: 'User successfully logged in',
      schema: {
        status: 'success',
        data: { _id: '...', email: 'john.doe@example.com', role: 'user' },
        accessToken: 'eyJhbGci...'
      }
    }
    #swagger.responses[401] = { description: 'Invalid credentials' }
  */
  const { email, password } = req.body;
  const user = await authService.authenticateUser(email, password);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.hashRefreshToken(refreshToken);
  await user.save();

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      status: "success",
      data: user,
      accessToken,
    });
};

export const refreshAccessToken = async (req, res) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Refresh Access Token'
    #swagger.description = 'Generates a new access token using the HTTP-only refresh token cookie.'
    #swagger.responses[200] = {
      description: 'Access token refreshed successfully',
      schema: {
        success: true,
        accessToken: 'eyJhbGci...'
      }
    }
    #swagger.responses[401] = { description: 'Token not provided or invalid' }
  */
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError("Token not provided", 401);
  }
  const decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decodedToken.sub);
  if (!user || !user.refreshToken) {
    throw new AppError("Invalid or expired session", 401);
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  if (hashedToken !== user.refreshToken) {
    throw new AppError("Token has been revoked", 401);
  }

  const accessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();
  user.hashRefreshToken(newRefreshToken);
  await user.save();

  return res
    .status(200)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .json({
      success: true,
      accessToken,
    });
};

export const logout = async (req, res) => {
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Logout user'
    #swagger.description = 'Clears the refresh token cookie and logs out the user.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Logged out successfully',
      schema: { success: true, message: 'Logged out successfully' }
    }
  */
  if (req.user?._id) {
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { refreshToken: 1 },
    });
  }
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
