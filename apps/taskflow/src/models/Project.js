import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
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
      required: [true, "CreatedBy is required"],
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
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  },
);

projectSchema.index({ team: 1 });
projectSchema.index({ createdBy: 1 });

const Project = mongoose.model("Project", projectSchema);
export default Project;
