import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { uploadImage } from "../utils/cloudinary.js";

export const createUser = async (userData) => {
  const { firstName, lastName, email, password, profileImage } = userData;

  if (!firstName || !lastName || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  let profileUrl = "https://res.cloudinary.com/ddhjov3eb/image/upload/v1771834493/default-profile_bag8or.png";
  if (profileImage && profileImage.startsWith("data:image")) {
    profileUrl = await uploadImage(profileImage);
  }

  return await User.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password,
    profile: profileUrl,
  });
};

export const authenticateUser = async (email, password) => {
  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError("Invalid email, user not found", 404);
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    throw new AppError("Invalid password", 400);
  }

  return user;
};
