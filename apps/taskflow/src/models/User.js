import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
    jobTitle: {
      type: String,
      default: "",
      trim: true,
    },
    profile: {
      type: String,
      default:
        "https://res.cloudinary.com/ddhjov3eb/image/upload/v1771834493/default-profile_bag8or.png",
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "owner"],
      default: "user",
      trim: true,
    },
    invites: [
      {
        project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, default: "team" },
        status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
        date: { type: Date, default: Date.now },
      }
    ],
    refreshToken: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
        delete ret.refreshToken;
      },
    },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { sub: this._id.toString(), role: this.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "30m" },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { sub: this._id.toString() },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" },
  );
};

userSchema.methods.hashRefreshToken = function (rawToken) {
  this.refreshToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
