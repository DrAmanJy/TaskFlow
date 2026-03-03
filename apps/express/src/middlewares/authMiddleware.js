import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Not authorized, no token provided", 401);
  }

  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    throw new AppError("Invalid token format", 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
  } catch {
    throw new AppError("Invalid or expired access token", 401);
  }

  const user = await User.findById(decoded.sub).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new AppError(
      "The user belonging to this token no longer exists",
      401,
    );
  }

  if (!user.isActive) {
    throw new AppError("This user account is deactivated", 403);
  }

  req.user = user;
  next();
};
