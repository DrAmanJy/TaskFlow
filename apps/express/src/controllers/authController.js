import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "6h" },
  );

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 6,
      path: "/",
    })
    .json({
      success: true,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profile: newUser.profile,
        role: newUser.role,
      },
    });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new AppError("Invalid email, user not found", 404);
  }

  const isValidPassword = await bcrypt.compare(password, existingUser.password);

  if (!isValidPassword) {
    throw new AppError("Invalid password", 400);
  }

  const token = jwt.sign(
    { id: existingUser._id, role: existingUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "6h" },
  );

  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 6,
      path: "/",
    })
    .json({
      success: true,
      user: {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        profile: existingUser.profile,
        role: existingUser.role,
      },
    });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};
