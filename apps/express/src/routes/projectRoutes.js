import e from "express";
import * as controller from "../controllers/projectController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const Router = e.Router();

Router.get("/projects", requireAuth, controller.readProjects);
Router.get("/project/:id", requireAuth, controller.readProject);
Router.post("/project", requireAuth, controller.createProject);
Router.put("/project/:id", requireAuth, controller.updateProject);
Router.delete("/project/:id", requireAuth, controller.deleteProject);

export default Router;
