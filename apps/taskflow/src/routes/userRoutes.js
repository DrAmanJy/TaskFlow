import { Router } from "express";
import * as controller from "../controllers/userController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/me", requireAuth, controller.getUserInfo);
router.get("/invites", requireAuth, controller.getInvites);
router.patch("/update-me", requireAuth, controller.updateMe);
router.post("/invites/:inviteId/accept", requireAuth, controller.acceptInvite);
router.post("/invites/:inviteId/decline", requireAuth, controller.declineInvite);

// router.delete("/delete-me", controller.deleteMe); // Deactivates or deletes account
// router.get("/search", controller.searchUsers); // Search by email/name to add to projects
// router.get("/:id", controller.getUserProfile); // View a collaborator's mini-profile

export default router;
