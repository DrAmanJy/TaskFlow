import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Not authorized, no token provided.", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (typeof decoded === "string") {
    throw new AppError("Invalid token format", 401);
  }
  const id = decoded.id;

  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new AppError("Invalid token", 401);
  }

  req.user = user;
  next();
};
