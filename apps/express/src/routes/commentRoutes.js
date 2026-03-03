import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import * as controller from "../controllers/commentController.js";

const router = Router();

router.use(requireAuth);

// Comment Operations
router.get("/task/:taskId", controller.getTaskComments); // Load discussion for a task
router.post("/task/:taskId", controller.createComment); // Post a new message
router.patch("/:id", controller.updateComment); // Edit a previous comment
router.delete("/:id", controller.deleteComment); // Remove a comment

export default router;
