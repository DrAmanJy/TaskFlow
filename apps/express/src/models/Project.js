import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      default: "todo",
      enum: ["todo", "in-progress", "completed"],
    },
    icon: {
      type: String,
      default: "folder",
      enum: ["layout", "server", "store", "folder"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
