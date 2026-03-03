import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/taskController.js";

const router = Router();
router.use(requireAuth);

// Core Task Routes
router.post("/", controller.createTask);
router.get("/project/:projectId", controller.getProjectTasks);
router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);
router.patch("/:id/status", controller.updateTaskStatus);
// router.post("/:id/comments", controller.addTaskComment);
// router.get("/:id/comments", controller.getTaskComments);
// router.patch("/:id/attachments", controller.addAttachment);

export default router;
