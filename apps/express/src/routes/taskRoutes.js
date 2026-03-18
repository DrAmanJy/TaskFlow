import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/taskController.js";

const router = Router();
router.use(requireAuth);

router.get("/search", controller.searchTasks);

router.post("/", controller.createTask);
router.get("/projects/:projectId", controller.getProjectTasks);
router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTaskById);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

router.patch("/:id/status", controller.updateTaskStatus);
router.patch("/:id/assign", controller.assignTask);

export default router;
