import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/taskController.js";

const router = express.Router();
router.use(requireAuth);

// Core Task Routes
router.post("/tasks", controller.createTask);
router.get("/tasks/project/:projectId", controller.getProjectTasks);
router.get("/tasks", controller.getAllTasks);
router.get("/tasks/:id", controller.getTaskById);
router.put("/tasks/:id", controller.updateTask);
router.delete("/tasks/:id", controller.deleteTask);

// Specialized/Micro-action Routes
router.patch("/tasks/:id/status", controller.updateTaskStatus);
// router.post("/tasks/:id/comments");

export default router;
