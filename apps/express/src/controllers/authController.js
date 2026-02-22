import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Already exists" });
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
          role: newUser.role,
        },
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required" });
    }
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email user not found" });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (isValidPassword) {
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
            role: existingUser.role,
          },
        });
    }
    return res
      .status(400)
      .json({ success: false, message: "Invalid password" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
