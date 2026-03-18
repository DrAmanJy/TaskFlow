import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, default: "" },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
    },
    assignee: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: { type: String, enum: ["team", "staff", "owner"], default: "team" },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["todo", "in-progress", "review", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Low",
    },
    tags: [{ type: String, trim: true, default: "none" }],
    position: { type: Number, default: Date.now },
    dueDate: { type: Date },
    attachments: [
      {
        url: { type: String },
        name: { type: String },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

taskSchema.index({ project: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ "assignee.userId": 1 });

const Task = mongoose.model("Task", taskSchema);
export default Task;
