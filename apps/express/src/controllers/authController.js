import * as userService from "../services/userService.js";
import { cookieOptions } from "../../constants.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/User.js";

export const register = async (req, res) => {
  const newUser = await userService.createUser(req.body);

  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  newUser.hashRefreshToken(refreshToken);
  await newUser.save();

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      success: true,
      user: newUser,
      accessToken,
    });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.authenticateUser(email, password);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.hashRefreshToken(refreshToken);
  await user.save();

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      success: true,
      user: user,
      accessToken,
    });
};

export const refreshAccessToken = async (req, res) => {
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

  return res.status(200).json({
    success: true,
    accessToken,
  });
};

export const logout = (req, res) => {
  res.cookie("refreshToken", "", { ...cookieOptions, expires: new Date(0) });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};
