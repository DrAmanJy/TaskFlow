import e from "express";
import {
  createProject,
  deleteProject,
  readProject,
  updateProject,
} from "../controllers/projectController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const Router = e.Router();

Router.get("/project/:id", requireAuth, readProject);
Router.post("/project", requireAuth, createProject);
Router.put("/project/:id", requireAuth, updateProject);
Router.delete("/project/:id", requireAuth, deleteProject);

export default Router;
