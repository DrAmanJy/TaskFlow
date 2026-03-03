import { isValidObjectId } from "mongoose";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { validateIds } from "../utils/idValidator.js";
import Project from "../models/Project.js";

const findUserOrThrow = async (userId) => {
  validateIds({ User: userId });
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found with the provided ID", 404);
  }
  return user;
};

export const createUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  if (!firstName || !lastName || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  return await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
  });
};

export const authenticateUser = async (email, password) => {
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email, user not found", 404);
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new AppError("Invalid password", 400);
  }

  return user;
};

export const updateUser = async (userId, updateData) => {
  validateIds({ User: userId });
  const user = await findUserOrThrow(userId);

  if (updateData.email) {
    const emailExists = await User.findOne({
      email: updateData.email,
      _id: { $ne: userId },
    });
    if (emailExists) throw new AppError("Email is already taken", 400);
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "jobTitle",
    "profile",
    "email",
  ];
  const filteredData = {};

  Object.keys(updateData).forEach((key) => {
    if (allowedFields.includes(key)) filteredData[key] = updateData[key];
  });

  Object.assign(user, filteredData);

  await user.save();
  return user;
};

export const deleteUser = async (userId) => {
  validateIds({ User: userId });
  const user = await findUserOrThrow(userId);
  await User.findByIdAndDelete(userId);
  await Project.updateMany({ team: userId }, { $pull: { team: userId } });
  return { message: "User deleted successfully" };
};

export const findUserById = async (userId) => {
  return await findUserOrThrow(userId);
};

export const findUserByEmail = async (userEmail) => {
  if (!userEmail) throw new AppError("Email is required for search", 400);

  const user = await User.findOne({ email: userEmail.toLowerCase() });

  if (!user) {
    throw new AppError("No user found with this email address", 404);
  }

  return user;
};
