import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.use(requireAuth);

// Core Task Routes
router.post("/tasks");
router.get("/tasks/project/:projectId");
router.get("/tasks");
router.get("/tasks/:id");
router.put("/tasks/:id");
router.delete("/tasks/:id");

// Specialized/Micro-action Routes
router.patch("/tasks/:id/status");
router.post("/tasks/:id/comments");

export default router;
