import { Router } from "express";
import { getUserInfo } from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me", requireAuth, getUserInfo);
// router.patch("/update-me", controller.updateMe); // Updates name, job title, etc.
// router.delete("/delete-me", controller.deleteMe); // Deactivates or deletes account
// router.get("/search", controller.searchUsers); // Search by email/name to add to projects
// router.get("/:id", controller.getUserProfile); // View a collaborator's mini-profile

export default router;
